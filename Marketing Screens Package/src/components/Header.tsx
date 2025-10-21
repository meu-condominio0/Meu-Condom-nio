import React, { useMemo, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import Logo from './Logo';
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

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border-soft)] bg-[var(--surface)]/95 text-[var(--text-body)] backdrop-blur-xl shadow-e2 transition-colors duration-200">
      <div className="container-custom">
        <div className="flex items-center justify-between gap-4 py-4">
          <Logo onClick={() => handleNavigate('home')} />

          <nav className="hidden lg:flex items-center gap-6 text-sm" aria-label="Navegação principal">
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
              onClick={() => handleNavigate('login')}
              disabled={isLogin}
              className="min-w-[128px] rounded-xl bg-brand-900 text-white transition-colors duration-200 hover:bg-brand-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 disabled:cursor-not-allowed"
            >
              Entrar
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
                onClick={() => handleNavigate('login')}
                disabled={isLogin}
                className="h-12 rounded-xl bg-brand-900 text-white hover:bg-brand-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 disabled:cursor-not-allowed"
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
