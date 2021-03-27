import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import appReducer from "./app/reducer";
import {I_appActions} from "./app/actions";
import dataReducer from "./data/reducer";
import {I_dataActions} from "./data/actions";

const rootReducer = combineReducers({
  app: appReducer,
  data: dataReducer,
});

export type AppStateType = ReturnType<typeof rootReducer>;
export type AppActionsType = I_appActions | I_dataActions;

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type GetStateType = () => AppStateType

export default store;