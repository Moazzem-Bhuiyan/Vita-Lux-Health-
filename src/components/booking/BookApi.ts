/**
 * Submits the finished booking as multipart/form-data, matching your
 * /appointment/create endpoint's expected field names exactly:
 *
 *   name, email, phone_number,
 *   services[0][service_id], services[1][service_id], ...
 *   location_id, practitioner_id,
 *   appointment_date, appointment_time,
 *   price, note
 */

export interface SubmitBookingPayload {
  name: string;
  email: string;
  phoneNumber: string;
  serviceIds: string[];
  locationId: string;
  practitionerId: string;
  appointmentDate: string; // yyyy-MM-dd
  appointmentTime: string;
  price: number;
  note: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

export async function submitBooking(payload: SubmitBookingPayload): Promise<{ id: string }> {
  const formData = new FormData();
  formData.append('name', payload.name);
  formData.append('email', payload.email);
  formData.append('phone_number', payload.phoneNumber);

  payload.serviceIds.forEach((serviceId, index) => {
    formData.append(`services[${index}][service_id]`, serviceId);
  });

  formData.append('location_id', payload.locationId);
  formData.append('practitioner_id', payload.practitionerId);
  formData.append('appointment_date', payload.appointmentDate);
  formData.append('appointment_time', payload.appointmentTime);
  formData.append('price', String(payload.price));
  formData.append('note', payload.note);

  const res = await fetch(`${API_BASE_URL}/appointment/create`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) throw new Error('Failed to submit booking');
  return res.json();
}
