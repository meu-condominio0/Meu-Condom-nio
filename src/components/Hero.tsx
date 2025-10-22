import Badge from './Badge';

type HeroVariant = 'A' | 'B';

type HeroProps = {
  variant?: HeroVariant;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
};

const HEADLINES: Record<HeroVariant, string> = {
  A: 'Seu condomínio 10x mais eficiente.',
  B: 'Gestão séria. Vida leve.',
};

const KPI_CARDS = [
  { label: 'Inadimplência', value: '−35%', trend: 'bg-rose-500/20 text-rose-600 dark:text-rose-300' },
  { label: 'Caixa', value: '+18%', trend: 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-300' },
  { label: 'Chamados resolvidos', value: '92%', trend: 'bg-sky-500/20 text-sky-600 dark:text-sky-300' },
];

const PROOF_COPY = '+450 condomínios • NPS 86 • Suporte 7x12';

function dispatchCtaEvent(id: 'primary' | 'demo') {
  if (typeof window === 'undefined') return;

  window.dispatchEvent(new CustomEvent('cta:click', { detail: { id } }));
}

export default function Hero({ variant = 'A', onPrimaryClick, onSecondaryClick }: HeroProps) {
  const headline = HEADLINES[variant];

  return (
    <section
      className="bg-slate-50 py-16 text-slate-900 dark:bg-slate-950 dark:text-slate-100"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-16 lg:px-8">
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 lg:mx-0">
          <div className="flex flex-col gap-4">
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-300">
              {PROOF_COPY}
            </span>
            <h1 id="hero-heading" className="text-4xl font-bold tracking-tight text-emerald-900 dark:text-emerald-100 sm:text-5xl">
              {headline}
            </h1>
            <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-200">
              Reduza a inadimplência em <span className="font-semibold text-emerald-700 dark:text-emerald-300">35%</span> e elimine{' '}
              <span className="font-semibold text-emerald-700 dark:text-emerald-300">40h/mês</span> de tarefas manuais com financeiro automatizado,
              assembleia digital e marketplace integrado.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <button
              type="button"
              data-cta="primary"
              aria-label="Começar agora com avaliação gratuita de 14 dias"
              onClick={() => {
                dispatchCtaEvent('primary');
                onPrimaryClick?.();
              }}
              className="inline-flex w-full items-center justify-center rounded-full bg-emerald-900 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-emerald-900/10 transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-900/10 sm:w-auto"
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
              className="inline-flex w-full items-center justify-center rounded-full border border-transparent px-6 py-3 text-base font-semibold text-emerald-900 transition hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:text-emerald-200 dark:hover:text-emerald-100 dark:focus-visible:ring-offset-slate-950 sm:w-auto"
            >
              <span>Ver demonstração em 3 min</span>
              <span aria-hidden="true" className="ml-2 text-lg">
                →
              </span>
            </button>
          </div>

          <div className="flex flex-col gap-3">
            <Badge className="w-fit bg-emerald-900 text-white shadow-sm shadow-emerald-900/10 dark:bg-emerald-500 dark:text-emerald-950">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-emerald-900 dark:bg-emerald-900 dark:text-emerald-100">
                Novo
              </span>
              Marketplace no condomínio: contrate serviços sem sair do app.
            </Badge>
          </div>
        </div>

        <div className="relative mx-auto flex w-full max-w-xl flex-col items-stretch justify-center gap-6 lg:mx-0">
          <div className="relative overflow-hidden rounded-2xl border border-white/40 bg-white/80 p-6 shadow-xl shadow-emerald-900/10 backdrop-blur-sm dark:border-emerald-500/10 dark:bg-emerald-900/40">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-emerald-400/10 to-emerald-900/30" aria-hidden="true" />
            <div className="relative flex flex-col gap-5">
              <div className="flex items-center justify-between text-sm font-medium text-emerald-900/80 dark:text-emerald-100/90">
                <span>Resumo do condomínio</span>
                <span>Atualizado agora</span>
              </div>
              <div className="grid gap-4">
                {KPI_CARDS.map((kpi) => (
                  <div key={kpi.label} className="flex items-center justify-between rounded-xl bg-white/80 px-4 py-3 text-left shadow-sm shadow-emerald-900/5 backdrop-blur-sm dark:bg-emerald-950/60">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-200">{kpi.label}</span>
                      <span className="text-xs text-slate-500 dark:text-slate-300">Mensal</span>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-sm font-semibold ${kpi.trend}`}>
                      {kpi.value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2 rounded-xl bg-emerald-900/90 p-4 text-emerald-50 shadow-inner shadow-emerald-900/40">
                <div className="flex items-center justify-between text-sm">
                  <span>Taxa de resolução</span>
                  <span className="font-semibold">98%</span>
                </div>
                <div className="h-2 rounded-full bg-emerald-700/60">
                  <div className="h-full w-[82%] rounded-full bg-emerald-400" aria-hidden="true" />
                </div>
                <p className="text-xs text-emerald-50/80">
                  Suporte 7x12 com SLA de 30 minutos garante moradores satisfeitos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
