import React from 'react';
import { LucideIcon } from 'lucide-react';

interface CategoryChipProps {
  label: string;
  icon?: LucideIcon;
  active?: boolean;
  onClick?: () => void;
}

export function CategoryChip({ label, icon: Icon, active, onClick }: CategoryChipProps) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-200 min-h-[48px] focus-visible:outline-2 focus-visible:outline-[var(--brand-primary)] focus-visible:outline-offset-2 ${
        active
          ? 'bg-[var(--brand-primary)] text-white shadow-sm'
          : 'bg-white border border-[var(--border-soft)] text-[var(--ink-body)] hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]'
      }`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      <span>{label}</span>
    </button>
  );
}
