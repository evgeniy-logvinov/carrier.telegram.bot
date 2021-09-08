// Require our Telegram helper package
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(process.env.BOT_TOKEN);

// Export as an asynchronous function
// We'll wait until we've responded to the user
module.exports = async (request, response) => {
    try {
        console.log('test string');
        // Create our new bot handler with the token
        // that the Botfather gave us
        // Use an environment variable so we don't expose it in our code

        // Send our new message back in Markdown and
        // wait for the request to finish
        console.log('channel name', process.env.CHANNEL_NAME);
        await bot.sendMessage(process.env.CHANNEL_NAME, 'ticker up');
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
// curl -X POST https://api.telegram.org/bot1992554316:AAEHK6OU7lPf2IuY2tvQr_0s-FXbb8lclIo/setWebhook -H "Content-type: application/json" -d '{"url": "https://telegram-bot-carrier-8chkwz0it-carrier.vercel.app/api"}'

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