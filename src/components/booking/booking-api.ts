import type { LocationOption, ServiceOption } from './booking-types';

/**
 * Replace the URLs below with your real endpoints, e.g.:
 *   GET /api/services   -> [{ id, name }, ...]
 *   GET /api/locations  -> [{ id, name }, ...]
 *
 * Both are typed so the rest of the booking flow doesn't need to change
 * once you point these at your actual API.
 */

export async function fetchServices(): Promise<ServiceOption[]> {
  const res = await fetch('/api/services');
  if (!res.ok) throw new Error('Failed to load services');
  return res.json();
}

export async function fetchLocations(): Promise<LocationOption[]> {
  const res = await fetch('/api/locations');
  if (!res.ok) throw new Error('Failed to load locations');
  return res.json();
}

/**
 * Submit the finished booking. Replace with your real endpoint
 * (e.g. POST /api/bookings) — kept separate so BookingModal doesn't
 * need to know about the request shape your backend expects.
 */
export async function submitBooking(payload: {
  fullName: string;
  name: string;
  email: string;
  phoneNumber: string;
  serviceId: string;
  locationId: string;
  date: string;
  serviceIds: string[];
  practitionerId: string;
  appointmentTime: string;
  appointmentDate: string;
  note: string;
  time: string;
}): Promise<{ id: string }> {
  const res = await fetch('/api/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to submit booking');
  return res.json();
}
