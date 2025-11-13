import { useState, useEffect } from 'react';
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

// ✅ URL base da API do backend
const API_URL = '/api/marketplace';

// ✅ Função que converte o objeto vindo do backend → ItemMarketplace do front
const mapFromApi = (item: any): ItemMarketplace => {
  // Backend envia "imagens" como string separada por vírgula ou null
  let listaImagens: string[] = [];

  if (item.imagens) {
    if (typeof item.imagens === "string") {
      listaImagens = item.imagens
        .split(",")
        .map((img: string) => img.trim())
        .filter((img: string) => img.length > 0)
        .map((img: string) =>
          img.startsWith("http")
            ? img
            : `${import.meta.env.VITE_API_URL || "http://localhost:8000"}/uploads/marketplace/${img}`
        );
    } else if (Array.isArray(item.imagens)) {
      listaImagens = item.imagens.map((img: string) =>
        img.startsWith("http")
          ? img
          : `${import.meta.env.VITE_API_URL || "http://localhost:8000"}/uploads/marketplace/${img}`
      );
    }
  }

  // se não tiver imagens, usa placeholder
  if (listaImagens.length === 0) {
    listaImagens = [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
    ];
  }

  return {
    id: String(item.id_anuncio),
    titulo: item.titulo,
    descricao: item.descricao,
    preco: item.preco ?? undefined,
    categoria: item.categoria,
    subcategoria: item.subcategoria ?? "Outros",

    vendedor: {
      nome: item.nome_vendedor,
      apartamento: item.apartamento_vendedor,
      avaliacao: item.avaliacao ?? 5.0,
      totalAvaliacoes: item.total_avaliacoes ?? 0,
    },

    imagens: listaImagens, // << AGORA VAI TODAS AS IMAGENS CORRETAS

    dataPublicacao: item.data_publicacao
      ? new Date(item.data_publicacao).toLocaleDateString("pt-BR")
      : "agora",

    favoritos: item.favoritos ?? 0,

    contato: {
      telefone: item.telefone || null,
      whatsapp: item.whatsapp || null,
    },

    status: item.status ?? "ativo",
  };
};

export function PaginaMarketplace({
  onAbrirDetalhes,
}: {
  onAbrirDetalhes?: (item: any) => void;
}) {
  const { usuarioLogado } = usarContextoApp();


  // ✅ Agora começa vazio: quem alimenta é o backend
  const [itens, setItens] = useState<ItemMarketplace[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imagens, setImagens] = useState<File[]>([]);
  


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
    whatsapp: '',
  });

  // ✅ Carrega anúncios do backend ao montar a tela
  useEffect(() => {
    const carregarAnuncios = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Erro ao carregar anúncios');
        }

        const data = await response.json();
        setItens(data.map(mapFromApi));
      } catch (err) {
        console.error('Erro ao carregar anúncios:', err);
        setError('Falha ao carregar anúncios. Verifique a conexão com o backend.');
      } finally {
        setLoading(false);
      }
    };

    carregarAnuncios();
  }, []);

  const itensFiltrados = itens.filter((item) => {
    const correspondeTermo =
      item.titulo.toLowerCase().includes(termoBusca.toLowerCase()) ||
      item.descricao.toLowerCase().includes(termoBusca.toLowerCase());

    const correspondeCategoria =
      categoriaFiltro === 'todas' || item.categoria === (categoriaFiltro as any);

    return correspondeTermo && correspondeCategoria;
  });

  const getCategoriaNome = (categoria: string) => {
    const nomes = {
      todas: 'Todas',
      servicos: 'Serviços',
      vendas: 'Vendas',
      trocas: 'Trocas',
    };
    return nomes[categoria as keyof typeof nomes];
  };

  const getCategoriaVariant = (
    categoria: string
  ): 'default' | 'secondary' | 'destructive' | 'outline' => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      servicos: 'default',
      vendas: 'secondary',
      trocas: 'outline',
    };
    return variants[categoria] || 'outline';
  };

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  };

const handleNovoItem = async () => {
  if (!novoItem.titulo || !novoItem.descricao || !novoItem.categoria) {
    alert("Preencha título, descrição e categoria");
    return;
  }

  if (imagens.length === 0) {
    alert("Selecione ao menos 1 imagem.");
    return;
  }

  if (imagens.length > 5) {
    alert("Máximo permitido: 5 imagens.");
    return;
  }

  // Criando FormData correto
  const formData = new FormData();

  // CAMPOS DE TEXTO — cada um separado
  formData.append("titulo", novoItem.titulo);
  formData.append("descricao", novoItem.descricao);
  formData.append("preco", novoItem.preco ? String(novoItem.preco) : "");
  formData.append("categoria", novoItem.categoria);
  formData.append("subcategoria", novoItem.subcategoria || "");
  formData.append("telefone", novoItem.telefone || "");
  formData.append("whatsapp", novoItem.whatsapp || "");
  formData.append("nome_vendedor", usuarioLogado?.nome || "Morador");
  formData.append("apartamento_vendedor", usuarioLogado?.apartamento || "N/A");

  // IMAGENS — até 5
  imagens.forEach((file) => {
    formData.append("imagens", file);
  });

  try {
    const response = await fetch(`${API_URL}/`, {
      method: "POST",
      body: formData, // NÃO colocar headers!!
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      console.error("Erro ao criar anúncio:", error);
      alert(error?.detail || "Erro ao criar anúncio.");
      return;
    }

    const novo = await response.json();
    const itemFormatado = mapFromApi(novo);

    setItens((prev) => [itemFormatado, ...prev]);

    setModalNovoItem(false);

    setNovoItem({
      titulo: "",
      descricao: "",
      preco: "",
      categoria: "",
      subcategoria: "",
      telefone: "",
      whatsapp: "",
    });

    setImagens([]);

  } catch (err) {
    console.error("Erro ao criar anúncio:", err);
    alert("Erro de conexão com o servidor. Tente novamente.");
  }
};


  const renderStars = (avaliacao: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < Math.floor(avaliacao) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  // ✅ Tratamento de loading/erro (igual outras telas)
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Carregando anúncios do marketplace...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64 p-4 text-center text-red-600 bg-red-50 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Marketplace Local</h2>
          <p className="text-muted-foreground">Compre, venda e troque com seus vizinhos</p>
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
                    onChange={(e) => setNovoItem({ ...novoItem, titulo: e.target.value })}
                    placeholder="Ex: Aulas de inglês"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="categoria">Categoria</Label>
                  <Select
                    value={novoItem.categoria}
                    onValueChange={(value) => setNovoItem({ ...novoItem, categoria: value })}
                  >
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
                    onChange={(e) =>
                      setNovoItem({ ...novoItem, subcategoria: e.target.value })
                    }
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
                      onChange={(e) => setNovoItem({ ...novoItem, preco: e.target.value })}
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
                  onChange={(e) =>
                    setNovoItem({ ...novoItem, descricao: e.target.value })
                  }
                  placeholder="Descreva seu produto ou serviço..."
                  rows={4}
                />
              </div>

{/* UPLOAD DE IMAGENS */}
<div className="space-y-2">
  <Label>Imagens do anúncio (máx. 5)</Label>

  <input
    type="file"
    accept="image/*"
    multiple
    onChange={(e) => {
      const files = Array.from(e.target.files || []);
      if (files.length + imagens.length > 5) {
        alert("Máximo de 5 imagens!");
        return;
      }
      setImagens((prev) => [...prev, ...files]);
    }}
    className="block w-full text-sm text-muted-foreground
               file:mr-4 file:py-2 file:px-4
               file:rounded-md file:border-0
               file:text-sm file:font-medium
               file:bg-primary file:text-primary-foreground
               hover:file:bg-primary/90
              "
  />

  {/* PRÉ-VISUALIZAÇÃO */}
  {imagens.length > 0 && (
    <div className="grid grid-cols-3 gap-3 mt-2">
      {imagens.map((img, index) => (
        <div key={index} className="relative group">
          <img
            src={URL.createObjectURL(img)}
            alt={`preview-${index}`}
            className="w-full h-24 object-cover rounded-md border"
          />

          {/* BOTÃO REMOVER */}
          <button
            onClick={() =>
              setImagens((prev) => prev.filter((_, i) => i !== index))
            }
            className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1
                       rounded opacity-0 group-hover:opacity-100 transition"
          >
            X
          </button>
        </div>
      ))}
    </div>
  )}
</div>


              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone (opcional)</Label>
                  <Input
                    id="telefone"
                    value={novoItem.telefone}
                    onChange={(e) =>
                      setNovoItem({ ...novoItem, telefone: e.target.value })
                    }
                    placeholder="(11) 99999-9999"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp (opcional)</Label>
                  <Input
                    id="whatsapp"
                    value={novoItem.whatsapp}
                    onChange={(e) =>
                      setNovoItem({ ...novoItem, whatsapp: e.target.value })
                    }
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
                  disabled={
                    !novoItem.titulo || !novoItem.descricao || !novoItem.categoria
                  }
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
  <Card 
    key={item.id} 
    className="hover:shadow-md transition-shadow cursor-pointer"
  >

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
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 bg-white/80 hover:bg-white"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-base line-clamp-1">
                        {item.titulo}
                      </CardTitle>
                      {item.preco && (
                        <div className="text-lg font-bold text-green-600">
                          {formatarMoeda(item.preco)}
                          {item.categoria === 'servicos' && (
                            <span className="text-xs font-normal text-muted-foreground">
                              /aula
                            </span>
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
                          {item.vendedor.nome
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
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
                      <span>Publicado em {item.dataPublicacao}</span>
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
                        <Button
                          size="sm"
                          className="flex-1 gap-1 bg-green-600 hover:bg-green-700"
                        >
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

                    {/* Botão ver detalhes */}
<Button
  size="sm"
  variant="secondary"
  className="w-full mt-2"
  onClick={() => onAbrirDetalhes?.(item)}
>
  Ver detalhes
</Button>

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
