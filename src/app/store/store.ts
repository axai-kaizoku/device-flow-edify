import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import alertReducer from "./alertSlice";
import assetReducer from "./assetsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    alert: alertReducer,
    assets: assetReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
