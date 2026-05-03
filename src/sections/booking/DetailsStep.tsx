import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

interface PersonalDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes: string;
}

interface Props {
  details: PersonalDetails;
  onChange: (field: keyof PersonalDetails, value: string) => void;
}

export function DetailsStep({ details, onChange }: Props) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-2xl text-stone-900 mb-1">Your Details</h2>
        <p className="font-sans text-sm text-stone-400 font-light">
          We&apos;ll use this to prepare your experience and send confirmation.
        </p>
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Input
            label="First Name"
            value={details.firstName}
            onChange={(e) => onChange("firstName", e.target.value)}
            placeholder="Jane"
            required
          />
          <Input
            label="Last Name"
            value={details.lastName}
            onChange={(e) => onChange("lastName", e.target.value)}
            placeholder="Doe"
            required
          />
        </div>

        <Input
          label="Email Address"
          type="email"
          value={details.email}
          onChange={(e) => onChange("email", e.target.value)}
          placeholder="jane@example.com"
          hint="Confirmation and reminder will be sent here"
          required
        />

        <Input
          label="Phone Number"
          type="tel"
          value={details.phone}
          onChange={(e) => onChange("phone", e.target.value)}
          placeholder="+1 (000) 000-0000"
          hint="For SMS reminders and last-minute changes"
        />

        <Textarea
          label="Special Requests or Notes"
          value={details.notes}
          onChange={(e) => onChange("notes", e.target.value)}
          placeholder="Any health considerations, preferences, or special requests for your therapist…"
          rows={4}
        />

        {/* Privacy note */}
        <div className="p-4 bg-cream-100 border-l-2 border-gold-500">
          <p className="font-sans text-xs text-stone-500 font-light leading-relaxed">
            Your information is kept strictly confidential and is only shared with your 
            assigned therapist to personalize your experience. We never sell or share 
            personal data with third parties.
          </p>
        </div>
      </div>
    </div>
  );
}
