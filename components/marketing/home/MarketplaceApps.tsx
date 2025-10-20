import { Star } from 'lucide-react';

const APPS = [
  {
    name: 'PayFlow',
    category: 'Pagamentos & Bancos',
    description: 'Integração com principais bancos e gateways de pagamento',
    rating: '4.8',
  },
  {
    name: 'SmartGate',
    category: 'Portaria & IoT',
    description: 'Controle de acesso com QR code e reconhecimento facial',
    rating: '4.9',
  },
  {
    name: 'ContaExata',
    category: 'Contabilidade & Fiscal',
    description: 'Exportação automática para sistemas contábeis',
    rating: '4.7',
  },
  {
    name: 'ReportPro',
    category: 'Relatórios & BI',
    description: 'Relatórios avançados e dashboards personalizados',
    rating: '4.6',
  },
  {
    name: 'NotifyHub',
    category: 'Comunicação',
    description: 'Comunicação multicanal com moradores',
    rating: '4.5',
  },
  {
    name: 'ToolBox',
    category: 'Utilitários',
    description: 'Ferramentas utilitárias para o dia a dia',
    rating: '4.4',
  },
];

export function MarketplaceApps() {
  return (
    <section className="px-4 py-20" aria-labelledby="apps-heading">
      <div className="mx-auto max-w-6xl text-center">
        <h2 id="apps-heading" className="text-3xl font-semibold text-slate-900 sm:text-4xl">
          Acelere com o nosso Marketplace
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {APPS.map((app) => (
            <article
              key={app.name}
              className="flex h-full flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-6 text-left shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex size-12 items-center justify-center rounded-full bg-emerald-100 text-lg font-semibold text-emerald-800" aria-hidden="true">
                    {app.name.charAt(0)}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{app.name}</h3>
                    <p className="text-sm text-slate-500">{app.category}</p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
                  Oficial
                </span>
              </div>
              <p className="text-sm text-slate-600">{app.description}</p>
              <div className="h-px bg-slate-100" aria-hidden="true" />
              <div className="mt-auto flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-700">
                  <Star className="size-4 fill-emerald-500 text-emerald-500" aria-hidden="true" />
                  ★ {app.rating}
                </span>
                <button
                  type="button"
                  className="rounded-xl bg-emerald-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-500 focus-visible:outline-offset-2"
                >
                  Instalar
                </button>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            className="rounded-full border border-emerald-200 px-6 py-2 text-sm font-semibold text-emerald-900 transition hover:border-emerald-300 hover:text-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-500 focus-visible:outline-offset-2"
          >
            Explorar todos os apps →
          </button>
        </div>
      </div>
    </section>
  );
}
