import { useEffect } from 'react';
import Hero from '@/src/components/Hero';
import { MarketingLayout, type MarketingPageProps } from './MarketingLayout';

const HERO_FEATURES = [
  {
    title: 'Financeiro turbo',
    description:
      'Boletos com registro automático, conciliação em tempo real e projeção de fluxo de caixa para decisões sem sustos.',
  },
  {
    title: 'Comunicação inteligente',
    description:
      'Envie comunicados segmentados, automatize avisos e acompanhe a leitura em tempo real com recibos digitais.',
  },
  {
    title: 'Operações conectadas',
    description:
      'Reservas, ocorrências, assembleias digitais e marketplace funcionando de ponta a ponta em uma só plataforma.',
  },
];

const MODULES = [
  {
    title: 'Gestão financeira completa',
    points: [
      'Fluxo de caixa unificado',
      'Prestação de contas com um clique',
      'Integração bancária automática',
    ],
  },
  {
    title: 'Experiência premium para moradores',
    points: [
      'Aplicativo com marca do condomínio',
      'Atendimento 24/7 com assistente virtual',
      'Marketplace interno para serviços e produtos',
    ],
  },
  {
    title: 'Superpoderes para o síndico',
    points: [
      'Dashboards com indicadores de inadimplência',
      'Workflows automatizados para tarefas recorrentes',
      'Biblioteca de documentos sempre atualizada',
    ],
  },
];

const METRICS = [
  { value: '92%', label: 'redução no tempo de fechamento mensal' },
  { value: '3x', label: 'mais engajamento dos moradores no app' },
  { value: '48h', label: 'para colocar o condomínio em produção' },
  { value: '∞', label: 'integrações com bancos e fabricantes de IoT' },
];

const TESTIMONIALS = [
  {
    quote:
      '“Migramos 12 condomínios em menos de uma semana. O MeuCondomínio trouxe transparência para o conselho e reduziu em 63% as visitas presenciais ao escritório.”',
    author: 'Marina Lopes — Gestora na Vizinhança Administradora',
  },
  {
    quote:
      '“O marketplace interno virou uma fonte de renda para os moradores. Já foram mais de 800 serviços contratados sem sair do aplicativo.”',
    author: 'André Cavalcanti — Síndico profissional',
  },
];

export function MarketingHomePage({ onNavigate, onLogin }: MarketingPageProps) {
  useEffect(() => {
    document.title = 'MeuCondomínio — Seu condomínio 10x mais eficiente.';
  }, []);

  return (
    <MarketingLayout currentPath="/" onNavigate={onNavigate} onLogin={onLogin}>
      <Hero
        variant="A"
        onPrimaryClick={() => onNavigate('/comece')}
        onSecondaryClick={() => onNavigate('/demo')}
      />

      <section className="marketing-section" aria-labelledby="destaques-heading">
        <div className="marketing-section-header">
          <span className="marketing-badge" aria-hidden="true">
            Feito para administradoras modernas
          </span>
          <h2 id="destaques-heading" className="marketing-tagline">
            Tudo o que você precisa para comandar um condomínio de forma impecável.
          </h2>
        </div>

        <div className="marketing-grid">
          {HERO_FEATURES.map((feature) => (
            <article key={feature.title} className="marketing-card" aria-label={feature.title}>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="marketing-section" aria-labelledby="marketplace-heading">
        <div className="marketing-highlight-card marketing-card" style={{ gap: 20 }}>
          <span className="marketing-badge" aria-hidden="true">
            Diferencial exclusivo
          </span>
          <h2 id="marketplace-heading" className="marketing-tagline">
            Marketplace do condomínio conectado ao financeiro.
          </h2>
          <p className="marketing-subtitle">
            Moradores vendem produtos, oferecem serviços e contratam especialistas com a segurança da portaria.
            Todos os repasses e taxas são conciliados automaticamente com o caixa do condomínio.
          </p>
          <div className="marketing-pill-list">
            <span className="marketing-pill">Classificados com aprovação em 1 clique</span>
            <span className="marketing-pill">Pagamentos via PIX e cartão</span>
            <span className="marketing-pill">Histórico de reputação e avaliações</span>
            <span className="marketing-pill">Cupons para fornecedores parceiros</span>
          </div>
          <div className="marketing-hero-actions" role="group" aria-label="Ações do marketplace">
            <a
              href="/marketplace"
              onClick={(event) => {
                event.preventDefault();
                onNavigate('/marketplace');
              }}
            >
              Explorar marketplace
            </a>
            <a
              className="secondary"
              href="/entrar"
              onClick={(event) => {
                event.preventDefault();
                onLogin();
              }}
            >
              Entrar para anunciar
            </a>
          </div>
        </div>
      </section>

      <section className="marketing-section" aria-labelledby="modulos-heading">
        <div className="marketing-section-header">
          <span className="marketing-badge" aria-hidden="true">
            Plataforma modular
          </span>
          <h2 id="modulos-heading" className="marketing-tagline">
            Escolha os módulos que fazem sentido hoje e ative novos recursos quando precisar.
          </h2>
        </div>

        <div className="marketing-grid-2">
          {MODULES.map((module) => (
            <article key={module.title} className="marketing-card" aria-label={module.title}>
              <h3>{module.title}</h3>
              <ul className="marketing-list">
                {module.points.map((point) => (
                  <li key={point}>
                    <strong>•</strong>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="marketing-section" aria-labelledby="metricas-heading">
        <div className="marketing-section-header">
          <span className="marketing-badge" aria-hidden="true">
            Resultados comprovados
          </span>
          <h2 id="metricas-heading" className="marketing-tagline">
            Impacto real nos números do condomínio.
          </h2>
        </div>

        <div className="marketing-metrics">
          {METRICS.map((metric) => (
            <div key={metric.value} className="marketing-metric-card" aria-label={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="marketing-section" aria-labelledby="depoimentos-heading">
        <div className="marketing-section-header">
          <span className="marketing-badge" aria-hidden="true">
            Histórias reais
          </span>
          <h2 id="depoimentos-heading" className="marketing-tagline">
            Síndicos e administradoras que transformaram a rotina com o MeuCondomínio.
          </h2>
        </div>

        <div className="marketing-columns-balanced">
          {TESTIMONIALS.map((testimonial) => (
            <figure key={testimonial.author} className="marketing-card" aria-label={`Depoimento de ${testimonial.author}`}>
              <blockquote className="marketing-quote">{testimonial.quote}</blockquote>
              <cite>{testimonial.author}</cite>
            </figure>
          ))}
        </div>
      </section>
    </MarketingLayout>
  );
}
