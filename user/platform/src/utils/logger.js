const fs = require("fs");
const path = require("path");
const { nowIso } = require("./time");

const LOG_PATH = path.join(__dirname, "../../ui.out.log");
const logStream = fs.createWriteStream(LOG_PATH, { flags: "a" });

function format(level, message) {
  return `${nowIso()} [${level}] ${message}`;
}

function write(line) {
  logStream.write(line + "\n");
}

function info(message) {
  const line = format("INFO", message);
  console.log(line);
  write(line);
}

function warn(message) {
  const line = format("WARN", message);
  console.warn(line);
  write(line);
}

function error(message) {
  const line = format("ERROR", message);
  console.error(line);
  write(line);
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
