import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

export function Testimonials() {
  return (
    <section className="px-4 py-20" aria-labelledby="testimonials-heading">
      <div className="mx-auto max-w-5xl text-center">
        <h2 id="testimonials-heading" className="text-3xl font-semibold text-slate-900 sm:text-4xl">
          Opinião dos nossos clientes
        </h2>
        <div className="relative mt-12">
          <div className="rounded-3xl border border-slate-100 bg-white p-10 shadow-xl">
            <div className="flex justify-center gap-1 text-emerald-500" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="size-5 fill-emerald-500 text-emerald-500" aria-hidden="true" />
              ))}
            </div>
            <p className="mt-6 text-lg text-slate-600">
              “Implantação rápida e fim das planilhas paralelas. Portaria com QR reduziu filas e ruídos.”
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <span className="flex size-12 items-center justify-center rounded-full bg-emerald-100 text-lg font-semibold text-emerald-800" aria-hidden="true">
                G
              </span>
              <div className="text-left">
                <p className="text-base font-semibold text-slate-900">Guilherme Ricardo</p>
                <p className="text-sm text-slate-500">Síndico Morador (RJ)</p>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="absolute left-[-20px] top-1/2 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-500 focus-visible:outline-offset-2"
            aria-label="Depoimento anterior"
          >
            <ChevronLeft className="size-5 text-slate-500" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="absolute right-[-20px] top-1/2 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-500 focus-visible:outline-offset-2"
            aria-label="Próximo depoimento"
          >
            <ChevronRight className="size-5 text-slate-500" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-8 flex items-center justify-center gap-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <span
              key={index}
              className={`size-2.5 rounded-full ${index === 0 ? 'bg-emerald-600' : 'bg-slate-300'}`}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
