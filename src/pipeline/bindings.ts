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
import { Types } from '../constants';

export default [
  {
    type: Types.EXCHANGE,
    destination: 'notify',
    source: 'main',
    routingKey: '#.notify.#',
  },
  // {
  //   type: Types.EXCHANGE,
  //   destination: 'integrates',
  //   source: 'main',
  //   routingKey: '#.integrates.#',
  // },
  {
    type: Types.QUEUE,
    destination: 'generateRoutingKey',
    source: 'main',
    routingKey: 'generateRoutingKey',
  },
  {
    type: Types.QUEUE,
    destination: 'sendToTelegramChannel',
    source: 'notify',
    routingKey: '#.sendToTelegramChannel.#',
  },
  {
    type: Types.QUEUE,
    destination: 'sendToTelegramChannelHold',
    source: 'notify',
    routingKey: 'sendToTelegramChannelHold',
  },
];
