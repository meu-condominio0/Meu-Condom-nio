import React, { useState } from 'react';
import { Button } from './ui/button';
import { Menu, X, LogIn } from 'lucide-react';
import { Logo } from './Logo';

interface HeaderProps {
  onNavigate?: (page: string) => void;
  onOpenLeadForm?: () => void;
}

export function Header({ onNavigate, onOpenLeadForm }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Soluções', page: 'solucoes' },
    { label: 'Preços', page: 'precos' },
    { label: 'Sobre', page: 'sobre' },
    { label: 'Suporte', page: 'suporte' },
    { label: 'Blog', page: 'blog' },
    { label: 'Marketplace', page: 'marketplace-moradores' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[var(--border-soft)]">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Logo onClick={() => onNavigate?.('home')} />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => onNavigate?.(item.page)}
                className="relative text-[var(--ink-body)] hover:text-[var(--brand-primary)] font-medium transition-all duration-200 group focus-visible:outline-2 focus-visible:outline-[var(--brand-primary)] focus-visible:outline-offset-2 rounded px-3 py-2 min-h-[48px] flex items-center"
              >
                <span className="relative">
                  {item.label}
                  <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-[var(--brand-primary)] transition-all duration-200 group-hover:w-full group-hover:left-0" />
                </span>
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Button
              onClick={() => window.open('#login', '_blank')}
              className="bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-600)] text-white flex items-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              Entrar
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[var(--ink-body)] hover:text-[var(--brand-primary)]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-6 border-t border-[var(--border-soft)]">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    onNavigate?.(item.page);
                    setMobileMenuOpen(false);
                  }}
                  className="text-[var(--ink-body)] hover:text-[var(--brand-primary)] font-medium transition-colors py-2 text-left"
                >
                  {item.label}
                </button>
              ))}
              <Button
                onClick={() => {
                  window.open('#login', '_blank');
                  setMobileMenuOpen(false);
                }}
                className="bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-600)] text-white flex items-center gap-2 mt-2"
              >
                <LogIn className="w-4 h-4" />
                Entrar
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
