import {hasOwnProperty} from "../types/typeHelpers";

type Locale = 'eng' | 'pl' | 'rus'
type LocaleObject = {
  [key in Locale]: {
    [key: string]: string | string[]
  }
}

const localeInterface:LocaleObject = {
  eng: {
    header_users: 'Users',
    header_tickets: 'Tickets'
  },
  pl: {

  },
  rus: {
    header_users: 'Пользователи',
    header_stars: 'Заметки'
  }
};

export const getLocale = (lang: Locale, key: string): string | string[] => {
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