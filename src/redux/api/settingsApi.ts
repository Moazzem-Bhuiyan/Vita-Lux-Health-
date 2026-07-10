import { baseApi } from './baseApi';

const settings = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSettings: builder.query({
      query: ({ type }) => ({
        url: `/setting/get?type=${type}`,
        method: 'GET',
      }),
    }),
    updateSettings: builder.mutation({
      query: ({ values, type }) => ({
        url: `/setting/create?type=${type}`,
        method: 'POST',
        body: values,
      }),
    }),
  }),
});

export const { useGetSettingsQuery, useUpdateSettingsMutation } = settings;
