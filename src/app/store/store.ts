import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import alertReducer from "./alertSlice";
import assetReducer from "./assetsSlice";
import paymentReducer from "./paymentSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    alert: alertReducer,
    assets: assetReducer,
    payment: paymentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
