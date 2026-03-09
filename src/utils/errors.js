function createAgentError(code, message, details = {}) {
  const error = new Error(message);
  error.code = code;
  error.details = details;
  return error;
}

function getErrorCode(error, fallback = "unknown_error") {
  return error && error.code ? error.code : fallback;
}

module.exports = {
  createAgentError,
  getErrorCode,
};
