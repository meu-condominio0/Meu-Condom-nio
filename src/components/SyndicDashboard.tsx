import { useEffect, useMemo, useState } from 'react';

const KPI_DATA = [
  {
    label: 'Inadimplência',
    value: '5,4%',
    change: '-1,2% vs mês anterior',
    trend: 'down' as const,
  },
  {
    label: 'Caixa',
    value: 'R$ 284k',
    change: '+18% de crescimento',
    trend: 'up' as const,
  },
  {
    label: 'Chamados em aberto',
    value: '12',
    change: '4 com prazo para hoje',
    trend: 'neutral' as const,
  },
  {
    label: 'Taxa de resolução',
    value: '92%',
    change: '+6% vs último mês',
    trend: 'up' as const,
  },
];

const ALERTS = [
  {
    id: 1,
    title: 'Boleto de água vencendo em 2 dias',
    type: 'Financeiro',
    priority: 'Alta',
    icon: '💧',
  },
  {
    id: 2,
    title: 'Elevador Torre B em manutenção programada',
    type: 'Manutenção',
    priority: 'Média',
    icon: '🛠️',
  },
  {
    id: 3,
    title: 'Reserva do salão de festas pendente de aprovação',
    type: 'Operação',
    priority: 'Baixa',
    icon: '📅',
  },
];

const EVENTS = [
  {
    id: 1,
    title: 'Assembleia Ordinária',
    date: '15 Ago, 19h',
    description: 'Prestação de contas e aprovação de orçamento 2024',
  },
  {
    id: 2,
    title: 'Manutenção preventiva gerador',
    date: '18 Ago, 09h',
    description: 'Teste de carga e troca de filtros',
  },
  {
    id: 3,
    title: 'Reunião com conselho',
    date: '22 Ago, 20h',
    description: 'Alinhamento sobre obras na área comum',
  },
];

const ACTIVITIES = [
  {
    id: 1,
    time: '08:15',
    user: 'Camila Barbosa',
    action: 'abriu chamado de vazamento na garagem',
  },
  {
    id: 2,
    time: '09:42',
    user: 'João e Maria 1204',
    action: 'pagaram boleto de condomínio',
  },
  {
    id: 3,
    time: '10:20',
    user: 'Portaria',
    action: 'registrou entrada de prestador de serviços',
  },
  {
    id: 4,
    time: '13:05',
    user: 'Reserva coberta 2',
    action: 'confirmou reserva da churrasqueira',
  },
];

type Trend = 'up' | 'down' | 'neutral';

type KpiCardProps = {
  label: string;
  value: string;
  change: string;
  trend: Trend;
  loading?: boolean;
};

function TrendBadge({ trend }: { trend: Trend }) {
  const trendMap = useMemo(
    () => ({
      up: {
        label: 'Positivo',
        className: 'bg-emerald-50 text-emerald-800 border-emerald-100',
        icon: '▲',
      },
      down: {
        label: 'Atenção',
        className: 'bg-amber-50 text-amber-800 border-amber-100',
        icon: '▼',
      },
      neutral: {
        label: 'Estável',
        className: 'bg-slate-50 text-slate-700 border-slate-100',
        icon: '■',
      },
    }),
    []
  );

  const { label, className, icon } = trendMap[trend];

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${className}`}
      aria-label={`Tendência ${label}`}
    >
      <span aria-hidden>{icon}</span>
      {label}
    </span>
  );
}

function KpiCard({ label, value, change, trend, loading }: KpiCardProps) {
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    if (!loading) {
      setHighlight(true);
      const timeout = setTimeout(() => setHighlight(false), 600);
      return () => clearTimeout(timeout);
    }
  }, [value, loading]);

  if (loading) {
    return (
      <article className="rounded-2xl border border-emerald-50/80 bg-white/80 p-4 shadow-sm shadow-emerald-900/5 backdrop-blur dark:border-emerald-500/10 dark:bg-emerald-950/40">
        <div className="flex items-center justify-between gap-2 animate-pulse">
          <div className="space-y-2">
            <div className="h-3 w-24 rounded-full bg-emerald-100 dark:bg-emerald-800/60" />
            <div className="h-8 w-20 rounded-full bg-emerald-200 dark:bg-emerald-800/70" />
          </div>
          <div className="h-8 w-16 rounded-full bg-emerald-100 dark:bg-emerald-800/60" />
        </div>
        <div className="mt-4 h-3 w-32 animate-pulse rounded-full bg-emerald-100 dark:bg-emerald-800/60" />
      </article>
    );
  }

  return (
    <article
      className={`group rounded-2xl border border-emerald-50/80 bg-white/80 p-4 shadow-sm shadow-emerald-900/5 backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:shadow-lg dark:border-emerald-500/10 dark:bg-emerald-950/40 ${highlight ? 'translate-y-[-2px] scale-[1.01] shadow-lg shadow-emerald-900/10' : ''}`}
    >
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-emerald-900 transition-opacity duration-300 dark:text-emerald-50" aria-live="polite">
            {label}
          </p>
          <p className={`mt-1 text-3xl font-bold text-emerald-800 transition-all duration-500 dark:text-emerald-100 ${highlight ? 'scale-105 text-emerald-700 dark:text-emerald-50' : ''}`} aria-live="polite">
            {value}
          </p>
        </div>
        <TrendBadge trend={trend} />
      </div>
      <p className="mt-3 text-sm text-slate-600 transition-opacity duration-300 dark:text-emerald-50/80" aria-live="polite">
        {change}
      </p>
    </article>
  );
}

type AlertListProps = {
  items: typeof ALERTS;
  loading?: boolean;
};

function AlertList({ items, loading }: AlertListProps) {
  if (loading) {
    return (
      <article className="flex flex-col gap-4 rounded-2xl border border-emerald-50/80 bg-white/90 p-5 shadow-sm shadow-emerald-900/5 dark:border-emerald-500/10 dark:bg-emerald-950/40">
        <div className="flex items-center justify-between gap-3 animate-pulse">
          <div className="space-y-2">
            <div className="h-4 w-40 rounded-full bg-emerald-100 dark:bg-emerald-800/60" />
            <div className="h-3 w-56 rounded-full bg-emerald-100 dark:bg-emerald-800/50" />
          </div>
          <div className="h-7 w-20 rounded-full bg-emerald-100 dark:bg-emerald-800/60" />
        </div>

        <ul className="space-y-3">
          {[...Array(3)].map((_, index) => (
            <li key={index} className="flex items-start gap-3 rounded-xl border border-emerald-100/60 bg-emerald-50/50 p-3 shadow-inner shadow-emerald-900/5 dark:border-emerald-500/20 dark:bg-emerald-900/60">
              <span className="mt-0.5 h-9 w-9 rounded-full bg-white dark:bg-emerald-800" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-48 rounded-full bg-emerald-100 dark:bg-emerald-800/60" />
                <div className="h-3 w-24 rounded-full bg-emerald-100 dark:bg-emerald-800/60" />
              </div>
              <span className="h-6 w-16 rounded-full bg-amber-100 dark:bg-amber-500/30" />
            </li>
          ))}
        </ul>
      </article>
    );
  }

  if (!items.length) {
    return (
      <article className="flex flex-col gap-4 rounded-2xl border border-dashed border-emerald-100 bg-white/90 p-5 text-center shadow-sm shadow-emerald-900/5 dark:border-emerald-500/30 dark:bg-emerald-950/30">
        <div className="flex flex-col items-center gap-2 text-emerald-800 dark:text-emerald-50">
          <span className="text-3xl">🧘‍♀️</span>
          <h3 className="text-lg font-semibold">Nenhum alerta crítico</h3>
          <p className="text-sm text-emerald-700/80 dark:text-emerald-100/80">Tudo sob controle por enquanto.</p>
        </div>
      </article>
    );
  }

  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-emerald-50/80 bg-white/90 p-5 shadow-sm shadow-emerald-900/5 dark:border-emerald-500/10 dark:bg-emerald-950/40">
      <header className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-50">Atenções urgentes</h3>
          <p className="text-sm text-slate-600 dark:text-emerald-100/80">Priorize chamados críticos e pendências financeiras.</p>
        </div>
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase text-emerald-800 dark:bg-emerald-800/70 dark:text-emerald-100">
          {items.length} alertas
        </span>
      </header>

      <ul className="space-y-3">
        {items.map((alert) => (
          <li
            key={alert.id}
            className="flex items-start gap-3 rounded-xl border border-emerald-100/60 bg-emerald-50/50 p-3 text-sm text-emerald-900 shadow-inner shadow-emerald-900/5 dark:border-emerald-500/20 dark:bg-emerald-900/60 dark:text-emerald-50"
          >
            <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg shadow-sm shadow-emerald-900/10 dark:bg-emerald-800">
              {alert.icon}
            </span>
            <div className="flex-1 space-y-1">
              <p className="font-semibold">{alert.title}</p>
              <p className="text-xs text-emerald-800/80 dark:text-emerald-100/70">{alert.type}</p>
            </div>
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase text-amber-800 dark:bg-amber-500/20 dark:text-amber-100">
              {alert.priority}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}

type EventListProps = {
  events: typeof EVENTS;
  loading?: boolean;
};

function EventList({ events, loading }: EventListProps) {
  if (loading) {
    return (
      <article className="flex flex-col gap-4 rounded-2xl border border-emerald-50/80 bg-white/90 p-5 shadow-sm shadow-emerald-900/5 dark:border-emerald-500/10 dark:bg-emerald-950/40">
        <div className="flex items-center justify-between gap-3 animate-pulse">
          <div className="space-y-2">
            <div className="h-4 w-40 rounded-full bg-emerald-100 dark:bg-emerald-800/60" />
            <div className="h-3 w-56 rounded-full bg-emerald-100 dark:bg-emerald-800/50" />
          </div>
          <div className="h-7 w-16 rounded-full bg-emerald-100 dark:bg-emerald-800/60" />
        </div>

        <ul className="space-y-3">
          {[...Array(3)].map((_, index) => (
            <li key={index} className="flex items-start gap-3 rounded-xl border border-emerald-100/60 bg-emerald-50/50 p-3 shadow-inner shadow-emerald-900/5 dark:border-emerald-500/20 dark:bg-emerald-900/60">
              <div className="mt-0.5 h-9 w-9 rounded-full bg-white dark:bg-emerald-800" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-44 rounded-full bg-emerald-100 dark:bg-emerald-800/60" />
                <div className="h-3 w-32 rounded-full bg-emerald-100 dark:bg-emerald-800/60" />
              </div>
            </li>
          ))}
        </ul>
      </article>
    );
  }

  if (!events.length) {
    return (
      <article className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-emerald-100 bg-white/90 p-6 text-center shadow-sm shadow-emerald-900/5 dark:border-emerald-500/30 dark:bg-emerald-950/30">
        <span className="text-3xl" aria-hidden>
          📅
        </span>
        <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-50">Sem eventos futuros</h3>
        <p className="text-sm text-emerald-700/80 dark:text-emerald-100/80">Adicione assembleias ou manutenções para acompanhar aqui.</p>
      </article>
    );
  }

  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-emerald-50/80 bg-white/90 p-5 shadow-sm shadow-emerald-900/5 dark:border-emerald-500/10 dark:bg-emerald-950/40">
      <header className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-50">Próximos eventos</h3>
          <p className="text-sm text-slate-600 dark:text-emerald-100/80">Assembleias, manutenções e reuniões importantes.</p>
        </div>
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase text-emerald-800 dark:bg-emerald-800/70 dark:text-emerald-100">
          {events.length} itens
        </span>
      </header>

      <ul className="space-y-3">
        {events.map((event) => (
          <li
            key={event.id}
            className="flex items-start gap-3 rounded-xl border border-emerald-100/60 bg-emerald-50/50 p-3 text-sm text-emerald-900 shadow-inner shadow-emerald-900/5 transition duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-emerald-500/20 dark:bg-emerald-900/60 dark:text-emerald-50"
          >
            <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-semibold text-emerald-800 shadow-sm shadow-emerald-900/10 dark:bg-emerald-800 dark:text-emerald-50">
              {event.date}
            </div>
            <div className="flex-1 space-y-1">
              <p className="font-semibold">{event.title}</p>
              <p className="text-xs text-emerald-800/80 dark:text-emerald-100/70">{event.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}

type ActivityTimelineProps = {
  items: typeof ACTIVITIES;
  loading?: boolean;
};

function ActivityTimeline({ items, loading }: ActivityTimelineProps) {
  if (loading) {
    return (
      <article className="flex flex-col gap-4 rounded-2xl border border-emerald-50/80 bg-white/90 p-5 shadow-sm shadow-emerald-900/5 dark:border-emerald-500/10 dark:bg-emerald-950/40">
        <div className="space-y-2 animate-pulse">
          <div className="h-4 w-48 rounded-full bg-emerald-100 dark:bg-emerald-800/60" />
          <div className="h-3 w-64 rounded-full bg-emerald-100 dark:bg-emerald-800/50" />
        </div>
        <ol className="relative space-y-4 border-l border-emerald-100 pl-4 dark:border-emerald-800/60">
          {[...Array(4)].map((_, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="absolute -left-[9px] mt-1 h-3 w-3 rounded-full border-2 border-white bg-emerald-200 dark:border-emerald-950" aria-hidden />
              <div className="h-10 w-16 rounded-full bg-emerald-100 dark:bg-emerald-800/50" />
              <div className="flex-1 space-y-2 rounded-xl bg-emerald-50/60 p-3 shadow-inner shadow-emerald-900/5 dark:bg-emerald-900/60">
                <div className="h-3 w-40 rounded-full bg-emerald-100 dark:bg-emerald-800/60" />
                <div className="h-3 w-56 rounded-full bg-emerald-100 dark:bg-emerald-800/50" />
              </div>
            </li>
          ))}
        </ol>
      </article>
    );
  }

  if (!items.length) {
    return (
      <article className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-emerald-100 bg-white/90 p-6 text-center shadow-sm shadow-emerald-900/5 dark:border-emerald-500/30 dark:bg-emerald-950/30">
        <span className="text-3xl" aria-hidden>
          🔍
        </span>
        <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-50">Nenhuma atividade registrada</h3>
        <p className="text-sm text-emerald-700/80 dark:text-emerald-100/80">As atualizações aparecerão aqui assim que chegarem.</p>
      </article>
    );
  }

  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-emerald-50/80 bg-white/90 p-5 shadow-sm shadow-emerald-900/5 dark:border-emerald-500/10 dark:bg-emerald-950/40">
      <header className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-50">Atividades recentes</h3>
          <p className="text-sm text-slate-600 dark:text-emerald-100/80">Chamados, pagamentos e reservas em tempo real.</p>
        </div>
      </header>

      <ol className="relative space-y-4 border-l border-emerald-100 pl-4 dark:border-emerald-800/60">
        {items.map((item) => (
          <li key={item.id} className="flex items-start gap-3 transition duration-200 hover:-translate-y-0.5">
            <span className="absolute -left-[9px] mt-1 h-3 w-3 rounded-full border-2 border-white bg-emerald-500 shadow-sm shadow-emerald-900/20 dark:border-emerald-950" aria-hidden />
            <div className="flex h-10 w-16 items-center justify-center rounded-full bg-emerald-50 text-sm font-semibold text-emerald-800 shadow-sm shadow-emerald-900/10 dark:bg-emerald-800/60 dark:text-emerald-50">
              {item.time}
            </div>
            <div className="flex-1 rounded-xl bg-emerald-50/60 p-3 text-sm text-emerald-900 shadow-inner shadow-emerald-900/5 transition duration-300 hover:bg-emerald-50 dark:bg-emerald-900/60 dark:text-emerald-50">
              <p className="font-semibold">{item.user}</p>
              <p className="text-sm text-emerald-800/80 dark:text-emerald-100/70">{item.action}</p>
            </div>
          </li>
        ))}
      </ol>
    </article>
  );
}

export default function SyndicDashboard() {
  const [loading, setLoading] = useState(true);
  const [kpis, setKpis] = useState<typeof KPI_DATA>([]);
  const [alerts, setAlerts] = useState<typeof ALERTS>([]);
  const [events, setEvents] = useState<typeof EVENTS>([]);
  const [activities, setActivities] = useState<typeof ACTIVITIES>([]);

  const currentMonth = useMemo(
    () =>
      new Intl.DateTimeFormat('pt-BR', {
        month: 'long',
        year: 'numeric',
      }).format(new Date()),
    []
  );

  useEffect(() => {
    const loadTimeout = setTimeout(() => {
      setKpis(KPI_DATA);
      setAlerts(ALERTS);
      setEvents(EVENTS);
      setActivities(ACTIVITIES);
      setLoading(false);
    }, 800);

    const updateTimeout = setTimeout(() => {
      setKpis((prev) =>
        prev.length
          ? prev.map((item) =>
              item.label === 'Caixa'
                ? { ...item, value: 'R$ 291k', change: '+21% de crescimento' }
                : item
            )
          : prev
      );
    }, 2600);

    return () => {
      clearTimeout(loadTimeout);
      clearTimeout(updateTimeout);
    };
  }, []);

  return (
    <section className="space-y-6 rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-emerald-100/60 p-6 shadow-lg shadow-emerald-900/5 dark:from-emerald-950 dark:via-emerald-900 dark:to-emerald-900">
      <header className="flex flex-col gap-4 rounded-2xl border border-emerald-100/70 bg-white/80 p-5 shadow-sm shadow-emerald-900/5 backdrop-blur dark:border-emerald-500/20 dark:bg-emerald-950/40 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-200">Painel do síndico</p>
          <h2 className="text-2xl font-bold text-emerald-900 dark:text-emerald-50">Condomínio Reserva do Lago</h2>
          <p className="text-sm text-slate-600 dark:text-emerald-100/80">Visão consolidada do condomínio e principais indicadores.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800 shadow-inner shadow-emerald-900/5 dark:bg-emerald-800/60 dark:text-emerald-50">
            Período: {currentMonth}
          </span>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-900 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-emerald-900/20 transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-900/10 dark:bg-emerald-600"
          >
            Ver relatório completo
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {(loading ? KPI_DATA : kpis).map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} loading={loading} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AlertList items={alerts} loading={loading} />
        </div>
        <div className="lg:col-span-1">
          <EventList events={events} loading={loading} />
        </div>
      </div>

      <ActivityTimeline items={activities} loading={loading} />
    </section>
  );
}
