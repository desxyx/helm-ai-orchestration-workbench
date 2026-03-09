const fs = require("fs");
const path = require("path");

const config = require("../../config");
const { nowIso } = require("../utils/time");

const outputDir = path.resolve(__dirname, "../../", config.storage.outputDir);

function ensureOutputDir() {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
}

function buildSessionId(sessionNumber) {
  return `${config.storage.filePrefix}${String(sessionNumber).padStart(3, "0")}`;
}

function buildRoundFileName(roundNumber) {
  return `round_${String(roundNumber).padStart(3, "0")}.json`;
}

function getSessionDirPath(sessionId) {
  return path.join(outputDir, sessionId);
}

function getSessionFilePath(sessionId) {
  return path.join(getSessionDirPath(sessionId), "session.json");
}

function getLegacySessionFilePath(sessionId) {
  return path.join(outputDir, `${sessionId}.json`);
}

function getRoundFilePath(sessionId, roundNumber) {
  return path.join(getSessionDirPath(sessionId), buildRoundFileName(roundNumber));
}

function parseSessionNumber(sessionId) {
  const match = String(sessionId).match(/(\d+)$/);
  return match ? Number.parseInt(match[1], 10) : 0;
}

function attachPaths(session) {
  Object.defineProperty(session, "dirPath", {
    value: getSessionDirPath(session.sessionId),
    enumerable: false,
    writable: true,
  });

  Object.defineProperty(session, "filePath", {
    value: getSessionFilePath(session.sessionId),
    enumerable: false,
    writable: true,
  });

  return session;
}

function getSessionIds() {
  ensureOutputDir();

  const ids = new Set();
  for (const entry of fs.readdirSync(outputDir, { withFileTypes: true })) {
    if (!entry.name.startsWith(config.storage.filePrefix)) {
      continue;
    }

    if (entry.isDirectory()) {
      ids.add(entry.name);
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".json")) {
      ids.add(entry.name.replace(/\.json$/, ""));
    }
  }

  return [...ids].sort((a, b) => parseSessionNumber(b) - parseSessionNumber(a));
}

function getNextSessionNumber() {
  const ids = getSessionIds();
  if (ids.length === 0) {
    return 1;
  }

  return Math.max(...ids.map(parseSessionNumber), 0) + 1;
}

function createSession() {
  const sessionId = buildSessionId(getNextSessionNumber());
  return attachPaths({
    sessionId,
    createdAt: nowIso(),
    rounds: [],
  });
}

function buildRound({
  roundNumber,
  prompt,
  agent,
  content,
  status,
  completionReason,
  errorCode = null,
  metrics = {},
}) {
  const capturedAt = nowIso();

  return {
    roundNumber,
    prompt,
    replies: [
      {
        agent,
        content,
        capturedAt,
        status,
        completionReason,
        errorCode,
      },
    ],
    metrics: {
      [agent]: metrics,
    },
    summary: "",
    createdAt: capturedAt,
  };
}

function writeJson(filePath, payload) {
  fs.writeFileSync(filePath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function loadRoundFiles(sessionId) {
  const sessionDir = getSessionDirPath(sessionId);
  if (!fs.existsSync(sessionDir)) {
    return [];
  }

  return fs
    .readdirSync(sessionDir)
    .filter((file) => /^round_\d+\.json$/.test(file))
    .sort((a, b) => a.localeCompare(b))
    .map((file) => readJson(path.join(sessionDir, file)));
}

function loadLegacySession(sessionId) {
  const legacyFile = getLegacySessionFilePath(sessionId);
  if (!fs.existsSync(legacyFile)) {
    return null;
  }

  return attachPaths(readJson(legacyFile));
}

function loadSession(sessionId) {
  const sessionFile = getSessionFilePath(sessionId);
  if (fs.existsSync(sessionFile)) {
    const metadata = readJson(sessionFile);
    const rounds = loadRoundFiles(sessionId);
    return attachPaths({
      sessionId: metadata.sessionId || sessionId,
      createdAt: metadata.createdAt || nowIso(),
      rounds,
    });
  }

  const sessionDir = getSessionDirPath(sessionId);
  if (fs.existsSync(sessionDir)) {
    const rounds = loadRoundFiles(sessionId);
    return attachPaths({
      sessionId,
      createdAt: rounds[0]?.createdAt || nowIso(),
      rounds,
    });
  }

  return loadLegacySession(sessionId);
}

function buildSessionMetadata(session) {
  const latestRound = session.rounds.length ? session.rounds[session.rounds.length - 1] : null;
  return {
    sessionId: session.sessionId,
    createdAt: session.createdAt,
    roundCount: session.rounds.length,
    latestRoundNumber: latestRound ? latestRound.roundNumber : null,
    updatedAt: nowIso(),
  };
}

function writeSession(session) {
  ensureOutputDir();

  try {
    fs.mkdirSync(session.dirPath, { recursive: true });

    for (const round of session.rounds) {
      writeJson(getRoundFilePath(session.sessionId, round.roundNumber), round);
    }

    writeJson(session.filePath, buildSessionMetadata(session));
  } catch (error) {
    error.code = error.code || "persist_failed";
    throw error;
  }
}

function appendRound(session, round) {
  const existingRound = session.rounds.find((item) => item.roundNumber === round.roundNumber);

  if (!existingRound) {
    session.rounds.push(round);
    session.rounds.sort((a, b) => a.roundNumber - b.roundNumber);
  } else {
    existingRound.prompt = round.prompt;
    existingRound.replies = existingRound.replies.filter(
      (reply) => !round.replies.some((incoming) => incoming.agent === reply.agent)
    );
    existingRound.replies.push(...round.replies);
    existingRound.metrics = {
      ...(existingRound.metrics || {}),
      ...(round.metrics || {}),
    };
    existingRound.createdAt = round.createdAt;
  }

  writeSession(session);
  return session;
}

function listSessions() {
  return getSessionIds()
    .map((sessionId) => loadSession(sessionId))
    .filter(Boolean)
    .map((session) => {
      const latestRound = session.rounds.length ? session.rounds[session.rounds.length - 1] : null;
      return {
        sessionId: session.sessionId,
        createdAt: session.createdAt,
        roundCount: session.rounds.length,
        roundNumbers: session.rounds.map((round) => round.roundNumber),
        latestRoundNumber: latestRound ? latestRound.roundNumber : null,
        latestPrompt: latestRound ? latestRound.prompt : "",
        summary: latestRound ? latestRound.summary || "" : "",
      };
    });
}

module.exports = {
  appendRound,
  buildRound,
  buildSessionId,
  createSession,
  ensureOutputDir,
  getRoundFilePath,
  getSessionDirPath,
  getSessionFilePath,
  listSessions,
  loadSession,
  writeSession,
};
