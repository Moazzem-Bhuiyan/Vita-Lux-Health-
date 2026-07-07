import { baseApi } from './baseApi';

const bookingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    submitBooking: build.mutation({
      query: (payload = {}) => ({
        url: '/appointment/create',
        method: 'POST',
        body: payload,
      }),
    }),
    getBookings: build.query({
      query: () => ({
        url: '/booking/user-booking',
        method: 'GET',
      }),
    }),
    getBoookingDetailsbyBookingNumber: build.query({
      query: ({ BookingNumber }) => ({
        url: `/booking/user-details/${BookingNumber}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetBookingsQuery,
  useSubmitBookingMutation,
  useGetBoookingDetailsbyBookingNumberQuery,
} = bookingApi;
