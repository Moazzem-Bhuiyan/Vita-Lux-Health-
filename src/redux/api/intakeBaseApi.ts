import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const intakeBaseApi = createApi({
  reducerPath: 'intakeBaseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_INTAKE_URL || 'https://intakeq.com/api/v1',
    prepareHeaders: (headers) => {
      const apiKey = process.env.NEXT_PUBLIC_INTAKEQ_API_KEY;

      if (apiKey) {
        headers.set('x-auth-key', apiKey);
      } else {
        console.warn('⚠️ IntakeQ API Key is missing in environment variables');
      }

      headers.set('Accept', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAppointmentsSettings: builder.query({
      query: () => '/appointments/settings',
    }),

    // Add more endpoints as needed
  }),
});

export const { useGetAppointmentsSettingsQuery } = intakeBaseApi;
