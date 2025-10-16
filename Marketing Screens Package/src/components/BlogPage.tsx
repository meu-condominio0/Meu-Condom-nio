import React, { useState } from 'react';
import { BlogCard } from './BlogCard';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search } from 'lucide-react';

interface BlogPageProps {
  onOpenPost?: (postId: number) => void;
}

export function BlogPage({ onOpenPost }: BlogPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  
  const blogPosts = [
    {
      id: 1,
      title: 'Síndico profissional: o que muda na prática?',
      image: 'https://images.unsplash.com/photo-1581065178047-8ee15951ede6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MDM5MTUwN3ww&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Gestão',
      date: '10 Out 2025',
      snippet: 'Entenda as responsabilidades, direitos e principais desafios de quem assume a gestão profissional de condomínios.',
    },
    {
      id: 2,
      title: 'Como reduzir inadimplência em 30 dias (sem briga)',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNlJTIwcGxhbm5pbmd8ZW58MXx8fHwxNzYwNTA0MTEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Financeiro',
      date: '8 Out 2025',
      snippet: 'Estratégias práticas e comunicação eficaz para reduzir a inadimplência sem criar atritos com moradores.',
    },
    {
      id: 3,
      title: 'Portaria digital: do QR à liberação 1-toque',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjA1MDIyNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Tecnologia',
      date: '5 Out 2025',
      snippet: 'Como a tecnologia está transformando o controle de acesso em condomínios e trazendo mais segurança.',
    },
    {
      id: 4,
      title: 'Assembleia digital: guia completo para síndicos',
      image: 'https://images.unsplash.com/photo-1709715357520-5e1047a2b691?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRlYW0lMjBtZWV0aW5nfGVufDF8fHx8MTc2MDQ1NzA5MHww&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Gestão',
      date: '1 Out 2025',
      snippet: 'Tudo que você precisa saber para realizar assembleias online legalmente e com participação efetiva.',
    },
    {
      id: 5,
      title: 'Sustentabilidade em condomínios: por onde começar?',
      image: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBidWlsZGluZ3xlbnwxfHx8fDE3NjA0NzcxMjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Sustentabilidade',
      date: '28 Set 2025',
      snippet: 'Ações práticas e econômicas para tornar seu condomínio mais sustentável e reduzir custos.',
    },
    {
      id: 6,
      title: 'LGPD em condomínios: o que você precisa saber',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9nJTIwd3JpdGluZ3xlbnwxfHx8fDE3NjA1MDQwODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Legislação',
      date: '25 Set 2025',
      snippet: 'Como adequar a gestão de dados do condomínio à Lei Geral de Proteção de Dados e evitar problemas.',
    },
    {
      id: 7,
      title: 'Reservas de espaços: como evitar conflitos',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWxlbmRhciUyMGJvb2tpbmd8ZW58MXx8fHwxNzYwNTAyODcxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Gestão',
      date: '22 Set 2025',
      snippet: 'Estratégias e regras claras para organizar o uso de áreas comuns sem gerar discussões.',
    },
    {
      id: 8,
      title: 'Terceirização em condomínios: vantagens e cuidados',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW9wbGUlMjB3b3JraW5nJTIwdG9nZXRoZXJ8ZW58MXx8fHwxNzYwNDM0NDIxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Gestão',
      date: '18 Set 2025',
      snippet: 'Quando terceirizar serviços faz sentido e como escolher os melhores fornecedores.',
    },
    {
      id: 9,
      title: 'Fundo de reserva: quanto e como poupar?',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBkYXNoYm9hcmR8ZW58MXx8fHwxNzYwNDM3NDk1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Financeiro',
      date: '15 Set 2025',
      snippet: 'Guia completo para criar e manter um fundo de reserva saudável para emergências e obras.',
    },
    {
      id: 10,
      title: 'Como criar um mercado interno seguro no seu condomínio',
      image: 'https://images.unsplash.com/photo-1602574237777-fef4326708cb?w=800',
      category: 'Gestão',
      date: '12 Set 2025',
      snippet: 'Implemente um marketplace de moradores com regras claras e proteção para comprador e vendedor.',
    },
    {
      id: 11,
      title: 'Pagamento protegido: boas práticas para vizinhos',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800',
      category: 'Financeiro',
      date: '10 Set 2025',
      snippet: 'Entenda como funciona o sistema de pagamento protegido e evite problemas nas transações.',
    },
    {
      id: 12,
      title: 'Marketplace de serviços: diarista, aulas, pet e manutenção sem sair do app',
      image: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800',
      category: 'Tecnologia',
      date: '8 Set 2025',
      snippet: 'Descubra como contratar serviços de vizinhos confiáveis direto pelo app do condomínio.',
    },
  ];

  const categories = ['Todos', 'Gestão', 'Financeiro', 'Tecnologia', 'Sustentabilidade', 'Legislação'];
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'Todos' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.snippet.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full bg-white py-12">
      <div className="container-custom">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="mb-4">Novidades</h1>
          <p className="text-xl text-[var(--ink-body)] max-w-3xl mx-auto">
            Dicas, guias e insights para síndicos e administradores de condomínios
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12 space-y-6">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--ink-muted)]" />
              <Input
                type="text"
                placeholder="Buscar artigos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14"
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? 'bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-600)] text-white'
                    : 'border-[var(--border-soft)] text-[var(--ink-body)] hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]'
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => onOpenPost?.(post.id)}
                className="cursor-pointer"
              >
                <div className="group flex flex-col gap-4 rounded-2xl overflow-hidden bg-white border border-[var(--border-soft)] hover:shadow-[var(--shadow-lg)] transition-all duration-300 h-full">
                  <div className="aspect-[16/10] overflow-hidden bg-[var(--bg-soft)]">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 pt-0 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-bold text-[var(--brand-primary)] uppercase tracking-wide">
                        {post.category}
                      </span>
                      <span className="text-xs text-[var(--ink-muted)]">{post.date}</span>
                    </div>
                    <h4 className="mb-3">{post.title}</h4>
                    <p className="text-sm text-[var(--ink-body)] mb-4 flex-1">{post.snippet}</p>
                    <button className="text-[var(--brand-primary)] font-bold group-hover:gap-3 transition-all duration-200 flex items-center gap-2">
                      Ler artigo completo
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-[var(--bg-soft)] rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-[var(--ink-muted)]" />
            </div>
            <h3 className="mb-2">Nenhum artigo encontrado</h3>
            <p className="text-[var(--ink-muted)] mb-4">
              Tente ajustar sua busca ou filtros
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Todos');
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
