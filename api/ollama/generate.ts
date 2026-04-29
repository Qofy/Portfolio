import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get Ollama server URL from environment variable
    // For production: set OLLAMA_API_URL in Vercel settings
    // Default to localhost for local testing
    const ollamaUrl = process.env.OLLAMA_API_URL || 'http://localhost:11434';

    const response = await fetch(`${ollamaUrl}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Ollama proxy error:', error);
    res.status(500).json({
      error: 'Failed to connect to Ollama',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
