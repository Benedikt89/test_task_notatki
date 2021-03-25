import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import appReducer from "./app/reducer";
import {I_appActions} from "./app/actions";
import ticketsReducer from "./tickets/reducer";
import {I_ticketsActions} from "./tickets/actions";

const rootReducer = combineReducers({
  app: appReducer,
  tickets: ticketsReducer,
});

export type AppStateType = ReturnType<typeof rootReducer>;
export type AppActionsType = I_appActions | I_ticketsActions;

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type GetStateType = () => AppStateType

export default store;