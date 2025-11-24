import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';
import { Toaster } from '../ui/sonner';

interface AppLayoutProps {
  children: ReactNode;
}

// Layout que aplica o ThemeProvider apenas nas áreas autenticadas/"entrar"
export function AppLayout({ children }: AppLayoutProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      storageKey="meucondominio-theme"
    >
      <div className="app-shell min-h-screen bg-background text-foreground">
        {children}
        <Toaster richColors position="top-center" />
      </div>
    </ThemeProvider>
  );
}

export default AppLayout;
