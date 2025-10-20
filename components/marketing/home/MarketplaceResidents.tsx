import { ShieldCheck, CreditCard, Package } from 'lucide-react';
import type { MarketingPageProps } from '../MarketingLayout';

const MARKETPLACE_ITEMS = [
  {
    title: 'iPhone 13 Pro 256GB',
    price: 'R$ 3.200',
    detail: 'Usado · Torre A · ★ 4.9',
  },
  {
    title: 'Sofá 3 lugares',
    price: 'R$ 1.500',
    detail: 'Usado · Torre B · ★ 5',
  },
];

const BADGES = [
  { icon: ShieldCheck, label: 'Verificação', description: 'do morador' },
  { icon: CreditCard, label: 'Pagamento', description: 'protegido' },
  { icon: Package, label: 'Retirada', description: 'na portaria' },
];

export function MarketplaceResidents({ onNavigate }: MarketingPageProps) {
  return (
    <section className="px-4 py-20" aria-labelledby="marketplace-heading">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-3xl border border-emerald-100 bg-white/90 p-10 shadow-xl shadow-emerald-200/40">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center">
            <div className="flex-1 space-y-6">
              <h2 id="marketplace-heading" className="text-3xl font-semibold text-slate-900 sm:text-4xl">
                Marketplace de Moradores
              </h2>
              <ul className="space-y-4">
                {MARKETPLACE_ITEMS.map((item) => (
                  <li key={item.title} className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white/80 p-4 shadow-sm">
                    <div className="size-14 shrink-0 rounded-2xl bg-emerald-100/70" aria-hidden="true" />
                    <div>
                      <p className="text-base font-semibold text-slate-900">{item.title}</p>
                      <p className="text-sm font-medium text-emerald-700">{item.price}</p>
                      <p className="text-sm text-slate-500">{item.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="grid gap-4 sm:grid-cols-3">
                {BADGES.map(({ icon: Icon, label, description }) => (
                  <div key={label} className="flex flex-col items-start gap-2 rounded-2xl border border-slate-100 bg-emerald-50/60 p-4">
                    <span className="flex size-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700" aria-hidden="true">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{label}</p>
                      <p className="text-sm text-slate-600">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-1 flex-col justify-between gap-6">
              <div className="space-y-4">
                <p className="text-lg text-slate-600">
                  Explore produtos e serviços dos seus vizinhos com segurança, regras claras e gestão pelo síndico.
                </p>
              </div>
              <div className="flex flex-col items-stretch gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => onNavigate('/marketplace')}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-900 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-500 focus-visible:outline-offset-2"
                >
                  Explorar Marketplace →
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('/sobre')}
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-6 py-3 text-base font-semibold text-emerald-900 transition hover:border-emerald-300 hover:text-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-500 focus-visible:outline-offset-2"
                >
                  Como funciona
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
