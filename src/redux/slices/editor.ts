import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IError, ErrorsMap } from '../../shared/types';

export const editorSlice = createSlice({
  name: 'editor',
  initialState: {
    dimacs: '',
    errors: {} as ErrorsMap,
  },
  reducers: {
    setDimacs(state, action: PayloadAction<string>) {
      state.dimacs = action.payload;
    },
    clearDimacs(state) {
      state.dimacs = '';
      state.errors = {};
    },
    addError(state, action: PayloadAction<{ line: number; err: IError }>) {
      const error = state.errors[`${action.payload.line}`];

      if (!error) {
        // if this error doesn't exist yet
        state.errors[`${action.payload.line}`] = action.payload.err;
      } else {
        // rewrite error if it exists
        state.errors = {
          ...state.errors,
          [`${action.payload.line}`]: {
            ...action.payload.err,
          },
        };
      }
    },
    removeError(state, action: PayloadAction<number>) {
      const error = state.errors[`${action.payload}`];

      if (error) {
        const { [action.payload.toString()]: _, ...withoutElement } =
          state.errors;

        state.errors = withoutElement;
      }
    },
    addZero(state, action: PayloadAction<number>) {
      const lines = state.dimacs.split('\n');

      const fixedLines = lines.map((line, index) => {
        if (index === action.payload - 1) {
          return line + ' 0';
        }

        return line;
      });

      const { [action.payload.toString()]: _, ...withoutElement } =
        state.errors;

      state.errors = withoutElement;

      state.dimacs = fixedLines.join('\n');
    },
    deleteLine(state, action: PayloadAction<number>) {
      const lines = state.dimacs.split('\n');

      const fixedLines = lines.filter(
        (_, index) => index !== action.payload - 1
      );

      const { [action.payload.toString()]: _, ...withoutElement } =
        state.errors;

      state.errors = withoutElement;

      state.dimacs = fixedLines.join('\n');
    },
    editLine(
      state,
      action: PayloadAction<{ line: number; editedLine: string }>
    ) {
      const lines = state.dimacs.split('\n');

      const fixedLines = lines.map((line, index) => {
        if (index === action.payload.line - 1) {
          return action.payload.editedLine;
        }

        return line;
      });

      const { [action.payload.toString()]: _, ...withoutElement } =
        state.errors;

      state.errors = withoutElement;

      state.dimacs = fixedLines.join('\n');
    },
    clearErrors(state) {
      state.errors = {};
    },
  },
});

export const {
  setDimacs,
  clearDimacs,
  addError,
  addZero,
  deleteLine,
  editLine,
  removeError,
  clearErrors,
} = editorSlice.actions;

export default editorSlice.reducer;
