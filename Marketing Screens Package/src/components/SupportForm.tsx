import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { CheckCircle2, Upload } from 'lucide-react';

interface SupportFormProps {
  open: boolean;
  onClose: () => void;
}

export function SupportForm({ open, onClose }: SupportFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    description: '',
  });

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        description: '',
      });
    }, 2000);
  };

  const handleClose = () => {
    onClose();
    setSubmitted(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        {submitted ? (
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <CheckCircle2 className="w-16 h-16 text-[var(--brand-accent)]" />
            <DialogTitle className="text-center">Chamado enviado com sucesso!</DialogTitle>
            <p className="text-center text-[var(--ink-body)]">
              Nossa equipe irá responder em breve.
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Abrir chamado de suporte</DialogTitle>
              <p className="text-sm text-[var(--ink-muted)]">
                Descreva seu problema e nossa equipe irá ajudá-lo
              </p>
            </DialogHeader>

            <div className="space-y-6 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome *</Label>
                  <Input
                    id="name"
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-mail *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Assunto *</Label>
                <Input
                  id="subject"
                  placeholder="Descreva brevemente o problema"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição *</Label>
                <Textarea
                  id="description"
                  placeholder="Descreva o problema em detalhes..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={6}
                />
              </div>

              <div className="space-y-2">
                <Label>Anexos (opcional)</Label>
                <div className="border-2 border-dashed border-[var(--border-soft)] rounded-xl p-8 text-center hover:border-[var(--brand-primary)] transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-[var(--ink-muted)] mx-auto mb-2" />
                  <p className="text-sm text-[var(--ink-body)]">
                    Clique para fazer upload ou arraste arquivos
                  </p>
                  <p className="text-xs text-[var(--ink-muted)] mt-1">
                    PNG, JPG ou PDF até 10MB
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={handleClose} className="flex-1">
                  Cancelar
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="flex-1 bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-600)] text-white"
                >
                  Enviar chamado
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
