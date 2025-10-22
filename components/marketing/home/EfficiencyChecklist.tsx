const CHECKLIST = [
  {
    highlight: 'Atenda moradores',
    text: 'de forma mais eficiente',
  },
  {
    highlight: 'Ganha tempo',
    text: 'com automação',
  },
  {
    highlight: 'Reduza custos',
    text: 'significativamente',
  },
  {
    highlight: 'Mostre seu trabalho',
    text: 'e seja reconhecido',
  },
  {
    highlight: 'Gerencie vários condomínios',
    text: 'em um só lugar',
  },
];

export function EfficiencyChecklist() {
  return (
    <section className="px-4 py-20" aria-labelledby="efficiency-heading">
      <div className="mx-auto flex max-w-6xl flex-col-reverse items-center gap-12 md:flex-row">
        <div className="w-full flex-1 space-y-6">
          <h2 id="efficiency-heading" className="text-3xl font-semibold text-slate-900 sm:text-4xl">
            Gestão do condomínio mais eficiente
          </h2>
          <ul className="space-y-4 text-base text-slate-600">
            {CHECKLIST.map((item) => (
              <li key={item.highlight} className="flex items-start gap-2">
                <span className="mt-1 inline-flex size-3.5 shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />
                <span>
                  <span className="font-semibold">{item.highlight}</span> {item.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1">
          <div className="relative mx-auto max-w-md overflow-hidden rounded-3xl shadow-2xl shadow-emerald-200/60">
            <img
              src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80"
              alt="Equipe colaborando na administração do condomínio"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
