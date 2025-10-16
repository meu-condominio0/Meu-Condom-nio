import React, { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { CallingBanner } from './CallingBanner';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';
import {
  ArrowLeft,
  Star,
  MapPin,
  Shield,
  CheckCircle2,
  MessageCircle,
  DollarSign,
  Flag,
  Heart,
  Share2,
} from 'lucide-react';

interface MarketplaceListingPageProps {
  listingId: number;
  onBack?: () => void;
}

export function MarketplaceListingPage({ listingId, onBack }: MarketplaceListingPageProps) {
  const [callingStatus, setCallingStatus] = useState<'idle' | 'calling' | 'connected' | 'failed'>(
    'idle'
  );
  const [saved, setSaved] = useState(false);

  // Mock data
  const listing = {
    id: listingId,
    title: 'iPhone 13 Pro 256GB - Seminovo em perfeito estado',
    price: 3200,
    condition: 'Usado',
    category: 'Eletrônicos',
    description:
      'iPhone 13 Pro de 256GB em perfeito estado de conservação. Bateria com 96% de saúde. Acompanha caixa original, carregador e fones. Sem nenhum arranhão ou marca de uso. Sempre usado com capinha e película de vidro.',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBzaG9wcGluZyUyMG1vYmlsZXxlbnwxfHx8fDE3NjA1MDQ5NzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tower: 'A',
    unit: '1203',
    seller: {
      name: 'Ana Silva',
      rating: 4.9,
      sales: 12,
      memberSince: '2023',
    },
    postedAt: 'há 2 horas',
  };

  const handleChat = () => {
    setCallingStatus('calling');
    toast.info('Conectando com o vendedor...', {
      description: 'Aguarde enquanto estabelecemos a conexão.',
    });

    setTimeout(() => {
      const success = Math.random() > 0.3;
      if (success) {
        setCallingStatus('connected');
        toast.success('Conexão estabelecida!', {
          description: 'Você pode começar a conversar agora.',
        });
      } else {
        setCallingStatus('failed');
      }
    }, 2000);
  };

  const handleRetry = () => {
    setCallingStatus('idle');
    setTimeout(() => handleChat(), 100);
  };

  const handleSendMessage = () => {
    toast.success('Recado enviado!', {
      description: 'O vendedor receberá sua mensagem e entrará em contato.',
    });
    setCallingStatus('idle');
  };

  const handleSave = () => {
    setSaved(!saved);
    toast.success(saved ? 'Anúncio removido dos salvos' : 'Anúncio salvo com sucesso!');
  };

  const handleShare = () => {
    toast.success('Link copiado para a área de transferência!');
  };

  const handleReport = () => {
    toast.info('Denúncia enviada para análise.');
  };

  return (
    <div className="w-full bg-white py-12">
      <div className="container-custom">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-8 text-[var(--brand-primary)] hover:text-[var(--brand-primary-600)] -ml-2"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Voltar para anúncios
        </Button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Gallery */}
          <div>
            <div className="aspect-square rounded-2xl overflow-hidden bg-[var(--bg-soft)] mb-4">
              <ImageWithFallback
                src={listing.image}
                alt={listing.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-3 overflow-x-auto">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-20 h-20 rounded-xl overflow-hidden bg-[var(--bg-soft)] flex-shrink-0 cursor-pointer border-2 border-transparent hover:border-[var(--brand-primary)] transition-colors"
                >
                  <ImageWithFallback
                    src={listing.image}
                    alt={`Foto ${i}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Details */}
          <div>
            <div className="mb-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <Badge
                    variant="secondary"
                    className={`mb-3 ${
                      listing.condition === 'Novo'
                        ? 'bg-[var(--brand-accent)]/10 text-[var(--brand-accent)]'
                        : 'bg-gray-100 text-gray-700'
                    } border-0`}
                  >
                    {listing.condition}
                  </Badge>
                  <h1 className="mb-2">{listing.title}</h1>
                  <p className="text-sm text-[var(--ink-muted)]">{listing.category}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="w-12 h-12 rounded-full border border-[var(--border-soft)] flex items-center justify-center hover:bg-[var(--bg-soft)] transition-colors"
                    aria-label="Salvar"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        saved ? 'fill-red-500 text-red-500' : 'text-[var(--ink-muted)]'
                      }`}
                    />
                  </button>
                  <button
                    onClick={handleShare}
                    className="w-12 h-12 rounded-full border border-[var(--border-soft)] flex items-center justify-center hover:bg-[var(--bg-soft)] transition-colors"
                    aria-label="Compartilhar"
                  >
                    <Share2 className="w-5 h-5 text-[var(--ink-muted)]" />
                  </button>
                </div>
              </div>

              <div className="text-4xl font-bold text-[var(--brand-primary)] mb-4">
                R$ {listing.price.toFixed(2).replace('.', ',')}
              </div>

              <div className="flex items-center gap-2 text-sm text-[var(--ink-muted)]">
                <MapPin className="w-4 h-4" />
                <span>
                  Torre {listing.tower} · Unidade {listing.unit}
                </span>
              </div>
            </div>

            {/* Calling Banner */}
            {callingStatus !== 'idle' && (
              <div className="mb-6">
                <CallingBanner
                  status={callingStatus}
                  onRetry={handleRetry}
                  onSendMessage={handleSendMessage}
                />
              </div>
            )}

            {/* Protection Box */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm text-green-900 mb-1">Proteção e Confiança</h4>
                  <p className="text-sm text-green-700">
                    Pagamento protegido: valor só é liberado quando você confirma a retirada ou
                    conclusão do serviço.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mb-8">
              <Button
                onClick={handleChat}
                disabled={callingStatus === 'calling'}
                className="w-full bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-600)] text-white"
                size="lg"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Chat com vendedor
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={handleChat}
                  variant="outline"
                  className="border-[var(--brand-primary)] text-[var(--brand-primary)] hover:bg-[var(--brand-primary)] hover:text-white"
                  size="lg"
                >
                  <DollarSign className="w-5 h-5 mr-2" />
                  Fazer proposta
                </Button>
                <Button
                  variant="outline"
                  className="border-[var(--brand-primary)] text-[var(--brand-primary)] hover:bg-[var(--brand-primary)] hover:text-white"
                  size="lg"
                >
                  Comprar agora
                </Button>
              </div>
            </div>

            {/* Seller Info */}
            <div className="border border-[var(--border-soft)] rounded-xl p-6 mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-accent)] flex items-center justify-center">
                  <span className="text-white font-bold text-xl">{listing.seller.name.charAt(0)}</span>
                </div>
                <div className="flex-1">
                  <h4>{listing.seller.name}</h4>
                  <div className="flex items-center gap-2 text-sm text-[var(--ink-muted)]">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-[var(--brand-accent)] text-[var(--brand-accent)]" />
                      <span className="font-bold">{listing.seller.rating.toFixed(1)}</span>
                    </div>
                    <span>·</span>
                    <span>{listing.seller.sales} vendas</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--ink-muted)]">
                <CheckCircle2 className="w-4 h-4 text-[var(--brand-accent)]" />
                <span>Morador verificado desde {listing.seller.memberSince}</span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="mb-3">Descrição</h3>
              <p className="text-[var(--ink-body)] whitespace-pre-line">{listing.description}</p>
            </div>

            {/* Report */}
            <button
              onClick={handleReport}
              className="flex items-center gap-2 text-sm text-[var(--ink-muted)] hover:text-red-500 transition-colors"
            >
              <Flag className="w-4 h-4" />
              <span>Denunciar anúncio</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
