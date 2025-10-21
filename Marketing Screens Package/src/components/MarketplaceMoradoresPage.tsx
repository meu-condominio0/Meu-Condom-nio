import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { CategoryChip } from './CategoryChip';
import { ListingCard } from './ListingCard';
import { MetricsCard } from './MetricsCard';
import { HowItWorksModal } from './HowItWorksModal';
import {
  Search,
  Laptop,
  Sofa,
  Baby,
  Dumbbell,
  Wrench,
  Bike,
  MoreHorizontal,
  ArrowRight,
  Shield,
  CheckCircle2,
  Package,
} from 'lucide-react';

interface MarketplaceMoradoresPageProps {
  onNavigateCreate?: () => void;
  onNavigateListing?: (id: number) => void;
}

export function MarketplaceMoradoresPage({ onNavigateCreate, onNavigateListing }: MarketplaceMoradoresPageProps) {
  const [howItWorksOpen, setHowItWorksOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { label: 'Todos', icon: undefined },
    { label: 'Eletrônicos', icon: Laptop },
    { label: 'Móveis', icon: Sofa },
    { label: 'Infantil', icon: Baby },
    { label: 'Esportes', icon: Dumbbell },
    { label: 'Serviços', icon: Wrench },
    { label: 'Mobilidade', icon: Bike },
    { label: 'Outros', icon: MoreHorizontal },
  ];

  const listings = [
    {
      id: 1,
      title: 'iPhone 13 Pro 256GB - Seminovo em perfeito estado',
      price: 3200,
      condition: 'Usado' as const,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBzaG9wcGluZyUyMG1vYmlsZXxlbnwxfHx8fDE3NjA1MDQ5NzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      tower: 'A',
      unit: '1203',
      rating: 4.9,
      timeAgo: 'há 2 horas',
      category: 'Eletrônicos',
    },
    {
      id: 2,
      title: 'Sofá 3 lugares retrátil e reclinável - Excelente estado',
      price: 1500,
      condition: 'Usado' as const,
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXJuaXR1cmUlMjBtYXJrZXRwbGFjZXxlbnwxfHx8fDE3NjA1MDQ5NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      tower: 'B',
      unit: '804',
      rating: 5.0,
      timeAgo: 'há 5 horas',
      category: 'Móveis',
    },
    {
      id: 3,
      title: 'Berço com colchão + kit enxoval completo',
      price: 450,
      condition: 'Usado' as const,
      image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwdG95c3xlbnwxfHx8fDE3NjA1MDQ5Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      tower: 'A',
      unit: '502',
      rating: 4.8,
      timeAgo: 'há 1 dia',
      category: 'Infantil',
    },
    {
      id: 4,
      title: 'Bicicleta ergométrica horizontal - Pouco uso',
      price: 800,
      condition: 'Usado' as const,
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwZXF1aXBtZW50fGVufDF8fHx8MTc2MDUwNDk4Mnww&ixlib=rb-4.1.0&q=80&w=1080',
      tower: 'C',
      unit: '1105',
      rating: 4.7,
      timeAgo: 'há 1 dia',
      category: 'Esportes',
    },
    {
      id: 5,
      title: 'Notebook Dell Inspiron 15 - i7 16GB RAM 512GB SSD',
      price: 2800,
      condition: 'Usado' as const,
      image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3B8ZW58MXx8fHwxNzYwNTA0OTg1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      tower: 'A',
      unit: '903',
      rating: 4.9,
      timeAgo: 'há 2 dias',
      category: 'Eletrônicos',
    },
    {
      id: 6,
      title: 'Mesa de jantar 6 lugares com cadeiras - Madeira maciça',
      price: 1200,
      condition: 'Usado' as const,
      image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaW5pbmclMjB0YWJsZXxlbnwxfHx8fDE3NjA1MDQ5ODh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      tower: 'B',
      unit: '605',
      rating: 5.0,
      timeAgo: 'há 3 dias',
      category: 'Móveis',
    },
  ];

  const metrics = [
    { value: '+6M', label: 'Interações entre moradores' },
    { value: '+20k', label: 'Condomínios' },
    { value: 'NPS 80+', label: 'Satisfação' },
  ];

  const filteredListings = listings.filter((listing) => {
    const matchesCategory = selectedCategory === 'Todos' || listing.category === selectedCategory;
    const matchesSearch =
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full min-h-screen bg-[var(--bg)] text-[var(--text-body)] py-12">
      <div className="container-custom">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="mb-4">Venda e compre sem sair do seu condomínio</h1>
          <p className="text-xl text-[var(--ink-body)] max-w-3xl mx-auto mb-8">
            Produtos e serviços entre vizinhos, com confiança e regras do condomínio.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <Button
              onClick={() => setHowItWorksOpen(true)}
              size="lg"
              className="h-12 rounded-xl bg-brand-900 text-white hover:bg-brand-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
            >
              Como funciona
              <ArrowRight aria-hidden="true" className="ml-2 h-5 w-5" focusable="false" />
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 rounded-full bg-[var(--surface-soft)] px-4 py-2">
              <Shield aria-hidden="true" className="h-4 w-4 text-[var(--brand-accent)]" focusable="false" />
              <span className="text-[var(--ink-body)]">Taxa opcional do condomínio</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-[var(--surface-soft)] px-4 py-2">
              <CheckCircle2 aria-hidden="true" className="h-4 w-4 text-[var(--brand-accent)]" focusable="false" />
              <span className="text-[var(--ink-body)]">Suporte validado</span>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search aria-hidden="true" className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--ink-muted)]" focusable="false" />
            <Input
              type="text"
              placeholder="Buscar produtos ou serviços..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 rounded-xl border border-[var(--border-soft)] bg-[var(--surface)] pl-12 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <CategoryChip
              key={category.label}
              label={category.label}
              icon={category.icon}
              active={selectedCategory === category.label}
              onClick={() => setSelectedCategory(category.label)}
            />
          ))}
        </div>

        {/* Listings Grid */}
        <div className="mb-16">
          {filteredListings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredListings.map((listing) => (
                <ListingCard
                  key={listing.id}
                  {...listing}
                  onClick={() => onNavigateListing?.(listing.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--surface-soft)]">
                <Package aria-hidden="true" className="h-8 w-8 text-[var(--ink-muted)]" focusable="false" />
              </div>
              <h3 className="mb-2">Nenhum anúncio encontrado</h3>
              <p className="text-[var(--ink-muted)] mb-4">
                Tente ajustar sua busca ou categorias
              </p>
            </div>
          )}
        </div>

        {/* Metrics */}
        <div className="mb-16 rounded-2xl bg-[var(--surface-soft)] py-16">
          <div className="text-center mb-12">
            <h2 className="mb-4">Comunidade ativa</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {metrics.map((metric, index) => (
              <MetricsCard key={index} value={metric.value} label={metric.label} />
            ))}
          </div>
        </div>

        {/* CTA Final */}
        <div className="text-center">
          <h2 className="mb-6">Descubra produtos e serviços</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-[var(--ink-body)]">
            Conecte-se com seus vizinhos e encontre o que você precisa com segurança e praticidade.
          </p>
          <div className="flex justify-center">
            <Button
              onClick={() => setHowItWorksOpen(true)}
              className="h-12 min-w-[180px] rounded-xl bg-brand-900 text-white hover:bg-brand-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
            >
              Como funciona
            </Button>
          </div>
        </div>
      </div>

      <HowItWorksModal open={howItWorksOpen} onClose={() => setHowItWorksOpen(false)} />
    </div>
  );
}
