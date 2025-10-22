import React, { useState } from 'react';
import { Button } from './ui/button';
import { IconCard } from './IconCard';
import { MetricsCard } from './MetricsCard';
import { TestimonialCard } from './TestimonialCard';
import { BlogCard } from './BlogCard';
import { AppCard } from './AppCard';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { HowItWorksModal } from './HowItWorksModal';
import { Badge } from './ui/badge';
import {
  Clock,
  TrendingDown,
  Shield,
  Calendar,
  BarChart3,
  Users,
  CheckCircle2,
  ArrowRight,
  Facebook,
  Instagram,
  Linkedin,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Star,
  MapPin,
  Package,
  Plug,
  FileText,
} from 'lucide-react';

interface HomePageProps {
  onNavigateMarketplace?: () => void;
  onNavigateMarketplaceMoradores?: () => void;
  onOpenLeadForm?: () => void;
  onOpenAppModal?: (app: any) => void;
}

export function HomePage({
  onNavigateMarketplace,
  onNavigateMarketplaceMoradores,
  onOpenLeadForm,
  onOpenAppModal,
}: HomePageProps) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [howItWorksOpen, setHowItWorksOpen] = useState(false);

  const benefits = [
    { icon: Clock, title: 'Gestão digital 24h' },
    { icon: TrendingDown, title: 'Economia de tempo' },
    { icon: TrendingDown, title: 'Redução de custos' },
    { icon: Calendar, title: 'Dia a dia organizado (entregas, reservas, chamados)' },
    { icon: Shield, title: 'Transparência financeira' },
    { icon: Users, title: 'Engajamento de moradores' },
  ];

  const valueProps = [
    'Atenda moradores de forma mais eficiente',
    'Ganhe tempo com automação',
    'Reduza custos significativamente',
    'Mostre seu trabalho e seja reconhecido',
    'Gerencie vários condomínios em um só lugar',
  ];

  const metrics = [
    { value: '6.000.000+', label: 'Pessoas' },
    { value: '20.000+', label: 'Condomínios' },
    { value: '2.000+', label: 'Cidades' },
    { value: '4', label: 'Países' },
  ];

  const testimonials = [
    {
      quote: 'Implantação rápida e fim das planilhas paralelas. Portaria com QR reduziu filas e ruídos.',
      name: 'Guilherme Ricardo',
      role: 'Síndico Morador (RJ)',
      rating: 5,
    },
    {
      quote: 'Reservas e chamados com SLA claro. O conselho finalmente tem visibilidade real.',
      name: 'Tânia Dorneles',
      role: 'Conselheira (RS)',
      rating: 5,
    },
    {
      quote: 'Cobrança inteligente derrubou a inadimplência. Relatórios simplificaram a prestação de contas.',
      name: 'Paulo Vieira',
      role: 'Administrador (SP)',
      rating: 4,
    },
  ];

  const blogPosts = [
    {
      title: 'Síndico profissional: o que muda na prática?',
      image: 'https://images.unsplash.com/photo-1581065178047-8ee15951ede6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MDM5MTUwN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      title: 'Como reduzir inadimplência em 30 dias (sem briga).',
      image: 'https://images.unsplash.com/photo-1709715357520-5e1047a2b691?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRlYW0lMjBtZWV0aW5nfGVufDF8fHx8MTc2MDQ1NzA5MHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      title: 'Portaria digital: do QR à liberação 1-toque.',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjA1MDIyNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

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

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const mockListings = [
    {
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
      title: 'iPhone 13 Pro 256GB',
      price: 'R$ 3.200',
      condition: 'Usado',
      tower: 'A',
      rating: 4.9,
    },
    {
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400',
      title: 'Sofá 3 lugares',
      price: 'R$ 1.500',
      condition: 'Usado',
      tower: 'B',
      rating: 5.0,
    },
  ];

  return (
    <div className="w-full">
      {/* Nosso Diferencial Hero */}
      <section className="bg-gradient-to-br from-[var(--brand-primary)]/5 via-white to-[var(--brand-accent)]/5 py-16 md:py-24">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Bloco Esquerdo */}
            <div className="space-y-6">
              <h1>Administre seu condomínio sem fricção</h1>
              <p className="text-xl text-[var(--ink-body)]">
                Boletos, reservas, chamados e portaria — em 3 cliques.
              </p>
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-[var(--brand-primary)]/10 to-[var(--brand-accent)]/10 border border-[var(--brand-accent)]/20">
                <ShoppingBag className="w-5 h-5 text-[var(--brand-primary)]" />
                <span className="font-medium text-[var(--brand-primary)]">
                  + Marketplace de Moradores → venda de produtos e oferta de serviços entre
                  vizinhos, com proteção e regras do condomínio.
                </span>
              </div>
            </div>

            {/* Bloco Direito - Card Destaque */}
            <div className="relative">
              <div className="bg-white rounded-2xl p-6 shadow-[var(--shadow-lg)] border border-[var(--border-soft)]">
                <div className="flex items-center gap-3 mb-4">
                  <ShoppingBag className="w-6 h-6 text-[var(--brand-primary)]" />
                  <h3>Marketplace de Moradores</h3>
                </div>

                <div className="space-y-4 mb-6">
                  {mockListings.map((item, i) => (
                    <div
                      key={i}
                      className="flex gap-4 p-3 rounded-xl bg-[var(--bg-soft)] hover:shadow-sm transition-shadow"
                    >
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-white flex-shrink-0">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm line-clamp-1 mb-1">{item.title}</h4>
                        <div className="text-lg font-bold text-[var(--brand-primary)] mb-2">
                          {item.price}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-[var(--ink-muted)]">
                          <Badge variant="secondary" className="text-xs">
                            {item.condition}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            Torre {item.tower}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-[var(--brand-accent)] text-[var(--brand-accent)]" />
                            {item.rating}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[var(--border-soft)]">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <CheckCircle2 className="w-4 h-4 text-[var(--brand-accent)]" />
                      <span className="text-xs font-bold text-[var(--ink-title)]">Verificação</span>
                    </div>
                    <p className="text-xs text-[var(--ink-muted)]">do morador</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Shield className="w-4 h-4 text-[var(--brand-accent)]" />
                      <span className="text-xs font-bold text-[var(--ink-title)]">Pagamento</span>
                    </div>
                    <p className="text-xs text-[var(--ink-muted)]">protegido</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Package className="w-4 h-4 text-[var(--brand-accent)]" />
                      <span className="text-xs font-bold text-[var(--ink-title)]">Retirada</span>
                    </div>
                    <p className="text-xs text-[var(--ink-muted)]">na portaria</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  onClick={onNavigateMarketplaceMoradores}
                  size="lg"
                  className="flex-1 bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-600)] text-white"
                >
                  Explorar Marketplace
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  onClick={() => setHowItWorksOpen(true)}
                  variant="outline"
                  size="lg"
                  className="border-[var(--brand-primary)] text-[var(--brand-primary)] hover:bg-[var(--brand-primary)] hover:text-white"
                >
                  Como funciona
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section Original */}
      <section className="bg-gradient-to-b from-white to-[var(--bg-soft)] py-16 md:py-24">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--brand-accent)]/10 border border-[var(--brand-accent)]/20">
                <span className="text-sm font-medium text-[var(--brand-primary)]">
                  + Marketplace para integrar pagamentos, portaria & IoT, contabilidade e BI.
                </span>
              </div>
              
              <h1 className="text-[40px] md:text-[48px] leading-[48px] md:leading-[56px]">
                Administre seu condomínio sem fricção.
              </h1>
              
              <p className="text-xl text-[var(--ink-body)]">
                Boletos, reservas, chamados e portaria — em 3 cliques e com visão financeira de ponta.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  onClick={onOpenLeadForm}
                  className="bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-600)] text-white px-8 flex items-center gap-2"
                >
                  Ver demonstração
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-[var(--ink-body)] hover:text-[var(--brand-primary)]"
                >
                  Já sou cliente — acessar
                </Button>
              </div>

              <div className="pt-4 space-y-2">
                <p className="flex items-center gap-2 text-sm text-[var(--ink-muted)]">
                  <CheckCircle2 className="w-4 h-4 text-[var(--brand-accent)]" />
                  -29% do tempo em rotinas
                </p>
                <p className="flex items-center gap-2 text-sm text-[var(--ink-muted)]">
                  <CheckCircle2 className="w-4 h-4 text-[var(--brand-accent)]" />
                  Inadimplência sob controle
                </p>
                <p className="flex items-center gap-2 text-sm text-[var(--ink-muted)]">
                  <CheckCircle2 className="w-4 h-4 text-[var(--brand-accent)]" />
                  Reservas e portaria sem telefonema
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-[var(--shadow-lg)]">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1758411898471-fa144c487c85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkYXNoYm9hcmR8ZW58MXx8fHwxNzYwNDI1ODA4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="MeuCondomínio Dashboard"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nosso Diferencial Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>Nosso diferencial</h2>
            <p className="text-lg text-[var(--ink-body)] mt-4 max-w-3xl mx-auto">
              Recursos únicos que tornam a gestão do seu condomínio mais eficiente e moderna
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-[var(--brand-primary)]/5 to-transparent border border-[var(--border-soft)] hover:shadow-[var(--shadow-md)] transition-all">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-accent)] flex items-center justify-center mb-4">
                <ShoppingBag className="w-7 h-7 text-white" strokeWidth={2} />
              </div>
              <h3 className="mb-3">Marketplace de Moradores</h3>
              <p className="text-[var(--ink-body)]">
                Venda produtos e ofereça serviços dentro do aplicativo, com verificação do morador
                e pagamento protegido.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-[var(--brand-accent)]/5 to-transparent border border-[var(--border-soft)] hover:shadow-[var(--shadow-md)] transition-all">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-accent)] flex items-center justify-center mb-4">
                <Plug className="w-7 h-7 text-white" strokeWidth={2} />
              </div>
              <h3 className="mb-3">Apps & Integrações</h3>
              <p className="text-[var(--ink-body)]">
                Conecte bancos, contabilidade, portaria & IoT e BI em poucos cliques.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-[var(--brand-primary)]/5 to-transparent border border-[var(--border-soft)] hover:shadow-[var(--shadow-md)] transition-all">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-accent)] flex items-center justify-center mb-4">
                <FileText className="w-7 h-7 text-white" strokeWidth={2} />
              </div>
              <h3 className="mb-3">Transparência & Relatórios</h3>
              <p className="text-[var(--ink-body)]">
                Prestação de contas clara para conselho e moradores.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="solucoes" className="py-16 md:py-24 bg-[var(--bg-soft)]">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>Uma nova forma de administrar condomínios</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <IconCard key={index} icon={benefit.icon} title={benefit.title} />
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-16 md:py-24 bg-[var(--bg-soft)]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2>Gestão do condomínio mais eficiente</h2>
              
              <div className="space-y-4">
                {valueProps.map((prop, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[var(--brand-accent)] flex-shrink-0 mt-1" />
                    <p className="text-lg">
                      <span className="font-bold">{prop.split(' ')[0]} {prop.split(' ')[1]}</span>
                      {' ' + prop.split(' ').slice(2).join(' ')}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-[var(--shadow-lg)]">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW9wbGUlMjB3b3JraW5nJTIwdG9nZXRoZXJ8ZW58MXx8fHwxNzYwNDM0NDIxfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Gestão eficiente"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>Atendimento em escala</h2>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {metrics.map((metric, index) => (
              <MetricsCard key={index} value={metric.value} label={metric.label} />
            ))}
          </div>

          <div className="flex flex-wrap justify-center items-center gap-12 opacity-40">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-24 h-12 bg-gray-300 rounded"></div>
            ))}
          </div>
        </div>
      </section>

      {/* Marketplace Section */}
      <section className="py-16 md:py-24 bg-[var(--bg-soft)]">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>Acelere com o nosso Marketplace</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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

          <div className="text-center">
            <Button
              variant="outline"
              size="lg"
              onClick={onNavigateMarketplace}
              className="border-[var(--brand-primary)] text-[var(--brand-primary)] hover:bg-[var(--brand-primary)] hover:text-white"
            >
              Explorar todos os apps
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>Opinião dos nossos clientes</h2>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden">
              <div
                className="transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                <div className="flex">
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="w-full flex-shrink-0 px-4">
                      <TestimonialCard {...testimonial} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-6 h-6 text-[var(--brand-primary)]" />
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
              aria-label="Próximo"
            >
              <ChevronRight className="w-6 h-6 text-[var(--brand-primary)]" />
            </button>

            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentTestimonial
                      ? 'bg-[var(--brand-primary)] w-8'
                      : 'bg-gray-300'
                  }`}
                  aria-label={`Ir para depoimento ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-16 md:py-24 bg-[var(--bg-soft)]">
        <div className="container-custom">
          <div className="text-center mb-8">
            <div className="flex justify-center gap-6 mb-8">
              <a href="#" className="text-[var(--ink-muted)] hover:text-[var(--brand-primary)] transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-[var(--ink-muted)] hover:text-[var(--brand-primary)] transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-[var(--ink-muted)] hover:text-[var(--brand-primary)] transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
            <h2>Novidades</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <BlogCard key={index} title={post.title} image={post.image} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-primary-600)] text-white">
        <div className="container-custom text-center">
          <h2 className="text-white mb-8">Quer mais resultados no seu condomínio?</h2>
          <Button
            size="lg"
            onClick={onOpenLeadForm}
            className="bg-[var(--brand-accent)] hover:bg-[#1ab57f] text-white px-8"
          >
            Conversar com um consultor
          </Button>
        </div>
      </section>

      <HowItWorksModal open={howItWorksOpen} onClose={() => setHowItWorksOpen(false)} />
    </div>
  );
}
