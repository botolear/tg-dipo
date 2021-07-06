import { Context, MakeRequired } from '@botol/dipo';
import { TgClient } from '@botol/tg-client';
import '@botol/tg-methods';
import { SendMessageParams } from '@botol/tg-methods';
import { CallbackQuery, Chat, Message, Update, User } from '@botol/tg-types';
import { ExtraMarkup, Markup } from './markup/markup';
import { MessageText } from './types/message';
import { DeepReadonly } from './utils';

export class ContextTG extends Context {
    message?: DeepReadonly<Message>;
    callback_query?: DeepReadonly<CallbackQuery>;

    readonly chat?: DeepReadonly<Chat>;
    readonly callbackData?: string;
    readonly text?: string;
    readonly from?: User;

    constructor(public update: Update, public telegram: TgClient) {
        super();
        this.message = update.message;
        this.callback_query = update.callback_query;

        this.callbackData = this.callback_query?.data;
        this.text = update?.message?.text;

        this.chat = this.anyMessage?.chat;
        this.from = (
            update.callback_query ??
            update.inline_query ??
            update.chosen_inline_result ??
            this.anyMessage
        )?.from;
    }

    answerCbQuery(text?: string, showAlert?: boolean): Promise<true> {
        if (typeof this.callback_query === 'undefined') {
            throw new Error('Context "callback_query" property don\'t exists');
        }

        return this.telegram.answerCallbackQuery({
            callback_query_id: this.callback_query!.id,
            text,
            show_alert: showAlert,
        });
    }

    reply(text: string, markup?: Markup | ExtraMarkup): Promise<Message> {
        if (typeof this.chat === 'undefined') {
            throw new Error('Context "chat" property don\'t exists');
        }

        let params: SendMessageParams = { chat_id: this.chat!.id, text };

        if (typeof markup !== 'undefined') {
            if (markup instanceof Markup) {
                params.reply_markup = markup.markup.keyboard;
            } else {
                params.reply_markup = markup.keyboard;
            }
        }

        return this.telegram.sendMessage(params);
    }

    get anyMessage(): Message | undefined {
        return (
            this.update.message ??
            this.update.edited_message ??
            this.update.callback_query?.message ??
            this.update.channel_post ??
            this.update.edited_channel_post
        );
    }
}

export type ContextTGReply = MakeRequired<ContextTG, 'reply'>;
export type ContextTGMessage = MakeRequired<ContextTG, 'message'>;
export type ContextTGText = {
    message: MessageText;
} & MakeRequired<ContextTG, 'text'>;
export type ContextTGCallbackQuery = MakeRequired<ContextTG, 'callback_query'>;
export type ContextTGCallbackData = {
    callback_query: MakeRequired<CallbackQuery, 'data'>;
    callbackData: string;
} & ContextTG;
