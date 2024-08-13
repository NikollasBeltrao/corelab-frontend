import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  name: string | null;
  login: string | null;
  id: number | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  name: null,
  login: null,
  id: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ id:number; token: string; name: string; login: string }>) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.name = action.payload.name;
      state.login = action.payload.login;
      state.id = action.payload.id;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.name = null;
      state.login = null;
      state.id = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
