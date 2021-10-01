# telegram-bot-carrier

This is the service which helps send some messages to activate tinkoff api
Service use RabbitMq to get and send messages.
Need to set channel which get information messages and bot token which will get commands from the user

## .env

BOT_TOKEN bot token from telegram
CHANNEL_NAME channel name where message will be send `@name_channel`
RABBIT_MQ_URL url for rabbitmq server where contains messages
