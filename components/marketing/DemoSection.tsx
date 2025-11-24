import { PlayCircle } from 'lucide-react';

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
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-6">
            <span className="marketing-badge" aria-hidden>
              Demonstração guiada
            </span>
            <div className="space-y-3">
              <h2 id="demo-heading" className="marketing-tagline text-3xl font-semibold text-[#15291f] sm:text-4xl">
                Veja o sistema na prática em menos de 3 minutos.
              </h2>
              <p className="marketing-subtitle text-lg text-[#344e41]">
                Conheça as telas principais do painel do síndico, do morador e da administradora em uma demonstração rápida que mostra o fluxo real de uso no dia a dia.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="/demo"
                onClick={(event) => {
                  event.preventDefault();
                  onNavigate('/demo');
                }}
                className="inline-flex items-center justify-center rounded-full bg-[#344e41] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#2a3d33] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#a3b18a]"
              >
                Assistir demonstração agora
              </a>
              <a
                href="/comece"
                onClick={(event) => {
                  event.preventDefault();
                  onNavigate('/comece');
                }}
                className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#15291f] shadow-md ring-1 ring-[#d6dbd4] transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#a3b18a]"
              >
                Agendar demonstração guiada com um especialista
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="relative overflow-hidden rounded-3xl border border-[#d6dbd4] bg-white shadow-[0_18px_36px_rgba(21,41,31,0.12)]">
              <img
                src="/assets/marketing/hero-desktop.png"
                alt="Pré-visualização do painel do sistema Meu Condomínio"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              {/* Substitua este overlay por um player de vídeo real quando disponível */}
              <button
                type="button"
                onClick={() => onNavigate('/demo')}
                className="absolute inset-0 flex items-center justify-center bg-[#15291f]/30 transition hover:bg-[#15291f]/40 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/60"
                aria-label="Assistir demonstração em vídeo"
              >
                <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-5 py-3 text-[#15291f] shadow-lg ring-1 ring-[#d6dbd4]">
                  <PlayCircle className="h-6 w-6" aria-hidden />
                  <span className="text-sm font-semibold">Dar o play</span>
                </span>
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {DEMO_RESULTS.map((result) => (
                <article
                  key={result.label}
                  className="rounded-2xl bg-white p-4 shadow-md ring-1 ring-[#dce3dc]"
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
