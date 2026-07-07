export function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3">
      <span className="text-xs text-stone-500">{label}</span>
      <span className="text-right text-sm font-medium text-stone-900">{value}</span>
    </div>
  );
}

export function ReviewGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-md border border-stone-100">
      <div className="bg-stone-50 px-4 py-2">
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-500">
          {title}
        </span>
      </div>
      <div className="divide-y divide-stone-100">{children}</div>
    </div>
  );
}
