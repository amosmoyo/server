import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducers } from "./auth/authReducer";
import * as Types from "../constants/types";

const persistConfig = {
  // configuration object for redux-persist
  key: "root",
  storage, // define which storage to use
  blacklist: ["authReducers"],
};

const authPersistConfig = {
  key: "authReducers",
  storage,
  whitelist: ["isLogged", "user"],
};

const combinedReducers = combineReducers({
  authReducers: persistReducer(authPersistConfig, authReducers),
  // auth_reducer
});

const rootReducer1 = (state, action) => {
  if (action.type === Types.LOGOUT_PROFILE_SUCCESS) {
    storage.removeItem("persist:authReducers");
    return combinedReducers(undefined, action);
  }

  return combinedReducers(state, action);
};

export const rootReducer = persistReducer(persistConfig, rootReducer1);
