import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ClauseType } from "../../shared/types";

type ClauseId = number;

type VariableId = {
  variableId: number;
  clauseId: number;
};

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
    removeClause(state, action: PayloadAction<ClauseId>) {
      state.clauses = state.clauses.filter(
        (clause) => clause.id !== action.payload
      );
    },
    removeVariable(state, action: PayloadAction<VariableId>) {
      const clause = state.clauses.find(
        (clause) => clause.id === action.payload.clauseId
      );

      if (clause?.variables.length === 1) {
        state.clauses = state.clauses.filter(
          (clause) => clause.id !== action.payload.clauseId
        );
      } else {
        state.clauses = state.clauses.map((clause) => {
          if (clause.id === action.payload.clauseId) {
            clause.variables = clause.variables.filter(
              (_, index) => index !== action.payload.variableId
            );
          }
          return clause;
        });
      }
    },
  },
});

export const { setFormula, removeClause, removeVariable } =
  formulaSlice.actions;

export default formulaSlice.reducer;
