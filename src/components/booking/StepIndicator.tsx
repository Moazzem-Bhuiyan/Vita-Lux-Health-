import { BookingStep } from './booking-types';
import * as React from 'react';
const STEPS: { n: BookingStep; label: string }[] = [
  { n: 1, label: 'Personal Info' },
  { n: 2, label: 'Service Info' },
  { n: 3, label: 'Schedule' },
  { n: 4, label: 'Review' },
];

export function StepIndicator({
  step,
  onStepClick,
}: {
  step: BookingStep;
  onStepClick: (s: BookingStep) => void;
}) {
  return (
    <div className="mb-9 flex items-start justify-center">
      {STEPS.map((s, i) => {
        const isDone = s.n < step;
        const isActive = s.n === step;
        const clickable = isDone;

        return (
          <React.Fragment key={s.n}>
            {i > 0 && (
              <div
                className="mt-[18px] h-px w-10 shrink-0 sm:w-16"
                style={{ background: s.n <= step ? '#1c1917' : '#e7e2d8' }}
              />
            )}
            <button
              type="button"
              disabled={!clickable}
              onClick={() => onStepClick(s.n)}
              className="flex w-14 flex-col items-center gap-2 sm:w-16"
              style={{ cursor: clickable ? 'pointer' : 'default' }}
            >
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium sm:h-9 sm:w-9"
                style={{
                  background: isActive || isDone ? '#1c1917' : '#ffffff',
                  color: isActive || isDone ? '#ffffff' : '#a8a29e',
                  border: isActive || isDone ? 'none' : '1px solid #e7e2d8',
                }}
              >
                {s.n}
              </span>
              <span
                className="text-center text-xs"
                style={{ color: isActive ? '#1c1917' : '#a8a29e' }}
              >
                {s.label}
              </span>
            </button>
          </React.Fragment>
        );
      })}
    </div>
  );
}
