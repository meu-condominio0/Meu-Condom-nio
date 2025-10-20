import {
  lazy,
  memo,
  Suspense,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Topbar } from './Topbar';
import { QuickActions } from './QuickActions';
import { ReservationsCard } from './ReservationsCard';
import { QrModal } from './QrModal';
import { BottomNav } from './BottomNav';
import { homeMessages, LocaleKey } from './messages';
import { HomeContent } from './types';
import data from '../../__mocks__/homeData';
import { FinanceCard as FinanceCardEager } from './FinanceCard';
import { NewsFeed as NewsFeedEager } from './NewsFeed';

const FinanceCardLazy = lazy(() => import('./FinanceCard').then((module) => ({ default: module.FinanceCard })));
const NewsFeedLazy = lazy(() => import('./NewsFeed').then((module) => ({ default: module.NewsFeed })));

interface HomeProps {
  locale?: LocaleKey;
  initialData?: HomeContent;
}

const useHomeData = (initialData?: HomeContent) => {
  const [status, setStatus] = useState<'loading' | 'error' | 'ready'>('loading');
  const [content, setContent] = useState<HomeContent | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const timer = window.setTimeout(() => {
      if (!isMounted) return;
      try {
        setContent(initialData ?? data);
        setStatus('ready');
      } catch (error) {
        console.error(error);
        setStatus('error');
      }
    }, 300);

    return () => {
      isMounted = false;
      window.clearTimeout(timer);
    };
  }, [initialData, attempt]);

  const retry = () => {
    setStatus('loading');
    setContent(null);
    setAttempt((prev) => prev + 1);
  };

  return { status, content, retry };
};

export const Home = memo(function Home({ locale = 'pt', initialData }: HomeProps) {
  const { content, status, retry } = useHomeData(initialData);
  const [isQrOpen, setQrOpen] = useState(false);

  const quickActionsStatus: 'loading' | 'error' | 'empty' | 'ready' =
    status === 'loading' ? 'loading' : !content?.quickActions.length ? 'empty' : status === 'error' ? 'error' : 'ready';

  const newsStatus: 'loading' | 'error' | 'empty' | 'ready' =
    status === 'loading' ? 'loading' : !content?.news.length ? 'empty' : status === 'error' ? 'error' : 'ready';

  const reservations = useMemo(() => content?.reservations ?? [], [content]);

  return (
    <div className="min-h-screen bg-[color:var(--bg)] pb-20 text-white">
      <Topbar
        name={content?.user.name ?? '...'}
        avatarUrl={content?.user.avatarUrl ?? 'https://i.pravatar.cc/120'}
        locale={locale}
      />
      <main className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="space-y-6">
          <Suspense fallback={<PlaceholderCard title="{finance}" />}>
            {content?.finance && status === 'ready' ? (
              <FinanceCardLazy
                summary={content.finance}
                locale={locale}
                onSeeMore={() => console.info('See finance details')}
              />
            ) : (
              <PlaceholderCard title="{finance}" />
            )}
          </Suspense>
          <ReservationsCard
            reservations={reservations}
            locale={locale}
            onSchedule={() => console.info('Schedule area')}
          />
        </div>
        <div className="space-y-6">
          <QuickActions
            actions={content?.quickActions ?? []}
            locale={locale}
            status={quickActionsStatus}
            onRetry={retry}
          />
          <Suspense fallback={<PlaceholderCard title="{news}" />}>
            <NewsFeedLazy
              items={content?.news ?? []}
              locale={locale}
              status={newsStatus}
              onRetry={retry}
            />
          </Suspense>
        </div>
        <aside className="space-y-6">
          <button
            type="button"
            onClick={() => setQrOpen(true)}
            className="flex w-full flex-col gap-3 rounded-3xl bg-card/90 p-6 text-left text-neutral-900 shadow-xl shadow-black/20 transition-all duration-250 hover:-translate-y-1 hover:shadow-black/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light focus-visible:ring-offset-2"
          >
            <span className="text-sm font-semibold uppercase tracking-widest text-brand">
              {homeMessages.qr[locale]}
            </span>
            <p className="text-lg font-semibold text-neutral-900">Gerar novo QR code</p>
            <p className="text-sm text-neutral-900/70">
              Compartilhe com visitantes ou prestadores para agilizar a entrada.
            </p>
            <span className="inline-flex w-fit items-center rounded-full bg-brand px-4 py-1 text-xs font-semibold text-white">
              {homeMessages.qr.open[locale]}
            </span>
          </button>
          <div className="rounded-3xl bg-card/80 p-6 text-neutral-900 shadow-xl shadow-black/15">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-brand">
              Variante A
            </h3>
            <p className="mt-2 text-sm text-neutral-900/70">
              Layout completo com microinterações, sombras suaves, animações no saldo e carregamento lazy dos widgets.
            </p>
          </div>
        </aside>
      </main>
      <BottomNav active="home" />
      <QrModal open={isQrOpen} onClose={() => setQrOpen(false)} locale={locale} />
    </div>
  );
});

interface PlaceholderCardProps {
  title: '{finance}' | '{news}';
}

const PlaceholderCard = ({ title }: PlaceholderCardProps) => (
  <div className="flex h-64 flex-col justify-between rounded-3xl bg-card/20 p-6">
    <div className="space-y-4">
      <div className="h-4 w-20 rounded-full bg-card/30" />
      <div className="h-6 w-32 rounded-full bg-card/20" />
      <div className="space-y-2">
        <div className="h-3 w-full rounded-full bg-card/10" />
        <div className="h-3 w-2/3 rounded-full bg-card/10" />
      </div>
    </div>
    <div className="h-24 rounded-2xl bg-card/10" />
    <span className="text-xs uppercase tracking-widest text-card/40">{title}</span>
  </div>
);

export const HomeLite = memo(function HomeLite({ locale = 'pt', initialData }: HomeProps) {
  const content = initialData ?? data;
  const [isQrOpen, setQrOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[color:var(--bg)] pb-20 text-white">
      <Topbar
        name={content.user.name}
        avatarUrl={content.user.avatarUrl}
        locale={locale}
      />
      <main className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-6">
        <QuickActions actions={content.quickActions} locale={locale} />
        <div className="grid gap-6 md:grid-cols-2">
          <FinanceCardEager summary={content.finance} locale={locale} onSeeMore={() => undefined} />
          <ReservationsCard reservations={content.reservations} locale={locale} onSchedule={() => undefined} />
        </div>
        <NewsFeedEager items={content.news} locale={locale} />
        <div className="rounded-3xl bg-card/80 p-6 text-neutral-900 shadow-lg">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-brand">Variante B</h3>
          <p className="mt-2 text-sm text-neutral-900/70">
            Interface enxuta sem lazy loading, ícones extras ou animações para reduzir o bundle.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setQrOpen(true)}
          className="rounded-3xl bg-card/80 p-6 text-left text-neutral-900 shadow-lg"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-brand">
            {homeMessages.qr[locale]}
          </span>
          <p className="mt-2 text-sm text-neutral-900/70">
            Abrir QR code do visitante
          </p>
        </button>
      </main>
      <BottomNav active="home" />
      <QrModal open={isQrOpen} onClose={() => setQrOpen(false)} locale={locale} />
    </div>
  );
});

export default Home;
