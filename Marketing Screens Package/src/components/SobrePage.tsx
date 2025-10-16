import React from 'react';
import { Button } from './ui/button';
import { IconCard } from './IconCard';
import { MetricsCard } from './MetricsCard';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { MarketplaceDifferentialBanner } from './MarketplaceDifferentialBanner';
import { Target, Users, Zap, Shield, Heart, Mail, Phone, Building, ArrowRight } from 'lucide-react';

interface SobrePageProps {
  onOpenLeadForm?: () => void;
  onNavigateMarketplaceMoradores?: () => void;
}

export function SobrePage({ onOpenLeadForm, onNavigateMarketplaceMoradores }: SobrePageProps) {
  const principles = [
    {
      icon: Target,
      title: 'Foco no usuário',
      description: 'Desenvolvemos soluções pensando em quem usa: síndicos, administradores e moradores.',
    },
    {
      icon: Zap,
      title: 'Inovação contínua',
      description: 'Sempre evoluindo com novas funcionalidades baseadas no feedback real dos clientes.',
    },
    {
      icon: Shield,
      title: 'Segurança e privacidade',
      description: 'Proteção total dos dados com criptografia e conformidade 100% com a LGPD.',
    },
    {
      icon: Heart,
      title: 'Suporte humanizado',
      description: 'Time dedicado para ajudar você em cada etapa, do onboarding ao dia a dia.',
    },
    {
      icon: Users,
      title: 'Crescimento compartilhado',
      description: 'Seu sucesso é o nosso sucesso. Crescemos juntos com cada condomínio atendido.',
    },
  ];

  const metrics = [
    { value: '6.000.000+', label: 'Pessoas' },
    { value: '20.000+', label: 'Condomínios' },
    { value: '2.000+', label: 'Cidades' },
    { value: '4', label: 'Países' },
  ];

  const contactCards = [
    {
      icon: Mail,
      title: 'Imprensa',
      description: 'Assessoria de imprensa e materiais para mídia',
      action: 'imprensa@meucondominio.com',
      href: 'mailto:imprensa@meucondominio.com',
    },
    {
      icon: Building,
      title: 'Comercial',
      description: 'Demonstrações e propostas personalizadas',
      action: 'Falar com consultor',
      isButton: true,
    },
    {
      icon: Phone,
      title: 'Suporte',
      description: 'Central de ajuda e atendimento técnico',
      action: 'Ir para suporte',
      href: '#suporte',
    },
  ];

  return (
    <div className="w-full bg-white py-12">
      <div className="container-custom">
        {/* Hero */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="space-y-6">
            <h1>Simplificamos a gestão de condomínios no Brasil</h1>
            <p className="text-xl text-[var(--ink-body)]">
              Nascemos da necessidade real de síndicos e administradoras que buscavam 
              uma solução moderna, completa e fácil de usar. Hoje, ajudamos milhares 
              de condomínios a economizar tempo e recursos.
            </p>
            <p className="text-lg text-[var(--ink-body)]">
              Nossa missão é democratizar o acesso à tecnologia de gestão condominial, 
              tornando a administração mais transparente, eficiente e acessível para todos.
            </p>
          </div>
          <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-[var(--shadow-lg)]">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBidWlsZGluZyUyMHRlYW18ZW58MXx8fHwxNzYwNTA0MDM4fDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Time MeuCondomínio"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Nossa Visão */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="mb-4">Nossa visão e valores</h2>
            <p className="text-lg text-[var(--ink-body)] max-w-3xl mx-auto">
              Princípios que guiam nosso trabalho e relacionamento com clientes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {principles.map((principle, index) => (
              <div
                key={index}
                className="flex flex-col gap-4 p-6 rounded-2xl bg-white border border-[var(--border-soft)] hover:shadow-[var(--shadow-md)] transition-all duration-200"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-primary-600)] flex items-center justify-center">
                  <principle.icon className="w-7 h-7 text-white" strokeWidth={2} />
                </div>
                <div>
                  <h4 className="mb-2">{principle.title}</h4>
                  <p className="text-[var(--ink-body)]">{principle.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Métricas */}
        <div className="mb-24 py-16 bg-[var(--bg-soft)] rounded-2xl">
          <div className="text-center mb-12">
            <h2 className="mb-4">Atendimento em escala</h2>
            <p className="text-lg text-[var(--ink-body)]">
              Números que mostram nossa presença e confiança no mercado
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {metrics.map((metric, index) => (
              <MetricsCard key={index} value={metric.value} label={metric.label} />
            ))}
          </div>
        </div>

        {/* Banner Diferencial */}
        <div className="mb-24">
          <MarketplaceDifferentialBanner onNavigate={onNavigateMarketplaceMoradores} />
        </div>

        {/* Mais Informações */}
        <div>
          <div className="text-center mb-12">
            <h2 className="mb-4">Fale conosco</h2>
            <p className="text-lg text-[var(--ink-body)]">
              Estamos à disposição para responder suas perguntas
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {contactCards.map((card, index) => (
              <div
                key={index}
                className="flex flex-col gap-4 p-8 rounded-2xl bg-white border border-[var(--border-soft)] hover:shadow-[var(--shadow-md)] transition-all duration-200"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-accent)] flex items-center justify-center">
                  <card.icon className="w-7 h-7 text-white" strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <h4 className="mb-2">{card.title}</h4>
                  <p className="text-sm text-[var(--ink-body)] mb-4">{card.description}</p>
                </div>
                {card.isButton ? (
                  <Button
                    onClick={onOpenLeadForm}
                    className="bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-600)] text-white w-full"
                  >
                    {card.action}
                  </Button>
                ) : (
                  <a
                    href={card.href}
                    className="text-[var(--brand-primary)] font-bold hover:text-[var(--brand-primary-600)] flex items-center gap-2"
                  >
                    {card.action}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
