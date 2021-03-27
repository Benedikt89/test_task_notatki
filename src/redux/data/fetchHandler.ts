import {AppActionsType, GetStateType} from "../store";
import {ThunkDispatch} from "redux-thunk";
import {selectFetchingByKey} from "../app/selectors";
import {batch} from "react-redux";
import {_setError, _setFetching} from "../app/actions";
import {message} from "antd";

export function fetchHandler(key: string, callback: (
  dispatch: ThunkDispatch<{}, {}, AppActionsType>,
  getState: GetStateType,
  ) => Promise<boolean | undefined>) {
  return async function (dispatch: ThunkDispatch<{}, {}, AppActionsType>, getState: GetStateType) {
    try {
      const loading = selectFetchingByKey(getState(), key);
      if (!loading) {
        batch(() => {
          dispatch(_setError(key, null));
          dispatch(_setFetching(key, true));
        });
        const response = await callback(dispatch, getState);
        batch(() => {
          dispatch(_setFetching(key, false));
          if (!response) {
            dispatch(_setError(key, 'Nothing Found'));
          }
        });
      }
    } catch (e) {
      console.log(e);
      const content = e.data?.message ? e.data?.message : 'Something went wrong. Try again later.';
      message.error(content);
      batch(() => {
        dispatch(_setError(key, content));
        dispatch(_setFetching(key, false));
      });
    }
  };
}
