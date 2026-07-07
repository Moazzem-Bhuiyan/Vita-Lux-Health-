import { baseApi } from './baseApi';

const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    contactUs: builder.mutation({
      query: (data) => ({
        url: '/contact/contact-us',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useContactUsMutation } = contactApi;
