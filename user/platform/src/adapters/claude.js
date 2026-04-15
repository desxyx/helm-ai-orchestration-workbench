const config = require("../../config");
const { createAgentError } = require("../utils/errors");
const logger = require("../utils/logger");
const { waitForHybridCompletion } = require("../utils/completion");
const {
  clickCopyAndRead,
  pollForCopyButton,
  scrollToBottom,
} = require("./copyCapture");
const {
  buildFullPromptText,
  clearInput,
  findEditableInput,
  injectPrompt,
  pasteText,
  readInputText,
} = require("../utils/prompt");
const { sleep } = require("../utils/time");

const claudeConfig = config.claude;
const { completion } = config;
const injection = { ...config.injection, ...(claudeConfig.injection || {}) };
const diagnostics = config.diagnostics || {};
const sendButtonSelector = 'button[aria-label="Send message"]';
const CLAUDE_MESSAGE_SELECTOR =
  '[data-testid="assistant-message"], [data-testid*="assistant"], [data-message-role="assistant"]';
const CLAUDE_COPY_BUTTON_SELECTOR = '[data-testid="action-bar-copy"]';
const promptInjectionOptions = {
  promptMode: "insert",
  summaryMode: "insert",
};

function normalizeInputForComparison(text) {
  return String(text || "")
    .replace(/\u00a0/g, " ")
    .replace(/\r/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function buildComparisonMarkers(text) {
  const chars = Array.from(String(text || ""));

  return {
    head: normalizeInputForComparison(chars.slice(0, 80).join("")),
    tail: normalizeInputForComparison(chars.slice(-80).join("")),
  };
}

async function isSendButtonReady(page) {
  const sendButton = page.locator(sendButtonSelector).first();
  return sendButton
    .isVisible()
    .then((visible) => visible && sendButton.isEnabled())
    .catch(() => false);
}

async function waitForSendButtonReady(page, timeoutMs = injection.sendButtonReadyTimeoutMs || 2500) {
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    if (await isSendButtonReady(page)) {
      return true;
    }

    await sleep(100);
  }

  return false;
}

async function waitForClaudePromptReady(page, inputLocator, expectedText) {
  const normalizedExpected = normalizeInputForComparison(expectedText);
  const { head, tail } = buildComparisonMarkers(expectedText);
  const windowsOverrides =
    process.platform === "win32" && injection.windows ? injection.windows : {};
  const effectiveSettleTimeoutMs =
    windowsOverrides.inputSettleTimeoutMs || injection.inputSettleTimeoutMs || 4000;
  const effectiveStableForMs =
    windowsOverrides.stableForMs !== undefined ? windowsOverrides.stableForMs : 400;
  const deadline =
    Date.now() +
    Math.max(
      effectiveSettleTimeoutMs,
      (injection.sendButtonReadyTimeoutMs || 2500) + 1500
    );

  let observedInput = "";
  let stableForMs = 0;
  let lastNormalizedInput = "";
  let sawContent = false;

  while (Date.now() < deadline) {
    observedInput = await readInputText(inputLocator);
    const normalizedObserved = normalizeInputForComparison(observedInput);

    if (normalizedObserved) {
      sawContent = true;
    } else if (sawContent) {
      const sendButtonGone = !(await isSendButtonReady(page));
      if (sendButtonGone) {
        await sleep(200);
        const stillEmpty = !(await readInputText(inputLocator)).trim();
        const buttonStillGone = !(await isSendButtonReady(page));
        if (stillEmpty && buttonStillGone) {
          logger.info(
            "[claude] waitForClaudePromptReady: submitted confirmed (double-check passed)"
          );
          return { ready: false, submitted: true, observedInput };
        }
        await sleep(100);
        continue;
      }
      await sleep(100);
      continue;
    }

    if (normalizedObserved === normalizedExpected) {
      return { ready: true, submitted: false, observedInput };
    }

    const hasHead = head ? normalizedObserved.includes(head) : true;
    const hasTail = tail ? normalizedObserved.includes(tail) : true;
    const lengthRatio = normalizedExpected
      ? normalizedObserved.length / normalizedExpected.length
      : 1;
    const sendReady = await isSendButtonReady(page);

    if (normalizedObserved === lastNormalizedInput) {
      stableForMs += 100;
    } else {
      lastNormalizedInput = normalizedObserved;
      stableForMs = 0;
    }

    if (
      sendReady &&
      hasHead &&
      hasTail &&
      lengthRatio >= 0.95 &&
      stableForMs >= effectiveStableForMs
    ) {
      return { ready: true, submitted: false, observedInput };
    }

    await sleep(100);
  }

  return { ready: false, submitted: false, observedInput };
}

async function findInputLocator(page) {
  return findEditableInput(page, claudeConfig.inputSelector);
}

async function getLatestAssistantMessage(page) {
  const selectors = Array.from(
    new Set([
      CLAUDE_MESSAGE_SELECTOR,
      '[data-message-role="assistant"]',
      ...(claudeConfig.replySelectors || []),
    ])
  );

  for (const selector of selectors) {
    const messages = page.locator(selector);
    const count = await messages.count().catch(() => 0);

    if (count > 0) {
      return {
        count,
        locator: messages.nth(count - 1),
      };
    }
  }

  return {
    count: 0,
    locator: null,
  };
}

async function readLatestAssistantActionDiagnostics(page) {
  const selectors = Array.from(
    new Set([
      CLAUDE_MESSAGE_SELECTOR,
      '[data-message-role="assistant"]',
      ...(claudeConfig.replySelectors || []),
    ])
  );
  const selectorCounts = {};

  for (const selector of selectors) {
    selectorCounts[selector] = await page
      .locator(selector)
      .count()
      .catch(() => 0);
  }

  const { count, locator } = await getLatestAssistantMessage(page);
  const globalCopyButtonCount = await page
    .locator(CLAUDE_COPY_BUTTON_SELECTOR)
    .count()
    .catch(() => 0);

  if (!locator) {
    return {
      messageCount: count,
      selectorCounts,
      globalCopyButtonCount,
      latestMessage: null,
    };
  }

  await locator.scrollIntoViewIfNeeded().catch(() => null);
  await locator.hover().catch(() => null);
  await sleep(150);

  const latestMessage = await locator
    .evaluate((element) => {
      const describe = (node) => {
        if (!(node instanceof Element)) {
          return null;
        }

        return {
          tag: node.tagName.toLowerCase(),
          id: node.id || "",
          className: String(node.className || "")
            .split(/\s+/)
            .filter(Boolean)
            .slice(0, 4)
            .join("."),
          dataTestId: node.getAttribute("data-testid") || "",
          ariaLabel: node.getAttribute("aria-label") || "",
        };
      };
      const isCopyLike = (node) => {
        const label = (
          node.getAttribute("aria-label") ||
          node.getAttribute("data-testid") ||
          node.textContent ||
          ""
        )
          .trim()
          .toLowerCase();
        return label.includes("copy");
      };

      const root = element.getRootNode();
      const parent = element.parentElement;
      const siblings = parent ? Array.from(parent.children) : [];
      const index = siblings.indexOf(element);

      return {
        self: describe(element),
        textPreview: ((element.innerText || element.textContent || "").trim() || "").slice(0, 220),
        childButtonCount: element.querySelectorAll("button").length,
        copyLikeButtonCount: Array.from(element.querySelectorAll("button")).filter(isCopyLike).length,
        parent: describe(parent),
        grandparent: describe(parent?.parentElement || null),
        siblingWindow: siblings
          .slice(Math.max(0, index - 2), index + 3)
          .map((node) => describe(node)),
        inShadowRoot: root instanceof ShadowRoot,
        shadowHost: root instanceof ShadowRoot ? describe(root.host) : null,
      };
    })
    .catch(() => null);

  const buttons = await locator
    .locator("button")
    .evaluateAll((elements) =>
      elements
        .slice(0, 10)
        .map((element) => {
          const describe = (node) => {
            if (!(node instanceof Element)) {
              return null;
            }

            return {
              tag: node.tagName.toLowerCase(),
              id: node.id || "",
              className: String(node.className || "")
                .split(/\s+/)
                .filter(Boolean)
                .slice(0, 4)
                .join("."),
              dataTestId: node.getAttribute("data-testid") || "",
              ariaLabel: node.getAttribute("aria-label") || "",
            };
          };

          const label = (
            element.getAttribute("aria-label") ||
            element.getAttribute("data-testid") ||
            element.textContent ||
            ""
          ).trim();
          const style = window.getComputedStyle(element);
          const rect = element.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const hit =
            rect.width > 0 && rect.height > 0 ? document.elementFromPoint(centerX, centerY) : null;
          const root = element.getRootNode();

          return {
            label: label.slice(0, 80),
            visible:
              style.visibility !== "hidden" &&
              style.display !== "none" &&
              rect.width > 0 &&
              rect.height > 0,
            disabled: element.disabled === true,
            opacity: style.opacity,
            pointerEvents: style.pointerEvents,
            rect: {
              x: Math.round(rect.x),
              y: Math.round(rect.y),
              width: Math.round(rect.width),
              height: Math.round(rect.height),
            },
            centerHit: describe(hit),
            unobscured:
              !hit || hit === element || element.contains(hit) || (hit instanceof Element && hit.contains(element)),
            parent: describe(element.parentElement),
            inShadowRoot: root instanceof ShadowRoot,
            shadowHost: root instanceof ShadowRoot ? describe(root.host) : null,
          };
        })
        .filter((entry) => entry.label)
    )
    .catch(() => []);

  const copyButtons = await locator
    .locator(CLAUDE_COPY_BUTTON_SELECTOR)
    .evaluateAll((elements) =>
      elements.slice(0, 10).map((element) => ({
        ariaLabel: element.getAttribute("aria-label") || "",
        dataTestId: element.getAttribute("data-testid") || "",
        text: (element.textContent || "").trim().slice(0, 80),
      }))
    )
    .catch(() => []);

  const globalCopyButtons = await page
    .locator(CLAUDE_COPY_BUTTON_SELECTOR)
    .evaluateAll((elements) =>
      elements.slice(0, 10).map((element) => ({
        ariaLabel: element.getAttribute("aria-label") || "",
        dataTestId: element.getAttribute("data-testid") || "",
        text: (element.textContent || "").trim().slice(0, 80),
      }))
    )
    .catch(() => []);

  return {
    messageCount: count,
    selectorCounts,
    globalCopyButtonCount,
    latestMessage,
    buttons,
    copyButtons,
    globalCopyButtons,
  };
}

async function readReplyState(page) {
  await scrollToBottom(page);
  const { count, locator } = await getLatestAssistantMessage(page);

  if (!locator) {
    return { count: 0, text: "" };
  }

  const copyButton = await pollForCopyButton(
    locator,
    page.locator(CLAUDE_COPY_BUTTON_SELECTOR).last(),
    250,
    750
  );

  return {
    count,
    text: copyButton ? `copy_ready:${count}` : "",
  };
}

async function open(page) {
  logger.stage("claude", "open", "Navigating to Claude.");
  await page.goto(claudeConfig.url, {
    waitUntil: "domcontentloaded",
    timeout: claudeConfig.navigationTimeoutMs,
  });

  const verificationDeadline = Date.now() + claudeConfig.navigationTimeoutMs;

  while (Date.now() < verificationDeadline) {
    const ready = await isReady(page);
    if (ready) {
      break;
    }

    const bodyText = await page.locator("body").innerText().catch(() => "");
    if (bodyText.includes(claudeConfig.verificationText)) {
      logger.info("Claude is showing human verification. Waiting for it to clear.");
      await sleep(2000);
      continue;
    }

    await sleep(1000);
  }

  if (!(await isReady(page))) {
    await page.goto(claudeConfig.conversationUrl, {
      waitUntil: "domcontentloaded",
      timeout: claudeConfig.navigationTimeoutMs,
    });
  }

  const deadline = Date.now() + claudeConfig.navigationTimeoutMs;

  while (Date.now() < deadline) {
    if (await findInputLocator(page)) {
      return;
    }

    await sleep(500);
  }

  throw createAgentError("selector_not_found", "Claude input selector not found.", {
    selector: claudeConfig.inputSelector,
    stage: "open",
  });
}

async function isReady(page) {
  try {
    return Boolean(await findInputLocator(page));
  } catch {
    return false;
  }
}

// Diagnostic only; does not affect control flow.
async function checkSiteGenerationSignal(page) {
  try {
    return await page.evaluate(() => {
      const stopBtn = document.querySelector(
        'button[aria-label="Stop streaming"], button[aria-label="Stop generating"], button[aria-label="Stop response"]'
      );
      if (stopBtn && stopBtn.offsetParent !== null) return "stop_button_visible";
      const streamingBtn = document.querySelector('[data-testid="stop-button"], .streaming button');
      if (streamingBtn && streamingBtn.offsetParent !== null) return "stop_button_visible";
      const assistantTurn = document.querySelector(
        '[data-testid="assistant-message"], [data-message-role="assistant"]'
      );
      if (assistantTurn) return "assistant_turn_present";
      return "none";
    });
  } catch {
    return "unknown";
  }
}

async function waitForSubmissionStart(page, inputLocator, timeoutMs) {
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    const currentInput = await readInputText(inputLocator);

    if (!currentInput.trim()) {
      return true;
    }

    await sleep(100);
  }

  return false;
}

async function waitForMessageSubmission(page, inputLocator) {
  const sendButton = page.locator(sendButtonSelector).first();
  const sendButtonReady = await waitForSendButtonReady(page);
  logger.info(`[DIAG][claude][waitForMessageSubmission] sendButtonReady=${sendButtonReady}`);

  if (sendButtonReady) {
    logger.info("[DIAG][claude][waitForMessageSubmission] attempting sendButton.click()");
    await sendButton.click();

    if (
      await waitForSubmissionStart(
        page,
        inputLocator,
        Math.max(injection.sendSettledTimeoutMs, 5000)
      )
    ) {
      const siteSignal = await checkSiteGenerationSignal(page);
      logger.info(
        `[DIAG][claude][waitForMessageSubmission] submit=sendButton_click | inputEmpty=true | siteSignal=${siteSignal}`
      );
      return;
    }
    logger.info(
      "[DIAG][claude][waitForMessageSubmission] sendButton.click() did not clear input - trying fallbacks"
    );
  }

  if (await waitForSubmissionStart(page, inputLocator, 1200)) {
    const siteSignal = await checkSiteGenerationSignal(page);
    logger.info(
      `[DIAG][claude][waitForMessageSubmission] submit=already_cleared | inputEmpty=true | siteSignal=${siteSignal}`
    );
    return;
  }

  if (injection.submitWithEnter) {
    logger.info("[DIAG][claude][waitForMessageSubmission] attempting Enter key");
    await inputLocator.click().catch(() => null);
    await page.keyboard.press("Enter");

    if (
      await waitForSubmissionStart(
        page,
        inputLocator,
        Math.max(injection.sendSettledTimeoutMs, 4000)
      )
    ) {
      const siteSignal = await checkSiteGenerationSignal(page);
      logger.info(
        `[DIAG][claude][waitForMessageSubmission] submit=Enter | inputEmpty=true | siteSignal=${siteSignal}`
      );
      return;
    }
    logger.info("[DIAG][claude][waitForMessageSubmission] Enter key did not clear input");
  }

  {
    const sendKey = process.platform === "darwin" ? "Meta+Enter" : "Control+Enter";
    logger.info(
      `[DIAG][claude][waitForMessageSubmission] attempting platform sendKey=${sendKey}`
    );
    await inputLocator.click().catch(() => null);
    await page.keyboard.press(sendKey);

    if (
      await waitForSubmissionStart(
        page,
        inputLocator,
        Math.max(injection.sendSettledTimeoutMs, 4000)
      )
    ) {
      const siteSignal = await checkSiteGenerationSignal(page);
      logger.info(
        `[DIAG][claude][waitForMessageSubmission] submit=${sendKey} | inputEmpty=true | siteSignal=${siteSignal}`
      );
      return;
    }
    logger.info(`[DIAG][claude][waitForMessageSubmission] ${sendKey} did not clear input`);
  }

  const observedInput = await readInputText(inputLocator);
  logger.warn(
    `[DIAG][claude][waitForMessageSubmission] ALL_PATHS_FAILED | inputEmpty=false | observedInput="${observedInput.slice(0, 120)}"`
  );
  throw createAgentError(
    "message_not_submitted",
    "Claude prompt remained in the input box after submit.",
    {
      stage: "inject",
      observedInput: observedInput.slice(0, 240),
    }
  );
}

async function sendMessage(page, text) {
  const expectedText = buildFullPromptText(text);
  const promptLengthClass =
    (expectedText || "").length >= (injection.longPromptThresholdChars || 320) ? "long" : "short";
  logger.info(
    `[DIAG][claude][sendMessage] start | platform=${process.platform} | len=${(expectedText || "").length} | class=${promptLengthClass} | forceFullPaste=${!!diagnostics.forceFullPaste}`
  );
  const deadline = Date.now() + claudeConfig.inputReadyTimeoutMs;
  let inputMatch = null;

  while (Date.now() < deadline) {
    inputMatch = await findInputLocator(page);
    if (inputMatch) {
      break;
    }

    await sleep(500);
  }

  if (!inputMatch) {
    throw createAgentError("selector_not_found", "Claude input selector not found.", {
      selector: claudeConfig.inputSelector,
      stage: "inject",
    });
  }

  await inputMatch.locator.click().catch((error) => {
    throw createAgentError("input_not_focusable", error.message, {
      selector: inputMatch.selector,
      stage: "inject",
    });
  });

  let injectionSettled = false;
  let observedInput = "";

  for (let attempt = 0; attempt < 2; attempt += 1) {
    logger.info(
      `[DIAG][claude][sendMessage] attempt=${attempt} | class=${promptLengthClass} | forceFullPaste=${!!diagnostics.forceFullPaste}`
    );
    await clearInput(page, inputMatch.locator).catch((error) => {
      throw createAgentError("input_not_focusable", error.message, {
        selector: inputMatch.selector,
        stage: "inject",
      });
    });

    if (diagnostics.forceFullPaste) {
      await pasteText(page, expectedText).catch((error) => {
        throw createAgentError("input_not_focusable", error.message, { stage: "inject" });
      });
      await sleep(injection.promptPastePauseMs || 1000);
    } else {
      await injectPrompt(page, text, injection.keystrokeDelayMs, promptInjectionOptions).catch(
        (error) => {
          throw createAgentError("input_not_focusable", error.message, {
            stage: "inject",
          });
        }
      );
    }

    if (expectedText && !diagnostics.forceFullPaste) {
      const { head: expectedHead } = buildComparisonMarkers(expectedText);
      if (expectedHead) {
        const postInjectNorm = normalizeInputForComparison(await readInputText(inputMatch.locator));
        if (postInjectNorm && !postInjectNorm.includes(expectedHead)) {
          await clearInput(page, inputMatch.locator).catch(() => null);
          await pasteText(page, expectedText);
          await sleep(injection.promptPastePauseMs || 1000);
        }
      }
    }

    const settleState = await waitForClaudePromptReady(page, inputMatch.locator, expectedText);
    injectionSettled = settleState.ready;
    observedInput = settleState.observedInput;
    const settleVerdict = settleState.ready
      ? "ready"
      : settleState.submitted
        ? "submitted"
        : "timed-out";
    logger.info(
      `[DIAG][claude][sendMessage] attempt=${attempt} | settle=${settleVerdict} | observedInput="${(observedInput || "").slice(0, 120)}"`
    );

    if (settleState.submitted) {
      const siteSignal = await checkSiteGenerationSignal(page);
      logger.info(
        `[DIAG][claude][sendMessage] early_exit via settle.submitted | siteSignal=${siteSignal}`
      );
      return;
    }

    if (injectionSettled) {
      logger.info(
        `[DIAG][claude][sendMessage] attempt=${attempt} injection settled - proceeding to submit`
      );
      break;
    }

    logger.info(
      `[DIAG][claude][sendMessage] attempt=${attempt} injection not settled - ${attempt < 1 ? "retrying" : "retry budget exhausted"}`
    );
  }

  if (!injectionSettled) {
    logger.warn(
      `[DIAG][claude][sendMessage] injection never settled after 2 attempts | class=${promptLengthClass}`
    );
    throw createAgentError(
      "prompt_injection_incomplete",
      "Claude prompt did not fully settle in the input box before submit.",
      {
        stage: "inject",
        selector: inputMatch.selector,
        observedInput: observedInput.slice(0, 240),
      }
    );
  }

  logger.info(
    `[DIAG][claude][sendMessage] entering waitForMessageSubmission | class=${promptLengthClass}`
  );
  await waitForMessageSubmission(page, inputMatch.locator).catch((error) => {
    throw createAgentError(error.code || "input_not_focusable", error.message, {
      selector: inputMatch.selector,
      stage: "inject",
      ...(error.details || {}),
    });
  });

  const siteSignalFinal = await checkSiteGenerationSignal(page);
  logger.info(
    `[DIAG][claude][sendMessage] sendMessage complete | siteSignal=${siteSignalFinal}`
  );
}

async function waitForCompletion(page) {
  const completionState = await waitForHybridCompletion({
    page,
    readReplyState,
    completionConfig: completion,
    detectionConfig: claudeConfig.completionDetection || {},
    onTimeout: () => {
      logger.warn("Claude copy-button readiness timed out.");
    },
    onError: (error) => {
      logger.error(`Claude copy-button readiness failed: ${error.message}`);
    },
  });

  if (completionState.reason === "stable") {
    logger.info("[claude] copy button is ready for the latest assistant reply.");
  }

  return completionState;
}

async function captureLastReply(page) {
  await scrollToBottom(page);
  const { count, locator } = await getLatestAssistantMessage(page);

  if (!locator) {
    const actionDiagnostics = await readLatestAssistantActionDiagnostics(page);
    logger.warn(
      `[claude] latest assistant action diagnostics: ${JSON.stringify(actionDiagnostics)}`
    );
    throw createAgentError("selector_not_found", "Claude assistant reply was not found.", {
      selector: CLAUDE_MESSAGE_SELECTOR,
      stage: "capture",
    });
  }

  const copyButton = await pollForCopyButton(
    locator,
    page.locator(CLAUDE_COPY_BUTTON_SELECTOR).last(),
    250,
    claudeConfig.captureTimeoutMs
  );

  if (!copyButton) {
    const actionDiagnostics = await readLatestAssistantActionDiagnostics(page);
    logger.warn("[claude] copy button did not become ready before capture timeout.");
    logger.warn(
      `[claude] latest assistant action diagnostics: ${JSON.stringify(actionDiagnostics)}`
    );
    throw createAgentError("selector_not_found", "Claude copy button did not resolve.", {
      selector: `${CLAUDE_MESSAGE_SELECTOR} -> ${CLAUDE_COPY_BUTTON_SELECTOR}`,
      stage: "capture",
    });
  }

  logger.info("[claude] copy button ready; clicking and reading clipboard.");

  try {
    const content = await clickCopyAndRead(page, locator, copyButton);
    logger.info(`[claude] copy capture succeeded (${content.length} chars).`);
    return content;
  } catch (error) {
    throw createAgentError(error.code || "capture_failed", error.message, {
      stage: "capture",
      selector: `${CLAUDE_MESSAGE_SELECTOR} -> ${CLAUDE_COPY_BUTTON_SELECTOR}`,
      ...(error.details || {}),
    });
  }
}

module.exports = {
  open,
  isReady,
  sendMessage,
  waitForCompletion,
  captureLastReply,
};
