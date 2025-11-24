import { useEffect, useState, type MouseEvent, type ReactNode } from 'react';

export type MarketingPath =
  | '/'
  | '/solucoes'
  | '/precos'
  | '/sobre'
  | '/suporte'
  | '/blog'
  | '/comece'
  | '/demo'
  | '/marketplace';

export interface MarketingPageProps {
  onNavigate: (path: MarketingPath) => void;
  onLogin: () => void;
}

interface MarketingLayoutProps extends MarketingPageProps {
  children: ReactNode;
  currentPath: MarketingPath;
}

const NAVIGATION_LINKS: Array<{ href: MarketingPath; label: string }> = [
  { href: '/solucoes', label: 'Soluções' },
  { href: '/precos', label: 'Preços' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/suporte', label: 'Suporte' },
  { href: '/blog', label: 'Blog' },
];

export function MarketingLayout({
  children,
  currentPath,
  onNavigate,
  onLogin,
}: MarketingLayoutProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigate = (event: MouseEvent<HTMLAnchorElement>, path: MarketingPath) => {
    event.preventDefault();
    if (currentPath === path) {
      setIsMenuOpen(false);
      return;
    }

    onNavigate(path);
    setIsMenuOpen(false);
  };

  const handleLogin = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onLogin();
    setIsMenuOpen(false);
  };

  const handlePrimaryCta = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onNavigate('/comece');
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <style>{`
        :root {
          --bg: var(--mc-white);
          --bg-soft: var(--mc-white-soft);
          --card: #ffffff;
          --card-soft: rgba(119, 138, 87, 0.08);
          --text: var(--mc-secondary-dark);
          --text-dim: var(--mc-secondary);
          --text-muted: var(--mc-secondary-1);
          --brand: var(--mc-secondary);
          --brand-2: var(--mc-primary);
          --accent: var(--mc-primary);
          --muted: rgba(52, 78, 65, 0.1);
          --border: rgba(21, 41, 31, 0.12);
          --shadow: 0 18px 35px rgba(21, 41, 31, 0.14);
          --radius: 16px;
          --radius-lg: 24px;
        }

        * {
          box-sizing: border-box;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        a:focus-visible,
        button:focus-visible {
          outline: 2px solid var(--brand-2);
          outline-offset: 3px;
          border-radius: 10px;
        }

        .marketing-wrap {
          min-height: 100dvh;
          background:
            radial-gradient(1200px 800px at -10% 0%, rgba(163, 177, 138, 0.08), transparent 60%),
            radial-gradient(900px 600px at 110% 0%, rgba(21, 41, 31, 0.08), transparent 55%),
            var(--bg);
          color: var(--text);
          display: flex;
          flex-direction: column;
        }

        .marketing-container {
          width: min(1100px, 92%);
          margin: 0 auto;
        }

        .marketing-header {
          position: sticky;
          top: 0;
          z-index: 20;
          backdrop-filter: saturate(160%) blur(14px);
          background: rgba(255, 255, 255, 0.9);
          border-bottom: 1px solid transparent;
          box-shadow: 0 10px 30px rgba(21, 41, 31, 0.06);
          transition: background 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }

        .marketing-header[data-scrolled='true'] {
          background: rgba(255, 255, 255, 0.96);
          border-color: var(--border);
          box-shadow: 0 18px 45px rgba(21, 41, 31, 0.12);
        }

        :where(.dark) .marketing-header {
          background: rgba(15, 23, 42, 0.85);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        :where(.dark) .marketing-header[data-scrolled='true'] {
          background: rgba(15, 23, 42, 0.92);
          border-color: rgba(148, 163, 184, 0.16);
          box-shadow: 0 18px 45px rgba(0, 0, 0, 0.45);
        }

        .marketing-nav {
          display: flex;
          align-items: center;
          gap: 16px;
          height: 76px;
          position: relative;
        }

        .marketing-logo {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-weight: 800;
          letter-spacing: 0.15px;
          color: var(--mc-secondary-dark);
        }

        .marketing-logo img {
          height: 38px;
          width: auto;
          display: block;
        }

        .marketing-logo__text {
          display: inline-flex;
          flex-direction: column;
          gap: 2px;
          color: var(--mc-secondary-dark);
          font-weight: 800;
          line-height: 1.1;
        }

        .marketing-menu {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-left: auto;
        }

        .marketing-menu__links {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .marketing-menu a {
          padding: 9px 13px;
          border-radius: 12px;
          color: var(--text-dim);
          transition: transform 0.15s, background 0.15s, color 0.15s;
          border: 1px solid transparent;
        }

        .marketing-menu a[data-active="true"] {
          background: rgba(163, 177, 138, 0.12);
          color: var(--brand);
          border-color: rgba(163, 177, 138, 0.14);
        }

        .marketing-menu a:hover {
          background: rgba(163, 177, 138, 0.1);
          color: var(--brand);
          transform: translateY(-1px);
        }

        .marketing-actions {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .marketing-menu-toggle {
          display: none;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 12px;
          border: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.8);
          box-shadow: 0 12px 30px rgba(21, 41, 31, 0.1);
          cursor: pointer;
          transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
          margin-left: auto;
        }

        .marketing-menu-toggle:hover {
          transform: translateY(-1px);
          box-shadow: 0 16px 32px rgba(21, 41, 31, 0.12);
          background: rgba(255, 255, 255, 0.92);
        }

        .marketing-menu-toggle__bar {
          display: block;
          width: 18px;
          height: 2px;
          background: var(--text);
          border-radius: 999px;
          position: relative;
        }

        .marketing-menu-toggle__bar::before,
        .marketing-menu-toggle__bar::after {
          content: '';
          position: absolute;
          left: 0;
          width: 18px;
          height: 2px;
          background: var(--text);
          border-radius: 999px;
          transition: transform 0.2s ease, opacity 0.2s ease;
        }

        .marketing-menu-toggle__bar::before {
          top: -6px;
        }

        .marketing-menu-toggle__bar::after {
          top: 6px;
        }

        .marketing-menu-toggle[data-open='true'] .marketing-menu-toggle__bar {
          background: transparent;
        }

        .marketing-menu-toggle[data-open='true'] .marketing-menu-toggle__bar::before {
          transform: translateY(6px) rotate(45deg);
        }

        .marketing-menu-toggle[data-open='true'] .marketing-menu-toggle__bar::after {
          transform: translateY(-6px) rotate(-45deg);
        }

        .marketing-hero-actions {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 16px;
        }

        .marketing-hero-actions a {
          padding: 12px 20px;
          border-radius: 16px;
          border: 1px solid var(--brand);
          font-weight: 700;
          letter-spacing: 0.2px;
          cursor: pointer;
          transition: transform 0.15s, box-shadow 0.15s, background 0.2s, color 0.2s;
          box-shadow: var(--shadow);
          background: var(--brand);
          color: #ffffff;
        }

        .marketing-hero-actions a.secondary {
          background: #ffffff;
          color: var(--brand);
          border-color: var(--border);
          box-shadow: 0 12px 24px rgba(21, 41, 31, 0.12);
        }

        .marketing-hero-actions a:hover {
          transform: translateY(-1px);
          box-shadow: 0 16px 32px rgba(21, 41, 31, 0.18);
        }

        .marketing-hero-actions a.secondary:hover {
          background: rgba(163, 177, 138, 0.12);
          color: var(--brand);
        }

        .marketing-hero-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 20px;
          align-items: stretch;
        }

        .marketing-hero-card {
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .marketing-hero-card__header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
        }

        .marketing-card-title {
          margin: 10px 0 0;
          font-size: 16px;
          color: var(--text);
        }

        .marketing-hero-card__metrics {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 12px;
        }

        .marketing-hero-card__metric {
          background: var(--bg-soft);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 12px;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.5);
        }

        .marketing-hero-card__metric-value {
          font-weight: 800;
          font-size: 18px;
          color: var(--brand);
        }

        .marketing-hero-card__metric-label {
          font-weight: 700;
          color: var(--text);
        }

        .marketing-hero-card__metric-detail {
          margin: 6px 0 0;
          color: var(--text-muted);
          font-size: 13px;
        }

        .marketing-chip-row {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .marketing-chip {
          display: inline-flex;
          align-items: center;
          padding: 6px 10px;
          border-radius: 999px;
          background: rgba(163, 177, 138, 0.12);
          color: var(--text);
          font-weight: 600;
          border: 1px solid var(--border);
          font-size: 13px;
        }

        .marketing-status-row {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-weight: 700;
          color: var(--text);
        }

        .marketing-status-dot {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: var(--mc-success);
          box-shadow: 0 0 0 6px rgba(97, 225, 110, 0.18);
        }

        .marketing-status-label {
          color: var(--text-muted);
          font-weight: 600;
        }

        .marketing-cta,
        .marketing-cta-secondary {
          padding: 10px 16px;
          border-radius: 14px;
          border: 1px solid transparent;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: var(--shadow);
          transition: transform 0.15s, box-shadow 0.15s, background 0.2s, color 0.2s, border-color 0.2s;
        }

        .marketing-cta {
          background: linear-gradient(120deg, var(--brand) 0%, var(--brand-2) 100%);
          color: #ffffff;
          border-color: var(--brand-2);
        }

        .marketing-cta-secondary {
          background: transparent;
          color: var(--text);
          border-color: var(--border);
          box-shadow: 0 12px 24px rgba(21, 41, 31, 0.08);
        }

        .marketing-cta:hover,
        .marketing-cta-secondary:hover {
          transform: translateY(-1px);
          box-shadow: 0 16px 28px rgba(21, 41, 31, 0.16);
        }

        .marketing-cta-secondary:hover {
          background: rgba(163, 177, 138, 0.08);
          color: var(--brand);
          border-color: rgba(163, 177, 138, 0.25);
        }

        .marketing-main {
          flex: 1;
          padding: 48px 0 72px;
          display: flex;
          flex-direction: column;
          gap: 72px;
        }

        .marketing-section {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .marketing-section-header {
          max-width: 760px;
        }

        .marketing-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: var(--bg-soft);
          color: var(--brand);
          font-size: 12px;
          letter-spacing: 0.2px;
          text-transform: uppercase;
        }

        .marketing-title {
          margin: 0;
          font-size: clamp(28px, 4vw, 46px);
          line-height: 1.1;
          font-weight: 900;
          letter-spacing: -0.5px;
          background: linear-gradient(90deg, var(--brand) 0%, var(--brand-2) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .marketing-subtitle,
        .marketing-lead {
          margin: 0;
          color: var(--text-dim);
          font-size: 16px;
          line-height: 1.6;
        }

        .marketing-lead {
          font-size: 18px;
        }

        .marketing-grid {
          display: grid;
          gap: 18px;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        }

        .marketing-grid-2 {
          display: grid;
          gap: 28px;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        }

        .marketing-metrics {
          display: grid;
          gap: 18px;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        }

        .marketing-metric-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 18px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          text-align: center;
          box-shadow: 0 10px 20px rgba(21, 41, 31, 0.08);
        }

        .marketing-metric-card strong {
          font-size: 26px;
          font-weight: 800;
          color: var(--brand);
        }

        .marketing-metric-card span {
          color: var(--text-muted);
          font-size: 14px;
        }

        .marketing-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 20px;
          min-height: 160px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: transform 0.15s, background 0.2s, border-color 0.2s, box-shadow 0.2s;
          box-shadow: 0 12px 24px rgba(21, 41, 31, 0.06);
        }

        .marketing-card:hover {
          transform: translateY(-2px);
          background: var(--bg-soft);
          border-color: rgba(21, 41, 31, 0.14);
          box-shadow: 0 18px 30px rgba(21, 41, 31, 0.12);
        }

        .marketing-card-featured {
          background: linear-gradient(150deg, rgba(21, 41, 31, 0.08), rgba(163, 177, 138, 0.2));
          border-color: rgba(21, 41, 31, 0.18);
        }

        .pricing-plan-card {
          position: relative;
          padding: 24px;
          gap: 16px;
        }

        .pricing-plan-card-featured {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 20px 36px rgba(21, 41, 31, 0.16);
          border-width: 1.5px;
        }

        .pricing-badge {
          position: absolute;
          top: 14px;
          right: 14px;
          background: linear-gradient(120deg, rgba(163, 177, 138, 0.18), rgba(21, 41, 31, 0.12));
          color: var(--text);
          border-radius: 999px;
          padding: 6px 12px;
          font-size: 12px;
          font-weight: 700;
          border: 1px solid rgba(21, 41, 31, 0.18);
        }

        .pricing-toggle {
          display: inline-flex;
          align-items: center;
          background: var(--bg-soft);
          border: 1px solid var(--border);
          border-radius: 999px;
          padding: 4px;
          gap: 6px;
          margin: 12px 0 22px;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4);
        }

        .pricing-toggle-option {
          border: none;
          background: transparent;
          padding: 8px 14px;
          border-radius: 999px;
          font-weight: 600;
          color: var(--text-muted);
          cursor: pointer;
          transition: background 0.2s, color 0.2s, box-shadow 0.2s;
        }

        .pricing-toggle-option.active {
          background: var(--card);
          color: var(--text);
          box-shadow: 0 10px 20px rgba(21, 41, 31, 0.08);
        }

        .pricing-toggle-badge {
          color: var(--brand);
          font-weight: 700;
          margin-left: 6px;
        }

        .pricing-addon-header {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .pricing-addon-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: var(--bg-soft);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          border: 1px solid var(--border);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4);
        }

        .marketing-card h3 {
          margin: 0;
          font-size: 18px;
          font-weight: 700;
          color: var(--text);
        }

        .marketing-card p {
          margin: 0;
          color: var(--text-muted);
          font-size: 15px;
          line-height: 1.6;
        }

        .marketing-price {
          font-size: 36px;
          font-weight: 800;
          color: var(--brand);
          margin: 0;
        }

        .marketing-note {
          color: var(--text-muted);
          font-size: 14px;
        }

        .marketing-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 10px;
          border-radius: 999px;
          background: rgba(163, 177, 138, 0.12);
          color: var(--brand);
          font-size: 12px;
          border: 1px solid var(--border);
          letter-spacing: 0.4px;
        }

        .marketing-highlight-card {
          position: relative;
          overflow: hidden;
          background: linear-gradient(140deg, rgba(21, 41, 31, 0.08), rgba(163, 177, 138, 0.16));
        }

        .marketing-highlight-card::before,
        .marketing-highlight-card::after {
          content: "";
          position: absolute;
          border-radius: 999px;
          filter: blur(22px);
        }

        .marketing-highlight-card::before {
          width: 180px;
          height: 180px;
          background: rgba(163, 177, 138, 0.28);
          top: -30px;
          right: -20px;
          animation: float1 6s ease-in-out infinite;
        }

        .marketing-highlight-card::after {
          width: 220px;
          height: 220px;
          background: rgba(21, 41, 31, 0.18);
          bottom: -40px;
          left: -20px;
          animation: float2 7s ease-in-out infinite;
        }

        @keyframes float1 {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(12px);
          }
        }

        @keyframes float2 {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .marketing-columns {
          display: grid;
          gap: 26px;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        }

        .marketing-columns-balanced {
          display: grid;
          gap: 32px;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        }

        .marketing-quote {
          font-size: 18px;
          line-height: 1.6;
          color: var(--text);
          margin: 0;
        }

        .marketing-quote cite {
          display: block;
          margin-top: 12px;
          font-style: normal;
          color: var(--text-muted);
          font-size: 14px;
        }

        .marketing-pill-list {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .marketing-pill {
          padding: 6px 12px;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: var(--bg-soft);
          font-size: 13px;
          color: var(--text-dim);
        }

        .marketing-table {
          width: 100%;
          border-collapse: collapse;
          border-radius: var(--radius);
          overflow: hidden;
          box-shadow: 0 12px 24px rgba(21, 41, 31, 0.06);
        }

        .marketing-table thead {
          background: var(--bg-soft);
        }

        .marketing-table th,
        .marketing-table td {
          padding: 16px 18px;
          text-align: left;
          border-bottom: 1px solid var(--border);
          color: var(--text-dim);
          position: relative;
          transition: background 0.2s ease, color 0.2s ease;
        }

        .marketing-table tbody tr:last-child td {
          border-bottom: none;
        }

        .marketing-table tbody tr:nth-child(even) {
          background: rgba(21, 41, 31, 0.04);
        }

        .marketing-table .is-hovered {
          background: rgba(163, 177, 138, 0.12);
          color: var(--text);
        }

        .pricing-resource-col {
          position: sticky;
          left: 0;
          background: var(--card);
          z-index: 2;
          font-weight: 700;
          box-shadow: 10px 0 16px rgba(21, 41, 31, 0.05);
        }

        .marketing-table tbody tr:nth-child(even) .pricing-resource-col {
          background: rgba(21, 41, 31, 0.04);
        }

        .pricing-unavailable span {
          color: var(--text-muted);
          font-weight: 700;
        }

        @media (max-width: 768px) {
          .marketing-table {
            display: block;
            overflow-x: auto;
            white-space: nowrap;
          }

          .pricing-resource-col {
            position: static;
            box-shadow: none;
          }
        }

        .marketing-tagline {
          font-size: 22px;
          font-weight: 700;
          color: var(--text);
          margin: 0;
        }

        .marketing-list {
          margin: 0;
          padding: 0;
          list-style: none;
          display: grid;
          gap: 12px;
        }

        .marketing-list li {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          color: var(--text-muted);
        }

        .marketing-list strong {
          color: var(--brand);
        }

        .marketing-footer {
          margin-top: auto;
          border-top: 1px solid var(--border);
          background: var(--bg-soft);
        }

        .marketing-footer-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 26px 0;
          color: var(--text-muted);
          font-size: 14px;
          flex-wrap: wrap;
        }

        .marketing-footer-links {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }

        .marketing-footer-links a:hover {
          color: var(--brand);
        }

        @media (max-width: 960px) {
          .marketing-nav {
            height: auto;
            padding: 14px 0;
          }

          .marketing-menu-toggle {
            display: inline-flex;
          }

          .marketing-menu {
            position: absolute;
            inset: calc(100% + 12px) 0 auto 0;
            padding: 16px;
            border-radius: 18px;
            background: rgba(255, 255, 255, 0.96);
            border: 1px solid var(--border);
            box-shadow: 0 22px 50px rgba(21, 41, 31, 0.16);
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
            opacity: 0;
            pointer-events: none;
            transform: translateY(-8px);
            transition: opacity 0.18s ease, transform 0.18s ease;
          }

          .marketing-menu[data-open='true'] {
            opacity: 1;
            pointer-events: auto;
            transform: translateY(0);
          }

          .marketing-menu__links {
            flex-direction: column;
            width: 100%;
          }

          .marketing-menu a {
            width: 100%;
          }

          .marketing-actions {
            width: 100%;
            flex-direction: column;
            align-items: stretch;
          }

          .marketing-cta,
          .marketing-cta-secondary {
            width: 100%;
          }

          :where(.dark) .marketing-menu {
            background: rgba(15, 23, 42, 0.95);
            border-color: rgba(148, 163, 184, 0.2);
            box-shadow: 0 24px 52px rgba(0, 0, 0, 0.4);
          }
        }

        @media (max-width: 768px) {
          .marketing-main {
            padding: 36px 0 60px;
            gap: 56px;
          }
        }
      `}</style>

      <div className="marketing-wrap">
        <header
          className="marketing-header"
          role="banner"
          data-scrolled={isScrolled ? 'true' : undefined}
        >
          <div className="marketing-container marketing-nav">
            <a
              href="/"
              className="marketing-logo"
              aria-label="MeuCondomínio — voltar ao início"
              onClick={(event) => handleNavigate(event, '/')}
            >
              <img src="/assets/branding/logo-meu-condominio.svg" alt="MeuCondomínio – gestão inteligente de condomínios" />
              <span className="marketing-logo__text">MeuCondomínio</span>
            </a>

            <nav
              className="marketing-menu"
              aria-label="Navegação principal"
              data-open={isMenuOpen ? 'true' : undefined}
            >
              <div className="marketing-menu__links">
                {NAVIGATION_LINKS.map((link) => {
                  const isActive = currentPath === link.href;

                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      data-active={isActive ? 'true' : undefined}
                      aria-current={isActive ? 'page' : undefined}
                      onClick={(event) => handleNavigate(event, link.href)}
                    >
                      {link.label}
                    </a>
                  );
                })}
              </div>

              <div className="marketing-actions">
                <a
                  href="/comece"
                  className="marketing-cta"
                  onClick={handlePrimaryCta}
                >
                  Começar agora
                </a>

                <a
                  href="/entrar"
                  className="marketing-cta-secondary"
                  onClick={handleLogin}
                >
                  Entrar
                </a>
              </div>
            </nav>

            <button
              type="button"
              className="marketing-menu-toggle"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
              onClick={() => setIsMenuOpen((prev) => !prev)}
              data-open={isMenuOpen ? 'true' : undefined}
            >
              <span className="marketing-menu-toggle__bar" aria-hidden />
            </button>
          </div>
        </header>

        <main className="marketing-main" role="main">
          <div className="marketing-container marketing-section">
            {children}
          </div>
        </main>

        <footer className="marketing-footer" role="contentinfo">
          <div className="marketing-container marketing-footer-content">
            <span>© {new Date().getFullYear()} MeuCondomínio. Todos os direitos reservados.</span>
            <div className="marketing-footer-links">
              <a href="/termos" onClick={(event) => handleNavigate(event, '/sobre')}>Termos</a>
              <a href="/privacidade" onClick={(event) => handleNavigate(event, '/sobre')}>Privacidade</a>
              <a href="/suporte" onClick={(event) => handleNavigate(event, '/suporte')}>Ajuda</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
