import { useEffect, useMemo, useState } from 'react';
import { useTheme } from 'next-themes';
import { MoonStar, Sun } from 'lucide-react';
import clsx from 'clsx';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const effectiveTheme = useMemo(() => {
    if (theme === 'system') {
      return resolvedTheme ?? 'light';
    }

    return theme ?? 'light';
  }, [resolvedTheme, theme]);

  const isDark = effectiveTheme === 'dark';

  const handleToggle = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={clsx('home-theme-toggle', className)}
      aria-label={isDark ? 'Ativar tema claro' : 'Ativar tema escuro'}
      aria-pressed={isDark}
    >
      <span className="home-theme-toggle__icon" aria-hidden="true">
        {mounted ? (
          isDark ? <Sun strokeWidth={1.75} /> : <MoonStar strokeWidth={1.75} />
        ) : (
          <MoonStar strokeWidth={1.75} />
        )}
      </span>
      <span className="home-theme-toggle__label">
        {mounted ? (isDark ? 'Modo claro' : 'Modo escuro') : 'Alternar tema'}
      </span>
    </button>
  );
}

export default ThemeToggle;
