# Ollama Integration Setup Guide

This guide walks you through setting up Ollama for both local development and production deployment.

## Architecture

```
Local Development:
  Browser → Vite Dev Server (http://localhost:5173) 
          → Vite Proxy (/api/ollama → http://localhost:11434)
          → Ollama (running locally)

Production (Vercel):
  Browser → Vercel Deployment (https://www.kofiagye.com)
          → Vercel Serverless Function (/api/ollama/generate)
          → Ollama Server (OLLAMA_API_URL environment variable)
```

## Local Development Setup

### 1. Install Ollama
- Download and install from https://ollama.ai
- Or if already installed, make sure it's running

### 2. Start Ollama
```bash
ollama serve
```
This starts Ollama on `http://localhost:11434` by default.

### 3. Pull the Model
```bash
ollama pull llama3.2
```

### 4. Start your dev server
```bash
npm run dev
```

The frontend will proxy requests to Ollama via Vite's proxy configuration.

### 5. Test locally
- Open http://localhost:5173
- Open the chatbot and send a message
- It should connect to your local Ollama instance

## Production Deployment

### 1. Set Up Ollama on Your Server

You have two options:

**Option A: Run Ollama on a VPS/Server**
- SSH into your VPS/server
- Install Ollama: https://github.com/ollama/ollama
- Start Ollama: `ollama serve`
- Pull the model: `ollama pull llama3.2`
- Get the server's IP or domain (e.g., `ollama.yourdomain.com:11434`)

**Option B: Use a Cloud Service**
- Deploy Ollama to a cloud provider that supports it
- Get the API endpoint URL

### 2. Configure Vercel Environment Variable

1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add a new variable:
   - **Name:** `OLLAMA_API_URL`
   - **Value:** `http://your-ollama-server:11434` (for internal network) or `https://ollama.yourdomain.com` (for external)

### 3. Deploy to Vercel

```bash
git add .
git commit -m "feat: add Ollama integration"
git push
```

Vercel will automatically:
- Build the frontend
- Deploy the serverless function
- Use your `OLLAMA_API_URL` environment variable

### 4. Test in Production
- Visit https://www.kofiagye.com
- Open the chatbot
- Send a message
- It should connect to your production Ollama instance

## Troubleshooting

### Local Development
- **"Ollama error" message:** Make sure Ollama is running (`ollama serve`)
- **"Thinking..." appears but no response:** Check that you ran `ollama pull llama3.2`
- **CORS errors:** The Vite proxy should handle this automatically

### Production
- **"AI assistant is being set up" message:** 
  - Check that `OLLAMA_API_URL` is set in Vercel environment variables
  - Verify the Ollama server is running and accessible from Vercel
  - Check Vercel function logs: https://vercel.com/dashboard → Your Project → Functions

### Network/Connectivity
- **Vercel → Ollama connection issues:**
  - If Ollama is on a private VPS: use an internal IP
  - If Ollama is on a public domain: make sure it's accessible from the internet
  - Test with: `curl https://your-ollama-url/api/generate -X POST -H "Content-Type: application/json" -d '{"model":"llama3.2","prompt":"test"}'`

## Files Changed

- `src/sub-components/ChatbotButton.tsx` - Simplified to use `/api/ollama/generate`
- `vite.config.ts` - Added proxy for local development
- `api/ollama/generate.ts` - Vercel serverless function
- `package.json` - Added `@vercel/node` dependency
- `vercel.json` - Vercel configuration

## Next Steps

1. [ ] Install Ollama locally
2. [ ] Pull `llama3.2` model
3. [ ] Test local development
4. [ ] Set up Ollama on production server
5. [ ] Add `OLLAMA_API_URL` to Vercel environment variables
6. [ ] Deploy to Vercel
7. [ ] Test in production
