import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./auth.api";

type AuthState = {
   user: User | "loading" | null;
};

const initialState: AuthState = {
   user: "loading"
};

const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {
      setUser: (state, action: PayloadAction<User | "loading" | null>) => {
         state.user = action.payload;
      },
      logout: (state) => {
         state.user = null;
      }
   }
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
