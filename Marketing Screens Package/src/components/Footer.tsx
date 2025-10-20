import React from 'react';
import { Home, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const footerLinks = {
    solutions: {
      title: 'Soluções',
      links: [
        { label: 'Condomínios', page: 'solucoes' },
        { label: 'Síndicos', page: 'solucoes' },
        { label: 'Planos', page: 'precos' },
      ],
    },
    resources: {
      title: 'Recursos',
      links: [
        { label: 'Central de ajuda', page: 'suporte' },
        { label: 'Blog', page: 'blog' },
        { label: 'Materiais', page: 'blog' },
        { label: 'Guia do Síndico', page: 'blog' },
      ],
    },
    company: {
      title: 'Empresa',
      links: [
        { label: 'Sobre', page: 'sobre' },
        { label: 'Carreiras', page: 'sobre' },
        { label: 'Termos', page: 'sobre' },
        { label: 'Privacidade', page: 'sobre' },
      ],
    },
    offices: {
      title: 'Escritórios',
      links: [
        { label: 'Brasil', page: null, subtitle: 'São Paulo, SP' },
        { label: 'Estados Unidos', page: null, subtitle: 'Miami, FL' },
      ],
    },
  };

  return (
    <footer className="bg-[var(--bg-soft)] border-t border-[var(--border-soft)] mt-24">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h4 className="mb-6 text-[var(--ink-title)]">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.page ? (
                      <button
                        onClick={() => onNavigate?.(link.page)}
                        className="text-[var(--ink-body)] hover:text-[var(--brand-primary)] transition-colors block text-left"
                      >
                        {link.label}
                        {'subtitle' in link && (
                          <span className="block text-sm text-[var(--ink-muted)] mt-1">{link.subtitle}</span>
                        )}
                      </button>
                    ) : (
                      <div className="text-[var(--ink-body)]">
                        {link.label}
                        {'subtitle' in link && (
                          <span className="block text-sm text-[var(--ink-muted)] mt-1">{link.subtitle}</span>
                        )}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-[var(--border-soft)]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-accent)] flex items-center justify-center">
                <Home className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-bold text-[var(--ink-title)]">MeuCondomínio</span>
            </div>
            <p className="text-sm text-[var(--ink-muted)]">
              © 2025 MeuCondomínio. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
