import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      console.log('action--------------------------------------------------', action);

      state.user = user;
      state.token = token;

      // Set token to cookie for middleware accessibility
      Cookies.set('vitalux_token', token, { path: '/' });
    },

    logout: (state) => {
      // Remove token for cookies
      Cookies.remove('vitalux_token', { path: '/' });
      state.user = null;
      state.token = null;
    },
  },
});

// Selectors
export const selectUser = (state: any) => state.auth.user;
export const selectToken = (state: any) => state.auth.token;

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
