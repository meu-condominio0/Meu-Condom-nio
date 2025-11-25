import { BarChart3, ClipboardList, ShieldCheck, ShoppingBag } from 'lucide-react';

import { dashboardKpis, dailyOpsScreenshot, lobbyPhoto, marketplaceMobile } from '@/src/assets/images';

import type { MarketingPageProps } from './MarketingLayout';

const SOLUTIONS = [
  {
    title: 'Gestão do dia a dia',
    description:
      'Avisos segmentados, reservas de áreas comuns e registro de demandas em um painel que organiza a rotina do condomínio.',
    icon: ClipboardList,
    image: dailyOpsScreenshot,
    imageAlt: 'Painel principal do síndico com rotinas do condomínio',
  },
  {
    title: 'Marketplace para moradores',
    description:
      'Moradores compram produtos e serviços em um ambiente exclusivo do condomínio com pagamentos e histórico registrados.',
    icon: ShoppingBag,
    image: marketplaceMobile,
    imageAlt: 'Aplicativo de marketplace do condomínio aberto em um celular',
  },
  {
    title: 'Portaria digital',
    description:
      'Controle de acessos, visitantes e entregas com comunicação rápida com a portaria e histórico centralizado.',
    icon: ShieldCheck,
    image: lobbyPhoto,
    imageAlt: 'Corredor moderno representando a portaria digital do condomínio',
  },
  {
    title: 'Indicadores em tempo real',
    description:
      'Relatórios e visão financeira consolidados para síndicos e administradoras tomarem decisões com confiança.',
    icon: BarChart3,
    image: dashboardKpis,
    imageAlt: 'Dashboard financeiro com indicadores e gráficos do condomínio',
  },
];

type SolutionsSectionProps = Pick<MarketingPageProps, 'onNavigate'>;

export function SolutionsSection({ onNavigate }: SolutionsSectionProps) {
  return (
    <section id="como-funciona" className="bg-[#f4f5f3] py-16 sm:py-20 lg:py-24" aria-labelledby="solutions-heading">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <h2 id="solutions-heading" className="text-3xl font-semibold leading-tight text-[#15291f] sm:text-4xl">
            Soluções completas para o seu condomínio
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600">
            Todas as rotinas do condomínio em um único lugar com marketplace integrado para síndicos, administradoras e moradores.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {SOLUTIONS.map((solution) => (
            <article
              key={solution.title}
              className="group flex h-full flex-col gap-3 rounded-3xl bg-white p-6 shadow-sm transition-transform transition-shadow duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e7efe4] text-[#2f4b3d] ring-1 ring-[#d6dbd4]">
                    <solution.icon className="h-6 w-6" aria-hidden />
                  </div>
                  <h3 className="text-lg font-semibold text-[#15291f]">{solution.title}</h3>
                </div>

                {solution.title === 'Marketplace para moradores' && (
                  <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                    Diferencial exclusivo
                  </span>
                )}
              </div>

              <p className="text-base leading-relaxed text-[#475e52]">{solution.description}</p>

              {solution.image && (
                <div className="mt-4 overflow-hidden rounded-2xl bg-[#f7f9f6]">
                  <img
                    src={solution.image}
                    alt={solution.imageAlt}
                    className="w-full h-64 object-cover transition duration-200 group-hover:scale-[1.01]"
                    loading="lazy"
                  />
                </div>
              )}
            </article>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center gap-4 text-center">
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
