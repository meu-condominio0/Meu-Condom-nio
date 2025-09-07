import { useState } from 'react';
import { Search, Filter, Clock, User, MessageSquare, ChevronRight } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface Comunicado {
  id: string;
  titulo: string;
  conteudo: string;
  autor: string;
  data: string;
  categoria: 'todos' | 'avisos' | 'manutencao' | 'eventos' | 'regras';
  prioridade: 'baixa' | 'media' | 'alta';
}

const comunicadosMock: Comunicado[] = [
  {
    id: '1',
    titulo: 'Manutenção na piscina',
    conteudo: 'Piscina estará interditada na próxima semana para manutenção preventiva do sistema de filtragem.',
    autor: 'Administração',
    data: 'Ontem',
    categoria: 'manutencao',
    prioridade: 'alta'
  },
  {
    id: '2',
    titulo: 'Feira orgânica',
    conteudo: 'Participe da feira que haverá neste sábado na área de lazer do condomínio.',
    autor: 'Síndico',
    data: '1 d',
    categoria: 'eventos',
    prioridade: 'media'
  },
  {
    id: '3',
    titulo: 'Uso da churrasqueira',
    conteudo: 'Lembramos as regras de utilização da churrasqueira: reserva prévia obrigatória e limpeza após o uso.',
    autor: 'Administração',
    data: '3 d',
    categoria: 'regras',
    prioridade: 'media'
  },
  {
    id: '4',
    titulo: 'Uso da área comum pets',
    conteudo: 'Recolha sempre as fezes dos animais e mantenha-os sempre na coleira dentro das dependências.',
    autor: 'Administração',
    data: '3 d',
    categoria: 'regras',
    prioridade: 'baixa'
  },
  {
    id: '5',
    titulo: 'Pintura fachada',
    conteudo: 'Dia 15/07 iniciaremos os serviços de pintura da fachada do prédio.',
    autor: 'Síndico',
    data: '4 d',
    categoria: 'manutencao',
    prioridade: 'alta'
  },
  {
    id: '6',
    titulo: 'Coleta de lixo eletrônico',
    conteudo: 'No próximo sábado haverá a coleta lixo eletrônico no térreo.',
    autor: 'Administração',
    data: '7 d',
    categoria: 'eventos',
    prioridade: 'media'
  }
];

export function PaginaComunicados() {
  const [termoBusca, setTermoBusca] = useState('');
  const [categoriaAtiva, setCategoriaAtiva] = useState('todos');

  const comunicadosFiltrados = comunicadosMock.filter((comunicado) => {
    const correspondeTermo = comunicado.titulo.toLowerCase().includes(termoBusca.toLowerCase()) ||
                           comunicado.conteudo.toLowerCase().includes(termoBusca.toLowerCase());
    const correspondeCategoria = categoriaAtiva === 'todos' || comunicado.categoria === categoriaAtiva;
    
    return correspondeTermo && correspondeCategoria;
  });

  const getPrioridadeBadge = (prioridade: string) => {
    const badges = {
      baixa: { variant: 'outline' as const, label: 'Baixa' },
      media: { variant: 'secondary' as const, label: 'Média' },
      alta: { variant: 'destructive' as const, label: 'Alta' }
    };
    return badges[prioridade as keyof typeof badges];
  };

  const getCategoriaNome = (categoria: string) => {
    const nomes = {
      todos: 'Todos',
      avisos: 'Avisos',
      manutencao: 'Manutenção',
      eventos: 'Eventos',
      regras: 'Regras'
    };
    return nomes[categoria as keyof typeof nomes];
  };

  return (
    <div className="space-y-8">
      <div>
        <h1>Comunicados</h1>
        <p className="text-muted-foreground">
          Fique informado sobre tudo que acontece no condomínio
        </p>
      </div>

      {/* Barra de busca */}
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Buscar comunicados..."
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
            className="pl-12 h-12 text-base"
          />
        </div>
        <Button variant="outline" className="gap-2 h-12 px-6">
          <Filter className="h-5 w-5" />
          Filtrar
        </Button>
      </div>

      {/* Abas de categorias */}
      <Tabs value={categoriaAtiva} onValueChange={setCategoriaAtiva}>
        <TabsList className="grid w-full grid-cols-5 h-12">
          <TabsTrigger value="todos">Todos</TabsTrigger>
          <TabsTrigger value="avisos">Avisos</TabsTrigger>
          <TabsTrigger value="manutencao">Manutenção</TabsTrigger>
          <TabsTrigger value="eventos">Eventos</TabsTrigger>
          <TabsTrigger value="regras">Regras</TabsTrigger>
        </TabsList>

        <TabsContent value={categoriaAtiva} className="space-y-6 mt-8">
          {comunicadosFiltrados.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto bg-accent/50 rounded-full flex items-center justify-center">
                    <MessageSquare className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <h4>Nenhum comunicado encontrado</h4>
                    <p className="text-muted-foreground">
                      Não há comunicados para os filtros selecionados.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            comunicadosFiltrados.map((comunicado) => (
              <Card key={comunicado.id} className="hover:shadow-lg transition-all duration-200 hover:scale-[1.01]">
                <CardHeader className="pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="mb-3 leading-tight">
                        {comunicado.titulo}
                      </CardTitle>
                      <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <div className="p-1 rounded-full bg-primary/10">
                            <User className="h-3 w-3 text-primary" />
                          </div>
                          <small>Por: {comunicado.autor}</small>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="p-1 rounded-full bg-primary/10">
                            <Clock className="h-3 w-3 text-primary" />
                          </div>
                          <small>Há: {comunicado.data}</small>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge {...getPrioridadeBadge(comunicado.prioridade)} className="px-3 py-1 whitespace-nowrap">
                        {getPrioridadeBadge(comunicado.prioridade).label}
                      </Badge>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="gap-2 text-muted-foreground hover:text-foreground"
                      >
                        Ver mais
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <p className="text-base leading-relaxed text-foreground">
                      {comunicado.conteudo}
                    </p>
                    
                    {/* Categoria badge */}
                    <div className="flex items-center gap-2 pt-2 border-t border-border">
                      <span className="text-sm text-muted-foreground">Categoria:</span>
                      <Badge variant="outline" className="px-2 py-1">
                        {getCategoriaNome(comunicado.categoria)}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}