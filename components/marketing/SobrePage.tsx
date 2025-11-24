import { useEffect } from 'react';
import { MarketingLayout, type MarketingPageProps } from './MarketingLayout';

const MARCOS = [
  { ano: '2018', texto: 'Nasce o MeuCondomínio com foco em comunicação transparente entre síndicos e moradores.' },
  { ano: '2020', texto: 'Expansão para administradoras profissionais e primeiros fluxos financeiros automatizados.' },
  { ano: '2022', texto: 'Lançamento do marketplace interno e das integrações com bancos via open finance.' },
  { ano: '2024', texto: 'Chegada da assistente virtual com IA generativa treinada em dados do condomínio.' },
];

const VALORES = [
  {
    titulo: 'Transparência radical',
    descricao:
      'Informações acessíveis, logs detalhados e trilhas de auditoria em tudo o que acontece no condomínio.',
    icone: '🔍',
  },
  {
    titulo: 'Experiência humana',
    descricao:
      'Tecnologia que elimina ruído, mas mantém as pessoas no centro das decisões importantes.',
    icone: '💬',
  },
  {
    titulo: 'Entrega contínua',
    descricao:
      'Novas funcionalidades todas as semanas com base nos feedbacks das administradoras parceiras.',
    icone: '🚀',
  },
];

export function MarketingSobrePage({ onNavigate, onLogin }: MarketingPageProps) {
  useEffect(() => {
    document.title = 'Sobre | MeuCondomínio';
  }, []);

  return (
    <MarketingLayout currentPath="/sobre" onNavigate={onNavigate} onLogin={onLogin}>
      <section className="marketing-section" aria-labelledby="sobre-heading">
        <div className="marketing-section-header">
          <span className="marketing-badge" aria-hidden="true">
            Nossa história
          </span>
          <h1 id="sobre-heading" className="marketing-title">
            Nascemos dentro de condomínios que precisavam de mais tempo para cuidar das pessoas.
          </h1>
          <p className="marketing-lead">
            Somos um time multidisciplinar com experiência em administração condominial, produtos digitais e atendimento de
            alto padrão. Construímos tecnologia que resolve o dia a dia de quem vive e trabalha em condomínios.
          </p>
        </div>
      </section>

      <section className="marketing-section" aria-labelledby="marcos-heading">
        <h2 id="marcos-heading" className="marketing-tagline">
          Marcos que moldaram nosso produto.
        </h2>

        <div className="sobre-timeline" role="list">
          <div className="sobre-timeline-line" aria-hidden="true" />
          <div className="sobre-timeline-items">
            {MARCOS.map((marco, index) => (
              <article
                key={marco.ano}
                className="marketing-card sobre-timeline-card"
                aria-label={`Marco ${marco.ano}`}
                role="listitem"
              >
                <div className="sobre-timeline-node" aria-hidden="true">{index + 1}</div>
                <div className="sobre-timeline-content">
                  <h3>{marco.ano}</h3>
                  <p>{marco.texto}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="marketing-section" aria-labelledby="valores-heading">
        <div className="marketing-section-header">
          <span className="marketing-badge" aria-hidden="true">
            Nossos valores
          </span>
          <h2 id="valores-heading" className="marketing-tagline">
            O que guia cada decisão de produto e atendimento.
          </h2>
        </div>

        <div className="marketing-grid valores-grid">
          {VALORES.map((valor) => (
            <article key={valor.titulo} className="marketing-card valor-card" aria-label={valor.titulo}>
              <div className="valor-icone" aria-hidden="true">
                <span>{valor.icone}</span>
              </div>
              <div className="valor-conteudo">
                <h3>{valor.titulo}</h3>
                <p>{valor.descricao}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="marketing-section" aria-labelledby="equipa-heading">
        <div className="marketing-section-header">
          <span className="marketing-badge" aria-hidden="true">
            Pessoas por trás do produto
          </span>
          <h2 id="equipa-heading" className="marketing-tagline">
            Equipe distribuída, unida pelo mesmo propósito.
          </h2>
          <p className="marketing-subtitle">
            Atuamos 100% remoto com times no Brasil e em Portugal. Mantemos rituais de proximidade e visitas frequentes aos
            condomínios parceiros.
          </p>
        </div>

        <div className="marketing-grid equipe-grid" role="list">
          <article className="marketing-card equipe-card" aria-label="Equipe de produto" role="listitem">
            <h3>Produto &amp; Design</h3>
            <p>
              Pesquisadores convivem com síndicos e moradores para entender hábitos e necessidades. O resultado são
              funcionalidades que nascem com foco na experiência humana.
            </p>
          </article>
          <article className="marketing-card equipe-card" aria-label="Equipe de sucesso do cliente" role="listitem">
            <h3>Sucesso do cliente</h3>
            <p>
              Gerentes dedicados acompanham indicadores e criam planos de ação personalizados para cada administradora.
            </p>
          </article>
          <article className="marketing-card equipe-card" aria-label="Equipe de engenharia" role="listitem">
            <h3>Engenharia &amp; Dados</h3>
            <p>
              Arquitetura moderna com APIs abertas, infraestrutura em nuvem e monitoramento em tempo real para garantir
              disponibilidade em padrão bancário.
            </p>
          </article>
          <article className="marketing-card equipe-card equipe-placeholder" aria-label="Em breve" role="listitem">
            <div className="equipe-placeholder-badge">Em breve</div>
            <h3>Novos líderes e especialistas</h3>
            <p>
              Espaço reservado para apresentar as pessoas por trás dos próximos capítulos do MeuCondomínio.
            </p>
          </article>
        </div>
      </section>

      <style>{`
        .sobre-timeline {
          position: relative;
          margin: 40px 0 12px;
        }

        .sobre-timeline-line {
          position: absolute;
          inset: 0;
          margin-inline: 12px;
          width: calc(100% - 24px);
          height: 4px;
          background: linear-gradient(90deg, var(--brand), var(--brand-2));
          border-radius: 999px;
          opacity: 0.2;
        }

        .sobre-timeline-items {
          position: relative;
          display: grid;
          gap: 16px;
        }

        .sobre-timeline-card {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 14px;
          align-items: center;
          box-shadow: inset 0 1px 0 rgba(15, 61, 46, 0.04);
        }

        .sobre-timeline-node {
          width: 46px;
          height: 46px;
          display: grid;
          place-items: center;
          border-radius: 14px;
          background: linear-gradient(135deg, rgba(32, 201, 151, 0.16), rgba(15, 61, 46, 0.1));
          color: var(--brand);
          font-weight: 700;
          font-size: 16px;
          border: 1px solid rgba(15, 61, 46, 0.12);
          box-shadow: 0 6px 16px rgba(15, 61, 46, 0.12);
        }

        .sobre-timeline-content h3 {
          margin-bottom: 6px;
          font-size: 18px;
          letter-spacing: 0.2px;
        }

        .sobre-timeline-content p {
          margin: 0;
          color: var(--text-muted);
        }

        @media (min-width: 720px) {
          .sobre-timeline {
            margin: 52px 0 8px;
          }

          .sobre-timeline-items {
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
          }

          .sobre-timeline-line {
            top: 50%;
            height: 3px;
            width: 100%;
            margin: 0;
          }

          .sobre-timeline-card {
            position: relative;
            grid-template-columns: 1fr;
            gap: 10px;
            padding-top: 18px;
          }

          .sobre-timeline-node {
            position: absolute;
            top: -26px;
            left: 50%;
            transform: translateX(-50%);
          }

          .sobre-timeline-card::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: calc(100% + 18px);
            height: 100%;
            border-radius: var(--radius);
            background: linear-gradient(180deg, rgba(15, 61, 46, 0.04), transparent 70%);
            z-index: -1;
          }

          .sobre-timeline-content {
            text-align: center;
          }
        }

        .valores-grid {
          gap: 16px;
        }

        .valor-card {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 14px;
          align-items: start;
          padding: 18px 18px 20px;
          border: 1px solid rgba(15, 61, 46, 0.06);
        }

        .valor-icone {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          display: grid;
          place-items: center;
          background: radial-gradient(circle at 30% 30%, rgba(32, 201, 151, 0.18), rgba(15, 61, 46, 0.1));
          color: var(--brand);
          font-size: 20px;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.8);
        }

        .valor-conteudo h3 {
          margin-bottom: 6px;
          letter-spacing: 0.2px;
        }

        .valor-conteudo p {
          margin: 0;
          color: var(--text-muted);
          line-height: 1.6;
        }

        @media (min-width: 900px) {
          .valores-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        .equipe-grid {
          gap: 18px;
        }

        .equipe-card {
          position: relative;
          min-height: 180px;
          display: grid;
          gap: 10px;
          align-content: start;
          border: 1px dashed rgba(15, 61, 46, 0.08);
          background: linear-gradient(180deg, rgba(15, 61, 46, 0.04), rgba(32, 201, 151, 0.04));
        }

        .equipe-placeholder {
          border-style: solid;
          border-color: rgba(32, 201, 151, 0.2);
          background: rgba(32, 201, 151, 0.06);
          display: grid;
          gap: 12px;
          align-content: start;
        }

        .equipe-placeholder-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 10px;
          background: rgba(32, 201, 151, 0.12);
          border-radius: 999px;
          color: var(--brand);
          font-weight: 700;
          font-size: 12px;
          letter-spacing: 0.3px;
          text-transform: uppercase;
        }

        @media (min-width: 768px) {
          .equipe-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
        }
      `}</style>
    </MarketingLayout>
  );
}
