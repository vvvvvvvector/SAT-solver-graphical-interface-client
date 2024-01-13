import { configureStore } from '@reduxjs/toolkit';

import formula from './slices/formula';
import solutions from './slices/solutions';
import editor from './slices/editor';
import linker from './slices/linker';

export const store = configureStore({
  reducer: {
    formula,
    solutions,
    editor,
    linker
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
