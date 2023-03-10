import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const panelSlice = createSlice({
  name: "panel",
  initialState: {
    solver: "cd",
    dimacs: "",
  },
  reducers: {
    setDimacs(state, action: PayloadAction<string>) {
      state.dimacs = action.payload;
    },
    clearDimacs(state) {
      state.dimacs = "";
    },
    setSolver(state, action: PayloadAction<string>) {
      state.solver = action.payload;
    },
  },
});

export const { setDimacs, clearDimacs, setSolver } = panelSlice.actions;

export default panelSlice.reducer;
