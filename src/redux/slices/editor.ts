import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ErrorType = {
  line: number;
  errorCode: number;
  description: string;
  damaged: string;
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
    removeError(state, action: PayloadAction<number>) {
      const error = state.errors.find((e) => e.line === action.payload);

      if (error) {
        state.errors = state.errors.filter((e) => e.line !== action.payload);
      }
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

      let definition = lines[0];

      let fixedLines = lines.slice(1).filter((line, index) => {
        if (index === action.payload - 2) {
          if (line) {
            let temp = definition.split(" ").filter((el) => el !== "");

            temp[3] = (parseInt(temp[3]) - 1).toString();

            definition = temp.join(" ");
          }

          return false;
        }
        return true;
      });

      state.errors = state.errors.filter((e) => e.line !== action.payload);

      fixedLines.unshift(definition);

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
