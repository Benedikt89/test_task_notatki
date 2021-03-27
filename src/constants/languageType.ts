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
    header_profile: 'Profile',
    header_log_out: 'Log Out',
    header_tickets: 'Notes',

    ticket_page_header: 'Notes',

    ticket_edit_title: 'Edit Title',
    ticket_edit_content: 'Edit Content',
    ticket_edit_expire_time: 'Set Expire Time',
    ticket_edit_delete: 'Delete Item',
    ticket_edit_move: 'Move to another list',

    ticket_meta_expire_time: 'Expire time',
    ticket_meta_last_time: 'Last Time Edited ',

    add_ticket: 'Add new Note to List',
    log_in: 'Log in',
    register_now: 'Register now!',


    error_fetch: 'Something went wrong. Try again later.',
    error_login: 'Wrong password or login!',
    error_register: 'User with that email already exists',


  },
  pl: {
    ticket_page_header: 'Notatki',
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
  let res = key;
  if (hasOwnProperty(localeInterface, lang)) {
    language = localeInterface[lang];
  }
  if (hasOwnProperty(language, key)) {
    return language[key] as string;
  }
  return res;
};