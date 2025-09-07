import { useState } from 'react';
import { Search, Plus, Edit, Lock, Trash2, UserCheck, UserX, Mail, Phone, Key, Building } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '../ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

interface Usuario {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  apartamento: string;
  bloco: string;
  tipo: 'morador' | 'sindico' | 'subsindico';
  status: 'ativo' | 'inativo' | 'bloqueado';
  dataUltimoAcesso: string;
  dataCadastro: string;
  observacoes?: string;
}

const usuariosMock: Usuario[] = [
  {
    id: '1',
    nome: 'Maria Santos Silva',
    email: 'maria.santos@email.com',
    telefone: '(11) 99999-1111',
    apartamento: '302',
    bloco: 'A',
    tipo: 'morador',
    status: 'ativo',
    dataUltimoAcesso: '2024-05-20',
    dataCadastro: '2024-01-15'
  },
  {
    id: '2',
    nome: 'João Silva Oliveira',
    email: 'joao.silva@email.com',
    telefone: '(11) 99999-2222',
    apartamento: '1105',
    bloco: 'B',
    tipo: 'morador',
    status: 'ativo',
    dataUltimoAcesso: '2024-05-19',
    dataCadastro: '2024-02-20'
  },
  {
    id: '3',
    nome: 'Ana Costa Lima',
    email: 'ana.costa@email.com',
    telefone: '(11) 99999-3333',
    apartamento: '708',
    bloco: 'A',
    tipo: 'subsindico',
    status: 'ativo',
    dataUltimoAcesso: '2024-05-20',
    dataCadastro: '2024-01-10'
  },
  {
    id: '4',
    nome: 'Carlos Oliveira Santos',
    email: 'carlos.oliveira@email.com',
    telefone: '(11) 99999-4444',
    apartamento: '456',
    bloco: 'C',
    tipo: 'morador',
    status: 'inativo',
    dataUltimoAcesso: '2024-04-15',
    dataCadastro: '2024-03-05',
    observacoes: 'Apartamento para venda'
  },
  {
    id: '5',
    nome: 'Roberto Síndico',
    email: 'sindico@condominio.com',
    telefone: '(11) 99999-0000',
    apartamento: '101',
    bloco: 'A',
    tipo: 'sindico',
    status: 'ativo',
    dataUltimoAcesso: '2024-05-20',
    dataCadastro: '2023-12-01'
  },
  {
    id: '6',
    nome: 'Pedro Problemas',
    email: 'pedro.problemas@email.com',
    telefone: '(11) 99999-5555',
    apartamento: '890',
    bloco: 'B',
    tipo: 'morador',
    status: 'bloqueado',
    dataUltimoAcesso: '2024-04-10',
    dataCadastro: '2024-02-28',
    observacoes: 'Bloqueado por violação das normas'
  }
];

export function PaginaUsuarios() {
  const [usuarios, setUsuarios] = useState(usuariosMock);
  const [termoBusca, setTermoBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('todos');
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [modalNovoUsuario, setModalNovoUsuario] = useState(false);
  const [modalEditarUsuario, setModalEditarUsuario] = useState<string | null>(null);
  const [novoUsuario, setNovoUsuario] = useState({
    nome: '',
    email: '',
    telefone: '',
    apartamento: '',
    bloco: '',
    tipo: 'morador',
    observacoes: ''
  });

  const usuariosFiltrados = usuarios.filter(usuario => {
    const correspondeTermo = usuario.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
                           usuario.email.toLowerCase().includes(termoBusca.toLowerCase()) ||
                           usuario.apartamento.includes(termoBusca) ||
                           usuario.bloco.toLowerCase().includes(termoBusca.toLowerCase());
    const correspondeStatus = filtroStatus === 'todos' || usuario.status === filtroStatus;
    const correspondeTipo = filtroTipo === 'todos' || usuario.tipo === filtroTipo;
    
    return correspondeTermo && correspondeStatus && correspondeTipo;
  });

  const getStatusBadge = (status: string) => {
    const badges = {
      ativo: { variant: 'default' as const, label: 'Ativo' },
      inativo: { variant: 'secondary' as const, label: 'Inativo' },
      bloqueado: { variant: 'destructive' as const, label: 'Bloqueado' }
    };
    return badges[status as keyof typeof badges];
  };

  const getTipoBadge = (tipo: string) => {
    const badges = {
      morador: { variant: 'outline' as const, label: 'Morador' },
      subsindico: { variant: 'secondary' as const, label: 'Subsíndico' },
      sindico: { variant: 'default' as const, label: 'Síndico' }
    };
    return badges[tipo as keyof typeof badges];
  };

  const handleNovoUsuario = () => {
    if (novoUsuario.nome && novoUsuario.email && novoUsuario.apartamento) {
      const usuario: Usuario = {
        id: (usuarios.length + 1).toString(),
        nome: novoUsuario.nome,
        email: novoUsuario.email,
        telefone: novoUsuario.telefone,
        apartamento: novoUsuario.apartamento,
        bloco: novoUsuario.bloco,
        tipo: novoUsuario.tipo as any,
        status: 'ativo',
        dataUltimoAcesso: 'Nunca',
        dataCadastro: new Date().toLocaleDateString('pt-BR'),
        observacoes: novoUsuario.observacoes || undefined
      };

      setUsuarios([...usuarios, usuario]);
      setModalNovoUsuario(false);
      setNovoUsuario({
        nome: '',
        email: '',
        telefone: '',
        apartamento: '',
        bloco: '',
        tipo: 'morador',
        observacoes: ''
      });
    }
  };

  const handleAlterarStatus = (id: string, novoStatus: 'ativo' | 'inativo' | 'bloqueado') => {
    setUsuarios(prev => prev.map(usuario => 
      usuario.id === id ? { ...usuario, status: novoStatus } : usuario
    ));
  };

  const handleExcluirUsuario = (id: string) => {
    setUsuarios(prev => prev.filter(usuario => usuario.id !== id));
  };

  const handleRedefinirSenha = (id: string) => {
    // Simular redefinição de senha
    alert(`Senha redefinida para o usuário ID: ${id}. Nova senha temporária enviada por email.`);
  };

  const getTotaisPorStatus = () => {
    return {
      ativo: usuarios.filter(u => u.status === 'ativo').length,
      inativo: usuarios.filter(u => u.status === 'inativo').length,
      bloqueado: usuarios.filter(u => u.status === 'bloqueado').length,
      total: usuarios.length
    };
  };

  const totais = getTotaisPorStatus();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-foreground">Usuários Cadastrados</h1>
          <p className="text-muted-foreground">
            Gerencie os moradores e usuários do sistema
          </p>
        </div>
        
        <Dialog open={modalNovoUsuario} onOpenChange={setModalNovoUsuario}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Novo Usuário
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Cadastrar Novo Usuário</DialogTitle>
              <DialogDescription>
                Preencha as informações do novo usuário para cadastrá-lo no sistema.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome completo</Label>
                  <Input
                    id="nome"
                    value={novoUsuario.nome}
                    onChange={(e) => setNovoUsuario({...novoUsuario, nome: e.target.value})}
                    placeholder="Ex: João Silva Santos"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={novoUsuario.email}
                    onChange={(e) => setNovoUsuario({...novoUsuario, email: e.target.value})}
                    placeholder="joao@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    id="telefone"
                    value={novoUsuario.telefone}
                    onChange={(e) => setNovoUsuario({...novoUsuario, telefone: e.target.value})}
                    placeholder="(11) 99999-9999"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tipo">Tipo de usuário</Label>
                  <Select value={novoUsuario.tipo} onValueChange={(value) => setNovoUsuario({...novoUsuario, tipo: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morador">Morador</SelectItem>
                      <SelectItem value="subsindico">Subsíndico</SelectItem>
                      <SelectItem value="sindico">Síndico</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="apartamento">Apartamento</Label>
                  <Input
                    id="apartamento"
                    value={novoUsuario.apartamento}
                    onChange={(e) => setNovoUsuario({...novoUsuario, apartamento: e.target.value})}
                    placeholder="302"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bloco">Bloco</Label>
                  <Select value={novoUsuario.bloco} onValueChange={(value) => setNovoUsuario({...novoUsuario, bloco: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o bloco" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">Bloco A</SelectItem>
                      <SelectItem value="B">Bloco B</SelectItem>
                      <SelectItem value="C">Bloco C</SelectItem>
                      <SelectItem value="D">Bloco D</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="observacoes">Observações (opcional)</Label>
                <Input
                  id="observacoes"
                  value={novoUsuario.observacoes}
                  onChange={(e) => setNovoUsuario({...novoUsuario, observacoes: e.target.value})}
                  placeholder="Informações adicionais..."
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setModalNovoUsuario(false)}
                >
                  Cancelar
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleNovoUsuario}
                  disabled={!novoUsuario.nome || !novoUsuario.email || !novoUsuario.apartamento}
                >
                  Cadastrar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Cards de resumo */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Total de Usuários
                </p>
                <p className="text-2xl font-bold text-foreground">{totais.total}</p>
                <p className="text-xs text-muted-foreground">Cadastrados no sistema</p>
              </div>
              <div className="p-2.5 rounded-xl bg-blue-500/10">
                <UserCheck className="h-5 w-5 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Usuários Ativos
                </p>
                <p className="text-2xl font-bold text-green-600">{totais.ativo}</p>
                <p className="text-xs text-muted-foreground">Com acesso liberado</p>
              </div>
              <div className="p-2.5 rounded-xl bg-green-500/10">
                <UserCheck className="h-5 w-5 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Inativos
                </p>
                <p className="text-2xl font-bold text-orange-600">{totais.inativo}</p>
                <p className="text-xs text-muted-foreground">Sem atividade recente</p>
              </div>
              <div className="p-2.5 rounded-xl bg-orange-500/10">
                <UserX className="h-5 w-5 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Bloqueados
                </p>
                <p className="text-2xl font-bold text-red-600">{totais.bloqueado}</p>
                <p className="text-xs text-muted-foreground">Acesso suspenso</p>
              </div>
              <div className="p-2.5 rounded-xl bg-red-500/10">
                <Lock className="h-5 w-5 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome, email, apartamento ou bloco..."
                value={termoBusca}
                onChange={(e) => setTermoBusca(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filtroStatus} onValueChange={setFiltroStatus}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os status</SelectItem>
                <SelectItem value="ativo">Ativos</SelectItem>
                <SelectItem value="inativo">Inativos</SelectItem>
                <SelectItem value="bloqueado">Bloqueados</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filtroTipo} onValueChange={setFiltroTipo}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os tipos</SelectItem>
                <SelectItem value="morador">Moradores</SelectItem>
                <SelectItem value="subsindico">Subsíndicos</SelectItem>
                <SelectItem value="sindico">Síndicos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de usuários */}
      <Card>
        <CardHeader>
          <CardTitle>
            Lista de Usuários ({usuariosFiltrados.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Contato</TableHead>
                  <TableHead>Localização</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Último Acesso</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usuariosFiltrados.map((usuario) => {
                  const statusInfo = getStatusBadge(usuario.status);
                  const tipoInfo = getTipoBadge(usuario.tipo);
                  
                  return (
                    <TableRow key={usuario.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>
                              {usuario.nome.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{usuario.nome}</p>
                            {usuario.observacoes && (
                              <p className="text-xs text-muted-foreground">
                                {usuario.observacoes}
                              </p>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm">
                            <Mail className="h-3 w-3 text-muted-foreground" />
                            {usuario.email}
                          </div>
                          {usuario.telefone && (
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Phone className="h-3 w-3" />
                              {usuario.telefone}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Building className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">
                            Apt {usuario.apartamento} - Bloco {usuario.bloco}
                          </span>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <Badge variant={tipoInfo.variant}>
                          {tipoInfo.label}
                        </Badge>
                      </TableCell>
                      
                      <TableCell>
                        <Badge variant={statusInfo.variant}>
                          {statusInfo.label}
                        </Badge>
                      </TableCell>
                      
                      <TableCell className="text-sm text-muted-foreground">
                        {usuario.dataUltimoAcesso === 'Nunca' ? 'Nunca' : 
                         new Date(usuario.dataUltimoAcesso).toLocaleDateString('pt-BR')}
                      </TableCell>
                      
                      <TableCell className="text-right">
                        <div className="flex items-center gap-1 justify-end">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                          
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleRedefinirSenha(usuario.id)}
                          >
                            <Key className="h-3 w-3" />
                          </Button>
                          
                          <Select
                            value={usuario.status}
                            onValueChange={(value: any) => handleAlterarStatus(usuario.id, value)}
                          >
                            <SelectTrigger className="w-20 h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ativo">Ativo</SelectItem>
                              <SelectItem value="inativo">Inativo</SelectItem>
                              <SelectItem value="bloqueado">Bloqueado</SelectItem>
                            </SelectContent>
                          </Select>
                          
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="text-destructive">
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Tem certeza de que deseja excluir o usuário "{usuario.nome}"? 
                                  Esta ação não pode ser desfeita.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleExcluirUsuario(usuario.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Excluir
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}