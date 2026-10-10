// The three provider browsers share one OS clipboard, and all three adapters run in this one
// Node process. Every clipboard write+read sequence (paste injection, copy capture) must hold
// this lock, or one agent's paste/copy can land in another agent's input or captured reply.
let chain = Promise.resolve();

async function withClipboardLock(task) {
  const previous = chain;
  let release = () => {};

  chain = new Promise((resolve) => {
    release = resolve;
  });

  await previous.catch(() => {});

  try {
    return await task();
  } finally {
    release();
  }
}

module.exports = { withClipboardLock };
