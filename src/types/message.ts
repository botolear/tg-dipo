import { MakeRequired } from '@botol/dipo';
import { Message } from '@botol/tg-types';

export type MessageText = MakeRequired<Message, 'text' | 'entities'>;
