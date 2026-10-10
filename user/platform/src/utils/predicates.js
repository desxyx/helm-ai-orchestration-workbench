// One rule for Node orchestration and the browser UI. The server includes this
// same module before app.js; no persisted status or session field is introduced.
(function (root, factory) {
  const predicates = factory();
  if (typeof module === "object" && module.exports) module.exports = predicates;
  else root.HELMReplyPredicates = predicates;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  const TIMEOUT_PREFIX = "[capture timeout] ";

  function exclusionReason(reply) {
    if (!reply) return "capture_timeout";
    if (String(reply.errorCode || "").trim()) return String(reply.errorCode).trim();
    if (reply.staleSuspect === true) return "staleSuspect";
    if (reply.completionReason === "timeout") return "completion_timeout";
    if (reply.completionReason === "stalled") return "completion_not_started";
    if (reply.completionReason === "error") return "completion_polling_failed";
    const content = String(reply.content || "").trim();
    if (!content || content.startsWith(TIMEOUT_PREFIX)) return "capture_timeout";
    if (reply.status !== "ok" || /^ERROR:/i.test(content)) return "capture_failed";
    return "";
  }

  function isCaptured(reply) {
    return Boolean(reply && !exclusionReason(reply));
  }

  return { isCaptured, exclusionReason, TIMEOUT_PREFIX };
});
