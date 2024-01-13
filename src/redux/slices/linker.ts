import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  first: '',
  second: '',
  linked: ''
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
    }
  }
});

export const { setFirst, setSecond, setLinked } = linkerSlice.actions;

export default linkerSlice.reducer;
