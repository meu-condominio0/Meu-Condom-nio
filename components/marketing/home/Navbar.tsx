import { LogIn, Home } from 'lucide-react';
import type { MarketingPageProps, MarketingPath } from '../MarketingLayout';

interface NavbarProps extends MarketingPageProps {
  currentPath: MarketingPath;
}

const NAV_ITEMS: Array<{ label: string; href: MarketingPath }> = [
  { label: 'Soluções', href: '/solucoes' },
  { label: 'Preços', href: '/precos' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Suporte', href: '/suporte' },
  { label: 'Blog', href: '/blog' },
  { label: 'Marketplace', href: '/marketplace' },
];

export function Navbar({ currentPath, onNavigate, onLogin }: NavbarProps) {
  const renderNavItem = (item: { label: string; href: MarketingPath }) => {
    const isActive = currentPath === item.href;

    return (
      <button
        key={item.href}
        type="button"
        onClick={() => onNavigate(item.href)}
        className={`rounded-full px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:underline hover:underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-500 focus-visible:outline-offset-2 ${
          isActive ? 'text-emerald-900 underline underline-offset-4' : ''
        }`}
        aria-current={isActive ? 'page' : undefined}
      >
        {item.label}
      </button>
    );
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="flex items-center gap-2 rounded-full px-2 py-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-500 focus-visible:outline-offset-2"
          >
            <div
              className="flex size-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"
              aria-hidden="true"
            >
              <Home className="size-5" aria-hidden="true" />
            </div>
            <span className="text-lg font-semibold text-slate-900">MeuCondomínio</span>
          </button>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
            {NAV_ITEMS.map(renderNavItem)}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onLogin}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-emerald-300 hover:text-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-500 focus-visible:outline-offset-2"
            >
              <LogIn className="size-4" aria-hidden="true" />
              Entrar
            </button>
          </div>
        </div>

        <nav className="flex items-center gap-3 overflow-x-auto md:hidden" aria-label="Principal móvel">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.href}
              type="button"
              onClick={() => onNavigate(item.href)}
              className={`whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:underline hover:underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-500 focus-visible:outline-offset-2 ${
                currentPath === item.href ? 'text-emerald-900 underline underline-offset-4' : ''
              }`}
              aria-current={currentPath === item.href ? 'page' : undefined}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
