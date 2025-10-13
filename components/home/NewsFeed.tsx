import { memo } from 'react';
import { homeMessages, LocaleKey } from './messages';
import { NewsItem } from './types';
import { MessageIcon } from './icons';

interface NewsFeedProps {
  items: NewsItem[];
  locale?: LocaleKey;
  status?: 'loading' | 'error' | 'empty' | 'ready';
  onRetry?: () => void;
  onComment?: (id: string) => void;
}

export const NewsFeed = memo(function NewsFeed({
  items,
  locale = 'pt',
  status = 'ready',
  onRetry,
  onComment,
}: NewsFeedProps) {
  const title = homeMessages.news[locale];
  const commentLabel = homeMessages.news.comment[locale];

  return (
    <section aria-labelledby="news-feed-title" className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 id="news-feed-title" className="text-lg font-semibold text-card">
          {title}
        </h2>
      </div>
      <div className="space-y-3">
        {status === 'loading' && <SkeletonLine />}
        {status === 'error' && (
          <div className="flex flex-col items-center gap-2 rounded-2xl bg-card/80 p-4 text-center text-sm text-card/80">
            <span>Não foi possível carregar os avisos.</span>
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
          <div className="rounded-2xl bg-card/80 p-6 text-center text-sm text-card/70">
            Nenhum aviso por aqui.
          </div>
        )}
        {status === 'ready' &&
          items.slice(0, 3).map((item) => (
            <article
              key={item.id}
              className="flex items-start gap-4 rounded-2xl bg-card/90 p-4 shadow-lg shadow-black/10 transition hover:shadow-black/20"
              aria-live={item.unread ? 'polite' : 'off'}
            >
              <span className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-brand">
                <MessageIcon className="h-5 w-5" />
              </span>
              <div className="flex flex-1 flex-col gap-2">
                <header className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-neutral-900">{item.title}</h3>
                  {item.unread && (
                    <span className="inline-flex items-center rounded-full bg-brand-light px-2 py-0.5 text-[0.65rem] font-semibold text-primary">
                      Novo
                    </span>
                  )}
                </header>
                <p className="text-sm text-neutral-900/70">{item.description}</p>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-full border border-brand px-3 py-1 text-xs font-semibold text-brand transition-colors duration-250 hover:bg-brand hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light focus-visible:ring-offset-2"
                    onClick={() => onComment?.(item.id)}
                  >
                    {commentLabel}
                  </button>
                </div>
              </div>
            </article>
          ))}
      </div>
    </section>
  );
});

const SkeletonLine = () => (
  <div className="animate-pulse space-y-3 rounded-2xl bg-card/40 p-4">
    <div className="h-3 w-2/3 rounded-full bg-card/60" />
    <div className="h-3 w-11/12 rounded-full bg-card/50" />
    <div className="h-3 w-10/12 rounded-full bg-card/50" />
  </div>
);
