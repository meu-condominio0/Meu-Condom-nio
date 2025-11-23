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
      className="hero-with-bg relative overflow-hidden py-16 text-slate-900 dark:text-slate-100"
      aria-labelledby="hero-heading"
    >
      <div className="hero-overlay" aria-hidden />

      <div className="hero-content relative z-10 mx-auto grid max-w-6xl items-start gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:px-8">
        <div className="hero-body mx-auto flex w-full max-w-2xl flex-col gap-8 lg:mx-0">
          <header className="flex flex-col gap-4">
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-300">
              {PROOF_COPY}
            </span>
            <div className="space-y-2">
              <h1
                id="hero-heading"
                className="hero-headline text-3xl font-black leading-tight tracking-tight text-emerald-950 transition-colors duration-200 dark:text-emerald-100 sm:text-4xl lg:text-5xl"
              >
                {headline}
              </h1>
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 transition-transform duration-200 hover:translate-x-0.5 dark:text-emerald-200">
                <span
                  className="flex h-2.5 w-2.5 items-center justify-center rounded-full bg-emerald-400 shadow-inner shadow-emerald-900/20"
                  aria-hidden
                />
                Marketplace integrado ao financeiro para monetizar o condomínio.
              </p>
            </div>
            <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-200">
              Redução real da inadimplência, financeiro automatizado, assembleia digital sem dor de cabeça e marketplace pronto
              para serviços.
            </p>
          </header>

          <div className="hero-cta-group flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <button
              type="button"
              data-cta="primary"
              aria-label="Começar agora com avaliação gratuita de 14 dias"
              onClick={() => {
                dispatchCtaEvent('primary');
                onPrimaryClick?.();
              }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-900 px-10 py-4 text-base font-semibold text-white shadow-lg shadow-emerald-900/10 transition duration-200 hover:-translate-y-0.5 hover:bg-emerald-800 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-900/10 sm:w-auto sm:min-w-[260px] sm:text-lg"
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
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-emerald-200 bg-white/80 px-7 py-3 text-base font-semibold text-emerald-900 shadow-sm shadow-emerald-900/5 transition duration-200 hover:-translate-y-0.5 hover:border-emerald-600 hover:text-emerald-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:border-emerald-500/40 dark:bg-emerald-900/40 dark:text-emerald-200 dark:hover:border-emerald-300 dark:hover:text-emerald-100 dark:focus-visible:ring-offset-slate-950 sm:w-auto sm:min-w-[220px]"
            >
              <svg aria-hidden="true" className="h-5 w-5 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 3.75c0-1.04 1.16-1.67 2.03-1.1l8.1 5.47c.78.52.78 1.63 0 2.15l-8.1 5.47C6.16 16.32 5 15.7 5 14.66V3.75Z" />
              </svg>
              <span>Ver demonstração em 3 min</span>
            </button>
          </div>

          <MarketplaceHighlight />
        </div>

        <CondoSummaryCard title={summaryTitle} activeTab={activeTab} onTabChange={setActiveTab} />
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
    <div className="relative mx-auto flex w-full max-w-xl flex-col gap-5 rounded-2xl border border-emerald-100/70 bg-white/90 p-6 shadow-2xl shadow-emerald-900/10 backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-emerald-900/15 dark:border-emerald-500/20 dark:bg-emerald-900/40">
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-100/40 via-white/40 to-emerald-50/30 dark:from-emerald-700/20 dark:via-emerald-900/20 dark:to-emerald-800/20"
        aria-hidden
      />
      <div className="relative flex flex-col gap-4">
        <header className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-200">Visão consolidada</p>
              <h2 className="text-xl font-bold text-emerald-950 dark:text-emerald-50">{title}</h2>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100 shadow-sm shadow-emerald-900/10 dark:bg-emerald-800/60 dark:text-emerald-100 dark:ring-emerald-500/30">
              <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
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
                  className={`rounded-full px-3 py-1 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-emerald-900 ${
                    isActive
                      ? 'bg-emerald-900 text-white shadow-sm shadow-emerald-900/20'
                      : 'bg-white text-emerald-700 ring-1 ring-emerald-100 hover:-translate-y-0.5 hover:shadow-sm dark:bg-emerald-800/60 dark:text-emerald-50 dark:ring-emerald-500/30'
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
    ? 'bg-emerald-50 text-emerald-800 ring-1 ring-emerald-100'
    : 'bg-rose-50 text-rose-800 ring-1 ring-rose-100';

  return (
    <article className="group relative overflow-hidden rounded-xl border border-emerald-100/80 bg-white/95 p-4 shadow-sm shadow-emerald-900/10 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-within:ring-2 focus-within:ring-emerald-300 dark:border-emerald-500/20 dark:bg-emerald-950/60">
      <div
        className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-white/5 to-emerald-100/5 opacity-0 transition duration-200 group-hover:opacity-100 dark:from-emerald-500/5 dark:via-emerald-900/10 dark:to-emerald-700/10"
        aria-hidden
      />
      <div className="relative flex items-start gap-3">
        <IconWrapper name={metric.icon} />
        <div className="flex-1 space-y-1">
          <p className="text-sm font-semibold text-slate-800 dark:text-emerald-50">{metric.label}</p>
          <p className="text-xs text-slate-500 dark:text-emerald-200/80">{metric.subtitle}</p>
          <p className="text-[0.75rem] text-slate-500 dark:text-emerald-200/70">Comparado ao mês anterior</p>
        </div>
        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-sm font-semibold ${chipClass}`}>
          {metric.trend}
        </span>
      </div>

      <div className="mt-3 h-2.5 rounded-full bg-slate-100 dark:bg-emerald-800/50" aria-hidden="true">
        <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600" style={{ width: `${metric.progress}%` }} />
      </div>
    </article>
  );
}

type IconWrapperProps = {
  name: (typeof SUMMARY_METRICS)[number]['icon'];
};

function IconWrapper({ name }: IconWrapperProps) {
  return (
    <span className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 shadow-inner shadow-emerald-900/5 ring-1 ring-emerald-100 dark:bg-emerald-800/50 dark:text-emerald-50 dark:ring-emerald-500/30">
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
    <div className="relative overflow-hidden rounded-xl border border-emerald-100/80 bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700 p-5 text-emerald-50 shadow-inner shadow-emerald-900/40">
      <div className="flex items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-emerald-100/90">{RESOLUTION_RATE.label}</p>
          <p className="text-2xl font-bold leading-tight">{RESOLUTION_RATE.value}</p>
        </div>
        <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">SLA 7x12</span>
      </div>
      <div className="mt-4 h-3 rounded-full bg-emerald-950/40" aria-label="Taxa de resolução">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-300 via-emerald-200 to-emerald-50 shadow-sm shadow-emerald-900/20"
          style={{ width: `${RESOLUTION_RATE.progress}%` }}
        />
      </div>
      <p className="mt-3 text-sm text-emerald-50/85">{RESOLUTION_RATE.insight}</p>
    </div>
  );
}

function MarketplaceHighlight() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-emerald-100/80 bg-white/90 p-4 shadow-sm shadow-emerald-900/10 ring-1 ring-emerald-100 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg dark:border-emerald-500/30 dark:bg-emerald-900/40 dark:ring-emerald-500/20">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-900 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-sm shadow-emerald-900/20">
            <span className="h-2 w-2 rounded-full bg-white" aria-hidden />
            Novo marketplace
          </div>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-50">Marketplace dentro do condomínio</p>
            <p className="text-sm text-slate-600 dark:text-emerald-100/80">
              Conecte moradores, prestadores e financeiro sem sair do app.
            </p>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-start gap-2 text-sm font-semibold text-emerald-800 sm:justify-end sm:pl-4 dark:text-emerald-100">
          {['Serviços rápidos', 'Manutenção recorrente', 'Lojas locais'].map((service) => (
            <span
              key={service}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-emerald-800 shadow-inner shadow-emerald-900/5 ring-1 ring-emerald-100 transition duration-200 hover:-translate-y-0.5 hover:shadow-md dark:bg-emerald-800/50 dark:text-emerald-50 dark:ring-emerald-500/30"
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
