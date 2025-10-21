import React, { useMemo, useState } from 'react';
import { LogIn, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { LogoShimmer } from './Logo';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  onNavigate?: (page: string) => void;
  currentPage?: string;
}

const NAV_ITEMS = [
  { label: 'Soluções', page: 'solucoes' },
  { label: 'Preços', page: 'precos' },
  { label: 'Sobre', page: 'sobre' },
  { label: 'Suporte', page: 'suporte' },
  { label: 'Blog', page: 'blog' },
  { label: 'Marketplace', page: 'marketplace-moradores' },
] as const;

const normalizeActivePage = (page?: string) => {
  if (!page) return undefined;
  if (page.startsWith('marketplace')) {
    return 'marketplace-moradores';
  }
  return page;
};

export function Header({ onNavigate, currentPage }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activePage = useMemo(() => normalizeActivePage(currentPage), [currentPage]);
  const isLogin = activePage === 'login';

  const handleNavigate = (page: string) => {
    onNavigate?.(page);
    setMobileMenuOpen(false);
  };

  const handleLoginNavigate = () => {
    if (isLogin) return;

    const hasNavigateHandler = Boolean(onNavigate);
    handleNavigate('login');

    if (!hasNavigateHandler && typeof window !== 'undefined') {
      window.location.assign('/login');
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border-soft)] bg-[var(--surface)]/95 text-[var(--text-body)] backdrop-blur-xl shadow-e2 transition-colors duration-200">
      <div className="container-custom">
        <div className="flex items-center justify-between gap-4 py-4">
          <LogoShimmer onClick={() => handleNavigate('home')} />

          <nav className="hidden items-center gap-6 text-sm lg:flex" aria-label="Navegação principal">
            {NAV_ITEMS.map((item) => {
              const isActive = activePage === item.page;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleNavigate(item.page)}
                  className={`group relative min-h-[48px] rounded-xl px-3 py-2 font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 ${
                    isActive
                      ? 'bg-brand-900/5 text-[var(--text-title)]'
                      : 'text-[var(--text-body)] hover:text-brand-900'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span>{item.label}</span>
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute -bottom-1 left-1/2 h-[2px] w-0 rounded-full bg-brand-900 transition-all duration-200 ease-out group-hover:left-0 group-hover:w-full ${
                      isActive ? 'left-0 w-full' : ''
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <ThemeToggle />
            <Button
              type="button"
              aria-label="Entrar"
              onClick={handleLoginNavigate}
              disabled={isLogin}
              data-href="/login"
              className="inline-flex min-h-[48px] min-w-[128px] items-center justify-center gap-2 rounded-[16px] bg-[#0F3D2E] px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#145943] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#20C997] focus-visible:ring-offset-2 active:ring-2 active:ring-[#145943] active:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <LogIn aria-hidden className="h-4 w-4" />
              <span>Entrar</span>
            </Button>
          </div>

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="inline-flex items-center justify-center rounded-xl p-2 text-[var(--text-title)] transition-colors duration-200 hover:bg-[var(--surface-soft)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 lg:hidden"
          >
            {mobileMenuOpen ? (
              <X aria-hidden focusable="false" className="h-6 w-6" />
            ) : (
              <Menu aria-hidden focusable="false" className="h-6 w-6" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden">
            <div className="flex flex-col gap-4 border-t border-[var(--border-soft)] py-6">
              <ThemeToggle />
              {NAV_ITEMS.map((item) => {
                const isActive = activePage === item.page;
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => handleNavigate(item.page)}
                    className={`rounded-xl px-3 py-2 text-left text-base transition-colors duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 ${
                      isActive
                        ? 'bg-brand-900/5 text-[var(--text-title)]'
                        : 'text-[var(--text-body)] hover:bg-[var(--surface-soft)]'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </button>
                );
              })}
              <Button
                type="button"
                onClick={handleLoginNavigate}
                disabled={isLogin}
                data-href="/login"
                className="h-12 min-h-[48px] rounded-[16px] bg-[#0F3D2E] text-white transition-colors duration-200 hover:bg-[#145943] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#20C997] focus-visible:ring-offset-2 active:ring-2 active:ring-[#145943] active:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Entrar
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
