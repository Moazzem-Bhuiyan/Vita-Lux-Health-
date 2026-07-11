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
    rebookingService: build.mutation({
      query: ({ id, payload = {} }) => ({
        url: `/booking/rebooking/${id}`,
        method: 'POST',
        body: payload,
      }),
    }),

    cancleBooking: build.mutation({
      query: ({ id, payload = {} }) => ({
        url: `/booking/cancel/${id}?_method=PUT`,
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const {
  useGetBookingsQuery,
  useSubmitBookingMutation,
  useGetBoookingDetailsbyBookingNumberQuery,
  useRebookingServiceMutation,
  useCancleBookingMutation,
} = bookingApi;
