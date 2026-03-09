# AI Council

Local prototype for sending the same prompt to ChatGPT, Gemini, and Claude through browser automation, then storing each round locally for review.

This repository is meant to stay lightweight and publishable. Local browser profiles, saved sessions, and other machine-specific files are not part of the repo.

## What it does

- Opens separate browser profiles for ChatGPT, Gemini, and Claude
- Sends one round prompt to all three products
- Captures each reply and stores the round as local JSON
- Carries the previous round summary into the next round
- Shows live status and saved history in a small local UI

## Tech stack

- Node.js
- Playwright
- Plain HTML, CSS, and JavaScript
- Local JSON storage

## Project structure

```text
ai_council_public/
├── server.js
├── config.js
├── main.js
├── package.json
├── public/
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── data/
│   └── sessions/
└── src/
    ├── adapters/
    ├── browser/
    ├── orchestrator/
    ├── storage/
    └── utils/
```

## Setup

1. Install dependencies.

```bash
npm install
```

2. Prepare local browser profiles for:

- `./browser-profiles/chatgpt`
- `./browser-profiles/gemini`
- `./browser-profiles/claude`

These directories are created and used locally. They should not be committed.

3. Make sure each profile can access its target product with a valid logged-in session.

4. Start the local UI server.

```bash
npm run ui
```

5. Open `http://127.0.0.1:3030`.

## Usage

- Click `New Session` to open a fresh set of model tabs
- Enter a prompt and click `Run Round`
- Wait for all three replies to finish
- Review saved sessions and earlier rounds from the sidebar

There is also a single-agent entry path for quick checks:

```bash
node main.js --agent=chatgpt
node main.js --agent=gemini
node main.js --agent=claude
```

## Notes

- This is a prototype, not a production service.
- Reply capture depends on page structure and selectors in each adapter.
- If a provider changes its UI, that adapter may need to be updated.
- Running tabs that already hold the same browser profile can block a new session from starting.
- Session files under `data/sessions/` are local output and can be safely left out of the public repo.
