import { Sun, Moon } from 'lucide-react';
import { Button } from './ui/button';
import { usarContextoApp } from '../contexts/AppContext';

export function ToggleTema() {
  const { temaDark, alternarTema } = usarContextoApp();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={alternarTema}
      className="h-9 w-9"
      aria-label={temaDark ? 'Alternar para modo claro' : 'Alternar para modo escuro'}
    >
      {temaDark ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </Button>
  );
}