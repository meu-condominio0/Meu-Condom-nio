import { Home } from 'lucide-react';

const COLUMNS = [
  {
    title: 'Soluções',
    links: ['Condomínios', 'Síndicos', 'Planos'],
  },
  {
    title: 'Recursos',
    links: ['Central de ajuda', 'Blog', 'Materiais', 'Guia do Síndico'],
  },
  {
    title: 'Empresa',
    links: ['Sobre', 'Carreiras', 'Termos', 'Privacidade'],
  },
  {
    title: 'Escritórios',
    links: ['Brasil — São Paulo, SP', 'Estados Unidos — Miami, FL'],
  },
];

export function FooterSection() {
  return (
    <footer className="mt-20 bg-slate-900 text-slate-100" aria-labelledby="footer-heading">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h2 id="footer-heading" className="sr-only">
          Rodapé MeuCondomínio
        </h2>
        <div className="grid gap-10 md:grid-cols-4">
          {COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-300">{column.title}</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                {column.links.map((link) => (
                  <li key={link}>
                    <button
                      type="button"
                      className="text-left text-sm text-slate-300 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400 focus-visible:outline-offset-2"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-8 text-sm text-slate-400 md:flex-row md:items-center">
          <div className="flex items-center gap-3 text-white">
            <span className="flex size-9 items-center justify-center rounded-full bg-emerald-500 text-white" aria-hidden="true">
              <Home className="size-5" aria-hidden="true" />
            </span>
            <span className="text-base font-semibold">MeuCondomínio</span>
          </div>
          <p>© 2025 MeuCondomínio. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
