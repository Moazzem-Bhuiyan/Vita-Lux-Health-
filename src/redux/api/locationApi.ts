import { RawBookingSettingsResponse } from '@/components/booking/BookingMappers';
import { intakeBaseApi } from './intakeBaseApi';

export const locationApi = intakeBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBookingSettings: builder.query<RawBookingSettingsResponse, void>({
      query: () => '/appointments/settings',
    }),
  }),
});

export const { useGetBookingSettingsQuery } = locationApi;
