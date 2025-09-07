import { useState } from 'react';
import { Search, Plus, Star, MapPin, Phone, MessageCircle, Heart, Filter } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { usarContextoApp } from '../../contexts/AppContext';

interface ItemMarketplace {
  id: string;
  titulo: string;
  descricao: string;
  preco?: number;
  categoria: 'servicos' | 'vendas' | 'trocas';
  subcategoria: string;
  vendedor: {
    nome: string;
    apartamento: string;
    avaliacao: number;
    totalAvaliacoes: number;
  };
  imagens: string[];
  dataPublicacao: string;
  favoritos: number;
  contato: {
    telefone?: string;
    whatsapp?: string;
  };
  status: 'ativo' | 'vendido' | 'pausado';
}

const itensMock: ItemMarketplace[] = [
  {
    id: '1',
    titulo: 'Limpeza Residencial',
    descricao: 'Serviço de limpeza completa para apartamentos. Experiência de 5 anos, produtos próprios inclusos.',
    categoria: 'servicos',
    subcategoria: 'Limpeza',
    vendedor: {
      nome: 'Maria Santos',
      apartamento: '205',
      avaliacao: 4.8,
      totalAvaliacoes: 12
    },
    imagens: ['https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop'],
    dataPublicacao: '3 dias',
    favoritos: 8,
    contato: {
      telefone: '(11) 99999-9999',
      whatsapp: '(11) 99999-9999'
    },
    status: 'ativo'
  },
  {
    id: '2',
    titulo: 'Sofá 3 Lugares - Estado de Novo',
    descricao: 'Sofá 3 lugares cor cinza, pouco uso. Medidas: 2,10m x 0,90m x 0,85m. Motivo da venda: mudança.',
    preco: 800,
    categoria: 'vendas',
    subcategoria: 'Móveis',
    vendedor: {
      nome: 'Carlos Oliveira',
      apartamento: '1103',
      avaliacao: 4.5,
      totalAvaliacoes: 7
    },
    imagens: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop'],
    dataPublicacao: '1 semana',
    favoritos: 15,
    contato: {
      whatsapp: '(11) 98888-8888'
    },
    status: 'ativo'
  },
  {
    id: '3',
    titulo: 'Aulas de Violão',
    descricao: 'Professor de violão há 8 anos. Aulas particulares em domicílio ou online. Todos os níveis.',
    preco: 60,
    categoria: 'servicos',
    subcategoria: 'Educação',
    vendedor: {
      nome: 'João Música',
      apartamento: '402',
      avaliacao: 5.0,
      totalAvaliacoes: 20
    },
    imagens: ['https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop'],
    dataPublicacao: '5 dias',
    favoritos: 12,
    contato: {
      telefone: '(11) 97777-7777',
      whatsapp: '(11) 97777-7777'
    },
    status: 'ativo'
  },
  {
    id: '4',
    titulo: 'Troco: Livros de Ficção por Romance',
    descricao: 'Tenho uma coleção de livros de ficção científica e fantasia. Gostaria de trocar por livros de romance.',
    categoria: 'trocas',
    subcategoria: 'Livros',
    vendedor: {
      nome: 'Ana Leitora',
      apartamento: '708',
      avaliacao: 4.7,
      totalAvaliacoes: 5
    },
    imagens: ['https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop'],
    dataPublicacao: '2 dias',
    favoritos: 3,
    contato: {
      whatsapp: '(11) 96666-6666'
    },
    status: 'ativo'
  },
  {
    id: '5',
    titulo: 'Costura e Ajustes de Roupas',
    descricao: 'Serviços de costura: ajustes, barra de calças, consertos diversos. Atendimento em casa.',
    preco: 25,
    categoria: 'servicos',
    subcategoria: 'Costura',
    vendedor: {
      nome: 'Dona Rosa',
      apartamento: '304',
      avaliacao: 4.9,
      totalAvaliacoes: 25
    },
    imagens: ['https://images.unsplash.com/photo-1558618666-fdcd85c81cd6?w=400&h=300&fit=crop'],
    dataPublicacao: '1 dia',
    favoritos: 6,
    contato: {
      telefone: '(11) 95555-5555'
    },
    status: 'ativo'
  }
];

export function PaginaMarketplace() {
  const { usuarioLogado } = usarContextoApp();
  const [itens, setItens] = useState(itensMock);
  const [termoBusca, setTermoBusca] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('todas');
  const [modalNovoItem, setModalNovoItem] = useState(false);
  const [novoItem, setNovoItem] = useState({
    titulo: '',
    descricao: '',
    preco: '',
    categoria: '',
    subcategoria: '',
    telefone: '',
    whatsapp: ''
  });

  const itensFiltrados = itens.filter(item => {
    const correspondeTermo = item.titulo.toLowerCase().includes(termoBusca.toLowerCase()) ||
                           item.descricao.toLowerCase().includes(termoBusca.toLowerCase());
    const correspondeCategoria = categoriaFiltro === 'todas' || item.categoria === categoriaFiltro;
    
    return correspondeTermo && correspondeCategoria;
  });

  const getCategoriaNome = (categoria: string) => {
    const nomes = {
      todas: 'Todas',
      servicos: 'Serviços',
      vendas: 'Vendas',
      trocas: 'Trocas'
    };
    return nomes[categoria as keyof typeof nomes];
  };

  const getCategoriaVariant = (categoria: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      servicos: 'default',
      vendas: 'secondary',
      trocas: 'outline'
    };
    return variants[categoria] || 'outline';
  };

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  const handleNovoItem = () => {
    if (novoItem.titulo && novoItem.descricao && novoItem.categoria) {
      const item: ItemMarketplace = {
        id: (itens.length + 1).toString(),
        titulo: novoItem.titulo,
        descricao: novoItem.descricao,
        preco: novoItem.preco ? parseFloat(novoItem.preco) : undefined,
        categoria: novoItem.categoria as any,
        subcategoria: novoItem.subcategoria || 'Outros',
        vendedor: {
          nome: usuarioLogado?.nome || 'Morador',
          apartamento: usuarioLogado?.apartamento || 'N/A',
          avaliacao: 5.0,
          totalAvaliacoes: 0
        },
        imagens: ['https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop'],
        dataPublicacao: 'agora',
        favoritos: 0,
        contato: {
          telefone: novoItem.telefone || undefined,
          whatsapp: novoItem.whatsapp || undefined
        },
        status: 'ativo'
      };

      setItens([item, ...itens]);
      setModalNovoItem(false);
      setNovoItem({
        titulo: '',
        descricao: '',
        preco: '',
        categoria: '',
        subcategoria: '',
        telefone: '',
        whatsapp: ''
      });
    }
  };

  const renderStars = (avaliacao: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${i < Math.floor(avaliacao) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Marketplace Local</h2>
          <p className="text-muted-foreground">
            Compre, venda e troque com seus vizinhos
          </p>
        </div>
        
        <Dialog open={modalNovoItem} onOpenChange={setModalNovoItem}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Novo Anúncio
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Criar Novo Anúncio</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="titulo">Título</Label>
                  <Input
                    id="titulo"
                    value={novoItem.titulo}
                    onChange={(e) => setNovoItem({...novoItem, titulo: e.target.value})}
                    placeholder="Ex: Aulas de inglês"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="categoria">Categoria</Label>
                  <Select value={novoItem.categoria} onValueChange={(value) => setNovoItem({...novoItem, categoria: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="servicos">Serviços</SelectItem>
                      <SelectItem value="vendas">Vendas</SelectItem>
                      <SelectItem value="trocas">Trocas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="subcategoria">Subcategoria</Label>
                  <Input
                    id="subcategoria"
                    value={novoItem.subcategoria}
                    onChange={(e) => setNovoItem({...novoItem, subcategoria: e.target.value})}
                    placeholder="Ex: Educação, Limpeza, Móveis"
                  />
                </div>

                {novoItem.categoria !== 'trocas' && (
                  <div className="space-y-2">
                    <Label htmlFor="preco">Preço (R$)</Label>
                    <Input
                      id="preco"
                      type="number"
                      value={novoItem.preco}
                      onChange={(e) => setNovoItem({...novoItem, preco: e.target.value})}
                      placeholder="0,00"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea
                  id="descricao"
                  value={novoItem.descricao}
                  onChange={(e) => setNovoItem({...novoItem, descricao: e.target.value})}
                  placeholder="Descreva seu produto ou serviço..."
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone (opcional)</Label>
                  <Input
                    id="telefone"
                    value={novoItem.telefone}
                    onChange={(e) => setNovoItem({...novoItem, telefone: e.target.value})}
                    placeholder="(11) 99999-9999"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp (opcional)</Label>
                  <Input
                    id="whatsapp"
                    value={novoItem.whatsapp}
                    onChange={(e) => setNovoItem({...novoItem, whatsapp: e.target.value})}
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setModalNovoItem(false)}
                >
                  Cancelar
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleNovoItem}
                  disabled={!novoItem.titulo || !novoItem.descricao || !novoItem.categoria}
                >
                  Publicar Anúncio
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filtros e busca */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar produtos e serviços..."
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filtros
        </Button>
      </div>

      {/* Abas por categoria */}
      <Tabs value={categoriaFiltro} onValueChange={setCategoriaFiltro}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="todas">Todas</TabsTrigger>
          <TabsTrigger value="servicos">Serviços</TabsTrigger>
          <TabsTrigger value="vendas">Vendas</TabsTrigger>
          <TabsTrigger value="trocas">Trocas</TabsTrigger>
        </TabsList>

        <TabsContent value={categoriaFiltro} className="space-y-4">
          {itensFiltrados.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">
                  Nenhum item encontrado para os filtros selecionados.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {itensFiltrados.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow">
                  <div className="relative">
                    <ImageWithFallback
                      src={item.imagens[0]}
                      alt={item.titulo}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge variant={getCategoriaVariant(item.categoria)}>
                        {getCategoriaNome(item.categoria)}
                      </Badge>
                    </div>
                    <div className="absolute top-2 right-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 bg-white/80 hover:bg-white">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-base line-clamp-1">{item.titulo}</CardTitle>
                      {item.preco && (
                        <div className="text-lg font-bold text-green-600">
                          {formatarMoeda(item.preco)}
                          {item.categoria === 'servicos' && (
                            <span className="text-xs font-normal text-muted-foreground">/aula</span>
                          )}
                        </div>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {item.descricao}
                    </p>

                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">
                          {item.vendedor.nome.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {item.vendedor.nome}
                        </p>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            {renderStars(item.vendedor.avaliacao)}
                            <span className="text-xs text-muted-foreground">
                              ({item.vendedor.totalAvaliacoes})
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              Apt {item.vendedor.apartamento}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Publicado há {item.dataPublicacao}</span>
                      <div className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        <span>{item.favoritos}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 gap-1">
                        <MessageCircle className="h-3 w-3" />
                        Chat
                      </Button>
                      {item.contato.whatsapp && (
                        <Button size="sm" className="flex-1 gap-1 bg-green-600 hover:bg-green-700">
                          WhatsApp
                        </Button>
                      )}
                      {item.contato.telefone && !item.contato.whatsapp && (
                        <Button size="sm" className="flex-1 gap-1">
                          <Phone className="h-3 w-3" />
                          Ligar
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}