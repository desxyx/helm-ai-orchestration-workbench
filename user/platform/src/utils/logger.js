const { nowIso } = require("./time");

function format(level, message) {
  return `${nowIso()} [${level}] ${message}`;
}

function info(message) {
  console.log(format("INFO", message));
}

function warn(message) {
  console.warn(format("WARN", message));
}

function error(message) {
  console.error(format("ERROR", message));
}

function stage(agent, step, message) {
  info(`[${agent}] [${step}] ${message}`);
}

module.exports = {
  info,
  warn,
  error,
  stage,
};
