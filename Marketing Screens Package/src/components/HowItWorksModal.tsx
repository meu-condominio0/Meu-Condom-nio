import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { CheckCircle2, MessageCircle, Shield, Package } from 'lucide-react';

interface HowItWorksModalProps {
  open: boolean;
  onClose: () => void;
}

export function HowItWorksModal({ open, onClose }: HowItWorksModalProps) {
  const steps = [
    {
      icon: Package,
      title: '1. Anunciar',
      description: 'Cadastre seu produto ou serviço com fotos, descrição e preço. É rápido e fácil.',
    },
    {
      icon: MessageCircle,
      title: '2. Negociar no chat',
      description: 'Converse diretamente com o interessado através do chat integrado e seguro.',
    },
    {
      icon: Shield,
      title: '3. Pagar com proteção',
      description: 'Pagamento protegido: o valor só é liberado quando você confirma a entrega.',
    },
    {
      icon: CheckCircle2,
      title: '4. Retirar/Receber',
      description: 'Retirada na portaria ou entrega na unidade. Tudo controlado e rastreado.',
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Como funciona o Marketplace de Moradores</DialogTitle>
          <p className="text-[var(--ink-body)] mt-2">
            Compre e venda entre vizinhos com total segurança e praticidade
          </p>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-accent)] flex items-center justify-center flex-shrink-0">
                <step.icon className="w-6 h-6 text-white" strokeWidth={2} />
              </div>
              <div>
                <h4 className="mb-2">{step.title}</h4>
                <p className="text-[var(--ink-body)]">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-[var(--bg-soft)] rounded-xl">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-[var(--brand-accent)] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm mb-1">Proteção garantida</h4>
              <p className="text-sm text-[var(--ink-body)]">
                Todas as transações seguem as regras do condomínio e contam com suporte dedicado.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
