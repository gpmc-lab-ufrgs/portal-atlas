import { configureStore } from '@reduxjs/toolkit';
import localeReducer from "./features/localeSlice";
import menuReducer from "./features/menuSlice";
import { createWrapper } from "next-redux-wrapper";

export const store = configureStore({
  reducer: {
    localeReducer,
    menuReducer
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

