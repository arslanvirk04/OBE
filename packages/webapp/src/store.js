import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../src/store/rootReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"


const store = configureStore({
  middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			immutableCheck: false,
			serializableCheck: false,
		}).concat([]),
  reducer: persistReducer(
    {
      key: "store",
     storage,
      whitelist:['auth']
    },
    rootReducer()
  ),
  devTools: "development"
});
store.asyncReducer= {}
export default store;



