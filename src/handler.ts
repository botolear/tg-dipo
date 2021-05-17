import { Handler } from '@botol/dipo';
import { ContextTG } from './context';

export type HandlerTG<T extends ContextTG = ContextTG> = Handler<T>;
