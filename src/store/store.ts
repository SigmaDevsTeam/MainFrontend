import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { animationsSlice } from "./animations";
import { authApi, authSlice } from "./auth";

export const store = configureStore({
   reducer: {
      animation: animationsSlice,
      auth: authSlice,
      [authApi.reducerPath]: authApi.reducer
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
