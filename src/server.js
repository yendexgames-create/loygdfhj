import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import bot from './bot.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Static WebApp fayllari
app.use(express.static(path.join(__dirname, '../public')));

app.get('/health', (req, res) => {
  res.json({ ok: true, version: 'v2' });
});

app.listen(PORT, () => {
  console.log(`HTTP server v2 ishga tushdi: http://localhost:${PORT}`);
});

// Botni polling bilan ishga tushiramiz
bot.launch().then(() => {
  console.log('v2 Bot polling bilan ishlayapti');
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
