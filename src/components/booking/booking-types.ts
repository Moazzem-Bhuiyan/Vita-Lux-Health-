export type BookingStep = 1 | 2 | 3 | 4;

/** Normalized shapes used throughout the booking UI. */
export interface ServiceOption {
  id: string;
  name: string;
  price: number;
  duration?: string;
}

export interface LocationOption {
  id: string;
  name: string;
  address?: string;
}

export interface PractitionerOption {
  id: string;
  name: string;
}

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
}

export interface ServiceSelection {
  /** Multiple services can be picked at once. */
  serviceIds: string[];
  /** Only a single location can be picked. */
  locationId: string | null;
}

export interface ScheduleSelection {
  date: Date | undefined;
  time: string;
  note: string;
}

export interface BookingFormData {
  personal: PersonalInfo;
  service: ServiceSelection;
  schedule: ScheduleSelection;
}
