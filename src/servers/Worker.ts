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
import { RabbitConnect } from './RabbitConnect';
import { Message, TelegramMessage, FailMessage } from '../interfaces';
import { ConsumeMessage } from 'amqplib';

export interface WorkerParams {
  maxRetry?: number; // Max number of retry repeat
  active: string; // Active queue name
  exchange: string; // Exchange name
  holdKey?: string; // Hold key name
}

export abstract class Worker<M extends TelegramMessage> extends RabbitConnect {
  private _maxRetry: number;
  private _active: string;
  private _holdKey: string | undefined;
  protected exchange: string;
  private _currentMessage: Message<M> | undefined;
  private _currentConsumeMessage: ConsumeMessage | null = null;
  constructor({ active, holdKey, exchange, maxRetry }: WorkerParams) {
    super();
    this._maxRetry = maxRetry || 0;
    this._active = active;
    this._holdKey = holdKey;
    this.exchange = exchange;
  }
  public async subscribe() {
    await this.connect();
    this.currentChanel?.consume(this._active, this.checkMessage.bind(this));
  }
  // Chech messages where exceeded limit of repeats
  private async checkMessage(message: ConsumeMessage | null) {
    this._currentConsumeMessage = message;
    if (message) {
      const telegramMessage: Message<M> = JSON.parse(message.content.toString());
      if (telegramMessage.retry >= this._maxRetry)
        await this.sendToErrorStorage('Exceed max retry limit');

      this._currentMessage = telegramMessage;
      // If number of repeat limit not exceeded
      await this.handler(telegramMessage.telegramMessage || telegramMessage);
    }
  }
  // Send message to error storage
  protected async sendToErrorStorage(error: string) {
    if (this._currentMessage) {
      const message: FailMessage = {
        telegramMessage: this._currentMessage.telegramMessage,
        errors: [...this._currentMessage.errors, error],
        retry: this._currentMessage.retry + 1,
        exchange: this.exchange,
        routingKey: this._active
      };
      console.log('Send message to error storage', message);
      this.ack();
    }
  }
  // Send message to hold queue
  protected async hold(error: string) {
    if (!this._holdKey)
      return;

    if (this._currentMessage) {
      const telegramMessage: Message<M> = {
        telegramMessage: this._currentMessage.telegramMessage,
        errors: [...this._currentMessage.errors, error],
        retry: this._currentMessage.retry + 1,
      };
      const telegramData = Buffer.from(JSON.stringify(telegramMessage));
      return this.currentChanel?.publish(this.exchange, this._holdKey, telegramData);
    }
    return;
  }
  // Approve correct delivery
  protected async ack() {
    try {
      if (this._currentConsumeMessage)
        // console.log('this._currentConsumeMessage', this._currentConsumeMessage.fields.exchange, this._currentConsumeMessage.fields.deliveryTag);
        return this.currentChanel?.ack(this._currentConsumeMessage);

    } catch (err) {
      console.log(err);
    }
  }
  protected abstract handler(message: M): void;
}
