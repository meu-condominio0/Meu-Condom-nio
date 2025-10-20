import React from 'react';
import { Home } from 'lucide-react';

interface LogoProps {
  onClick?: () => void;
}

export function Logo({ onClick }: LogoProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 hover:opacity-80 transition-opacity relative group"
    >
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-accent)] flex items-center justify-center">
        <Home className="w-6 h-6 text-white" strokeWidth={2.5} />
      </div>
      
      <span className="font-bold text-xl text-[var(--ink-title)] relative overflow-hidden">
        <span className="relative inline-block">
          MeuCondomínio
          {/* Shimmer overlay */}
          <span className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        </span>
      </span>
    </button>
  );
}
