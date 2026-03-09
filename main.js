const config = require("./config");
const claudeAdapter = require("./src/adapters/claude");
const geminiAdapter = require("./src/adapters/gemini");
const chatgptAdapter = require("./src/adapters/chatgpt");
const { launchBrowser, closeBrowser } = require("./src/browser/playwrightManager");
const { runRound } = require("./src/orchestrator/roundRunner");
const sessionStore = require("./src/storage/sessionStore");
const logger = require("./src/utils/logger");

const TEST_PROMPT = "Hello, this is a test from the Council Orchestrator.";
const adapters = {
  claude: claudeAdapter,
  gemini: geminiAdapter,
  chatgpt: chatgptAdapter,
};

function getRequestedAgent() {
  const agentArg = process.argv.find((arg) => arg.startsWith("--agent="));
  return agentArg ? agentArg.split("=")[1] : config.agent;
}

function getActiveAdapter() {
  const agentName = getRequestedAgent();
  const adapter = adapters[agentName];
  if (!adapter) {
    throw new Error(`Unsupported agent: ${agentName}`);
  }

  const agentConfig = config[agentName];
  if (!agentConfig) {
    throw new Error(`Missing config for agent: ${agentName}`);
  }

  return { agentName, adapter, agentConfig };
}

function waitForEnter() {
  return new Promise((resolve) => {
    process.stdin.resume();
    process.stdin.once("data", () => {
      process.stdin.pause();
      resolve();
    });
  });
}

(async () => {
  let context;

  try {
    logger.info("Council Orchestrator Phase 1 booting.");
    const { agentName, adapter, agentConfig } = getActiveAdapter();
    const browser = await launchBrowser(agentConfig.userDataDir);
    context = browser.context;
    const page = browser.page;

    if (process.argv.includes("--login")) {
      await page.goto(agentConfig.url, {
        waitUntil: "domcontentloaded",
        timeout: 30000,
      });
      logger.info(`Log into ${agentName} in the browser, then press Enter here to continue.`);
      await waitForEnter();
    }

    const session = sessionStore.createSession();
    const round = await runRound({
      adapter,
      page,
      prompt: TEST_PROMPT,
      session,
      roundNumber: 1,
      agentName,
    });

    if (round.replies[0].status === "ok") {
      console.log(`[DONE] Round 1 captured. Check ${session.filePath}`);
    } else {
      logger.error(`Round 1 failed. Check ${session.filePath}`);
      process.exitCode = 1;
    }
  } catch (error) {
    logger.error(error.message);
    process.exitCode = 1;
  } finally {
    if (context) {
      await closeBrowser(context);
    }
  }
})();
