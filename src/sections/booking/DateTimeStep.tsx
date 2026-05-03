"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  selectedDate: string;
  selectedTime: string;
  onDateSelect: (date: string) => void;
  onTimeSelect: (time: string) => void;
}

const TIME_SLOTS = [
  { id: "t1", time: "9:00 AM", available: true },
  { id: "t2", time: "10:00 AM", available: true },
  { id: "t3", time: "11:00 AM", available: false },
  { id: "t4", time: "12:00 PM", available: true },
  { id: "t5", time: "1:00 PM", available: false },
  { id: "t6", time: "2:00 PM", available: true },
  { id: "t7", time: "3:00 PM", available: true },
  { id: "t8", time: "4:00 PM", available: true },
  { id: "t9", time: "4:30 PM", available: false },
  { id: "t10", time: "5:00 PM", available: true },
  { id: "t11", time: "6:00 PM", available: true },
  { id: "t12", time: "7:00 PM", available: false },
];

const DAYS_OF_WEEK = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export function DateTimeStep({ selectedDate, selectedTime, onDateSelect, onTimeSelect }: Props) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
    else setViewMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
    else setViewMonth((m) => m + 1);
  };

  const handleDayClick = (day: number) => {
    const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const clickedDate = new Date(viewYear, viewMonth, day);
    // Prevent past dates
    if (clickedDate < new Date(today.getFullYear(), today.getMonth(), today.getDate())) return;
    onDateSelect(dateStr);
  };

  const isPast = (day: number) => {
    return new Date(viewYear, viewMonth, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  };

  const isToday = (day: number) => {
    return day === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();
  };

  const isSelected = (day: number) => {
    const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return dateStr === selectedDate;
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-2xl text-stone-900 mb-1">Select Date & Time</h2>
        <p className="font-sans text-sm text-stone-400 font-light">
          Choose your preferred appointment date and available time slot.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calendar */}
        <div className="border border-stone-200 bg-white p-6">
          {/* Month nav */}
          <div className="flex items-center justify-between mb-5">
            <button
              onClick={prevMonth}
              className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <p className="font-serif text-stone-900">
              {MONTHS[viewMonth]} {viewYear}
            </p>
            <button
              onClick={nextMonth}
              className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 mb-2">
            {DAYS_OF_WEEK.map((d) => (
              <div key={d} className="text-center font-sans text-[10px] tracking-widest uppercase text-stone-400 py-2">
                {d}
              </div>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7 gap-y-1">
            {/* Empty cells for first day offset */}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {/* Day cells */}
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
              const past = isPast(day);
              const today_ = isToday(day);
              const selected = isSelected(day);

              return (
                <button
                  key={day}
                  onClick={() => handleDayClick(day)}
                  disabled={past}
                  className={cn(
                    "aspect-square flex items-center justify-center font-sans text-sm transition-all duration-200 mx-auto w-9 h-9",
                    past && "text-stone-300 cursor-not-allowed",
                    !past && !selected && "text-stone-700 hover:bg-stone-100",
                    today_ && !selected && "font-medium text-gold-700 border border-gold-300",
                    selected && "bg-stone-900 text-cream-50 font-medium"
                  )}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {selectedDate && (
            <p className="mt-4 font-sans text-xs text-center text-stone-500">
              Selected:{" "}
              <span className="text-stone-800 font-medium">
                {new Date(selectedDate + "T12:00:00").toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </p>
          )}
        </div>

        {/* Time slots */}
        <div className="space-y-4">
          <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-gold-600 font-medium">
            Available Times
          </p>
          {!selectedDate ? (
            <div className="border border-dashed border-stone-200 p-8 text-center">
              <p className="font-sans text-sm text-stone-400">Please select a date first</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => slot.available && onTimeSelect(slot.time)}
                  disabled={!slot.available}
                  className={cn(
                    "py-3 font-sans text-xs transition-all duration-200 border",
                    !slot.available && "text-stone-300 border-stone-100 cursor-not-allowed bg-stone-50",
                    slot.available && selectedTime !== slot.time && "border-stone-200 text-stone-700 hover:border-gold-400 hover:text-gold-700",
                    slot.available && selectedTime === slot.time && "bg-stone-900 text-cream-50 border-stone-900"
                  )}
                >
                  {slot.time}
                  {!slot.available && (
                    <span className="block font-sans text-[9px] text-stone-300">Booked</span>
                  )}
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center gap-4 pt-2">
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 border border-stone-200 bg-white" />
              <span className="font-sans text-[10px] text-stone-400">Available</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 bg-stone-900" />
              <span className="font-sans text-[10px] text-stone-400">Selected</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 bg-stone-50 border border-stone-100" />
              <span className="font-sans text-[10px] text-stone-300">Booked</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
