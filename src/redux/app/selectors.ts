import {AppStateType} from "../store";

export const selectFetchingByKey = (state: AppStateType, key: string): boolean =>
  !!state.app.isFetching[key];
export const selectErrorByKey = (state: AppStateType, key: string): null | { message: string } =>
  state.app.error[key] ? state.app.error[key] : null;
