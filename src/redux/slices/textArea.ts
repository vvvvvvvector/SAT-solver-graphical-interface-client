import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const textAreaSlice = createSlice({
  name: "textArea",
  initialState: {
    cnf: "",
  },
  reducers: {
    setTextArea(state, action: PayloadAction<string>) {
      state.cnf = action.payload;
    },
    clearTextArea(state) {
      state.cnf = "";
    },
  },
});

export const { setTextArea, clearTextArea } = textAreaSlice.actions;

export default textAreaSlice.reducer;
