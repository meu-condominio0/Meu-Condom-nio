import { useEffect } from 'react';
import { MarketingLayout, type MarketingPageProps } from './MarketingLayout';

const CATEGORIAS = [
  {
    titulo: 'Serviços especializados',
    descricao: 'Limpeza, manutenção, personal trainers, aulas particulares e mais — tudo com reputação validada.',
  },
  {
    titulo: 'Produtos dos vizinhos',
    descricao: 'Padarias artesanais, hortifrúti fresquinho, itens de decoração e bazares colaborativos.',
  },
  {
    titulo: 'Ofertas de parceiros',
    descricao: 'Seguros, energia solar, internet, aulas de idiomas e outros benefícios negociados pela administradora.',
  },
];

const BENEFICIOS = [
  {
    titulo: 'Economia local fortalecida',
    descricao: 'Moradores vendem e compram com quem já conhecem, mantendo renda dentro da comunidade.',
  },
  {
    titulo: 'Segurança e confiança',
    descricao: 'Todos os perfis passam por validação. Pagamentos e entregas são registrados com rastreabilidade total.',
  },
  {
    titulo: 'Gestão financeira automática',
    descricao: 'Taxas administrativas e repasses entram direto no caixa do condomínio, sem planilhas manuais.',
  },
];

const DADOS = [
  { indicador: 'R$ 280 mil', descricao: 'movimentados em média por condomínio no primeiro ano' },
  { indicador: '67%', descricao: 'dos moradores ativos compram ou vendem ao menos uma vez por trimestre' },
  { indicador: '12 dias', descricao: 'para configurar catálogo, regras e iniciar o marketplace' },
];

export function MarketingMarketplacePage({ onNavigate, onLogin }: MarketingPageProps) {
  useEffect(() => {
    document.title = 'Marketplace — MeuCondomínio';
  }, []);

  return (
    <MarketingLayout currentPath="/marketplace" onNavigate={onNavigate} onLogin={onLogin}>
      <section className="marketing-section" aria-labelledby="marketplace-hero">
        <div className="marketing-section-header">
          <span className="marketing-badge" aria-hidden="true">
            Novo canal de receita
          </span>
          <h1 id="marketplace-hero" className="marketing-title">
            Marketplace exclusivo para o seu condomínio.
          </h1>
          <p className="marketing-lead">
            Transforme áreas comuns ociosas em oportunidades de negócio, incentive o empreendedorismo local e fortaleça a
            sensação de comunidade.
          </p>
        </div>
      </section>

      <section className="marketing-section" aria-labelledby="categorias-heading">
        <h2 id="categorias-heading" className="marketing-tagline">
          Tudo o que moradores e parceiros precisam em um só lugar.
        </h2>

        <div className="marketing-grid">
          {CATEGORIAS.map((categoria) => (
            <article key={categoria.titulo} className="marketing-card" aria-label={categoria.titulo}>
              <h3>{categoria.titulo}</h3>
              <p>{categoria.descricao}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="marketing-section" aria-labelledby="beneficios-heading">
        <div className="marketing-section-header">
          <span className="marketing-badge" aria-hidden="true">
            Benefícios imediatos
          </span>
          <h2 id="beneficios-heading" className="marketing-tagline">
            Vantagens para moradores, síndicos e administradora.
          </h2>
        </div>

        <div className="marketing-grid-2">
          {BENEFICIOS.map((beneficio) => (
            <article key={beneficio.titulo} className="marketing-card" aria-label={beneficio.titulo}>
              <h3>{beneficio.titulo}</h3>
              <p>{beneficio.descricao}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="marketing-section" aria-labelledby="dados-heading">
        <div className="marketing-section-header">
          <span className="marketing-badge" aria-hidden="true">
            Resultados reais
          </span>
          <h2 id="dados-heading" className="marketing-tagline">
            Crescimento consistente desde o primeiro mês.
          </h2>
        </div>

        <div className="marketing-metrics">
          {DADOS.map((dado) => (
            <div key={dado.indicador} className="marketing-metric-card" aria-label={dado.descricao}>
              <strong>{dado.indicador}</strong>
              <span>{dado.descricao}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="marketing-section" aria-labelledby="cta-marketplace">
        <div className="marketing-section-header">
          <span className="marketing-badge" aria-hidden="true">
            Comece hoje
          </span>
          <h2 id="cta-marketplace" className="marketing-tagline">
            Configure o marketplace junto com nosso time.
          </h2>
          <p className="marketing-subtitle">
            Em menos de duas semanas você tem catálogo, regras de repasse e campanhas de lançamento prontas.
          </p>
        </div>

        <div className="marketing-hero-actions" role="group" aria-label="Atalhos do marketplace">
          <a
            href="/comece"
            onClick={(event) => {
              event.preventDefault();
              onNavigate('/comece');
            }}
          >
            Quero implementar
          </a>
          <a
            className="secondary"
            href="/demo"
            onClick={(event) => {
              event.preventDefault();
              onNavigate('/demo');
            }}
          >
            Ver demonstração
          </a>
        </div>
      </section>
    </MarketingLayout>
  );
}
