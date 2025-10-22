import { Clock, PiggyBank, Wallet, CalendarCheck, PieChart, Users } from 'lucide-react';

const FEATURES = [
  { title: 'Gestão digital 24h', icon: Clock },
  { title: 'Economia de tempo', icon: PiggyBank },
  { title: 'Redução de custos', icon: Wallet },
  { title: 'Dia a dia organizado (entregas, reservas, chamados)', icon: CalendarCheck },
  { title: 'Transparência financeira', icon: PieChart },
  { title: 'Engajamento de moradores', icon: Users },
];

export function OperationsGrid() {
  return (
    <section className="px-4 py-20" aria-labelledby="operations-heading">
      <div className="mx-auto max-w-6xl text-center">
        <h2 id="operations-heading" className="text-3xl font-semibold text-slate-900 sm:text-4xl">
          Uma nova forma de administrar condomínios
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ title, icon: Icon }) => (
            <div
              key={title}
              className="flex h-full flex-col items-center gap-4 rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-sm transition hover:shadow-md"
            >
              <span className="flex size-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-700" aria-hidden="true">
                <Icon className="size-7" aria-hidden="true" />
              </span>
              <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
