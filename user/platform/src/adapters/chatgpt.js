const config = require("../../config");
const { createAgentError } = require("../utils/errors");
const logger = require("../utils/logger");
const { waitForHybridCompletion } = require("../utils/completion");
const {
  clickCopyAndRead,
  locateLatestTurnCopyButton,
  probeCopyReady,
  pollForCopyButton,
  readLatestTurnState,
  scrollToBottom,
} = require("./copyCapture");
const {
  buildFullPromptText,
  clearInput,
  findEditableInput,
  hasPositiveSubmissionEvidence,
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
  "#composer-submit-button",
  'button[data-testid="send-button"]',
  'form[data-chatgpt-composer] button[type="submit"]',
  'button[aria-label="Send prompt"]',
  'button[aria-label="Send message"]',
];
const stopButtonSelectors = [
  'button[data-testid="stop-button"]',
  'button[aria-label="Stop"]',
  'button[aria-label="Stop generating"]',
];
const CHATGPT_ASSISTANT_TURN_SELECTORS = Array.from(
  new Set([
    ...(chatgptConfig.replySelectors || []),
    '[data-turn-key]:has([data-conversation-role="assistant"])',
    'section[data-turn="assistant"]',
    '[data-testid^="conversation-turn-"][data-turn="assistant"]',
    '[data-testid^="conversation-turn-"][data-message-author-role="assistant"]',
    '[data-testid^="conversation-turn-"]:has([data-message-author-role="assistant"])',
    '[data-message-author-role="assistant"]',
  ])
);
const CHATGPT_USER_TURN_SELECTORS = [
  '[data-turn-key]:has([data-user-message-bubble])',
  'section[data-turn="user"]',
  '[data-testid^="conversation-turn-"][data-turn="user"]',
  '[data-testid^="conversation-turn-"][data-message-author-role="user"]',
  '[data-testid^="conversation-turn-"]:has([data-message-author-role="user"])',
  '[data-message-author-role="user"]',
];
const CHATGPT_MESSAGE_SELECTOR = CHATGPT_ASSISTANT_TURN_SELECTORS.join(", ");
const CHATGPT_COPY_BUTTON_SELECTOR = [
  'button[data-testid="copy-turn-action-button"]',
  'button[aria-label*="Copy response" i]',
  'button[aria-label="Copy"]',
].join(", ");
const promptInjectionOptions = {
  promptMode: "insert",
  summaryMode: "insert",
};
// The assistant turn container can also hold the user's message and its own copy button, so
// the copy button must come after the assistant content anchor inside the turn.
const CHATGPT_REPLY_SCOPE = {
  messageSelectors: CHATGPT_ASSISTANT_TURN_SELECTORS,
  visibleOnly: true,
  anchorSelector: '[data-message-author-role="assistant"], [data-conversation-role="assistant"]',
  copyButtonSelector: CHATGPT_COPY_BUTTON_SELECTOR,
};
// Assistant-turn count recorded just before each submit; the reply for that submit must be a
// turn beyond it (guards against capturing the previous round's reply).
const submitBaselines = new WeakMap();

async function findInputLocator(page) {
  return findEditableInput(page, chatgptConfig.inputSelectors);
}

async function getLatestVisibleTurn(page, selectors) {
  for (const selector of selectors) {
    const messages = page.locator(selector);
    const count = await messages.count().catch(() => 0);

    for (let index = count - 1; index >= 0; index -= 1) {
      const candidate = messages.nth(index);
      const visible = await candidate.isVisible().catch(() => false);
      if (visible) {
        return {
          count,
          locator: candidate,
          selector,
        };
      }
    }
  }

  return {
    count: 0,
    locator: null,
    selector: "",
  };
}

async function getLatestAssistantMessage(page) {
  return getLatestVisibleTurn(page, CHATGPT_ASSISTANT_TURN_SELECTORS);
}

async function getLatestUserMessage(page) {
  return getLatestVisibleTurn(page, CHATGPT_USER_TURN_SELECTORS);
}

async function findVisibleStopButton(page) {
  for (const selector of stopButtonSelectors) {
    const button = page.locator(selector).first();
    const visible = await button.isVisible().catch(() => false);
    if (visible) {
      return selector;
    }
  }

  return "";
}

async function readLatestAssistantActionDiagnostics(page) {
  const selectors = CHATGPT_ASSISTANT_TURN_SELECTORS;
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
  const { count, copyAttached, textLength } = await readLatestTurnState(page, CHATGPT_REPLY_SCOPE);
  const baselineCount = submitBaselines.get(page);
  const isNewTurn = baselineCount === undefined || count > baselineCount;

  return {
    count,
    text: isNewTurn && copyAttached ? `copy_ready:${count}:${textLength}` : "",
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
    const stopSelector = await findVisibleStopButton(page);
    if (stopSelector) {
      return `stop_button_visible:${stopSelector}`;
    }

    const assistantTurn = await getLatestAssistantMessage(page);
    return assistantTurn.locator
      ? `assistant_turn_present:${assistantTurn.selector}`
      : "none";
  } catch {
    return "unknown";
  }
}

async function readSubmissionEvidence(page, baseline) {
  const currentInput = await findInputLocator(page).catch(() => null);
  const currentInputText = currentInput
    ? await readInputText(currentInput.locator)
    : null;
  const currentInputEmpty =
    currentInputText !== null && !normalizeInputText(currentInputText);
  const stopSelector = await findVisibleStopButton(page);
  const userTurn = await getLatestUserMessage(page);
  const assistantTurn = await getLatestAssistantMessage(page);
  const currentUrl = page.url();
  const urlChanged = currentUrl !== baseline.url;
  const userTurnAdded = userTurn.count > baseline.userTurnCount;
  const assistantTurnAdded = assistantTurn.count > baseline.assistantTurnCount;

  return {
    submitted: hasPositiveSubmissionEvidence({
      stopSelector,
      userTurnAdded,
      assistantTurnAdded,
      urlChanged,
    }),
    currentInputEmpty,
    currentInputFound: Boolean(currentInput),
    stopSelector,
    userTurnAdded,
    assistantTurnAdded,
    urlChanged,
    currentUrl,
    userTurnSelector: userTurn.selector,
    assistantTurnSelector: assistantTurn.selector,
  };
}

function summarizeSubmissionEvidence(evidence) {
  if (!evidence) {
    return "none";
  }

  return [
    `inputFound=${evidence.currentInputFound}`,
    `inputEmpty=${evidence.currentInputEmpty}`,
    `stop=${evidence.stopSelector || "none"}`,
    `userTurnAdded=${evidence.userTurnAdded}`,
    `assistantTurnAdded=${evidence.assistantTurnAdded}`,
    `urlChanged=${evidence.urlChanged}`,
  ].join(" | ");
}

async function waitForSubmissionStart(page, baseline, timeoutMs) {
  const deadline = Date.now() + timeoutMs;
  let latestEvidence = null;

  while (Date.now() < deadline) {
    latestEvidence = await readSubmissionEvidence(page, baseline);

    if (latestEvidence.submitted) {
      return latestEvidence;
    }

    await sleep(100);
  }

  return latestEvidence;
}

async function waitForInjectedPrompt(page, inputLocator, expectedText) {
  const normalizedExpected = normalizeInputText(expectedText);
  const deadline = Date.now() + injection.inputSettleTimeoutMs;
  let observedInput = "";

  while (Date.now() < deadline) {
    observedInput = await readInputText(inputLocator);
    const normalizedObserved = normalizeInputText(observedInput);

    if (normalizedObserved === normalizedExpected) {
      return { ready: true, submitted: false, observedInput };
    }

    await sleep(100);
  }

  return { ready: false, submitted: false, observedInput };
}

async function waitForMessageSubmission(page, inputLocator, baseline) {
  let submissionEvidence = await waitForSubmissionStart(page, baseline, 500);
  if (submissionEvidence?.submitted) {
    const siteSignal = await checkSiteGenerationSignal(page);
    logger.info(
      `[DIAG][chatgpt][waitForMessageSubmission] submit=already_started | ${summarizeSubmissionEvidence(submissionEvidence)} | siteSignal=${siteSignal}`
    );
    return;
  }

  if (injection.submitWithEnter) {
    logger.info("[DIAG][chatgpt][waitForMessageSubmission] attempting Enter key");
    await inputLocator.click().catch(() => null);
    await page.keyboard.press("Enter");
    submissionEvidence = await waitForSubmissionStart(
      page,
      baseline,
      Math.max(injection.sendSettledTimeoutMs, 5000)
    );
    if (submissionEvidence?.submitted) {
      const siteSignal = await checkSiteGenerationSignal(page);
      logger.info(
        `[DIAG][chatgpt][waitForMessageSubmission] submit=Enter | ${summarizeSubmissionEvidence(submissionEvidence)} | siteSignal=${siteSignal}`
      );
      return;
    }
    logger.info(
      `[DIAG][chatgpt][waitForMessageSubmission] Enter did not produce submission evidence | ${summarizeSubmissionEvidence(submissionEvidence)}`
    );
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

    submissionEvidence = await waitForSubmissionStart(
      page,
      baseline,
      Math.max(injection.sendSettledTimeoutMs, 5000)
    );
    if (submissionEvidence?.submitted) {
      const siteSignal = await checkSiteGenerationSignal(page);
      logger.info(
        `[DIAG][chatgpt][waitForMessageSubmission] submit=sendButton selector="${selector}" | ${summarizeSubmissionEvidence(submissionEvidence)} | siteSignal=${siteSignal}`
      );
      return;
    }
    logger.info(
      `[DIAG][chatgpt][waitForMessageSubmission] sendButton click did not clear input | selector="${selector}"`
    );
  }

  submissionEvidence = await waitForSubmissionStart(page, baseline, 1200);
  if (submissionEvidence?.submitted) {
    const siteSignal = await checkSiteGenerationSignal(page);
    logger.info(
      `[DIAG][chatgpt][waitForMessageSubmission] submit=late_signal | ${summarizeSubmissionEvidence(submissionEvidence)} | siteSignal=${siteSignal}`
    );
    return;
  }

  const observedInput = await readInputText(inputLocator);
  logger.warn(
    `[DIAG][chatgpt][waitForMessageSubmission] ALL_PATHS_FAILED | ${summarizeSubmissionEvidence(submissionEvidence)} | observedInput="${observedInput.slice(0, 120)}"`
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

  const baselineUserTurn = await getLatestUserMessage(page);
  const baselineAssistantTurn = await getLatestAssistantMessage(page);
  const submissionBaseline = {
    url: page.url(),
    userTurnCount: baselineUserTurn.count,
    assistantTurnCount: baselineAssistantTurn.count,
  };
  submitBaselines.set(page, baselineAssistantTurn.count);

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
    const settleVerdict = settleState.ready ? "ready" : "timed-out";
    logger.info(
      `[DIAG][chatgpt][sendMessage] attempt=${attempt} | settle=${settleVerdict} | observedInput="${(observedInput || "").slice(0, 120)}"`
    );

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
  await waitForMessageSubmission(page, inputMatch.locator, submissionBaseline).catch((error) => {
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

async function probeReplyFinished(page, { allowHover = false } = {}) {
  const target = await locateLatestTurnCopyButton(page, CHATGPT_REPLY_SCOPE);
  const hoverTarget = allowHover ? (await getLatestAssistantMessage(page)).locator : null;
  return probeCopyReady(target, hoverTarget);
}

async function waitForCompletion(page) {
  const completionState = await waitForHybridCompletion({
    page,
    readReplyState,
    completionConfig: completion,
    detectionConfig: {
      ...chatgptConfig.completionDetection,
      busySelectors: [
        ...(chatgptConfig.completionDetection.busySelectors || []),
        ...stopButtonSelectors,
      ],
    },
    baselineState: submitBaselines.has(page)
      ? { count: submitBaselines.get(page), text: "" }
      : null,
    probeFinished: probeReplyFinished,
    label: "ChatGPT",
    onTimeout: () => {
      logger.warn("ChatGPT copy-button readiness timed out.");
    },
    onError: (error) => {
      logger.error(`ChatGPT copy-button readiness failed: ${error.message}`);
    },
  });

  if (completionState.reason === "stable" || completionState.reason === "stable_probe") {
    logger.info("[chatgpt] copy button is ready for the latest assistant reply.");
  }

  return completionState;
}

async function captureLastReply(page, { force = false } = {}) {
  await scrollToBottom(page);
  const { count, locator } = await getLatestAssistantMessage(page);

  if (!locator) {
    throw createAgentError("selector_not_found", "ChatGPT assistant reply was not found.", {
      selector: CHATGPT_MESSAGE_SELECTOR,
      stage: "capture",
    });
  }

  const baselineCount = submitBaselines.get(page);
  if (!force && baselineCount !== undefined && count <= baselineCount) {
    throw createAgentError(
      "no_new_assistant_turn",
      "ChatGPT has no assistant reply newer than the one before this submit.",
      { stage: "capture", baselineCount, count }
    );
  }

  const lastCopyButtonLocator = page.locator(CHATGPT_COPY_BUTTON_SELECTOR).last();
  let copyButton = await pollForCopyButton(
    locator,
    () => locateLatestTurnCopyButton(page, CHATGPT_REPLY_SCOPE),
    250,
    force ? Math.max(chatgptConfig.captureTimeoutMs, 20000) : chatgptConfig.captureTimeoutMs,
    { requireEnabled: !force }
  );

  if (!copyButton && force) {
    // Manual Refresh Reply: the operator has already looked at the page and confirmed a
    // copy control is there. Grab the bottom-most match directly instead of failing on
    // Playwright's visibility/enabled gate (see clickCopyAndRead's force path).
    logger.info(
      "[chatgpt] force refresh: copy button did not clear the normal readiness gate; grabbing the bottom-most match directly."
    );
    copyButton = lastCopyButtonLocator;
  }

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
    const content = await clickCopyAndRead(page, locator, copyButton, { force });
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
