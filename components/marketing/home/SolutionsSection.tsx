import { Banknote, AlertTriangle, FileSpreadsheet, BarChart3 } from 'lucide-react';
import type { MarketingPageProps } from '../MarketingLayout';

const CHIPS = ['Processos', 'Reservas', 'Portaria', 'Pessoas', 'Documentos', 'Contabilidade', 'WhatsApp'];

const FEATURES = [
  { title: 'Boletos com Pix e cartão', icon: Banknote },
  { title: 'Controle da inadimplência', icon: AlertTriangle },
  { title: 'DRE simplificado', icon: FileSpreadsheet },
  { title: 'Extrato em tempo real', icon: BarChart3 },
];

interface SolutionsSectionProps extends MarketingPageProps {}

export function SolutionsSection({ onNavigate }: SolutionsSectionProps) {
  return (
    <section className="px-4 py-20" aria-labelledby="solutions-heading">
      <div className="mx-auto max-w-6xl space-y-12">
        <div className="space-y-3 text-center">
          <h2 id="solutions-heading" className="text-3xl font-semibold text-slate-900 sm:text-4xl">
            Soluções completas para seu condomínio
          </h2>
          <p className="text-lg text-slate-600">
            Ferramentas poderosas para simplificar a gestão e melhorar a comunicação.
          </p>
        </div>

        <div className="rounded-3xl bg-emerald-950 px-8 py-10 text-white shadow-xl">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">
              Marketplace de Moradores: venda e serviços dentro do app
            </h3>
            <p className="text-sm text-emerald-100">
              Confiança, proteção e regras do condomínio.
            </p>
            <button
              type="button"
              onClick={() => onNavigate('/marketplace')}
              className="inline-flex items-center justify-center rounded-full bg-white/90 px-6 py-3 text-sm font-semibold text-emerald-950 shadow-sm transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-200 focus-visible:outline-offset-2"
            >
              Conheça o Marketplace →
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 overflow-x-auto rounded-2xl border border-slate-200 bg-white/70 p-4">
          {CHIPS.map((chip) => (
            <span
              key={chip}
              className="whitespace-nowrap rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-800"
            >
              {chip}
            </span>
          ))}
        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-slate-900">Gestão financeira completa</h3>
            <p className="text-base leading-relaxed text-slate-600">
              Controle total da finanças do condomínio com emissão de boletos, integração com Pix e cartão, DRE simplificado e controle da inadimplência.
            </p>
            <button
              type="button"
              onClick={() => onNavigate('/demo')}
              className="inline-flex items-center justify-center rounded-xl border border-emerald-200 px-5 py-2.5 text-sm font-semibold text-emerald-900 transition hover:border-emerald-300 hover:text-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-500 focus-visible:outline-offset-2"
            >
              Ver demonstração
            </button>
          </div>
          <div className="relative">
            <div className="relative mx-auto h-full min-h-[260px] max-w-xl rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_25px_80px_rgba(15,118,110,0.18)]">
              <div className="grid gap-4">
                <div className="h-12 rounded-xl bg-emerald-50" />
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="h-24 rounded-2xl bg-slate-100" />
                  <div className="h-24 rounded-2xl bg-emerald-100/80" />
                </div>
                <div className="h-40 rounded-2xl bg-slate-100" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {FEATURES.map(({ title, icon: Icon }) => (
            <div
              key={title}
              className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <span className="flex size-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-700" aria-hidden="true">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
