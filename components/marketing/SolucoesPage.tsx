import { useEffect, useMemo, useState } from 'react';
import { MarketingLayout, type MarketingPageProps } from './MarketingLayout';

type PersonaKey = 'administradoras' | 'sindicos' | 'condominios';

const PERSONAS: Array<{
  id: PersonaKey;
  label: string;
  description: string;
  benefits: string[];
}> = [
  {
    id: 'administradoras',
    label: 'Administradoras',
    description: 'Controle total e visão consolidada de múltiplos condomínios com governança financeira.',
    benefits: [
      'Dashboards por carteira com indicadores de inadimplência e aging',
      'Workflows aprovadores e trilhas de auditoria para reduzir riscos',
      'Templates de comunicação em massa com assinatura da administradora',
      'APIs e integrações para alimentar ERP, bancos e parceiros',
    ],
  },
  {
    id: 'sindicos',
    label: 'Síndicos profissionais',
    description: 'Gestão proativa com alertas, automações e relacionamento próximo com moradores.',
    benefits: [
      'Checklist guiado de fechamento mensal e visitas técnicas',
      'Protocolos digitais para ocorrências, assembleias e reservas',
      'Assistente de comunicação com respostas sugeridas e SLA',
      'App white-label para elevar percepção de valor do serviço',
    ],
  },
  {
    id: 'condominios',
    label: 'Condomínios-clube',
    description: 'Experiência premium para grandes condomínios com muitas áreas e alto fluxo.',
    benefits: [
      'Reservas inteligentes com regras por torre, horário e perfil',
      'Monitoramento de acessos, visitantes, pets e veículos em um só painel',
      'Fluxos de compras e contratos com fornecedores homologados',
      'Comunicação segmentada por interesse para aumentar o engajamento',
    ],
  },
];

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
    icon: '💳',
    badge: 'Favorito das administradoras',
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
    icon: '📣',
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
    icon: '🛠️',
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
  const [activePersona, setActivePersona] = useState<PersonaKey>('administradoras');

  const persona = useMemo(() => PERSONAS.find((item) => item.id === activePersona) ?? PERSONAS[0], [activePersona]);

  useEffect(() => {
    document.title = 'Soluções | MeuCondomínio';
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
            Cada módulo foi construído com administradoras e síndicos profissionais para resolver dores reais, do boleto ao
            pós-venda.
          </p>

          <div className="marketing-card" style={{ gap: 16 }} aria-label="Benefícios por persona">
            <div className="marketing-pill-list" role="tablist" aria-label="Personas atendidas">
              {PERSONAS.map((item) => {
                const isActive = item.id === activePersona;

                return (
                  <button
                    key={item.id}
                    role="tab"
                    aria-selected={isActive}
                    className="marketing-pill"
                    onClick={() => setActivePersona(item.id)}
                    style={{
                      cursor: 'pointer',
                      borderColor: isActive ? 'rgba(32, 201, 151, 0.4)' : 'var(--border)',
                      color: isActive ? 'var(--brand)' : 'var(--text-dim)',
                      background: isActive ? 'rgba(32, 201, 151, 0.14)' : 'var(--bg-soft)',
                      boxShadow: isActive ? '0 8px 16px rgba(32, 201, 151, 0.18)' : 'none',
                      transition: 'all 0.18s ease',
                    }}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            <div role="tabpanel" aria-label={`Benefícios para ${persona.label}`}>
              <p style={{ color: 'var(--text-muted)', marginBottom: 12 }}>{persona.description}</p>
              <ul className="marketing-list" style={{ margin: 0 }}>
                {persona.benefits.map((benefit) => (
                  <li key={benefit}>
                    <strong>•</strong>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="marketing-section" aria-labelledby="solucoes-grid">
        <div className="marketing-grid-2">
          {SOLUTIONS.map((solution) => (
            <article key={solution.title} className="marketing-card" aria-label={solution.title}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span
                    aria-hidden
                    style={{
                      width: 44,
                      height: 44,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 14,
                      background: 'rgba(32, 201, 151, 0.12)',
                      fontSize: 24,
                    }}
                  >
                    {solution.icon}
                  </span>
                  <div>
                    <h3 style={{ margin: 0 }}>{solution.title}</h3>
                    <p style={{ margin: '4px 0 0' }}>{solution.description}</p>
                  </div>
                </div>

                {solution.badge ? <span className="marketing-badge">{solution.badge}</span> : null}
              </div>

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
              <div
                className="workflow-steps"
                aria-label={`Passos do fluxo ${workflow.title}`}
                style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}
              >
                {workflow.steps.map((step, index) => (
                  <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        padding: '10px 14px',
                        borderRadius: 999,
                        background: 'rgba(32, 201, 151, 0.12)',
                        border: '1px solid rgba(32, 201, 151, 0.16)',
                        boxShadow: '0 10px 18px rgba(15, 61, 46, 0.12)',
                        minWidth: 220,
                      }}
                    >
                      <span
                        aria-hidden
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 10,
                          background: 'var(--brand)',
                          color: '#fff',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                        }}
                      >
                        {index + 1}
                      </span>
                      <span style={{ color: 'var(--text)', fontWeight: 600 }}>{step}</span>
                    </div>
                    {index < workflow.steps.length - 1 ? (
                      <span
                        aria-hidden
                        style={{
                          width: 24,
                          height: 2,
                          background: 'linear-gradient(90deg, rgba(15, 61, 46, 0.08), rgba(32, 201, 151, 0.4))',
                          display: 'inline-block',
                        }}
                      />
                    ) : null}
                  </div>
                ))}
              </div>
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
            <span
              key={integration}
              className="marketing-card"
              role="listitem"
              style={{
                borderRadius: 14,
                padding: '12px 16px',
                minHeight: 'auto',
                boxShadow: '0 10px 20px rgba(15, 61, 46, 0.08)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                background: 'linear-gradient(140deg, rgba(15, 61, 46, 0.06), rgba(32, 201, 151, 0.06))',
              }}
            >
              <span
                aria-hidden
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  background: 'var(--bg-soft)',
                  border: '1px solid var(--border)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  color: 'var(--brand)',
                }}
              >
                {integration[0]}
              </span>
              <strong style={{ color: 'var(--text)' }}>{integration}</strong>
            </span>
          ))}
        </div>
      </section>
    </MarketingLayout>
  );
}
