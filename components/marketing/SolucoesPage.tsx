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
      { title: 'Fechamento mensal assistido', detail: 'com checklist guiado' },
      { title: 'Geração de relatórios', detail: 'em PDF ou link compartilhável' },
      { title: 'Integração com bancos', detail: 'adquirentes e contabilidade' },
    ],
    icon: '💳',
    badge: 'Favorito das administradoras',
  },
  {
    title: 'Comunicação & Engajamento',
    description:
      'Conecte moradores, síndicos e administradora com um feed moderno, notificações ricas e protocolos digitais.',
    highlights: [
      { title: 'Envio segmentado', detail: 'por bloco, unidade ou grupo' },
      { title: 'Central de atendimento', detail: 'com SLA e resposta sugerida por IA' },
      { title: 'Enquetes e assembleias digitais', detail: 'além de mural multimídia' },
    ],
    icon: '📣',
  },
  {
    title: 'Operações sem atrito',
    description:
      'Reservas, ocorrências, visitantes, pets e veículos controlados em processos automatizados com trilhas de auditoria.',
    highlights: [
      { title: 'Fluxos aprovadores', detail: 'configuráveis por tipo de área' },
      { title: 'Checklist de vistoria', detail: 'com fotos ilimitadas' },
      { title: 'Portal de fornecedores', detail: 'com contratos e garantias' },
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
      <section
        className="bg-gradient-to-b from-emerald-50/60 via-white to-white dark:from-emerald-950/40 dark:via-slate-950 dark:to-slate-950"
        aria-labelledby="solucoes-intro"
      >
        <div className="max-w-6xl mx-auto px-6 py-16 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-emerald-800 shadow-sm ring-1 ring-emerald-200">
                Plataforma completa
              </span>
              <h1
                id="solucoes-intro"
                className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-slate-900 dark:text-white"
              >
                O MeuCondomínio combina software, serviços e inteligência para encantar moradores e reduzir custos operacionais.
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-200">
                Única plataforma de gestão condominial com marketplace integrado, fluxos automatizados e integrações com bancos
                e ERPs para tirar o peso da operação da administradora.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:-translate-y-0.5 hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
                >
                  Começar agora
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-xl border border-emerald-300 bg-white/70 px-6 py-3 text-base font-semibold text-emerald-700 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-400 hover:text-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 dark:bg-slate-900/60 dark:text-emerald-200 dark:border-emerald-800"
                >
                  Ver o produto em ação
                </button>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-300">
                Sem compromisso, ideal para administradoras, síndicos profissionais e condomínios-clube.
              </p>
            </div>

            <div className="relative">
              <div
                className="relative overflow-hidden rounded-3xl bg-slate-900/80 shadow-2xl ring-1 ring-emerald-100/70 dark:ring-emerald-900/40"
                style={{ backgroundImage: 'url(/assets/marketing/fachada-condominio.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
              >
                <div className="absolute inset-0 bg-emerald-900/70 mix-blend-multiply" aria-hidden />
                <div className="relative m-5 rounded-2xl border border-emerald-100/70 bg-white/90 p-6 shadow-xl backdrop-blur lg:m-7 lg:p-7 dark:border-emerald-900/40 dark:bg-slate-950/70">
                  <div className="flex items-center justify-between border-b border-emerald-50 pb-4 dark:border-emerald-900/50">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                    </div>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase text-emerald-800 ring-1 ring-emerald-100 dark:bg-emerald-900/50 dark:text-emerald-100 dark:ring-emerald-800">
                      Operação ao vivo
                    </span>
                  </div>

                  <div className="mt-5 space-y-4">
                    <div className="grid grid-cols-3 gap-3">
                      <div className="col-span-2 rounded-xl bg-emerald-50 px-4 py-5 shadow-sm ring-1 ring-emerald-100 dark:bg-emerald-950/40 dark:ring-emerald-800">
                        <p className="text-xs font-semibold uppercase text-emerald-700 dark:text-emerald-200">Inadimplência</p>
                        <p className="mt-2 text-2xl font-bold text-emerald-900 dark:text-emerald-50">-18%</p>
                        <p className="text-sm text-emerald-700 dark:text-emerald-200">vs último mês</p>
                      </div>
                      <div className="rounded-xl bg-white px-4 py-5 shadow-sm ring-1 ring-emerald-100 dark:bg-slate-900/70 dark:ring-emerald-800">
                        <p className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-300">Chamados</p>
                        <p className="mt-2 text-lg font-bold text-slate-900 dark:text-white">42 abertos</p>
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-xl border border-emerald-100 bg-white px-4 py-4 shadow-sm dark:border-emerald-900/50 dark:bg-slate-900/70">
                        <p className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-300">Assembleias</p>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-sm font-medium text-slate-900 dark:text-white">Engajamento</span>
                          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-100">
                            78%
                          </span>
                        </div>
                        <div className="mt-3 h-2 rounded-full bg-emerald-100">
                          <div className="h-full w-[78%] rounded-full bg-emerald-500" />
                        </div>
                      </div>
                      <div className="rounded-xl border border-emerald-100 bg-white px-4 py-4 shadow-sm dark:border-emerald-900/50 dark:bg-slate-900/70">
                        <p className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-300">Reservas</p>
                        <div className="mt-3 space-y-2">
                          <div className="flex items-center justify-between text-sm font-medium text-slate-900 dark:text-white">
                            <span>Áreas confirmadas</span>
                            <span className="text-emerald-600 dark:text-emerald-300">32</span>
                          </div>
                          <div className="flex items-center justify-between text-sm font-medium text-slate-900 dark:text-white">
                            <span>Em aprovação</span>
                            <span className="text-amber-500">6</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 rounded-2xl border border-emerald-100 bg-white/80 p-6 shadow-lg backdrop-blur-sm dark:border-emerald-900/50 dark:bg-slate-950/60">
            <div className="flex flex-wrap gap-3" role="tablist" aria-label="Personas atendidas">
              {PERSONAS.map((item) => {
                const isActive = item.id === activePersona;

                return (
                  <button
                    key={item.id}
                    role="tab"
                    aria-selected={isActive}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 ${
                      isActive
                        ? 'border-emerald-300 bg-emerald-50 text-emerald-700 shadow-md shadow-emerald-100 dark:border-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-100'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-emerald-200 hover:text-emerald-700 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300'
                    }`}
                    onClick={() => setActivePersona(item.id)}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-6" role="tabpanel" aria-label={`Benefícios para ${persona.label}`}>
              <p className="mb-4 text-slate-600 dark:text-slate-200">{persona.description}</p>
              <ul className="space-y-3 text-slate-700 dark:text-slate-100">
                {persona.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2">
                    <strong className="text-emerald-600 dark:text-emerald-300">•</strong>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="marketing-section" aria-labelledby="solucoes-grid">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {SOLUTIONS.map((solution) => (
              <article
                key={solution.title}
                className="group flex h-full flex-col rounded-2xl border border-emerald-100 bg-white/80 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-emerald-900/60 dark:bg-slate-900/60"
                aria-label={solution.title}
              >
                <div className="flex flex-1 flex-col gap-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <span
                        aria-hidden
                        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-2xl shadow-sm ring-1 ring-emerald-100 dark:bg-emerald-950/50 dark:ring-emerald-800"
                      >
                        {solution.icon}
                      </span>
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{solution.title}</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-200">{solution.description}</p>
                      </div>
                    </div>

                    {solution.badge ? (
                      <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-100 shadow-sm dark:bg-emerald-900/40 dark:text-emerald-100 dark:ring-emerald-800">
                        {solution.badge}
                      </span>
                    ) : null}
                  </div>

                  <ul className="flex flex-1 flex-col justify-start gap-3 text-sm text-slate-700 dark:text-slate-100">
                    {solution.highlights.map((item) => (
                      <li key={item.title} className="flex gap-2">
                        <span className="text-emerald-600 dark:text-emerald-300">•</span>
                        <span>
                          <span className="font-semibold">{item.title}</span>
                          {item.detail ? ` ${item.detail}` : null}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
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
