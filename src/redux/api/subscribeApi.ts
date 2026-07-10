import { baseApi } from './baseApi';

const subscribeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    subscribe: build.mutation({
      query: (payload = {}) => ({
        url: '/contact/subscribe',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const { useSubscribeMutation } = subscribeApi;
