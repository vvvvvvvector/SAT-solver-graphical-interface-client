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
    addClause(state, action: PayloadAction<number[]>) {
      if (state.clauses.length > 0) {
        state.clauses = [
          ...state.clauses,
          {
            id: state.clauses[state.clauses.length - 1].id + 1,
            variables: action.payload,
          },
        ];
      } else {
        state.clauses = [{ id: 0, variables: action.payload }];
      }
    },
    editClause(
      state,
      action: PayloadAction<{ id: number; newClause: number[] }>
    ) {
      state.clauses = state.clauses.map((clause) => {
        if (clause.id === action.payload.id) {
          clause.variables = action.payload.newClause;
        }
        return clause;
      });
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

export const {
  setFormula,
  addClause,
  editClause,
  removeClause,
  removeVariable,
} = formulaSlice.actions;

export default formulaSlice.reducer;
