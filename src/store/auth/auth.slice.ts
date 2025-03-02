import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./auth.api";

type AuthState = {
   user: User | "loading" | null;
};

// const placeHolderUser: User = {
//    id: 1,
//    username: "Oleg",
//    displayName: "Oleg",
//    isEmailVerified: false,
//    email: "olegmega@gmail.com",
//    bio: "megga niggours",
//    role: "USER",
//    image: "https://meganigga.png"
// };

const localStorageUser: User | null =
   JSON.parse(localStorage.getItem("user") || "") || null;

const initialState: AuthState = {
   user: localStorageUser
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
