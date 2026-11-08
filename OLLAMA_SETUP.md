# Ollama integration

The portfolio assistant and optional AI blog search both send non-streaming `POST /api/chat` requests using the model `gpt-oss:120b`.

## Local development

Run the frontend with `npm run dev` and start `npm run dev:api` in a second terminal. Vite proxies `/api/*` to the Express server on `http://localhost:3001`.

The Express proxy loads `.env` from the project root. Set `OLLAMA_API` to your Ollama Cloud API key. The proxy forwards chat requests to `https://ollama.com/api/chat` by default and uses the key as a bearer token.

To use a different upstream in local development, set `OLLAMA_API_URL` to the full chat endpoint, including `/api/chat`. The upstream must serve the model requested by the frontend.

Check the local proxy in PowerShell:

```powershell
Invoke-RestMethod http://localhost:3001/health
```

The health route checks the Express process. To check the upstream connection, open **Let’s Talk** in the portfolio, send a message, and inspect the `/api/chat` response in the browser’s Network tab if the request fails.

## Vercel

Set `OLLAMA_API` in the project’s server environment. [`api/chat.ts`](api/chat.ts) forwards requests to Ollama Cloud and reads the key on the server.

Vercel also exposes [`/api/ollama/generate`](api/ollama/generate.ts) as a separate handler. It treats `OLLAMA_API_URL` as an Ollama base URL and appends `/api/generate`. The portfolio UI uses `/api/chat`.
