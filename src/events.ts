import { CreateEvent } from '@botol/dipo';
import { ContextTG, ContextTGText } from './context';

export const DefaultEvents = {
    text: CreateEvent<ContextTGText, ContextTG>((handler) => (ctx, next) => {
        if ('text' in ctx) {
            return handler(ctx as ContextTGText, next);
        }
        return next();
    }),
};
