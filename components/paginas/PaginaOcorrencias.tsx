import { useState, ChangeEvent } from 'react';
import { Search, Plus, MessageSquare, Clock, CheckCircle, AlertTriangle, User, Calendar, Download, Star } from 'lucide-react';
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
  tipo: 'reclamacao' | 'sugestao' | 'manutencao';
  status: 'aberta' | 'em_andamento' | 'resolvida' | 'cancelada';
  prioridade: 'baixa' | 'media' | 'alta';
  dataAbertura: string;
  dataResolucao?: string;
  morador: string;
  apartamento: string;
  responsavel: 'gestor' | 'admin' | 'zelador';
  anexos: string[];
  avaliacao?: number;
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
    titulo: 'Reclamação sobre barulho no 401',
    descricao: 'Vizinhos fazendo barulho após 22h, prejudicando o descanso dos demais moradores.',
    tipo: 'reclamacao',
    status: 'em_andamento',
    prioridade: 'media',
    dataAbertura: '20/05/2024',
    morador: 'João Silva',
    apartamento: '302',
    responsavel: 'zelador',
    anexos: [],
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
    titulo: 'Solicitação de manutenção na piscina',
    descricao: 'Há um vazamento visível próximo ao filtro da piscina, causando desperdício de água.',
    tipo: 'manutencao',
    status: 'resolvida',
    prioridade: 'alta',
    dataAbertura: '18/05/2024',
    dataResolucao: '19/05/2024',
    morador: 'João Silva',
    apartamento: '302',
    responsavel: 'gestor',
    anexos: ['https://via.placeholder.com/150'],
    avaliacao: 4,
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
    titulo: 'Sugestão de espelho no elevador social',
    descricao: 'Sugiro instalar um espelho no elevador social para maior conforto dos moradores.',
    tipo: 'sugestao',
    status: 'aberta',
    prioridade: 'baixa',
    dataAbertura: '22/05/2024',
    morador: 'João Silva',
    apartamento: '302',
    responsavel: 'admin',
    anexos: [],
    respostas: []
  }
];

export function PaginaOcorrencias() {
  const { usuarioLogado } = usarContextoApp();
  const [ocorrencias, setOcorrencias] = useState(ocorrenciasMock);
  const [termoBusca, setTermoBusca] = useState('');
  const [statusFiltro, setStatusFiltro] = useState('todas');
  const [responsavelFiltro, setResponsavelFiltro] = useState('todos');
  const [modalNovaOcorrencia, setModalNovaOcorrencia] = useState(false);
  const [novaResposta, setNovaResposta] = useState('');
  const [avaliacaoTemp, setAvaliacaoTemp] = useState(0);
  const [novaOcorrencia, setNovaOcorrencia] = useState({
    titulo: '',
    descricao: '',
    tipo: '',
    prioridade: 'media',
    responsavel: 'zelador',
    anexos: [] as string[]
  });

  const ocorrenciasFiltradas = ocorrencias.filter(ocorrencia => {
    const correspondeTermo =
      ocorrencia.titulo.toLowerCase().includes(termoBusca.toLowerCase()) ||
      ocorrencia.descricao.toLowerCase().includes(termoBusca.toLowerCase());
    const correspondeStatus = statusFiltro === 'todas' || ocorrencia.status === statusFiltro;
    const correspondeResponsavel = responsavelFiltro === 'todos' || ocorrencia.responsavel === responsavelFiltro;

    return correspondeTermo && correspondeStatus && correspondeResponsavel;
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

  const getTipoNome = (tipo: string) => {
    const nomes = {
      reclamacao: 'Reclamação',
      sugestao: 'Sugestão',
      manutencao: 'Manutenção'
    };
    return nomes[tipo as keyof typeof nomes];
  };

  const getResponsavelNome = (resp: string) => {
    const nomes = {
      gestor: 'Gestor',
      admin: 'Admin',
      zelador: 'Zelador'
    };
    return nomes[resp as keyof typeof nomes];
  };

  const handleAnexos = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from<File>(e.target.files) : [];
    Promise.all(
      files.map(
        file =>
          new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(file);
          })
      )
    ).then(anexos => setNovaOcorrencia(prev => ({ ...prev, anexos })));
  };

  const handleNovaOcorrencia = () => {
    if (novaOcorrencia.titulo && novaOcorrencia.descricao && novaOcorrencia.tipo) {
      const ocorrencia: Ocorrencia = {
        id: (ocorrencias.length + 1).toString(),
        titulo: novaOcorrencia.titulo,
        descricao: novaOcorrencia.descricao,
        tipo: novaOcorrencia.tipo as any,
        status: 'aberta',
        prioridade: novaOcorrencia.prioridade as any,
        dataAbertura: new Date().toLocaleDateString('pt-BR'),
        morador: usuarioLogado?.nome || 'Morador',
        apartamento: usuarioLogado?.apartamento || 'N/A',
        responsavel: novaOcorrencia.responsavel as any,
        anexos: novaOcorrencia.anexos,
        respostas: []
      };

      setOcorrencias([ocorrencia, ...ocorrencias]);
      setModalNovaOcorrencia(false);
      setNovaOcorrencia({ titulo: '', descricao: '', tipo: '', prioridade: 'media', responsavel: 'zelador', anexos: [] });
    }
  };

  const handleNovaResposta = (ocorrenciaId: string) => {
    if (novaResposta.trim()) {
      setOcorrencias(prev =>
        prev.map(ocorrencia => {
          if (ocorrencia.id === ocorrenciaId) {
            return {
              ...ocorrencia,
              respostas: [
                ...ocorrencia.respostas,
                {
                  id: (ocorrencia.respostas.length + 1).toString(),
                  autor: usuarioLogado?.nome || 'Morador',
                  cargo: `Morador - Apt ${usuarioLogado?.apartamento}`,
                  mensagem: novaResposta,
                  data: new Date().toLocaleString('pt-BR')
                }
              ]
            };
          }
          return ocorrencia;
        })
      );
      setNovaResposta('');
    }
  };

  const handleAvaliar = (ocorrenciaId: string) => {
    if (avaliacaoTemp > 0) {
      setOcorrencias(prev =>
        prev.map(o => (o.id === ocorrenciaId ? { ...o, avaliacao: avaliacaoTemp } : o))
      );
      setAvaliacaoTemp(0);
    }
  };

  const getTotaisPorStatus = () => {
    return {
      aberta: ocorrencias.filter(o => o.status === 'aberta').length,
      em_andamento: ocorrencias.filter(o => o.status === 'em_andamento').length,
      resolvida: ocorrencias.filter(o => o.status === 'resolvida').length
    };
  };

  const exportarRelatorio = () => {
    const header = ['ID','Titulo','Tipo','Status','Prioridade','DataAbertura','DataResolucao','Morador','Apartamento','Responsavel','Avaliacao'];
    const rows = ocorrencias.map(o => [
      o.id,
      o.titulo,
      getTipoNome(o.tipo),
      o.status,
      o.prioridade,
      o.dataAbertura,
      o.dataResolucao || '',
      o.morador,
      o.apartamento,
      getResponsavelNome(o.responsavel),
      o.avaliacao ?? ''
    ]);
    const csv = [header.join(','), ...rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'ocorrencias.csv');
    link.click();
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
                  onChange={(e) => setNovaOcorrencia({ ...novaOcorrencia, titulo: e.target.value })}
                  placeholder="Descreva brevemente o problema"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo</Label>
                <Select value={novaOcorrencia.tipo} onValueChange={(value) => setNovaOcorrencia({ ...novaOcorrencia, tipo: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reclamacao">Reclamação</SelectItem>
                    <SelectItem value="sugestao">Sugestão</SelectItem>
                    <SelectItem value="manutencao">Manutenção</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="prioridade">Prioridade</Label>
                <Select value={novaOcorrencia.prioridade} onValueChange={(value) => setNovaOcorrencia({ ...novaOcorrencia, prioridade: value })}>
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
                <Label htmlFor="responsavel">Responsável</Label>
                <Select value={novaOcorrencia.responsavel} onValueChange={(value) => setNovaOcorrencia({ ...novaOcorrencia, responsavel: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o responsável" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gestor">Gestor</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="zelador">Zelador</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição detalhada</Label>
                <Textarea
                  id="descricao"
                  value={novaOcorrencia.descricao}
                  onChange={(e) => setNovaOcorrencia({ ...novaOcorrencia, descricao: e.target.value })}
                  placeholder="Descreva o problema com detalhes..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="anexos">Anexos</Label>
                <Input id="anexos" type="file" multiple onChange={handleAnexos} />
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
                  disabled={!novaOcorrencia.titulo || !novaOcorrencia.descricao || !novaOcorrencia.tipo}
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

        <Select value={responsavelFiltro} onValueChange={setResponsavelFiltro}>
          <SelectTrigger className="sm:w-[180px]">
            <SelectValue placeholder="Responsável" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="gestor">Gestor</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="zelador">Zelador</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" onClick={exportarRelatorio} className="sm:w-auto">
          <Download className="h-4 w-4 mr-2" />
          Exportar
        </Button>
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
                          <span>Tipo: {getTipoNome(ocorrencia.tipo)}</span>
                          <span>Responsável: {getResponsavelNome(ocorrencia.responsavel)}</span>
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
                                {getTipoNome(ocorrencia.tipo)}
                              </Badge>
                              <Badge variant="outline">
                                {getResponsavelNome(ocorrencia.responsavel)}
                              </Badge>
                            </div>

                            <div className="bg-muted/50 p-4 rounded-lg">
                              <p className="text-sm">{ocorrencia.descricao}</p>
                            </div>

                            {ocorrencia.anexos.length > 0 && (
                              <div className="space-y-2">
                                <h4 className="font-medium">Anexos</h4>
                                <div className="grid grid-cols-2 gap-2">
                                  {ocorrencia.anexos.map((anexo, idx) => (
                                    <img key={idx} src={anexo} alt={`Anexo ${idx + 1}`} className="w-full h-32 object-cover rounded" />
                                  ))}
                                </div>
                              </div>
                            )}

                            <div className="text-sm text-muted-foreground">
                              <p>Reportado por: {ocorrencia.morador} - Apt {ocorrencia.apartamento}</p>
                              <p>Data: {ocorrencia.dataAbertura}</p>
                              {ocorrencia.dataResolucao && (
                                <p>Resolvido em: {ocorrencia.dataResolucao}</p>
                              )}
                            </div>

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

                            {ocorrencia.status === 'resolvida' && (
                              <div className="space-y-2">
                                <Label>Avaliação do atendimento</Label>
                                {ocorrencia.avaliacao ? (
                                  <div className="flex gap-1">
                                    {Array.from({ length: 5 }, (_, i) => (
                                      <Star key={i} className={`h-5 w-5 ${i < ocorrencia.avaliacao ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                                    ))}
                                  </div>
                                ) : (
                                  <>
                                    <div className="flex gap-1">
                                      {Array.from({ length: 5 }, (_, i) => (
                                        <Star
                                          key={i}
                                          className={`h-5 w-5 cursor-pointer ${i < avaliacaoTemp ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                          onClick={() => setAvaliacaoTemp(i + 1)}
                                        />
                                      ))}
                                    </div>
                                    <Button onClick={() => handleAvaliar(ocorrencia.id)} disabled={avaliacaoTemp === 0} className="w-full">
                                      Enviar Avaliação
                                    </Button>
                                  </>
                                )}
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

