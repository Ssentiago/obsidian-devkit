import { LocaleSchema } from '../locale/_types/interfaces';

export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
export type PartialLocale = DeepPartial<LocaleSchema>;
