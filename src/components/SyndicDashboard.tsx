import { useMemo } from 'react';

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

function KpiCard({ label, value, change, trend }: KpiCardProps) {
  return (
    <article className="group rounded-2xl border border-emerald-50/80 bg-white/80 p-4 shadow-sm shadow-emerald-900/5 backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:shadow-lg dark:border-emerald-500/10 dark:bg-emerald-950/40">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-50">{label}</p>
          <p className="mt-1 text-3xl font-bold text-emerald-800 dark:text-emerald-100">{value}</p>
        </div>
        <TrendBadge trend={trend} />
      </div>
      <p className="mt-3 text-sm text-slate-600 dark:text-emerald-50/80">{change}</p>
    </article>
  );
}

type AlertListProps = {
  items: typeof ALERTS;
};

function AlertList({ items }: AlertListProps) {
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
};

function EventList({ events }: EventListProps) {
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
            className="flex items-start gap-3 rounded-xl border border-emerald-100/60 bg-emerald-50/50 p-3 text-sm text-emerald-900 shadow-inner shadow-emerald-900/5 dark:border-emerald-500/20 dark:bg-emerald-900/60 dark:text-emerald-50"
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
};

function ActivityTimeline({ items }: ActivityTimelineProps) {
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
          <li key={item.id} className="flex items-start gap-3">
            <span className="absolute -left-[9px] mt-1 h-3 w-3 rounded-full border-2 border-white bg-emerald-500 shadow-sm shadow-emerald-900/20 dark:border-emerald-950" aria-hidden />
            <div className="flex h-10 w-16 items-center justify-center rounded-full bg-emerald-50 text-sm font-semibold text-emerald-800 shadow-sm shadow-emerald-900/10 dark:bg-emerald-800/60 dark:text-emerald-50">
              {item.time}
            </div>
            <div className="flex-1 rounded-xl bg-emerald-50/60 p-3 text-sm text-emerald-900 shadow-inner shadow-emerald-900/5 dark:bg-emerald-900/60 dark:text-emerald-50">
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
  const currentMonth = useMemo(
    () =>
      new Intl.DateTimeFormat('pt-BR', {
        month: 'long',
        year: 'numeric',
      }).format(new Date()),
    []
  );

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
        {KPI_DATA.map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AlertList items={ALERTS} />
        </div>
        <div className="lg:col-span-1">
          <EventList events={EVENTS} />
        </div>
      </div>

      <ActivityTimeline items={ACTIVITIES} />
    </section>
  );
}
