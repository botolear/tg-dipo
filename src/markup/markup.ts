import {
    InlineKeyboardMarkup,
    ReplyKeyboardMarkup,
    ReplyKeyboardRemove,
    ForceReply,
    KeyboardButton,
    InlineKeyboardButton,
} from '@botol/tg-types';

export type ExtraMarkup = {
    keyboard?:
        | InlineKeyboardMarkup
        | ReplyKeyboardMarkup
        | ReplyKeyboardRemove
        | ForceReply;
};

type keyboard = string[][] | string[] | KeyboardButton[][];
type inlineKeyboard = InlineKeyboardButton[] | InlineKeyboardButton[][];

export class Markup {
    markup: ExtraMarkup = {};

    static inlineKeyboard(keyboard: inlineKeyboard): Markup {
        let result = new Markup();
        result.markup.keyboard = {
            inline_keyboard: Array.isArray(keyboard[0])
                ? (keyboard as InlineKeyboardButton[][])
                : [keyboard as InlineKeyboardButton[]],
        };
        return result;
    }
    
    inlineKeyboard(keyboard: inlineKeyboard): Markup {
        this.markup.keyboard = {
            inline_keyboard: Array.isArray(keyboard[0])
                ? (keyboard as InlineKeyboardButton[][])
                : [keyboard as InlineKeyboardButton[]],
        };
        return this;
    }

    static keyboard(keyboard: keyboard): Markup {
        let result = new Markup();
        result.markup.keyboard = this.transformKeyboard(keyboard);
        return result;
    }

    keyboard(keyboard: keyboard): Markup {
        this.markup.keyboard = Markup.transformKeyboard(keyboard);
        return this;
    }

    private static transformKeyboard(keyboard: keyboard): ReplyKeyboardMarkup {
        if (Array.isArray(keyboard[0])) {
            if (typeof keyboard[0] === 'string') {
                return {
                    keyboard: (keyboard as string[][]).map<KeyboardButton[]>(
                        (row: string[]) =>
                            row.map<KeyboardButton>((text: string) => ({
                                text,
                            })),
                    ),
                };
            }
            return { keyboard: keyboard as KeyboardButton[][] };
        }
        return {
            keyboard: [
                (keyboard as string[]).map<KeyboardButton>((text: string) => ({
                    text,
                })),
            ],
        };
    }
}
