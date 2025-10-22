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
  },
  {
    titulo: 'Experiência humana',
    descricao:
      'Tecnologia que elimina ruído, mas mantém as pessoas no centro das decisões importantes.',
  },
  {
    titulo: 'Entrega contínua',
    descricao:
      'Novas funcionalidades todas as semanas com base nos feedbacks das administradoras parceiras.',
  },
];

export function MarketingSobrePage({ onNavigate, onLogin }: MarketingPageProps) {
  useEffect(() => {
    document.title = 'Sobre — MeuCondomínio';
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

        <div className="marketing-columns">
          {MARCOS.map((marco) => (
            <article key={marco.ano} className="marketing-card" aria-label={`Marco ${marco.ano}`}>
              <h3>{marco.ano}</h3>
              <p>{marco.texto}</p>
            </article>
          ))}
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

        <div className="marketing-grid">
          {VALORES.map((valor) => (
            <article key={valor.titulo} className="marketing-card" aria-label={valor.titulo}>
              <h3>{valor.titulo}</h3>
              <p>{valor.descricao}</p>
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

        <div className="marketing-columns-balanced">
          <article className="marketing-card" aria-label="Equipe de produto">
            <h3>Produto &amp; Design</h3>
            <p>
              Pesquisadores convivem com síndicos e moradores para entender hábitos e necessidades. O resultado são
              funcionalidades que nascem com foco na experiência humana.
            </p>
          </article>
          <article className="marketing-card" aria-label="Equipe de sucesso do cliente">
            <h3>Sucesso do cliente</h3>
            <p>
              Gerentes dedicados acompanham indicadores e criam planos de ação personalizados para cada administradora.
            </p>
          </article>
          <article className="marketing-card" aria-label="Equipe de engenharia">
            <h3>Engenharia &amp; Dados</h3>
            <p>
              Arquitetura moderna com APIs abertas, infraestrutura em nuvem e monitoramento em tempo real para garantir
              disponibilidade em padrão bancário.
            </p>
          </article>
        </div>
      </section>
    </MarketingLayout>
  );
}
