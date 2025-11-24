import { useEffect } from 'react';
import Hero from '@/src/components/Hero';
import '@/styles/marketing-home.css';
import { MarketingLayout, type MarketingPageProps } from './MarketingLayout';
import { SolutionsSection } from './SolutionsSection';
import { OperationsSection } from './OperationsSection';

const MARKETPLACE_CHIPS = [
  'Moradores vendem produtos e oferecem serviços',
  'Contratação de prestadores da comunidade',
  'Financeiro integrado e conciliado automaticamente',
  'Cupons e combos para fornecedores parceiros',
];

const TESTIMONIALS = [
  {
    quote:
      '“Migramos 12 condomínios em menos de uma semana. O MeuCondomínio trouxe transparência para o conselho e reduziu em 63% as visitas presenciais ao escritório.”',
    author: 'Marina Lopes, Gestora na Vizinhança Administradora',
  },
  {
    quote: '“O marketplace interno virou uma fonte de renda para os moradores. Já foram mais de 800 serviços contratados sem sair do aplicativo.”',
    author: 'André Cavalcanti, Síndico profissional',
  },
];

const METRICS = [
  { value: '92%', label: 'redução no tempo de fechamento mensal' },
  { value: '3x', label: 'mais engajamento dos moradores no app' },
  { value: '48h', label: 'para colocar o condomínio em produção' },
  { value: '12min', label: 'para aprovar acessos com QR Code' },
];

export function MarketingHomePage({ onNavigate, onLogin }: MarketingPageProps) {
  useEffect(() => {
    document.title = 'MeuCondomínio | Seu condomínio 10x mais eficiente.';
  }, []);

  return (
    <MarketingLayout currentPath="/" onNavigate={onNavigate} onLogin={onLogin}>
      <Hero
        variant="A"
        onPrimaryClick={() => onNavigate('/comece')}
        onSecondaryClick={() => onNavigate('/demo')}
      />

      <SolutionsSection onNavigate={onNavigate} />

      <section className="py-16">
        <div className="marketing-container">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#e2e8e4] via-[#dce7e1] to-[#d7ede0] p-10 shadow-[0_20px_40px_rgba(21,41,31,0.12)] ring-1 ring-[#c4d2c9]">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="space-y-6">
                <span className="marketing-badge" aria-hidden>
                  Diferencial exclusivo
                </span>
                <div className="space-y-3">
                  <h2 className="marketing-tagline text-3xl font-semibold text-[#15291f] sm:text-4xl">
                    Marketplace do condomínio conectado ao financeiro.
                  </h2>
                  <p className="marketing-subtitle max-w-3xl text-lg text-[#344e41]">
                    Moradores vendem e contratam serviços dentro do condomínio e todo o fluxo é conciliado automaticamente com o caixa. O marketplace interno virou uma nova fonte de renda.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {MARKETPLACE_CHIPS.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-[#15291f] shadow-sm ring-1 ring-[#c6d3c8]"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="/marketplace"
                    onClick={(event) => {
                      event.preventDefault();
                      onNavigate('/marketplace');
                    }}
                    className="inline-flex items-center justify-center rounded-full bg-[#344e41] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#2a3d33]"
                    aria-label="Explorar marketplace interno do condomínio"
                  >
                    Explorar marketplace
                  </a>
                  <a
                    href="/entrar"
                    onClick={(event) => {
                      event.preventDefault();
                      onLogin();
                    }}
                    className="inline-flex items-center justify-center rounded-full bg-white/90 px-5 py-3 text-sm font-semibold text-[#15291f] shadow-md ring-1 ring-[#c6d3c8] transition hover:-translate-y-0.5 hover:bg-white"
                    aria-label="Entrar para anunciar produtos ou serviços"
                  >
                    Entrar para anunciar
                  </a>
                </div>
              </div>

              <div className="relative flex items-center justify-center">
                <div className="absolute -top-6 -right-6 h-28 w-28 rounded-full bg-[#c1d7c5]/60 blur-3xl" aria-hidden />
                <div className="relative flex w-full max-w-lg flex-col gap-4 rounded-3xl bg-white/90 p-5 shadow-2xl ring-1 ring-[#c6d3c8]">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-[#15291f]">Receita do marketplace</p>
                      <p className="text-2xl font-bold text-[#2f4b3d]">R$ 48.200</p>
                    </div>
                    <span className="rounded-full bg-[#e7f2ea] px-3 py-1 text-xs font-semibold text-[#2f6a41]">+18% este mês</span>
                  </div>
                  <img
                    src="/assets/marketing/notebookvendas.png"
                    alt="Notebook exibindo vendas do marketplace do condomínio"
                    className="w-full rounded-2xl object-cover shadow-lg"
                    loading="lazy"
                  />
                  <div className="grid grid-cols-2 gap-3 text-sm text-[#344e41]">
                    <div className="rounded-2xl bg-[#f4f7f2] p-3 shadow-sm">
                      <p className="text-xs font-semibold text-[#2f4b3d]">Pedidos conciliados</p>
                      <p className="text-xl font-bold text-[#2f4b3d]">326</p>
                      <p className="text-xs text-[#4c6558]">Financeiro sem esforço</p>
                    </div>
                    <div className="rounded-2xl bg-[#f4f7f2] p-3 shadow-sm">
                      <p className="text-xs font-semibold text-[#2f4b3d]">Prestadores da comunidade</p>
                      <p className="text-xl font-bold text-[#2f4b3d]">142</p>
                      <p className="text-xs text-[#4c6558]">Com avaliações seguras</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <OperationsSection onNavigate={onNavigate} />

      <section className="py-16" aria-labelledby="gestao-tecnologia-heading">
        <div className="marketing-container grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-5">
            <span className="marketing-badge" aria-hidden>
              Gestão e tecnologia
            </span>
            <h2 id="gestao-tecnologia-heading" className="marketing-tagline text-3xl font-semibold text-[#15291f] sm:text-4xl">
              Gestão profissional com tecnologia de verdade.
            </h2>
            <p className="marketing-subtitle text-lg text-[#344e41]">
              Dashboards, relatórios e previsões financeiras em um painel único. Automação de cobranças, conciliação bancária e integrações para você focar na estratégia.
            </p>
            <ul className="grid gap-3 text-sm text-[#344e41] sm:grid-cols-2">
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-2.5 w-2.5 flex-none rounded-full bg-[#344e41]" aria-hidden />
                <span>KPIs de inadimplência, caixa e consumo em tempo real.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-2.5 w-2.5 flex-none rounded-full bg-[#344e41]" aria-hidden />
                <span>Previsões automáticas de despesas e provisões.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-2.5 w-2.5 flex-none rounded-full bg-[#344e41]" aria-hidden />
                <span>Integração financeira completa com bancos e IoT.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-2.5 w-2.5 flex-none rounded-full bg-[#344e41]" aria-hidden />
                <span>Relatórios prontos para conselho e auditoria.</span>
              </li>
            </ul>
          </div>
          <div className="relative">
            <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-[#c7d9cf]/70 blur-3xl" aria-hidden />
            <img
              src="/assets/marketing/gestao-tecnologia-condominio.png"
              alt="Dashboard de gestão do condomínio em notebook"
              className="relative z-10 w-full rounded-3xl object-cover shadow-[0_22px_44px_rgba(21,41,31,0.15)] ring-1 ring-[#d6dbd4]"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#f4f5f3] py-16" aria-labelledby="historia-heading">
        <div className="marketing-container grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-5">
            <span className="marketing-badge" aria-hidden>
              Demonstração guiada
            </span>
            <h2 id="historia-heading" className="marketing-tagline text-3xl font-semibold text-[#15291f] sm:text-4xl">
              Veja o sistema na prática em menos de 3 minutos.
            </h2>
            <p className="marketing-subtitle text-lg text-[#344e41]">
              Mostramos os indicadores que importam para o conselho, o passo a passo da portaria digital e como o marketplace interno gira receita para o condomínio.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/demo"
                onClick={(event) => {
                  event.preventDefault();
                  onNavigate('/demo');
                }}
                className="inline-flex items-center justify-center rounded-full bg-[#344e41] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#2a3d33]"
                aria-label="Assistir demonstração de 3 minutos"
              >
                Assistir demonstração
              </a>
              <a
                href="/comece"
                onClick={(event) => {
                  event.preventDefault();
                  onNavigate('/comece');
                }}
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#15291f] shadow-md ring-1 ring-[#d6dbd4] transition hover:-translate-y-0.5"
                aria-label="Começar agora com avaliação gratuita"
              >
                Começar agora
              </a>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-white p-4 shadow-md ring-1 ring-[#dce3dc]">
                <p className="text-sm font-semibold text-[#2f4b3d]">Inadimplência reduzida</p>
                <p className="text-2xl font-bold text-[#2f4b3d]">-35% em 90 dias</p>
                <p className="text-xs text-[#4c6558]">Com cobranças automáticas e acordos digitais.</p>
              </div>
              <div className="rounded-2xl bg-white p-4 shadow-md ring-1 ring-[#dce3dc]">
                <p className="text-sm font-semibold text-[#2f4b3d]">Chamados resolvidos</p>
                <p className="text-2xl font-bold text-[#2f4b3d]">98% SLA</p>
                <p className="text-xs text-[#4c6558]">Equipe e moradores na mesma linha do tempo.</p>
              </div>
            </div>
          </div>
          <div className="relative grid gap-4 sm:grid-cols-2">
            <img
              src="/assets/marketing/notebookinicial.png"
              alt="Notebook mostrando início da plataforma"
              className="w-full rounded-3xl object-cover shadow-[0_18px_36px_rgba(21,41,31,0.12)] ring-1 ring-[#d6dbd4]"
              loading="lazy"
            />
            <img
              src="/assets/marketing/demonstração.png"
              alt="Tela de demonstração do sistema"
              className="w-full rounded-3xl object-cover shadow-[0_18px_36px_rgba(21,41,31,0.12)] ring-1 ring-[#d6dbd4]"
              loading="lazy"
            />
            <img
              src="/assets/marketing/saibamais.png"
              alt="Detalhe de métricas do aplicativo"
              className="w-full rounded-3xl object-cover shadow-[0_18px_36px_rgba(21,41,31,0.12)] ring-1 ring-[#d6dbd4]"
              loading="lazy"
            />
            <img
              src="/assets/marketing/vendas.png"
              alt="Ícone de vendas do marketplace"
              className="w-full rounded-3xl bg-white object-contain p-6 shadow-[0_18px_36px_rgba(21,41,31,0.12)] ring-1 ring-[#d6dbd4]"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="py-16" aria-labelledby="metricas-heading">
        <div className="marketing-container space-y-8">
          <div className="flex flex-col gap-3">
            <span className="marketing-badge w-fit" aria-hidden>
              Resultados comprovados
            </span>
            <h2 id="metricas-heading" className="marketing-tagline text-3xl font-semibold text-[#15291f] sm:text-4xl">
              Impacto real nos números do condomínio.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {METRICS.map((metric) => (
              <div
                key={metric.value}
                className="flex h-full flex-col gap-2 rounded-3xl bg-gradient-to-b from-[#0f172a] via-[#1b2a23] to-[#233528] p-6 text-white shadow-[0_20px_40px_rgba(0,0,0,0.25)]"
                aria-label={metric.label}
              >
                <strong className="text-4xl font-extrabold">{metric.value}</strong>
                <span className="text-sm text-white/80">{metric.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f9faf8] py-16" aria-labelledby="depoimentos-heading">
        <div className="marketing-container space-y-10">
          <div className="flex flex-col gap-3">
            <span className="marketing-badge w-fit" aria-hidden>
              Histórias reais
            </span>
            <h2 id="depoimentos-heading" className="marketing-tagline text-3xl font-semibold text-[#15291f] sm:text-4xl">
              Síndicos e administradoras que transformaram a rotina.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {TESTIMONIALS.map((testimonial) => (
              <figure
                key={testimonial.author}
                className="flex h-full flex-col gap-3 rounded-3xl bg-white p-6 shadow-[0_16px_28px_rgba(21,41,31,0.08)] ring-1 ring-[#d6dbd4]"
                aria-label={`Depoimento de ${testimonial.author}`}
              >
                <blockquote className="text-lg font-semibold text-[#15291f]">{testimonial.quote}</blockquote>
                <cite className="text-sm font-medium text-[#3f5b4c]">{testimonial.author}</cite>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
