import { useState } from 'react';
import { Star, TrendingUp, Filter, MessageSquare, User, Calendar, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '../ui/dialog';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { Progress } from '../ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface Avaliacao {
  id: string;
  morador: {
    nome: string;
    apartamento: string;
  };
  categoria: 'geral' | 'limpeza' | 'seguranca' | 'manutencao' | 'portaria' | 'administracao';
  nota: number;
  comentario: string;
  data: string;
  anonima: boolean;
  respondida: boolean;
  resposta?: string;
}

const avaliacoesMock: Avaliacao[] = [
  {
    id: '1',
    morador: { nome: 'Maria Santos', apartamento: '302' },
    categoria: 'limpeza',
    nota: 5,
    comentario: 'Excelente trabalho da equipe de limpeza. As áreas comuns estão sempre impecáveis.',
    data: '2024-05-20',
    anonima: false,
    respondida: true,
    resposta: 'Obrigado pelo feedback! Vamos continuar mantendo esse padrão de qualidade.'
  },
  {
    id: '2',
    morador: { nome: 'Anônimo', apartamento: '***' },
    categoria: 'seguranca',
    nota: 3,
    comentario: 'A portaria poderia ser mais rigorosa na identificação de visitantes.',
    data: '2024-05-18',
    anonima: true,
    respondida: true,
    resposta: 'Recebemos seu feedback e já orientamos a equipe para ser mais criteriosa nas identificações.'
  },
  {
    id: '3',
    morador: { nome: 'João Silva', apartamento: '1105' },
    categoria: 'manutencao',
    nota: 4,
    comentario: 'Manutenção rápida no elevador, mas poderia ter comunicado melhor sobre o prazo.',
    data: '2024-05-15',
    anonima: false,
    respondida: false
  },
  {
    id: '4',
    morador: { nome: 'Ana Costa', apartamento: '708' },
    categoria: 'administracao',
    nota: 5,
    comentario: 'Gestão transparente e eficiente. Parabenizo toda a equipe administrativa.',
    data: '2024-05-12',
    anonima: false,
    respondida: true,
    resposta: 'Muito obrigado! Trabalhamos sempre para melhorar nossos serviços.'
  },
  {
    id: '5',
    morador: { nome: 'Anônimo', apartamento: '***' },
    categoria: 'geral',
    nota: 2,
    comentario: 'Muitas obras e barulho durante horários inadequados.',
    data: '2024-05-10',
    anonima: true,
    respondida: false
  },
  {
    id: '6',
    morador: { nome: 'Carlos Oliveira', apartamento: '456' },
    categoria: 'portaria',
    nota: 5,
    comentario: 'Equipe da portaria sempre muito atenciosa e prestativa.',
    data: '2024-05-08',
    anonima: false,
    respondida: true,
    resposta: 'Fico feliz em saber que nosso atendimento está sendo bem avaliado!'
  }
];

const dadosDistribuicaoNotas = [
  { nota: '5 estrelas', quantidade: 15, cor: '#10b981' },
  { nota: '4 estrelas', quantidade: 8, cor: '#84cc16' },
  { nota: '3 estrelas', quantidade: 5, cor: '#f59e0b' },
  { nota: '2 estrelas', quantidade: 3, cor: '#f97316' },
  { nota: '1 estrela', quantidade: 1, cor: '#ef4444' }
];

const dadosPorCategoria = [
  { categoria: 'Limpeza', nota: 4.8, avaliacoes: 12 },
  { categoria: 'Portaria', nota: 4.6, avaliacoes: 8 },
  { categoria: 'Administração', nota: 4.4, avaliacoes: 6 },
  { categoria: 'Manutenção', nota: 4.1, avaliacoes: 9 },
  { categoria: 'Segurança', nota: 3.9, avaliacoes: 7 },
  { categoria: 'Geral', nota: 4.2, avaliacoes: 15 }
];

export function PaginaAvaliacao() {
  const [avaliacoes, setAvaliacoes] = useState(avaliacoesMock);
  const [filtroCategoria, setFiltroCategoria] = useState('todas');
  const [filtroPeriodo, setFiltroPeriodo] = useState('ultimo_mes');
  const [modalResposta, setModalResposta] = useState<string | null>(null);
  const [novaResposta, setNovaResposta] = useState('');

  const avaliacoesFiltradas = avaliacoes.filter(avaliacao => {
    const correspondeCategoria = filtroCategoria === 'todas' || avaliacao.categoria === filtroCategoria;
    return correspondeCategoria;
  });

  const notaMedia = avaliacoes.reduce((acc, av) => acc + av.nota, 0) / avaliacoes.length;
  const totalAvaliacoes = avaliacoes.length;
  const avaliacoesPositivas = avaliacoes.filter(av => av.nota >= 4).length;
  const percentualPositivas = Math.round((avaliacoesPositivas / totalAvaliacoes) * 100);

  const getCategoriaLabel = (categoria: string) => {
    const labels = {
      todas: 'Todas',
      geral: 'Geral',
      limpeza: 'Limpeza',
      seguranca: 'Segurança',
      manutencao: 'Manutenção',
      portaria: 'Portaria',
      administracao: 'Administração'
    };
    return labels[categoria as keyof typeof labels] || categoria;
  };

  const getCategoriaVariant = (categoria: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      geral: 'default',
      limpeza: 'outline',
      seguranca: 'destructive',
      manutencao: 'secondary',
      portaria: 'outline',
      administracao: 'default'
    };
    return variants[categoria] || 'outline';
  };

  const renderStars = (nota: number, tamanho: string = 'h-4 w-4') => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`${tamanho} ${i < nota ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  const handleResponder = (avaliacaoId: string) => {
    if (novaResposta.trim()) {
      setAvaliacoes(prev => prev.map(av => 
        av.id === avaliacaoId 
          ? { ...av, respondida: true, resposta: novaResposta }
          : av
      ));
      setModalResposta(null);
      setNovaResposta('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-foreground">Índice de Avaliação</h1>
        <p className="text-muted-foreground">
          Feedbacks e avaliações dos moradores sobre os serviços do condomínio
        </p>
      </div>

      {/* Métricas principais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Nota Geral
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-foreground">
                    {notaMedia.toFixed(1)}
                  </p>
                  <div className="flex">
                    {renderStars(Math.round(notaMedia), 'h-3 w-3')}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Baseado em {totalAvaliacoes} avaliações
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-yellow-500/10">
                <Star className="h-5 w-5 text-yellow-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Avaliações Positivas
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {percentualPositivas}%
                </p>
                <p className="text-xs text-muted-foreground">
                  {avaliacoesPositivas} de {totalAvaliacoes}
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-green-500/10">
                <ThumbsUp className="h-5 w-5 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Pendentes
                </p>
                <p className="text-2xl font-bold text-orange-600">
                  {avaliacoes.filter(av => !av.respondida).length}
                </p>
                <p className="text-xs text-muted-foreground">
                  Aguardando resposta
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-orange-500/10">
                <MessageSquare className="h-5 w-5 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Taxa Resposta
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {Math.round((avaliacoes.filter(av => av.respondida).length / totalAvaliacoes) * 100)}%
                </p>
                <p className="text-xs text-muted-foreground">
                  Respondidas
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-blue-500/10">
                <TrendingUp className="h-5 w-5 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribuição de notas */}
        <Card>
          <CardHeader>
            <CardTitle>Distribuição das Notas</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dadosDistribuicaoNotas}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="quantidade"
                  label={(entry) => `${entry.nota}: ${entry.quantidade}`}
                >
                  {dadosDistribuicaoNotas.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.cor} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Notas por categoria */}
        <Card>
          <CardHeader>
            <CardTitle>Avaliação por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dadosPorCategoria}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="categoria" fontSize={12} />
                <YAxis domain={[0, 5]} />
                <Tooltip formatter={(value: any) => [`${value.toFixed(1)} estrelas`, 'Nota Média']} />
                <Bar dataKey="nota" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Categoria</Label>
              <Select value={filtroCategoria} onValueChange={setFiltroCategoria}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas as categorias</SelectItem>
                  <SelectItem value="geral">Geral</SelectItem>
                  <SelectItem value="limpeza">Limpeza</SelectItem>
                  <SelectItem value="seguranca">Segurança</SelectItem>
                  <SelectItem value="manutencao">Manutenção</SelectItem>
                  <SelectItem value="portaria">Portaria</SelectItem>
                  <SelectItem value="administracao">Administração</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Período</Label>
              <Select value={filtroPeriodo} onValueChange={setFiltroPeriodo}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ultima_semana">Última semana</SelectItem>
                  <SelectItem value="ultimo_mes">Último mês</SelectItem>
                  <SelectItem value="ultimos_3_meses">Últimos 3 meses</SelectItem>
                  <SelectItem value="ultimo_ano">Último ano</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de avaliações */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Avaliações Recentes</h2>
          <Badge variant="outline">{avaliacoesFiltradas.length} avaliações</Badge>
        </div>

        <div className="space-y-4">
          {avaliacoesFiltradas.map((avaliacao) => (
            <Card key={avaliacao.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="space-y-4">
                  {/* Header da avaliação */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>
                          {avaliacao.anonima ? '?' : avaliacao.morador.nome.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          {avaliacao.anonima ? 'Avaliação Anônima' : avaliacao.morador.nome}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>Apt {avaliacao.morador.apartamento}</span>
                          <span>•</span>
                          <span>{new Date(avaliacao.data).toLocaleDateString('pt-BR')}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge variant={getCategoriaVariant(avaliacao.categoria)}>
                        {getCategoriaLabel(avaliacao.categoria)}
                      </Badge>
                      <div className="flex items-center gap-1">
                        {renderStars(avaliacao.nota)}
                        <span className="text-sm font-medium ml-1">{avaliacao.nota}</span>
                      </div>
                    </div>
                  </div>

                  {/* Comentário */}
                  <div className="bg-accent/30 rounded-lg p-3">
                    <p className="text-sm text-foreground">
                      {avaliacao.comentario}
                    </p>
                  </div>

                  {/* Resposta (se houver) */}
                  {avaliacao.respondida && avaliacao.resposta && (
                    <>
                      <Separator />
                      <div className="bg-primary/5 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                            <User className="h-3 w-3 text-primary-foreground" />
                          </div>
                          <span className="text-sm font-medium">Administração</span>
                          <Badge variant="outline" className="text-xs">Respondido</Badge>
                        </div>
                        <p className="text-sm text-foreground">
                          {avaliacao.resposta}
                        </p>
                      </div>
                    </>
                  )}

                  {/* Botão de resposta */}
                  {!avaliacao.respondida && (
                    <div className="flex justify-end">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-3 w-3 mr-2" />
                            Responder
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Responder Avaliação</DialogTitle>
                            <DialogDescription>
                              Responda à avaliação do morador para manter um bom relacionamento e esclarecer questões.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="bg-accent/30 rounded-lg p-3">
                              <p className="text-sm text-foreground">
                                {avaliacao.comentario}
                              </p>
                            </div>
                            <div className="space-y-2">
                              <Label>Sua resposta</Label>
                              <Textarea
                                value={novaResposta}
                                onChange={(e) => setNovaResposta(e.target.value)}
                                placeholder="Digite sua resposta..."
                                rows={4}
                              />
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                className="flex-1"
                                onClick={() => {
                                  setModalResposta(null);
                                  setNovaResposta('');
                                }}
                              >
                                Cancelar
                              </Button>
                              <Button
                                className="flex-1"
                                onClick={() => handleResponder(avaliacao.id)}
                                disabled={!novaResposta.trim()}
                              >
                                Enviar Resposta
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}