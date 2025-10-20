import type { ReactNode } from 'react';
import clsx from 'clsx';

type PillHighlightProps = {
  icon: ReactNode;
  children: ReactNode;
  className?: string;
};

export function PillHighlight({ icon, children, className }: PillHighlightProps) {
  return (
    <div
      className={clsx(
        'flex items-start gap-3 rounded-2xl border border-emerald-100 bg-[#E6F6EF] px-4 py-3 text-sm text-slate-700 shadow-sm md:text-base',
        className,
      )}
    >
      <span className="mt-0.5 text-emerald-700" aria-hidden="true">
        {icon}
      </span>
      <p className="leading-relaxed">{children}</p>
    </div>
  );
}
