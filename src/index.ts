import { Dipo, ExtractContexts } from '@botol/dipo';
import { ContextTG } from './context';
import { DefaultEvents } from './events';

export * from './context';
export * from './events';
export * from './handler';
export * from './markup/markup';

export class DipoTG<
    E extends ExtractContexts<typeof DefaultEvents> = ExtractContexts<typeof DefaultEvents>,
    D extends ContextTG = ContextTG,
> extends Dipo<E, D> {}
