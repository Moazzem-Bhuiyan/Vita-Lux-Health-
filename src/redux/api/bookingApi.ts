import { baseApi } from './baseApi';

const bookingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    submitBooking: build.mutation({
      query: (payload = {}) => ({
        url: '/appointment/create',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Booking'],
    }),
    getBookings: build.query({
      query: () => ({
        url: '/booking/user-booking',
        method: 'GET',
      }),
      providesTags: ['Booking'],
    }),
    getBoookingDetailsbyBookingNumber: build.query({
      query: ({ BookingNumber }) => ({
        url: `/booking/user-details/${BookingNumber}`,
        method: 'GET',
      }),
      providesTags: ['Booking'],
    }),
    rebookingService: build.mutation({
      query: ({ id, payload = {} }) => ({
        url: `/booking/rebooking/${id}`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Booking'],
    }),

    cancleBooking: build.mutation({
      query: ({ id, payload = {} }) => ({
        url: `/booking/cancel/${id}?_method=PUT`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Booking'],
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
