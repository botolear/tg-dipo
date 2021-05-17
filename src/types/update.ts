import { Update } from '@botol/tg-types';
import { MessageText } from './message';

export type UpdateMessageText = { message: MessageText } & Update;
