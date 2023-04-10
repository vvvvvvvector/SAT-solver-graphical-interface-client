import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  first: '',
  second: '',
  linked: '',
};

export const linkerSlice = createSlice({
  name: 'linker',
  initialState,
  reducers: {
    setFirst(state, action: PayloadAction<string>) {
      state.first = action.payload;
    },
    setSecond(state, action: PayloadAction<string>) {
      state.second = action.payload;
    },
    setLinked(state, action: PayloadAction<string>) {
      state.linked = action.payload;
    },
    filterFormula(state, action: PayloadAction<1 | 2>) {
      if (action.payload === 1) {
        state.first = state.first
          .split('\n')
          .filter((line) => {
            return line.match(
              /^p\s+cnf\s+[1-9][0-9]*\s+[1-9][0-9]*\s*$|^\s*(?:-?[1-9][0-9]*\s+)+0\s*$/
            );
          })
          .join('\n');
      } else {
        state.second = state.second
          .split('\n')
          .filter((line) => {
            return line.match(
              /^p\s+cnf\s+[1-9][0-9]*\s+[1-9][0-9]*\s*$|^\s*(?:-?[1-9][0-9]*\s+)+0\s*$/
            );
          })
          .join('\n');
      }
    },
  },
});

export const { setFirst, setSecond, setLinked, filterFormula } =
  linkerSlice.actions;

export default linkerSlice.reducer;
