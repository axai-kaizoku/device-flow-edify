import { Device } from "@/server/deviceActions";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AssetState {
  assetsData: Device | null;
}

const initialState: AssetState = {
  assetsData: null,
};

const assetsSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    filterAssets(state, action: PayloadAction<{ assetsData: Device }>) {
      state.assetsData = action.payload.assetsData;
    },
    paginationAssets(state) {
      state.assetsData = null;
    },
  },
});

export const { filterAssets, paginationAssets } = assetsSlice.actions;
export default assetsSlice.reducer;
