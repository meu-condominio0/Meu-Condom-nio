import React from 'react';
import { Star, Shield } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface AppCardProps {
  name: string;
  description: string;
  rating: number;
  isOfficial?: boolean;
  category: string;
  onInstall?: () => void;
}

export function AppCard({ name, description, rating, isOfficial, category, onInstall }: AppCardProps) {
  return (
    <div className="flex flex-col gap-4 p-6 rounded-2xl bg-white border border-[var(--border-soft)] hover:shadow-[var(--shadow-md)] transition-all duration-200">
      <div className="flex items-start gap-3">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-accent)] flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-xl">{name.charAt(0)}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="truncate text-lg">{name}</h4>
            {isOfficial && (
              <Badge variant="secondary" className="bg-[var(--brand-accent)]/10 text-[var(--brand-accent)] border-0 flex items-center gap-1">
                <Shield className="w-3 h-3" />
                Oficial
              </Badge>
            )}
          </div>
          <caption className="text-[var(--ink-muted)]">{category}</caption>
        </div>
      </div>
      
      <p className="text-sm text-[var(--ink-body)] line-clamp-2">{description}</p>
      
      <div className="flex items-center justify-between pt-2 border-t border-[var(--border-soft)]">
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 fill-[var(--brand-accent)] text-[var(--brand-accent)]" />
          <span className="font-bold text-sm">{rating.toFixed(1)}</span>
        </div>
        <Button
          onClick={onInstall}
          variant="outline"
          size="sm"
          className="border-[var(--brand-primary)] text-[var(--brand-primary)] hover:bg-[var(--brand-primary)] hover:text-white"
        >
          Instalar
        </Button>
      </div>
    </div>
  );
}
