import { useMemo, useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  LucideSparkles,
  Menu,
  ShieldCheck,
  Smartphone,
  Sparkles,
  X,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

const NAV_ITEMS = [
  { label: 'Soluções', href: '#solucoes' },
  { label: 'Marketplace', href: '#marketplace' },
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Tecnologia', href: '#tecnologia' },
  { label: 'Contato', href: '#contato' },
];

const IMPACT_POINTS = [
  '−29% do tempo gasto em rotinas administrativas.',
  'Comunicação centralizada e sem ruído entre síndico, moradores e portaria.',
  'Controle de inadimplência com lembretes inteligentes e visão financeira em tempo real.',
  'Tudo pronto para evoluir para app mobile.',
];

const AUDIENCE_CARDS = [
  {
    title: 'Síndicos e administradoras',
    description: 'Dashboards, relatórios financeiros e workflows automáticos para decisões rápidas.',
    icon: ShieldCheck,
  },
  {
    title: 'Moradores',
    description: 'Reservas fáceis, comunicados claros e segurança digital em um aplicativo amigável.',
    icon: LucideSparkles,
  },
  {
    title: 'Portaria e equipes',
    description: 'Controle de acessos, entregas e registros com histórico sempre disponível.',
    icon: Smartphone,
  },
];

const MARKETPLACE_POINTS = [
  'Contrate serviços recorrentes (limpeza, manutenção, jardinagem) dentro da plataforma.',
  'Integre pagamentos e conciliações bancárias sem sair do sistema.',
  'Conecte o condomínio com parceiros e benefícios para os moradores.',
];

const TECH_POINTS = [
  'FastAPI + React + MySQL + Docker para performance e escalabilidade.',
  'Metodologia Scrum com entregas iterativas e acompanhamento próximo.',
  'Testes automatizados com Vitest no front e Pytest no back.',
];

export type HomeMeuCondominioProps = {
  dashboardImageUrl: string;
};

export function HomeMeuCondominio({ dashboardImageUrl }: HomeMeuCondominioProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const gradientClasses = useMemo(
    () =>
      'absolute inset-0 -z-10 bg-gradient-to-b from-emerald-50 via-white to-emerald-50 opacity-90',
    [],
  );

  return (
    <div className="relative min-h-screen bg-white text-slate-900">
      <div className={gradientClasses} aria-hidden />

      <header className="fixed inset-x-0 top-0 z-20 border-b border-emerald-100/70 bg-white/80 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8" aria-label="Navegação principal">
          <div className="flex items-center gap-10">
            <a className="text-xl font-semibold text-emerald-800" href="#">
              MeuCondomínio
            </a>
            <div className="hidden items-center gap-6 text-sm font-medium text-slate-700 lg:flex">
              {NAV_ITEMS.map((item) => (
                <a key={item.label} className="transition hover:text-emerald-700" href={item.href}>
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <Button variant="outline" className="border-emerald-200 text-emerald-800 hover:bg-emerald-50">
              Sou síndico(a)
            </Button>
            <Button className="bg-emerald-700 text-white hover:bg-emerald-800">
              Solicitar demonstração
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </nav>

        {menuOpen && (
          <div className="border-t border-emerald-100 bg-white/95 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
            <div className="flex flex-col gap-4 text-sm font-medium text-slate-700">
              {NAV_ITEMS.map((item) => (
                <a key={item.label} className="transition hover:text-emerald-700" href={item.href}>
                  {item.label}
                </a>
              ))}
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <Button variant="outline" className="border-emerald-200 text-emerald-800 hover:bg-emerald-50">
                Sou síndico(a)
              </Button>
              <Button className="bg-emerald-700 text-white hover:bg-emerald-800">
                Solicitar demonstração
              </Button>
            </div>
          </div>
        )}
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-20 px-4 pb-24 pt-32 sm:px-6 lg:px-8">
        <section id="como-funciona" className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-6">
            <Badge className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-900 shadow-sm" variant="secondary">
              Novo • Gestão inteligente para condomínios
            </Badge>

            <div className="space-y-4">
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
                Gestão condominial integrada, com marketplace para tudo que o seu condomínio precisa.
              </h1>
              <p className="max-w-2xl text-lg text-slate-600">
                Boletos, reservas, portaria, comunicação e relatórios financeiros em um só lugar — com um marketplace que conecta
                moradores, serviços e tecnologia.
              </p>

              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800 shadow-inner">
                <Sparkles className="size-4" />
                Marketplace integrado para serviços, pagamentos, IoT, contabilidade e BI.
              </div>
            </div>

            <ul className="grid gap-3 text-base text-slate-700 sm:grid-cols-2">
              {IMPACT_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3 rounded-xl bg-white/70 p-3 shadow-sm ring-1 ring-emerald-100">
                  <CheckCircle2 className="mt-1 size-5 text-emerald-600" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="space-y-2">
              <div className="flex flex-wrap gap-3">
                <Button className="bg-emerald-700 text-white hover:bg-emerald-800" size="lg">
                  Quero ver uma demonstração
                  <ArrowRight className="size-4" />
                </Button>
                <Button variant="outline" className="border-emerald-200 text-emerald-800 hover:bg-emerald-50" size="lg">
                  Sou síndico — fale com a equipe
                </Button>
              </div>
              <p className="text-sm text-slate-500">
                Sem cartão de crédito • Versão inicial para testes em condomínios parceiros
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-3xl bg-emerald-200/40 blur-3xl" aria-hidden />
            <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-emerald-100/60">
              <img className="h-full w-full object-cover" src={dashboardImageUrl} alt="Dashboard MeuCondomínio" />

              <div className="absolute left-4 top-4 flex items-center gap-3 rounded-2xl bg-white/90 px-4 py-3 text-sm font-semibold text-emerald-900 shadow-lg ring-1 ring-emerald-100">
                <Sparkles className="size-4 text-emerald-600" />
                Portaria online 24h ativa
              </div>

              <div className="absolute bottom-4 right-4 flex flex-col gap-3">
                <div className="rounded-2xl bg-emerald-700/90 px-4 py-3 text-sm text-white shadow-lg backdrop-blur">
                  Reservas hoje: <span className="font-semibold">12</span>
                </div>
                <div className="rounded-2xl bg-white/90 px-4 py-3 text-sm text-emerald-900 shadow-lg ring-1 ring-emerald-100">
                  Inadimplência em queda: <span className="font-semibold">-18%</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="solucoes" className="space-y-8">
          <div className="space-y-3">
            <Badge className="bg-emerald-100 text-emerald-900" variant="secondary">
              Para quem é o MeuCondomínio?
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Feito para síndicos, administradoras e moradores exigentes.
            </h2>
            <p className="max-w-3xl text-lg text-slate-600">
              Todos os perfis trabalham juntos em uma experiência única, conectando gestão, comunicação e operação em tempo real.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {AUDIENCE_CARDS.map(({ title, description, icon: Icon }) => (
              <article key={title} className="flex h-full flex-col gap-3 rounded-2xl bg-white/80 p-6 shadow-sm ring-1 ring-emerald-100">
                <div className="flex items-center gap-3 text-emerald-700">
                  <Icon className="size-5" />
                  <span className="text-sm font-semibold">Perfil</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
                <p className="text-slate-600">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="marketplace" className="space-y-6 rounded-3xl bg-gradient-to-r from-emerald-50 via-white to-emerald-50 p-8 ring-1 ring-emerald-100 sm:p-10">
          <div className="space-y-3 max-w-3xl">
            <Badge className="bg-emerald-100 text-emerald-900" variant="secondary">
              Por que somos diferentes?
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              O primeiro condomínio com um marketplace nativo.
            </h2>
            <p className="text-lg text-slate-600">
              Além de gestão, o MeuCondomínio conecta prestadores de serviço, soluções financeiras e integrações futuras de IoT, contabilidade e BI em um ecossistema seguro.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MARKETPLACE_POINTS.map((point) => (
              <div key={point} className="flex gap-3 rounded-2xl bg-white/80 p-4 text-slate-700 shadow-sm ring-1 ring-emerald-100">
                <Sparkles className="mt-1 size-4 text-emerald-600" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="tecnologia" className="space-y-6">
          <div className="space-y-3">
            <Badge className="bg-emerald-100 text-emerald-900" variant="secondary">
              Como o projeto é desenvolvido
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Tecnologia moderna, desenvolvimento ágil.
            </h2>
          </div>

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {TECH_POINTS.map((point) => (
              <div key={point} className="flex items-start gap-3 rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-emerald-100">
                <CheckCircle2 className="mt-1 size-5 text-emerald-600" />
                <span className="text-slate-700">{point}</span>
              </div>
            ))}
          </div>
        </section>

        <section
          id="contato"
          className="rounded-3xl bg-white/70 p-6 text-center shadow-sm ring-1 ring-emerald-100 sm:p-8"
        >
          <p className="text-lg font-semibold text-slate-900">Pronto para modernizar o seu condomínio?</p>
          <p className="mt-2 text-sm text-slate-600">
            Fale com nossa equipe para configurar a demonstração e convidar os times do condomínio.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <Button className="bg-emerald-700 text-white hover:bg-emerald-800">Solicitar demonstração</Button>
            <Button variant="outline" className="border-emerald-200 text-emerald-800 hover:bg-emerald-50">
              Conversar com especialista
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}

export function HomeMeuCondominioExample() {
  return <HomeMeuCondominio dashboardImageUrl="https://placehold.co/1200x720" />;
}
