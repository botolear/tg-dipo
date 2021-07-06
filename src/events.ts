import { CreateEvent } from '@botol/dipo';
import {
    ContextTG,
    ContextTGCallbackData,
    ContextTGCallbackQuery,
    ContextTGMessage,
    ContextTGText,
} from './context';

export const DefaultEvents = {
    text: CreateEvent<ContextTGText, ContextTG>((handler) => (ctx, next) => {
        if (typeof ctx.text !== 'undefined') {
            return handler(ctx as ContextTGText, next);
        }
        return next();
    }),
    message: CreateEvent<ContextTGMessage, ContextTG>(
        (handler) => (ctx, next) => {
            if (typeof ctx.message !== 'undefined') {
                return handler(ctx as ContextTGMessage, next);
            }
            return next();
        },
    ),
    callback_query: CreateEvent<ContextTGCallbackQuery, ContextTG>(
        (handler) => (ctx, next) => {
            if (typeof ctx.callback_query !== 'undefined') {
                return handler(ctx as ContextTGCallbackQuery, next);
            }
            return next();
        },
    ),
    callback_data: CreateEvent<ContextTGCallbackData, ContextTG>(
        (handler) => (ctx, next) => {
            if (typeof ctx.callback_query?.data !== 'undefined') {
                return handler(ctx as ContextTGCallbackData, next);
            }
            return next();
        },
    ),
};
