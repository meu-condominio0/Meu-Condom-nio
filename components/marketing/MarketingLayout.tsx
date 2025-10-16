import type { MouseEvent, ReactNode } from 'react';

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
  const handleNavigate = (event: MouseEvent<HTMLAnchorElement>, path: MarketingPath) => {
    event.preventDefault();
    if (currentPath === path) {
      return;
    }

    onNavigate(path);
  };

  const handleLogin = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onLogin();
  };

  const handlePrimaryCta = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onNavigate('/comece');
  };

  return (
    <>
      <style>{`
        :root {
          --bg: #0b1020;
          --bg-soft: #111734;
          --card: #101633;
          --card-soft: rgba(16, 22, 51, 0.72);
          --text: #e6ecff;
          --text-dim: #b6c2ff;
          --text-muted: rgba(230, 236, 255, 0.68);
          --brand: #6aa7ff;
          --brand-2: #5ef1c2;
          --accent: #9b8cff;
          --muted: rgba(255, 255, 255, 0.08);
          --border: rgba(255, 255, 255, 0.12);
          --shadow: 0 18px 50px rgba(6, 10, 24, 0.55);
          --radius: 18px;
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
            radial-gradient(1200px 800px at 10% -10%, rgba(106, 167, 255, 0.18), transparent 55%),
            radial-gradient(900px 600px at 110% 10%, rgba(94, 241, 194, 0.12), transparent 40%),
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
          backdrop-filter: saturate(160%) blur(10px);
          background: rgba(11, 16, 32, 0.55);
          border-bottom: 1px solid var(--border);
        }

        .marketing-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          height: 72px;
        }

        .marketing-logo {
          font-size: 20px;
          font-weight: 800;
          letter-spacing: 0.2px;
          position: relative;
          display: inline-block;
          background: linear-gradient(90deg, #fff 0%, #d8e4ff 50%, #fff 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .marketing-logo::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, transparent 0%, rgba(255, 255, 255, 0) 35%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 65%, transparent 100%);
          transform: translateX(-120%);
          animation: shine 3.2s linear infinite;
          mix-blend-mode: screen;
        }

        @keyframes shine {
          0% {
            transform: translateX(-120%);
          }
          60%,
          100% {
            transform: translateX(120%);
          }
        }

        .marketing-menu {
          display: flex;
          gap: 14px;
          align-items: center;
          flex-wrap: wrap;
        }

        .marketing-menu a {
          padding: 8px 12px;
          border-radius: 12px;
          color: var(--text-dim);
          transition: transform 0.15s, background 0.15s, color 0.15s;
        }

        .marketing-menu a[data-active="true"] {
          background: rgba(106, 167, 255, 0.14);
          color: #fff;
        }

        .marketing-menu a:hover {
          background: var(--muted);
          color: #fff;
          transform: translateY(-1px);
        }

        .marketing-actions {
          display: flex;
          gap: 12px;
          align-items: center;
          flex-wrap: wrap;
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
          border: 1px solid var(--border);
          font-weight: 700;
          letter-spacing: 0.2px;
          cursor: pointer;
          transition: transform 0.15s, box-shadow 0.15s, background 0.2s;
          box-shadow: var(--shadow);
          background: linear-gradient(180deg, rgba(94, 241, 194, 0.2), rgba(94, 241, 194, 0.06));
          color: #05142e;
        }

        .marketing-hero-actions a.secondary {
          background: linear-gradient(180deg, rgba(155, 140, 255, 0.16), rgba(155, 140, 255, 0.06));
          color: #fff;
        }

        .marketing-hero-actions a:hover {
          transform: translateY(-1px) scale(1.01);
          box-shadow: 0 22px 40px rgba(35, 54, 104, 0.35);
        }

        .marketing-cta,
        .marketing-cta-secondary {
          padding: 10px 16px;
          border-radius: 14px;
          border: 1px solid var(--border);
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: var(--shadow);
          transition: transform 0.15s, box-shadow 0.15s, background 0.2s;
        }

        .marketing-cta {
          background: linear-gradient(180deg, rgba(106, 167, 255, 0.18), rgba(106, 167, 255, 0.06));
          color: #fff;
        }

        .marketing-cta-secondary {
          background: linear-gradient(180deg, rgba(94, 241, 194, 0.18), rgba(94, 241, 194, 0.06));
          color: #04142d;
        }

        .marketing-cta:hover,
        .marketing-cta-secondary:hover {
          transform: translateY(-1px) scale(1.01);
          box-shadow: 0 20px 40px rgba(28, 47, 100, 0.35);
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
          background: rgba(255, 255, 255, 0.04);
          color: var(--text-dim);
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
          background: linear-gradient(180deg, #ffffff 0%, #dfe7ff 100%);
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
        }

        .marketing-metric-card strong {
          font-size: 26px;
          font-weight: 800;
          color: #fff;
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
          transition: transform 0.15s, background 0.2s, border-color 0.2s;
        }

        .marketing-card:hover {
          transform: translateY(-2px);
          background: var(--card-soft);
          border-color: rgba(255, 255, 255, 0.18);
        }

        .marketing-card-featured {
          background: linear-gradient(160deg, rgba(106, 167, 255, 0.2), rgba(94, 241, 194, 0.12));
          border-color: rgba(106, 167, 255, 0.45);
        }

        .marketing-card h3 {
          margin: 0;
          font-size: 18px;
          font-weight: 700;
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
          color: #fff;
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
          background: rgba(106, 167, 255, 0.12);
          color: #dfe9ff;
          font-size: 12px;
          border: 1px solid var(--border);
          letter-spacing: 0.4px;
        }

        .marketing-highlight-card {
          position: relative;
          overflow: hidden;
          background: linear-gradient(140deg, rgba(106, 167, 255, 0.16), rgba(94, 241, 194, 0.12));
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
          background: rgba(106, 167, 255, 0.38);
          top: -30px;
          right: -20px;
          animation: float1 6s ease-in-out infinite;
        }

        .marketing-highlight-card::after {
          width: 220px;
          height: 220px;
          background: rgba(94, 241, 194, 0.32);
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
          color: #fff;
          margin: 0;
        }

        .marketing-quote cite {
          display: block;
          margin-top: 12px;
          font-style: normal;
          color: var(--text-dim);
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
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: rgba(255, 255, 255, 0.04);
          font-size: 13px;
          color: var(--text-muted);
        }

        .marketing-table {
          width: 100%;
          border-collapse: collapse;
          border-radius: var(--radius);
          overflow: hidden;
        }

        .marketing-table thead {
          background: rgba(255, 255, 255, 0.05);
        }

        .marketing-table th,
        .marketing-table td {
          padding: 16px 18px;
          text-align: left;
          border-bottom: 1px solid var(--border);
        }

        .marketing-table tbody tr:last-child td {
          border-bottom: none;
        }

        .marketing-table th {
          font-weight: 600;
          color: #fff;
        }

        .marketing-table td {
          color: var(--text-muted);
        }

        .marketing-tagline {
          font-size: 22px;
          font-weight: 700;
          color: #fff;
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
          color: #fff;
        }

        .marketing-footer {
          margin-top: auto;
          border-top: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.03);
        }

        .marketing-footer-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 26px 0;
          color: var(--text-dim);
          font-size: 14px;
          flex-wrap: wrap;
        }

        .marketing-footer-links {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }

        .marketing-footer-links a:hover {
          color: #fff;
        }

        @media (max-width: 960px) {
          .marketing-nav {
            flex-direction: column;
            align-items: flex-start;
            height: auto;
            padding: 18px 0;
          }

          .marketing-actions {
            width: 100%;
            justify-content: flex-start;
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
        <header className="marketing-header" role="banner">
          <div className="marketing-container marketing-nav">
            <a
              href="/"
              className="marketing-logo"
              aria-label="MeuCondomínio — voltar ao início"
              onClick={(event) => handleNavigate(event, '/')}
            >
              MeuCondomínio
            </a>

            <nav className="marketing-menu" aria-label="Navegação principal">
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
            </nav>

            <div className="marketing-actions">
              <a
                href="/comece"
                className="marketing-cta-secondary"
                onClick={handlePrimaryCta}
              >
                Começar agora
              </a>

              <a
                href="/entrar"
                className="marketing-cta"
                onClick={handleLogin}
              >
                Entrar
              </a>
            </div>
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
