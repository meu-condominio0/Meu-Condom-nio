import { Building2, LogIn } from 'lucide-react';
import type { MarketingPageProps, MarketingPath } from '../MarketingLayout';

const NAVIGATION_LINKS: Array<{ label: string; href: MarketingPath }> = [
  { label: 'Soluções', href: '/solucoes' },
  { label: 'Preços', href: '/precos' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Suporte', href: '/suporte' },
  { label: 'Blog', href: '/blog' },
  { label: 'Marketplace', href: '/marketplace' },
];

interface NavbarProps extends MarketingPageProps {
  currentPath: MarketingPath;
}

export function Navbar({ currentPath, onLogin, onNavigate }: NavbarProps) {
  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b border-[#E5E7EB] bg-white/95 shadow-sm backdrop-blur"
      role="banner"
    >
      <div className="mx-auto max-w-[1280px] px-4 py-2 md:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <a
            href="/"
            onClick={(event) => {
              event.preventDefault();
              onNavigate('/');
            }}
            className="flex items-center gap-3 text-lg font-semibold tracking-tight text-[#0B0F12] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
          >
            <span className="flex size-10 items-center justify-center rounded-full bg-[#E6F6EF] text-[#0F3D2E]" aria-hidden="true">
              <Building2 className="size-5" strokeWidth={1.75} />
            </span>
            <span>MeuCondomínio</span>
          </a>

          <nav aria-label="Menu principal" className="hidden items-center gap-1 text-sm font-medium text-slate-700 lg:flex">
            {NAVIGATION_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(event) => {
                  event.preventDefault();
                  onNavigate(link.href);
                }}
                className="rounded-full px-4 py-2 transition hover:text-slate-900 hover:underline hover:underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
                aria-current={currentPath === link.href ? 'page' : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={onLogin}
            className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-5 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 hover:text-slate-900 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
          >
            <LogIn className="size-4" strokeWidth={1.75} aria-hidden="true" />
            Entrar
          </button>
        </div>

        <nav
          aria-label="Menu principal compacto"
          className="mt-2 flex items-center gap-2 overflow-x-auto text-sm font-medium text-slate-700 lg:hidden"
        >
          {NAVIGATION_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(event) => {
                event.preventDefault();
                onNavigate(link.href);
              }}
              className="rounded-full px-3 py-2 transition hover:text-slate-900 hover:underline hover:underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
              aria-current={currentPath === link.href ? 'page' : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
