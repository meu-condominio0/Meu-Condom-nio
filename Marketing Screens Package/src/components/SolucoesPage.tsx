import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { IconCard } from './IconCard';
import { AppCard } from './AppCard';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { MarketplaceDifferentialBanner } from './MarketplaceDifferentialBanner';
import {
  DollarSign,
  Calendar,
  MessageSquare,
  Shield,
  Package,
  Bell,
  CreditCard,
  TrendingDown,
  FileText,
  Clock,
  CheckCircle2,
  Camera,
  QrCode,
  UserCheck,
  Mail,
  BarChart3,
  ArrowRight,
} from 'lucide-react';

interface SolucoesPageProps {
  onOpenLeadForm?: () => void;
  onOpenAppModal?: (app: any) => void;
  onNavigateMarketplaceMoradores?: () => void;
  initialTab?: string;
}

export function SolucoesPage({
  onOpenLeadForm,
  onOpenAppModal,
  onNavigateMarketplaceMoradores,
  initialTab = 'financeiro',
}: SolucoesPageProps) {
  const [activeTab, setActiveTab] = useState(initialTab);

  const marketplaceApps = [
    {
      name: 'PayFlow',
      description: 'Integração com principais bancos e gateways de pagamento',
      category: 'Pagamentos & Bancos',
      rating: 4.8,
      isOfficial: true,
    },
    {
      name: 'SmartGate',
      description: 'Controle de acesso com QR code e reconhecimento facial',
      category: 'Portaria & IoT',
      rating: 4.9,
      isOfficial: true,
    },
    {
      name: 'ContaExata',
      description: 'Exportação automática para sistemas contábeis',
      category: 'Contabilidade & Fiscal',
      rating: 4.7,
      isOfficial: false,
    },
    {
      name: 'ReportPro',
      description: 'Relatórios avançados e dashboards personalizados',
      category: 'Relatórios & BI',
      rating: 4.6,
      isOfficial: true,
    },
    {
      name: 'NotifyHub',
      description: 'Comunicação multicanal com moradores',
      category: 'Comunicação',
      rating: 4.5,
      isOfficial: false,
    },
    {
      name: 'ToolBox',
      description: 'Ferramentas utilitárias para o dia a dia',
      category: 'Utilitários',
      rating: 4.4,
      isOfficial: false,
    },
  ];

  return (
    <div className="w-full bg-white py-12">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="mb-4">Soluções completas para seu condomínio</h1>
          <p className="text-xl text-[var(--ink-body)] max-w-3xl mx-auto">
            Ferramentas poderosas para simplificar a gestão e melhorar a comunicação
          </p>
        </div>

        {/* Banner Diferencial */}
        <div className="mb-12">
          <MarketplaceDifferentialBanner onNavigate={onNavigateMarketplaceMoradores} />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-7 mb-12 h-auto gap-2">
            <TabsTrigger value="financeiro" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              <span className="hidden sm:inline">Financeiro</span>
            </TabsTrigger>
            <TabsTrigger value="reservas" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Reservas</span>
            </TabsTrigger>
            <TabsTrigger value="chamados" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Chamados</span>
            </TabsTrigger>
            <TabsTrigger value="portaria" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">Portaria</span>
            </TabsTrigger>
            <TabsTrigger value="encomendas" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline">Encomendas</span>
            </TabsTrigger>
            <TabsTrigger value="comunicados" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">Comunicados</span>
            </TabsTrigger>
            <TabsTrigger value="marketplace" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Marketplace</span>
            </TabsTrigger>
          </TabsList>

          {/* Financeiro */}
          <TabsContent value="financeiro" className="space-y-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2>Gestão financeira completa</h2>
                <p className="text-lg text-[var(--ink-body)]">
                  Controle total das finanças do condomínio com emissão de boletos, integração com Pix e cartão, 
                  DRE simplificado e controle de inadimplência.
                </p>
                <Button
                  onClick={onOpenLeadForm}
                  size="lg"
                  className="bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-600)] text-white"
                >
                  Falar com um consultor
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-[var(--shadow-lg)]">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBkYXNoYm9hcmR8ZW58MXx8fHwxNzYwNTAyODU5fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Gestão financeira"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <IconCard icon={CreditCard} title="Boletos com Pix e cartão" />
              <IconCard icon={TrendingDown} title="Controle de inadimplência" />
              <IconCard icon={FileText} title="DRE simplificado" />
              <IconCard icon={DollarSign} title="Extrato em tempo real" />
            </div>
          </TabsContent>

          {/* Reservas */}
          <TabsContent value="reservas" className="space-y-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2>Reservas sem conflitos</h2>
                <p className="text-lg text-[var(--ink-body)]">
                  Calendário inteligente para reserva de espaços comuns com regras personalizadas, 
                  controle de taxas e prevenção automática de conflitos.
                </p>
                <Button
                  onClick={onOpenLeadForm}
                  size="lg"
                  className="bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-600)] text-white"
                >
                  Falar com um consultor
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-[var(--shadow-lg)]">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWxlbmRhciUyMGJvb2tpbmd8ZW58MXx8fHwxNzYwNTAyODcxfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Sistema de reservas"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <IconCard icon={Calendar} title="Calendário visual intuitivo" />
              <IconCard icon={CheckCircle2} title="Regras e taxas personalizadas" />
              <IconCard icon={Shield} title="Prevenção de conflitos" />
            </div>
          </TabsContent>

          {/* Chamados */}
          <TabsContent value="chamados" className="space-y-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2>Chamados organizados</h2>
                <p className="text-lg text-[var(--ink-body)]">
                  Gestão completa de solicitações com SLA definido, sistema de prioridades, 
                  upload de fotos e timeline de atendimento.
                </p>
                <Button
                  onClick={onOpenLeadForm}
                  size="lg"
                  className="bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-600)] text-white"
                >
                  Falar com um consultor
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-[var(--shadow-lg)]">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b21lciUyMHN1cHBvcnQlMjB0ZWFtfGVufDF8fHx8MTc2MDUwMjg4NXww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Sistema de chamados"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <IconCard icon={Clock} title="SLA definido" />
              <IconCard icon={MessageSquare} title="Sistema de prioridades" />
              <IconCard icon={Camera} title="Upload de fotos" />
              <IconCard icon={FileText} title="Timeline de atendimento" />
            </div>
          </TabsContent>

          {/* Portaria */}
          <TabsContent value="portaria" className="space-y-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2>Portaria digital</h2>
                <p className="text-lg text-[var(--ink-body)]">
                  Controle de acesso moderno com QR code para visitantes, lista do dia 
                  e liberação em um toque para maior segurança e praticidade.
                </p>
                <Button
                  onClick={onOpenLeadForm}
                  size="lg"
                  className="bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-600)] text-white"
                >
                  Falar com um consultor
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-[var(--shadow-lg)]">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWN1cml0eSUyMGdhdGUlMjBlbnRyYW5jZXxlbnwxfHx8fDE3NjA1MDI4OTd8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Portaria digital"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <IconCard icon={QrCode} title="QR code para visitantes" />
              <IconCard icon={FileText} title="Lista do dia" />
              <IconCard icon={UserCheck} title="Liberação 1-toque" />
            </div>
          </TabsContent>

          {/* Encomendas */}
          <TabsContent value="encomendas" className="space-y-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2>Gestão de encomendas</h2>
                <p className="text-lg text-[var(--ink-body)]">
                  Registre encomendas facilmente, notifique moradores automaticamente 
                  e confirme a retirada para evitar perdas.
                </p>
                <Button
                  onClick={onOpenLeadForm}
                  size="lg"
                  className="bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-600)] text-white"
                >
                  Falar com um consultor
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-[var(--shadow-lg)]">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWNrYWdlJTIwZGVsaXZlcnl8ZW58MXx8fHwxNzYwNTAyOTE4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Gestão de encomendas"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <IconCard icon={Package} title="Registro rápido" />
              <IconCard icon={Bell} title="Notificação automática" />
              <IconCard icon={CheckCircle2} title="Confirmação de retirada" />
            </div>
          </TabsContent>

          {/* Comunicados */}
          <TabsContent value="comunicados" className="space-y-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2>Comunicação eficiente</h2>
                <p className="text-lg text-[var(--ink-body)]">
                  Envie comunicados segmentados por Torre ou Unidade com confirmação 
                  de leitura para garantir que todos recebam as informações.
                </p>
                <Button
                  onClick={onOpenLeadForm}
                  size="lg"
                  className="bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-600)] text-white"
                >
                  Falar com um consultor
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-[var(--shadow-lg)]">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbnxlbnwxfHx8fDE3NjA1MDI5MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Sistema de comunicados"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <IconCard icon={Mail} title="Segmentação por Torre/Unidade" />
              <IconCard icon={CheckCircle2} title="Confirmação de leitura" />
              <IconCard icon={Bell} title="Notificações push" />
            </div>
          </TabsContent>

          {/* Marketplace */}
          <TabsContent value="marketplace" className="space-y-12">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="mb-4">Expanda suas possibilidades</h2>
              <p className="text-lg text-[var(--ink-body)]">
                Integre ferramentas especializadas para pagamentos, portaria IoT, contabilidade, 
                comunicação e relatórios avançados através do nosso Marketplace.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {marketplaceApps.map((app, index) => (
                <AppCard
                  key={index}
                  name={app.name}
                  description={app.description}
                  category={app.category}
                  rating={app.rating}
                  isOfficial={app.isOfficial}
                  onInstall={() => onOpenAppModal?.(app)}
                />
              ))}
            </div>

            <div className="text-center pt-8">
              <Button
                onClick={onOpenLeadForm}
                size="lg"
                className="bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-600)] text-white"
              >
                Falar com um consultor
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
