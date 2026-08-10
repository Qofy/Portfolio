import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();
const PORT = 3001;
const OLLAMA_URL = process.env.OLLAMA_API_URL || 'https://ollama.com/api/chat';
const OLLAMA_API_KEY = process.env.OLLAMA_API;

// Enable CORS for all routes
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:5174'],
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true
}));

app.use(express.json());

// Handle preflight requests
app.options('*', cors());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Chat proxy is running', routes: ['/health', '/api/chat'] });
});

// Debug route info
app.get('/debug', (req, res) => {
  res.json({
    status: 'ok',
    server: 'running',
    port: PORT,
    ollama_url: OLLAMA_URL,
    routes: ['GET /health', 'POST /api/chat']
  });
});

app.post('/api/chat', async (req, res) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (OLLAMA_API_KEY) {
      headers['Authorization'] = `Bearer ${OLLAMA_API_KEY}`;
    }

    const response = await fetch(OLLAMA_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(req.body)
    });

    const text = await response.text();
    console.log('Ollama response status:', response.status);
    console.log('Ollama response body:', text.slice(0, 200));

    if (!response.ok) {
      return res.status(response.status).json({ error: text });
    }

    const data = JSON.parse(text);
    res.json(data);
  } catch (error) {
    console.error('Ollama Cloud API error:', error);
    res.status(500).json({ 
      error: 'Failed to connect to AI service',
      details: error.message
    });
  }
})

app.listen(PORT, () => {
  console.log(`Chat proxy server running on http://localhost:${PORT}`);
});
