import '../../styles/hero.css';

type HeroProps = {
  variant?: 'A' | 'B';
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
};

const INDICATORS = [
  {
    label: 'Chamados resolvidos',
    value: '98%',
    detail: '+12% vs. último mês',
  },
  {
    label: 'Economia gerada',
    value: 'R$ 184 mil',
    detail: 'Compras consolidadas',
  },
  {
    label: 'Satisfação dos moradores',
    value: 'NPS 9,4',
    detail: 'Suporte próximo',
  },
];

function dispatchCtaEvent(id: 'primary' | 'demo') {
  if (typeof window === 'undefined') return;

  window.dispatchEvent(new CustomEvent('cta:click', { detail: { id } }));
}

export default function Hero({ onPrimaryClick, onSecondaryClick }: HeroProps) {
  return (
    <section
      className="hero-with-bg relative w-full overflow-hidden py-20 text-white lg:min-h-[calc(100vh-96px)] lg:py-24"
      aria-labelledby="hero-heading"
    >
      <div className="hero-overlay" aria-hidden />

      <div className="hero-content relative z-10 mx-auto grid max-w-[74rem] items-start gap-12 px-4 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-16 lg:px-8">
        <div className="hero-body hero-copy-panel mx-auto flex w-full max-w-2xl flex-col gap-8 lg:mx-0">
          <header className="space-y-4 text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/80 ring-1 ring-white/20">
              Mais de 140 condomínios • NPS alto • Suporte próximo da rotina
            </p>
            <div className="space-y-3">
              <h1
                id="hero-heading"
                className="hero-headline text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
              >
                Gestão completa e marketplace em um único painel para o seu condomínio
              </h1>
              <p className="max-w-3xl text-lg font-medium text-white/90">
                Centralize comunicação, pagamentos, portaria e compras em uma plataforma pensada para síndicos, administradoras e moradores.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-sm font-semibold text-white/80">
              {['Gestão completa', 'Marketplace integrado', 'Comunicação, financeiro e portaria'].map((pill) => (
                <span
                  key={pill}
                  className="rounded-full bg-white/10 px-3 py-2 ring-1 ring-white/20"
                >
                  {pill}
                </span>
              ))}
            </div>
          </header>

          <div className="hero-cta-group flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <button
              type="button"
              data-cta="primary"
              aria-label="Agendar demonstração"
              onClick={() => {
                dispatchCtaEvent('primary');
                onPrimaryClick?.();
              }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-transparent bg-[#2f4b3d] px-8 py-4 text-base font-semibold text-white shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-[#3a5a4a] hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#a3b18a] sm:w-auto sm:min-w-[230px] sm:text-lg"
            >
              Agendar demonstração
            </button>
            <button
              type="button"
              data-cta="demo"
              aria-label="Ver o sistema na prática"
              onClick={() => {
                dispatchCtaEvent('demo');
                const el = document.getElementById('como-funciona');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                onSecondaryClick?.();
              }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/60 bg-white/5 px-7 py-3 text-base font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/60 sm:w-auto sm:min-w-[220px]"
            >
              <svg aria-hidden="true" className="h-5 w-5 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 3.75c0-1.04 1.16-1.67 2.03-1.1l8.1 5.47c.78.52.78 1.63 0 2.15l-8.1 5.47C6.16 16.32 5 15.7 5 14.66V3.75Z" />
              </svg>
              <span>Ver o sistema na prática</span>
            </button>
          </div>
          <p className="text-sm font-medium text-white/80">Implementação acompanhada para o seu condomínio.</p>

          <TestimonialCard />
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="hero-visual-stack relative mx-auto flex w-full max-w-xl flex-col gap-6">
      <div className="relative overflow-hidden rounded-[28px] border border-[rgba(52,78,65,0.16)] bg-white/90 p-5 shadow-[0_24px_55px_rgba(12,24,18,0.32)] backdrop-blur-sm">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#f0f5f2] via-white to-[#e7efe8]" aria-hidden />

        <div className="relative flex flex-col gap-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1f352a]">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_0_6px_rgba(16,185,129,0.15)]" aria-hidden />
              Operação ao vivo
            </div>
            <span className="rounded-full bg-[#e6efe8] px-3 py-1 text-xs font-semibold text-[#2f4b3d] ring-1 ring-[#c8d7cc]">
              Marketplace integrado
            </span>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-[rgba(52,78,65,0.12)] bg-[#f3f7f4] shadow-inner">
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <img
                src="/assets/marketing/hero-desktop.png"
                alt="Visão geral do painel Meu Condomínio"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white/70" aria-hidden />
            </div>
            <div className="absolute inset-x-4 bottom-4 grid gap-3 sm:grid-cols-3">
              {INDICATORS.map((indicator) => (
                <div
                  key={indicator.label}
                  className="rounded-xl bg-white/90 px-4 py-3 text-left shadow-[0_14px_32px_rgba(21,41,31,0.18)] ring-1 ring-[rgba(52,78,65,0.14)]"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#3f5b4c]">{indicator.label}</p>
                  <p className="text-2xl font-bold text-[#1f352a]">{indicator.value}</p>
                  <p className="text-xs font-semibold text-[#4f6557]">{indicator.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-[#2f4b3d]">
            <span className="rounded-full bg-[#e6efe8] px-3 py-2 ring-1 ring-[#c8d7cc]">Pagamentos conciliados</span>
            <span className="rounded-full bg-[#e6efe8] px-3 py-2 ring-1 ring-[#c8d7cc]">Portaria e comunicação conectadas</span>
            <span className="rounded-full bg-[#e6efe8] px-3 py-2 ring-1 ring-[#c8d7cc]">Pronto para síndicos e administradoras</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function TestimonialCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1c3026] via-[#1f382d] to-[#254434] p-6 text-white shadow-[0_18px_35px_rgba(12,24,18,0.35)] ring-1 ring-white/10">
      <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-white/10 blur-3xl" aria-hidden />
      <div className="absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-[#a3b18a]/20 blur-2xl" aria-hidden />
      <div className="relative flex flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">Depoimento real</span>
        <p className="text-lg font-semibold leading-relaxed text-white">
          “Reduzimos o volume de chamados em poucos meses e centralizamos as compras em um único lugar.”
        </p>
        <div className="flex items-center gap-3 text-sm font-semibold text-white/80">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-base font-bold">C</div>
          <div className="flex flex-col leading-tight">
            <span>Carolina Mota</span>
            <span className="text-xs font-medium text-white/70">Síndica profissional na Harmonia Gestão</span>
          </div>
        </div>
      </div>
    </div>
  );
}
