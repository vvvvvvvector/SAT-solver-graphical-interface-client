import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ClauseType } from "../../shared/types";

const initialState = {
  solutions: [] as ClauseType[],
};

export const solutionsSlice = createSlice({
  name: "solutions",
  initialState,
  reducers: {
    setFirstSolution(state, action: PayloadAction<ClauseType>) {
      state.solutions = [action.payload];
    },
    setNextSolution(state, action: PayloadAction<ClauseType>) {
      state.solutions = [...state.solutions, action.payload];
    },
  },
});

export const { setFirstSolution, setNextSolution } = solutionsSlice.actions;

export default solutionsSlice.reducer;
