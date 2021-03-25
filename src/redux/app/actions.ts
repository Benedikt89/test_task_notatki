import {ThunkDispatch} from "redux-thunk";
import {AppActionsType, GetStateType} from "../store";

export const appActionTypes:{
    SET_IS_FETCHING: 'app/SET_IS_FETCHING'
    SET_ERROR: 'app/SET_ERROR'
} = {
    SET_IS_FETCHING: 'app/SET_IS_FETCHING',
    SET_ERROR: 'app/SET_ERROR'
};

export type I_appActions =
    I_setFetching | I_setError

//interfaces
interface I_setFetching {
    type: typeof appActionTypes.SET_IS_FETCHING,
    key: string
    status: boolean
}

interface I_setError {
    type: typeof appActionTypes.SET_ERROR,
    key: string
    message: null | string
}




//Internal ACTIONS CREATORS
export const _setFetching = (key: string, status: boolean): I_setFetching =>
    ({ type: appActionTypes.SET_IS_FETCHING, key, status});

export const _setError = ( key: string, message: string | null): I_setError =>
    ({ type: appActionTypes.SET_ERROR, key, message});

//EXTERNAL ACTIONS
export const fetchAll = () =>
    async (dispatch: ThunkDispatch<{}, {}, AppActionsType>) => {
        setTimeout(async () => {
                await Promise.all([dispatch(fetchData())]);
            dispatch(_setError('fetchAll',null));
        }, 1000)
    };


//API ACTIONS
export const fetchData = () =>
    async (dispatch: ThunkDispatch<{}, {}, I_appActions>) => {
        try {
            dispatch(_setFetching('fetchData', true));
            await new Promise((resolve)=>{resolve('asd')});
            dispatch(_setFetching('fetchData', false));
        } catch (err) {
            console.log(err);
            //if its no data return
            if (err.response && err.response.config.url === "api.user.getstate" && err.response.status === 403) {
                dispatch(_setFetching('fetchData', false));
                dispatch(_setError('fetchData',null));
            } else {
                dispatch(_setError('fetchData','network Problems'));
                dispatch(_setFetching('fetchData', false));
            }
        }
    };