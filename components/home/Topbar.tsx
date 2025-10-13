import { memo } from 'react';
import { NotificationIcon } from './icons';
import { homeMessages, LocaleKey } from './messages';

interface TopbarProps {
  name: string;
  avatarUrl: string;
  locale?: LocaleKey;
  unreadCount?: number;
}

export const Topbar = memo(function Topbar({
  name,
  avatarUrl,
  locale = 'pt',
  unreadCount = 3,
}: TopbarProps) {
  const greetingTemplate = homeMessages.greeting[locale];
  const greeting = greetingTemplate.replace('{name}', name);

  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between bg-primary px-4 py-3 text-card shadow-lg shadow-black/40"
      role="banner"
    >
      <div className="flex items-center gap-3">
        <div className="relative h-11 w-11 overflow-hidden rounded-full border border-brand">
          <img
            src={avatarUrl}
            alt={greeting}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-light">
            {new Intl.DateTimeFormat(locale === 'pt' ? 'pt-BR' : 'en-US', {
              weekday: 'long',
            }).format(new Date())}
          </span>
          <p className="text-base font-medium text-card">{greeting}</p>
        </div>
      </div>
      <button
        type="button"
        className="relative flex h-11 w-11 items-center justify-center rounded-full bg-brand text-white transition-colors duration-250 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-primary hover:bg-brand-light"
        aria-label={homeMessages.notifications[locale]}
      >
        <NotificationIcon />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-brand-light px-1 text-xs font-semibold text-primary">
            {unreadCount}
          </span>
        )}
      </button>
    </header>
  );
});
