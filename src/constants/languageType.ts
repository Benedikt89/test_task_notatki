import {hasOwnProperty} from "../types/typeHelpers";

export type LanguageType = 'eng' | 'pl' | 'rus'
type LocaleObject = {
  [key in LanguageType]: {
    [key: string]: string
  }
}

/* ====================
   locale variables (later can be fetched from API)
 ==================== */

const localeInterface:LocaleObject = {
  eng: {
    time_format: 'MM-DD-YYYY, HH:mm',
    header_users: 'Users',
    header_tickets: 'Tickets',
    add_ticket: 'Add new Note to List'
  },
  pl: {
    time_format: 'MM-DD-YYYY, HH:mm',
  },
  rus: {
    time_format: 'YYYY-MM-DD, HH:mm',
    header_users: 'Пользователи',
    header_stars: 'Заметки'
  }
};

export const getLocale = (lang: LanguageType, key: string): string => {
  let language = localeInterface.eng;
  let res = '';
  if (hasOwnProperty(localeInterface, lang)) {
    language = localeInterface[lang];
  }
  if (hasOwnProperty(language, key)) {
    return language[key] as string;
  }
  return res;
};