import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type IClause } from '../../shared/types';

const initialState = {
  opened: true,
  changed: false,
  clauses: [] as IClause[]
};

export const formulaSlice = createSlice({
  name: 'formula',
  initialState,
  reducers: {
    setFormulaOpened(state, action: PayloadAction<boolean>) {
      state.opened = action.payload;
    },
    setFormula(state, action: PayloadAction<IClause[]>) {
      state.clauses = action.payload;

      state.changed = false;
    },
    addClause(state, action: PayloadAction<number[]>) {
      if (state.clauses.length > 0) {
        state.clauses.push({
          id: state.clauses[state.clauses.length - 1].id + 1,
          variables: action.payload
        });
      } else {
        state.clauses.push({ id: 0, variables: action.payload });
      }

      state.changed = true;
    },
    editClause(
      state,
      action: PayloadAction<{ id: number; editedClause: number[] }>
    ) {
      if (action.payload.editedClause.length > 0) {
        const edited = state.clauses.map((clause) => {
          if (clause.id === action.payload.id) {
            clause.variables = action.payload.editedClause;
          }
          return clause;
        });

        state.clauses = edited;
      } else {
        state.clauses = state.clauses.filter(
          (clause) => clause.id !== action.payload.id
        );
      }

      state.changed = true;
    },
    removeClause(state, action: PayloadAction<number>) {
      state.clauses = state.clauses.filter(
        (clause) => clause.id !== action.payload
      );

      state.changed = true;
    }
  }
});

export const {
  setFormula,
  addClause,
  editClause,
  removeClause,
  setFormulaOpened
} = formulaSlice.actions;

export default formulaSlice.reducer;
