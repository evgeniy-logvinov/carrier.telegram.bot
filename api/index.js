// require('dotenv').config();
// const app = require('express')();
// const { v4 } = require('uuid');
// const TelegramBot = require('node-telegram-bot-api');

// // replace the value below with the Telegram token you receive from @BotFather
// const token = process.env.BOT_TOKEN;

// // Create a bot that uses 'polling' to fetch new updates
// const bot = new TelegramBot(token, {polling: true});

// console.log('test');

// // Matches "/echo [whatever]"
// bot.onText(/\/echo (.+)/, (msg, match) => {
//   // 'msg' is the received Message from Telegram
//   // 'match' is the result of executing the regexp above on the text content
//   // of the message

//   const chatId = msg.chat.id;
//   const resp = match[1]; // the captured "whatever"

//   // send back the matched "whatever" to the chat
//   bot.sendMessage(chatId, resp);
// });

// // Listen for any kind of message. There are different kinds of
// // messages.
// bot.on('message', (msg) => {
//   console.log('message');
//   const chatId = msg.chat.id;

//   // send a message to the chat acknowledging receipt of their message
//   bot.sendMessage(chatId, 'Received your message check');
// });

// // bot.command('start', ctx => {
// //     console.log(ctx.from)
// //     bot.telegram.sendMessage(ctx.chat.id, 'hello there! Welcome to my new telegram bot.', {})
// // })

// app.get('/api', (req, res) => {
//   const path = `/api/item/${v4()}`;
//   res.setHeader('Content-Type', 'text/html');
//   res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
//   res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
// });

// app.get('/api/item/:slug', (req, res) => {
//   const { slug } = req.params;
//   res.end(`Item: ${slug}`);
// });

// app.listen(process.env.PORT || 8080);

// module.exports = app;
// https://github.com/yagop/node-telegram-bot-api/issues/319#issuecomment-324963294
// Fixes an error with Promise cancellation
process.env.NTBA_FIX_319 = 'test';

// Require our Telegram helper package
const TelegramBot = require('node-telegram-bot-api');

// Export as an asynchronous function
// We'll wait until we've responded to the user
module.exports = async (request, response) => {
    try {
        console.log('test string');
        // Create our new bot handler with the token
        // that the Botfather gave us
        // Use an environment variable so we don't expose it in our code
        const bot = new TelegramBot(process.env.BOT_TOKEN);

        // Retrieve the POST request body that gets sent from Telegram
        const { body } = request;
        console.log(body, process.env.BOT_TOKEN);
        // Ensure that this is a message being sent
        if (body && body.message) {
            // Retrieve the ID for this chat
            // and the text that the user sent
            const { chat: { id }, text } = body.message;

            // Create a message to send back
            // We can use Markdown inside this
            const message = `✅ Thanks for your message: *"${text}"*\nHave a great day! 👋🏻`;

            // Send our new message back in Markdown and
            // wait for the request to finish
            await bot.sendMessage(id, message, {parse_mode: 'Markdown'});
            await bot.sendMessage(id, 'message', {parse_mode: 'Markdown'});
        }
    }
    catch(error) {
        // If there was an error sending our message then we 
        // can log it into the Vercel console
        console.error('Error sending message');
        console.log(error.toString());
    }
    
    // Acknowledge the message with Telegram
    // by sending a 200 HTTP status code
    // The message here doesn't matter.
    response.send('OK');
};

// // Export as an asynchronous function
// // We'll wait until we've responded to the user
// module.exports = async (request, response) => {
//     try {
//         // Create our new bot handler with the token
//         // that the Botfather gave us
//         // Use an environment variable so we don't expose it in our code
//         const token = process.env.BOT_TOKEN;
//         const bot = new TelegramBot(token, {polling: true});

//         // Retrieve the POST request body that gets sent from Telegram
//         const { body } = request;

//         // Ensure that this is a message being sent
//         if (body.message) {
//             // Retrieve the ID for this chat
//             // and the text that the user sent
//             const { chat: { id }, text } = body.message;

//             // Create a message to send back
//             // We can use Markdown inside this
//             const message = `✅ Thanks for your message: *"${text}"*\nHave a great day! 👋🏻`;

//             // Send our new message back in Markdown
//             await bot.sendMessage(id, message, {parse_mode: 'Markdown'});
//         }
//     }
//     catch(error) {
//         // If there was an error sending our message then we 
//         // can log it into the Vercel console
//         console.error('Error sending message');
//         console.log(error.toString());
//     }
    
//     // Acknowledge the message with Telegram
//     // by sending a 200 HTTP status code
//     response.send('OK');
// };