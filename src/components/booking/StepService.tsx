import * as React from 'react';
import { BookingFormData, LocationOption, ServiceOption } from './booking-types';
import { Label } from '@/components/ui/label';
import { Check, ChevronDown, X } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '../ui';

export function StepService({
  form,
  services,
  locations,
  loading,
  onChange,
}: {
  form: BookingFormData;
  services: ServiceOption[];
  locations: LocationOption[];
  loading: boolean;
  onChange: (next: BookingFormData['service']) => void;
}) {
  const toggleService = (id: string) => {
    const next = form.service.serviceIds.includes(id)
      ? form.service.serviceIds.filter((sid) => sid !== id)
      : [...form.service.serviceIds, id];
    onChange({ ...form.service, serviceIds: next });
  };

  const removeService = (id: string) =>
    onChange({
      ...form.service,
      serviceIds: form.service.serviceIds.filter((sid) => sid !== id),
    });

  const selectedServices = services.filter((s) => form.service.serviceIds.includes(String(s.id)));

  const selectedLocation = locations.find((l) => l.id === form.service.locationId);

  return (
    <div className="flex flex-col gap-6">
      {/* === Service Multi-Select (unchanged) === */}
      <div>
        <Label className="mb-1.5 block">Select Service(s)</Label>
        <ServiceMultiSelect
          services={services}
          selectedIds={form.service.serviceIds}
          loading={loading}
          onToggle={toggleService}
        />

        {selectedServices.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {selectedServices.map((s) => (
              <span
                key={s.id}
                className="inline-flex items-center gap-1.5 rounded-full bg-stone-100 py-1 pl-3 pr-1.5 text-xs text-stone-700"
              >
                {s.name}
                <button
                  type="button"
                  onClick={() => removeService(s.id)}
                  className="rounded-full p-0.5 hover:bg-stone-200"
                  aria-label={`Remove ${s.name}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* === Location Popover Select (New) === */}
      <div>
        <Label className="mb-1.5 block">Select Location</Label>
        <LocationPopoverSelect
          locations={locations}
          selectedId={form.service.locationId}
          loading={loading}
          onSelect={(locationId) => onChange({ ...form.service, locationId })}
        />
      </div>
    </div>
  );
}

/* ====================== Service Multi-Select ====================== */
function ServiceMultiSelect({
  services,
  selectedIds,
  loading,
  onToggle,
}: {
  services: ServiceOption[];
  selectedIds: string[];
  loading: boolean;
  onToggle: (id: string) => void;
}) {
  const [open, setOpen] = React.useState(false);

  const label =
    selectedIds.length === 0
      ? loading
        ? 'Loading services…'
        : 'Choose service(s)'
      : selectedIds.length === 1
        ? (services.find((s) => s.id === selectedIds[0])?.name ?? '1 service selected')
        : `${selectedIds.length} services selected`;

  console.log('selectedIds', selectedIds);
  console.log(
    services.map((s) => ({
      id: s.id,
      checked: selectedIds.includes(s.id),
    }))
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="w-full !h-14">
        <Button
          type="button"
          variant="outline"
          disabled={loading}
          className="w-full h-12 justify-between border-stone-200 bg-white font-normal text-stone-700 shadow-sm hover:bg-white"
        >
          <span className={selectedIds.length === 0 ? 'text-stone-400' : ''}>{label}</span>
          <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] rounded-md border border-stone-200 bg-white p-1.5 shadow-lg"
        align="start"
      >
        <div className="max-h-64 overflow-y-auto">
          {services.map((service) => {
            const checked = selectedIds.includes(String(service.id));
            return (
              <button
                key={service.id}
                type="button"
                onClick={() => onToggle(service.id)}
                className="flex w-full items-center justify-between gap-3 rounded-sm px-3 py-2.5 text-left text-sm hover:bg-stone-50"
              >
                <span className="flex items-center gap-2.5">
                  <span
                    className="flex h-4 w-4 items-center justify-center rounded-sm border"
                    style={{
                      background: checked ? '#1c1917' : 'transparent',
                      borderColor: checked ? '#1c1917' : '#d6d3d1',
                    }}
                  >
                    {checked && <Check className="h-3 w-3 text-white" />}
                  </span>
                  <span className="text-stone-800">{service.name}</span>
                </span>
                <span className="shrink-0 text-xs text-stone-500">${service.price.toFixed(2)}</span>
              </button>
            );
          })}
          {services.length === 0 && (
            <p className="px-3 py-3 text-sm text-stone-400">
              {loading ? 'Loading…' : 'No services available.'}
            </p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

/* ====================== New Location Popover Select ====================== */
function LocationPopoverSelect({
  locations,
  selectedId,
  loading,
  onSelect,
}: {
  locations: LocationOption[];
  selectedId: string | null;
  loading: boolean;
  onSelect: (id: string) => void;
}) {
  const [open, setOpen] = React.useState(false);

  const selectedLocation = locations.find((l) => l.id === selectedId);

  const label = loading
    ? 'Loading locations...'
    : selectedLocation
      ? selectedLocation.name
      : 'Select a location';

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="w-full">
        <Button
          type="button"
          variant="outline"
          disabled={loading}
          className="w-full justify-between border-stone-200 bg-white font-normal text-stone-700 shadow-sm hover:bg-white h-12"
        >
          <span className={selectedId ? 'text-stone-800' : 'text-stone-400'}>{label}</span>
          <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] rounded-md border border-stone-200 bg-white p-1.5 shadow-lg"
        align="start"
      >
        <div className="max-h-64 overflow-y-auto py-1">
          {locations.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-stone-400">
              {loading ? 'Loading…' : 'No locations available.'}
            </p>
          ) : (
            locations.map((location) => (
              <button
                key={location.id}
                type="button"
                onClick={() => {
                  onSelect(location.id);
                  setOpen(false);
                }}
                className="flex w-full items-center justify-between rounded-sm px-3 py-2.5 text-left text-sm hover:bg-stone-50"
              >
                <span className="text-stone-800">{location.name}</span>
                {selectedId === location.id && <Check className="h-4 w-4 text-stone-900" />}
              </button>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
