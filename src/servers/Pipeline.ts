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
// import amqp from 'amqplib/callback_api';
import { RabbitConnect } from './RabbitConnect';
import { PipelineConfig } from '../interfaces';
import { Types } from '../constants';

export class Pipeline extends RabbitConnect {

  private _pipeline: PipelineConfig;

  constructor(pipelineConfig: PipelineConfig) {
    super();
    this._pipeline = pipelineConfig;
  }
  public async create() {
    try {
      await this.connect();

      const createQueues = this._pipeline.queues.map(queue =>
        this.currentChanel?.assertQueue(queue.name, queue.options),
      ) as PromiseLike<any>[];
      const createExchanges = this._pipeline.exchanges.map(exchange =>
        this.currentChanel?.assertExchange(exchange.name, exchange.type),
      ) as PromiseLike<any>[];

      await Promise.all([...createQueues, ...createExchanges]);
      const createBindings = this._pipeline.bindings.map(binding => {
        if (binding.type === Types.QUEUE)
          return this.currentChanel?.bindQueue(binding.destination, binding.source, binding.routingKey);

        return this.currentChanel?.bindExchange(binding.destination, binding.source, binding.routingKey);
      });

      await Promise.all(createBindings);
      return this.disconnect();
    } catch (error) {
      console.error(error);
      throw new Error(error as any);
    }
  }
}
