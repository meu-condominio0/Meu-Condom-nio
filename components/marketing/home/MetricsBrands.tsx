const METRICS = [
  { value: '6.000.000+', label: 'Pessoas' },
  { value: '20.000+', label: 'Condomínios' },
  { value: '2.000+', label: 'Cidades' },
  { value: '4', label: 'Países' },
];

export function MetricsBrands() {
  return (
    <section className="px-4 py-20" aria-labelledby="metrics-heading">
      <div className="mx-auto max-w-6xl text-center">
        <h2 id="metrics-heading" className="text-3xl font-semibold text-slate-900 sm:text-4xl">
          Atendimento em escala
        </h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {METRICS.map((metric) => (
            <div key={metric.label} className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
              <p className="text-3xl font-semibold text-emerald-900">{metric.value}</p>
              <p className="mt-2 text-sm uppercase tracking-wide text-slate-500">{metric.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="h-20 rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/50"
              aria-label="Marca parceira"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
