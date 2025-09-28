import { Sun, Moon } from 'lucide-react';
import { Button } from './ui/button';
import { usarContextoApp } from '../contexts/AppContext';

export function ToggleTema() {
  const { temaDark, alternarTema } = usarContextoApp();

  return (
    <Button
      variant="ghost"
      onClick={alternarTema}
      className="tap-target h-11 w-11 rounded-full"
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