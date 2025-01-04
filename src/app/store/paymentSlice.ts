import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PaymentState {
  paymentId: string | null;
  amount: number | null;
}

const initialState: PaymentState = {
  paymentId: null,
  amount: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPaymentData(state, action: PayloadAction<{ paymentId: string; amount: number }>) {
      state.paymentId = action.payload.paymentId;
      state.amount = action.payload.amount;
    },
    clearPaymentData(state) {
      state.paymentId = null;
      state.amount = null;
    },
  },
});

export const { setPaymentData, clearPaymentData } = paymentSlice.actions;
export default paymentSlice.reducer;
