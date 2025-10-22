import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const nextTheme = theme === 'dark' ? 'light' : 'dark';

  return (
    <button
      type="button"
      aria-label={`Ativar tema ${nextTheme === 'dark' ? 'escuro' : 'claro'}`}
      onClick={() => setTheme(nextTheme)}
      className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-soft)] px-4 py-2 text-sm
                 bg-[var(--surface)] text-[var(--text-title)] transition-colors duration-200
                 hover:bg-[var(--surface-soft)] focus-visible:outline-none focus-visible:ring-4
                 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
    >
      {theme === 'dark' ? '☀️ Claro' : '🌙 Escuro'}
    </button>
  );
}
