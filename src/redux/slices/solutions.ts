import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  opened: true,
  solutions: [] as number[][],
};

export const solutionsSlice = createSlice({
  name: "solutions",
  initialState,
  reducers: {
    setSolutionsOpened(state, action: PayloadAction<boolean>) {
      return { ...state, opened: action.payload };
    },
    setSolution(state, action: PayloadAction<number[]>) {
      // return { ...state, solutions: [...state.solutions, action.payload] };
      state.solutions.push(action.payload);
    },
    setSolutions(state, action: PayloadAction<number[][]>) {
      for (const solution of action.payload) {
        state.solutions.push(solution);
      }
    },
    clearSolutions(state) {
      if (state.solutions.length > 0) {
        return { ...state, solutions: [] };
      }
    },
  },
});

export const { setSolution, setSolutions, setSolutionsOpened, clearSolutions } =
  solutionsSlice.actions;

export default solutionsSlice.reducer;
