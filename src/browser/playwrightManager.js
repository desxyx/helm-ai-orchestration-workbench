const { chromium } = require("playwright");

async function launchBrowser(userDataDir) {
  const context = await chromium.launchPersistentContext(userDataDir, {
    channel: "chrome",
    headless: false,
    viewport: { width: 1280, height: 900 },
    permissions: ["clipboard-read", "clipboard-write"],
    args: [
      "--disable-blink-features=AutomationControlled",
      "--disable-features=IsolateOrigins,site-per-process",
      "--disable-session-crashed-bubble",
      "--hide-crash-restore-bubble",
    ],
  });

  const page = context.pages()[0] || (await context.newPage());
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "webdriver", {
      get: () => undefined,
    });
  });
  return { context, page };
}

async function closeBrowser(context) {
  await context.close();
}

module.exports = {
  launchBrowser,
  closeBrowser,
};
