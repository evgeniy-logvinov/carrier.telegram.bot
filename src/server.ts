/**
 * Copyright (c) evgeniy.logvinov.k
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Require our Telegram helper package
require('dotenv').config();
import { Pipeline } from './servers/Pipeline';
import { pipelineConfig } from './pipeline';
import { GenerateRoutingKey } from './workers/GenerateRoutingKey';
import { SendToTelegramChannel } from './workers/SendToTelegramChannel';
import amqp from 'amqplib/callback_api';
import { TelegramMessage } from './interfaces';

const send = () => {
  const rabbitMQURL = process.env.RABBIT_MQ_URL;

  if (rabbitMQURL) {
    amqp.connect(rabbitMQURL, function(error0: any, connection: any) {
      if (error0)
        throw error0;

      // connection.createChannel(function(error1: any, channel: any) {
      //   if (error1)
      //     throw error1;


      //   const queue = 'sendSms';
      //   const msg = 'Hello World!';

      //   channel.assertQueue(queue, {
      //     durable: true
      //   });
      //   channel.sendToQueue(queue, Buffer.from(msg));

      //   console.log(' [x] Sent %s', msg);
      // });
      connection.createChannel(function(error1: any, channel: any) {
        if (error1)
          throw error1;

        // const exchange = 'notify';
        const exchange = 'mainexchange';
        // const args = process.argv.slice(2);
        // const key = (args.length > 0) ? args[0] : 'sendToTelegram';
        // const key = (args.length > 0) ? args[0] : 'sendToTelegram';
        // const key = (args.length > 0) ? args[0] : 'anonymous.info';
        // const msg = args.slice(1).join(' ') || 'Hello World2!';
        const channelName = process.env.CHANNEL_NAME;
        if (channelName) {
          const telegramMessage: TelegramMessage = {
            channelName: process.env.CHANNEL_NAME || '',
            content: 'Data',
            message: 'Message'
          };
          // channel.assertExchange(exchange, 'topic', {
          //   durable: false
          // });
          channel.publish(exchange, 'generateRoutingKey', Buffer.from(JSON.stringify(JSON.parse(JSON.stringify(telegramMessage)))));
          console.log(" [x] Sent %s:'%s'", 'generateRoutingKey', telegramMessage);
        } else {
          console.log('Channel name is empty.');
        }
      });
      // setTimeout(function() {
      //   connection.close();
      //   process.exit(0);
      // }, 500);
    });
  }

};

(async () => {
  try {
    const pipeline = new Pipeline(pipelineConfig);
    const generateRoutingKey = new GenerateRoutingKey();
    const sendToTelegramChannel = new SendToTelegramChannel();
    send();
    await pipeline.create();
    await Promise.all([generateRoutingKey.subscribe(), sendToTelegramChannel.subscribe()]);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
