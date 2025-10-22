import { memo } from 'react';
import { HomeIcon, CalendarIcon, MessageIcon, ProfileIcon } from './icons';

interface BottomNavProps {
  active?: 'home' | 'reservations' | 'messages' | 'profile';
}

const items = [
  { id: 'home', label: 'Home', icon: HomeIcon },
  { id: 'reservations', label: 'Reservas', icon: CalendarIcon },
  { id: 'messages', label: 'Mensagens', icon: MessageIcon },
  { id: 'profile', label: 'Perfil', icon: ProfileIcon },
] as const;

export const BottomNav = memo(function BottomNav({ active = 'home' }: BottomNavProps) {
  return (
    <nav
      aria-label="Navegação principal"
      className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around bg-primary/95 px-4 py-3 text-white shadow-[0_-4px_24px_rgba(0,0,0,0.45)] sm:hidden"
    >
      {items.map(({ id, label, icon: Icon }) => {
        const isActive = id === active;
        return (
          <button
            key={id}
            type="button"
            className={`flex flex-col items-center gap-1 text-xs transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light focus-visible:ring-offset-2 focus-visible:ring-offset-primary ${
              isActive ? 'text-brand-light' : 'text-white/80 hover:text-brand-light'
            }`}
            aria-current={isActive ? 'page' : undefined}
          >
            <Icon className="h-6 w-6" />
            <span>{label}</span>
          </button>
        );
      })}
    </nav>
  );
});
