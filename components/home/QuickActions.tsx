import { memo } from 'react';
import { homeMessages, LocaleKey } from './messages';
import { QuickAction } from './types';
import { CalendarIcon, FileIcon, MegaphoneIcon, UsersIcon } from './icons';

const iconMap: Record<string, JSX.Element> = {
  reservations: <CalendarIcon className="text-brand" />,
  boletos: <FileIcon className="text-brand" />,
  news: <MegaphoneIcon className="text-brand" />,
  visitors: <UsersIcon className="text-brand" />,
};

interface QuickActionsProps {
  actions: QuickAction[];
  locale?: LocaleKey;
  status?: 'loading' | 'error' | 'empty' | 'ready';
  onRetry?: () => void;
}

export const QuickActions = memo(function QuickActions({
  actions,
  locale = 'pt',
  status = 'ready',
  onRetry,
}: QuickActionsProps) {
  const title = homeMessages.quickActions[locale];

  return (
    <section aria-labelledby="quick-actions-title" className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 id="quick-actions-title" className="text-lg font-semibold text-card">
          {title}
        </h2>
        {status !== 'ready' && (
          <span className="text-xs font-medium uppercase tracking-wide text-brand-light">
            {status === 'loading'
              ? '...'
              : status === 'error'
              ? 'Erro'
              : 'Sem itens'}
          </span>
        )}
      </div>
      <div
        className="grid grid-flow-col auto-cols-[minmax(11rem,1fr)] gap-4 overflow-x-auto rounded-2xl bg-[rgba(255,255,255,0.04)] p-4 sm:grid-flow-row sm:grid-cols-2 sm:overflow-visible"
        role="list"
        aria-live="polite"
      >
        {status === 'loading' && (
          <div className="col-span-full flex h-28 items-center justify-center">
            <span className="text-sm text-card/70">Carregando...</span>
          </div>
        )}
        {status === 'error' && (
          <div className="col-span-full flex flex-col items-center justify-center gap-2 text-center">
            <span className="text-sm text-card/80">Não foi possível carregar.</span>
            <button
              type="button"
              className="rounded-full border border-brand px-4 py-1 text-sm text-brand transition hover:bg-brand hover:text-white"
              onClick={onRetry}
            >
              Tentar novamente
            </button>
          </div>
        )}
        {status === 'empty' && (
          <div className="col-span-full flex h-28 items-center justify-center">
            <span className="text-sm text-card/70">Sem atalhos disponíveis.</span>
          </div>
        )}
        {status === 'ready' &&
          actions.map((action) => (
            <a
              key={action.id}
              href={action.href}
              role="listitem"
              className="group flex flex-col justify-between rounded-2xl bg-card p-4 shadow-lg shadow-black/10 transition-all duration-250 hover:-translate-y-1 hover:shadow-black/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-brand transition group-hover:bg-brand group-hover:text-white">
                {iconMap[action.icon] ?? <SparkPlaceholder />}
              </span>
              <div className="mt-4 space-y-1">
                <p className="text-sm font-semibold text-neutral-900">{action.title}</p>
                <p className="text-xs text-neutral-900/70">{action.description}</p>
              </div>
            </a>
          ))}
      </div>
    </section>
  );
});

const SparkPlaceholder = () => (
  <div className="text-brand">
    <svg
      aria-hidden
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2v4" />
      <path d="M12 18v4" />
      <path d="m19.778 7.222-3.536 3.536" />
      <path d="m7.758 15.242-3.536 3.536" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  </div>
);
