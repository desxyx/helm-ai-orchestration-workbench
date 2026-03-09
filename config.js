module.exports = {
  agent: "claude",

  claude: {
    url: "https://claude.ai",
    conversationUrl: "https://claude.ai/new",
    userDataDir: "./browser-profiles/claude",
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
  },

  gemini: {
    url: "https://gemini.google.com",
    conversationUrl: "https://gemini.google.com/app",
    userDataDir: "./browser-profiles/gemini",
    inputSelector: 'textarea, div[contenteditable="true"], rich-textarea .ql-editor',
    replySelectors: [
      'div[id^="model-response-message-content"]',
      ".model-response-text",
      '[data-message-author-role="model"]',
    ],
    verificationText: "Verify it’s you",
    navigationTimeoutMs: 120000,
    inputReadyTimeoutMs: 30000,
    captureTimeoutMs: 10000,
    completionDetection: {
      stabilityWindowMs: 7000,
      networkQuietMs: 2000,
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
    userDataDir: "./browser-profiles/chatgpt",
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
    completionDetection: {
      stabilityWindowMs: 7000,
      networkQuietMs: 2000,
      requestUrlPatterns: [
        "backend-api",
        "/conversation",
        "/responses",
        "/messages",
      ],
      busyTextPatterns: ["Thinking", "Thought for", "Stop generating"],
      busySelectors: ['button:has-text("Stop generating")'],
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
  },

  storage: {
    outputDir: "./data/sessions",
    filePrefix: "session_",
  },
};
