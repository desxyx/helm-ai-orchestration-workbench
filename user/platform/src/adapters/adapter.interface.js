// src/adapters/adapter.interface.js
// DO NOT MODIFY THIS CONTRACT WITHOUT GOOD REASON

/**
 * @param {import('playwright').Page} page
 * @returns {Promise<void>}
 */
async function open(page) {}

/**
 * @param {import('playwright').Page} page
 * @returns {Promise<boolean>}
 */
async function isReady(page) {}

/**
 * @param {import('playwright').Page} page
 * @param {string} text
 * @returns {Promise<void>}
 */
async function sendMessage(page, text) {}

/**
 * @param {import('playwright').Page} page
 * @returns {Promise<{ completed: boolean, reason: string }>}
 */
async function waitForCompletion(page) {}

/**
 * @param {import('playwright').Page} page
 * @returns {Promise<string>}
 */
async function captureLastReply(page) {}

module.exports = {
  open,
  isReady,
  sendMessage,
  waitForCompletion,
  captureLastReply,
};
