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
            <h1 id="hero-heading" className="text-4xl font-bold leading-tight tracking-tight text-emerald-900 dark:text-emerald-100 sm:text-5xl">
              {headline}
            </h1>
            <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-200">
              Redução real da inadimplência, financeiro automatizado, assembleia digital sem dor de cabeça e marketplace pronto para serviços.
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
                {KPI_CARDS.map((kpi) => (
                  <div key={kpi.label} className="flex flex-col gap-2 rounded-xl bg-white/90 p-4 text-left shadow-sm shadow-emerald-900/5 backdrop-blur-sm dark:bg-emerald-950/60">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-200">{kpi.label}</span>
                      <span className={`rounded-full px-3 py-1 text-sm font-semibold ${kpi.trend}`}>
                        {kpi.value}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-emerald-100 dark:bg-emerald-800/50">
                      <div className="h-full w-[75%] rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600" aria-hidden="true" />
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-300">Comparativo mensal com metas do síndico.</p>
                  </div>
                ))}
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
