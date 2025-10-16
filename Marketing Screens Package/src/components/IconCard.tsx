import React from 'react';
import { LucideIcon } from 'lucide-react';

interface IconCardProps {
  icon: LucideIcon;
  title: string;
}

export function IconCard({ icon: Icon, title }: IconCardProps) {
  return (
    <div className="flex flex-col items-center text-center gap-4 p-6 rounded-2xl bg-white border border-[var(--border-soft)] hover:shadow-[var(--shadow-md)] transition-all duration-200">
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-primary-600)] flex items-center justify-center">
        <Icon className="w-7 h-7 text-white" strokeWidth={2} />
      </div>
      <p className="text-[var(--ink-body)] font-normal">{title}</p>
    </div>
  );
}
