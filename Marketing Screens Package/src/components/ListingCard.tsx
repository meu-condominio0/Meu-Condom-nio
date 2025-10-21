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
      className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] transition-all duration-200 hover:border-brand-800 hover:shadow-e4"
    >
      <div className="relative aspect-square overflow-hidden bg-[var(--surface-soft)]">
        <ImageWithFallback
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute right-3 top-3">
          <Badge
            variant="secondary"
            className={`${
              condition === 'Novo'
                ? 'bg-brand-accent/90 text-white'
                : 'bg-[var(--surface)]/90 text-[var(--text-title)]'
            } border-0 backdrop-blur-sm`}
          >
            {condition}
          </Badge>
        </div>
      </div>

      <div className="flex flex-col gap-2 p-4">
        <h4 className="min-h-[56px] text-lg line-clamp-2">{title}</h4>

        <div className="text-2xl font-bold text-brand-900">
          R$ {price.toFixed(2).replace('.', ',')}
        </div>

        <div className="flex items-center gap-2 text-sm text-[var(--ink-muted)]">
          <MapPin aria-hidden="true" className="h-4 w-4" focusable="false" />
          <span>
            Torre {tower}
            {unit && ` · Unidade ${unit}`}
          </span>
        </div>

        {rating && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star aria-hidden="true" className="h-4 w-4 fill-brand-accent text-brand-accent" focusable="false" />
              <span className="text-sm font-bold">{rating.toFixed(1)}</span>
            </div>
            <span className="text-xs text-[var(--ink-muted)]">vendedor</span>
          </div>
        )}

        <div className="mt-1 flex items-center gap-1 text-xs text-[var(--ink-muted)]">
          <Clock aria-hidden="true" className="h-3 w-3" focusable="false" />
          <span>{timeAgo}</span>
        </div>

        <button className="mt-2 w-full rounded-lg bg-brand-900 px-4 py-2 font-bold text-white opacity-0 transition-opacity duration-200 hover:bg-brand-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-accent focus-visible:ring-offset-2 group-hover:opacity-100">
          Ver detalhes
        </button>
      </div>
    </div>
  );
}
