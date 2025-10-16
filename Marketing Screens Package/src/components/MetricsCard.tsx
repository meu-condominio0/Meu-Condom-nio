import React from 'react';

interface MetricsCardProps {
  value: string;
  label: string;
}

export function MetricsCard({ value, label }: MetricsCardProps) {
  return (
    <div className="flex flex-col items-center text-center gap-2 p-6">
      <div className="text-[40px] leading-[48px] font-bold text-[var(--brand-primary)]">
        {value}
      </div>
      <p className="text-[var(--ink-body)]">{label}</p>
    </div>
  );
}
