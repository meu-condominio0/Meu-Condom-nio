import { useEffect } from 'react';
import { MarketingLayout, type MarketingPageProps } from './MarketingLayout';

const AGENDA = [
  {
    titulo: 'Panorama da plataforma',
    descricao: 'Demonstração guiada dos principais módulos com foco no que é relevante para seu condomínio.',
    duracao: '15 min',
  },
  {
    titulo: 'Profundidade financeira',
    descricao: 'Conciliamos um caso real mostrando os dashboards, acordos digitais e prestação de contas.',
    duracao: '20 min',
  },
  {
    titulo: 'Plano de implantação',
    descricao: 'Revisamos o cronograma, responsabilidades compartilhadas e próximos passos.',
    duracao: '10 min',
  },
];

const RECURSOS = [
  'Ambiente sandbox para testes com sua equipe',
  'Material de apresentação com identidade do seu condomínio',
  'Suporte do gerente de sucesso durante o período piloto',
];

export function MarketingDemoPage({ onNavigate, onLogin }: MarketingPageProps) {
  useEffect(() => {
    document.title = 'Demonstração — MeuCondomínio';
  }, []);

  return (
    <MarketingLayout currentPath="/demo" onNavigate={onNavigate} onLogin={onLogin}>
      <section className="marketing-section" aria-labelledby="demo-heading">
        <div className="marketing-section-header">
          <span className="marketing-badge" aria-hidden="true">
            Demonstração guiada
          </span>
          <h1 id="demo-heading" className="marketing-title">
            Veja o MeuCondomínio em ação com exemplos reais.
          </h1>
          <p className="marketing-lead">
            Agende uma sessão ao vivo com especialistas que entendem da sua realidade e respondem às perguntas da equipe.
          </p>
        </div>
      </section>

      <section className="marketing-section" aria-labelledby="agenda-heading">
        <h2 id="agenda-heading" className="marketing-tagline">
          O que acontece na demonstração.
        </h2>

        <div className="marketing-grid-2">
          {AGENDA.map((item) => (
            <article key={item.titulo} className="marketing-card" aria-label={item.titulo}>
              <h3>{item.titulo}</h3>
              <p>{item.descricao}</p>
              <span className="marketing-note">Duração aproximada: {item.duracao}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="marketing-section" aria-labelledby="recursos-heading">
        <div className="marketing-section-header">
          <span className="marketing-badge" aria-hidden="true">
            Você recebe após a demo
          </span>
          <h2 id="recursos-heading" className="marketing-tagline">
            Materiais para levar ao conselho e moradores.
          </h2>
        </div>

        <div className="marketing-grid">
          {RECURSOS.map((recurso) => (
            <article key={recurso} className="marketing-card" aria-label={recurso}>
              <h3>{recurso}</h3>
              <p>
                Disponibilizamos materiais e suporte para ajudar na aprovação interna e na comunicação com toda a comunidade.
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="marketing-section" aria-labelledby="cta-demo">
        <div className="marketing-section-header">
          <span className="marketing-badge" aria-hidden="true">
            Pronto para avançar?
          </span>
          <h2 id="cta-demo" className="marketing-tagline">
            Escolha um horário e receba o link na hora.
          </h2>
          <p className="marketing-subtitle">
            Sessões disponíveis de segunda a sábado. Enviaremos um resumo com os próximos passos após o encontro.
          </p>
        </div>

        <div className="marketing-hero-actions" role="group" aria-label="Agendar demonstração">
          <a
            href="/comece"
            onClick={(event) => {
              event.preventDefault();
              onNavigate('/comece');
            }}
          >
            Agendar agora
          </a>
          <a
            className="secondary"
            href="/entrar"
            onClick={(event) => {
              event.preventDefault();
              onLogin();
            }}
          >
            Sou cliente e quero suporte
          </a>
        </div>
      </section>
    </MarketingLayout>
  );
}
