import { FormEvent } from 'react';
import Logo from '../../components/Logo';
import ThemeToggle from '../../components/ThemeToggle';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

interface LoginProps {
  onNavigateHome?: () => void;
}

export default function Login({ onNavigateHome }: LoginProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--bg)] px-4 py-8 text-[var(--text-body)]">
      <section className="w-full max-w-md rounded-xl border border-[var(--border-soft)] bg-[var(--surface)] p-8 shadow-e4">
        <header className="mb-6 flex items-center justify-between gap-4">
          <Logo onClick={onNavigateHome} />
          <ThemeToggle />
        </header>

        <h1 className="mb-2 text-2xl font-semibold text-[var(--text-title)]">Entrar</h1>
        <p className="mb-6 text-sm text-[var(--text-muted)]">Acesse sua conta do MeuCondomínio.</p>

        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <label className="text-sm font-medium text-[var(--text-title)]" htmlFor="email">
              E-mail
            </label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              required
              placeholder="seu@email.com"
              className="h-12 rounded-xl border border-[var(--border-soft)] bg-[var(--surface)] px-4 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium text-[var(--text-title)]" htmlFor="password">
              Senha
            </label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="••••••••"
              className="h-12 rounded-xl border border-[var(--border-soft)] bg-[var(--surface)] px-4 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
            />
          </div>

          <Button
            type="submit"
            className="mt-2 h-12 rounded-xl bg-brand-900 text-white hover:bg-brand-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
          >
            Entrar
          </Button>
        </form>

        <div className="mt-6 text-center">
          <a href="#" className="text-sm text-brand-900 hover:underline">
            Esqueci minha senha
          </a>
        </div>
      </section>
    </main>
  );
}
