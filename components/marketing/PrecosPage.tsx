import { useEffect, useState } from 'react';
import { MarketingLayout, type MarketingPageProps } from './MarketingLayout';

interface Plano {
  nome: string;
  preco: string;
  descricao: string;
  recursos: string[];
  destaque?: boolean;
  badge?: string;
}

const PLANOS: Plano[] = [
  {
    nome: 'Essencial',
    preco: 'R$ 2,90 / unidade',
    descricao: 'Tudo para sair do papel com uma operação organizada em poucos dias.',
    recursos: [
      'Boletos registrados e conciliação automática',
      'Comunicados e murais ilimitados',
      'Reservas com aprovação automática',
      'Suporte via chat em horário comercial',
    ],
  },
  {
    nome: 'Gestão+',
    preco: 'R$ 4,90 / unidade',
    descricao: 'O plano favorito das administradoras: automação financeira completa e marketplace nativo.',
    recursos: [
      'Workflows de inadimplência com acordos digitais',
      'Marketplace integrado com split automático',
      'Dashboards executivos e exportação para BI',
      'Suporte dedicado com gerente de sucesso',
    ],
    destaque: true,
    badge: 'Mais escolhido',
  },
  {
    nome: 'Enterprise',
    preco: 'Sob consulta',
    descricao: 'Projetos com integração profunda, squads dedicados e SLA personalizado.',
    recursos: [
      'API aberta e webhooks avançados',
      'Integração com ERPs e data warehouse',
      'Treinamento in loco e onboarding premium',
      'Canal direto com product managers',
    ],
  },
];

const ADICIONAIS = [
  {
    nome: 'Assistente virtual 24/7',
    valor: 'R$ 499 / mês',
    descricao: 'Chat com IA especializado em condomínio, treinado com seus documentos e comunicados.',
    beneficio: 'Reduza o tempo de resposta em todos os canais.',
    icone: '🤖',
  },
  {
    nome: 'Portaria conectada',
    valor: 'a partir de R$ 1.290',
    descricao: 'Integração com controladoras, leitura de placas e reconhecimento facial.',
    beneficio: 'Aumente a segurança sem fricção para visitantes.',
    icone: '🚪',
  },
  {
    nome: 'Squad de implantação',
    valor: 'Sob demanda',
    descricao: 'Equipe dedicada para migrar dezenas de condomínios simultaneamente.',
    beneficio: 'Comece rápido com especialistas focados no seu projeto.',
    icone: '🛠️',
  },
];

type PlanoStatus = 'included' | 'optional' | 'unavailable';

const RECURSOS: Array<{ nome: string; planos: PlanoStatus[]; label?: string }> = [
  {
    nome: 'Conciliação automática',
    planos: ['included', 'included', 'included'],
  },
  {
    nome: 'Marketplace interno',
    planos: ['unavailable', 'included', 'included'],
  },
  {
    nome: 'API e webhooks',
    planos: ['unavailable', 'optional', 'included'],
    label: 'Opcional',
  },
  {
    nome: 'Gerente de sucesso dedicado',
    planos: ['unavailable', 'included', 'included'],
  },
  {
    nome: 'Treinamento presencial',
    planos: ['unavailable', 'optional', 'included'],
    label: 'Opcional',
  },
];

export function MarketingPrecosPage({ onNavigate, onLogin }: MarketingPageProps) {
  const [billingCycle, setBillingCycle] = useState<'mensal' | 'anual'>('mensal');
  const [hoveredColumn, setHoveredColumn] = useState<number | null>(null);

  useEffect(() => {
    document.title = 'Preços — MeuCondomínio';
  }, []);

  return (
    <MarketingLayout currentPath="/precos" onNavigate={onNavigate} onLogin={onLogin}>
      <section className="marketing-section" aria-labelledby="precos-heading">
        <div className="marketing-section-header">
          <span className="marketing-badge" aria-hidden="true">
            Preços transparentes
          </span>
          <h1 id="precos-heading" className="marketing-title">
            Planos que escalam com a sua operação.
          </h1>
          <p className="marketing-lead">
            Sem taxas escondidas: você paga por unidade ativa e pode ativar módulos extras conforme evolui.
          </p>
        </div>
      </section>

      <section className="marketing-section" aria-labelledby="planos-heading">
        <h2 id="planos-heading" className="marketing-tagline">
          Escolha o plano certo para o seu momento.
        </h2>

        <div className="pricing-toggle" role="group" aria-label="Alternar ciclo de cobrança">
          <button
            type="button"
            className={`pricing-toggle-option ${billingCycle === 'mensal' ? 'active' : ''}`}
            aria-pressed={billingCycle === 'mensal'}
            onClick={() => setBillingCycle('mensal')}
          >
            Mensal
          </button>
          <button
            type="button"
            className={`pricing-toggle-option ${billingCycle === 'anual' ? 'active' : ''}`}
            aria-pressed={billingCycle === 'anual'}
            onClick={() => setBillingCycle('anual')}
          >
            Anual <span className="pricing-toggle-badge">-15%</span>
          </button>
        </div>

        <div className="marketing-grid-2">
          {PLANOS.map((plano) => (
            <article
              key={plano.nome}
              className={`marketing-card pricing-plan-card ${plano.destaque ? 'marketing-card-featured pricing-plan-card-featured' : ''}`}
              aria-label={`Plano ${plano.nome}`}
            >
              {plano.badge ? <span className="pricing-badge">{plano.badge}</span> : null}
              <h3>{plano.nome}</h3>
              <p className="marketing-price">{plano.preco}</p>
              <p>{plano.descricao}</p>
              <ul className="marketing-list">
                {plano.recursos.map((recurso) => (
                  <li key={recurso}>
                    <strong>•</strong>
                    <span>{recurso}</span>
                  </li>
                ))}
              </ul>
              {plano.destaque ? (
                <div className="marketing-hero-actions">
                  <a
                    href="/demo"
                    onClick={(event) => {
                      event.preventDefault();
                      onNavigate('/demo');
                    }}
                  >
                    Falar com vendas
                  </a>
                  <a
                    className="secondary"
                    href="/comece"
                    onClick={(event) => {
                      event.preventDefault();
                      onNavigate('/comece');
                    }}
                  >
                    Ativar agora
                  </a>
                </div>
              ) : null}
            </article>
          ))}
        </div>

        <p className="marketing-note">
          Valores válidos para contratos anuais com faturamento mínimo de 200 unidades. Consulte condições para planos
          mensais ou acima de 5.000 unidades.
        </p>
      </section>

      <section className="marketing-section" aria-labelledby="adicionais-heading">
        <div className="marketing-section-header">
          <span className="marketing-badge" aria-hidden="true">
            Serviços adicionais
          </span>
          <h2 id="adicionais-heading" className="marketing-tagline">
            Potencialize sua operação com especialistas.
          </h2>
        </div>

        <div className="marketing-columns">
          {ADICIONAIS.map((extra) => (
            <article key={extra.nome} className="marketing-card" aria-label={extra.nome}>
              <div className="pricing-addon-header">
                <span className="pricing-addon-icon" aria-hidden="true">
                  {extra.icone}
                </span>
                <div>
                  <h3>{extra.nome}</h3>
                  <p className="marketing-price" style={{ fontSize: 24 }}>{extra.valor}</p>
                </div>
              </div>
              <p>
                <strong>{extra.beneficio}</strong> {extra.descricao}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="marketing-section" aria-labelledby="comparativo-heading">
        <div className="marketing-section-header">
          <span className="marketing-badge" aria-hidden="true">
            Comparativo rápido
          </span>
          <h2 id="comparativo-heading" className="marketing-tagline">
            Recursos por plano.
          </h2>
        </div>

        <table
          className="marketing-table"
          onMouseLeave={() => setHoveredColumn(null)}
          aria-label="Comparativo de recursos por plano"
        >
          <thead>
            <tr>
              <th
                className={`pricing-resource-col ${hoveredColumn === 0 ? 'is-hovered' : ''}`}
                onMouseEnter={() => setHoveredColumn(0)}
              >
                Recurso
              </th>
              {PLANOS.map((plano, index) => (
                <th
                  key={plano.nome}
                  className={hoveredColumn === index + 1 ? 'is-hovered' : ''}
                  onMouseEnter={() => setHoveredColumn(index + 1)}
                >
                  {plano.nome}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {RECURSOS.map((recurso) => (
              <tr key={recurso.nome}>
                <td
                  className={`pricing-resource-col ${hoveredColumn === 0 ? 'is-hovered' : ''}`}
                  onMouseEnter={() => setHoveredColumn(0)}
                >
                  {recurso.nome}
                </td>
                {recurso.planos.map((status, index) => {
                  const colIndex = index + 1;
                  const isUnavailable = status === 'unavailable';
                  const isOptional = status === 'optional' && recurso.label;

                  return (
                    <td
                      key={`${recurso.nome}-${PLANOS[index].nome}`}
                      className={`${hoveredColumn === colIndex ? 'is-hovered' : ''} ${isUnavailable ? 'pricing-unavailable' : ''}`}
                      onMouseEnter={() => setHoveredColumn(colIndex)}
                    >
                      {isUnavailable ? (
                        <span title="Não incluído neste plano" aria-label="Não incluído neste plano">
                          ×
                        </span>
                      ) : isOptional ? (
                        recurso.label
                      ) : (
                        '✔︎'
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </MarketingLayout>
  );
}
