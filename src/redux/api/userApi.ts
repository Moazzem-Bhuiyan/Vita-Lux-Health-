import { baseApi } from './baseApi';

const UserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({
        url: '/user/profile',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetUserQuery } = UserApi;
