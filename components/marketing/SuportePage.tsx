import { useEffect } from 'react';
import { MarketingLayout, type MarketingPageProps } from './MarketingLayout';

const CANAIS = [
  {
    titulo: 'Central de ajuda',
    descricao:
      'Base de conhecimento com passo a passo, vídeos curtos e checklists imprimíveis para a equipe do condomínio.',
    detalhes: ['+200 artigos revisados todo mês', 'Pesquisa inteligente com IA', 'Tradução automática para inglês e espanhol'],
  },
  {
    titulo: 'Suporte humano em múltiplos canais',
    descricao: 'Atendimento por chat, e-mail e WhatsApp com SLA garantido e monitoramento de satisfação em tempo real.',
    detalhes: ['SLA de 2 minutos no chat', 'Histórico completo de interações', 'Escalonamento para especialistas financeiros'],
  },
  {
    titulo: 'Universidade MeuCondomínio',
    descricao: 'Treinamentos ao vivo e gravados para síndicos, conselheiros e equipes operacionais.',
    detalhes: ['Trilhas por perfil', 'Certificação de síndicos', 'Workshops exclusivos para administradoras'],
  },
];

const STATUS = [
  { indicador: '98%', descricao: 'dos tickets resolvidos no primeiro contato' },
  { indicador: '4,92/5', descricao: 'nota média de satisfação no último trimestre' },
  { indicador: '12 idiomas', descricao: 'suporte multilíngue para moradores internacionais' },
];

export function MarketingSuportePage({ onNavigate, onLogin }: MarketingPageProps) {
  useEffect(() => {
    document.title = 'Suporte — MeuCondomínio';
  }, []);

  return (
    <MarketingLayout currentPath="/suporte" onNavigate={onNavigate} onLogin={onLogin}>
      <section className="marketing-section" aria-labelledby="suporte-heading">
        <div className="marketing-section-header">
          <span className="marketing-badge" aria-hidden="true">
            Estamos com você
          </span>
          <h1 id="suporte-heading" className="marketing-title">
            Suporte humano com velocidade de tecnologia.
          </h1>
          <p className="marketing-lead">
            Nossa equipe acompanha sua operação todos os dias para garantir moradores satisfeitos e síndicos tranquilos.
          </p>
        </div>
      </section>

      <section className="marketing-section" aria-labelledby="canais-heading">
        <h2 id="canais-heading" className="marketing-tagline">
          Canais para cada necessidade.
        </h2>

        <div className="marketing-grid-2">
          {CANAIS.map((canal) => (
            <article key={canal.titulo} className="marketing-card" aria-label={canal.titulo}>
              <h3>{canal.titulo}</h3>
              <p>{canal.descricao}</p>
              <ul className="marketing-list">
                {canal.detalhes.map((detalhe) => (
                  <li key={detalhe}>
                    <strong>•</strong>
                    <span>{detalhe}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="marketing-section" aria-labelledby="status-heading">
        <div className="marketing-section-header">
          <span className="marketing-badge" aria-hidden="true">
            Indicadores em tempo real
          </span>
          <h2 id="status-heading" className="marketing-tagline">
            Transparência total na experiência de suporte.
          </h2>
        </div>

        <div className="marketing-metrics">
          {STATUS.map((item) => (
            <div key={item.indicador} className="marketing-metric-card" aria-label={item.descricao}>
              <strong>{item.indicador}</strong>
              <span>{item.descricao}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="marketing-section" aria-labelledby="acompanhe-heading">
        <div className="marketing-section-header">
          <span className="marketing-badge" aria-hidden="true">
            Acompanhamento proativo
          </span>
          <h2 id="acompanhe-heading" className="marketing-tagline">
            Seu gerente de sucesso monitora a jornada do condomínio.
          </h2>
          <p className="marketing-subtitle">
            Reuniões trimestrais de negócio, relatórios mensais e planos de ação personalizados garantem evolução contínua.
          </p>
        </div>

        <div className="marketing-hero-actions" role="group" aria-label="Entre em contato com o suporte">
          <a
            href="/demo"
            onClick={(event) => {
              event.preventDefault();
              onNavigate('/demo');
            }}
          >
            Falar com especialista
          </a>
          <a
            className="secondary"
            href="/entrar"
            onClick={(event) => {
              event.preventDefault();
              onLogin();
            }}
          >
            Abrir chamado
          </a>
        </div>
      </section>
    </MarketingLayout>
  );
}
