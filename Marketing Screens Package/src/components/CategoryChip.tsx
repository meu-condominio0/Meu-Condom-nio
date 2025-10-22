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
      className={`inline-flex min-h-[48px] items-center gap-2 rounded-full px-4 py-2 font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 ${
        active
          ? 'border border-transparent bg-brand-900 text-white shadow-e2'
          : 'border border-[var(--border-soft)] bg-[var(--surface)] text-[var(--text-body)] hover:bg-[var(--surface-soft)]'
      }`}
    >
      {Icon && <Icon aria-hidden="true" className="h-4 w-4" focusable="false" />}
      <span>{label}</span>
    </button>
  );
}
