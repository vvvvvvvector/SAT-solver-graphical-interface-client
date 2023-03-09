import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const textAreaSlice = createSlice({
  name: "textArea",
  initialState: {
    dimacs: "",
  },
  reducers: {
    setTextArea(state, action: PayloadAction<string>) {
      state.dimacs = action.payload;
    },
    clearTextArea(state) {
      state.dimacs = "";
    },
  },
});

export const { setTextArea, clearTextArea } = textAreaSlice.actions;

export default textAreaSlice.reducer;
