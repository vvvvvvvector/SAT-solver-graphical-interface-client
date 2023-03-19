import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ErrorType = {
  line: number;
  text: string;
};

export const editorSlice = createSlice({
  name: "editor",
  initialState: {
    dimacs: "",
    errors: [] as ErrorType[],
  },
  reducers: {
    setDimacs(state, action: PayloadAction<string>) {
      state.dimacs = action.payload;
      state.errors = [];
    },
    clearDimacs(state) {
      state.dimacs = "";
      state.errors = [];
    },
    addError(state, action: PayloadAction<ErrorType>) {
      state.errors.push(action.payload);
    },
    removeError(state, action: PayloadAction<number>) {
      state.errors = state.errors.filter((e) => e.line !== action.payload + 1);
    },
    clearErrors(state) {
      state.errors = [];
    },
  },
});

export const { setDimacs, clearDimacs, addError, removeError, clearErrors } =
  editorSlice.actions;

export default editorSlice.reducer;
