import { useEffect, useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  Menu,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Star,
  X,
} from 'lucide-react';
import ThemeToggle from '../components/home/ThemeToggle';
import type { MarketingPageProps, MarketingPath } from '../../components/marketing/MarketingLayout';

const NAVIGATION_LINKS: Array<{ href: MarketingPath; label: string }> = [
  { href: '/solucoes', label: 'Soluções' },
  { href: '/precos', label: 'Preços' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/suporte', label: 'Suporte' },
  { href: '/blog', label: 'Blog' },
];

const HERO_FEATURES = [
  {
    title: 'Financeiro turbo',
    description:
      'Boletos com registro automático, conciliação em tempo real e projeção de fluxo de caixa para decisões sem sustos.',
    icon: BarChart3,
  },
  {
    title: 'Comunicação inteligente',
    description:
      'Envie comunicados segmentados, automatize avisos e acompanhe a leitura em tempo real com recibos digitais.',
    icon: MessageSquare,
  },
  {
    title: 'Operações conectadas',
    description:
      'Reservas, ocorrências, assembleias digitais e marketplace funcionando de ponta a ponta em uma só plataforma.',
    icon: Building2,
  },
];

const MARKETPLACE_PILLS = [
  'Classificados com aprovação em 1 clique',
  'Pagamentos via PIX e cartão',
  'Histórico de reputação e avaliações',
  'Cupons para fornecedores parceiros',
];

const MODULES = [
  {
    title: 'Gestão financeira completa',
    points: [
      'Fluxo de caixa unificado',
      'Prestação de contas com um clique',
      'Integração bancária automática',
    ],
    media: {
      src: '/assets/marketing/mock-1.svg',
      width: 420,
      height: 300,
    },
  },
  {
    title: 'Experiência premium para moradores',
    points: [
      'Aplicativo com marca do condomínio',
      'Atendimento 24/7 com assistente virtual',
      'Marketplace interno para serviços e produtos',
    ],
    media: {
      src: '/assets/marketing/mock-2.svg',
      width: 420,
      height: 300,
    },
  },
  {
    title: 'Superpoderes para o síndico',
    points: [
      'Dashboards com indicadores de inadimplência',
      'Workflows automatizados para tarefas recorrentes',
      'Biblioteca de documentos sempre atualizada',
    ],
    media: {
      src: '/assets/marketing/mock-3.svg',
      width: 420,
      height: 300,
    },
  },
];

const METRICS = [
  { value: '92%', label: 'redução no tempo de fechamento mensal' },
  { value: '3x', label: 'mais engajamento dos moradores no app' },
  { value: '48h', label: 'para colocar o condomínio em produção' },
  { value: '∞', label: 'integrações com bancos e fabricantes de IoT' },
];

const TESTIMONIALS = [
  {
    quote:
      '“Migramos 12 condomínios em menos de uma semana. O MeuCondomínio trouxe transparência para o conselho e reduziu em 63% as visitas presenciais ao escritório.”',
    author: 'Marina Lopes — Gestora na Vizinhança Administradora',
  },
  {
    quote:
      '“O marketplace interno virou uma fonte de renda para os moradores. Já foram mais de 800 serviços contratados sem sair do aplicativo.”',
    author: 'André Cavalcanti — Síndico profissional',
  },
];

export default function HomeNew({ onLogin, onNavigate }: MarketingPageProps) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [activePath, setActivePath] = useState<MarketingPath>('/solucoes'); // Estado do item ativo do menu

  useEffect(() => {
    document.title = 'MeuCondomínio — Gestão completa para condomínios';
  }, []);

  const handleNavigate = (href: MarketingPath) => {
    setActivePath(href);
    onNavigate(href);
    setIsNavOpen(false);
  };

  return (
    <div className="home-new">
      <style>{`
        :where(.light) .home-new {
          --home-bg: #f8fafc;
          --home-surface: rgba(255, 255, 255, 0.92);
          --home-surface-subtle: rgba(241, 245, 249, 0.6);
          --home-border: rgba(15, 23, 42, 0.08);
          --home-border-strong: rgba(15, 23, 42, 0.18);
          --home-ink: #0f172a;
          --home-ink-muted: #475569;
          --home-ink-soft: #1e293b;
          --home-primary: #16a34a;
          --home-primary-soft: rgba(22, 163, 74, 0.12);
          --home-primary-strong: #0f766e;
          --home-accent: #0ea5e9;
          --home-secondary: #6366f1;
          --home-highlight: rgba(14, 165, 233, 0.22);
          --home-shadow-lg: 0 40px 70px rgba(15, 23, 42, 0.18);
          --home-shadow-md: 0 28px 60px rgba(15, 23, 42, 0.12);
          --home-shadow-sm: 0 20px 45px rgba(15, 23, 42, 0.08);
        }

        :where(.dark) .home-new {
          --home-bg: #020617;
          --home-surface: rgba(15, 23, 42, 0.85);
          --home-surface-subtle: rgba(15, 23, 42, 0.65);
          --home-border: rgba(148, 163, 184, 0.22);
          --home-border-strong: rgba(148, 163, 184, 0.35);
          --home-ink: rgba(226, 232, 240, 0.96);
          --home-ink-muted: rgba(148, 163, 184, 0.82);
          --home-ink-soft: rgba(203, 213, 225, 0.9);
          --home-primary: #22c55e;
          --home-primary-soft: rgba(34, 197, 94, 0.18);
          --home-primary-strong: #38bdf8;
          --home-accent: #38bdf8;
          --home-secondary: #a855f7;
          --home-highlight: rgba(59, 130, 246, 0.35);
          --home-shadow-lg: 0 50px 90px rgba(2, 6, 23, 0.65);
          --home-shadow-md: 0 35px 70px rgba(2, 6, 23, 0.45);
          --home-shadow-sm: 0 25px 55px rgba(2, 6, 23, 0.32);
        }

        .home-new {
          min-height: 100vh;
          background:
            radial-gradient(120% 80% at 15% -10%, rgba(14, 165, 233, 0.15), transparent 60%),
            radial-gradient(150% 80% at 90% 10%, rgba(34, 197, 94, 0.18), transparent 70%),
            var(--home-bg);
          font-family: 'Inter', 'SF Pro Display', 'Segoe UI', system-ui, sans-serif;
          color: var(--home-ink);
        }

        .home-shell {
          width: min(1200px, 92vw);
          margin: 0 auto;
          padding: 4rem 0 6rem;
          display: flex;
          flex-direction: column;
          gap: 6rem;
        }

        @media (max-width: 960px) {
          .home-shell {
            gap: 4rem;
            padding-top: 3rem;
            padding-bottom: 5rem;
          }
        }

        .home-header {
          position: sticky; /* Sticky do header aplicado aqui */
          top: 1.25rem;
          z-index: 20;
        }

        .home-header__bar {
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 1.25rem;
          padding: 1rem 1.25rem;
          border-radius: 18px;
          background: linear-gradient(120deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7));
          backdrop-filter: blur(14px);
          border: 1px solid var(--home-border);
          box-shadow: 0 16px 40px rgba(15, 23, 42, 0.12);
        }

        :where(.dark) .home-header__bar {
          background: linear-gradient(120deg, rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.7));
          box-shadow: 0 18px 40px rgba(2, 6, 23, 0.5);
        }

        .home-logo {
          display: flex;
          flex-direction: column;
          line-height: 1.1;
          gap: 0.15rem;
        }

        .home-logo__brand {
          font-size: 1rem;
          font-weight: 800;
          letter-spacing: -0.02em;
        }

        .home-logo__tagline {
          font-size: 0.78rem;
          color: var(--home-ink-muted);
        }

        .home-nav {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-inline: auto;
          position: relative;
        }

        .home-nav__list {
          display: flex;
          gap: 0.35rem;
          align-items: center;
        }

        .home-nav__item {
          padding: 0.45rem 0.9rem;
          border-radius: 999px;
          border: 1px solid transparent;
          background: transparent;
          color: var(--home-ink-muted);
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.22s ease;
          cursor: pointer;
        }

        .home-nav__item:hover {
          color: var(--home-ink);
          transform: translateY(-1px);
          border-color: var(--home-border);
          background: var(--home-primary-soft);
        }

        .home-nav__item.is-active {
          color: var(--home-primary-strong);
          background: var(--home-primary-soft);
          border-color: rgba(22, 163, 74, 0.18);
          box-shadow: 0 12px 28px rgba(22, 163, 74, 0.12);
        }

        .home-nav__item:focus-visible {
          outline: 2px solid var(--home-primary);
          outline-offset: 2px;
        }

        .home-nav__toggle {
          width: 2.75rem;
          height: 2.75rem;
          border-radius: 12px;
          border: 1px solid var(--home-border);
          background: var(--home-surface);
          color: var(--home-ink);
          display: none;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }

        .home-nav__toggle:hover {
          transform: translateY(-1px) scale(1.02);
          box-shadow: var(--home-shadow-sm);
          border-color: var(--home-border-strong);
        }

        .home-nav__panel {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          position: relative;
        }

        .home-nav__drawer-actions {
          display: none;
          flex-direction: column;
          gap: 0.65rem;
        }

        .home-actions {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          justify-content: flex-end;
        }

        .home-theme-toggle {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.55rem 0.85rem;
          border-radius: 14px;
          border: 1px solid var(--home-border);
          background: var(--home-surface);
          color: var(--home-ink-muted);
          font-size: 0.9rem;
          font-weight: 600;
          transition: background 0.2s ease, box-shadow 0.2s ease, color 0.2s ease, transform 0.2s ease;
        }

        .home-theme-toggle:hover {
          background: var(--home-primary-soft);
          color: var(--home-primary-strong);
          box-shadow: var(--home-shadow-sm);
          transform: translateY(-1px);
        }

        .home-theme-toggle__icon svg {
          width: 1.05rem;
          height: 1.05rem;
        }

        .home-theme-toggle__label {
          white-space: nowrap;
        }

        .home-actions__cta-group {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .home-actions__cta {
          padding: 0.6rem 1.1rem;
          border-radius: 999px;
          font-weight: 700;
          border: 1px solid transparent;
          transition: transform 0.22s ease, box-shadow 0.22s ease, background 0.22s ease, color 0.22s ease,
            border-color 0.22s ease;
          cursor: pointer;
        }

        .home-actions__cta--primary {
          background: linear-gradient(120deg, var(--home-primary), var(--home-primary-strong));
          color: #ecfeff;
          box-shadow: 0 16px 40px rgba(34, 197, 94, 0.35);
        }

        .home-actions__cta--primary:hover {
          transform: translateY(-2px) scale(1.01);
          box-shadow: 0 20px 46px rgba(34, 197, 94, 0.42);
        }

        .home-actions__cta--ghost {
          background: transparent;
          border-color: var(--home-border-strong);
          color: var(--home-ink);
        }

        .home-actions__cta--ghost:hover {
          transform: translateY(-2px);
          background: var(--home-surface);
          box-shadow: var(--home-shadow-sm);
        }

        .home-hero {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 3.5rem;
          align-items: center;
        }

        @media (max-width: 960px) {
          .home-header__bar {
            grid-template-columns: auto auto;
            grid-template-areas:
              'logo actions'
              'menu menu';
            gap: 0.85rem;
            padding: 0.95rem 1.05rem;
          }

          .home-logo {
            grid-area: logo;
          }

          .home-actions {
            grid-area: actions;
            justify-self: end;
          }

          .home-nav {
            grid-area: menu;
            width: 100%;
            justify-content: space-between;
          }

          .home-nav__toggle {
            display: inline-flex;
          }

          .home-nav__panel {
            display: none;
            position: absolute;
            top: calc(100% + 0.75rem);
            left: 0;
            right: 0;
            z-index: 5;
          }

          .home-nav.is-open .home-nav__panel {
            display: grid;
            gap: 0.75rem;
            grid-template-columns: 1fr;
            padding: 0.9rem;
            border-radius: 16px;
            background: var(--home-surface);
            border: 1px solid var(--home-border);
            box-shadow: var(--home-shadow-md);
          }

          .home-nav__list {
            flex-direction: column;
            align-items: stretch;
          }

          .home-nav__item {
            width: 100%;
            text-align: left;
          }

          .home-nav__drawer-actions {
            display: flex;
          }

          .home-actions {
            display: none;
          }

          .home-hero {
            grid-template-columns: 1fr;
            gap: 2.75rem;
          }
        }

        .home-hero__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 0.75rem;
          border-radius: 999px;
          background: var(--home-primary-soft);
          color: var(--home-primary-strong);
          font-weight: 600;
          font-size: 0.9rem;
        }

        .home-hero__title {
          margin-top: 1.2rem;
          font-size: clamp(2.6rem, 3.2vw + 1rem, 3.8rem);
          letter-spacing: -0.04em;
          line-height: 1.05;
          font-weight: 700;
        }

        .home-hero__title strong {
          color: var(--home-primary-strong);
          font-weight: inherit;
        }

        .home-hero__description {
          margin-top: 1.25rem;
          font-size: 1.1rem;
          color: var(--home-ink-muted);
          line-height: 1.6;
          max-width: 32rem;
        }

        .home-hero__cta {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-top: 2rem;
        }

        .home-hero__cta button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          border-radius: 999px;
          padding: 0.9rem 1.6rem;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          border: none;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .home-hero__cta-primary {
          background: linear-gradient(120deg, var(--home-primary), var(--home-primary-strong));
          color: white;
          box-shadow: var(--home-shadow-md);
        }

        .home-hero__cta-primary:hover {
          transform: translateY(-2px);
        }

        .home-hero__cta-secondary {
          background: var(--home-surface);
          color: var(--home-ink-soft);
          border: 1px solid var(--home-border);
        }

        .home-hero__cta-secondary:hover {
          transform: translateY(-2px);
          box-shadow: var(--home-shadow-sm);
        }

        .home-hero__media {
          position: relative;
          padding: 1.25rem;
          border-radius: 36px;
          background: linear-gradient(140deg, var(--home-surface), var(--home-surface-subtle));
          border: 1px solid var(--home-border);
          box-shadow: var(--home-shadow-lg);
        }

        .home-hero__media::after {
          content: '';
          position: absolute;
          inset: 2.5rem;
          border-radius: 32px;
          border: 1px dashed var(--home-border);
          pointer-events: none;
        }

        .home-hero__media img {
          display: block;
          width: 100%;
          height: auto;
          border-radius: 24px;
          box-shadow: 0 15px 40px rgba(15, 23, 42, 0.15);
        }

        .home-feature-grid {
          display: grid;
          gap: 1.5rem;
          grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
        }

        .home-feature {
          padding: 1.4rem 1.6rem;
          border-radius: 24px;
          background: var(--home-surface);
          border: 1px solid var(--home-border);
          box-shadow: var(--home-shadow-sm);
          display: grid;
          gap: 0.75rem;
        }

        .home-feature__icon {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 18px;
          display: grid;
          place-items: center;
          background: var(--home-primary-soft);
          color: var(--home-primary-strong);
        }

        .home-feature__title {
          font-weight: 600;
          font-size: 1.05rem;
        }

        .home-feature__description {
          color: var(--home-ink-muted);
          font-size: 0.95rem;
          line-height: 1.55;
        }

        .home-metrics {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 1.25rem;
          padding: 1.5rem;
          border-radius: 24px;
          background: linear-gradient(140deg, var(--home-surface), var(--home-surface-subtle));
          border: 1px solid var(--home-border);
          box-shadow: var(--home-shadow-sm);
        }

        .home-metric {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .home-metric__value {
          font-size: 1.8rem;
          font-weight: 700;
          letter-spacing: -0.03em;
        }

        .home-metric__label {
          color: var(--home-ink-muted);
          font-size: 0.9rem;
          line-height: 1.45;
        }

        .home-marketplace {
          display: grid;
          gap: 3rem;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          align-items: center;
        }

        @media (max-width: 900px) {
          .home-marketplace {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }

        .home-marketplace__media {
          background: linear-gradient(150deg, var(--home-surface), var(--home-highlight));
          padding: 1.75rem;
          border-radius: 32px;
          border: 1px solid var(--home-border);
          box-shadow: var(--home-shadow-md);
        }

        .home-marketplace__media img {
          width: 100%;
          height: auto;
          display: block;
        }

        .home-marketplace__heading {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          color: var(--home-primary-strong);
          background: var(--home-primary-soft);
          padding: 0.35rem 0.8rem;
          border-radius: 999px;
          font-size: 0.95rem;
        }

        .home-marketplace__title {
          font-size: clamp(2rem, 1.8rem + 1vw, 2.6rem);
          letter-spacing: -0.03em;
          margin-top: 1rem;
          font-weight: 700;
        }

        .home-marketplace__description {
          margin-top: 1rem;
          color: var(--home-ink-muted);
          line-height: 1.6;
        }

        .home-marketplace__pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin-top: 1.5rem;
        }

        .home-marketplace__pill {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.55rem 0.9rem;
          border-radius: 999px;
          border: 1px solid var(--home-border);
          background: var(--home-surface);
          font-size: 0.9rem;
          font-weight: 500;
        }

        .home-sections__heading {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .home-sections {
          display: grid;
          gap: 2.5rem;
        }

        .home-sections__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          background: var(--home-primary-soft);
          color: var(--home-primary-strong);
          font-weight: 600;
          font-size: 0.9rem;
          padding: 0.35rem 0.75rem;
          border-radius: 999px;
          width: fit-content;
        }

        .home-sections__title {
          font-size: clamp(2.1rem, 1.5rem + 1.5vw, 2.8rem);
          letter-spacing: -0.03em;
          font-weight: 700;
        }

        .home-sections__description {
          font-size: 1.05rem;
          color: var(--home-ink-muted);
          line-height: 1.65;
          max-width: 40rem;
        }

        .home-modules {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1.5rem;
        }

        .home-module {
          position: relative;
          overflow: hidden;
          border-radius: 28px;
          border: 1px solid var(--home-border);
          background: linear-gradient(160deg, var(--home-surface), var(--home-surface-subtle));
          box-shadow: var(--home-shadow-sm);
          display: grid;
          gap: 1.25rem;
          padding: 1.75rem 1.5rem 1.5rem;
        }

        .home-module__media {
          border-radius: 20px;
          overflow: hidden;
          background: var(--home-highlight);
          border: 1px solid var(--home-border);
        }

        .home-module__media img {
          width: 100%;
          height: auto;
          display: block;
        }

        .home-module__title {
          font-size: 1.15rem;
          font-weight: 600;
        }

        .home-module__list {
          display: grid;
          gap: 0.6rem;
          color: var(--home-ink-muted);
          font-size: 0.95rem;
        }

        .home-module__list-item {
          display: flex;
          gap: 0.5rem;
          align-items: flex-start;
        }

        .home-module__list-item svg {
          flex-shrink: 0;
          color: var(--home-primary-strong);
        }

        .home-testimonials {
          display: grid;
          gap: 1.5rem;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        }

        .home-testimonial {
          padding: 1.75rem;
          border-radius: 28px;
          border: 1px solid var(--home-border);
          background: linear-gradient(150deg, var(--home-surface), var(--home-surface-subtle));
          box-shadow: var(--home-shadow-sm);
          display: grid;
          gap: 1.25rem;
        }

        .home-testimonial__quote {
          font-size: 1.05rem;
          line-height: 1.6;
        }

        .home-testimonial__author {
          color: var(--home-ink-muted);
          font-weight: 600;
        }

        .home-cta {
          border-radius: 36px;
          padding: 3.5rem clamp(1.5rem, 6vw, 4rem);
          background: linear-gradient(120deg, var(--home-primary), var(--home-secondary));
          color: white;
          display: grid;
          gap: 1.5rem;
          box-shadow: var(--home-shadow-lg);
        }

        .home-cta__title {
          font-size: clamp(2.2rem, 2rem + 1vw, 2.8rem);
          letter-spacing: -0.04em;
          font-weight: 700;
        }

        .home-cta__actions {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .home-cta__actions button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          border-radius: 999px;
          padding: 0.9rem 1.6rem;
          font-weight: 600;
          cursor: pointer;
          border: none;
        }

        .home-cta__actions button:nth-child(2) {
          background: rgba(15, 23, 42, 0.18);
        }

        .home-cta__actions button:nth-child(2):hover {
          background: rgba(15, 23, 42, 0.26);
        }

        .home-cta__actions button:focus-visible {
          outline: 2px solid rgba(255, 255, 255, 0.8);
          outline-offset: 3px;
        }

        @media (max-width: 720px) {
          .home-header__bar {
            border-radius: 14px;
          }

          .home-nav.is-open .home-nav__panel {
            padding: 0.85rem;
          }

          .home-nav__drawer-actions {
            gap: 0.8rem;
          }

          .home-theme-toggle__label {
            display: none;
          }

          .home-cta {
            border-radius: 28px;
            text-align: center;
          }

          .home-cta__actions {
            justify-content: center;
          }
        }
      `}</style>

      <div className="home-shell">
        <header className="home-header" aria-label="Navegação principal">
          <div className="home-header__bar">
            <div className="home-logo">
              <span className="home-logo__brand">MeuCondomínio</span>
              <span className="home-logo__tagline">Gestão completa para condomínios</span>
            </div>

            <nav className={`home-nav ${isNavOpen ? 'is-open' : ''}`} aria-label="Seções do site">
              <button
                type="button"
                className="home-nav__toggle"
                aria-expanded={isNavOpen}
                aria-label={isNavOpen ? 'Fechar menu' : 'Abrir menu'}
                onClick={() => setIsNavOpen((state) => !state)}
              >
                {isNavOpen ? <X size={18} /> : <Menu size={18} />}
              </button>

              <div className="home-nav__panel">
                <div className="home-nav__list">
                  {NAVIGATION_LINKS.map(({ href, label }) => (
                    <button
                      key={href}
                      type="button"
                      className={`home-nav__item ${activePath === href ? 'is-active' : ''}`}
                      aria-current={activePath === href ? 'page' : undefined}
                      onClick={() => handleNavigate(href)}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <div className="home-nav__drawer-actions">
                  <ThemeToggle className="home-actions__toggle" />
                  <div className="home-actions__cta-group">
                    <button
                      type="button"
                      className="home-actions__cta home-actions__cta--primary"
                      onClick={() => handleNavigate('/solucoes')}
                    >
                      Começar agora
                    </button>
                    <button
                      type="button"
                      className="home-actions__cta home-actions__cta--ghost"
                      onClick={onLogin}
                    >
                      Entrar
                    </button>
                  </div>
                </div>
              </div>
            </nav>

            <div className="home-actions">
              <ThemeToggle className="home-actions__toggle" />
              <div className="home-actions__cta-group">
                <button
                  type="button"
                  className="home-actions__cta home-actions__cta--primary"
                  onClick={() => handleNavigate('/solucoes')}
                >
                  Começar agora
                </button>
                <button
                  type="button"
                  className="home-actions__cta home-actions__cta--ghost"
                  onClick={onLogin}
                >
                  Entrar
                </button>
              </div>
            </div>
          </div>
        </header>

        <section className="home-hero">
          <div>
            <span className="home-hero__eyebrow">
              <Sparkles size={18} strokeWidth={1.8} />
              Plataforma tudo-em-um para síndicos visionários
            </span>
            <h1 className="home-hero__title">
              Transforme a gestão do seu condomínio com uma experiência <strong>premium</strong> para todos.
            </h1>
            <p className="home-hero__description">
              Centralize finanças, comunicação e operações em um único painel inteligente. Simplifique o trabalho do síndico, encante moradores e reduza custos com automações reais.
            </p>
            <div className="home-hero__cta">
              <button
                type="button"
                className="home-hero__cta-primary"
                onClick={() => onNavigate('/solucoes')}
              >
                Explorar soluções
                <ArrowRight size={18} strokeWidth={1.8} />
              </button>
              <button
                type="button"
                className="home-hero__cta-secondary"
                onClick={() => onNavigate('/precos')}
              >
                Ver planos
              </button>
            </div>

            <div className="home-feature-grid" aria-label="Diferenciais do MeuCondomínio">
              {HERO_FEATURES.map(({ title, description, icon: Icon }) => (
                <article key={title} className="home-feature">
                  <span className="home-feature__icon">
                    <Icon size={20} strokeWidth={1.8} />
                  </span>
                  <h2 className="home-feature__title">{title}</h2>
                  <p className="home-feature__description">{description}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="home-hero__media">
            <img
              src="/assets/marketing/hero.svg"
              alt="Aplicativo MeuCondomínio exibindo dashboards e marketplace"
              width={960}
              height={800}
              fetchpriority="high"
              decoding="async"
              srcSet="/assets/marketing/hero.svg 960w"
              sizes="(max-width: 960px) 90vw, 480px"
            />
          </div>
        </section>

        <section className="home-metrics" aria-label="Resultados comprovados">
          {METRICS.map((metric) => (
            <article key={metric.value} className="home-metric">
              <span className="home-metric__value">{metric.value}</span>
              <span className="home-metric__label">{metric.label}</span>
            </article>
          ))}
        </section>

        <section className="home-marketplace">
          <div className="home-marketplace__media">
            <img
              src="/assets/marketing/market-illus.svg"
              alt="Tela do marketplace com vitrine de serviços para moradores"
              width={720}
              height={540}
              loading="lazy"
              decoding="async"
              srcSet="/assets/marketing/market-illus.svg 720w"
              sizes="(max-width: 900px) 90vw, 420px"
            />
          </div>

          <div>
            <span className="home-marketplace__heading">
              <ShieldCheck size={18} strokeWidth={1.8} />
              Marketplace interno
            </span>
            <h2 className="home-marketplace__title">
              Um marketplace seguro para gerar receita dentro do condomínio.
            </h2>
            <p className="home-marketplace__description">
              Conecte moradores, fornecedores e o síndico em um ambiente com curadoria. Aprove o que vai ao ar, crie promoções, receba pagamentos instantaneamente e acompanhe indicadores em tempo real.
            </p>
            <div className="home-marketplace__pills">
              {MARKETPLACE_PILLS.map((pill) => (
                <span key={pill} className="home-marketplace__pill">
                  <CheckCircle2 size={16} strokeWidth={1.8} />
                  {pill}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="modulos-titulo" className="home-sections">
          <header className="home-sections__heading">
            <span className="home-sections__eyebrow">
              <Sparkles size={18} strokeWidth={1.8} />
              Módulos que trabalham por você
            </span>
            <h2 id="modulos-titulo" className="home-sections__title">
              Automação de ponta a ponta para equipes enxutas.
            </h2>
            <p className="home-sections__description">
              Organize finanças, relacionamento com moradores e operações com fluxos que seguem as melhores práticas do mercado condominial brasileiro.
            </p>
          </header>

          <div className="home-modules">
            {MODULES.map(({ title, points, media }) => (
              <article key={title} className="home-module">
                <div className="home-module__media">
                  <img
                    src={media.src}
                    alt={title}
                    width={media.width}
                    height={media.height}
                    loading="lazy"
                    decoding="async"
                    srcSet={`${media.src} ${media.width}w`}
                    sizes="(max-width: 720px) 90vw, 320px"
                  />
                </div>
                <h3 className="home-module__title">{title}</h3>
                <div className="home-module__list">
                  {points.map((point) => (
                    <span key={point} className="home-module__list-item">
                      <Star size={16} strokeWidth={1.6} />
                      {point}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="depoimentos-titulo" className="home-sections">
          <header className="home-sections__heading">
            <span className="home-sections__eyebrow">
              <ShieldCheck size={18} strokeWidth={1.8} />
              Histórias reais de síndicos
            </span>
            <h2 id="depoimentos-titulo" className="home-sections__title">
              Resultados consistentes do Norte ao Sul do Brasil.
            </h2>
          </header>

          <div className="home-testimonials">
            {TESTIMONIALS.map(({ quote, author }) => (
              <article key={author} className="home-testimonial">
                <p className="home-testimonial__quote">{quote}</p>
                <span className="home-testimonial__author">{author}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="home-cta" aria-label="Agende uma demonstração">
          <div>
            <h2 className="home-cta__title">Pronto para elevar o padrão do seu condomínio?</h2>
            <p>
              Agende uma demonstração gratuita, veja os fluxos em ação e descubra como o MeuCondomínio pode reduzir custos em semanas.
            </p>
          </div>
          <div className="home-cta__actions">
            <button type="button" onClick={() => onNavigate('/solucoes')}>
              Agendar demonstração
              <ArrowRight size={18} strokeWidth={1.8} />
            </button>
            <button type="button" onClick={() => onNavigate('/sobre')}>
              Conhecer nossa história
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
