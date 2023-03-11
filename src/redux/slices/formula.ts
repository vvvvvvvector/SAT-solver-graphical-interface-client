import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ClauseType } from "../../shared/types";

const initialState = {
  opened: true,
  clauses: [] as ClauseType[],
};

export const formulaSlice = createSlice({
  name: "formula",
  initialState,
  reducers: {
    setFormulaOpened(state, action: PayloadAction<boolean>) {
      return { ...state, opened: action.payload };
    },
    setFormula(state, action: PayloadAction<ClauseType[]>) {
      return { ...state, clauses: action.payload };
    },
    addClause(state, action: PayloadAction<number[]>) {
      if (state.clauses.length > 0) {
        state.clauses.push({
          id: state.clauses[state.clauses.length - 1].id + 1,
          variables: action.payload,
        });
      } else {
        state.clauses.push({ id: 0, variables: action.payload });
      }
    },
    editClause(
      state,
      action: PayloadAction<{ id: number; editedClause: number[] }>
    ) {
      const edited = state.clauses.map((clause) => {
        if (clause.id === action.payload.id) {
          clause.variables = action.payload.editedClause;
        }
        return clause;
      });

      state.clauses = edited;
    },
    removeClause(state, action: PayloadAction<number>) {
      return {
        ...state,
        clauses: state.clauses.filter((clause) => clause.id !== action.payload),
      };
    },
    removeVariable(
      state,
      action: PayloadAction<{ variableId: number; clauseId: number }>
    ) {
      const clauseWithVariableToBeRemoved = state.clauses.find(
        (clause) => clause.id === action.payload.clauseId
      );

      if (clauseWithVariableToBeRemoved?.variables.length === 1) {
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

export const {
  setFormula,
  addClause,
  editClause,
  removeClause,
  removeVariable,
  setFormulaOpened,
} = formulaSlice.actions;

export default formulaSlice.reducer;
