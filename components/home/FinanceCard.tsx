import { memo, useMemo } from 'react';
import { homeMessages, LocaleKey } from './messages';
import { FinanceSummary } from './types';
import { SparkleIcon } from './icons';

interface FinanceCardProps {
  summary: FinanceSummary;
  locale?: LocaleKey;
  onSeeMore?: () => void;
}

const formatStatus = (status: FinanceSummary['status'], locale: LocaleKey) =>
  homeMessages.finance.status[status][locale];

export const FinanceCard = memo(function FinanceCard({
  summary,
  locale = 'pt',
  onSeeMore,
}: FinanceCardProps) {
  const formattedAmount = useMemo(
    () =>
      new Intl.NumberFormat(locale === 'pt' ? 'pt-BR' : 'en-US', {
        style: 'currency',
        currency: 'BRL',
      }).format(parseFloat(summary.amount)),
    [locale, summary.amount],
  );

  return (
    <section
      aria-labelledby="finance-card-title"
      className="relative overflow-hidden rounded-3xl bg-card p-6 shadow-xl shadow-black/20"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-brand/10 via-transparent to-brand/5" aria-hidden />
      <div className="relative space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand">
              {homeMessages.finance[locale]}
            </p>
            <h3 id="finance-card-title" className="text-2xl font-semibold text-neutral-900">
              {formattedAmount}
            </h3>
            <p className="text-xs text-neutral-900/70">
              {summary.month} · {formatStatus(summary.status, locale)}
            </p>
          </div>
          <div className="hidden md:flex">
            <SparkleIcon className="h-10 w-10 text-brand-light" />
          </div>
        </header>
        <Sparkline trend={summary.trend} />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onSeeMore}
            className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white transition-colors duration-250 hover:bg-brand-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light focus-visible:ring-offset-2"
          >
            {homeMessages.finance.seeMore[locale]}
          </button>
          <p className="text-xs text-neutral-900/60">
            Atualizado às{' '}
            {new Intl.DateTimeFormat(locale === 'pt' ? 'pt-BR' : 'en-US', {
              hour: '2-digit',
              minute: '2-digit',
            }).format(new Date())}
          </p>
        </div>
      </div>
    </section>
  );
});

const Sparkline = memo(function Sparkline({ trend }: { trend: number[] }) {
  const max = Math.max(...trend);
  const min = Math.min(...trend);
  const points = trend
    .map((value, index) => {
      const x = (index / (trend.length - 1)) * 100;
      const normalized = (value - min) / (max - min || 1);
      const y = 100 - normalized * 80 - 10;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="reduced-motion:animate-none animate-pulse-balance rounded-2xl bg-brand/5 p-4">
      <svg
        role="img"
        aria-label="Histórico do saldo do condomínio"
        className="h-20 w-full text-brand-light"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <polyline
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          strokeLinejoin="round"
          strokeLinecap="round"
          points={points}
        />
        <defs>
          <linearGradient id="sparklineGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(22,163,74,0.6)" />
            <stop offset="100%" stopColor="rgba(22,163,74,0.05)" />
          </linearGradient>
        </defs>
        <polygon
          fill="url(#sparklineGradient)"
          points={`${points} 100,100 0,100`}
          opacity={0.35}
        />
      </svg>
    </div>
  );
});
