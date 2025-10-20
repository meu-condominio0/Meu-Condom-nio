export function CtaBanner() {
  return (
    <section className="px-4 py-20" aria-labelledby="cta-banner">
      <div className="mx-auto max-w-5xl rounded-3xl bg-emerald-900 px-8 py-16 text-center text-white shadow-xl">
        <h2 id="cta-banner" className="text-3xl font-semibold sm:text-4xl">
          Quer mais resultados no seu condomínio?
        </h2>
        <button
          type="button"
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-emerald-400 px-6 py-3 text-base font-semibold text-emerald-900 shadow-sm transition hover:bg-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-200 focus-visible:outline-offset-2"
        >
          Conversar com um consultor
        </button>
      </div>
    </section>
  );
}
