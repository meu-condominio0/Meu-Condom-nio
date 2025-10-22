import React from 'react';
import { MessageCircle } from 'lucide-react';

export function FloatingWhatsApp() {
  return (
    <button
      onClick={() => window.open('https://wa.me/5511999999999', '_blank')}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[var(--brand-accent)] hover:bg-[#1ab57f] text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" strokeWidth={2} />
    </button>
  );
}
