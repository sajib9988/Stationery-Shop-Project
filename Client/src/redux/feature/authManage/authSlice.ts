import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../store";

export type TUser = {
  email: string;
  
  exp: number;
  iat: number;
  name: string;
  role: string;
  imageUrl: string;
};

type TAuthState = {
  user: null | TUser;
  token: null | string;
};
const initialState: TAuthState = {
  user: null,
  token: null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: TUser | null; token: string }>) => {
      // console.log('store token', action.payload.user);
      state.user = action.payload.user;
      state.token = action.payload.token;
      // console.log('Token set Redux:', state.token);
    },
    logout: (state) => {
      state.token = null; 
      state.user = null;
    },
  },
});
export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;

export const useCurrentToken = (state: RootState) => state.auth.token;
export const useCurrentUser = (state: RootState) => state.auth.user;