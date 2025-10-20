import type { Product } from './types';

interface ProductRowProps {
  product: Product;
}

export function ProductRow({ product }: ProductRowProps) {
  return (
    <article
      className="flex items-center gap-4 rounded-xl border border-gray-100 p-4 transition hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-sm focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-emerald-500"
      aria-label={product.title}
    >
      <div className="h-[72px] w-[72px] shrink-0 overflow-hidden rounded-xl border border-emerald-50 bg-gradient-to-br from-emerald-50 via-white to-emerald-100">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="size-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex-1">
        <h3 className="text-base font-semibold text-slate-900">{product.title}</h3>
        <p className="mt-1 text-sm font-semibold text-[#0F3D2E]">{product.price}</p>
        <p className="mt-1 text-sm text-slate-500">
          {product.condition} · {product.tower} · ★ {product.rating.toFixed(1)}
        </p>
      </div>
    </article>
  );
}
