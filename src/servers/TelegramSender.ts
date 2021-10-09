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
// @ts-ignore
process.env.NTBA_FIX_319 = 1;

import TelegramBot from 'node-telegram-bot-api';

export class TelegramSender {
  bot: any = '';

  constructor() {
    const botToken = process.env.BOT_TOKEN;

    if (botToken)
      this.bot = new TelegramBot(botToken);
    else
      throw new Error('Token is empty');
  }

  async sendMessageToChannel(channelName: string, message: string): Promise<void> {
    // const message = `✅ Thanks for your message: *"${text}"*\nHave a great day! 👋🏻`;
    await this.bot.sendMessage(channelName, message, {parse_mode: 'Markdown'});
  }
}
