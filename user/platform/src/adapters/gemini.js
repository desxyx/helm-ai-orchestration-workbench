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
  readInputText,
  waitForInputEmpty,
  waitForInputText,
} = require("../utils/prompt");
const { sleep } = require("../utils/time");

const geminiConfig = config.gemini;
const { completion } = config;
const injection = { ...config.injection, ...(geminiConfig.injection || {}) };
const sendButtonSelectors = [
  'button[aria-label="Send message"]',
  'button[aria-label*="Send"]',
  'button[mattooltip="Send message"]',
  'button[mattooltip*="Send"]',
  'button[data-testid*="send"]',
  'button:has-text("Send")',
  'button[aria-label="Run"]',
  'button[mattooltip="Run"]',
  'button:has-text("Run")',
  'button[type="submit"]',
];
const GEMINI_MESSAGE_SELECTOR = "message-content";
const GEMINI_COPY_BUTTON_SELECTOR = 'button[mattooltip="Copy response"]';

async function findInputLocator(page) {
  return findEditableInput(page, geminiConfig.inputSelector);
}

async function getLatestAssistantMessage(page) {
  const selectors = Array.from(
    new Set([GEMINI_MESSAGE_SELECTOR, ...(geminiConfig.replySelectors || [])])
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
    new Set([GEMINI_MESSAGE_SELECTOR, ...(geminiConfig.replySelectors || [])])
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
    .locator(GEMINI_COPY_BUTTON_SELECTOR)
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
          mattooltip: node.getAttribute("mattooltip") || "",
        };
      };
      const isCopyLike = (node) => {
        const label = (
          node.getAttribute("aria-label") ||
          node.getAttribute("mattooltip") ||
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
              mattooltip: node.getAttribute("mattooltip") || "",
            };
          };

          const label = (
            element.getAttribute("aria-label") ||
            element.getAttribute("mattooltip") ||
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
    .locator(GEMINI_COPY_BUTTON_SELECTOR)
    .evaluateAll((elements) =>
      elements.slice(0, 10).map((element) => ({
        ariaLabel: element.getAttribute("aria-label") || "",
        mattooltip: element.getAttribute("mattooltip") || "",
        dataTestId: element.getAttribute("data-testid") || "",
        text: (element.textContent || "").trim().slice(0, 80),
      }))
    )
    .catch(() => []);

  const globalCopyButtons = await page
    .locator(GEMINI_COPY_BUTTON_SELECTOR)
    .evaluateAll((elements) =>
      elements.slice(0, 10).map((element) => ({
        ariaLabel: element.getAttribute("aria-label") || "",
        mattooltip: element.getAttribute("mattooltip") || "",
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

async function checkSiteGenerationSignal(page, baselineReplyCount = 0) {
  try {
    return await page.evaluate((baselineCount) => {
      const isVisible = (element) => {
        if (!(element instanceof HTMLElement)) {
          return false;
        }

        const style = window.getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return (
          style.visibility !== "hidden" &&
          style.display !== "none" &&
          rect.width > 0 &&
          rect.height > 0
        );
      };

      const buttons = Array.from(document.querySelectorAll("button"));
      for (const button of buttons) {
        if (!isVisible(button)) {
          continue;
        }

        const label = (
          button.getAttribute("aria-label") ||
          button.getAttribute("mattooltip") ||
          button.innerText ||
          ""
        )
          .trim()
          .toLowerCase();

        if (
          label === "stop" ||
          label.includes("stop generating") ||
          label.includes("stop response")
        ) {
          return "stop_button_visible";
        }
      }

      const replyCount = document.querySelectorAll("message-content").length;
      if (replyCount > baselineCount) {
        return "assistant_turn_present";
      }

      const mainText = (
        document.querySelector("main")?.innerText ||
        document.body?.innerText ||
        ""
      ).toLowerCase();
      if (mainText.includes("thinking") || mainText.includes("show thinking")) {
        return "thinking_visible";
      }

      return "none";
    }, baselineReplyCount);
  } catch {
    return "unknown";
  }
}

async function isLocatorReady(locator) {
  return locator
    .isVisible()
    .then((visible) => visible && locator.isEnabled())
    .catch(() => false);
}

async function waitForSendButtonCandidate(
  page,
  timeoutMs = injection.sendButtonReadyTimeoutMs || 2500
) {
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    for (const selector of sendButtonSelectors) {
      const locator = page.locator(selector).last();
      if (await isLocatorReady(locator)) {
        return { selector, locator };
      }
    }

    await sleep(100);
  }

  return null;
}

async function readVisibleButtonDiagnostics(page) {
  try {
    return await page.evaluate(() => {
      const isVisible = (element) => {
        if (!(element instanceof HTMLElement)) {
          return false;
        }

        const style = window.getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return (
          style.visibility !== "hidden" &&
          style.display !== "none" &&
          rect.width > 0 &&
          rect.height > 0
        );
      };

      return Array.from(document.querySelectorAll("button"))
        .filter((button) => isVisible(button))
        .slice(0, 20)
        .map((button) => ({
          label: (
            button.getAttribute("aria-label") ||
            button.getAttribute("mattooltip") ||
            button.innerText ||
            ""
          )
            .trim()
            .slice(0, 60),
          disabled: !!button.disabled,
          type: button.getAttribute("type") || "",
        }));
    });
  } catch {
    return [];
  }
}

async function attemptButtonSubmission(page, inputLocator, selector, locator, label) {
  logger.info(
    `[DIAG][gemini][waitForMessageSubmission] trying ${label} | selector="${selector}"`
  );

  await locator.scrollIntoViewIfNeeded().catch(() => null);
  await locator.click().catch(() => null);

  if (await waitForInputEmpty(inputLocator, injection.sendSettledTimeoutMs)) {
    if (await waitForSubmissionAcknowledgement(page, label)) {
      return true;
    }
  }

  logger.info(
    `[DIAG][gemini][waitForMessageSubmission] ${label} did not clear input | selector="${selector}"`
  );

  await locator.click({ force: true }).catch(() => null);

  if (await waitForInputEmpty(inputLocator, injection.sendSettledTimeoutMs)) {
    if (await waitForSubmissionAcknowledgement(page, `${label}_force`)) {
      return true;
    }
  }

  logger.info(
    `[DIAG][gemini][waitForMessageSubmission] ${label} force-click did not clear input | selector="${selector}"`
  );
  return false;
}

async function waitForSubmissionAcknowledgement(page, label, baselineReplyCount) {
  const submissionAckTimeoutMs = Math.max(injection.sendSettledTimeoutMs || 0, 5000);
  const deadline = Date.now() + submissionAckTimeoutMs;
  let lastSignal = "none";

  while (Date.now() < deadline) {
    const inputMatch = await findInputLocator(page);
    const currentInput = inputMatch ? await readInputText(inputMatch.locator) : "";
    lastSignal = await checkSiteGenerationSignal(page, baselineReplyCount);

    if (!currentInput.trim() && lastSignal !== "none" && lastSignal !== "unknown") {
      logger.info(
        `[DIAG][gemini][waitForMessageSubmission] submit=${label} | inputEmpty=true | siteSignal=${lastSignal}`
      );
      return true;
    }

    await sleep(100);
  }

  logger.info(
    `[DIAG][gemini][waitForMessageSubmission] submit=${label} not acknowledged | lastSignal=${lastSignal}`
  );
  return false;
}

async function readReplyState(page) {
  await scrollToBottom(page);
  const { count, locator } = await getLatestAssistantMessage(page);

  if (!locator) {
    return { count: 0, text: "" };
  }

  const copyButton = await pollForCopyButton(
    locator,
    page.locator(GEMINI_COPY_BUTTON_SELECTOR).last(),
    250,
    750
  );

  return {
    count,
    text: copyButton ? `copy_ready:${count}` : "",
  };
}

async function open(page) {
  logger.stage("gemini", "open", "Navigating to Gemini.");
  await page.goto(geminiConfig.url, {
    waitUntil: "domcontentloaded",
    timeout: geminiConfig.navigationTimeoutMs,
  });

  const verificationDeadline = Date.now() + geminiConfig.navigationTimeoutMs;

  while (Date.now() < verificationDeadline) {
    const ready = await isReady(page);
    if (ready) {
      break;
    }

    const bodyText = await page.locator("body").innerText().catch(() => "");
    if (bodyText.includes(geminiConfig.verificationText)) {
      logger.info("Gemini is showing verification. Waiting for it to clear.");
      await sleep(2000);
      continue;
    }

    await sleep(1000);
  }

  if (!(await isReady(page))) {
    await page.goto(geminiConfig.conversationUrl, {
      waitUntil: "domcontentloaded",
      timeout: geminiConfig.navigationTimeoutMs,
    });
  }

  const deadline = Date.now() + geminiConfig.navigationTimeoutMs;

  while (Date.now() < deadline) {
    if (await findInputLocator(page)) {
      return;
    }

    await sleep(500);
  }

  throw createAgentError("selector_not_found", "Gemini input selector not found.", {
    selector: geminiConfig.inputSelector,
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

async function waitForMessageSubmission(page, inputLocator) {
  const baselineReplyCount = await getLatestAssistantMessage(page)
    .then((state) => state.count)
    .catch(() => 0);

  await inputLocator.click().catch(() => null);
  logger.info("[DIAG][gemini][waitForMessageSubmission] attempting Enter key");
  await page.keyboard.press("Enter");

  if (await waitForInputEmpty(inputLocator, injection.sendSettledTimeoutMs)) {
    if (await waitForSubmissionAcknowledgement(page, "Enter", baselineReplyCount)) {
      return;
    }
  }

  const sendKey = process.platform === "darwin" ? "Meta+Enter" : "Control+Enter";
  logger.info(
    `[DIAG][gemini][waitForMessageSubmission] attempting platform sendKey=${sendKey}`
  );
  await inputLocator.click().catch(() => null);
  await page.keyboard.press(sendKey).catch(() => null);

  if (await waitForInputEmpty(inputLocator, injection.sendSettledTimeoutMs)) {
    if (await waitForSubmissionAcknowledgement(page, sendKey, baselineReplyCount)) {
      return;
    }
  }

  const sendButtonCandidate = await waitForSendButtonCandidate(page);
  if (sendButtonCandidate) {
    const submitted = await attemptButtonSubmission(
      page,
      inputLocator,
      sendButtonCandidate.selector,
      sendButtonCandidate.locator,
      `sendButton selector="${sendButtonCandidate.selector}"`
    );
    if (submitted) {
      return;
    }
  }

  const observedInput = await readInputText(inputLocator);
  const siteSignal = await checkSiteGenerationSignal(page, baselineReplyCount);
  const visibleButtons = await readVisibleButtonDiagnostics(page);
  logger.warn(
    `[DIAG][gemini][waitForMessageSubmission] ALL_PATHS_FAILED | inputEmpty=${!observedInput.trim()} | siteSignal=${siteSignal} | visibleButtons=${JSON.stringify(visibleButtons)} | observedInput="${observedInput.slice(0, 120)}"`
  );
  throw createAgentError(
    "message_not_submitted",
    "Gemini prompt remained in the input box after submit.",
    {
      stage: "inject",
      observedInput: observedInput.slice(0, 240),
    }
  );
}

async function sendMessage(page, text) {
  const expectedText = buildFullPromptText(text);
  const deadline = Date.now() + geminiConfig.inputReadyTimeoutMs;
  let inputMatch = null;

  while (Date.now() < deadline) {
    inputMatch = await findInputLocator(page);
    if (inputMatch) {
      break;
    }

    await sleep(500);
  }

  if (!inputMatch) {
    throw createAgentError("selector_not_found", "Gemini input selector not found.", {
      selector: geminiConfig.inputSelector,
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
    await clearInput(page, inputMatch.locator).catch((error) => {
      throw createAgentError("input_not_focusable", error.message, {
        selector: inputMatch.selector,
        stage: "inject",
      });
    });

    await injectPrompt(page, text, injection.keystrokeDelayMs).catch((error) => {
      throw createAgentError("input_not_focusable", error.message, {
        stage: "inject",
      });
    });

    injectionSettled = await waitForInputText(
      inputMatch.locator,
      expectedText,
      injection.inputSettleTimeoutMs
    );

    if (injectionSettled) {
      break;
    }

    observedInput = await readInputText(inputMatch.locator);
  }

  if (!injectionSettled) {
    throw createAgentError(
      "prompt_injection_incomplete",
      "Gemini prompt did not fully settle in the input box before submit.",
      {
        stage: "inject",
        selector: inputMatch.selector,
        observedInput: observedInput.slice(0, 240),
      }
    );
  }

  await waitForMessageSubmission(page, inputMatch.locator).catch((error) => {
    throw createAgentError(error.code || "input_not_focusable", error.message, {
      selector: inputMatch.selector,
      stage: "inject",
      ...(error.details || {}),
    });
  });
}

async function waitForCompletion(page) {
  const completionState = await waitForHybridCompletion({
    page,
    readReplyState,
    completionConfig: completion,
    detectionConfig: geminiConfig.completionDetection,
    onTimeout: () => {
      logger.warn("Gemini copy-button readiness timed out.");
    },
    onError: (error) => {
      logger.error(`Gemini copy-button readiness failed: ${error.message}`);
    },
  });

  if (completionState.reason === "stable") {
    logger.info("[gemini] copy button is ready for the latest assistant reply.");
  }

  return completionState;
}

async function captureLastReply(page) {
  await scrollToBottom(page);
  const { count, locator } = await getLatestAssistantMessage(page);

  if (!locator) {
    throw createAgentError("selector_not_found", "Gemini assistant reply was not found.", {
      selector: GEMINI_MESSAGE_SELECTOR,
      stage: "capture",
    });
  }

  const copyButton = await pollForCopyButton(
    locator,
    page.locator(GEMINI_COPY_BUTTON_SELECTOR).last(),
    250,
    geminiConfig.captureTimeoutMs
  );

  if (!copyButton) {
    const actionDiagnostics = await readLatestAssistantActionDiagnostics(page);
    logger.warn("[gemini] copy button did not become ready before capture timeout.");
    logger.warn(
      `[gemini] latest assistant action diagnostics: ${JSON.stringify(actionDiagnostics)}`
    );
    throw createAgentError("selector_not_found", "Gemini copy button did not resolve.", {
      selector: `${GEMINI_MESSAGE_SELECTOR} -> ${GEMINI_COPY_BUTTON_SELECTOR}`,
      stage: "capture",
    });
  }

  logger.info("[gemini] copy button ready; clicking and reading clipboard.");

  try {
    const content = await clickCopyAndRead(page, locator, copyButton);
    logger.info(`[gemini] copy capture succeeded (${content.length} chars).`);
    return content;
  } catch (error) {
    throw createAgentError(error.code || "capture_failed", error.message, {
      stage: "capture",
      selector: `${GEMINI_MESSAGE_SELECTOR} -> ${GEMINI_COPY_BUTTON_SELECTOR}`,
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
