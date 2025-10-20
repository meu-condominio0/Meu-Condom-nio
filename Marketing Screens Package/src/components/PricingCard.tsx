import React from 'react';
import { Button } from './ui/button';
import { CheckCircle2 } from 'lucide-react';

interface PricingCardProps {
  title: string;
  features: string[];
  highlighted?: boolean;
  onSelectPlan?: () => void;
}

export function PricingCard({ title, features, highlighted, onSelectPlan }: PricingCardProps) {
  return (
    <div
      className={`flex flex-col p-8 rounded-2xl border-2 ${
        highlighted
          ? 'border-[var(--brand-primary)] bg-gradient-to-br from-[var(--brand-primary)]/5 to-transparent'
          : 'border-[var(--border-soft)] bg-white'
      } shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-all duration-200`}
    >
      <div className="mb-8">
        <h3 className="mb-2">{title}</h3>
        {highlighted && (
          <div className="inline-block px-3 py-1 bg-[var(--brand-accent)]/10 text-[var(--brand-accent)] rounded-full text-sm font-bold">
            Mais completo
          </div>
        )}
      </div>

      <ul className="space-y-4 mb-8 flex-1">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[var(--brand-accent)] flex-shrink-0 mt-0.5" />
            <span className="text-[var(--ink-body)]">{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        onClick={onSelectPlan}
        className={
          highlighted
            ? 'bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-600)] text-white'
            : 'bg-white border-2 border-[var(--brand-primary)] text-[var(--brand-primary)] hover:bg-[var(--brand-primary)] hover:text-white'
        }
        size="lg"
      >
        Fale com um consultor
      </Button>
    </div>
  );
}
