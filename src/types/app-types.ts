import {LanguageType} from "../constants/languageType";

export interface I_appState {
    isFetching: {[key: string]: boolean},
    error: {[key: string]: {message: string}}
    language: LanguageType
}