module.exports = {
  agent: "claude",

  claude: {
    url: "https://claude.ai",
    conversationUrl: "https://claude.ai/new",
    userDataDir: "browser-profiles/claude",
    inputSelector: '[data-testid="chat-input"][contenteditable="true"]',
    verificationText: "Verifying you are human",
    navigationTimeoutMs: 120000,
    inputReadyTimeoutMs: 30000,
    captureTimeoutMs: 10000,
    // F07: Per-adapter injection overrides. Merged over shared injection at runtime.
    // Claude uses React 18 + ProseMirror contentEditable — strictest event requirements.
    injection: {
      inputSettleTimeoutMs: 8000,
      // Claude.ai: Enter = newline (not send). Disable shared-base Enter fallback.
      // Source key mapping is retained; CORE_06 uses only the fact-sheet Send click.
      submitWithEnter: false,
      // CORE_06: Windows-only bounded timing repair for Path A settle false-fail.
      // stableForMs reduced so DOM needs fewer quiet-ms to pass; timeout extended for budget.
      // Mac path unchanged — only applied when process.platform === "win32".
      windows: {
        stableForMs: 200,
        inputSettleTimeoutMs: 12000,
      },
    },
  },

  gemini: {
    url: "https://gemini.google.com",
    conversationUrl: "https://gemini.google.com/app",
    userDataDir: "browser-profiles/gemini",
    inputSelector: 'rich-textarea .ql-editor[contenteditable="true"]',
    verificationText: "Verify it's you",
    navigationTimeoutMs: 120000,
    inputReadyTimeoutMs: 30000,
    captureTimeoutMs: 10000,
    // F07: Gemini injection params initialized from current working values — do not change.
    // Angular + rich textarea; more tolerant than Claude/ChatGPT.
    injection: {},
    completionDetection: {
      stabilityWindowMs: 5000,
      startTimeoutMs: 30000,
      busySelectors: ['button:has-text("Stop")'],
    },
  },

  chatgpt: {
    url: "https://chatgpt.com",
    conversationUrl: "https://chatgpt.com/",
    userDataDir: "browser-profiles/chatgpt",
    inputSelectors: ['div[contenteditable="true"][role="textbox"]'],
    verificationText: "Verify you are human",
    navigationTimeoutMs: 120000,
    inputReadyTimeoutMs: 30000,
    captureTimeoutMs: 10000,
    // F07: ChatGPT injection params. React + Quill-like textarea (moderate requirements).
    // Start from shared base; tune independently once Claude F01-F04 stabilise.
    injection: {},
    completionDetection: {
      stabilityWindowMs: 2500,
      busySelectors: ['button:has-text("Stop generating")'],
    },
  },

  completion: {
    pollIntervalMs: 500,
    stabilityWindowMs: 3000,
    // Shared by all three adapters (none overrides it). Long research/writing replies
    // routinely ran past the old 60s cap; per operator decision, unified at 180s.
    hardTimeoutMs: 180000,
    // A visible Stop remains BUSY for up to 15 minutes; generic capture/start
    // budgets must not truncate a still-generating turn.
    busyHardTimeoutMs: 900000,
    // Measured from the single Send click; ends as soon as BUSY or the new reply appears.
    startTimeoutMs: 30000,
  },

  injection: {
    keystrokeDelayMs: 40,
    submitWithEnter: true,
    promptPastePauseMs: 1000,
    inputSettleTimeoutMs: 4000,
  },

  // Diagnostic flags — all false by default. Enable only for specific test runs.
  diagnostics: {
    // Compatibility flag retained. Normal injection is now one full paste in
    // either mode; this flag cannot re-enable lead typing or submit retries.
    forceFullPaste: false,
  },

  storage: {
    outputDir: "data/sessions",
    auditDir: "data/audits/council",
    scoringCriteriaDir: "data/scoring_criteria",
    filePrefix: "session_",
  },
};
