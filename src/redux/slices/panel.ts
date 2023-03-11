import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const panelSlice = createSlice({
  name: "panel",
  initialState: {
    solver: "cd",
    dimacs: "",
  },
  reducers: {
    setDimacs(state, action: PayloadAction<string>) {
      return { ...state, dimacs: action.payload };
    },
    clearDimacs(state) {
      return { ...state, dimacs: "" };
    },
    setSolver(state, action: PayloadAction<string>) {
      return { ...state, solver: action.payload };
    },
  },
});

export const { setDimacs, clearDimacs, setSolver } = panelSlice.actions;

export default panelSlice.reducer;
