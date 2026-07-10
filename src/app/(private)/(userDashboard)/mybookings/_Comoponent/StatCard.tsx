export function StatCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: 'emerald' | 'blue' | 'red' | 'amber';
}) {
  const toneClasses = {
    emerald: 'bg-emerald-50 text-emerald-600',
    blue: 'bg-blue-50 text-blue-600',
    red: 'bg-red-50 text-red-600',
    amber: 'bg-amber-50 text-amber-600',
  }[tone];

  return (
    <div className={`border shadow-sm rounded-lg px-5 py-4 ${toneClasses}`}>
      <p className="text-3xl font-semibold">{value}</p>
      <p className="mt-0.5 text-xs text-stone-500">{label}</p>
    </div>
  );
}
