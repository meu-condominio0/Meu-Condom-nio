import React from 'react';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface CallingBannerProps {
  status: 'calling' | 'connected' | 'failed';
  onRetry?: () => void;
  onSendMessage?: () => void;
}

export function CallingBanner({ status, onRetry, onSendMessage }: CallingBannerProps) {
  if (status === 'calling') {
    return (
      <div className="bg-[var(--brand-primary)]/5 border-l-4 border-[var(--brand-primary)] rounded-lg p-4 flex items-center gap-3">
        <Loader2 className="w-5 h-5 text-[var(--brand-primary)] animate-spin" />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <p className="font-bold text-[var(--ink-title)]">Estamos chamando pelo site…</p>
            <Badge variant="secondary" className="bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] border-0">
              via site
            </Badge>
          </div>
          <p className="text-sm text-[var(--ink-body)]">
            Aguarde enquanto conectamos você ao(a) vendedor(a).
          </p>
        </div>
      </div>
    );
  }

  if (status === 'connected') {
    return (
      <div className="bg-[var(--brand-accent)]/10 border-l-4 border-[var(--brand-accent)] rounded-lg p-4 flex items-center gap-3">
        <CheckCircle2 className="w-5 h-5 text-[var(--brand-accent)]" />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <p className="font-bold text-[var(--ink-title)]">Conexão feita!</p>
            <Badge variant="secondary" className="bg-[var(--brand-accent)]/10 text-[var(--brand-accent)] border-0">
              via site
            </Badge>
          </div>
          <p className="text-sm text-[var(--ink-body)]">Você está no chat.</p>
        </div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4">
        <div className="flex items-start gap-3 mb-3">
          <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-bold text-[var(--ink-title)] mb-1">
              Não conseguimos conectar agora.
            </p>
            <p className="text-sm text-[var(--ink-body)]">
              O vendedor pode estar indisponível. Tente novamente ou envie um recado.
            </p>
          </div>
        </div>
        <div className="flex gap-3 ml-8">
          <Button
            onClick={onRetry}
            variant="outline"
            size="sm"
            className="border-red-500 text-red-500 hover:bg-red-50"
          >
            Tentar de novo
          </Button>
          <Button
            onClick={onSendMessage}
            size="sm"
            className="bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-600)] text-white"
          >
            Mandar recado
          </Button>
        </div>
      </div>
    );
  }

  return null;
}
