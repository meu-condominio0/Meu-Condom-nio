import { Store, Workflow, FileBarChart } from 'lucide-react';

const DIFFERENTIALS = [
  {
    title: 'Marketplace de Moradores',
    description: 'iPhone 13 Pro 256GB — R$ 3.200 — “Usado · Torre A · ★ 4.9” · Sofá 3 lugares — R$ 1.500 — “Usado · Torre B · ★ 5”.',
    icon: Store,
  },
  {
    title: 'Apps & Integrações',
    description: 'Conecte bancos, contabilidade, portaria & IoT e BI em poucos cliques.',
    icon: Workflow,
  },
  {
    title: 'Transparência & Relatórios',
    description: 'Prestação de contas clara para conselho e moradores.',
    icon: FileBarChart,
  },
];

export function DifferentialsSection() {
  return (
    <section className="px-4 py-20" aria-labelledby="differentials-heading">
      <div className="mx-auto max-w-6xl text-center">
        <div className="mx-auto max-w-2xl space-y-3">
          <h2 id="differentials-heading" className="text-3xl font-semibold text-slate-900 sm:text-4xl">
            Nosso diferencial
          </h2>
          <p className="text-lg text-slate-600">Recursos únicos para síndicos e administradoras que precisam de escala e confiança.</p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {DIFFERENTIALS.map(({ title, description, icon: Icon }) => (
            <article
              key={title}
              className="flex h-full flex-col gap-4 rounded-2xl border border-slate-100 bg-gradient-to-br from-white to-slate-50/70 p-8 text-left shadow-sm transition hover:shadow-md"
            >
              <span className="flex size-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700" aria-hidden="true">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
              <p className="text-sm leading-relaxed text-slate-600">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
