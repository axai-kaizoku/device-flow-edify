import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import alertReducer from "./alertSlice";
import assetReducer from "./assetsSlice";
import paymentReducer from "./paymentSlice";

import filterReducer from "./filterSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    alert: alertReducer,
    assets: assetReducer,
    payment: paymentReducer,
    filter: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
