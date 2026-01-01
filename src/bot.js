import dotenv from 'dotenv';
import { Telegraf } from 'telegraf';

dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN;

if (!BOT_TOKEN) {
  throw new Error('BOT_TOKEN .env faylida topilmadi (v2)');
}

const bot = new Telegraf(BOT_TOKEN);

// Oddiy start
bot.start((ctx) => ctx.reply('v2 bot ishga tushdi!'));

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
