import React from 'react';
import { Button } from './ui/button';
import { ShoppingBag, ArrowRight } from 'lucide-react';

interface MarketplaceDifferentialBannerProps {
  onNavigate?: () => void;
}

export function MarketplaceDifferentialBanner({ onNavigate }: MarketplaceDifferentialBannerProps) {
  return (
    <div className="bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-primary-600)] rounded-2xl p-8 md:p-12">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
          <ShoppingBag className="w-8 h-8 text-white" strokeWidth={2} />
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-white mb-2">
            Marketplace de Moradores: venda e serviços dentro do app
          </h3>
          <p className="text-white/90 text-lg">
            Confiança, proteção e regras do seu condomínio.
          </p>
        </div>

        <Button
          onClick={onNavigate}
          size="lg"
          className="bg-white text-[var(--brand-primary)] hover:bg-white/90 flex-shrink-0"
        >
          Conheça o Marketplace
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
}
