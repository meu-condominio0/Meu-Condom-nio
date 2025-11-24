import { ArrowRight, BadgeCheck, CheckCircle2, TrendingDown, Wallet } from 'lucide-react';
import type { MarketingPath } from '../../components/marketing/MarketingLayout';

interface FinancialMarketplaceSectionProps {
  onNavigate: (path: MarketingPath) => void;
}

const BENEFITS = [
  'Consolidação das compras do condomínio',
  'Visão centralizada de gastos por fornecedor e por unidade',
  'Redução de retrabalho entre administradora e financeiro',
];

const INDICATORS = [
  { label: 'Pedidos no mês', value: '142' },
  { label: 'Fornecedores ativos', value: '28' },
  { label: 'Ticket médio', value: 'R$ 1.280,00' },
];

export function FinancialMarketplaceSection({ onNavigate }: FinancialMarketplaceSectionProps) {
  return (
    <section
      className="financial-marketplace-section space-y-6 rounded-[28px] bg-gradient-to-br from-emerald-900/5 via-white to-emerald-50/80 p-4 shadow-lg shadow-emerald-900/5 ring-1 ring-emerald-900/10 dark:from-slate-900/60 dark:via-slate-900 dark:to-emerald-950/40 dark:ring-emerald-100/15 sm:p-6 lg:p-8"
      aria-labelledby="financial-marketplace-title"
    >
      <div className="grid gap-4 lg:gap-6 xl:gap-8 lg:grid-cols-[1.6fr_1fr]">
        <article className="rounded-3xl bg-emerald-50/80 p-6 shadow-xl shadow-emerald-900/5 ring-1 ring-emerald-900/10 dark:bg-emerald-900/30 dark:ring-emerald-100/10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
            <div className="flex-1 space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-800/60 dark:text-emerald-100 dark:ring-emerald-700/80">
                <Wallet size={16} strokeWidth={1.8} />
                Marketplace financeiro integrado
              </span>
              <div className="space-y-3">
                <h2 id="financial-marketplace-title" className="text-2xl font-bold leading-tight text-slate-900 dark:text-slate-50 md:text-[1.9rem]">
                  Marketplace de condomínio conectado ao financeiro
                </h2>
                <p className="max-w-3xl text-base leading-relaxed text-slate-700 dark:text-slate-200/80">
                  Marketplace do condomínio totalmente integrado ao financeiro para garantir controle, transparência e previsibilidade em cada compra.
                </p>
                <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-200">
                  Compras, aprovação, conciliação e rateio acontecendo no mesmo fluxo.
                </p>
              </div>
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {BENEFITS.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-2 rounded-xl bg-white/70 px-3 py-2 text-sm font-medium text-slate-800 shadow-sm ring-1 ring-emerald-900/5 dark:bg-slate-900/70 dark:text-slate-50 dark:ring-emerald-100/10"
                  >
                    <CheckCircle2 className="mt-0.5 text-emerald-600 dark:text-emerald-300" size={18} strokeWidth={1.8} />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600/10 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-50 dark:ring-emerald-400/30">
                  <BadgeCheck size={14} strokeWidth={1.8} />
                  Aprovado
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-100 dark:bg-amber-500/15 dark:text-amber-100 dark:ring-amber-400/20">
                  <TrendingDown size={14} strokeWidth={1.8} />
                  Em análise
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900/5 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:ring-slate-700">
                  Auditoria em tempo real
                </span>
              </div>
            </div>

            <div className="w-full max-w-md space-y-4 rounded-2xl bg-white p-4 shadow-lg shadow-emerald-900/10 ring-1 ring-emerald-900/10 dark:bg-slate-900 dark:ring-emerald-100/15">
              <header className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-200">Resumo financeiro</p>
                  <p className="text-xs text-slate-500 dark:text-slate-300">Últimos 30 dias • sincronizado com o caixa</p>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100 dark:bg-emerald-500/15 dark:text-emerald-100 dark:ring-emerald-400/30">
                  Conciliação ativa
                </span>
              </header>

              <div className="grid gap-3 rounded-xl bg-gradient-to-br from-emerald-50 via-white to-emerald-100/60 p-3 ring-1 ring-emerald-200/70 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900/50 dark:ring-emerald-800/40">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-200/80">Compras conciliadas</span>
                  <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-200">+12% vs mês anterior</span>
                </div>
                <strong className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">R$ 184.200,00</strong>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="inline-flex items-center gap-1 rounded-md bg-white/70 px-2 py-1 font-semibold text-emerald-700 ring-1 ring-emerald-100 dark:bg-slate-800 dark:text-emerald-100 dark:ring-emerald-700/60">
                    <BadgeCheck size={14} strokeWidth={1.8} />
                    87 aprovadas
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-1 font-semibold text-amber-700 ring-1 ring-amber-100 dark:bg-amber-500/15 dark:text-amber-100 dark:ring-amber-400/30">
                    5 em análise
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <div className="rounded-xl bg-slate-50 p-3 text-sm font-semibold text-slate-800 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-50 dark:ring-slate-700">
                  Economia estimada
                  <div className="mt-1 text-lg font-bold text-emerald-700 dark:text-emerald-200">R$ 18.500</div>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-300">Negociação centralizada com fornecedores</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-3 text-sm font-semibold text-slate-800 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-50 dark:ring-slate-700">
                  Previsão de caixa
                  <div className="mt-1 text-lg font-bold text-slate-900 dark:text-slate-100">+ R$ 42.300</div>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-300">Pedidos programados e repasses automáticos</p>
                </div>
              </div>
            </div>
          </div>
        </article>

        <article className="flex h-full flex-col justify-between gap-4 rounded-3xl bg-white p-6 shadow-lg shadow-emerald-900/10 ring-1 ring-emerald-900/10 dark:bg-slate-900 dark:ring-emerald-100/15">
          <div className="space-y-2">
            <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-200">Indicadores imediatos</span>
            <h3 className="text-xl font-bold leading-tight text-slate-900 dark:text-slate-50">Indicadores que o financeiro enxerga em segundos</h3>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Painel focado em custos do marketplace, com visão consolidada por fornecedor e por unidade.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {INDICATORS.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl bg-emerald-50/70 px-3 py-4 text-center shadow-sm ring-1 ring-emerald-900/10 dark:bg-emerald-900/30 dark:text-slate-50 dark:ring-emerald-100/15"
              >
                <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-200">{item.label}</p>
                <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">{item.value}</p>
              </div>
            ))}
          </div>
          <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Sem planilhas soltas</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Todos os pedidos e notas ficam vinculados ao financeiro, com trilha de aprovação, conciliação e repasse automático.
            </p>
          </div>
        </article>
      </div>

        <div className="mt-6 flex flex-col gap-3 rounded-2xl bg-emerald-50/70 p-4 ring-1 ring-emerald-900/10 dark:bg-emerald-900/25 dark:ring-emerald-100/15 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
            Quer ver como o marketplace conversa com o financeiro do seu condomínio?
          </p>
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 dark:text-slate-300">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/60 px-3 py-1 font-semibold text-slate-800 ring-1 ring-emerald-100 dark:bg-slate-800 dark:text-slate-100 dark:ring-emerald-100/30">
              <BadgeCheck size={14} strokeWidth={1.8} />
              Roteiro pronto para o financeiro
            </span>
            <button
              type="button"
              onClick={() => onNavigate('/solucoes')}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-600/30 transition hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400"
            >
              Falar com um especialista
              <ArrowRight size={16} strokeWidth={1.8} />
            </button>
          </div>
        </div>
    </section>
  );
}
