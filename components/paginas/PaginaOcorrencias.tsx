import { useState } from 'react';
import { Search, Plus, MessageSquare, Clock, CheckCircle, AlertTriangle, User, Calendar } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { usarContextoApp } from '../../contexts/AppContext';

interface Ocorrencia {
  id: string;
  titulo: string;
  descricao: string;
  categoria: 'barulho' | 'manutencao' | 'limpeza' | 'seguranca' | 'elevador' | 'outros';
  status: 'aberta' | 'em_andamento' | 'resolvida' | 'cancelada';
  prioridade: 'baixa' | 'media' | 'alta';
  dataAbertura: string;
  dataResolucao?: string;
  morador: string;
  apartamento: string;
  respostas: {
    id: string;
    autor: string;
    cargo: string;
    mensagem: string;
    data: string;
  }[];
}

const ocorrenciasMock: Ocorrencia[] = [
  {
    id: '1',
    titulo: 'Barulho excessivo no apartamento 401',
    descricao: 'Vizinhos fazendo barulho após 22h, prejudicando o descanso dos demais moradores.',
    categoria: 'barulho',
    status: 'em_andamento',
    prioridade: 'media',
    dataAbertura: '20/05/2024',
    morador: 'João Silva',
    apartamento: '302',
    respostas: [
      {
        id: '1',
        autor: 'Administração',
        cargo: 'Síndico',
        mensagem: 'Recebemos sua solicitação e já entramos em contato com o morador do apartamento 401. Vamos acompanhar a situação.',
        data: '20/05/2024 14:30'
      }
    ]
  },
  {
    id: '2',
    titulo: 'Vazamento na área da piscina',
    descricao: 'Há um vazamento visível próximo ao filtro da piscina, causando desperdício de água.',
    categoria: 'manutencao',
    status: 'resolvida',
    prioridade: 'alta',
    dataAbertura: '18/05/2024',
    dataResolucao: '19/05/2024',
    morador: 'João Silva',
    apartamento: '302',
    respostas: [
      {
        id: '1',
        autor: 'Administração',
        cargo: 'Síndico',
        mensagem: 'Agendamos o técnico para amanhã pela manhã. Obrigado por reportar.',
        data: '18/05/2024 10:15'
      },
      {
        id: '2',
        autor: 'Administração',
        cargo: 'Síndico',
        mensagem: 'Problema resolvido! O técnico trocou a vedação do filtro. Piscina normalizada.',
        data: '19/05/2024 11:45'
      }
    ]
  },
  {
    id: '3',
    titulo: 'Elevador social com ruído estranho',
    descricao: 'O elevador social está fazendo um ruído diferente durante o funcionamento.',
    categoria: 'elevador',
    status: 'aberta',
    prioridade: 'alta',
    dataAbertura: '22/05/2024',
    morador: 'João Silva',
    apartamento: '302',
    respostas: []
  }
];

export function PaginaOcorrencias() {
  const { usuarioLogado } = usarContextoApp();
  const [ocorrencias, setOcorrencias] = useState(ocorrenciasMock);
  const [termoBusca, setTermoBusca] = useState('');
  const [statusFiltro, setStatusFiltro] = useState('todas');
  const [modalNovaOcorrencia, setModalNovaOcorrencia] = useState(false);
  const [modalDetalhes, setModalDetalhes] = useState<string | null>(null);
  const [novaResposta, setNovaResposta] = useState('');
  const [novaOcorrencia, setNovaOcorrencia] = useState({
    titulo: '',
    descricao: '',
    categoria: '',
    prioridade: 'media'
  });

  const ocorrenciasFiltradas = ocorrencias.filter(ocorrencia => {
    const correspondeTermo = ocorrencia.titulo.toLowerCase().includes(termoBusca.toLowerCase()) ||
                           ocorrencia.descricao.toLowerCase().includes(termoBusca.toLowerCase());
    const correspondeStatus = statusFiltro === 'todas' || ocorrencia.status === statusFiltro;
    
    return correspondeTermo && correspondeStatus;
  });

  const getStatusBadge = (status: string) => {
    const badges = {
      aberta: { variant: 'destructive' as const, label: 'Aberta', icon: AlertTriangle },
      em_andamento: { variant: 'secondary' as const, label: 'Em Andamento', icon: Clock },
      resolvida: { variant: 'default' as const, label: 'Resolvida', icon: CheckCircle },
      cancelada: { variant: 'outline' as const, label: 'Cancelada', icon: AlertTriangle }
    };
    return badges[status as keyof typeof badges];
  };

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
      barulho: 'Barulho',
      manutencao: 'Manutenção',
      limpeza: 'Limpeza',
      seguranca: 'Segurança',
      elevador: 'Elevador',
      outros: 'Outros'
    };
    return nomes[categoria as keyof typeof nomes];
  };

  const handleNovaOcorrencia = () => {
    if (novaOcorrencia.titulo && novaOcorrencia.descricao && novaOcorrencia.categoria) {
      const ocorrencia: Ocorrencia = {
        id: (ocorrencias.length + 1).toString(),
        titulo: novaOcorrencia.titulo,
        descricao: novaOcorrencia.descricao,
        categoria: novaOcorrencia.categoria as any,
        status: 'aberta',
        prioridade: novaOcorrencia.prioridade as any,
        dataAbertura: new Date().toLocaleDateString('pt-BR'),
        morador: usuarioLogado?.nome || 'Morador',
        apartamento: usuarioLogado?.apartamento || 'N/A',
        respostas: []
      };

      setOcorrencias([ocorrencia, ...ocorrencias]);
      setModalNovaOcorrencia(false);
      setNovaOcorrencia({ titulo: '', descricao: '', categoria: '', prioridade: 'media' });
    }
  };

  const handleNovaResposta = (ocorrenciaId: string) => {
    if (novaResposta.trim()) {
      setOcorrencias(prev => prev.map(ocorrencia => {
        if (ocorrencia.id === ocorrenciaId) {
          return {
            ...ocorrencia,
            respostas: [...ocorrencia.respostas, {
              id: (ocorrencia.respostas.length + 1).toString(),
              autor: usuarioLogado?.nome || 'Morador',
              cargo: `Morador - Apt ${usuarioLogado?.apartamento}`,
              mensagem: novaResposta,
              data: new Date().toLocaleString('pt-BR')
            }]
          };
        }
        return ocorrencia;
      }));
      setNovaResposta('');
    }
  };

  const getTotaisPorStatus = () => {
    return {
      aberta: ocorrencias.filter(o => o.status === 'aberta').length,
      em_andamento: ocorrencias.filter(o => o.status === 'em_andamento').length,
      resolvida: ocorrencias.filter(o => o.status === 'resolvida').length
    };
  };

  const totais = getTotaisPorStatus();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Ocorrências</h2>
          <p className="text-muted-foreground">
            Reporte problemas e acompanhe as soluções
          </p>
        </div>
        
        <Dialog open={modalNovaOcorrencia} onOpenChange={setModalNovaOcorrencia}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Nova Ocorrência
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Registrar Nova Ocorrência</DialogTitle>
              <DialogDescription>
                Preencha os dados abaixo para registrar uma nova ocorrência no condomínio
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="titulo">Título</Label>
                <Input
                  id="titulo"
                  value={novaOcorrencia.titulo}
                  onChange={(e) => setNovaOcorrencia({...novaOcorrencia, titulo: e.target.value})}
                  placeholder="Descreva brevemente o problema"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="categoria">Categoria</Label>
                <Select value={novaOcorrencia.categoria} onValueChange={(value) => setNovaOcorrencia({...novaOcorrencia, categoria: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="barulho">Barulho</SelectItem>
                    <SelectItem value="manutencao">Manutenção</SelectItem>
                    <SelectItem value="limpeza">Limpeza</SelectItem>
                    <SelectItem value="seguranca">Segurança</SelectItem>
                    <SelectItem value="elevador">Elevador</SelectItem>
                    <SelectItem value="outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="prioridade">Prioridade</Label>
                <Select value={novaOcorrencia.prioridade} onValueChange={(value) => setNovaOcorrencia({...novaOcorrencia, prioridade: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="baixa">Baixa</SelectItem>
                    <SelectItem value="media">Média</SelectItem>
                    <SelectItem value="alta">Alta</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição detalhada</Label>
                <Textarea
                  id="descricao"
                  value={novaOcorrencia.descricao}
                  onChange={(e) => setNovaOcorrencia({...novaOcorrencia, descricao: e.target.value})}
                  placeholder="Descreva o problema com detalhes..."
                  rows={4}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setModalNovaOcorrencia(false)}
                >
                  Cancelar
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleNovaOcorrencia}
                  disabled={!novaOcorrencia.titulo || !novaOcorrencia.descricao || !novaOcorrencia.categoria}
                >
                  Registrar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Cards de resumo */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Abertas</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{totais.aberta}</div>
            <p className="text-xs text-muted-foreground">Aguardando atendimento</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Andamento</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{totais.em_andamento}</div>
            <p className="text-xs text-muted-foreground">Sendo resolvidas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolvidas</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{totais.resolvida}</div>
            <p className="text-xs text-muted-foreground">Problemas solucionados</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e busca */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar ocorrências..."
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Abas por status */}
      <Tabs value={statusFiltro} onValueChange={setStatusFiltro}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="todas">Todas</TabsTrigger>
          <TabsTrigger value="aberta">Abertas</TabsTrigger>
          <TabsTrigger value="em_andamento">Em Andamento</TabsTrigger>
          <TabsTrigger value="resolvida">Resolvidas</TabsTrigger>
        </TabsList>

        <TabsContent value={statusFiltro} className="space-y-4">
          {ocorrenciasFiltradas.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">
                  Nenhuma ocorrência encontrada para os filtros selecionados.
                </p>
              </CardContent>
            </Card>
          ) : (
            ocorrenciasFiltradas.map((ocorrencia) => {
              const statusInfo = getStatusBadge(ocorrencia.status);
              const prioridadeInfo = getPrioridadeBadge(ocorrencia.prioridade);
              
              return (
                <Card key={ocorrencia.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium">{ocorrencia.titulo}</h4>
                          <Badge variant={statusInfo.variant}>
                            {statusInfo.label}
                          </Badge>
                          <Badge variant={prioridadeInfo.variant}>
                            {prioridadeInfo.label}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                          {ocorrencia.descricao}
                        </p>
                        
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {ocorrencia.morador} - Apt {ocorrencia.apartamento}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {ocorrencia.dataAbertura}
                          </div>
                          <span>Categoria: {getCategoriaNome(ocorrencia.categoria)}</span>
                          {ocorrencia.respostas.length > 0 && (
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-3 w-3" />
                              {ocorrencia.respostas.length} resposta(s)
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="ml-4">
                            Ver Detalhes
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{ocorrencia.titulo}</DialogTitle>
                            <DialogDescription>
                              Detalhes completos da ocorrência e histórico de interações
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="space-y-4">
                            <div className="flex items-center gap-2">
                              <Badge variant={statusInfo.variant}>
                                {statusInfo.label}
                              </Badge>
                              <Badge variant={prioridadeInfo.variant}>
                                {prioridadeInfo.label}
                              </Badge>
                              <Badge variant="outline">
                                {getCategoriaNome(ocorrencia.categoria)}
                              </Badge>
                            </div>
                            
                            <div className="bg-muted/50 p-4 rounded-lg">
                              <p className="text-sm">{ocorrencia.descricao}</p>
                            </div>
                            
                            <div className="text-sm text-muted-foreground">
                              <p>Reportado por: {ocorrencia.morador} - Apt {ocorrencia.apartamento}</p>
                              <p>Data: {ocorrencia.dataAbertura}</p>
                              {ocorrencia.dataResolucao && (
                                <p>Resolvido em: {ocorrencia.dataResolucao}</p>
                              )}
                            </div>
                            
                            {/* Histórico de respostas */}
                            {ocorrencia.respostas.length > 0 && (
                              <div className="space-y-3">
                                <h4 className="font-medium">Histórico</h4>
                                <div className="space-y-3 max-h-60 overflow-y-auto">
                                  {ocorrencia.respostas.map((resposta) => (
                                    <div key={resposta.id} className="border-l-2 border-primary/20 pl-4">
                                      <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm font-medium">{resposta.autor}</span>
                                        <span className="text-xs text-muted-foreground">{resposta.data}</span>
                                      </div>
                                      <p className="text-sm text-muted-foreground mb-1">{resposta.cargo}</p>
                                      <p className="text-sm">{resposta.mensagem}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {/* Nova resposta (apenas se não estiver resolvida) */}
                            {ocorrencia.status !== 'resolvida' && (
                              <div className="space-y-2">
                                <Label htmlFor="nova-resposta">Nova mensagem</Label>
                                <Textarea
                                  id="nova-resposta"
                                  value={novaResposta}
                                  onChange={(e) => setNovaResposta(e.target.value)}
                                  placeholder="Digite sua mensagem..."
                                  rows={3}
                                />
                                <Button 
                                  onClick={() => handleNovaResposta(ocorrencia.id)}
                                  disabled={!novaResposta.trim()}
                                  className="w-full"
                                >
                                  Enviar Mensagem
                                </Button>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}