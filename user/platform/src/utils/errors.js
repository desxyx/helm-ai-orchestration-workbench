function createAgentError(code, message, details = {}, options = {}) {
  const error = new Error(message, options);
  error.code = code;
  error.details = details;
  return error;
}

function getErrorCode(error, fallback = "unknown_error") {
  return error && error.code ? error.code : fallback;
}

// Send failures use a fixed vocabulary: exception text can carry a page.evaluate
// argument, locator, clipboard value or private browser call log.
const SEND_FAILURE_MESSAGES = {
  'composer.selector': 'A unique editable composer was not found.',
  'composer.scope': 'The composer region could not be resolved.',
  'composer.initiallyEmpty': 'Composer was not empty or held an attachment; nothing was pasted.',
  'composer.activate': 'Composer activation failed before paste.',
  'send.stopActive': 'The provider is still generating; nothing new was sent.',
  'clipboard.writeText': 'Clipboard write failed before paste.',
  'clipboard.readbackMismatch': 'Clipboard did not hold the prompt before paste; nothing was pasted.',
  'paste.singleFullPayload': 'The single full-payload paste failed.',
  'composer.settled': 'Pasted content did not settle; the draft is preserved and Send was not clicked.',
  'attachment.exactlyOne': 'The composer holds more than one attachment; Send was not clicked.',
  'attachment.error': 'The composer attachment shows an error; Send was not clicked.',
  'attachment.unverifiedProvider': 'This provider turned the paste into an attachment, which is not verified; the draft is preserved and Send was not clicked.',
  'send.visibleEnabled': 'No actionable Send control; the draft is preserved and Send was not clicked.',
  'send.click': 'The single Send click failed.',
};

function sendFailureMessage(field) {
  return SEND_FAILURE_MESSAGES[field] || 'Send failed before submission could be confirmed.';
}

module.exports = {
  createAgentError,
  getErrorCode,
  sendFailureMessage,
};
