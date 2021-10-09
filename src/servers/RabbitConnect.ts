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
import { Channel, connect, Connection } from 'amqplib';

export class RabbitConnect {
  private uri: string;
  private connection: Connection | undefined;
  private chanel: Channel | undefined;

  constructor() {
    this.uri = process.env.RABBIT_MQ_URL || 'amqp://localhost';
  }

  protected async connect() {
    this.connection = await connect(this.uri);
    this.chanel = await this.connection.createChannel();
  }

  protected async disconnect() {
    await this.chanel?.close();
    return this.connection?.close();
  }

  get currentChanel() {
    return this.chanel;
  }
}
