import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ErrorType } from "../../shared/types";

export const editorSlice = createSlice({
  name: "editor",
  initialState: {
    dimacs: "",
    errors: [] as ErrorType[],
  },
  reducers: {
    setDimacs(state, action: PayloadAction<string>) {
      state.dimacs = action.payload;
    },
    clearDimacs(state) {
      state.dimacs = "";
      state.errors = [];
    },
    addError(state, action: PayloadAction<ErrorType>) {
      const error = state.errors.find((e) => e.line === action.payload.line);

      if (!error) {
        state.errors.push(action.payload);
      } else {
        state.errors = state.errors.map((error) => {
          if (error.line === action.payload.line) {
            return action.payload;
          }
          return error;
        });
      }
    },
    removeError(
      state,
      action: PayloadAction<{ line: number; length: number }>
    ) {
      const error = state.errors.find((e) => e.line === action.payload.line);

      if (error) {
        state.errors = state.errors.filter(
          (e) => e.line !== action.payload.line
        );
      }

      // Remove all errors that are out of range
      state.errors = state.errors.filter((e) => {
        if (e.line > action.payload.length) {
          return false;
        }

        return true;
      });
    },
    clearErrors(state) {
      state.errors = [];
    },
    editLine(
      state,
      action: PayloadAction<{ line: number; editedLine: string }>
    ) {
      const lines = state.dimacs.split("\n");

      const fixedLines = lines.map((line, index) => {
        if (index === action.payload.line - 1) {
          return action.payload.editedLine;
        }

        return line;
      });

      state.errors = state.errors.filter((e) => e.line !== action.payload.line);

      state.dimacs = fixedLines.join("\n");
    },
    addZero(state, action: PayloadAction<number>) {
      const lines = state.dimacs.split("\n");

      const fixedLines = lines.map((line, index) => {
        if (index === action.payload - 1) {
          return line + " 0";
        }

        return line;
      });

      state.errors = state.errors.filter((e) => e.line !== action.payload);

      state.dimacs = fixedLines.join("\n");
    },
    deleteLine(state, action: PayloadAction<number>) {
      const lines = state.dimacs.split("\n");

      const fixedLines = lines.filter(
        (_, index) => index !== action.payload - 1
      );

      state.errors = state.errors.filter((e) => e.line !== action.payload);

      state.dimacs = fixedLines.join("\n");
    },
  },
});

export const {
  setDimacs,
  clearDimacs,
  addError,
  removeError,
  clearErrors,
  addZero,
  deleteLine,
  editLine,
} = editorSlice.actions;

export default editorSlice.reducer;
