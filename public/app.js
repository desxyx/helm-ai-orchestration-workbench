const state = {
  sessions: [],
  selectedSession: null,
  selectedRoundNumber: null,
  activeSession: null,
  activeRun: null,
};

function $(id) {
  return document.getElementById(id);
}

function setGlobalStatus(_status, message) {
  const target = $("global-message");
  if (!target) {
    return;
  }

  target.textContent = message || "";
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

function getSelectedRound() {
  return getRoundByNumber(state.selectedSession, state.selectedRoundNumber);
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
  if (state.activeRun && isViewingLiveRound()) {
    return state.activeRun.summary || state.activeRun.previousSummary || "";
  }

  return getSelectedRound()?.summary || "";
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
  const liveRound = state.activeRun && isViewingLiveRound();

  ["gemini", "claude", "chatgpt"].forEach((agent) => {
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

function renderControls() {
  const reviewingHistory = Boolean(
    state.activeSession &&
      state.selectedSession &&
      (state.selectedSession.sessionId !== state.activeSession.sessionId ||
        state.selectedRoundNumber !== getLiveRoundNumber())
  );
  const runInProgress = state.activeRun && state.activeRun.status === "running";

  $("send-button").disabled = reviewingHistory || runInProgress || !state.activeSession;
  $("new-session-button").disabled = reviewingHistory || runInProgress;
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

  if (!window.confirm("Run this prompt in Gemini, Claude, and ChatGPT?")) {
    return;
  }

  try {
    setGlobalStatus("running", "Dispatch accepted. Preparing browser session...");
    await postJson("/api/run", { prompt });
  } catch (error) {
    setGlobalStatus("error", error.message);
  }
}

async function createNewSession() {
  if (!window.confirm("Close the current model tabs and open a fresh session?")) {
    return;
  }

  try {
    await postJson("/api/new-session", {});
  } catch (error) {
    setGlobalStatus("error", error.message);
  }
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
$("refresh-sessions").addEventListener("click", () => loadUiState(true));
$("session-select").addEventListener("change", (event) => loadSession(event.target.value));
$("round-select").addEventListener("change", (event) => {
  state.selectedRoundNumber =
    event.target.value === "" ? null : Number.parseInt(event.target.value, 10);
  renderSelectedSession();
});

connectEvents();
loadUiState(true);
