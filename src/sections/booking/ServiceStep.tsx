import Image from "next/image";
import { Check, Clock } from "lucide-react";
import { SERVICES, SERVICE_CATEGORIES } from "@/lib/data/services";
import { formatCurrency, formatDuration, cn } from "@/lib/utils";

interface Props {
  selectedServiceId: string;
  onSelect: (id: string) => void;
}

export function ServiceStep({ selectedServiceId, onSelect }: Props) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-2xl text-stone-900 mb-1">Choose Your Treatment</h2>
        <p className="font-sans text-sm text-stone-400 font-light">
          Select the experience you wish to book.
        </p>
      </div>

      {SERVICE_CATEGORIES.map((category) => {
        const categoryServices = SERVICES.filter((s) => s.category === category.id);
        return (
          <div key={category.id} className="space-y-3">
            <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-gold-600 font-medium border-b border-stone-100 pb-2">
              {category.label}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {categoryServices.map((service) => {
                const isSelected = service.id === selectedServiceId;
                return (
                  <button
                    key={service.id}
                    onClick={() => onSelect(service.id)}
                    className={cn(
                      "flex items-start gap-4 p-4 border text-left transition-all duration-200 w-full group",
                      isSelected
                        ? "border-gold-500 bg-gold-500/5"
                        : "border-stone-200 hover:border-stone-300 bg-white hover:bg-stone-50/50"
                    )}
                  >
                    {/* Thumbnail */}
                    <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden bg-stone-100">
                      <Image
                        src={service.image}
                        alt={service.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <p className="font-serif text-stone-900 truncate">{service.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock size={10} className="text-stone-400" />
                        <span className="font-sans text-[10px] text-stone-400">
                          {formatDuration(service.duration)}
                        </span>
                      </div>
                      <p className=" text-gold-700 mt-1">
                        {formatCurrency(service.price)}
                      </p>
                    </div>

                    {/* Selected indicator */}
                    <div
                      className={cn(
                        "w-5 h-5 flex-shrink-0 flex items-center justify-center border transition-all duration-200 mt-0.5",
                        isSelected
                          ? "bg-gold-500 border-gold-500"
                          : "border-stone-300 group-hover:border-stone-400"
                      )}
                    >
                      {isSelected && <Check size={11} className="text-white" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
