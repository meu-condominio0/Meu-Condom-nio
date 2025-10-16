import { useEffect } from 'react';
import { MarketingLayout, type MarketingPageProps } from './MarketingLayout';

const SOLUTIONS = [
  {
    title: 'Financeiro 360°',
    description:
      'Boletos com registro automático, conciliação bancária inteligente e plano de contas otimizado para o condomínio.',
    highlights: [
      'Fechamento mensal assistido com checklist guiado',
      'Geração de relatórios em PDF ou link compartilhável',
      'Integração com bancos, adquirentes e contabilidade',
    ],
  },
  {
    title: 'Comunicação & Engajamento',
    description:
      'Conecte moradores, síndicos e administradora com um feed moderno, notificações ricas e protocolos digitais.',
    highlights: [
      'Envio segmentado por bloco, unidade ou grupo',
      'Central de atendimento com SLA e resposta sugerida por IA',
      'Enquetes, assembleias digitais e mural multimídia',
    ],
  },
  {
    title: 'Operações sem atrito',
    description:
      'Reservas, ocorrências, visitantes, pets e veículos controlados em processos automatizados com trilhas de auditoria.',
    highlights: [
      'Fluxos aprovadores configuráveis por tipo de área',
      'Checklist de vistoria com fotos ilimitadas',
      'Acesso ao portal de fornecedores com contratos e garantias',
    ],
  },
];

const WORKFLOWS = [
  {
    title: 'Assistente de inadimplência',
    steps: [
      'Detecta atrasos e envia lembretes personalizados',
      'Gera acordos com assinatura eletrônica integrada',
      'Atualiza o financeiro após o pagamento sem intervenção manual',
    ],
  },
  {
    title: 'Onboarding guiado do condomínio',
    steps: [
      'Importação assistida de moradores, unidades e histórico',
      'Checklist colaborativo com responsáveis e prazos',
      'Acompanhamento em painel para saber exatamente o que falta',
    ],
  },
];

const INTEGRATIONS = [
  'Banco do Brasil',
  'Bradesco',
  'Itaú',
  'Santander',
  'Sicoob',
  'XP',
  'Oracle Netsuite',
  'Senior Sistemas',
  'TOTVS',
  'Intelbras',
  'Control iD',
  'Porteiros remotos',
];

export function MarketingSolucoesPage({ onNavigate, onLogin }: MarketingPageProps) {
  useEffect(() => {
    document.title = 'Soluções — MeuCondomínio';
  }, []);

  return (
    <MarketingLayout currentPath="/solucoes" onNavigate={onNavigate} onLogin={onLogin}>
      <section className="marketing-section" aria-labelledby="solucoes-intro">
        <div className="marketing-section-header">
          <span className="marketing-badge" aria-hidden="true">
            Plataforma completa
          </span>
          <h1 id="solucoes-intro" className="marketing-title">
            O MeuCondomínio combina software, serviços e inteligência para encantar moradores e reduzir custos operacionais.
          </h1>
          <p className="marketing-lead">
            Cada módulo foi construído com administradoras e síndicos profissionais para resolver dores reais — do boleto ao
            pós-venda.
          </p>
        </div>
      </section>

      <section className="marketing-section" aria-labelledby="solucoes-grid">
        <div className="marketing-grid-2">
          {SOLUTIONS.map((solution) => (
            <article key={solution.title} className="marketing-card" aria-label={solution.title}>
              <h3>{solution.title}</h3>
              <p>{solution.description}</p>
              <ul className="marketing-list">
                {solution.highlights.map((item) => (
                  <li key={item}>
                    <strong>•</strong>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="marketing-section" aria-labelledby="workflows-heading">
        <div className="marketing-section-header">
          <span className="marketing-badge" aria-hidden="true">
            Workflows automatizados
          </span>
          <h2 id="workflows-heading" className="marketing-tagline">
            Fluxos prontos para acelerar sua operação.
          </h2>
        </div>

        <div className="marketing-grid-2">
          {WORKFLOWS.map((workflow) => (
            <article key={workflow.title} className="marketing-card" aria-label={workflow.title}>
              <h3>{workflow.title}</h3>
              <ol className="marketing-list" aria-label={`Passos do fluxo ${workflow.title}`}>
                {workflow.steps.map((step, index) => (
                  <li key={step}>
                    <strong>{index + 1}.</strong>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </section>

      <section className="marketing-section" aria-labelledby="integracoes-heading">
        <div className="marketing-section-header">
          <span className="marketing-badge" aria-hidden="true">
            Conectado ao seu ecossistema
          </span>
          <h2 id="integracoes-heading" className="marketing-tagline">
            Integrações prontas com bancos, ERPs e dispositivos de acesso.
          </h2>
          <p className="marketing-subtitle">
            Mais de 60 integrações certificadas e APIs abertas para personalizar fluxos exclusivos.
          </p>
        </div>

        <div className="marketing-pill-list" role="list">
          {INTEGRATIONS.map((integration) => (
            <span key={integration} className="marketing-pill" role="listitem">
              {integration}
            </span>
          ))}
        </div>
      </section>
    </MarketingLayout>
  );
}
