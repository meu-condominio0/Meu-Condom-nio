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
          --bg: #ffffff;
          --bg-soft: #f6f7f8;
          --card: #ffffff;
          --card-soft: rgba(15, 61, 46, 0.04);
          --text: #111111;
          --text-dim: #374151;
          --text-muted: #6b7280;
          --brand: #0f3d2e;
          --brand-2: #20c997;
          --accent: #20c997;
          --muted: rgba(15, 61, 46, 0.08);
          --border: rgba(17, 17, 17, 0.08);
          --shadow: 0 18px 35px rgba(15, 61, 46, 0.12);
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
            radial-gradient(1200px 800px at -10% 0%, rgba(32, 201, 151, 0.08), transparent 60%),
            radial-gradient(900px 600px at 110% 0%, rgba(15, 61, 46, 0.08), transparent 55%),
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
          backdrop-filter: saturate(160%) blur(12px);
          background: rgba(255, 255, 255, 0.92);
          border-bottom: 1px solid var(--border);
          box-shadow: 0 12px 30px rgba(15, 61, 46, 0.08);
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
          background: linear-gradient(90deg, var(--brand) 0%, var(--brand-2) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .marketing-logo::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, transparent 0%, rgba(32, 201, 151, 0.05) 35%, rgba(32, 201, 151, 0.4) 50%, rgba(32, 201, 151, 0.05) 65%, transparent 100%);
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
          background: rgba(32, 201, 151, 0.12);
          color: var(--brand);
        }

        .marketing-menu a:hover {
          background: rgba(32, 201, 151, 0.1);
          color: var(--brand);
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
          box-shadow: 0 12px 24px rgba(15, 61, 46, 0.12);
        }

        .marketing-hero-actions a:hover {
          transform: translateY(-1px);
          box-shadow: 0 16px 32px rgba(15, 61, 46, 0.18);
        }

        .marketing-hero-actions a.secondary:hover {
          background: rgba(32, 201, 151, 0.12);
          color: var(--brand);
        }

        .marketing-cta,
        .marketing-cta-secondary {
          padding: 10px 16px;
          border-radius: 14px;
          border: 1px solid transparent;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: var(--shadow);
          transition: transform 0.15s, box-shadow 0.15s, background 0.2s, color 0.2s, border-color 0.2s;
        }

        .marketing-cta {
          background: var(--brand);
          color: #ffffff;
          border-color: var(--brand);
        }

        .marketing-cta-secondary {
          background: #ffffff;
          color: var(--brand);
          border-color: var(--brand);
        }

        .marketing-cta:hover,
        .marketing-cta-secondary:hover {
          transform: translateY(-1px);
          box-shadow: 0 16px 28px rgba(15, 61, 46, 0.16);
        }

        .marketing-cta-secondary:hover {
          background: rgba(32, 201, 151, 0.12);
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
          box-shadow: 0 10px 20px rgba(15, 61, 46, 0.08);
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
          box-shadow: 0 12px 24px rgba(15, 61, 46, 0.06);
        }

        .marketing-card:hover {
          transform: translateY(-2px);
          background: var(--bg-soft);
          border-color: rgba(15, 61, 46, 0.14);
          box-shadow: 0 18px 30px rgba(15, 61, 46, 0.12);
        }

        .marketing-card-featured {
          background: linear-gradient(140deg, rgba(15, 61, 46, 0.08), rgba(32, 201, 151, 0.12));
          border-color: rgba(15, 61, 46, 0.16);
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
          background: rgba(32, 201, 151, 0.12);
          color: var(--brand);
          font-size: 12px;
          border: 1px solid var(--border);
          letter-spacing: 0.4px;
        }

        .marketing-highlight-card {
          position: relative;
          overflow: hidden;
          background: linear-gradient(140deg, rgba(15, 61, 46, 0.08), rgba(32, 201, 151, 0.16));
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
          background: rgba(32, 201, 151, 0.28);
          top: -30px;
          right: -20px;
          animation: float1 6s ease-in-out infinite;
        }

        .marketing-highlight-card::after {
          width: 220px;
          height: 220px;
          background: rgba(15, 61, 46, 0.18);
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
          box-shadow: 0 12px 24px rgba(15, 61, 46, 0.06);
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
        }

        .marketing-table tbody tr:last-child td {
          border-bottom: none;
        }

        .marketing-table tbody tr:nth-child(even) {
          background: rgba(15, 61, 46, 0.04);
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
