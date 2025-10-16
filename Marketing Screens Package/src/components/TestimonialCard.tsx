import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  rating: number;
  avatar?: string;
}

export function TestimonialCard({ quote, name, role, rating, avatar }: TestimonialCardProps) {
  return (
    <div className="flex flex-col gap-6 p-8 rounded-2xl bg-white border border-[var(--border-soft)] shadow-[var(--shadow-sm)] h-full">
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${i < rating ? 'fill-[var(--brand-accent)] text-[var(--brand-accent)]' : 'text-gray-300'}`}
          />
        ))}
      </div>
      <p className="text-[var(--ink-body)] flex-1">{quote}</p>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-accent)] flex items-center justify-center">
          <span className="text-white font-bold">{name.charAt(0)}</span>
        </div>
        <div>
          <div className="font-bold text-[var(--ink-title)]">{name}</div>
          <div className="text-sm text-[var(--ink-muted)]">{role}</div>
        </div>
      </div>
    </div>
  );
}
