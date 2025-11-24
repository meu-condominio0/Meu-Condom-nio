import type { MarketingPageProps } from './MarketingLayout';

const OPERATIONS = [
  {
    title: 'Portaria digital e acesso seguro',
    description: 'Controle de visitantes, entregas, registro de ocorrências e comunicação com portaria.',
    image: '/assets/marketing/portariadigital.png',
    badge: 'Portaria e segurança',
    ctaLabel: 'Ver portaria em ação',
    href: '/portaria',
  },
  {
    title: 'Comunidade conectada',
    description: 'Murais, avisos, enquetes e interação direta com moradores e equipes.',
    image: '/assets/marketing/pessoas.png',
    badge: 'Comunicação viva',
    ctaLabel: 'Ver experiência do morador',
    href: '/comunidade',
  },
  {
    title: 'Bem-estar nas áreas comuns',
    description: 'Reservas de salão, churrasqueira, academia e piscinas com regras claras e automações.',
    image: '/assets/marketing/piscina.png',
    badge: 'Áreas comuns e lazer',
    ctaLabel: 'Ver gestão de reservas',
    href: '/reservas',
  },
];

type OperationsSectionProps = Pick<MarketingPageProps, 'onNavigate'>;

export function OperationsSection({ onNavigate }: OperationsSectionProps) {
  return (
    <section className="bg-[#f9faf8] py-16" aria-labelledby="operacoes-heading">
      <div className="marketing-container space-y-10">
        <div className="flex flex-col gap-3">
          <span className="marketing-badge w-fit" aria-hidden>
            Segurança, comunidade e bem-estar
          </span>
          <h2 id="operacoes-heading" className="marketing-tagline text-3xl font-semibold text-[#15291f] sm:text-4xl">
            Operações que conectam portaria, convivência e lazer.
          </h2>
          <p className="marketing-subtitle max-w-4xl text-lg text-[#344e41]">
            Integre portaria, avisos, reservas e convivência em um painel que organiza a rotina e melhora a experiência de quem mora e trabalha no condomínio.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {OPERATIONS.map((feature) => (
            <article
              key={feature.title}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[#d6dbd4] bg-white shadow-[0_18px_32px_rgba(21,41,31,0.08)] transition duration-200 hover:-translate-y-1 hover:border-[#2f4b3d] hover:shadow-[0_22px_40px_rgba(21,41,31,0.12)]"
            >
              {feature.image && (
                <div className="relative aspect-[4/3] overflow-hidden bg-[#f4f7f3]">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="h-full w-full object-cover transition duration-200 group-hover:scale-[1.01]"
                    loading="lazy"
                  />
                </div>
              )}

              <div className="flex flex-1 flex-col gap-4 p-6">
                <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#e8f0ea] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#2f4b3d]">
                  <span className="inline-block h-2 w-2 rounded-full bg-[#2f4b3d]" aria-hidden />
                  {feature.badge}
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-[#15291f]">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-[#475e52]">{feature.description}</p>
                </div>
                {feature.ctaLabel && feature.href && (
                  <button
                    type="button"
                    onClick={() => onNavigate(feature.href)}
                    className="mt-auto inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#2f4b3d] transition hover:text-[#1f3327] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#a3b18a] focus-visible:ring-offset-white"
                  >
                    {feature.ctaLabel}
                    <span aria-hidden>→</span>
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
