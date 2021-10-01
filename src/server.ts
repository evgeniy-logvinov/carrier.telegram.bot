// Require our Telegram helper package
require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const botToken = process.env.BOT_TOKEN;
const bot = new TelegramBot(botToken);

const a = async (id: string, text: string) => {
    try {
        console.log('id', id, 'message', text);
        if (text) {
            const message = `✅ Thanks for your message: *"${text}"*\nHave a great day! 👋🏻`;
            await bot.sendMessage(id, message, {parse_mode: 'Markdown'});
        }
    }
    catch(error) {
        // If there was an error sending our message then we
        // can log it into the Vercel console
        console.error('Error sending message');
        console.log(error);
    }
}

console.log('botToken', botToken);

if (botToken) {
    a(process.env.CHANNEL_NAME || '', 'Hello world');
} else {
    console.log('token is empty');
}

