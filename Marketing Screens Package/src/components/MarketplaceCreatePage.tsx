import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Checkbox } from './ui/checkbox';
import { ArrowLeft, ArrowRight, CheckCircle2, Upload, X } from 'lucide-react';

interface MarketplaceCreatePageProps {
  onBack?: () => void;
  onSuccess?: () => void;
}

export function MarketplaceCreatePage({ onBack, onSuccess }: MarketplaceCreatePageProps) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    condition: '',
    description: '',
    price: '',
    tags: '',
    delivery: 'portaria',
    acceptTerms: false,
  });

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      onSuccess?.();
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="w-full bg-white py-12">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center py-16">
            <CheckCircle2 className="w-20 h-20 text-[var(--brand-accent)] mx-auto mb-6" />
            <h1 className="mb-4">Anúncio publicado com sucesso!</h1>
            <p className="text-xl text-[var(--ink-body)] mb-8">
              Seu anúncio já está visível para os moradores do condomínio.
            </p>
            <Button
              onClick={onBack}
              size="lg"
              className="bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-600)] text-white"
            >
              Ver meu anúncio
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white py-12">
      <div className="container-custom">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-8 text-[var(--brand-primary)] hover:text-[var(--brand-primary-600)] -ml-2"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Voltar
        </Button>

        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <h1 className="mb-4">Criar anúncio</h1>
            <div className="flex items-center gap-2 mb-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`flex-1 h-2 rounded-full transition-all ${
                    i <= step ? 'bg-[var(--brand-primary)]' : 'bg-[var(--bg-soft)]'
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-[var(--ink-muted)]">Passo {step} de 4</p>
          </div>

          {/* Step 1: Detalhes */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="title">Título do anúncio *</Label>
                <Input
                  id="title"
                  placeholder="Ex: iPhone 13 Pro 256GB - Seminovo"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="mt-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Categoria *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="eletronicos">Eletrônicos</SelectItem>
                      <SelectItem value="moveis">Móveis</SelectItem>
                      <SelectItem value="infantil">Infantil</SelectItem>
                      <SelectItem value="esportes">Esportes</SelectItem>
                      <SelectItem value="servicos">Serviços</SelectItem>
                      <SelectItem value="mobilidade">Mobilidade</SelectItem>
                      <SelectItem value="outros">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Condição *</Label>
                  <RadioGroup
                    value={formData.condition}
                    onValueChange={(value) => setFormData({ ...formData, condition: value })}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="novo" id="novo" />
                      <Label htmlFor="novo" className="cursor-pointer font-normal">
                        Novo
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="usado" id="usado" />
                      <Label htmlFor="usado" className="cursor-pointer font-normal">
                        Usado
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Descrição *</Label>
                <Textarea
                  id="description"
                  placeholder="Descreva o produto ou serviço em detalhes..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={6}
                  className="mt-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Preço (R$) *</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="0,00"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="tags">Tags (opcional)</Label>
                  <Input
                    id="tags"
                    placeholder="Ex: seminovo, garantia"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    className="mt-2"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Mídia */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <Label>Fotos do produto (1-10) *</Label>
                <div className="mt-2 border-2 border-dashed border-[var(--border-soft)] rounded-2xl p-12 text-center hover:border-[var(--brand-primary)] transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 text-[var(--ink-muted)] mx-auto mb-4" />
                  <p className="text-[var(--ink-body)] mb-2">
                    Clique para fazer upload ou arraste as fotos
                  </p>
                  <p className="text-sm text-[var(--ink-muted)]">
                    JPG, PNG ou HEIC até 5MB cada · A primeira foto será a capa
                  </p>
                </div>
              </div>

              <div className="bg-[var(--bg-soft)] rounded-xl p-4">
                <h4 className="text-sm mb-2">Dicas para boas fotos</h4>
                <ul className="text-sm text-[var(--ink-body)] space-y-1">
                  <li>• Use boa iluminação natural</li>
                  <li>• Mostre diferentes ângulos do produto</li>
                  <li>• Destaque detalhes importantes</li>
                  <li>• Evite fotos borradas ou escuras</li>
                </ul>
              </div>
            </div>
          )}

          {/* Step 3: Entrega */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <Label>Como será a entrega? *</Label>
                <RadioGroup
                  value={formData.delivery}
                  onValueChange={(value) => setFormData({ ...formData, delivery: value })}
                  className="mt-2 space-y-3"
                >
                  <div className="flex items-start space-x-3 p-4 border border-[var(--border-soft)] rounded-xl">
                    <RadioGroupItem value="portaria" id="portaria" className="mt-1" />
                    <div>
                      <Label htmlFor="portaria" className="cursor-pointer font-bold">
                        Retirada na portaria (recomendado)
                      </Label>
                      <p className="text-sm text-[var(--ink-muted)] mt-1">
                        O comprador retira na portaria com controle de acesso
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 border border-[var(--border-soft)] rounded-xl">
                    <RadioGroupItem value="unidade" id="unidade" className="mt-1" />
                    <div>
                      <Label htmlFor="unidade" className="cursor-pointer font-bold">
                        Entrega na unidade
                      </Label>
                      <p className="text-sm text-[var(--ink-muted)] mt-1">
                        Você entrega diretamente na unidade do comprador
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 border border-[var(--border-soft)] rounded-xl">
                    <RadioGroupItem value="encontro" id="encontro" className="mt-1" />
                    <div>
                      <Label htmlFor="encontro" className="cursor-pointer font-bold">
                        Ponto de encontro
                      </Label>
                      <p className="text-sm text-[var(--ink-muted)] mt-1">
                        Combinar local e horário nas áreas comuns
                      </p>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}

          {/* Step 4: Regras & Publicar */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="bg-[var(--bg-soft)] rounded-xl p-6">
                <h4 className="mb-4">Revisão do anúncio</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[var(--ink-muted)]">Título:</span>
                    <span className="font-medium text-[var(--ink-title)]">{formData.title || '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--ink-muted)]">Categoria:</span>
                    <span className="font-medium text-[var(--ink-title)]">
                      {formData.category || '-'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--ink-muted)]">Preço:</span>
                    <span className="font-bold text-[var(--brand-primary)]">
                      R$ {formData.price || '0,00'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <Checkbox
                  id="terms"
                  checked={formData.acceptTerms}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, acceptTerms: checked as boolean })
                  }
                  className="mt-1"
                />
                <Label htmlFor="terms" className="cursor-pointer font-normal leading-tight">
                  Li e aceito as{' '}
                  <a href="#" className="text-[var(--brand-primary)] hover:underline">
                    regras do condomínio
                  </a>{' '}
                  para vendas entre moradores
                </Label>
              </div>

              <div className="bg-[var(--bg-soft)] rounded-xl p-4">
                <h4 className="text-sm mb-2">Principais regras</h4>
                <ul className="text-sm text-[var(--ink-body)] space-y-1">
                  <li>• Proibido vender produtos ilícitos ou ilegais</li>
                  <li>• Descrição deve ser honesta e completa</li>
                  <li>• Respeitar horários de silêncio nas entregas</li>
                  <li>• Pagamento deve ser feito através do app</li>
                </ul>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-12 pt-8 border-t border-[var(--border-soft)]">
            {step > 1 && (
              <Button variant="outline" onClick={handleBack} className="flex-1" size="lg">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Voltar
              </Button>
            )}
            {step < 4 ? (
              <Button
                onClick={handleNext}
                className="flex-1 bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-600)] text-white"
                size="lg"
              >
                Próximo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!formData.acceptTerms}
                className="flex-1 bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-600)] text-white disabled:opacity-50"
                size="lg"
              >
                Publicar anúncio
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
