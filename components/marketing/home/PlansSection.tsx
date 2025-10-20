import type { MarketingPageProps } from '../MarketingLayout';

const ESSENCIAL = [
  'App de gestão e comunicação completo',
  'Livro de ocorrências digital',
  'Sistema de mensagens entre moradores',
  'Reservas de espaços comuns',
  'Controle de entregas e encomendas',
  'Enquetes e votações',
  'Repositório de documentos',
  'Tarefas do síndico organizadas',
  'Registro completo de moradores',
  'Notificações em tempo real',
];

const FINANCEIRO = [
  'Tudo do plano Essencial',
  'Pagamentos em tempo real (Pix, boleto, cartão)',
  'Extrato bancário disponível 24h',
  'Prestação de contas automatizada',
  'Relatório de inadimplência detalhado',
  'Gráficos de gastos x arrecadações',
  'Previsão orçamentária inteligente',
  'Conta bancária exclusiva do condomínio',
  'Gestão fiscal e declarações',
  'Folha de pagamento de funcionários',
];

interface PlansSectionProps extends MarketingPageProps {}

export function PlansSection({ onNavigate }: PlansSectionProps) {
  return (
    <section className="px-4 py-20" aria-labelledby="plans-heading">
      <div className="mx-auto max-w-5xl text-center">
        <h2 id="plans-heading" className="text-3xl font-semibold text-slate-900 sm:text-4xl">
          Escolha o plano ideal para seu condomínio
        </h2>
        <p className="mt-3 text-lg text-slate-600">
          Soluções flexíveis que crescem com você. Todos os planos incluem suporte ilimitado e atualizações gratuitas.
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <article className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-8 text-left shadow-sm">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-slate-900">Essencial</h3>
              <ul className="space-y-3 text-sm text-slate-600">
                {ESSENCIAL.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 inline-flex size-2.5 shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8">
              <button
                type="button"
                onClick={() => onNavigate('/comece')}
                className="inline-flex w-full items-center justify-center rounded-xl border border-emerald-200 px-5 py-3 text-sm font-semibold text-emerald-900 transition hover:border-emerald-300 hover:text-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-500 focus-visible:outline-offset-2"
              >
                Fale com um consultor
              </button>
            </div>
          </article>

          <article className="flex h-full flex-col rounded-3xl border border-emerald-200 bg-emerald-50/80 p-8 text-left shadow-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold text-emerald-950">Financeiro</h3>
              <span className="rounded-full bg-emerald-200 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-900">
                Mais completo
              </span>
            </div>
            <ul className="mt-6 space-y-3 text-sm text-emerald-900">
              {FINANCEIRO.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 inline-flex size-2.5 shrink-0 rounded-full bg-emerald-600" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <button
                type="button"
                onClick={() => onNavigate('/comece')}
                className="inline-flex w-full items-center justify-center rounded-xl bg-emerald-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-500 focus-visible:outline-offset-2"
              >
                Fale com um consultor
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
