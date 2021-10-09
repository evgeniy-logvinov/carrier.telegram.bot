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
import { Worker } from '../servers/Worker';
import { TelegramMessage } from '../interfaces';
import { TelegramSender } from '../servers/TelegramSender';

export class SendToTelegramChannel extends Worker<TelegramMessage> {
  constructor() {
    super({
      active: 'sendToTelegramChannel',
      exchange: 'notify',
      holdKey: 'sendToTelegramChannelHold',
      maxRetry: process.env.MAX_RETRY ? parseInt(process.env.MAX_RETRY, 10) : 5,
    });
  }
  protected async handler(message: TelegramMessage) {
    try {
      console.log('Sending to telegram: ', message.message, ' channelName: ', message.channelName);
      const telegramBot = new TelegramSender();
      await telegramBot.sendMessageToChannel(message.channelName, message.message);
      await this.ack();
    } catch (error) {
      console.error(error);
      await this.hold(error as any);
    }
  }
}
