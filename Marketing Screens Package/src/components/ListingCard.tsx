import React from 'react';
import { Badge } from './ui/badge';
import { Star, MapPin, Clock } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ListingCardProps {
  id: number;
  title: string;
  price: number;
  condition: 'Novo' | 'Usado';
  image: string;
  tower: string;
  unit?: string;
  rating?: number;
  timeAgo: string;
  onClick?: () => void;
}

export function ListingCard({
  title,
  price,
  condition,
  image,
  tower,
  unit,
  rating,
  timeAgo,
  onClick,
}: ListingCardProps) {
  return (
    <div
      onClick={onClick}
      className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-[var(--border-soft)] hover:border-[var(--brand-primary-600)] hover:shadow-[var(--shadow-lg)] transition-all duration-200 cursor-pointer"
    >
      <div className="aspect-square overflow-hidden bg-[var(--bg-soft)] relative">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <Badge
            variant="secondary"
            className={`${
              condition === 'Novo'
                ? 'bg-[var(--brand-accent)]/90 text-white'
                : 'bg-white/90 text-[var(--ink-title)]'
            } backdrop-blur-sm border-0`}
          >
            {condition}
          </Badge>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-2">
        <h4 className="text-lg line-clamp-2 min-h-[56px]">{title}</h4>

        <div className="text-2xl font-bold text-[var(--brand-primary)]">
          R$ {price.toFixed(2).replace('.', ',')}
        </div>

        <div className="flex items-center gap-2 text-sm text-[var(--ink-muted)]">
          <MapPin className="w-4 h-4" />
          <span>
            Torre {tower}
            {unit && ` · Unidade ${unit}`}
          </span>
        </div>

        {rating && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-[var(--brand-accent)] text-[var(--brand-accent)]" />
              <span className="font-bold text-sm">{rating.toFixed(1)}</span>
            </div>
            <span className="text-xs text-[var(--ink-muted)]">vendedor</span>
          </div>
        )}

        <div className="flex items-center gap-1 text-xs text-[var(--ink-muted)] mt-1">
          <Clock className="w-3 h-3" />
          <span>{timeAgo}</span>
        </div>

        <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-2 w-full py-2 px-4 rounded-lg bg-[var(--brand-primary)] text-white font-bold hover:bg-[var(--brand-primary-600)]">
          Ver detalhes
        </button>
      </div>
    </div>
  );
}
