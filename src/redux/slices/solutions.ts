import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  solutions: [] as number[][],
};

export const solutionsSlice = createSlice({
  name: "solutions",
  initialState,
  reducers: {
    setFirstSolution(state, action: PayloadAction<number[]>) {
      state.solutions = [action.payload];
    },
    setNextSolution(state, action: PayloadAction<number[]>) {
      state.solutions = [...state.solutions, action.payload];
    },
  },
});

export const { setFirstSolution, setNextSolution } = solutionsSlice.actions;

export default solutionsSlice.reducer;
