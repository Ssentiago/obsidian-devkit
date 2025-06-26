import { moment } from 'obsidian';

import { LocaleSchema } from './locale/_types/interfaces';
import en from './locale/en';
import { PartialLocale } from './types/definitions';

export const locales = {
    en,
} as const;

function initLocale() {
    const lang =
        (moment.locale() as keyof typeof locales) in locales
            ? (moment.locale() as keyof typeof locales)
            : 'en';

    return locales[lang];
}
export const currentLocale: LocaleSchema | PartialLocale = initLocale();
