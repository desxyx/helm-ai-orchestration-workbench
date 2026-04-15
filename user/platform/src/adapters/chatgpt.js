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
  normalizeInputText,
  pasteText,
  readInputText,
} = require("../utils/prompt");
const { sleep } = require("../utils/time");

const chatgptConfig = config.chatgpt;
const { completion } = config;
const injection = { ...config.injection, ...(chatgptConfig.injection || {}) };
const diagnostics = config.diagnostics || {};
const sendButtonSelectors = [
  'button[data-testid="send-button"]',
  'button[aria-label="Send prompt"]',
  'button[aria-label="Send message"]',
];
const CHATGPT_MESSAGE_SELECTOR = '[data-message-author-role="assistant"]';
const CHATGPT_COPY_BUTTON_SELECTOR = '[data-testid="copy-turn-action-button"]';
const promptInjectionOptions = {
  promptMode: "insert",
  summaryMode: "insert",
};

async function findInputLocator(page) {
  return findEditableInput(page, chatgptConfig.inputSelectors);
}

async function getLatestAssistantMessage(page) {
  const selectors = Array.from(
    new Set([CHATGPT_MESSAGE_SELECTOR, ...(chatgptConfig.replySelectors || [])])
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
    new Set([CHATGPT_MESSAGE_SELECTOR, ...(chatgptConfig.replySelectors || [])])
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
    .locator(CHATGPT_COPY_BUTTON_SELECTOR)
    .count()
    .catch(() => 0);

  if (!locator) {
    return { messageCount: count, selectorCounts, globalCopyButtonCount, latestMessage: null };
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
    .locator(CHATGPT_COPY_BUTTON_SELECTOR)
    .evaluateAll((elements) =>
      elements.slice(0, 10).map((element) => ({
        ariaLabel: element.getAttribute("aria-label") || "",
        dataTestId: element.getAttribute("data-testid") || "",
        text: (element.textContent || "").trim().slice(0, 80),
      }))
    )
    .catch(() => []);

  const globalCopyButtons = await page
    .locator(CHATGPT_COPY_BUTTON_SELECTOR)
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
    page.locator(CHATGPT_COPY_BUTTON_SELECTOR).last(),
    250,
    750
  );

  return {
    count,
    text: copyButton ? `copy_ready:${count}` : "",
  };
}

async function open(page) {
  logger.stage("chatgpt", "open", "Navigating to ChatGPT.");
  await page.goto(chatgptConfig.url, {
    waitUntil: "domcontentloaded",
    timeout: chatgptConfig.navigationTimeoutMs,
  });

  const verificationDeadline = Date.now() + chatgptConfig.navigationTimeoutMs;

  while (Date.now() < verificationDeadline) {
    const ready = await isReady(page);
    if (ready) {
      break;
    }

    const bodyText = await page.locator("body").innerText().catch(() => "");
    if (bodyText.includes(chatgptConfig.verificationText)) {
      logger.info("ChatGPT is showing verification. Waiting for it to clear.");
      await sleep(2000);
      continue;
    }

    await sleep(1000);
  }

  if (!(await isReady(page))) {
    await page.goto(chatgptConfig.conversationUrl, {
      waitUntil: "domcontentloaded",
      timeout: chatgptConfig.navigationTimeoutMs,
    });
  }

  const deadline = Date.now() + chatgptConfig.navigationTimeoutMs;
  while (Date.now() < deadline) {
    const inputMatch = await findInputLocator(page);
    if (inputMatch) {
      return;
    }

    await sleep(500);
  }

  throw createAgentError("selector_not_found", "ChatGPT input selector not found.", {
    selector: chatgptConfig.inputSelectors.join(", "),
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
      const stopBtn = document.querySelector('button[aria-label="Stop generating"]');
      const assistantTurn = document.querySelector('[data-message-author-role="assistant"]');
      if (stopBtn && stopBtn.offsetParent !== null) return "stop_button_visible";
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

async function waitForInjectedPrompt(page, inputLocator, expectedText) {
  const normalizedExpected = normalizeInputText(expectedText);
  const deadline = Date.now() + injection.inputSettleTimeoutMs;
  let observedInput = "";
  let sawContent = false;

  while (Date.now() < deadline) {
    observedInput = await readInputText(inputLocator);
    const normalizedObserved = normalizeInputText(observedInput);

    if (normalizedObserved) {
      sawContent = true;

      if (normalizedObserved === normalizedExpected) {
        return { ready: true, submitted: false, observedInput };
      }
    } else if (sawContent) {
      await sleep(150);
      observedInput = await readInputText(inputLocator);
      if (!normalizeInputText(observedInput)) {
        return { ready: false, submitted: true, observedInput };
      }
    }

    await sleep(100);
  }

  return { ready: false, submitted: false, observedInput };
}

async function waitForMessageSubmission(page, inputLocator) {
  if (await waitForSubmissionStart(page, inputLocator, 500)) {
    const siteSignal = await checkSiteGenerationSignal(page);
    logger.info(
      `[DIAG][chatgpt][waitForMessageSubmission] submit=already_cleared | inputEmpty=true | siteSignal=${siteSignal}`
    );
    return;
  }

  if (injection.submitWithEnter) {
    logger.info("[DIAG][chatgpt][waitForMessageSubmission] attempting Enter key");
    await inputLocator.click().catch(() => null);
    await page.keyboard.press("Enter");
    if (
      await waitForSubmissionStart(
        page,
        inputLocator,
        Math.max(injection.sendSettledTimeoutMs, 5000)
      )
    ) {
      const siteSignal = await checkSiteGenerationSignal(page);
      logger.info(
        `[DIAG][chatgpt][waitForMessageSubmission] submit=Enter | inputEmpty=true | siteSignal=${siteSignal}`
      );
      return;
    }
    logger.info("[DIAG][chatgpt][waitForMessageSubmission] Enter key did not clear input");
  }

  for (const selector of sendButtonSelectors) {
    const sendButton = page.locator(selector).first();
    const sendButtonReady = await sendButton
      .isVisible()
      .then((visible) => visible && sendButton.isEnabled())
      .catch(() => false);

    logger.info(
      `[DIAG][chatgpt][waitForMessageSubmission] trying selector="${selector}" | sendButtonReady=${sendButtonReady}`
    );

    if (!sendButtonReady) {
      continue;
    }

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
        `[DIAG][chatgpt][waitForMessageSubmission] submit=sendButton selector="${selector}" | inputEmpty=true | siteSignal=${siteSignal}`
      );
      return;
    }
    logger.info(
      `[DIAG][chatgpt][waitForMessageSubmission] sendButton click did not clear input | selector="${selector}"`
    );
  }

  if (await waitForSubmissionStart(page, inputLocator, 1200)) {
    const siteSignal = await checkSiteGenerationSignal(page);
    logger.info(
      `[DIAG][chatgpt][waitForMessageSubmission] submit=late_clear | inputEmpty=true | siteSignal=${siteSignal}`
    );
    return;
  }

  const observedInput = await readInputText(inputLocator);
  logger.warn(
    `[DIAG][chatgpt][waitForMessageSubmission] ALL_PATHS_FAILED | inputEmpty=false | observedInput="${observedInput.slice(0, 120)}"`
  );
  throw createAgentError(
    "message_not_submitted",
    "ChatGPT prompt remained in the input box after submit.",
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
    `[DIAG][chatgpt][sendMessage] start | platform=${process.platform} | len=${(expectedText || "").length} | class=${promptLengthClass} | forceFullPaste=${!!diagnostics.forceFullPaste}`
  );
  const deadline = Date.now() + chatgptConfig.inputReadyTimeoutMs;
  let inputMatch = null;

  while (Date.now() < deadline) {
    inputMatch = await findInputLocator(page);
    if (inputMatch) {
      break;
    }

    await sleep(500);
  }

  if (!inputMatch) {
    throw createAgentError("selector_not_found", "ChatGPT input selector not found.", {
      selector: chatgptConfig.inputSelectors.join(", "),
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
      `[DIAG][chatgpt][sendMessage] attempt=${attempt} | class=${promptLengthClass} | forceFullPaste=${!!diagnostics.forceFullPaste}`
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

    const settleState = await waitForInjectedPrompt(
      page,
      inputMatch.locator,
      expectedText
    );
    injectionSettled = settleState.ready;
    observedInput = settleState.observedInput;
    const settleVerdict = settleState.ready
      ? "ready"
      : settleState.submitted
        ? "submitted"
        : "timed-out";
    logger.info(
      `[DIAG][chatgpt][sendMessage] attempt=${attempt} | settle=${settleVerdict} | observedInput="${(observedInput || "").slice(0, 120)}"`
    );

    if (settleState.submitted) {
      const siteSignal = await checkSiteGenerationSignal(page);
      logger.info(
        `[DIAG][chatgpt][sendMessage] early_exit via settle.submitted | siteSignal=${siteSignal}`
      );
      return;
    }

    if (injectionSettled) {
      logger.info(
        `[DIAG][chatgpt][sendMessage] attempt=${attempt} injection settled - proceeding to submit`
      );
      break;
    }

    logger.info(
      `[DIAG][chatgpt][sendMessage] attempt=${attempt} injection not settled - ${attempt < 1 ? "retrying" : "retry budget exhausted"}`
    );
  }

  if (!injectionSettled) {
    logger.warn(
      `[DIAG][chatgpt][sendMessage] injection never settled after 2 attempts | class=${promptLengthClass}`
    );
    throw createAgentError(
      "prompt_injection_incomplete",
      "ChatGPT prompt did not fully settle in the input box before submit.",
      {
        stage: "inject",
        selector: inputMatch.selector,
        observedInput: observedInput.slice(0, 240),
      }
    );
  }

  logger.info(
    `[DIAG][chatgpt][sendMessage] entering waitForMessageSubmission | class=${promptLengthClass}`
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
    `[DIAG][chatgpt][sendMessage] sendMessage complete | siteSignal=${siteSignalFinal}`
  );
}

async function waitForCompletion(page) {
  const completionState = await waitForHybridCompletion({
    page,
    readReplyState,
    completionConfig: completion,
    detectionConfig: chatgptConfig.completionDetection,
    onTimeout: () => {
      logger.warn("ChatGPT copy-button readiness timed out.");
    },
    onError: (error) => {
      logger.error(`ChatGPT copy-button readiness failed: ${error.message}`);
    },
  });

  if (completionState.reason === "stable") {
    logger.info("[chatgpt] copy button is ready for the latest assistant reply.");
  }

  return completionState;
}

async function captureLastReply(page) {
  await scrollToBottom(page);
  const { count, locator } = await getLatestAssistantMessage(page);

  if (!locator) {
    throw createAgentError("selector_not_found", "ChatGPT assistant reply was not found.", {
      selector: CHATGPT_MESSAGE_SELECTOR,
      stage: "capture",
    });
  }

  const copyButton = await pollForCopyButton(
    locator,
    page.locator(CHATGPT_COPY_BUTTON_SELECTOR).last(),
    250,
    chatgptConfig.captureTimeoutMs
  );

  if (!copyButton) {
    const actionDiagnostics = await readLatestAssistantActionDiagnostics(page);
    logger.warn("[chatgpt] copy button did not become ready before capture timeout.");
    logger.warn(
      `[chatgpt] latest assistant action diagnostics: ${JSON.stringify(actionDiagnostics)}`
    );
    throw createAgentError("selector_not_found", "ChatGPT copy button did not resolve.", {
      selector: `${CHATGPT_MESSAGE_SELECTOR} -> ${CHATGPT_COPY_BUTTON_SELECTOR}`,
      stage: "capture",
    });
  }

  logger.info("[chatgpt] copy button ready; clicking and reading clipboard.");

  try {
    const content = await clickCopyAndRead(page, locator, copyButton);
    logger.info(`[chatgpt] copy capture succeeded (${content.length} chars).`);
    return content;
  } catch (error) {
    throw createAgentError(error.code || "capture_failed", error.message, {
      stage: "capture",
      selector: `${CHATGPT_MESSAGE_SELECTOR} -> ${CHATGPT_COPY_BUTTON_SELECTOR}`,
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
