import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import customerAuthReducer from "./customerAuthSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    customerAuth: customerAuthReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
