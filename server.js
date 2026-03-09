const fs = require("fs");
const path = require("path");
const http = require("http");
const { URL } = require("url");

const config = require("./config");
const claudeAdapter = require("./src/adapters/claude");
const geminiAdapter = require("./src/adapters/gemini");
const chatgptAdapter = require("./src/adapters/chatgpt");
const { launchBrowser, closeBrowser } = require("./src/browser/playwrightManager");
const { runRound } = require("./src/orchestrator/roundRunner");
const sessionStore = require("./src/storage/sessionStore");
const logger = require("./src/utils/logger");

const PORT = process.env.PORT ? Number(process.env.PORT) : 3030;
const HOST = "127.0.0.1";
const PUBLIC_DIR = path.join(__dirname, "public");
const AGENTS = [
  { id: "gemini", label: "Gemini", adapter: geminiAdapter, config: config.gemini },
  { id: "claude", label: "Claude", adapter: claudeAdapter, config: config.claude },
  { id: "chatgpt", label: "ChatGPT", adapter: chatgptAdapter, config: config.chatgpt },
];

let activeSession = null;
let activeRun = null;
const clients = new Set();

function createRunErrorState({ prompt = "", error }) {
  return {
    sessionId: activeSession?.session?.sessionId || null,
    roundNumber: activeSession?.nextRoundNumber ?? null,
    prompt,
    composedPrompt: "",
    previousSummary: activeSession?.carriedSummary || "",
    status: "error",
    startedAt: new Date().toISOString(),
    completedAt: new Date().toISOString(),
    summary: "",
    error: error.message,
    agents: buildEmptyAgentState(),
  };
}

function normalizeRuntimeError(error) {
  const message = String(error?.message || "");

  if (
    /user data dir|user data directory|singletonlock|opening in existing browser session|profile appears to be in use/i.test(
      message
    )
  ) {
    const normalized = new Error(
      "Browser profile is already in use. Close the existing AI Chrome windows, then try Dispatch or New Session again."
    );
    normalized.code = error.code || "profile_in_use";
    return normalized;
  }

  return error;
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload));
}

function sendEvent(event, data) {
  const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
  for (const client of clients) {
    client.write(payload);
  }
}

function getLatestRound(session) {
  return session && session.rounds.length ? session.rounds[session.rounds.length - 1] : null;
}

function getRoundByNumber(session, roundNumber) {
  if (!session) {
    return null;
  }

  if (!Number.isInteger(roundNumber)) {
    return getLatestRound(session);
  }

  return session.rounds.find((round) => round.roundNumber === roundNumber) || null;
}

function buildSummary(replies) {
  return AGENTS.map(({ id, label }) => {
    const reply = replies.find((item) => item.agent === id);
    return reply ? `${label}\n${reply.content}` : "";
  })
    .filter(Boolean)
    .join("\n\n");
}

function buildPromptContextBlock({ sessionId, roundNumber, summary }) {
  return [
    `[Session]: ${sessionId}`,
    `[Round]: ${roundNumber}`,
    `[Previous Summary]:`,
    summary || "(empty)",
    "",
    `[New Prompt]:`,
  ].join("\n");
}

function buildPromptPayload({ sessionId, roundNumber, summary, prompt }) {
  const summaryBlock = buildPromptContextBlock({
    sessionId,
    roundNumber,
    summary,
  });

  return {
    summaryBlock,
    promptBlock: prompt,
    fullText: `${summaryBlock}\n\n${prompt}`,
  };
}

function loadSessionSummaries() {
  return sessionStore.listSessions();
}

function getUiState({ sessionId = null, roundNumber = null } = {}) {
  const sessions = loadSessionSummaries();
  const fallbackSessionId = activeSession?.session?.sessionId || sessions[0]?.sessionId || null;
  const resolvedSessionId = sessionId || fallbackSessionId;
  const selectedSession = resolvedSessionId ? sessionStore.loadSession(resolvedSessionId) : null;
  const selectedRound = getRoundByNumber(selectedSession, roundNumber);
  const selectedRoundNumber = selectedRound ? selectedRound.roundNumber : null;

  return {
    sessions,
    selectedSession,
    selectedRound,
    selectedRoundNumber,
    activeSession: activeSession
      ? {
          sessionId: activeSession.session.sessionId,
          roundNumber: activeSession.nextRoundNumber,
          summary: activeSession.carriedSummary,
        }
      : null,
    activeRun,
    agents: AGENTS.map(({ id, label }) => ({ id, label })),
  };
}

async function closeActiveBrowsers() {
  if (!activeSession || !activeSession.browsers) {
    return;
  }

  await Promise.all(
    Object.values(activeSession.browsers).map(async ({ context }) => {
      await closeBrowser(context);
    })
  );
}

async function createActiveSession(carrySummary = "") {
  logger.info("Creating a fresh browser session.");
  await closeActiveBrowsers();

  const session = sessionStore.createSession();
  sessionStore.writeSession(session);

  const browsers = {};
  try {
    await Promise.all(
      AGENTS.map(async (agent) => {
        const browser = await launchBrowser(agent.config.userDataDir);
        browsers[agent.id] = { ...browser, agent };
        await agent.adapter.open(browser.page);
      })
    );
  } catch (error) {
    await Promise.all(
      Object.values(browsers).map(async ({ context }) => {
        try {
          await closeBrowser(context);
        } catch {
          return null;
        }
        return null;
      })
    );
    throw normalizeRuntimeError(error);
  }

  activeSession = {
    session,
    browsers,
    carriedSummary: carrySummary,
    nextRoundNumber: 0,
  };

  sendEvent("session_context", {
    activeSession: {
      sessionId: session.sessionId,
      roundNumber: 0,
      summary: carrySummary,
    },
    sessions: loadSessionSummaries(),
    selectedSession: sessionStore.loadSession(session.sessionId),
    selectedRound: null,
    selectedRoundNumber: null,
  });
}

function buildEmptyAgentState() {
  return Object.fromEntries(
    AGENTS.map((agent) => [
      agent.id,
      {
        label: agent.label,
        status: "queued",
        stage: "queued",
        message: "Waiting to start.",
        content: "",
        completionReason: null,
        errorCode: null,
        metrics: null,
      },
    ])
  );
}

async function runAgent({ agent, prompt, roundNumber, session }) {
  const browser = activeSession.browsers[agent.id];
  const round = await runRound({
    adapter: agent.adapter,
    page: browser.page,
    prompt,
    storedPrompt: prompt.promptBlock,
    session,
    roundNumber,
    agentName: agent.id,
    openPage: false,
    onStage: async ({ stage, message }) => {
      activeRun.agents[agent.id] = {
        ...activeRun.agents[agent.id],
        stage,
        status: stage === "persist" ? "persisting" : "running",
        message,
      };
      sendEvent("agent_stage", {
        agent: agent.id,
        label: agent.label,
        status: activeRun.agents[agent.id].status,
        stage,
        message,
      });
    },
  });

  const reply = round.replies[0];
  activeRun.agents[agent.id] = {
    ...activeRun.agents[agent.id],
    stage: "done",
    status: reply.status === "ok" ? "done" : "error",
    message: reply.status === "ok" ? "Reply captured." : reply.content,
    content: reply.content,
    completionReason: reply.completionReason,
    errorCode: reply.errorCode,
    metrics: round.metrics[agent.id] || round.metrics,
  };

  activeRun.summary = buildSummary(
    AGENTS.map(({ id }) => ({
      agent: id,
      content: activeRun.agents[id].content,
    })).filter((item) => item.content)
  );

  sendEvent("agent_result", {
    agent: agent.id,
    label: agent.label,
    result: activeRun.agents[agent.id],
    summary: activeRun.summary,
  });

  return round;
}

async function handleDispatch(prompt) {
  logger.info("UI dispatch requested.");

  if (activeRun && activeRun.status === "running") {
    throw new Error("A run is already in progress.");
  }

  if (!activeSession) {
    logger.info("No live browser session found; creating one before dispatch.");
    await createActiveSession("");
  }

  const roundNumber = activeSession.nextRoundNumber;
  const promptPayload = buildPromptPayload({
    sessionId: activeSession.session.sessionId,
    roundNumber,
    summary: activeSession.carriedSummary,
    prompt,
  });

  activeRun = {
    sessionId: activeSession.session.sessionId,
    roundNumber,
    prompt,
    composedPrompt: promptPayload.fullText,
    previousSummary: activeSession.carriedSummary,
    status: "running",
    startedAt: new Date().toISOString(),
    summary: "",
    agents: buildEmptyAgentState(),
  };

  sendEvent("run_started", activeRun);

  await Promise.all(
    AGENTS.map((agent) =>
      runAgent({
        agent,
        prompt: promptPayload,
        roundNumber,
        session: activeSession.session,
      })
    )
  );

  const currentSession = sessionStore.loadSession(activeSession.session.sessionId);
  const round = currentSession.rounds.find((item) => item.roundNumber === roundNumber);
  if (round) {
    round.summary = buildSummary(round.replies);
    activeSession.session = currentSession;
    sessionStore.writeSession(activeSession.session);
    activeSession.carriedSummary = round.summary;
  }

  activeSession.nextRoundNumber += 1;
  activeRun.status = "completed";
  activeRun.completedAt = new Date().toISOString();
  activeRun.summary = activeSession.carriedSummary;
  activeRun.session = activeSession.session;

  sendEvent("run_completed", activeRun);
  sendEvent("sessions_updated", {
    sessions: loadSessionSummaries(),
    selectedSession: activeSession.session,
    selectedRound: getLatestRound(activeSession.session),
    selectedRoundNumber: getLatestRound(activeSession.session)?.roundNumber ?? null,
  });
  sendEvent("session_context", {
    activeSession: {
      sessionId: activeSession.session.sessionId,
      roundNumber: activeSession.nextRoundNumber,
      summary: activeSession.carriedSummary,
    },
    sessions: loadSessionSummaries(),
    selectedSession: activeSession.session,
    selectedRound: getLatestRound(activeSession.session),
    selectedRoundNumber: getLatestRound(activeSession.session)?.roundNumber ?? null,
  });
}

async function handleNewSession() {
  if (activeRun && activeRun.status === "running") {
    throw new Error("Cannot create a new session while a run is in progress.");
  }

  const carrySummary = activeSession ? activeSession.carriedSummary : "";
  activeRun = null;
  await createActiveSession(carrySummary);
}

function serveStatic(res, pathname) {
  const targetPath =
    pathname === "/" ? path.join(PUBLIC_DIR, "index.html") : path.join(PUBLIC_DIR, pathname);
  const normalizedPath = path.normalize(targetPath);

  if (!normalizedPath.startsWith(PUBLIC_DIR) || !fs.existsSync(normalizedPath)) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }

  const ext = path.extname(normalizedPath);
  const contentType =
    {
      ".html": "text/html; charset=utf-8",
      ".css": "text/css; charset=utf-8",
      ".js": "application/javascript; charset=utf-8",
    }[ext] || "application/octet-stream";

  res.writeHead(200, { "Content-Type": contentType });
  fs.createReadStream(normalizedPath).pipe(res);
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => {
      try {
        const raw = Buffer.concat(chunks).toString("utf8");
        resolve(raw ? JSON.parse(raw) : {});
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });
}

const server = http.createServer(async (req, res) => {
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);
  const { pathname } = requestUrl;

  if (req.method === "GET" && pathname === "/api/events") {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });
    res.write("\n");
    clients.add(res);
    res.write(`event: snapshot\ndata: ${JSON.stringify(getUiState())}\n\n`);
    req.on("close", () => clients.delete(res));
    return;
  }

  if (req.method === "GET" && pathname === "/api/sessions") {
    sendJson(res, 200, getUiState());
    return;
  }

  if (req.method === "GET" && pathname.startsWith("/api/sessions/")) {
    const sessionId = pathname.split("/").pop();
    const roundQuery = requestUrl.searchParams.get("round");
    const roundNumber =
      roundQuery === null ? null : Number.parseInt(roundQuery, 10);
    const session = sessionStore.loadSession(sessionId);
    if (!session) {
      sendJson(res, 404, { error: "Session not found." });
      return;
    }

    sendJson(res, 200, {
      session,
      selectedRound: getRoundByNumber(session, roundNumber),
      selectedRoundNumber:
        getRoundByNumber(session, roundNumber)?.roundNumber ?? null,
    });
    return;
  }

  if (req.method === "POST" && pathname === "/api/run") {
    try {
      const body = await parseBody(req);
      const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
      if (!prompt) {
        sendJson(res, 400, { error: "Prompt is required." });
        return;
      }

      handleDispatch(prompt).catch((error) => {
        const normalizedError = normalizeRuntimeError(error);
        activeRun = activeRun
          ? {
              ...activeRun,
              status: "error",
              completedAt: new Date().toISOString(),
              error: normalizedError.message,
            }
          : createRunErrorState({ prompt, error: normalizedError });
        sendEvent("run_completed", activeRun);
        logger.error(`UI dispatch failed: ${normalizedError.message}`);
      });

      sendJson(res, 202, { ok: true });
    } catch {
      sendJson(res, 400, { error: "Invalid JSON body." });
    }
    return;
  }

  if (req.method === "POST" && pathname === "/api/new-session") {
    try {
      await handleNewSession();
      sendJson(res, 202, { ok: true });
    } catch (error) {
      sendJson(res, 400, { error: error.message });
    }
    return;
  }

  if (req.method === "GET") {
    serveStatic(res, pathname);
    return;
  }

  res.writeHead(405);
  res.end("Method not allowed");
});

server.listen(PORT, HOST, () => {
  logger.info(`Council UI listening on http://${HOST}:${PORT}`);
});

server.on("error", (error) => {
  logger.error(`UI server failed to start: ${error.message}`);
  process.exitCode = 1;
});
