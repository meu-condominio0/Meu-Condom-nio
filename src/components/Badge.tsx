import type { PropsWithChildren } from 'react';

type BadgeProps = PropsWithChildren<{
  className?: string;
}>;

function classNames(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

export default function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={classNames(
        'inline-flex items-center gap-2 rounded-full border border-emerald-900/20 bg-emerald-900/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-900 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-200',
        className,
      )}
    >
      {children}
    </span>
  );
}
