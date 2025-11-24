import { BarChart3, ClipboardList, ShieldCheck, ShoppingBag } from 'lucide-react';

import type { MarketingPageProps } from './MarketingLayout';

const SOLUTIONS = [
  {
    title: 'Gestão do dia a dia',
    description:
      'Avisos segmentados, reservas de áreas comuns e registro de demandas em um painel que organiza a rotina do condomínio.',
    icon: ClipboardList,
    image: '/assets/marketing/hero-desktop.png',
    imageAlt: 'Notebook exibindo painel de gestão diária do condomínio',
  },
  {
    title: 'Marketplace para moradores',
    description:
      'Moradores compram produtos e serviços em um ambiente exclusivo do condomínio com pagamentos e histórico registrados.',
    icon: ShoppingBag,
    image: '/assets/marketing/celularvendas.png',
    imageAlt: 'Aplicativo de marketplace do condomínio aberto em um celular',
  },
  {
    title: 'Portaria digital',
    description:
      'Controle de acessos, visitantes e entregas com comunicação rápida com a portaria e histórico centralizado.',
    icon: ShieldCheck,
    image: '/assets/marketing/portariadigital.png',
    imageAlt: 'Corredor moderno representando a portaria digital do condomínio',
  },
  {
    title: 'Indicadores em tempo real',
    description:
      'Relatórios e visão financeira consolidados para síndicos e administradoras tomarem decisões com confiança.',
    icon: BarChart3,
    image: '/assets/marketing/gestao-tecnologia-condominio.png',
    imageAlt: 'Gestor analisando indicadores financeiros do condomínio em um notebook',
  },
];

type SolutionsSectionProps = Pick<MarketingPageProps, 'onNavigate'>;

export function SolutionsSection({ onNavigate }: SolutionsSectionProps) {
  return (
    <section id="como-funciona" className="bg-[#f4f5f3] py-16 sm:py-20 lg:py-24" aria-labelledby="solutions-heading">
      <div className="marketing-container space-y-12">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <h2 id="solutions-heading" className="text-3xl font-semibold leading-tight text-[#15291f] sm:text-4xl">
            Soluções completas para o seu condomínio
          </h2>
          <p className="text-lg leading-relaxed text-[#344e41]">
            Todas as rotinas do condomínio em um único lugar com marketplace integrado para síndicos, administradoras e moradores.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {SOLUTIONS.map((solution) => (
            <article
              key={solution.title}
              className="group flex h-full flex-col gap-5 overflow-hidden rounded-3xl border border-[#d6dbd4] bg-white/90 p-6 shadow-[0_18px_32px_rgba(21,41,31,0.08)] transition duration-200 hover:-translate-y-1 hover:border-[#344e41] hover:shadow-[0_22px_40px_rgba(21,41,31,0.12)]"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e7efe4] text-[#2f4b3d] shadow-sm ring-1 ring-[#d6dbd4]">
                  <solution.icon className="h-6 w-6" aria-hidden />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-[#15291f]">{solution.title}</h3>
                  <p className="text-base leading-relaxed text-[#475e52]">{solution.description}</p>
                </div>
              </div>

              {solution.image && (
                <div className="relative overflow-hidden rounded-2xl border border-[#e3e9e2] bg-[#f7f9f6] shadow-inner">
                  <img
                    src={solution.image}
                    alt={solution.imageAlt}
                    className="h-full w-full object-cover transition duration-200 group-hover:scale-[1.01]"
                    loading="lazy"
                  />
                </div>
              )}
            </article>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-lg font-semibold text-[#15291f]">Quer ver essas soluções funcionando no seu condomínio?</p>
          <button
            type="button"
            onClick={() => onNavigate('/demo')}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#344e41] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#2a3d33] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#a3b18a]"
          >
            Ver demonstração completa
          </button>
        </div>
      </div>
    </section>
  );
}
