import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  try {
    const response = await fetch('https://ollama.com/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 0369aef6d541433ba83977a5911812b9.BxWRKU7oXd34DDpHgNdVPH1H'
      },
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
