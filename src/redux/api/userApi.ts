import { baseApi } from './baseApi';

const UserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({
        url: '/user/profile',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    updateUser: builder.mutation({
      query: ({ formData }) => ({
        url: '/user/profile',
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['User'],
    }),
    uploadAvatar: builder.mutation({
      query: ({ fileData }) => ({
        url: '/user/avatar?_method=PUT', // ← Add this
        method: 'POST', 
        body: fileData,
        // Important for FormData
        formData: true, // Some setups need this
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useGetUserQuery, useUpdateUserMutation, useUploadAvatarMutation } = UserApi;
