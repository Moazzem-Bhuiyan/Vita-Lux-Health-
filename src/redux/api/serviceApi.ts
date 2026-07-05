import { baseApi } from './baseApi';

const ServiceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query({
      query: () => ({
        url: '/service/get',
        method: 'GET',
      }),
      providesTags: ['Service'],
    }),
    getServiceBySlug: builder.query({
      query: ({ slug }) => ({
        url: `/service/view/${slug}`,
        method: 'GET',
      }),
      providesTags: ['Service'],
    }),
  }),
});

export const { useGetServicesQuery, useGetServiceBySlugQuery } = ServiceApi;
