import { useEffect } from 'react';
import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Star,
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
      src: '/img/inicio/module-analytics.svg',
      width: 420,
      height: 320,
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
      src: '/img/inicio/module-mobile.svg',
      width: 420,
      height: 320,
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
      src: '/img/inicio/module-operations.svg',
      width: 420,
      height: 320,
    },
  },
];

const MARKETPLACE_LISTINGS = [
  {
    title: 'iPhone 13 Pro 256GB',
    price: 'R$ 3.200',
    condition: 'Usado',
    tower: 'Torre A',
    rating: '4.9',
    image: '/img/inicio/marketplace-iphone.svg',
  },
  {
    title: 'Sofá 3 lugares',
    price: 'R$ 1.500',
    condition: 'Usado',
    tower: 'Torre B',
    rating: '5.0',
    image: '/img/inicio/marketplace-sofa.svg',
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
  useEffect(() => {
    document.title = 'MeuCondomínio — Gestão completa para condomínios';
  }, []);

  return (
    <div className="home-new">
      <style>{`
        :where(.light) .home-new {
          --home-bg: #f3fbf7;
          --home-surface: rgba(255, 255, 255, 0.94);
          --home-surface-subtle: rgba(227, 247, 238, 0.7);
          --home-border: rgba(15, 61, 46, 0.08);
          --home-border-strong: rgba(15, 61, 46, 0.16);
          --home-ink: #0f3d2e;
          --home-ink-muted: #3d6755;
          --home-ink-soft: #145943;
          --home-primary: #0f3d2e;
          --home-primary-soft: rgba(15, 61, 46, 0.08);
          --home-primary-strong: #20c997;
          --home-accent: #20c997;
          --home-secondary: #145943;
          --home-highlight: rgba(32, 201, 151, 0.22);
          --home-shadow-lg: 0 40px 70px rgba(15, 61, 46, 0.18);
          --home-shadow-md: 0 28px 60px rgba(15, 61, 46, 0.12);
          --home-shadow-sm: 0 20px 45px rgba(15, 61, 46, 0.08);
        }

        :where(.dark) .home-new {
          --home-bg: #041f16;
          --home-surface: rgba(6, 22, 16, 0.86);
          --home-surface-subtle: rgba(6, 22, 16, 0.65);
          --home-border: rgba(135, 225, 196, 0.2);
          --home-border-strong: rgba(135, 225, 196, 0.32);
          --home-ink: rgba(234, 252, 244, 0.95);
          --home-ink-muted: rgba(178, 232, 211, 0.82);
          --home-ink-soft: rgba(209, 246, 231, 0.88);
          --home-primary: #20c997;
          --home-primary-soft: rgba(32, 201, 151, 0.22);
          --home-primary-strong: #5fe3bb;
          --home-accent: #5fe3bb;
          --home-secondary: #83f0cf;
          --home-highlight: rgba(32, 201, 151, 0.32);
          --home-shadow-lg: 0 50px 90px rgba(4, 31, 22, 0.65);
          --home-shadow-md: 0 35px 70px rgba(4, 31, 22, 0.45);
          --home-shadow-sm: 0 25px 55px rgba(4, 31, 22, 0.32);
        }

        .home-new {
          min-height: 100vh;
          background:
            radial-gradient(140% 90% at 10% -10%, rgba(32, 201, 151, 0.18), transparent 60%),
            radial-gradient(160% 95% at 95% 15%, rgba(14, 89, 67, 0.22), transparent 70%),
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

          .home-hero__media {
            margin-top: 1.5rem;
            min-height: 360px;
          }

          .home-hero__media-collab {
            top: 6%;
            right: -2%;
            width: min(220px, 60%);
          }

          .home-hero__media-profile {
            left: 4%;
            bottom: 6%;
          }
        }

        .home-header {
          display: flex;
          align-items: center;
          gap: 2rem;
          padding: 1.25rem 1.5rem;
          border-radius: 999px;
          background: linear-gradient(120deg, rgba(255, 255, 255, 0.65), rgba(255, 255, 255, 0.35));
          backdrop-filter: blur(14px);
          border: 1px solid var(--home-border);
          box-shadow: var(--home-shadow-sm);
          position: sticky;
          top: 1.5rem;
          z-index: 10;
        }

        :where(.dark) .home-header {
          background: linear-gradient(120deg, rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.65));
        }

        .home-logo {
          display: flex;
          flex-direction: column;
          line-height: 1.1;
        }

        .home-logo__brand {
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: -0.02em;
        }

        .home-logo__tagline {
          font-size: 0.75rem;
          color: var(--home-ink-muted);
        }

        .home-nav {
          display: flex;
          gap: 1.25rem;
          margin-left: auto;
          margin-right: auto;
          font-size: 0.95rem;
        }

        .home-nav button {
          background: none;
          border: none;
          color: inherit;
          font: inherit;
          padding: 0.4rem 0.65rem;
          border-radius: 999px;
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease;
        }

        .home-nav button:focus-visible {
          outline: 2px solid var(--home-primary);
          outline-offset: 2px;
        }

        .home-nav button:hover {
          background: var(--home-primary-soft);
          color: var(--home-primary-strong);
        }

        .home-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .home-theme-toggle {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.55rem 0.85rem;
          border-radius: 999px;
          border: 1px solid var(--home-border);
          background: var(--home-surface);
          color: var(--home-ink-muted);
          font-size: 0.9rem;
          font-weight: 600;
          transition: background 0.2s ease, box-shadow 0.2s ease, color 0.2s ease;
        }

        .home-theme-toggle:hover {
          background: var(--home-primary-soft);
          color: var(--home-primary-strong);
          box-shadow: var(--home-shadow-sm);
        }

        .home-theme-toggle__icon svg {
          width: 1.05rem;
          height: 1.05rem;
        }

        .home-theme-toggle__label {
          white-space: nowrap;
        }

        .home-actions__login {
          padding: 0.55rem 1rem;
          border-radius: 999px;
          border: 1px solid var(--home-border-strong);
          background: var(--home-surface);
          color: var(--home-ink-soft);
          font-weight: 600;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .home-actions__login:hover {
          transform: translateY(-1px);
          box-shadow: var(--home-shadow-sm);
        }

        .home-hero {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 3.5rem;
          align-items: center;
        }

        @media (max-width: 960px) {
          .home-header {
            flex-wrap: wrap;
            justify-content: center;
            border-radius: 24px;
          }

          .home-nav {
            flex-wrap: wrap;
            justify-content: center;
            margin-inline: 0;
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
          padding: 2rem;
          border-radius: 40px;
          background:
            radial-gradient(120% 80% at 20% 0%, rgba(32, 201, 151, 0.22), transparent 60%),
            radial-gradient(110% 70% at 80% 20%, rgba(14, 89, 67, 0.25), transparent 65%),
            linear-gradient(145deg, var(--home-surface), var(--home-surface-subtle));
          border: 1px solid var(--home-border);
          box-shadow: var(--home-shadow-lg);
          overflow: hidden;
          min-height: 420px;
          isolation: isolate;
        }

        .home-hero__media::after {
          content: '';
          position: absolute;
          inset: 1.5rem;
          border-radius: 32px;
          border: 1px dashed var(--home-border);
          opacity: 0.4;
          pointer-events: none;
        }

        .home-hero__media-main {
          position: relative;
          width: min(420px, 100%);
          border-radius: 32px;
          overflow: hidden;
          box-shadow: var(--home-shadow-md);
          z-index: 1;
        }

        .home-hero__media-main img {
          display: block;
          width: 100%;
          height: auto;
        }

        .home-hero__media-floating {
          position: absolute;
          background: var(--home-surface);
          border-radius: 28px;
          border: 1px solid var(--home-border);
          box-shadow: var(--home-shadow-sm);
          padding: 1rem;
          display: grid;
          gap: 0.75rem;
          z-index: 2;
          backdrop-filter: blur(12px);
        }

        .home-hero__media-collab {
          top: 10%;
          right: -6%;
          width: min(260px, 65%);
        }

        .home-hero__media-collab img {
          display: block;
          width: 100%;
          height: auto;
          border-radius: 22px;
        }

        .home-hero__media-profile {
          left: -6%;
          bottom: 8%;
          padding: 0.9rem 1.2rem;
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .home-hero__media-profile img {
          width: 74px;
          height: 74px;
          border-radius: 50%;
          border: 3px solid rgba(32, 201, 151, 0.4);
          box-shadow: var(--home-shadow-sm);
        }

        .home-hero__media-profile__content {
          display: grid;
          gap: 0.2rem;
        }

        .home-hero__media-profile__title {
          font-weight: 600;
          font-size: 0.95rem;
        }

        .home-hero__media-profile__subtitle {
          font-size: 0.8rem;
          color: var(--home-ink-muted);
        }

        .home-hero__media-rating {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-weight: 600;
          font-size: 0.8rem;
          color: var(--home-primary-strong);
          background: var(--home-primary-soft);
          padding: 0.3rem 0.65rem;
          border-radius: 999px;
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
          display: grid;
          place-items: center;
        }

        .home-marketplace__app-card {
          width: min(420px, 100%);
          padding: 1.75rem;
          border-radius: 32px;
          border: 1px solid var(--home-border);
          background:
            radial-gradient(110% 80% at 0% 20%, rgba(32, 201, 151, 0.2), transparent 70%),
            linear-gradient(150deg, var(--home-surface), var(--home-surface-subtle));
          box-shadow: var(--home-shadow-md);
          display: grid;
          gap: 1.5rem;
        }

        .home-marketplace__card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .home-marketplace__chip {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.4rem 0.85rem;
          border-radius: 999px;
          background: var(--home-primary-soft);
          color: var(--home-primary-strong);
          font-weight: 600;
          font-size: 0.85rem;
        }

        .home-marketplace__chip--muted {
          background: rgba(15, 61, 46, 0.12);
          color: var(--home-ink);
        }

        :where(.dark) .home-marketplace__chip--muted {
          background: rgba(95, 227, 187, 0.22);
          color: var(--home-ink);
        }

        .home-marketplace__card-header h3 {
          margin: 0.75rem 0 0;
          font-size: 1.1rem;
          font-weight: 600;
          letter-spacing: -0.01em;
        }

        .home-marketplace__listings {
          display: grid;
          gap: 1rem;
        }

        .home-marketplace__listing {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 1rem;
          align-items: center;
          padding: 0.9rem;
          border-radius: 22px;
          border: 1px solid var(--home-border);
          background: rgba(255, 255, 255, 0.7);
          box-shadow: 0 18px 28px rgba(15, 23, 42, 0.08);
        }

        :where(.dark) .home-marketplace__listing {
          background: rgba(15, 23, 42, 0.75);
        }

        .home-marketplace__listing-image {
          width: 76px;
          height: 76px;
          border-radius: 20px;
          background: var(--home-surface-subtle);
          display: grid;
          place-items: center;
        }

        .home-marketplace__listing-image img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .home-marketplace__listing-title {
          font-weight: 600;
          font-size: 1rem;
        }

        .home-marketplace__listing-price {
          font-weight: 700;
          color: var(--home-primary);
        }

        .home-marketplace__listing-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin-top: 0.3rem;
          color: var(--home-ink-muted);
          font-size: 0.85rem;
        }

        .home-marketplace__listing-rating {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-weight: 600;
          color: var(--home-secondary);
        }

        .home-marketplace__footer {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          color: var(--home-ink-muted);
          font-size: 0.78rem;
        }

        .home-marketplace__footer span {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.45rem 0.75rem;
          border-radius: 999px;
          background: rgba(14, 165, 233, 0.12);
          color: var(--home-ink-soft);
          font-weight: 500;
        }

        :where(.dark) .home-marketplace__footer span {
          background: rgba(56, 189, 248, 0.2);
          color: var(--home-ink);
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
          .home-header {
            padding: 1rem;
          }

          .home-actions {
            width: 100%;
            justify-content: center;
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

          .home-hero__media {
            padding: 1.5rem;
          }

          .home-hero__media-floating {
            position: static;
            width: 100%;
            margin-top: 1.25rem;
            backdrop-filter: none;
          }

          .home-hero__media-collab {
            width: 100%;
          }

          .home-hero__media-profile {
            justify-content: center;
          }
        }
      `}</style>

      <div className="home-shell">
        <header className="home-header" aria-label="Navegação principal">
          <div className="home-logo">
            <span className="home-logo__brand">MeuCondomínio</span>
            <span className="home-logo__tagline">Gestão completa para condomínios</span>
          </div>

          <nav className="home-nav" aria-label="Seções do site">
            {NAVIGATION_LINKS.map(({ href, label }) => (
              <button key={href} type="button" onClick={() => onNavigate(href)}>
                {label}
              </button>
            ))}
          </nav>

          <div className="home-actions">
            <ThemeToggle className="home-actions__toggle" />
            <button type="button" className="home-actions__login" onClick={onLogin}>
              Entrar
            </button>
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
            <div className="home-hero__media-main">
              <img
                src="/img/inicio/hero-app-car.svg"
                alt="Aplicativo móvel do MeuCondomínio em destaque"
                width={640}
                height={480}
                fetchpriority="high"
                decoding="async"
              />
            </div>

            <div className="home-hero__media-floating home-hero__media-collab">
              <img
                src="/img/inicio/hero-collab.svg"
                alt="Equipe colaborando em painel digital"
                width={420}
                height={320}
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="home-hero__media-floating home-hero__media-profile">
              <img
                src="/img/inicio/testimonial-marina.svg"
                alt="Retrato de síndica satisfeita"
                width={120}
                height={134}
                loading="lazy"
                decoding="async"
              />
              <div className="home-hero__media-profile__content">
                <span className="home-hero__media-profile__title">Marina Lopes</span>
                <span className="home-hero__media-profile__subtitle">Síndica profissional</span>
                <span className="home-hero__media-rating">
                  <Star size={14} fill="currentColor" strokeWidth={0} />
                  4,9/5 satisfação
                </span>
              </div>
            </div>
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
            <div className="home-marketplace__app-card">
              <div>
                <div className="home-marketplace__card-header">
                  <span className="home-marketplace__chip">
                    <Sparkles size={16} strokeWidth={1.8} /> Destaques da semana
                  </span>
                  <span className="home-marketplace__chip home-marketplace__chip--muted">
                    <ShieldCheck size={16} strokeWidth={1.8} /> Protegido
                  </span>
                </div>
                <h3>Marketplace de moradores</h3>
              </div>

              <div className="home-marketplace__listings">
                {MARKETPLACE_LISTINGS.map((listing) => (
                  <article key={listing.title} className="home-marketplace__listing">
                    <div className="home-marketplace__listing-image">
                      <img
                        src={listing.image}
                        alt={listing.title}
                        width={96}
                        height={96}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div>
                      <h3 className="home-marketplace__listing-title">{listing.title}</h3>
                      <div className="home-marketplace__listing-price">{listing.price}</div>
                      <div className="home-marketplace__listing-meta">
                        <span>{listing.condition}</span>
                        <span>• {listing.tower}</span>
                        <span className="home-marketplace__listing-rating">
                          <Star size={14} fill="currentColor" strokeWidth={0} />
                          {listing.rating}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="home-marketplace__footer">
                <span>
                  <ShieldCheck size={14} strokeWidth={1.8} /> Verificação do morador
                </span>
                <span>
                  <Sparkles size={14} strokeWidth={1.8} /> Pagamento protegido
                </span>
                <span>
                  <Building2 size={14} strokeWidth={1.8} /> Retirada na portaria
                </span>
              </div>
            </div>
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
