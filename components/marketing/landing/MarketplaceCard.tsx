import { CreditCard, Package, ShieldCheck, Store } from 'lucide-react';
import { ProductRow } from './ProductRow';
import type { Product } from './types';

interface MarketplaceCardProps {
  products: Product[];
}

export function MarketplaceCard({ products }: MarketplaceCardProps) {
  return (
    <section
      aria-labelledby="marketplace-card-title"
      className="w-full max-w-[560px] rounded-2xl border border-gray-100 bg-white p-6 shadow-lg shadow-emerald-950/5 sm:p-8"
    >
      <header className="flex items-center gap-3">
        <span className="flex size-11 items-center justify-center rounded-full bg-[#E6F6EF] text-emerald-700">
          <Store className="size-5" strokeWidth={1.75} aria-hidden="true" />
        </span>
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-emerald-700">Marketplace</p>
          <h2 id="marketplace-card-title" className="text-xl font-semibold text-slate-900">
            Marketplace de Moradores
          </h2>
        </div>
      </header>

      <div className="mt-6 space-y-4">
        {products.map((product) => (
          <ProductRow key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 text-sm text-slate-600 sm:grid-cols-3">
        <div className="flex items-start gap-3 rounded-xl border border-gray-100 bg-slate-50/60 p-4">
          <ShieldCheck className="mt-0.5 size-5 text-emerald-600" strokeWidth={1.75} aria-hidden="true" />
          <div>
            <p className="font-semibold text-slate-900">Verificação</p>
            <p className="text-xs text-slate-500">do morador</p>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-xl border border-gray-100 bg-slate-50/60 p-4">
          <CreditCard className="mt-0.5 size-5 text-emerald-600" strokeWidth={1.75} aria-hidden="true" />
          <div>
            <p className="font-semibold text-slate-900">Pagamento</p>
            <p className="text-xs text-slate-500">protegido</p>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-xl border border-gray-100 bg-slate-50/60 p-4">
          <Package className="mt-0.5 size-5 text-emerald-600" strokeWidth={1.75} aria-hidden="true" />
          <div>
            <p className="font-semibold text-slate-900">Retirada</p>
            <p className="text-xs text-slate-500">na portaria</p>
          </div>
        </div>
      </div>
    </section>
  );
}
