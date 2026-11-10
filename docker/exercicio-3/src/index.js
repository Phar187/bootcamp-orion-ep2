const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = Number(process.env.API_PORT || 3000);
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 5432),
  user: process.env.DB_USER || 'orion',
  password: process.env.DB_PASS || 'orion_dev_password',
  database: process.env.DB_NAME || 'orion',
});

app.use(express.json());
app.get('/health', async (_request, response) => {
  try {
    await pool.query('SELECT 1');
    response.json({ status: 'ok', environment: process.env.NODE_ENV || 'development', database: 'connected' });
  } catch {
    response.status(503).json({ status: 'error', database: 'unavailable' });
  }
});
app.get('/messages', async (_request, response) => {
  try {
    const result = await pool.query('SELECT id, text, created_at FROM messages ORDER BY id');
    response.json(result.rows);
  } catch {
    response.status(500).json({ error: 'Não foi possível listar as mensagens.' });
  }
});
app.post('/messages', async (request, response) => {
  const text = typeof request.body.text === 'string' ? request.body.text.trim() : '';
  if (!text) return response.status(400).json({ error: 'Envie um campo "text" não vazio.' });
  try {
    const result = await pool.query('INSERT INTO messages (text) VALUES ($1) RETURNING id, text, created_at', [text]);
    response.status(201).json(result.rows[0]);
  } catch {
    response.status(500).json({ error: 'Não foi possível gravar a mensagem.' });
  }
});

async function start() {
  for (let attempt = 1; attempt <= 20; attempt += 1) {
    try {
      await pool.query('CREATE TABLE IF NOT EXISTS messages (id SERIAL PRIMARY KEY, text TEXT NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW())');
      app.listen(port, '0.0.0.0', () => console.log(`API ouvindo na porta ${port}`));
      return;
    } catch (error) {
      console.log(`Aguardando PostgreSQL (${attempt}/20): ${error.message}`);
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }
  }
  process.exit(1);
}
start();
