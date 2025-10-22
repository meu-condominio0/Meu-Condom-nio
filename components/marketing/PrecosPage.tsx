import { useEffect } from 'react';
import { MarketingLayout, type MarketingPageProps } from './MarketingLayout';

interface Plano {
  nome: string;
  preco: string;
  descricao: string;
  recursos: string[];
  destaque?: boolean;
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
  },
  {
    nome: 'Portaria conectada',
    valor: 'a partir de R$ 1.290',
    descricao: 'Integração com controladoras, leitura de placas e reconhecimento facial.',
  },
  {
    nome: 'Squad de implantação',
    valor: 'Sob demanda',
    descricao: 'Equipe dedicada para migrar dezenas de condomínios simultaneamente.',
  },
];

export function MarketingPrecosPage({ onNavigate, onLogin }: MarketingPageProps) {
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

        <div className="marketing-grid-2">
          {PLANOS.map((plano) => (
            <article
              key={plano.nome}
              className={`marketing-card ${plano.destaque ? 'marketing-card-featured' : ''}`}
              aria-label={`Plano ${plano.nome}`}
            >
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
              <h3>{extra.nome}</h3>
              <p className="marketing-price" style={{ fontSize: 24 }}>{extra.valor}</p>
              <p>{extra.descricao}</p>
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

        <table className="marketing-table">
          <thead>
            <tr>
              <th>Recurso</th>
              {PLANOS.map((plano) => (
                <th key={plano.nome}>{plano.nome}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Conciliação automática</td>
              <td>✔︎</td>
              <td>✔︎</td>
              <td>✔︎</td>
            </tr>
            <tr>
              <td>Marketplace interno</td>
              <td>—</td>
              <td>✔︎</td>
              <td>✔︎</td>
            </tr>
            <tr>
              <td>API e webhooks</td>
              <td>—</td>
              <td>Opcional</td>
              <td>✔︎</td>
            </tr>
            <tr>
              <td>Gerente de sucesso dedicado</td>
              <td>—</td>
              <td>✔︎</td>
              <td>✔︎</td>
            </tr>
            <tr>
              <td>Treinamento presencial</td>
              <td>—</td>
              <td>Opcional</td>
              <td>✔︎</td>
            </tr>
          </tbody>
        </table>
      </section>
    </MarketingLayout>
  );
}
