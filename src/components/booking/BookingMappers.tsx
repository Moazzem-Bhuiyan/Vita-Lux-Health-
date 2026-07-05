import type { LocationOption, PractitionerOption, ServiceOption } from './booking-types';

/* ------------------------------------------------------------------ */
/*  Shapes coming straight off the wire — matches your actual APIs     */
/* ------------------------------------------------------------------ */

export interface RawService {
  id: number;
  service_name: string;
  price: string;
  duration: string;
  slug: string;
}

/** Shape of the paginated `GET /service/get` response you're already using via useGetServicesQuery. */
export interface RawServiceListResponse {
  status: string;
  message: string;
  data: {
    data: RawService[];
    current_page: number;
    last_page: number;
    total: number;
  };
}

export interface RawLocation {
  Id: string;
  Name: string;
  Address?: string;
}

export interface RawPractitioner {
  Id: string;
  CompleteName: string;
  FirstName?: string;
  LastName?: string;
  Email?: string;
}

/** Shape of IntakeQ's GET /api/v1/appointments/settings response. */
export interface RawBookingSettingsResponse {
  Locations: RawLocation[];
  Practitioners: RawPractitioner[];
}

/* ------------------------------------------------------------------ */
/*  Mappers                                                            */
/* ------------------------------------------------------------------ */

export function mapServiceOption(raw: RawService): ServiceOption {
  return {
    id: String(raw.id),
    name: raw.service_name,
    price: Number(raw.price) || 0,
    duration: raw.duration,
  };
}

export function mapServiceListResponse(
  response: RawServiceListResponse | undefined
): ServiceOption[] {
  return (response?.data?.data ?? []).map(mapServiceOption);
}

export function mapLocationOption(raw: RawLocation): LocationOption {
  return { id: raw.Id, name: raw.Name, address: raw.Address };
}

export function mapPractitionerOption(raw: RawPractitioner): PractitionerOption {
  return { id: raw.Id, name: raw.CompleteName };
}

export function mapBookingSettingsResponse(response: RawBookingSettingsResponse | undefined): {
  locations: LocationOption[];
  practitioners: PractitionerOption[];
} {
  return {
    locations: (response?.Locations ?? []).map(mapLocationOption),
    practitioners: (response?.Practitioners ?? []).map(mapPractitionerOption),
  };
}
