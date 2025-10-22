import React, { useState } from 'react';
import { AppCard } from './AppCard';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Filter, Grid3x3, List } from 'lucide-react';

interface MarketplacePageProps {
  onOpenAppModal?: (app: any) => void;
}

export function MarketplacePage({ onOpenAppModal }: MarketplacePageProps) {
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');

  const allApps = [
    {
      name: 'PayFlow',
      description: 'Integração com principais bancos e gateways de pagamento para facilitar cobranças',
      category: 'Pagamentos & Bancos',
      rating: 4.8,
      isOfficial: true,
      price: 'free',
    },
    {
      name: 'SmartGate',
      description: 'Controle de acesso com QR code e reconhecimento facial para portaria moderna',
      category: 'Portaria & IoT',
      rating: 4.9,
      isOfficial: true,
      price: 'paid',
    },
    {
      name: 'ContaExata',
      description: 'Exportação automática para sistemas contábeis e fiscais',
      category: 'Contabilidade & Fiscal',
      rating: 4.7,
      isOfficial: false,
      price: 'paid',
    },
    {
      name: 'ReportPro',
      description: 'Relatórios avançados e dashboards personalizados para análise detalhada',
      category: 'Relatórios & BI',
      rating: 4.6,
      isOfficial: true,
      price: 'free',
    },
    {
      name: 'NotifyHub',
      description: 'Comunicação multicanal com moradores via SMS, e-mail e push',
      category: 'Comunicação',
      rating: 4.5,
      isOfficial: false,
      price: 'paid',
    },
    {
      name: 'ToolBox',
      description: 'Ferramentas utilitárias para o dia a dia do condomínio',
      category: 'Utilitários',
      rating: 4.4,
      isOfficial: false,
      price: 'free',
    },
    {
      name: 'BankSync',
      description: 'Sincronização automática de extratos bancários',
      category: 'Pagamentos & Bancos',
      rating: 4.7,
      isOfficial: true,
      price: 'paid',
    },
    {
      name: 'AccessControl Pro',
      description: 'Gestão completa de acessos e visitantes',
      category: 'Portaria & IoT',
      rating: 4.8,
      isOfficial: false,
      price: 'paid',
    },
    {
      name: 'TaxHelper',
      description: 'Calculadora automática de impostos e taxas condominiais',
      category: 'Contabilidade & Fiscal',
      rating: 4.3,
      isOfficial: false,
      price: 'free',
    },
    {
      name: 'DataViz',
      description: 'Visualização de dados e métricas em tempo real',
      category: 'Relatórios & BI',
      rating: 4.9,
      isOfficial: true,
      price: 'paid',
    },
    {
      name: 'BroadcastPro',
      description: 'Envio em massa de comunicados e avisos',
      category: 'Comunicação',
      rating: 4.2,
      isOfficial: false,
      price: 'free',
    },
    {
      name: 'QuickTools',
      description: 'Conjunto de utilitários para tarefas rápidas',
      category: 'Utilitários',
      rating: 4.6,
      isOfficial: false,
      price: 'free',
    },
  ];

  const categories = [
    'Todos',
    'Pagamentos & Bancos',
    'Portaria & IoT',
    'Contabilidade & Fiscal',
    'Relatórios & BI',
    'Comunicação',
    'Utilitários',
  ];

  const filteredApps = allApps.filter((app) => {
    const categoryMatch = categoryFilter === 'all' || app.category === categoryFilter;
    const priceMatch = priceFilter === 'all' || app.price === priceFilter;
    const ratingMatch =
      ratingFilter === 'all' ||
      (ratingFilter === '4+' && app.rating >= 4) ||
      (ratingFilter === '4.5+' && app.rating >= 4.5);
    
    return categoryMatch && priceMatch && ratingMatch;
  });

  return (
    <div className="w-full bg-[var(--bg-soft)] min-h-screen py-12">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-[40px] leading-[48px] mb-4">Marketplace de Apps</h1>
          <p className="text-xl text-[var(--ink-body)]">
            Expanda as funcionalidades do MeuCondomínio com integrações verificadas
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-[var(--shadow-sm)]">
          <div className="flex items-center gap-3 mb-6">
            <Filter className="w-5 h-5 text-[var(--ink-muted)]" />
            <h3 className="text-lg">Filtros</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--ink-body)]">Categoria</label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as categorias</SelectItem>
                  {categories.slice(1).map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--ink-body)]">Preço</label>
              <Select value={priceFilter} onValueChange={setPriceFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="free">Grátis</SelectItem>
                  <SelectItem value="paid">Pago</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--ink-body)]">Avaliação</label>
              <Select value={ratingFilter} onValueChange={setRatingFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="4+">4+ estrelas</SelectItem>
                  <SelectItem value="4.5+">4.5+ estrelas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {(categoryFilter !== 'all' || priceFilter !== 'all' || ratingFilter !== 'all') && (
            <div className="mt-4 pt-4 border-t border-[var(--border-soft)]">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setCategoryFilter('all');
                  setPriceFilter('all');
                  setRatingFilter('all');
                }}
                className="text-[var(--brand-primary)] hover:text-[var(--brand-primary-600)]"
              >
                Limpar filtros
              </Button>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-[var(--ink-body)]">
            <span className="font-bold">{filteredApps.length}</span> apps encontrados
          </p>
        </div>

        {/* Apps Grid */}
        {filteredApps.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredApps.map((app, index) => (
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
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-[var(--bg-soft)] rounded-full flex items-center justify-center mx-auto mb-4">
              <Grid3x3 className="w-8 h-8 text-[var(--ink-muted)]" />
            </div>
            <h3 className="mb-2">Nenhum app encontrado</h3>
            <p className="text-[var(--ink-muted)] mb-4">
              Tente ajustar os filtros para ver mais resultados
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setCategoryFilter('all');
                setPriceFilter('all');
                setRatingFilter('all');
              }}
            >
              Limpar filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
