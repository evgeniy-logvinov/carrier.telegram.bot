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
import { SendMessageOptions } from 'node-telegram-bot-api';
import { TelegramBotApi } from './TelegramBotApi';

export class TelegramUserSender {
  private keyboard = [
    [
      {
        text: 'Хочу кота', // текст на кнопке
        callback_data: 'moreKeks' // данные для обработчика событий
      }
    ],
    [
      {
        text: 'Хочу песика',
        callback_data: 'morePes'
      }
    ],
    [
      {
        text: 'Хочу проходить курсы',
        url: 'https://htmlacademy.ru/courses' // внешняя ссылка
      }
    ]
  ];

  async startListening() {
    // Matches "/echo [whatever]"
    // TelegramBotApi.getInstance().onText(/\/photo/, function onPhotoText(msg) {
    TelegramBotApi.getInstance().onText(/\/echo (.+)/, (msg, match) => {
      // TelegramBotApi.getInstance().onText(/\/echo (.+)/, (msg, match) => {
      // 'msg' is the received Message from Telegram
      // 'match' is the result of executing the regexp above on the text content
      // of the message
      if (match) {
        const chatId = msg.chat.id;
        const resp = match[1]; // the captured "whatever"

        // send back the matched "whatever" to the chat
        TelegramBotApi.getInstance().sendMessage(chatId, resp);
      }
    });

    TelegramBotApi.getInstance().onText(/\/watch (.+)/, (msg, match) => {
      if (match) {
        console.log(match);
        const messages: string[] = match[1].split(' ');
        // const chatId = msg.chat.id;
        const ticker = messages[0]; // the captured "whatever"
        const time = messages[1]; // the captured "whatever"
        if (time === 'now') {
          console.log('tickerName', ticker);
          console.log('time', time);
        }
        // send back the matched "whatever" to the chat
        // TelegramBotApi.getInstance().sendMessage(chatId, resp);
      }

      const opts: SendMessageOptions = {
        reply_to_message_id: msg.message_id,
        reply_markup: {
          keyboard: [
            [{text: 'Yes, you are the bot of my life ❤'}],
            [{text: 'No, sorry there is another one...'}],
          ]
        }
      };
      TelegramBotApi.getInstance().sendMessage(msg.chat.id, 'Do you love me?', opts);
    });

    // Listen for any kind of message. There are different kinds of
    // messages.
    // TelegramBotApi.getInstance().on('message', msg => {
    //   const chatId = msg.chat.id; // получаем идентификатор диалога, чтобы отвечать именно тому пользователю, который нам что-то прислал
    //   console.log(msg);
    //   // отправляем сообщение
    //   TelegramBotApi.getInstance().sendMessage(chatId, 'Привет, Друг! чего хочешь?', { // прикрутим клаву
    //     reply_markup: {
    //       inline_keyboard: this.keyboard
    //     }
    //   });
    //   // const chatId = msg.chat.id;

    //   // // send a message to the chat acknowledging receipt of their message
    //   // TelegramBotApi.getInstance().sendMessage(chatId, 'Received your message');
    // });

    // TelegramBotApi.getInstance().on('callback_query', query => {
    //   console.log(query);
    //   const action = query.data;
    //   const msg: any = query.message;
    //   const opts = {
    //     chat_id: msg.chat.id,
    //     message_id: msg.message_id,
    //   };
    //   let text = 'Default value';

    //   if (action === 'edit')
    //     text = 'Edited Text';


    //   TelegramBotApi.getInstance().editMessageText(text, opts);
    //   // const chatId = query?.message?.chat.id;
    //   // console.log('chatId', chatId);
    //   // let img = '';
    //   // if (!chatId)
    //   //   return;

    //   // if (query.data === 'moreKeks') { // если кот
    //   //   img = 'keks.png';
    //   // }

    //   // if (query.data === 'morePes') { // если пёс
    //   //   img = 'pes.png';
    //   // }

    //   // TelegramBotApi.getInstance().sendMessage(chatId, 'Непонятно, давай попробуем ещё раз?', {
    //   //   // прикрутим клаву
    //   //   reply_markup: {
    //   //     inline_keyboard: this.keyboard
    //   //   }
    //   // });

    //   // if (img) {
    //   //   TelegramBotApi.getInstance().sendPhoto(chatId, img, { // прикрутим клаву
    //   //     reply_markup: {
    //   //       inline_keyboard: this.keyboard
    //   //     }
    //   //   });
    //   // } else {
    //   //   TelegramBotApi.getInstance().sendMessage(chatId, 'Непонятно, давай попробуем ещё раз?', {
    //   //     // прикрутим клаву
    //   //     reply_markup: {
    //   //       inline_keyboard: this.keyboard
    //   //     }
    //   //   });
    //   // }
    // });
  }
}
