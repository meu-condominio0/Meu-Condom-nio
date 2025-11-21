import { useEffect } from 'react';
import { MarketingLayout, type MarketingPageProps } from './MarketingLayout';

const CANAIS = [
  {
    titulo: 'Central de ajuda',
    descricao:
      'Base de conhecimento com passo a passo, vídeos curtos e checklists imprimíveis para a equipe do condomínio.',
    detalhes: ['+200 artigos revisados todo mês', 'Pesquisa inteligente com IA', 'Tradução automática para inglês e espanhol'],
    canais: ['Pesquisa inteligente', 'Artigos', 'Vídeos', 'Modelos prontos'],
    status: 'Disponível agora',
    cta: { label: 'Acessar central de ajuda', href: '/central-ajuda' },
  },
  {
    titulo: 'Suporte humano em múltiplos canais',
    descricao: 'Atendimento por chat, e-mail e WhatsApp com SLA garantido e monitoramento de satisfação em tempo real.',
    detalhes: ['SLA de 2 minutos no chat', 'Histórico completo de interações', 'Escalonamento para especialistas financeiros'],
    canais: ['Chat', 'E-mail', 'WhatsApp', 'Telefone'],
    status: 'Disponível agora',
  },
  {
    titulo: 'Universidade MeuCondomínio',
    descricao: 'Treinamentos ao vivo e gravados para síndicos, conselheiros e equipes operacionais.',
    detalhes: ['Trilhas por perfil', 'Certificação de síndicos', 'Workshops exclusivos para administradoras'],
    canais: ['Ao vivo', 'Vídeos', 'Certificações', 'Workshops'],
    status: 'Turmas semanais',
  },
];

const HERO_METRICAS = [
  { titulo: 'SLA médio', valor: '2 minutos no chat', detalhe: 'Atendimento priorizado por criticidade' },
  { titulo: 'NPS de suporte', valor: '92', detalhe: 'Monitorado em tempo real a cada chamado' },
  { titulo: 'Horários de atendimento', valor: '7h às 19h (BRT)', detalhe: 'Plantão emergencial fora do horário' },
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
        <div className="marketing-hero-grid">
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

          <article className="marketing-card marketing-hero-card" aria-label="Métricas de suporte em tempo real">
            <header className="marketing-hero-card__header">
              <div>
                <span className="marketing-badge" aria-hidden="true">
                  Monitoramento 24/7
                </span>
                <h2 className="marketing-card-title">Indicadores operacionais</h2>
              </div>
              <span className="marketing-status-dot" aria-label="Status do suporte" />
            </header>

            <div className="marketing-hero-card__metrics">
              {HERO_METRICAS.map((item) => (
                <div key={item.titulo} className="marketing-hero-card__metric" aria-label={item.titulo}>
                  <div className="marketing-hero-card__metric-value">{item.valor}</div>
                  <div className="marketing-hero-card__metric-label">{item.titulo}</div>
                  <p className="marketing-hero-card__metric-detail">{item.detalhe}</p>
                </div>
              ))}
            </div>
          </article>
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
              <div className="marketing-chip-row" aria-label="Canais disponíveis">
                {canal.canais.map((canalDisponivel) => (
                  <span key={canalDisponivel} className="marketing-chip">
                    {canalDisponivel}
                  </span>
                ))}
              </div>
              <div className="marketing-status-row" aria-label={`Status: ${canal.status}`}>
                <span className="marketing-status-dot" aria-hidden="true" />
                <span className="marketing-status-label">{canal.status}</span>
              </div>
              <ul className="marketing-list">
                {canal.detalhes.map((detalhe) => (
                  <li key={detalhe}>
                    <strong>•</strong>
                    <span>{detalhe}</span>
                  </li>
                ))}
              </ul>
              {canal.cta ? (
                <a
                  className="marketing-cta"
                  href={canal.cta.href}
                  onClick={(event) => {
                    event.preventDefault();
                    onNavigate(canal.cta?.href ?? '/');
                  }}
                >
                  {canal.cta.label}
                </a>
              ) : null}
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
