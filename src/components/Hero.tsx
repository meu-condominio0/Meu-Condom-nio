import { useMemo, useState } from 'react';

import '../../styles/hero.css';

type HeroVariant = 'A' | 'B';

type HeroProps = {
  variant?: HeroVariant;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
};

const HEADLINES: Record<HeroVariant, string> = {
  A: 'Menos inadimplência, mais controle e síndico em paz.',
  B: 'Menos inadimplência, mais controle e síndico em paz.',
};

const SUMMARY_TABS = ['Mensal', 'Trimestral', 'Anual'] as const;

const SUMMARY_METRICS = [
  {
    label: 'Inadimplência',
    subtitle: 'Mensal',
    trend: '−35%',
    direction: 'down' as const,
    progress: 35,
    icon: 'alert',
  },
  {
    label: 'Caixa',
    subtitle: 'Mensal',
    trend: '+18%',
    direction: 'up' as const,
    progress: 72,
    icon: 'cash',
  },
  {
    label: 'Chamados resolvidos',
    subtitle: 'Mensal',
    trend: '+12%',
    direction: 'up' as const,
    progress: 88,
    icon: 'ticket',
  },
];

const RESOLUTION_RATE = {
  label: 'Taxa de resolução',
  value: '98% dos chamados resolvidos',
  progress: 98,
  insight: 'Você está melhor que 86% dos condomínios da base.',
};

const PROOF_COPY = '+450 condomínios • NPS 86 • Suporte 7x12';

function dispatchCtaEvent(id: 'primary' | 'demo') {
  if (typeof window === 'undefined') return;

  window.dispatchEvent(new CustomEvent('cta:click', { detail: { id } }));
}

export default function Hero({ variant = 'A', onPrimaryClick, onSecondaryClick }: HeroProps) {
  const [activeTab, setActiveTab] = useState<(typeof SUMMARY_TABS)[number]>('Mensal');
  const headline = HEADLINES[variant];
  const summaryTitle = useMemo(() => `Resumo do condomínio — ${activeTab}`, [activeTab]);

  return (
    <section
      className="hero-with-bg relative overflow-hidden py-16 text-[color:var(--mc-white)]"
      aria-labelledby="hero-heading"
    >
      <div className="hero-overlay" aria-hidden />

      <div className="hero-content relative z-10 mx-auto grid max-w-6xl items-start gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:px-8">
        <div className="hero-body mx-auto flex w-full max-w-2xl flex-col gap-8 lg:mx-0">
          <header className="flex flex-col gap-4">
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-[color:var(--mc-primary)]">
              {PROOF_COPY}
            </span>
            <div className="space-y-2">
              <h1
                id="hero-heading"
                className="hero-headline text-3xl font-bold leading-tight tracking-tight text-[color:var(--mc-white)] transition-colors duration-200 sm:text-4xl lg:text-5xl"
              >
                {headline}
              </h1>
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--mc-white-soft)] transition-transform duration-200 hover:translate-x-0.5">
                <span
                  className="flex h-2.5 w-2.5 items-center justify-center rounded-full bg-[color:var(--mc-success)] shadow-inner shadow-[color:rgba(21,41,31,0.25)]"
                  aria-hidden
                />
                Marketplace integrado ao financeiro para monetizar o condomínio.
              </p>
            </div>
            <p className="text-lg leading-relaxed text-[color:var(--mc-white)] opacity-90">
              Redução real da inadimplência, financeiro automatizado, assembleia digital sem dor de cabeça e marketplace pronto
              para serviços.
            </p>
          </header>

          <div className="block w-full max-w-2xl lg:hidden">
            <img
              src="/assets/marketing/hero-mobile.png"
              alt="Resumo visual do condomínio em versão mobile"
              className="w-full max-h-80 rounded-xl border border-[color:rgba(15,23,42,0.08)] bg-[color:rgba(233,233,233,0.92)] object-cover shadow-[0_18px_35px_rgba(21,41,31,0.18)]"
              loading="lazy"
            />
          </div>

          <div className="hero-cta-group flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <button
              type="button"
              data-cta="primary"
              aria-label="Começar agora com avaliação gratuita de 14 dias"
              onClick={() => {
                dispatchCtaEvent('primary');
                onPrimaryClick?.();
              }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[color:var(--mc-secondary-dark)] px-10 py-4 text-base font-semibold text-[color:var(--mc-white)] shadow-lg shadow-[color:rgba(21,41,31,0.28)] transition duration-200 hover:-translate-y-0.5 hover:bg-[color:var(--mc-secondary)] hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[color:rgba(163,177,138,0.55)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:rgba(21,41,31,0.3)] sm:w-auto sm:min-w-[260px] sm:text-lg"
            >
              Começar agora — 14 dias grátis
            </button>
            <button
              type="button"
              data-cta="demo"
              aria-label="Ver demonstração do MeuCondomínio em 3 minutos"
              onClick={() => {
                dispatchCtaEvent('demo');
                onSecondaryClick?.();
              }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-[color:rgba(233,233,233,0.65)] bg-[color:var(--mc-white-soft)] px-7 py-3 text-base font-semibold text-[color:var(--mc-secondary-dark)] shadow-sm shadow-[color:rgba(21,41,31,0.14)] transition duration-200 hover:-translate-y-0.5 hover:border-[color:rgba(52,78,65,0.35)] hover:text-[color:var(--mc-secondary)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[color:rgba(163,177,138,0.45)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--mc-secondary-dark)] sm:w-auto sm:min-w-[220px]"
            >
              <svg aria-hidden="true" className="h-5 w-5 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 3.75c0-1.04 1.16-1.67 2.03-1.1l8.1 5.47c.78.52.78 1.63 0 2.15l-8.1 5.47C6.16 16.32 5 15.7 5 14.66V3.75Z" />
              </svg>
              <span>Ver demonstração em 3 min</span>
            </button>
          </div>

          <MarketplaceHighlight />
        </div>

        <div className="relative mx-auto flex w-full max-w-xl flex-col gap-6">
          <CondoSummaryCard title={summaryTitle} activeTab={activeTab} onTabChange={setActiveTab} />

          <div className="hidden lg:block">
            <img
              src="/assets/marketing/hero-desktop.png"
              alt="Resumo visual do condomínio com métricas"
              className="w-full max-h-[520px] rounded-2xl border border-[color:rgba(15,23,42,0.08)] bg-[color:rgba(233,233,233,0.92)] object-contain shadow-[0_18px_35px_rgba(21,41,31,0.18)]"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

type CondoSummaryProps = {
  title: string;
  activeTab: (typeof SUMMARY_TABS)[number];
  onTabChange: (tab: (typeof SUMMARY_TABS)[number]) => void;
};

function CondoSummaryCard({ title, activeTab, onTabChange }: CondoSummaryProps) {
  return (
    <div className="relative mx-auto flex w-full max-w-xl flex-col gap-5 rounded-2xl border border-[color:rgba(52,78,65,0.16)] bg-[color:rgba(233,233,233,0.92)] p-6 shadow-2xl shadow-[color:rgba(21,41,31,0.18)] backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-[color:rgba(21,41,31,0.24)]">
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-[color:rgba(163,177,138,0.2)] via-[color:rgba(233,233,233,0.4)] to-[color:rgba(52,78,65,0.1)]"
        aria-hidden
      />
      <div className="relative flex flex-col gap-4">
        <header className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[color:var(--mc-secondary)]">Visão consolidada</p>
              <h2 className="text-xl font-bold text-[color:var(--mc-secondary-dark)]">{title}</h2>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[color:var(--mc-white-soft)] px-3 py-1 text-xs font-semibold text-[color:var(--mc-secondary)] ring-1 ring-[color:rgba(52,78,65,0.16)] shadow-sm shadow-[color:rgba(21,41,31,0.12)]">
              <span className="h-2 w-2 rounded-full bg-[color:var(--mc-success)]" aria-hidden />
              Atualizado
            </span>
          </div>
          <nav className="flex items-center gap-2" aria-label="Selecionar período do resumo do condomínio">
            {SUMMARY_TABS.map((tab) => {
              const isActive = tab === activeTab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => onTabChange(tab)}
                  className={`rounded-full px-3 py-1 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--mc-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--mc-white)] ${
                    isActive
                      ? 'bg-[color:var(--mc-secondary-dark)] text-[color:var(--mc-white)] shadow-sm shadow-[color:rgba(21,41,31,0.24)]'
                      : 'bg-[color:var(--mc-white)] text-[color:var(--mc-secondary)] ring-1 ring-[color:rgba(52,78,65,0.16)] hover:-translate-y-0.5 hover:shadow-sm hover:shadow-[color:rgba(21,41,31,0.12)]'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </nav>
        </header>

        <div className="grid gap-4 sm:grid-cols-2">
          {SUMMARY_METRICS.map((metric) => (
            <MetricCard key={metric.label} metric={metric} />
          ))}
        </div>

        <ResolutionCard />
      </div>
    </div>
  );
}

type MetricCardProps = {
  metric: (typeof SUMMARY_METRICS)[number];
};

function MetricCard({ metric }: MetricCardProps) {
  const isPositive = metric.direction === 'up';
  const chipClass = isPositive
    ? 'bg-[color:rgba(97,225,110,0.15)] text-[color:var(--mc-secondary-dark)] ring-1 ring-[color:rgba(97,225,110,0.3)]'
    : 'bg-[color:rgba(255,137,137,0.18)] text-[color:var(--mc-secondary-dark)] ring-1 ring-[color:rgba(255,137,137,0.35)]';

  return (
    <article className="group relative overflow-hidden rounded-xl border border-[color:rgba(52,78,65,0.16)] bg-[color:rgba(233,233,233,0.96)] p-4 shadow-sm shadow-[color:rgba(21,41,31,0.12)] transition duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[color:rgba(21,41,31,0.2)] focus-within:ring-2 focus-within:ring-[color:var(--mc-primary)]">
      <div
        className="absolute inset-0 bg-gradient-to-br from-[color:rgba(163,177,138,0.14)] via-[color:rgba(233,233,233,0.25)] to-[color:rgba(52,78,65,0.12)] opacity-0 transition duration-200 group-hover:opacity-100"
        aria-hidden
      />
      <div className="relative flex items-start gap-3">
        <IconWrapper name={metric.icon} />
        <div className="flex-1 space-y-1">
          <p className="text-sm font-semibold text-[color:var(--mc-secondary-dark)]">{metric.label}</p>
          <p className="text-xs text-[color:var(--mc-secondary-1)]">{metric.subtitle}</p>
          <p className="text-[0.75rem] text-[color:var(--mc-secondary-1)]">Comparado ao mês anterior</p>
        </div>
        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-sm font-semibold ${chipClass}`}>
          {metric.trend}
        </span>
      </div>

      <div className="mt-3 h-2.5 rounded-full bg-[color:rgba(233,233,233,0.8)]" aria-hidden="true">
        <div className="h-full rounded-full bg-gradient-to-r from-[color:var(--mc-secondary-light)] to-[color:var(--mc-primary)]" style={{ width: `${metric.progress}%` }} />
      </div>
    </article>
  );
}

type IconWrapperProps = {
  name: (typeof SUMMARY_METRICS)[number]['icon'];
};

function IconWrapper({ name }: IconWrapperProps) {
  return (
    <span className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--mc-white-soft)] text-[color:var(--mc-secondary)] shadow-inner shadow-[color:rgba(21,41,31,0.08)] ring-1 ring-[color:rgba(52,78,65,0.14)]">
      {name === 'alert' && (
        <svg aria-hidden className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 3h.01M10.29 3.86 2.82 17.14A1.5 1.5 0 0 0 4.12 19h15.76a1.5 1.5 0 0 0 1.3-2.28L13.7 3.86a1.5 1.5 0 0 0-2.58 0Z" />
        </svg>
      )}
      {name === 'cash' && (
        <svg aria-hidden className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 6.75A1.75 1.75 0 0 1 4.75 5h14.5A1.75 1.75 0 0 1 21 6.75v10.5A1.75 1.75 0 0 1 19.25 19H4.75A1.75 1.75 0 0 1 3 17.25V6.75Z" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 8.75h.01M7.5 8.75h.01m4.49-.7c-1.43 0-2.49.83-2.49 2.2 0 1.43.93 1.95 2.1 2.26.92.25 1.4.58 1.4 1.22 0 .7-.63 1.19-1.58 1.19-.84 0-1.6-.31-2.06-.84l-.39-.46m2.63-5.57v-.8"
          />
        </svg>
      )}
      {name === 'ticket' && (
        <svg aria-hidden className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.75h13.5a.5.5 0 0 1 .5.5v3a2.5 2.5 0 1 0 0 5v3a.5.5 0 0 1-.5.5H5.25a.5.5 0 0 1-.5-.5v-3a2.5 2.5 0 1 0 0-5v-3a.5.5 0 0 1 .5-.5Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12" />
        </svg>
      )}
    </span>
  );
}

function ResolutionCard() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-[color:rgba(52,78,65,0.16)] bg-gradient-to-br from-[color:var(--mc-secondary-dark)] via-[color:var(--mc-secondary)] to-[color:var(--mc-secondary-light)] p-5 text-[color:var(--mc-white)] shadow-inner shadow-[color:rgba(21,41,31,0.32)]">
      <div className="flex items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-[color:var(--mc-white-soft)] opacity-90">{RESOLUTION_RATE.label}</p>
          <p className="text-2xl font-bold leading-tight">{RESOLUTION_RATE.value}</p>
        </div>
        <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">SLA 7x12</span>
      </div>
      <div className="mt-4 h-3 rounded-full bg-[color:rgba(21,41,31,0.4)]" aria-label="Taxa de resolução">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[color:var(--mc-primary)] via-[color:var(--mc-white)] to-[color:var(--mc-white-soft)] shadow-sm shadow-[color:rgba(21,41,31,0.25)]"
          style={{ width: `${RESOLUTION_RATE.progress}%` }}
        />
      </div>
      <p className="mt-3 text-sm text-[color:var(--mc-white)] opacity-90">{RESOLUTION_RATE.insight}</p>
    </div>
  );
}

function MarketplaceHighlight() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[color:rgba(52,78,65,0.16)] bg-[color:rgba(233,233,233,0.96)] p-4 shadow-sm shadow-[color:rgba(21,41,31,0.12)] ring-1 ring-[color:rgba(52,78,65,0.14)] transition duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[color:rgba(21,41,31,0.2)]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-[color:var(--mc-secondary-dark)] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[color:var(--mc-white)] shadow-sm shadow-[color:rgba(21,41,31,0.24)]">
            <span className="h-2 w-2 rounded-full bg-white" aria-hidden />
            Novo marketplace
          </div>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-[color:var(--mc-secondary-dark)]">Marketplace dentro do condomínio</p>
            <p className="text-sm text-[color:var(--mc-secondary-1)]">
              Conecte moradores, prestadores e financeiro sem sair do app.
            </p>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-start gap-2 text-sm font-semibold text-[color:var(--mc-secondary)] sm:justify-end sm:pl-4">
          {['Serviços rápidos', 'Manutenção recorrente', 'Lojas locais'].map((service) => (
            <span
              key={service}
              className="inline-flex items-center gap-2 rounded-xl bg-[color:var(--mc-white-soft)] px-3 py-2 text-[color:var(--mc-secondary)] shadow-inner shadow-[color:rgba(21,41,31,0.08)] ring-1 ring-[color:rgba(52,78,65,0.14)] transition duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-[color:rgba(21,41,31,0.16)]"
            >
              <svg aria-hidden className="h-4 w-4" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.25 8 13.75 15.5 6.75" />
              </svg>
              {service}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
