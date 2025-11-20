import { Fragment } from 'react';

import { Container } from './Container';

const filters = [
  { label: 'Categoria', placeholder: 'Selecione categoria', options: ['Limpeza', 'Manutenção', 'Segurança', 'Administração'] },
  { label: 'Faixa de preço', placeholder: 'Todos os valores', options: ['Até R$ 2.000', 'R$ 2.000 - R$ 5.000', 'Acima de R$ 5.000'] },
  { label: 'Nota mínima', placeholder: 'Qualidade mínima', options: ['4.5+', '4.0+', '3.5+'] },
  { label: 'SLA (resposta)', placeholder: 'Tempo máximo', options: ['Até 1h', 'Até 4h', 'Até 24h'] },
];

const services = [
  {
    name: 'Manutenção de elevadores',
    vendor: 'VertCondo',
    logo: 'V',
    rating: 4.9,
    reviews: 182,
    priceRange: 'Planos a partir de R$ 3.800/mês',
    badges: ['Preferido pelos síndicos', 'Resposta em até 2h'],
    cta: 'Solicitar orçamento',
  },
  {
    name: 'Portaria remota',
    vendor: 'PortSafe',
    logo: 'P',
    rating: 4.7,
    reviews: 96,
    priceRange: 'R$ 14 a R$ 20 por unidade',
    badges: ['Recomendado para seu perfil'],
    cta: 'Contratar',
  },
  {
    name: 'Limpeza e conservação',
    vendor: 'Brilho Verde',
    logo: 'B',
    rating: 4.6,
    reviews: 142,
    priceRange: 'Equipe completa a partir de R$ 9.500',
    badges: ['Preferido pelos síndicos', 'Pacote mensal'],
    cta: 'Solicitar orçamento',
  },
  {
    name: 'Segurança eletrônica',
    vendor: 'GuardTec',
    logo: 'G',
    rating: 4.8,
    reviews: 75,
    priceRange: 'Projeto sob medida',
    badges: ['Recomendado para seu perfil', 'Monitoramento 24/7'],
    cta: 'Solicitar orçamento',
  },
  {
    name: 'Manutenção de piscina',
    vendor: 'BlueWave',
    logo: 'BW',
    rating: 4.5,
    reviews: 54,
    priceRange: 'Planos quinzenais a partir de R$ 1.200',
    badges: ['Resposta em até 4h'],
    cta: 'Contratar',
  },
  {
    name: 'Jardinagem e paisagismo',
    vendor: 'Raízes Urbanas',
    logo: 'R',
    rating: 4.6,
    reviews: 61,
    priceRange: 'Pacotes sazonais',
    badges: ['Preferido pelos síndicos'],
    cta: 'Solicitar orçamento',
  },
];

function Rating({ value, reviews }: { value: number; reviews: number }) {
  const filledStars = Math.round(value);

  return (
    <div className="flex items-center gap-2 text-sm font-semibold text-emerald-900 dark:text-emerald-50">
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className={`text-lg ${index < filledStars ? 'text-amber-400' : 'text-emerald-200 dark:text-emerald-900'}`}
            aria-hidden
          >
            ★
          </span>
        ))}
      </div>
      <span>{value.toFixed(1)}</span>
      <span className="text-xs font-medium text-emerald-700/80 dark:text-emerald-100/70">({reviews} avaliações)</span>
    </div>
  );
}

function FilterSelect({ label, placeholder, options }: (typeof filters)[number]) {
  return (
    <label className="flex flex-1 min-w-[13rem] flex-col gap-2">
      <span className="text-xs font-semibold uppercase tracking-wide text-emerald-900/80 dark:text-emerald-100/80">{label}</span>
      <div className="relative">
        <select className="w-full appearance-none rounded-xl border border-emerald-100 bg-white px-4 py-3 text-sm font-medium text-emerald-900 shadow-sm shadow-emerald-900/5 transition focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-200/60 dark:border-emerald-500/20 dark:bg-emerald-950/50 dark:text-emerald-50">
          <option>{placeholder}</option>
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500">▼</span>
      </div>
    </label>
  );
}

function ServiceCard({
  name,
  vendor,
  logo,
  rating,
  reviews,
  priceRange,
  badges,
  cta,
}: (typeof services)[number]) {
  return (
    <article className="group flex h-full flex-col gap-4 rounded-2xl border border-emerald-50/80 bg-white/90 p-5 shadow-sm shadow-emerald-900/5 transition duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-emerald-500/15 dark:bg-emerald-950/50">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 text-lg font-bold text-emerald-800 shadow-inner shadow-emerald-900/5 dark:border-emerald-500/20 dark:bg-emerald-900/60 dark:text-emerald-50">
            {logo}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-50">{name}</h3>
            <p className="text-sm font-medium text-emerald-700/90 dark:text-emerald-100/80">{vendor}</p>
          </div>
        </div>
        <Rating value={rating} reviews={reviews} />
      </div>

      <p className="text-sm text-emerald-900/80 dark:text-emerald-100/80">{priceRange}</p>

      <div className="flex flex-wrap gap-2">
        {badges.map((badge) => (
          <span
            key={badge}
            className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 shadow-sm shadow-emerald-900/5 dark:border-emerald-500/25 dark:bg-emerald-900/60 dark:text-emerald-50"
          >
            {badge}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between gap-3 pt-2">
        <div className="text-xs font-medium uppercase tracking-wide text-emerald-700/80 dark:text-emerald-100/70">
          SLA personalizado • serviços verificados
        </div>
        <button className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-900/20 transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-300/70 dark:bg-emerald-500 dark:hover:bg-emerald-400">
          {cta}
        </button>
      </div>
    </article>
  );
}

export function CondoMarketplace() {
  return (
    <section className="bg-gradient-to-b from-emerald-50 via-white to-white py-12 dark:from-emerald-950 dark:via-emerald-950 dark:to-emerald-950">
      <Container className="space-y-8">
        <header className="space-y-3 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700/80 dark:text-emerald-100/80">
            Curadoria exclusiva
          </p>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-emerald-900 dark:text-emerald-50 sm:text-4xl">
              Marketplace do seu condomínio
            </h2>
            <p className="text-lg text-emerald-800/80 dark:text-emerald-100/80">
              Serviços pré-selecionados para o seu perfil e com condições negociadas para condomínios.
            </p>
          </div>
        </header>

        <div className="rounded-2xl border border-emerald-100 bg-white/90 p-6 shadow-sm shadow-emerald-900/5 dark:border-emerald-500/20 dark:bg-emerald-950/40">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {filters.map((filter) => (
              <FilterSelect key={filter.label} {...filter} />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <Fragment key={service.name}>
              <ServiceCard {...service} />
            </Fragment>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default CondoMarketplace;
