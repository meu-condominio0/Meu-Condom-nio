import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Checkbox } from './ui/checkbox';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { CheckCircle2 } from 'lucide-react';

interface LeadFormProps {
  open: boolean;
  onClose: () => void;
}

export function LeadForm({ open, onClose }: LeadFormProps) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    whatsapp: '',
    help: '',
    consent: false,
    contactPreference: '',
    bestTime: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }
    
    if (!formData.name) {
      newErrors.name = 'Nome é obrigatório';
    }
    
    if (!formData.whatsapp) {
      newErrors.whatsapp = 'WhatsApp é obrigatório';
    }
    
    if (!formData.help) {
      newErrors.help = 'Selecione uma opção';
    }
    
    if (!formData.consent) {
      newErrors.consent = 'Você precisa concordar para continuar';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setStep(1);
      setSubmitted(false);
      setFormData({
        email: '',
        name: '',
        whatsapp: '',
        help: '',
        consent: false,
        contactPreference: '',
        bestTime: '',
        notes: '',
      });
    }, 2000);
  };

  const handleClose = () => {
    onClose();
    setStep(1);
    setSubmitted(false);
    setErrors({});
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        {submitted ? (
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <CheckCircle2 className="w-16 h-16 text-[var(--brand-accent)]" />
            <DialogTitle className="text-center">Solicitação enviada com sucesso!</DialogTitle>
            <p className="text-center text-[var(--ink-body)]">
              Entraremos em contato em breve.
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>
                {step === 1 ? 'Solicitar demonstração' : 'Preferências de contato'}
              </DialogTitle>
              <p className="text-sm text-[var(--ink-muted)]">
                Passo {step} de 2
              </p>
            </DialogHeader>

            {step === 1 ? (
              <div className="space-y-6 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      setErrors({ ...errors, email: '' });
                    }}
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Nome completo *</Label>
                  <Input
                    id="name"
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      setErrors({ ...errors, name: '' });
                    }}
                    className={errors.name ? 'border-red-500' : ''}
                  />
                  {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp *</Label>
                  <Input
                    id="whatsapp"
                    placeholder="+55 (11) 99999-9999"
                    value={formData.whatsapp}
                    onChange={(e) => {
                      setFormData({ ...formData, whatsapp: e.target.value });
                      setErrors({ ...errors, whatsapp: '' });
                    }}
                    className={errors.whatsapp ? 'border-red-500' : ''}
                  />
                  {errors.whatsapp && <p className="text-sm text-red-500">{errors.whatsapp}</p>}
                </div>

                <div className="space-y-3">
                  <Label>Como podemos te ajudar? *</Label>
                  <RadioGroup
                    value={formData.help}
                    onValueChange={(value) => {
                      setFormData({ ...formData, help: value });
                      setErrors({ ...errors, help: '' });
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="demo" id="demo" />
                      <Label htmlFor="demo" className="cursor-pointer font-normal">
                        Quero uma demonstração
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="quote" id="quote" />
                      <Label htmlFor="quote" className="cursor-pointer font-normal">
                        Solicitar orçamento
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="info" id="info" />
                      <Label htmlFor="info" className="cursor-pointer font-normal">
                        Mais informações
                      </Label>
                    </div>
                  </RadioGroup>
                  {errors.help && <p className="text-sm text-red-500">{errors.help}</p>}
                </div>

                <div className="flex items-start space-x-2 pt-2">
                  <Checkbox
                    id="consent"
                    checked={formData.consent}
                    onCheckedChange={(checked) => {
                      setFormData({ ...formData, consent: checked as boolean });
                      setErrors({ ...errors, consent: '' });
                    }}
                  />
                  <Label htmlFor="consent" className="cursor-pointer font-normal leading-tight">
                    Concordo em receber contato e aceito a{' '}
                    <a href="#" className="text-[var(--brand-primary)] hover:underline">
                      política de privacidade
                    </a>
                  </Label>
                </div>
                {errors.consent && <p className="text-sm text-red-500">{errors.consent}</p>}

                <Button
                  onClick={handleNext}
                  className="w-full bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-600)] text-white"
                >
                  Continuar
                </Button>
              </div>
            ) : (
              <div className="space-y-6 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="contactPreference">Preferência de contato</Label>
                  <Select
                    value={formData.contactPreference}
                    onValueChange={(value) => setFormData({ ...formData, contactPreference: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                      <SelectItem value="email">E-mail</SelectItem>
                      <SelectItem value="both">Ambos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bestTime">Melhor horário</Label>
                  <Select
                    value={formData.bestTime}
                    onValueChange={(value) => setFormData({ ...formData, bestTime: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Manhã (9h - 12h)</SelectItem>
                      <SelectItem value="afternoon">Tarde (13h - 17h)</SelectItem>
                      <SelectItem value="evening">Noite (18h - 20h)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Observações</Label>
                  <Textarea
                    id="notes"
                    placeholder="Conte-nos mais sobre suas necessidades..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={4}
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1"
                  >
                    Voltar
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    className="flex-1 bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-600)] text-white"
                  >
                    Enviar
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
