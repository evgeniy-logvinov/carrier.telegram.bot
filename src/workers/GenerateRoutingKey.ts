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
import {
  Message,
  TelegramMessage,
} from '../interfaces';
import { Keys } from '../constants';

export class GenerateRoutingKey extends Worker<TelegramMessage> {
  constructor() {
    super({
      active: 'generateRoutingKey',
      exchange: 'mainexchange',
    });
  }
  protected async handler(telegramMessage: TelegramMessage) {
    try {
      const routingKey: string[] = [];
      routingKey.push(Keys.SEND_TO_TELEGRAM_CHANNEL);
      // if (isOrderWithPhone(telegramMessage))
      //   routingKey.push(Keys.SEND_SMS);

      // if (isOrderWithDeliveryAddress(order))
      //   routingKey.push(Keys.SEND_TO_DELIVERY);
      const message: Message<TelegramMessage> = {
        retry: 0,
        errors: [],
        telegramMessage: telegramMessage,
      };
      await this.currentChanel?.publish(
          this.exchange,
          routingKey.join('.'),
          Buffer.from(JSON.stringify(message)),
      );
      await this.ack();
    } catch (error) {
      console.error(error);
      await this.sendToErrorStorage(error as any);
    }
  }
}
