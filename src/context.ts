import { Context, MakeRequired } from '@botol/dipo';
import { CallbackQuery, Message, Update } from '@botol/tg-types';
import { MessageText } from './types/message';

export class ContextTG extends Context {
    message?: Message;
    callback_query?: CallbackQuery;

    text?: string;

    constructor(public update: Update) {
        super();
        this.message = update.message;
        this.callback_query = update.callback_query;

        this.text = update.message?.text;
    }
}

export type ContextTGMessage = MakeRequired<ContextTG, 'message'>;
export type ContextTGText = { message: MessageText } & MakeRequired<
    ContextTG,
    'text'
>;