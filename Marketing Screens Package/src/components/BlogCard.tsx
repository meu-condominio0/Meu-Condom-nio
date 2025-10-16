import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface BlogCardProps {
  title: string;
  image: string;
  href?: string;
}

export function BlogCard({ title, image, href = '#' }: BlogCardProps) {
  return (
    <div className="group flex flex-col gap-4 rounded-2xl overflow-hidden bg-white border border-[var(--border-soft)] hover:shadow-[var(--shadow-lg)] transition-all duration-300 cursor-pointer">
      <div className="aspect-[16/10] overflow-hidden bg-[var(--bg-soft)]">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6 pt-0">
        <h4 className="mb-4">{title}</h4>
        <button className="flex items-center gap-2 text-[var(--brand-primary)] font-bold group-hover:gap-3 transition-all duration-200">
          Saiba mais
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
