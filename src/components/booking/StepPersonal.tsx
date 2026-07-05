import { Input } from '../ui';
import { Label } from '../ui/label';
import { BookingFormData } from './booking-types';

export function StepPersonal({
  form,
  onChange,
}: {
  form: BookingFormData;
  onChange: (
    key: keyof BookingFormData['personal']
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <Label htmlFor="booking-fullName" className="mb-1.5 block">
          Full Name
        </Label>
        <Input
          id="booking-fullName"
          placeholder="Enter your full name"
          value={form.personal.fullName}
          onChange={onChange('fullName')}
        />
      </div>
      <div>
        <Label htmlFor="booking-email" className="mb-1.5 block">
          Email Address
        </Label>
        <Input
          id="booking-email"
          type="email"
          placeholder="Enter your email address"
          value={form.personal.email}
          onChange={onChange('email')}
        />
      </div>
      <div>
        <Label htmlFor="booking-phone" className="mb-1.5 block">
          Phone Number
        </Label>
        <Input
          id="booking-phone"
          type="tel"
          placeholder="Enter your phone number"
          value={form.personal.phone}
          onChange={onChange('phone')}
        />
      </div>
    </div>
  );
}
