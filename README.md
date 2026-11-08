# Kofi Agyekum’s Portfolio

A single-page portfolio built with React, TypeScript, Vite, Sass, and GSAP. It includes project details, a Firestore-backed blog with comments and reactions, and an Ollama-powered chat assistant and blog search.

## Run locally

Use Node.js 20 or later and npm. From the repository root in PowerShell:

```powershell
npm ci
Copy-Item .env.example .env
```

Fill in the `VITE_FIREBASE_*` values in `.env` from your Firebase web app configuration. The app initializes Firestore on startup, so set these values before running the frontend. Use a development Firebase project to exercise blog writes. See the [Firestore guide](FIRESTORE_RULES.md) for the collections and access requirements.

```powershell
npm run dev
```

Open the URL printed by Vite, usually `http://localhost:5173`. To enable chat and AI-assisted search, add `OLLAMA_API` to `.env` and run `npm run dev:api` in a second terminal. See the [Ollama guide](OLLAMA_SETUP.md) for endpoint configuration and troubleshooting.

## Common commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run dev:api` | Start the local Express chat proxy on port 3001. |
| `npm run build` | Run TypeScript checks and build the site into `dist/`. |
| `npm run preview` | Preview the built frontend locally. |
| `npm run lint` | Run ESLint across the TypeScript source. |

## Maintain and deploy

See the [project structure](PROJECT_STRUCTURE.md) for the active content files, components, and animation hooks.

Set the `VITE_FIREBASE_*` values in the build environment when deploying. Vite embeds `VITE_*` values in the browser bundle. Keep the Ollama API key in the server environment.

Vercel serves the chat endpoint from `api/chat.ts`. The Docker image serves the static build from `dist/`. The Docker Compose environment applies at container runtime, so passing `VITE_*` values there does not configure the build. Chat on a static host requires a backend serving `/api/chat` on the same origin.
