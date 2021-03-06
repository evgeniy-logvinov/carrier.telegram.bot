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
import { TelegramBotApi } from './TelegramBotApi';

export class TelegramChannelSender {
  static async sendMessageToChannel(channelName: string, message: string): Promise<void> {
    const formattedMessage = `✅ Thanks for your message: *"${message}"*\nHave a great day! 👋🏻`;
    await TelegramBotApi.getInstance().sendMessage(channelName, formattedMessage, {parse_mode: 'Markdown'});
  }
}
