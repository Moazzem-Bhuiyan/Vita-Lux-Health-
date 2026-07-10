import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout, setUser } from '../features/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  // credentials: "include",
  prepareHeaders: (headers: any, { getState }: any) => {
    const token = getState()?.auth?.token;
    console.log('🚀 ~ token:', token);
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    const signUpToken = localStorage.getItem('signupToken');
    if (signUpToken) {
      headers.set('token', signUpToken);
    }
    const guestToken = sessionStorage.getItem('guestToken');
    if (guestToken) {
      headers.set('token', guestToken);
    }
    const forgetPasswordToken = localStorage.getItem('verifyEmail-token');
    if (forgetPasswordToken) {
      headers.set('Authorization', `Bearer ${forgetPasswordToken}`);
    }
    return headers;
  },
});
const baseQueryWithRefreshToken = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const token = api.getState().auth.token;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: token },
      // credentials: 'include',
    });

    const data = await res.json();
    if (data?.data?.accessToken) {
      const user = api.getState().auth.user;

      api.dispatch(setUser({ user, token: data.data.accessToken }));

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['categories', 'Blogs', 'media', 'Service', 'auth', 'User'],
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
});
