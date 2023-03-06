import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ClauseType } from "../../shared/types";

const initialState = {
  clauses: [] as ClauseType[],
};

export const formulaSlice = createSlice({
  name: "formula",
  initialState,
  reducers: {
    setFormula(state, action: PayloadAction<ClauseType[]>) {
      state.clauses = action.payload;
    },
  },
});

export const { setFormula } = formulaSlice.actions;

export default formulaSlice.reducer;
