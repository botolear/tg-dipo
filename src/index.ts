import { Dipo, ExtractContexts } from '@botol/dipo';
import { ContextTG } from './context';
import { DefaultEvents } from './events';

export * from './context';
export * from './handler';

export class DipoTG<
    E extends { [key: string]: ContextTG },
    D extends ContextTG,
> extends Dipo<E, D> {}