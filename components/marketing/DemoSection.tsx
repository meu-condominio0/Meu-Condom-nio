import { dashboardKpis } from '@/src/assets/images';

import type { MarketingPageProps } from './MarketingLayout';

const DEMO_RESULTS = [
  {
    label: 'Redução de chamados',
    value: '-35% em 90 dias',
    description: 'Com fluxos automáticos de triagem e priorização.',
  },
  {
    label: 'Atendimento mais ágil',
    value: '98% SLA cumprido',
    description: 'Equipe e moradores na mesma linha do tempo.',
  },
];

type DemoSectionProps = Pick<MarketingPageProps, 'onNavigate'>;

export function DemoSection({ onNavigate }: DemoSectionProps) {
  return (
    <section className="bg-[#f4f5f3] py-16" aria-labelledby="demo-heading">
      <div className="marketing-container space-y-10">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="space-y-6">
            <span className="marketing-badge" aria-hidden>
              Demonstração guiada
            </span>
            <div className="space-y-3">
              <h2 id="demo-heading" className="marketing-tagline text-3xl font-semibold text-[#15291f] sm:text-4xl">
                Veja o sistema na prática antes de contratar.
              </h2>
              <p className="marketing-subtitle text-lg text-[#344e41]">
                Demonstração guiada e online mostrando como síndicos, administradoras e condomínios usam o painel no dia a dia — sem precisar assistir a vídeo gravado.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <a
                href="/comece"
                onClick={(event) => {
                  event.preventDefault();
                  onNavigate('/comece');
                }}
                className="inline-flex items-center justify-center rounded-full bg-[#344e41] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#2a3d33] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#a3b18a]"
              >
                Agendar demonstração
              </a>
              <a
                href="/demo"
                onClick={(event) => {
                  event.preventDefault();
                  onNavigate('/demo');
                }}
                className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#15291f] shadow-md ring-1 ring-[#d6dbd4] transition hover:-translate-y-0.5 hover:bg-[#f7f9f6] hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#a3b18a]"
              >
                Ver o sistema na prática
              </a>
            </div>

            <p className="text-sm font-medium text-[#3f5b4c]">Demonstração online, sem compromisso.</p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="overflow-hidden rounded-3xl bg-white/80 shadow-xl">
              <img
                src={dashboardKpis}
                alt="Prévia do painel do MeuCondomínio"
                className="w-full h-64 md:h-72 object-cover"
                loading="lazy"
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {DEMO_RESULTS.map((result) => (
                <article
                  key={result.label}
                  className="flex h-full flex-col justify-between rounded-2xl bg-white p-4 shadow-md ring-1 ring-[#dce3dc]"
                >
                  <p className="text-sm font-semibold text-[#2f4b3d]">{result.label}</p>
                  <p className="text-2xl font-bold text-[#2f4b3d]">{result.value}</p>
                  <p className="text-xs text-[#4c6558]">{result.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
