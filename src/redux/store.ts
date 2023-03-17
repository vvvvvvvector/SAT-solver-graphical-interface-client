import { configureStore } from "@reduxjs/toolkit";

import formula from "./slices/formula";
import solutions from "./slices/solutions";
import editor from "./slices/editor";

export const store = configureStore({
  reducer: {
    formula,
    solutions,
    editor,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
