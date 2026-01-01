import dotenv from 'dotenv';
import { Telegraf, Markup } from 'telegraf';

dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN;
const WEBAPP_URL = process.env.WEBAPP_URL;

if (!BOT_TOKEN) {
  throw new Error('BOT_TOKEN .env faylida topilmadi (v2)');
}

const bot = new Telegraf(BOT_TOKEN);

// Oddiy start: WebApp tugmasi bilan
bot.start((ctx) => {
  if (!WEBAPP_URL) {
    return ctx.reply('v2 bot ishga tushdi! WEBAPP_URL .env faylida topilmadi.');
  }

  return ctx.reply(
    'v2 bot ishga tushdi! WebAppni shu tugma orqali oching.',
    Markup.keyboard([[Markup.button.webApp('🧩 WebApp v2', WEBAPP_URL)]]).resize()
  );
});

// Test: matn yuborilganda qaytarib beradi
bot.on('text', (ctx) => {
  const text = ctx.message.text;
  if (text === '/ping') {
    return ctx.reply('pong');
  }
  return ctx.reply(`Siz yozdingiz: ${text}`);
});

// Test: WebApp dan kelgan ma'lumot
bot.on('message', (ctx, next) => {
  const webAppData = ctx.message && ctx.message.web_app_data;
  if (webAppData && webAppData.data) {
    console.log('v2 WEB_APP_DATA:', webAppData.data);
    return ctx.reply('v2 web_app_data keldi');
  }
  return next();
});

export default bot;
