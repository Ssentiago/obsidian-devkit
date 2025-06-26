import { LocaleSchema } from './locale/_types/interfaces';
import { localeProxy } from './proxy/locale-proxy';

export const t = localeProxy<LocaleSchema>();
