module.exports = {
  agent: "claude",

  claude: {
    url: "https://claude.ai",
    conversationUrl: "https://claude.ai/new",
    userDataDir: "browser-profiles/claude",
    inputSelector: 'div[contenteditable="true"]',
    lastReplySelector: '[data-testid="assistant-message"]',
    replySelectors: [
      '[data-testid="assistant-message"]',
      '[data-testid*="assistant"]',
      "p.font-claude-response-body",
    ],
    verificationText: "Verifying you are human",
    navigationTimeoutMs: 120000,
    inputReadyTimeoutMs: 30000,
    captureTimeoutMs: 10000,
    // F07: Per-adapter injection overrides. Merged over shared injection at runtime.
    // Claude uses React 18 + ProseMirror contentEditable — strictest event requirements.
    injection: {
      inputSettleTimeoutMs: 8000,
      sendButtonReadyTimeoutMs: 2500,
    },
  },

  gemini: {
    url: "https://gemini.google.com",
    conversationUrl: "https://gemini.google.com/app",
    userDataDir: "browser-profiles/gemini",
    inputSelector: 'textarea, div[contenteditable="true"], rich-textarea .ql-editor',
    replySelectors: [
      'div[id^="model-response-message-content"]',
      ".model-response-text",
      '[data-message-author-role="model"]',
    ],
    verificationText: "Verify it's you",
    navigationTimeoutMs: 120000,
    inputReadyTimeoutMs: 30000,
    captureTimeoutMs: 10000,
    // F07: Gemini injection params initialized from current working values — do not change.
    // Angular + rich textarea; more tolerant than Claude/ChatGPT.
    injection: {},
    completionDetection: {
      stabilityWindowMs: 5000,
      fastStabilityWindowMs: 1500,
      fastReplyMinChars: 24,
      networkQuietMs: 1000,
      startTimeoutMs: 30000,
      requestUrlPatterns: [
        "BardFrontendService",
        "streamGenerateContent",
        "GenerateContent",
        "ContentGenerator",
      ],
      busyTextPatterns: ["Show thinking", "Thinking"],
      busySelectors: ['button:has-text("Stop")'],
    },
  },

  chatgpt: {
    url: "https://chatgpt.com",
    conversationUrl: "https://chatgpt.com/",
    userDataDir: "browser-profiles/chatgpt",
    inputSelectors: [
      "#prompt-textarea",
      'textarea[data-id="root"]',
      'textarea[placeholder*="Message"]',
      "textarea",
      'div[contenteditable="true"]',
    ],
    replySelectors: ['[data-message-author-role="assistant"]'],
    verificationText: "Verify you are human",
    navigationTimeoutMs: 120000,
    inputReadyTimeoutMs: 30000,
    captureTimeoutMs: 10000,
    // F07: ChatGPT injection params. React + Quill-like textarea (moderate requirements).
    // Start from shared base; tune independently once Claude F01-F04 stabilise.
    injection: {},
    completionDetection: {
      stabilityWindowMs: 2500,
      fastStabilityWindowMs: 1500,
      fastReplyMinChars: 24,
      networkQuietMs: 1000,
      busyCooldownMs: 800,
      postTimeoutGraceMs: 10000,
      postTimeoutStabilityMs: 3000,
      requestUrlPatterns: [
        "backend-api",
        "/conversation",
        "/responses",
        "/messages",
      ],
      busyTextPatterns: ["Thinking", "Thought for", "Stop generating"],
      busySelectors: [
        'button:has-text("Stop generating")',
        'button:has-text("Thinking")',
        'button:has-text("Thought for")',
      ],
    },
  },

  completion: {
    pollIntervalMs: 500,
    stabilityWindowMs: 3000,
    hardTimeoutMs: 60000,
    networkQuietMs: 1500,
    startTimeoutMs: 5000,
  },

  injection: {
    keystrokeDelayMs: 40,
    submitWithEnter: true,
    promptLeadTypedChars: 100,
    promptPastePauseMs: 1000,
    inputSettleTimeoutMs: 4000,
    sendSettledTimeoutMs: 2000,
    sendButtonReadyTimeoutMs: 2500,
    longPromptThresholdChars: 320,
    longPromptTypedRatio: 0.3,
  },

  storage: {
    outputDir: "data/sessions",
    auditDir: "data/audits/council",
    scoringCriteriaDir: "data/scoring_criteria",
    filePrefix: "session_",
  },
};
