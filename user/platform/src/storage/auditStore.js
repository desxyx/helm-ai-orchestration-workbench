const fs = require("fs");
const path = require("path");

const config = require("../../config");
const { nowIso } = require("../utils/time");

const SAVE_TYPE_AUDIT = "audit";
const SAVE_TYPE_SCORING_CRITERIA = "scoring_criteria";
const councilRootDir = path.resolve(__dirname, "../../../");
const STORE_CONFIG = {
  [SAVE_TYPE_AUDIT]: {
    dir: path.resolve(councilRootDir, config.storage.auditDir),
    title: "Council Audit Snapshot",
    contentHeading: "Summary",
  },
  [SAVE_TYPE_SCORING_CRITERIA]: {
    dir: path.resolve(councilRootDir, config.storage.scoringCriteriaDir),
    title: "Council Scoring_Criteria Snapshot",
    contentHeading: "Scoring_Criteria",
  },
};

function getStoreConfig(saveType) {
  const store = STORE_CONFIG[saveType];
  if (!store) {
    throw new Error(`Unsupported save type: ${saveType}`);
  }

  return store;
}

function ensureSaveDir(saveType) {
  const { dir } = getStoreConfig(saveType);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function sanitizeFileSegment(value) {
  const sanitized = String(value || "unknown")
    .trim()
    .replace(/[^a-zA-Z0-9_-]+/g, "_")
    .replace(/^_+|_+$/g, "");

  return sanitized || "unknown";
}

function buildRoundLabel(roundNumber) {
  if (!Number.isInteger(roundNumber)) {
    return "round_unknown";
  }

  return `round_${String(roundNumber).padStart(3, "0")}`;
}

function buildFileName({ savedAt, sessionId, roundNumber, saveType }) {
  const timestamp = sanitizeFileSegment(savedAt.replace(/[:.]/g, "-"));
  const baseName = `${timestamp}_${sanitizeFileSegment(sessionId)}_${buildRoundLabel(roundNumber)}`;
  return saveType === SAVE_TYPE_AUDIT ? `${baseName}.md` : `${baseName}_${saveType}.md`;
}

function normalizeBlock(content) {
  const value = String(content || "").trim();
  return value || "(empty)";
}

function buildMarkdown({
  saveType,
  savedAt,
  sessionId,
  roundNumber,
  roundCreatedAt,
  prompt,
  summary,
}) {
  const store = getStoreConfig(saveType);

  return [
    `# ${store.title}`,
    "",
    `- Saved At: ${savedAt}`,
    `- Session: ${sessionId}`,
    `- Round: ${buildRoundLabel(roundNumber)}`,
    roundCreatedAt ? `- Round Created At: ${roundCreatedAt}` : null,
    "- Source: summary panel",
    "",
    "## Prompt",
    "",
    normalizeBlock(prompt),
    "",
    `## ${store.contentHeading}`,
    "",
    normalizeBlock(summary),
    "",
  ]
    .filter((line) => line !== null)
    .join("\n");
}

function saveSummaryArtifact({ saveType, sessionId, roundNumber, roundCreatedAt, prompt, summary }) {
  ensureSaveDir(saveType);

  const savedAt = nowIso();
  const { dir } = getStoreConfig(saveType);
  const fileName = buildFileName({ savedAt, sessionId, roundNumber, saveType });
  const filePath = path.join(dir, fileName);
  const markdown = buildMarkdown({
    saveType,
    savedAt,
    sessionId,
    roundNumber,
    roundCreatedAt,
    prompt,
    summary,
  });

  fs.writeFileSync(filePath, markdown, "utf8");

  return {
    saveType,
    savedAt,
    fileName,
    filePath,
  };
}

function saveAudit(payload) {
  return saveSummaryArtifact({
    saveType: SAVE_TYPE_AUDIT,
    ...payload,
  });
}

function saveScoringCriteria(payload) {
  return saveSummaryArtifact({
    saveType: SAVE_TYPE_SCORING_CRITERIA,
    ...payload,
  });
}

function isSupportedSaveType(saveType) {
  return Boolean(STORE_CONFIG[saveType]);
}

module.exports = {
  SAVE_TYPE_AUDIT,
  SAVE_TYPE_SCORING_CRITERIA,
  ensureSaveDir,
  isSupportedSaveType,
  saveSummaryArtifact,
  saveAudit,
  saveScoringCriteria,
};
