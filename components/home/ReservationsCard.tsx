import { memo, useMemo } from 'react';
import { homeMessages, LocaleKey } from './messages';
import { ReservationSlot } from './types';
import { CalendarIcon } from './icons';

interface ReservationsCardProps {
  reservations: ReservationSlot[];
  locale?: LocaleKey;
  onSchedule?: () => void;
}

const DAYS_TO_SHOW = 14;

export const ReservationsCard = memo(function ReservationsCard({
  reservations,
  locale = 'pt',
  onSchedule,
}: ReservationsCardProps) {
  const title = homeMessages.reservations[locale];
  const upcomingLabel = homeMessages.reservations.upcoming[locale];
  const ctaLabel = homeMessages.reservations.cta[locale];

  const days = useMemo(() => {
    const today = new Date();
    return Array.from({ length: DAYS_TO_SHOW }, (_, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() + index);
      return {
        date,
        formatted: new Intl.DateTimeFormat(locale === 'pt' ? 'pt-BR' : 'en-US', {
          day: '2-digit',
        }).format(date),
        key: date.toISOString().slice(0, 10),
      };
    });
  }, [locale]);

  const reservedDays = new Set(
    reservations.map((reservation) => reservation.date.split('T')[0]),
  );

  return (
    <section
      aria-labelledby="reservations-card-title"
      className="space-y-4 rounded-3xl bg-card/90 p-6 shadow-xl shadow-black/15"
    >
      <header className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand">
            {title}
          </p>
          <h3 id="reservations-card-title" className="text-lg font-semibold text-neutral-900">
            {upcomingLabel}
          </h3>
        </div>
        <span className="hidden md:flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-brand">
          <CalendarIcon className="h-5 w-5" />
        </span>
      </header>
      <div className="grid grid-cols-7 gap-2 text-center text-xs">
        {days.map(({ key, formatted, date }) => {
          const isReserved = reservedDays.has(key);
          const isToday = key === new Date().toISOString().slice(0, 10);
          return (
            <div
              key={key}
              role="gridcell"
              aria-selected={isReserved}
              className={`flex h-12 flex-col items-center justify-center rounded-xl border transition-colors duration-250 ${
                isReserved
                  ? 'border-brand bg-brand-light text-primary'
                  : isToday
                  ? 'border-brand/40 text-brand'
                  : 'border-border text-neutral-900'
              }`}
            >
              <span className="text-[0.65rem] uppercase tracking-widest">
                {new Intl.DateTimeFormat(locale === 'pt' ? 'pt-BR' : 'en-US', {
                  weekday: 'short',
                })
                  .format(date)
                  .replace('.', '')}
              </span>
              <span className="text-sm font-semibold">{formatted}</span>
            </div>
          );
        })}
      </div>
      <button
        type="button"
        onClick={onSchedule}
        className="w-full rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white transition-colors duration-250 hover:bg-brand-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light focus-visible:ring-offset-2"
      >
        {ctaLabel}
      </button>
    </section>
  );
});
