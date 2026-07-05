import { baseApi } from './baseApi';

const BookingAPi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    submitBooking: builder.mutation({
      query: (payload) => ({
        url: '/appointment/create',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const { useSubmitBookingMutation } = BookingAPi;
