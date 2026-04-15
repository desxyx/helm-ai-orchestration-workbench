const state = {
  sessions: [],
  selectedSession: null,
  selectedRoundNumber: null,
  activeSession: null,
  activeRun: null,
  refreshingAgents: {},
  savingSummary: false,
  manualDispatchOverrideKey: "",
  attachSummaryOnDispatch: true,
  toastTimer: null,
};

function $(id) {
  return document.getElementById(id);
}

const AGENT_TITLES = {
  gemini: "Gemini",
  claude: "Claude",
  chatgpt: "ChatGPT",
};
const AGENT_IDS = ["gemini", "claude", "chatgpt"];
const SAVE_TYPE_CONFIG = {
  audit: {
    buttonLabel: "Save",
    statusLabel: "audit snapshot",
  },
  scoring_criteria: {
    buttonLabel: "Save",
    statusLabel: "scoring criteria snapshot",
  },
};
const MANUAL_REFRESH_UNLOCK_FALLBACK_MS = 120000;
const INCOMPLETE_REPLIES_BLOCK_REASON =
  "Dispatch stays disabled until all three replies are captured.";

function setGlobalStatus(_status, message) {
  const target = $("global-message");
  if (!target) {
    return;
  }

  target.textContent = message || "";
}

function showToast(message, durationMs = 2200) {
  const toast = $("save-toast");
  if (!toast) {
    return;
  }

  if (state.toastTimer) {
    window.clearTimeout(state.toastTimer);
    state.toastTimer = null;
  }

  toast.hidden = false;
  toast.textContent = message || "";
  toast.classList.add("is-visible");

  state.toastTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
    state.toastTimer = window.setTimeout(() => {
      toast.hidden = true;
      state.toastTimer = null;
    }, 250);
  }, durationMs);
}

function setAgentState(agent, data) {
  const badge = $(`badge-${agent}`);
  const stage = $(`stage-${agent}`);
  const content = $(`content-${agent}`);

  badge.className = `agent-badge ${data.status}`;
  badge.textContent = data.status;
  stage.textContent = data.message || "";
  content.textContent = data.content || "";
}

function getActiveRunAgent(agent) {
  if (!state.activeRun || !state.activeRun.agents) {
    return null;
  }

  return state.activeRun.agents[agent] || null;
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

function getPreviousRound(session, roundNumber) {
  if (!session || !Number.isInteger(roundNumber)) {
    return null;
  }

  return (
    session.rounds
      .filter((round) => round.roundNumber < roundNumber)
      .sort((a, b) => b.roundNumber - a.roundNumber)[0] || null
  );
}

function getSelectedRound() {
  return getRoundByNumber(state.selectedSession, state.selectedRoundNumber);
}

function getLatestRoundNumberForSession(session) {
  if (!session) {
    return null;
  }

  return getSessionSummary(session.sessionId)?.latestRoundNumber ?? getLatestRound(session)?.roundNumber ?? null;
}

function getSessionSummary(sessionId) {
  return state.sessions.find((session) => session.sessionId === sessionId) || null;
}

function getLiveRoundNumber() {
  if (!state.activeSession) {
    return null;
  }

  if (state.activeRun && state.activeRun.status === "running") {
    return state.activeRun.roundNumber;
  }

  return getSessionSummary(state.activeSession.sessionId)?.latestRoundNumber ?? null;
}

function isViewingLiveRound() {
  return Boolean(
    state.activeSession &&
      state.selectedSession &&
      state.selectedSession.sessionId === state.activeSession.sessionId &&
      state.selectedRoundNumber === getLiveRoundNumber()
  );
}

function getSelectedSummary() {
  if (state.activeRun && state.activeRun.status === "running" && isViewingLiveRound()) {
    return state.activeRun.summary || state.activeRun.previousSummary || "";
  }

  return getSelectedRound()?.summary || "";
}

function normalizeSummary(summary) {
  return String(summary || "").trim();
}

function getSelectedSaveType() {
  const select = $("save-type-select");
  const value = select ? select.value : "audit";
  return SAVE_TYPE_CONFIG[value] ? value : "audit";
}

function getSaveTypeConfig(saveType = getSelectedSaveType()) {
  return SAVE_TYPE_CONFIG[saveType] || SAVE_TYPE_CONFIG.audit;
}

function isSummaryAttachedForNextDispatch() {
  return state.attachSummaryOnDispatch !== false;
}

function isReplyCaptured(round, agent) {
  if (!round || !Array.isArray(round.replies)) {
    return false;
  }

  const reply = round.replies.find((item) => item.agent === agent);
  return Boolean(reply && reply.status === "ok" && String(reply.content || "").trim());
}

function areAllRepliesCaptured(round) {
  if (!round) {
    return true;
  }

  return AGENT_IDS.every((agent) => isReplyCaptured(round, agent));
}

function getDispatchOverrideKey() {
  if (!state.activeSession || !state.selectedSession) {
    return "";
  }

  const liveRoundNumber = getLiveRoundNumber();
  if (!Number.isInteger(liveRoundNumber)) {
    return "";
  }

  if (state.selectedSession.sessionId !== state.activeSession.sessionId) {
    return "";
  }

  if (state.selectedRoundNumber !== liveRoundNumber) {
    return "";
  }

  return `${state.activeSession.sessionId}:${liveRoundNumber}`;
}

function isManualDispatchOverrideActive() {
  const key = getDispatchOverrideKey();
  return Boolean(key && state.manualDispatchOverrideKey === key);
}

function armManualDispatchOverride({
  silent = false,
  message = "Manual dispatch override armed for this round. Dispatch can proceed without all three captured replies.",
} = {}) {
  const round = getSelectedRound();
  if (!round) {
    if (!silent) {
      setGlobalStatus(
        "error",
        "Select the active latest round before arming manual dispatch override."
      );
      renderControls();
    }
    return false;
  }

  if (areAllRepliesCaptured(round)) {
    state.manualDispatchOverrideKey = "";
    if (!silent) {
      setGlobalStatus("done", "All three replies are already captured. Manual override was not needed.");
      renderControls();
    }
    return false;
  }

  const key = getDispatchOverrideKey();
  if (!key) {
    if (!silent) {
      setGlobalStatus(
        "error",
        "Manual dispatch override is only available on the active session's latest round."
      );
      renderControls();
    }
    return false;
  }

  const alreadyActive = state.manualDispatchOverrideKey === key;
  state.manualDispatchOverrideKey = key;

  if (!silent) {
    setGlobalStatus(
      "done",
      alreadyActive ? "Manual dispatch override is already armed for this round." : message
    );
    renderControls();
  }

  return !alreadyActive;
}

function isSummarySameAsPreviousRound(session, round) {
  if (!session || !round) {
    return false;
  }

  const previousRound = getPreviousRound(session, round.roundNumber);
  if (!previousRound) {
    return false;
  }

  return normalizeSummary(round.summary) === normalizeSummary(previousRound.summary);
}

function getDispatchBlockReason() {
  const reviewingHistory = Boolean(
    state.activeSession &&
      state.selectedSession &&
      (state.selectedSession.sessionId !== state.activeSession.sessionId ||
        state.selectedRoundNumber !== getLiveRoundNumber())
  );

  if (reviewingHistory) {
    return "Dispatch is only available on the active session's latest round.";
  }

  if (state.activeRun && state.activeRun.status === "running") {
    return "Wait for the current round to finish.";
  }

  if (!state.activeSession) {
    return "Create a fresh session before dispatching.";
  }

  if (Object.keys(state.refreshingAgents).length > 0) {
    return "Wait for reply refresh to finish.";
  }

  const round = getSelectedRound();
  if (round && !areAllRepliesCaptured(round) && !isManualDispatchOverrideActive()) {
    return INCOMPLETE_REPLIES_BLOCK_REASON;
  }

  if (isSummarySameAsPreviousRound(state.selectedSession, round)) {
    return "Dispatch stays disabled because this summary matches the previous round.";
  }

  return "";
}

function getDispatchHintMessage(blockReason) {
  if (blockReason) {
    if (blockReason === INCOMPLETE_REPLIES_BLOCK_REASON) {
      return `${blockReason} If you've manually verified the live chats, Shift+click the Session Refresh button to arm override and allow dispatch.`;
    }

    return blockReason;
  }

  if (!isSummaryAttachedForNextDispatch()) {
    return "Prompt-only dispatch armed for the next send. Summary will re-attach automatically after a successful dispatch.";
  }

  if (isManualDispatchOverrideActive()) {
    return "Manual override armed: dispatch may continue even if not all three replies were captured.";
  }

  return "";
}

function renderDispatchHint(message) {
  const hint = $("dispatch-guard-hint");
  if (!hint) {
    return;
  }

  hint.textContent = message || "";
  hint.hidden = !message;
}

function renderSummary() {
  $("summary-output").textContent =
    getSelectedSummary() || "Current round summary will appear here.";
}

function renderSessionIndicator() {
  if (!state.activeSession) {
    $("session-indicator").textContent = "No active session";
    return;
  }

  $("session-indicator").textContent = `${state.activeSession.sessionId} / round_${state.activeSession.roundNumber}`;
}

function renderSessionSelect() {
  const select = $("session-select");
  select.innerHTML = "";

  state.sessions.forEach((session) => {
    const option = document.createElement("option");
    option.value = session.sessionId;
    option.textContent = `${session.sessionId} / rounds ${session.roundCount}`;
    option.selected = Boolean(
      state.selectedSession && state.selectedSession.sessionId === session.sessionId
    );
    select.appendChild(option);
  });
}

function renderRoundSelect() {
  const select = $("round-select");
  select.innerHTML = "";

  if (!state.selectedSession || !state.selectedSession.rounds.length) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "No rounds yet";
    option.selected = true;
    select.appendChild(option);
    select.disabled = true;
    return;
  }

  select.disabled = false;
  state.selectedSession.rounds
    .slice()
    .sort((a, b) => b.roundNumber - a.roundNumber)
    .forEach((round) => {
      const option = document.createElement("option");
      option.value = String(round.roundNumber);
      option.textContent = `round_${round.roundNumber}`;
      option.selected = round.roundNumber === state.selectedRoundNumber;
      select.appendChild(option);
    });
}

function renderSelectedSession() {
  const round = getSelectedRound();
  const liveRound = state.activeRun && state.activeRun.status === "running" && isViewingLiveRound();

  AGENT_IDS.forEach((agent) => {
    if (liveRound) {
      const live = getActiveRunAgent(agent);
      if (live) {
        setAgentState(agent, live);
        return;
      }
    }

    const reply = round ? round.replies.find((item) => item.agent === agent) : null;
    setAgentState(agent, {
      status: reply ? reply.status : "queued",
      message: reply ? reply.completionReason || "done" : "Waiting to start.",
      content: reply ? reply.content : "",
    });
  });

  renderRoundSelect();
  renderSummary();
  renderControls();
}

function getManualRefreshUnlockMs() {
  const configured = Number.parseInt(state.activeRun?.manualRefreshUnlockMs, 10);
  return Number.isInteger(configured) && configured > 0
    ? configured
    : MANUAL_REFRESH_UNLOCK_FALLBACK_MS;
}

function getManualRefreshRemainingMs() {
  if (!state.activeRun || state.activeRun.status !== "running") {
    return 0;
  }

  const startedAtMs = Date.parse(state.activeRun.startedAt || "");
  if (!Number.isFinite(startedAtMs)) {
    return 0;
  }

  return Math.max(0, startedAtMs + getManualRefreshUnlockMs() - Date.now());
}

function canRefreshCurrentRunningRound() {
  if (!state.activeRun || state.activeRun.status !== "running" || !state.selectedSession) {
    return false;
  }

  if (state.activeRun.sessionId !== state.selectedSession.sessionId) {
    return false;
  }

  const round = getSelectedRound();
  return Boolean(
    round &&
      round.roundNumber === state.activeRun.roundNumber &&
      getManualRefreshRemainingMs() === 0
  );
}

function canRefreshReply(agent) {
  if (!agent || !state.activeSession || !state.selectedSession) {
    return false;
  }

  if (state.activeSession.sessionId !== state.selectedSession.sessionId) {
    return false;
  }

  if (state.activeRun && state.activeRun.status === "running") {
    return canRefreshCurrentRunningRound();
  }

  const round = getSelectedRound();
  const latestRoundNumber = getLatestRoundNumberForSession(state.selectedSession);
  return Boolean(
    round &&
      latestRoundNumber !== null &&
      round.roundNumber === latestRoundNumber
  );
}

function getRefreshButtonTitle(agent, enabled, refreshing) {
  if (refreshing) {
    return `Refreshing ${AGENT_TITLES[agent] || agent} latest reply.`;
  }

  if (enabled) {
    if (state.activeRun && state.activeRun.status === "running") {
      return "Manual refresh is temporarily unlocked because this round has been waiting a while.";
    }

    return "Re-capture the latest visible reply from this agent. Shift+click also arms manual dispatch override for this round.";
  }

  if (state.activeRun && state.activeRun.status === "running") {
    const remainingSeconds = Math.ceil(getManualRefreshRemainingMs() / 1000);
    if (remainingSeconds > 0) {
      return `Manual refresh unlocks ${remainingSeconds}s after dispatch while this round is still running.`;
    }
  }

  return "Reply refresh is only available for the latest round in the active session.";
}

function renderRefreshButtons() {
  AGENT_IDS.forEach((agent) => {
    const button = $(`refresh-${agent}`);
    if (!button) {
      return;
    }

    const refreshing = Boolean(state.refreshingAgents[agent]);
    const enabled = canRefreshReply(agent);
    button.disabled = !enabled || refreshing;
    button.textContent = refreshing ? "Refreshing..." : "Refresh Reply";
    button.title = getRefreshButtonTitle(agent, enabled, refreshing);
  });
}

function canSaveSummary() {
  if (state.activeRun && state.activeRun.status === "running") {
    return false;
  }

  const round = getSelectedRound();
  return Boolean(state.selectedSession && round && normalizeSummary(round.summary));
}

function renderSaveSummaryButton() {
  const button = $("save-summary-button");
  const select = $("save-type-select");
  if (!button) {
    return;
  }

  const enabled = canSaveSummary();
  const saveTypeConfig = getSaveTypeConfig();
  button.disabled = !enabled || state.savingSummary;
  button.textContent = state.savingSummary ? "Saving..." : saveTypeConfig.buttonLabel;

  if (select) {
    select.disabled = !enabled || state.savingSummary;
  }

  if (state.savingSummary) {
    button.title = `Saving the current summary as a ${saveTypeConfig.statusLabel}.`;
    return;
  }

  button.title = enabled
    ? `Save the current summary as a markdown ${saveTypeConfig.statusLabel}.`
    : "Select a completed round with a non-empty summary to save a markdown snapshot.";
}

function renderSummaryAttachToggle() {
  const button = $("summary-attach-toggle");
  if (!button) {
    return;
  }

  const attached = isSummaryAttachedForNextDispatch();
  const runInProgress = state.activeRun && state.activeRun.status === "running";
  const enabled = Boolean(state.activeSession) && !runInProgress;

  button.disabled = !enabled;
  button.textContent = attached ? "Attached" : "Prompt Only";
  button.setAttribute("aria-pressed", attached ? "true" : "false");
  button.title = attached
    ? "The next dispatch will include the carried summary."
    : "The next dispatch will send only your prompt. After a successful dispatch, summary attachment turns back on automatically.";
}

function renderControls() {
  const reviewingHistory = Boolean(
    state.activeSession &&
      state.selectedSession &&
      (state.selectedSession.sessionId !== state.activeSession.sessionId ||
        state.selectedRoundNumber !== getLiveRoundNumber())
  );
  const runInProgress = state.activeRun && state.activeRun.status === "running";
  const dispatchBlockReason = getDispatchBlockReason();
  const sendButton = $("send-button");

  sendButton.disabled = Boolean(dispatchBlockReason);
  sendButton.title = dispatchBlockReason;
  renderDispatchHint(getDispatchHintMessage(dispatchBlockReason));
  $("new-session-button").disabled = reviewingHistory || runInProgress;
  renderRefreshButtons();
  renderSaveSummaryButton();
  renderSummaryAttachToggle();
}

async function loadSession(sessionId, roundNumber = null) {
  const query = roundNumber === null ? "" : `?round=${roundNumber}`;
  const response = await fetch(`/api/sessions/${sessionId}${query}`);
  const data = await response.json();
  state.selectedSession = data.session;
  state.selectedRoundNumber =
    data.selectedRoundNumber ?? getLatestRound(data.session)?.roundNumber ?? null;
  renderSessionIndicator();
  renderSessionSelect();
  renderSelectedSession();
}

async function loadUiState(resetSelection = false) {
  const response = await fetch("/api/sessions");
  const data = await response.json();
  applyUiState(data, { resetSelection });
}

function applyUiState(data, { resetSelection = false } = {}) {
  state.sessions = data.sessions || [];
  state.activeSession = data.activeSession || null;
  state.activeRun = data.activeRun || null;

  const selectionIsValid = Boolean(
    state.selectedSession &&
      state.sessions.some((session) => session.sessionId === state.selectedSession.sessionId)
  );

  if (resetSelection || !selectionIsValid) {
    state.selectedSession = data.selectedSession || null;
    state.selectedRoundNumber =
      data.selectedRoundNumber ?? getLatestRound(state.selectedSession)?.roundNumber ?? null;
  } else if (
    state.selectedSession &&
    data.selectedSession &&
    state.selectedSession.sessionId === data.selectedSession.sessionId
  ) {
    state.selectedSession = data.selectedSession;
  }

  if (
    state.selectedSession &&
    !Array.isArray(state.selectedSession.rounds) &&
    state.selectedSession.sessionId
  ) {
    loadSession(state.selectedSession.sessionId, state.selectedRoundNumber);
    return;
  }

  renderSessionIndicator();
  renderSessionSelect();
  renderSelectedSession();

  if (!state.activeSession) {
    setGlobalStatus("idle", "");
  } else if (state.activeRun && state.activeRun.status === "running") {
    setGlobalStatus("running", `Running ${state.activeRun.sessionId} / round_${state.activeRun.roundNumber}`);
  } else {
    setGlobalStatus("done", "");
  }
}

function handleSnapshot(data) {
  applyUiState(data);
}

function handleSessionContext(data) {
  state.sessions = data.sessions || state.sessions;
  state.activeSession = data.activeSession || state.activeSession;
  const nextSelectedSession = data.selectedSession || state.selectedSession;
  const switchedToNewActiveSession =
    Boolean(data.activeSession && data.selectedSession) &&
    (!state.selectedSession ||
      state.selectedSession.sessionId !== data.activeSession.sessionId);

  if (
    !state.selectedSession ||
    switchedToNewActiveSession ||
    (data.selectedSession &&
      state.selectedSession.sessionId === data.selectedSession.sessionId)
  ) {
    state.selectedSession = nextSelectedSession;
    state.selectedRoundNumber =
      data.selectedRoundNumber ?? getLatestRound(state.selectedSession)?.roundNumber ?? null;
  }

  renderSessionIndicator();
  renderSessionSelect();
  renderSelectedSession();
  setGlobalStatus("done", "");
}

function handleRunStarted(data) {
  state.activeRun = data;
  state.selectedRoundNumber = data.roundNumber;

  if (!state.selectedSession || state.selectedSession.sessionId !== data.sessionId) {
    state.selectedSession = {
      sessionId: data.sessionId,
      rounds: [],
    };
  }

  if (!state.selectedSession.rounds.some((round) => round.roundNumber === data.roundNumber)) {
    state.selectedSession.rounds.push({
      roundNumber: data.roundNumber,
      prompt: data.prompt,
      replies: [],
      summary: "",
      createdAt: data.startedAt,
    });
  }

  renderSelectedSession();
  setGlobalStatus("running", `Running ${data.sessionId} / round_${data.roundNumber}`);
}

function handleAgentStage(data) {
  if (!state.activeRun || !state.activeRun.agents) {
    return;
  }

  state.activeRun.agents[data.agent] = {
    ...state.activeRun.agents[data.agent],
    ...data,
  };
  renderSelectedSession();
}

function handleAgentResult(data) {
  if (!state.activeRun || !state.activeRun.agents) {
    return;
  }

  state.activeRun.agents[data.agent] = {
    ...state.activeRun.agents[data.agent],
    ...data.result,
  };
  state.activeRun.summary = data.summary;
  renderSelectedSession();
}

function handleRunCompleted(data) {
  if (!data) {
    setGlobalStatus("error", "Dispatch failed before the run state was created.");
    return;
  }

  state.activeRun = data;
  if (data.session) {
    state.selectedSession = data.session;
    state.selectedRoundNumber = getLatestRound(data.session)?.roundNumber ?? null;
  }
  renderSelectedSession();
  setGlobalStatus(
    data.status === "completed" ? "done" : "error",
    data.status === "completed" ? "" : data.error
  );
}

function handleReplyRefreshed(data) {
  state.sessions = data.sessions || state.sessions;
  state.activeSession = data.activeSession || state.activeSession;

  if (
    data.selectedSession &&
    (!state.selectedSession ||
      state.selectedSession.sessionId === data.selectedSession.sessionId)
  ) {
    state.selectedSession = data.selectedSession;
    state.selectedRoundNumber =
      data.selectedRoundNumber ?? getLatestRound(data.selectedSession)?.roundNumber ?? null;
  }

  if (
    state.activeRun &&
    data.selectedSession &&
    state.activeRun.sessionId === data.selectedSession.sessionId
  ) {
    state.activeRun.summary = data.selectedRound?.summary || state.activeRun.summary;
    state.activeRun.session = data.selectedSession;

    if (state.activeRun.agents?.[data.agent]) {
      state.activeRun.agents[data.agent] = {
        ...state.activeRun.agents[data.agent],
        status: "done",
        stage: "capture",
        message: "Reply manually refreshed.",
        content: data.reply?.content || state.activeRun.agents[data.agent].content,
        completionReason:
          data.reply?.completionReason || state.activeRun.agents[data.agent].completionReason,
        errorCode: data.reply?.errorCode || null,
      };
    }
  }

  renderSessionIndicator();
  renderSessionSelect();
  renderSelectedSession();
  // F06: Do NOT auto-arm dispatch override on successful refresh.
  // Refresh = re-fetch only. Override = explicit operator decision.
  // Conflating the two silently granted next-dispatch permission as a side
  // effect of what appeared to be a simple "re-fetch" action.
  renderControls();
  setGlobalStatus(
    "done",
    `Refreshed ${data.label || AGENT_TITLES[data.agent] || data.agent} reply for round_${data.roundNumber}.`
  );
}

async function postJson(url, body) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Request failed.");
  }
  return data;
}

async function dispatchPrompt() {
  const prompt = $("prompt-input").value.trim();
  if (!prompt) {
    return;
  }

  const dispatchBlockReason = getDispatchBlockReason();
  if (dispatchBlockReason) {
    setGlobalStatus("error", dispatchBlockReason);
    renderControls();
    return;
  }

  if (!window.confirm("Dispatch this prompt to all three council members?")) {
    return;
  }

  try {
    const attachSummary = isSummaryAttachedForNextDispatch();
    state.manualDispatchOverrideKey = "";
    setGlobalStatus("running", "Dispatch accepted. Preparing browser session...");
    renderControls();
    await postJson("/api/run", { prompt, attachSummary });
    state.attachSummaryOnDispatch = true;
    renderControls();
  } catch (error) {
    setGlobalStatus("error", error.message);
  }
}

async function createNewSession() {
  if (!window.confirm("Close the current three chat windows and open a fresh session?")) {
    return;
  }

  try {
    await postJson("/api/new-session", {});
  } catch (error) {
    setGlobalStatus("error", error.message);
  }
}

async function refreshAgentReply(agent) {
  if (!canRefreshReply(agent) || !state.selectedSession) {
    setGlobalStatus(
      "error",
      "Reply refresh is only available for the latest round in the active session."
    );
    return;
  }

  const round = getSelectedRound();
  if (!round) {
    return;
  }

  state.refreshingAgents[agent] = true;
  renderControls();
  setGlobalStatus("running", `Refreshing ${AGENT_TITLES[agent] || agent} latest reply...`);

  try {
    const data = await postJson("/api/refresh-reply", {
      sessionId: state.selectedSession.sessionId,
      roundNumber: round.roundNumber,
      agent,
    });
    handleReplyRefreshed(data);
  } catch (error) {
    setGlobalStatus("error", error.message);
  } finally {
    delete state.refreshingAgents[agent];
    renderControls();
  }
}

async function saveSummaryArtifact() {
  if (!canSaveSummary() || !state.selectedSession) {
    setGlobalStatus("error", "Select a completed round with a non-empty summary first.");
    renderControls();
    return;
  }

  const round = getSelectedRound();
  if (!round) {
    return;
  }

  const saveType = getSelectedSaveType();
  const saveTypeConfig = getSaveTypeConfig(saveType);

  state.savingSummary = true;
  renderControls();
  setGlobalStatus(
    "running",
    `Saving ${saveTypeConfig.statusLabel} for round_${round.roundNumber}...`
  );

  try {
    const data = await postJson("/api/save-summary", {
      sessionId: state.selectedSession.sessionId,
      roundNumber: round.roundNumber,
      saveType,
    });
    const savedTypeConfig = getSaveTypeConfig(data.saveType || saveType);
    const successMessage = `Saved ${savedTypeConfig.statusLabel} as ${data.fileName}.`;
    setGlobalStatus("done", successMessage);
    showToast("Saved successfully.");
  } catch (error) {
    setGlobalStatus("error", error.message);
  } finally {
    state.savingSummary = false;
    renderControls();
  }
}

function toggleManualDispatchOverride() {
  if (isManualDispatchOverrideActive()) {
    state.manualDispatchOverrideKey = "";
    setGlobalStatus("idle", "Manual dispatch override cleared.");
    renderControls();
    return;
  }

  armManualDispatchOverride();
}

function toggleSummaryAttachment() {
  if (!state.activeSession) {
    setGlobalStatus("error", "Create a fresh session before changing next-dispatch summary mode.");
    return;
  }

  if (state.activeRun && state.activeRun.status === "running") {
    setGlobalStatus("error", "Wait for the current round to finish before changing summary attachment.");
    return;
  }

  state.attachSummaryOnDispatch = !isSummaryAttachedForNextDispatch();
  setGlobalStatus(
    "done",
    isSummaryAttachedForNextDispatch()
      ? "Summary attachment restored for the next dispatch."
      : "Next dispatch will send only your prompt. Summary attachment will restore automatically after a successful dispatch."
  );
  renderControls();
}

function connectEvents() {
  const source = new EventSource("/api/events");
  source.addEventListener("snapshot", (event) => handleSnapshot(JSON.parse(event.data)));
  source.addEventListener("session_context", (event) =>
    handleSessionContext(JSON.parse(event.data))
  );
  source.addEventListener("run_started", (event) => handleRunStarted(JSON.parse(event.data)));
  source.addEventListener("agent_stage", (event) => handleAgentStage(JSON.parse(event.data)));
  source.addEventListener("agent_result", (event) => handleAgentResult(JSON.parse(event.data)));
  source.addEventListener("run_completed", (event) =>
    handleRunCompleted(JSON.parse(event.data))
  );
  source.addEventListener("reply_refreshed", (event) =>
    handleReplyRefreshed(JSON.parse(event.data))
  );
  source.addEventListener("sessions_updated", (event) => {
    const data = JSON.parse(event.data);
    state.sessions = data.sessions || state.sessions;
    if (
      data.selectedSession &&
      state.selectedSession &&
      data.selectedSession.sessionId === state.selectedSession.sessionId
    ) {
      state.selectedSession = data.selectedSession;
      if (typeof data.selectedRoundNumber === "number") {
        state.selectedRoundNumber = data.selectedRoundNumber;
      }
    }
    renderSessionSelect();
    renderSelectedSession();
  });
}

$("send-button").addEventListener("click", dispatchPrompt);
$("new-session-button").addEventListener("click", createNewSession);
$("save-summary-button").addEventListener("click", saveSummaryArtifact);
$("summary-attach-toggle").addEventListener("click", toggleSummaryAttachment);
$("save-type-select").addEventListener("change", renderControls);
$("refresh-sessions").addEventListener("click", (event) => {
  if (event.shiftKey) {
    toggleManualDispatchOverride();
    return;
  }

  loadUiState(true);
});
$("session-select").addEventListener("change", (event) => loadSession(event.target.value));
$("round-select").addEventListener("change", (event) => {
  state.selectedRoundNumber =
    event.target.value === "" ? null : Number.parseInt(event.target.value, 10);
  renderSelectedSession();
});
AGENT_IDS.forEach((agent) => {
  // F06: Shift+click on agent Refresh no longer arms dispatch override.
  // Override is a separate explicit action via Shift+click on the Session Refresh button.
  $(`refresh-${agent}`).addEventListener("click", () => {
    refreshAgentReply(agent);
  });
});

window.setInterval(() => {
  if (state.activeRun && state.activeRun.status === "running") {
    renderControls();
  }
}, 1000);

connectEvents();
loadUiState(true);

// ─────────────────────────────────────────────
// Chair Tools Panel
// ─────────────────────────────────────────────

// ── Helpers ──
function getActiveSessionId() {
  return state.activeSession ? state.activeSession.sessionId : null;
}

// ── To-Do ──
const todoState = { items: [] };
const todoConfirmStep = {};

function renderTodoList() {
  const ul = $("todo-active-list");
  if (!ul) return;
  ul.innerHTML = "";
  if (todoState.items.length === 0) {
    const li = document.createElement("li");
    li.className = "ct-todo-empty";
    li.textContent = "No active items.";
    ul.appendChild(li);
    return;
  }
  todoState.items.forEach((item) => {
    const li = document.createElement("li");
    li.dataset.id = item.id;
    const step = todoConfirmStep[item.id] || 0;

    if (step === 0) {
      li.className = "ct-todo-item";
      li.title = "Click to mark done";

      const dot = document.createElement("span");
      dot.className = "ct-todo-item-dot";

      const textWrap = document.createElement("div");
      const textEl = document.createElement("div");
      textEl.textContent = item.text;
      textWrap.appendChild(textEl);

      if (item.session) {
        const sessionEl = document.createElement("div");
        sessionEl.className = "ct-todo-item-session";
        sessionEl.textContent = item.session;
        textWrap.appendChild(sessionEl);
      }

      li.appendChild(dot);
      li.appendChild(textWrap);
      li.addEventListener("click", (e) => {
        e.stopPropagation();
        todoConfirmStep[item.id] = 1;
        renderTodoList();
      });
    } else {
      li.className = "ct-todo-item ct-todo-item--confirming";

      const textEl = document.createElement("span");
      textEl.className = "ct-todo-confirm-text";
      textEl.textContent = item.text;

      const row = document.createElement("div");
      row.className = "ct-todo-confirm-row";

      const cancelBtn = document.createElement("button");
      cancelBtn.className = "ct-todo-confirm-btn ct-todo-cancel-btn";
      cancelBtn.textContent = "×";
      cancelBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        delete todoConfirmStep[item.id];
        renderTodoList();
      });

      const confirmBtn = document.createElement("button");
      if (step === 1) {
        confirmBtn.className = "ct-todo-confirm-btn ct-todo-confirm-yes";
        confirmBtn.textContent = "Done?";
        confirmBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          todoConfirmStep[item.id] = 2;
          renderTodoList();
        });
        row.appendChild(confirmBtn); // LEFT: "Done?"
        row.appendChild(cancelBtn);  // RIGHT: "×"
      } else {
        confirmBtn.className = "ct-todo-confirm-btn ct-todo-confirm-done";
        confirmBtn.textContent = "Confirm";
        confirmBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          delete todoConfirmStep[item.id];
          markTodoDone(item.id);
        });
        row.appendChild(cancelBtn);  // LEFT: "×"
        row.appendChild(confirmBtn); // RIGHT: "Confirm"
      }

      li.appendChild(textEl);
      li.appendChild(row);
    }

    ul.appendChild(li);
  });
}

async function loadTodos() {
  try {
    const res = await fetch("/api/todos");
    const data = await res.json();
    todoState.items = data.active || [];
    renderTodoList();
  } catch {
    // silently ignore on load
  }
}

async function addTodo() {
  const input = $("todo-input");
  const text = input ? input.value.trim() : "";
  if (!text) return;
  try {
    const res = await fetch("/api/todos/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, session: getActiveSessionId() }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to add.");
    todoState.items.push(data.item);
    input.value = "";
    renderTodoList();
  } catch (err) {
    showToast(err.message);
  }
}

async function markTodoDone(id) {
  try {
    const res = await fetch("/api/todos/done", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed.");
    todoState.items = todoState.items.filter((item) => item.id !== id);
    renderTodoList();
    showToast("Marked done.");
  } catch (err) {
    showToast(err.message);
  }
}

const todoAddBtn = $("todo-add-btn");
const todoInput = $("todo-input");
if (todoAddBtn) todoAddBtn.addEventListener("click", addTodo);
if (todoInput) {
  todoInput.addEventListener("keydown", (e) => { if (e.key === "Enter") addTodo(); });
}

loadTodos();

// Reset pending todo confirm states on outside click
document.addEventListener("click", () => {
  if (Object.keys(todoConfirmStep).length > 0) {
    Object.keys(todoConfirmStep).forEach((k) => delete todoConfirmStep[k]);
    renderTodoList();
  }
});

// ── Template Viewer ──
const TPL_FIXED = {
  voting: "voting_process.MD",
  answer: "answer.MD",
  template: "template.MD",
};

async function loadFixedTemplate(key) {
  const fileName = TPL_FIXED[key];
  const el = document.querySelector(`.ct-tpl-content[data-fixed="${fileName}"]`);
  if (!el || el.dataset.loaded) return;
  try {
    const res = await fetch(`/api/template/${fileName}`);
    const data = await res.json();
    el.textContent = data.content || "";
    el.dataset.loaded = "1";
  } catch {
    el.textContent = "[Failed to load template]";
  }
}

function switchTab(tabName) {
  document.querySelectorAll(".ct-tab").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.tab === tabName);
  });
  // hide all content
  document.querySelectorAll(".ct-tpl-content").forEach((el) => el.classList.remove("active"));
  document.querySelectorAll(".ct-tpl-pad").forEach((el) => { el.hidden = true; });

  if (tabName === "pad1") {
    $("tpl-pad1").hidden = false;
  } else if (tabName === "pad2") {
    $("tpl-pad2").hidden = false;
  } else {
    const contentEl = document.querySelector(`.ct-tpl-content[data-fixed="${TPL_FIXED[tabName]}"]`);
    if (contentEl) {
      contentEl.classList.add("active");
      loadFixedTemplate(tabName);
    }
  }
}

document.querySelectorAll(".ct-tab").forEach((btn) => {
  btn.addEventListener("click", () => switchTab(btn.dataset.tab));
});

// Load the default tab (voting) on startup
loadFixedTemplate("voting");

// ── Score Calculator ──
const CALC_AGENTS = ["Claude", "Gemini", "ChatGPT"];
const CALC_AGENT_KEYS = ["claude", "gemini", "chatgpt"];

function buildCalcGrid() {
  const modeEl = $("calc-mode");
  const mode = modeEl ? modeEl.value : "";
  const selfScore = mode === "1x3" || mode === "1x3_two";
  const twoProposal = mode === "1x2_two" || mode === "1x3_two";

  const head = $("calc-grid-head");
  const body = $("calc-grid-body");
  const foot = $("calc-grid-foot");
  if (!head || !body || !foot) return;

  if (!mode) {
    head.innerHTML = "";
    body.innerHTML = "<tr><td colspan='7' style='color:var(--text-tertiary);font-size:0.78rem;padding:12px 8px;text-align:center;font-style:italic;'>Select a scoring mode to build the grid.</td></tr>";
    foot.innerHTML = "";
    validateCalc();
    return;
  }

  head.innerHTML = "";
  if (twoProposal) {
    // Two-row header: AI names (colspan=2) on row 1, P1/P2 labels on row 2
    const row1 = document.createElement("tr");
    const cornerTh = document.createElement("th");
    cornerTh.rowSpan = 2;
    cornerTh.textContent = "Scorer \\ Target";
    row1.appendChild(cornerTh);
    CALC_AGENTS.forEach((name) => {
      const th = document.createElement("th");
      th.colSpan = 2;
      th.textContent = name;
      row1.appendChild(th);
    });
    head.appendChild(row1);

    const row2 = document.createElement("tr");
    CALC_AGENTS.forEach(() => {
      ["P1", "P2"].forEach((p) => {
        const th = document.createElement("th");
        th.textContent = p;
        row2.appendChild(th);
      });
    });
    head.appendChild(row2);
  } else {
    const headerRow = document.createElement("tr");
    const emptyTh = document.createElement("th");
    emptyTh.textContent = "Scorer \\ Target";
    headerRow.appendChild(emptyTh);
    CALC_AGENTS.forEach((name) => {
      const th = document.createElement("th");
      th.textContent = name;
      headerRow.appendChild(th);
    });
    head.appendChild(headerRow);
  }

  body.innerHTML = "";
  CALC_AGENTS.forEach((scorerName, scorerIdx) => {
    const tr = document.createElement("tr");
    const labelTd = document.createElement("td");
    labelTd.className = "ct-row-label";
    labelTd.textContent = scorerName;
    tr.appendChild(labelTd);

    CALC_AGENTS.forEach((_targetName, targetIdx) => {
      const isSelf = scorerIdx === targetIdx;
      const works = twoProposal ? ["1", "2"] : ["1"];
      works.forEach((workIdx) => {
        const td = document.createElement("td");
        if (isSelf && !selfScore) {
          td.textContent = "—";
          td.style.color = "var(--text-tertiary)";
        } else {
          const input = document.createElement("input");
          input.type = "number";
          input.min = "0";
          input.max = "60";
          input.step = "1";
          input.className = "ct-calc-input";
          input.dataset.scorer = CALC_AGENT_KEYS[scorerIdx];
          input.dataset.target = CALC_AGENT_KEYS[targetIdx];
          input.dataset.work = workIdx;
          input.addEventListener("input", onCalcInputChange);
          td.appendChild(input);
        }
        tr.appendChild(td);
      });
    });
    body.appendChild(tr);
  });

  foot.innerHTML = "";
  const footRow = document.createElement("tr");
  const footLabel = document.createElement("td");
  footLabel.className = "ct-row-label";
  footLabel.textContent = "Total received";
  footRow.appendChild(footLabel);
  CALC_AGENT_KEYS.forEach((key) => {
    const td = document.createElement("td");
    if (twoProposal) td.colSpan = 2;
    td.className = "ct-total-cell";
    td.id = `calc-total-${key}`;
    td.textContent = "—";
    footRow.appendChild(td);
  });
  foot.appendChild(footRow);

  updateCalcTotals();
  validateCalc();
}

function getCalcInputs() {
  return Array.from(document.querySelectorAll(".ct-calc-input"));
}

function updateCalcTotals() {
  const totals = { claude: 0, gemini: 0, chatgpt: 0 };
  let hasAny = false;
  getCalcInputs().forEach((input) => {
    const val = parseInt(input.value, 10);
    if (!isNaN(val)) {
      totals[input.dataset.target] += val;
      hasAny = true;
    }
  });
  CALC_AGENT_KEYS.forEach((key) => {
    const cell = $(`calc-total-${key}`);
    if (cell) cell.textContent = hasAny ? String(totals[key]) : "—";
  });
}

function getCalcScoreRange() {
  const sceneEl = $("calc-scene");
  const scene = sceneEl ? sceneEl.value : "";
  if (scene === "core_only") return { min: 1, max: 39 };
  return { min: 0, max: 60 };
}

function validateCalc() {
  const modeEl = $("calc-mode");
  const sceneEl = $("calc-scene");
  const submitBtn = $("calc-submit");
  const errorEl = $("calc-error");
  if (!modeEl || !sceneEl || !submitBtn || !errorEl) return;

  if (!modeEl.value) {
    submitBtn.disabled = true;
    errorEl.hidden = true;
    return;
  }
  if (!sceneEl.value) {
    submitBtn.disabled = true;
    errorEl.hidden = true;
    return;
  }

  const { min, max } = getCalcScoreRange();
  const inputs = getCalcInputs();

  // sync min/max attributes to current scene
  inputs.forEach((input) => {
    input.min = String(min);
    input.max = String(max);
  });

  let allValid = true;
  let errorMsg = "";

  inputs.forEach((input) => {
    input.classList.remove("error");
    const raw = input.value.trim();
    if (raw === "") {
      allValid = false;
    } else {
      const val = parseInt(raw, 10);
      if (isNaN(val) || String(val) !== raw || val < min || val > max) {
        input.classList.add("error");
        allValid = false;
        errorMsg = `Scores must be integers from ${min} to ${max}.`;
      }
    }
  });

  if (!allValid && !errorMsg) errorMsg = "Fill in all score boxes.";

  errorEl.textContent = errorMsg;
  errorEl.hidden = !errorMsg;
  submitBtn.disabled = !allValid || inputs.length === 0;
}

function onCalcInputChange() {
  updateCalcTotals();
  validateCalc();
}

async function submitCalc() {
  const modeEl = $("calc-mode");
  const sceneEl = $("calc-scene");
  const errorEl = $("calc-error");
  const resultEl = $("calc-result");

  const scoring_mode = modeEl.value;
  const scene_mode = sceneEl.value;

  // build raw_inputs
  const raw_inputs = {};
  getCalcInputs().forEach((input) => {
    const scorer = input.dataset.scorer;
    const target = input.dataset.target;
    const work = input.dataset.work || "1";
    const val = parseInt(input.value, 10);
    if (!raw_inputs[scorer]) raw_inputs[scorer] = {};
    if (!raw_inputs[scorer][target]) raw_inputs[scorer][target] = {};
    raw_inputs[scorer][target][work] = val;
  });

  // build totals (sum per target across all scorers)
  const totals = { claude: 0, gemini: 0, chatgpt: 0 };
  CALC_AGENT_KEYS.forEach((key) => {
    const cell = $(`calc-total-${key}`);
    totals[key] = cell && cell.textContent !== "—" ? parseInt(cell.textContent, 10) || 0 : 0;
  });

  const payload = {
    session: getActiveSessionId(),
    round: state.activeSession ? `round_${state.activeSession.roundNumber}` : null,
    scoring_mode,
    scene_mode,
    raw_inputs,
    totals,
  };

  try {
    const res = await fetch("/api/scores/append", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Save failed.");

    // show result
    const lines = CALC_AGENTS.map((name, i) => {
      const key = CALC_AGENT_KEYS[i];
      return `<strong>${name}</strong>: ${totals[key]}`;
    });
    resultEl.innerHTML = lines.join(" &nbsp;·&nbsp; ");
    resultEl.hidden = false;

    // reset scene dropdown, keep mode
    sceneEl.value = "";
    showToast("Score saved.");

    // clear inputs and re-validate
    getCalcInputs().forEach((input) => { input.value = ""; input.classList.remove("error"); });
    updateCalcTotals();
    validateCalc();
  } catch (err) {
    if (errorEl) { errorEl.textContent = err.message; errorEl.hidden = false; }
  }
}

function resetCalc() {
  const modeEl = $("calc-mode");
  const sceneEl = $("calc-scene");
  const resultEl = $("calc-result");
  if (modeEl) modeEl.value = "";
  if (sceneEl) sceneEl.value = "";
  if (resultEl) resultEl.hidden = true;
  buildCalcGrid();
}

const calcModeEl = $("calc-mode");
const calcSceneEl = $("calc-scene");
const calcSubmitBtn = $("calc-submit");
const calcResetBtn = $("calc-reset");

if (calcModeEl) {
  calcModeEl.addEventListener("change", () => { buildCalcGrid(); validateCalc(); });
}
if (calcSceneEl) {
  calcSceneEl.addEventListener("change", validateCalc);
}
if (calcSubmitBtn) calcSubmitBtn.addEventListener("click", submitCalc);
if (calcResetBtn) calcResetBtn.addEventListener("click", resetCalc);

// Build initial grid (empty, mode unselected)
buildCalcGrid();
