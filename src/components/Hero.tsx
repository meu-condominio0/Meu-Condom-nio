import Badge from './Badge';

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

const KPI_CARDS = [
  { label: 'Inadimplência', value: '−35%', direction: 'down' as const, progress: 35 },
  { label: 'Caixa', value: '+18%', direction: 'up' as const, progress: 18 },
  { label: 'Chamados resolvidos', value: '92%', direction: 'up' as const, progress: 92 },
  { label: 'Taxa de resolução', value: '88%', direction: 'up' as const, progress: 88 },
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
            <h1 id="hero-heading" className="text-4xl font-bold leading-tight tracking-tight text-emerald-900 dark:text-emerald-100 sm:text-5xl">
              {headline}
            </h1>
            <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-200">
              Redução real da inadimplência, financeiro automatizado, assembleia digital sem dor de cabeça e marketplace pronto para serviços.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <button
              type="button"
              data-cta="primary"
              aria-label="Começar agora com avaliação gratuita de 14 dias"
              onClick={() => {
                dispatchCtaEvent('primary');
                onPrimaryClick?.();
              }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-900 px-10 py-4 text-base font-semibold text-white shadow-lg shadow-emerald-900/10 transition-transform transition-shadow duration-200 hover:scale-[1.03] hover:bg-emerald-800 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-900/10 sm:w-auto sm:min-w-[260px] sm:text-lg"
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
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-emerald-200 bg-white/80 px-7 py-3 text-base font-semibold text-emerald-900 transition duration-200 hover:border-emerald-600 hover:text-emerald-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:border-emerald-500/40 dark:bg-emerald-900/40 dark:text-emerald-200 dark:hover:border-emerald-300 dark:hover:text-emerald-100 dark:focus-visible:ring-offset-slate-950 sm:w-auto sm:min-w-[220px]"
            >
              <svg
                aria-hidden="true"
                className="h-5 w-5 fill-current"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 3.75c0-1.04 1.16-1.67 2.03-1.1l8.1 5.47c.78.52.78 1.63 0 2.15l-8.1 5.47C6.16 16.32 5 15.7 5 14.66V3.75Z" />
              </svg>
              <span>Ver demonstração em 3 min</span>
            </button>
          </div>

          <div className="flex flex-col gap-3">
            <Badge className="w-fit bg-emerald-900 text-white shadow-sm shadow-emerald-900/10 dark:bg-emerald-500 dark:text-emerald-950">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-emerald-900 dark:bg-emerald-900 dark:text-emerald-100">
                Novo
              </span>
              Marketplace no condomínio: contrate serviços sem sair do app.
            </Badge>

            <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-emerald-100/80 bg-white/80 p-3 shadow-sm shadow-emerald-900/5 backdrop-blur dark:border-emerald-500/20 dark:bg-emerald-900/40">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className="flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-900 shadow-sm shadow-emerald-900/5 dark:bg-emerald-800/60 dark:text-emerald-50"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-900 text-xs font-bold text-white shadow-sm shadow-emerald-900/20 dark:bg-emerald-400 dark:text-emerald-950">
                    {step}
                  </span>
                  {step === 1 && 'Cadastre seu condomínio'}
                  {step === 2 && 'Conecte financeiro e regras'}
                  {step === 3 && 'Ative o marketplace de serviços'}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative mx-auto flex w-full max-w-xl flex-col items-stretch justify-center gap-6 lg:mx-0">
          <div className="relative overflow-hidden rounded-2xl border border-white/40 bg-white/80 p-6 shadow-xl shadow-emerald-900/10 backdrop-blur-sm dark:border-emerald-500/10 dark:bg-emerald-900/40">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/15 via-emerald-400/10 to-emerald-900/25" aria-hidden="true" />
            <div className="relative flex flex-col gap-5">
              <div className="flex items-center justify-between text-sm font-medium text-emerald-900/80 dark:text-emerald-100/90">
                <span>Painel financeiro</span>
                <span className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-200">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
                  Online
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {KPI_CARDS.map((kpi, index) => {
                  const isPositive = kpi.direction === 'up';
                  const chipClass = isPositive
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    : 'bg-rose-100 text-rose-800 border border-rose-200';

                  return (
                    <article
                      key={kpi.label}
                      className="flex flex-col gap-3 rounded-xl border border-white/40 bg-white/90 p-4 text-left shadow-sm shadow-emerald-900/10 backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-within:ring-2 focus-within:ring-emerald-300 dark:border-emerald-500/20 dark:bg-emerald-950/60"
                      aria-label={`Resumo de ${kpi.label}`}
                    >
                      <div className="flex items-start gap-3">
                        <span
                          aria-hidden
                          className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 shadow-inner shadow-emerald-900/5 dark:bg-emerald-800/50 dark:text-emerald-50"
                        >
                          <span className="h-3 w-3 rounded-full bg-current" />
                        </span>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-semibold text-slate-700 dark:text-slate-100">{kpi.label}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-300">Mensal</p>
                          <p className="text-[0.72rem] text-slate-500 dark:text-slate-400">Comparado ao mês anterior</p>
                        </div>
                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${chipClass}`}>
                          {kpi.value}
                        </span>
                      </div>

                      {index === KPI_CARDS.length - 1 ? (
                        <div className="flex items-center gap-3" aria-label="Progresso da taxa de resolução">
                          <div className="relative h-2 flex-1 rounded-full bg-slate-100 dark:bg-emerald-800/40">
                            <div
                              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600"
                              style={{ width: `${kpi.progress}%` }}
                              role="presentation"
                            />
                          </div>
                          <span className="text-sm font-semibold text-slate-700 dark:text-emerald-100">{kpi.value}</span>
                        </div>
                      ) : (
                        <div className="h-2 rounded-full bg-slate-100 dark:bg-emerald-800/50" aria-hidden="true">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600"
                            style={{ width: `${kpi.progress}%` }}
                          />
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-900 shadow-sm shadow-emerald-900/10 dark:border-emerald-500/30 dark:bg-emerald-800/60 dark:text-emerald-50">
                SLA 7x12 com resposta em até 30 minutos
              </div>

              <div className="flex flex-col gap-3 rounded-xl bg-emerald-900/90 p-4 text-emerald-50 shadow-inner shadow-emerald-900/40">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-400/90 text-sm font-bold text-emerald-900 shadow-sm shadow-emerald-900/30">
                      MC
                    </span>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold">Reserva do Lago</span>
                      <span className="text-xs text-emerald-50/80">Síndico com visão consolidada</span>
                    </div>
                  </div>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-emerald-50">+18% caixa</span>
                </div>
                <div className="h-32 rounded-lg bg-emerald-800/70">
                  <div className="flex h-full items-end gap-2 px-3 pb-3">
                    {[55, 78, 64, 92, 80].map((value, index) => (
                      <div key={index} className="flex h-full flex-1 items-end">
                        <div
                          className="w-full rounded-md bg-gradient-to-t from-emerald-500 to-emerald-300 shadow-inner shadow-emerald-900/30"
                          style={{ height: `${value}%` }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="rounded-lg bg-white/10 p-3 text-center">
                    <div className="text-2xl font-semibold">92%</div>
                    <div className="text-emerald-50/80">Cobranças automáticas</div>
                  </div>
                  <div className="rounded-lg bg-white/10 p-3 text-center">
                    <div className="text-2xl font-semibold">48h</div>
                    <div className="text-emerald-50/80">Tempo médio de acordo</div>
                  </div>
                  <div className="rounded-lg bg-white/10 p-3 text-center">
                    <div className="text-2xl font-semibold">+36</div>
                    <div className="text-emerald-50/80">Serviços no marketplace</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
