import { useState, useEffect } from 'react';
import InputMask from "react-input-mask";
import { toast } from "sonner";
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
import { useResponsive } from '../../src/hooks/useResponsive';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { BotaoExportarUsuarios } from "../ui/BotaoExportarUsuarios";



interface Usuario {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  cpf?: string;
  apartamento: string;
  bloco: string;
  tipo: 'morador' | 'sindico' | 'subsindico';
  status: 'ativo' | 'inativo' | 'bloqueado';
  dataUltimoAcesso: string;
  dataCadastro: string;
  observacoes?: string;
};

// ✅ MUDANÇA AQUI: URL base da API
const API_URL = '/api/usuarios';

// Funções API
const fetchUsuarios = async (): Promise<Usuario[]> => {
  // ✅ MUDANÇA AQUI: Usando a URL base
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`Erro ao carregar usuários: ${response.statusText}`);
  }
  const data = await response.json();
  return data.map((u: any) => ({
    ...u,
    id: Number(u.id),
    dataUltimoAcesso: u.data_ultimo_acesso ? new Date(u.data_ultimo_acesso).toLocaleDateString('pt-BR') : 'Nunca',
    dataCadastro: new Date(u.data_cadastro).toLocaleDateString('pt-BR'),
  }));
};

const cadastrarUsuario = async (usuarioData: Omit<Usuario, 'id' | 'status' | 'dataUltimoAcesso' | 'dataCadastro'>): Promise<Usuario> => {
  // ✅ MUDANÇA AQUI: Usando a URL base
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(usuarioData)
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || 'Erro ao cadastrar usuário');
  }
  const newUser = await response.json();
  return {
      ...newUser,
      id: Number(newUser.id),
      dataUltimoAcesso: newUser.data_ultimo_acesso ? new Date(newUser.data_ultimo_acesso).toLocaleDateString('pt-BR') : 'Nunca',
      dataCadastro: new Date(newUser.data_cadastro).toLocaleDateString('pt-BR'),
  };
};

const alterarStatus = async (id: number, status: string): Promise<void> => {
  // ✅ MUDANÇA AQUI: Construindo a URL a partir da base
  const response = await fetch(`${API_URL}/${id}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  });
  if (!response.ok) throw new Error('Erro ao alterar status do usuário');
};

const excluirUsuario = async (id: number): Promise<void> => {
  // ✅ MUDANÇA AQUI: Construindo a URL a partir da base
  const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Erro ao excluir usuário');
};

const redefinirSenha = async (id: number): Promise<{ message: string }> => {
  // ✅ MUDANÇA AQUI: Construindo a URL a partir da base
  const response = await fetch(`${API_URL}/${id}/redefinir-senha`, { method: 'POST' });
  if (!response.ok) throw new Error('Erro ao redefinir a senha');
  return response.json();
};


export function PaginaUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const carregarUsuarios = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchUsuarios();
        setUsuarios(data);
      } catch (err) {
        console.error('Erro ao carregar usuários do backend:', err);
        setError('Falha ao carregar usuários. Verifique a conexão com o backend.');
      } finally {
        setLoading(false);
      }
    };
    carregarUsuarios();
  }, []);


  const [termoBusca, setTermoBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('todos');
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [modalNovoUsuario, setModalNovoUsuario] = useState(false);
  const [novoUsuario, setNovoUsuario] = useState({
    nome: '',
    email: '',
    cpf: '',
    telefone: '',
    apartamento: '',
    bloco: '',
    tipo: 'morador' as 'morador' | 'sindico' | 'subsindico',
    observacoes: ''
  });
  // ✅ Estado usado quando estamos editando um usuário existente
const [usuarioEditando, setUsuarioEditando] = useState<Usuario | null>(null);


  const usuariosFiltrados = usuarios.filter(usuario => {
    const termo = termoBusca.toLowerCase();
    const correspondeTermo = usuario.nome.toLowerCase().includes(termo) ||
                             usuario.email.toLowerCase().includes(termo) ||
                             usuario.apartamento.includes(termo) ||
                             usuario.bloco.toLowerCase().includes(termo);
    const correspondeStatus = filtroStatus === 'todos' || usuario.status === filtroStatus;
    const correspondeTipo = filtroTipo === 'todos' || usuario.tipo === filtroTipo;

    return correspondeTermo && correspondeStatus && correspondeTipo;
  });

  const getStatusBadge = (status: Usuario['status']) => {
    const badges = {
      ativo: { variant: 'default' as const, label: 'Ativo' },
      inativo: { variant: 'secondary' as const, label: 'Inativo' },
      bloqueado: { variant: 'destructive' as const, label: 'Bloqueado' }
    };
    return badges[status];
  };

  const getTipoBadge = (tipo: Usuario['tipo']) => {
    const badges = {
      morador: { variant: 'outline' as const, label: 'Morador' },
      subsindico: { variant: 'secondary' as const, label: 'Subsíndico' },
      sindico: { variant: 'default' as const, label: 'Síndico' }
    };
    return badges[tipo];
  };

  // ✅ Função para salvar alterações de um usuário existente
const handleSalvarEdicao = async () => {
  if (!usuarioEditando) return;

  try {
    const response = await fetch(`/api/usuarios/${usuarioEditando.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuarioEditando),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const msg =
        errorData?.detail?.[0]?.msg ||
        errorData?.detail ||
        "Erro ao salvar alterações.";

      toast.error("Falha ao salvar edição", {
        description: msg,
      });
      return;
    }

    // ✅ Atualiza o usuário na lista local
    const usuarioAtualizado = await response.json();
    setUsuarios((prev) =>
      prev.map((u) => (u.id === usuarioAtualizado.id ? usuarioAtualizado : u))
    );

    setModalNovoUsuario(false);
    setUsuarioEditando(null);

    toast.success("Usuário atualizado com sucesso!", {
      description: "As informações foram salvas corretamente.",
    });
  } catch (error) {
    console.error("Erro ao salvar edição:", error);
    toast.error("Erro de conexão com o servidor.", {
      description: "Verifique sua internet e tente novamente.",
    });
  }
};


  const handleNovoUsuario = async () => {
  // 🟡 Validação de campos obrigatórios
  if (!novoUsuario.nome || !novoUsuario.email || !novoUsuario.apartamento) {
    toast.warning("Campos obrigatórios faltando.", {
      description: "Informe nome, e-mail e apartamento antes de continuar.",
    });
    return;
  }

  // 🔍 CPF incompleto (máscara parcial)
  if (novoUsuario.cpf && novoUsuario.cpf.includes("_")) {
    toast.warning("CPF incompleto.", {
      description: "Preencha todos os dígitos antes de continuar.",
    });
    return;
  }

  // 🧹 Remove pontos e traços antes de enviar
  const payload = {
    ...novoUsuario,
    cpf: novoUsuario.cpf.replace(/\D/g, ""),
  };

  try {
    const response = await fetch("/api/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    // ❌ Caso o backend retorne erro
    if (!response.ok) {
      const errorData = await response.json();
      const msg =
        errorData?.detail?.[0]?.msg ||
        errorData?.detail ||
        "Erro ao cadastrar usuário.";

      toast.error("Falha ao cadastrar", {
        description: msg,
      });
      return;
    }

    // ✅ Caso sucesso
    const usuarioCadastrado = await response.json();
    setUsuarios((prev) => [...prev, usuarioCadastrado]);
    setModalNovoUsuario(false);
    setNovoUsuario({
      nome: "",
      email: "",
      cpf: "",
      telefone: "",
      apartamento: "",
      bloco: "",
      tipo: "morador",
      observacoes: "",
    });

    toast.success("Usuário cadastrado com sucesso!", {
      description: "O novo usuário foi adicionado ao sistema.",
    });
  } catch (error) {
    console.error("Erro ao cadastrar:", error);
    toast.error("Erro de conexão com o servidor.", {
      description: "Verifique sua internet e tente novamente.",
    });
  }
};


  const handleAlterarStatus = async (id: number, novoStatus: 'ativo' | 'inativo' | 'bloqueado') => {
    try {
      await alterarStatus(id, novoStatus);
      setUsuarios(usuarios.map(u => u.id === id ? { ...u, status: novoStatus } : u));
    } catch (err) {
      alert('Falha ao alterar status: ' + (err as Error).message);
    }
  };

  const handleExcluirUsuario = async (id: number) => {
    try {
      await excluirUsuario(id);
      setUsuarios(usuarios.filter(u => u.id !== id));
      alert('Usuário excluído com sucesso!');
    } catch (err) {
      alert('Falha ao excluir: ' + (err as Error).message);
    }
  };

  const handleRedefinirSenha = async (id: number) => {
    try {
      const result = await redefinirSenha(id);
      alert(result.message || `Senha para o usuário ID: ${id} redefinida. Uma nova senha foi enviada por email.`);
    } catch (err) {
        alert('Falha ao redefinir a senha: ' + (err as Error).message);
    }
  };

  const getTotaisPorStatus = () => ({
    ativo: usuarios.filter(u => u.status === 'ativo').length,
    inativo: usuarios.filter(u => u.status === 'inativo').length,
    bloqueado: usuarios.filter(u => u.status === 'bloqueado').length,
    total: usuarios.length
  });

  const totais = getTotaisPorStatus();
  const { isMobile } = useResponsive();
  
  if (loading) {
    return <div className="flex justify-center items-center h-64"><p>Carregando usuários...</p></div>;
  }
  
  if (error) {
    return <div className="flex justify-center items-center h-64 p-4 text-center text-red-600 bg-red-50 rounded-lg">{error}</div>;
  }

    return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-foreground">Usuários Cadastrados</h1>
          <p className="text-muted-foreground">
            Gerencie os moradores e usuários do sistema
          </p>
        </div>

        {/* Bloco de ações (Exportar + Novo Usuário) */}
<div className="flex items-center gap-2 w-full sm:w-auto">
  {/* Botão de exportar usuários */}
  <BotaoExportarUsuarios data={usuariosFiltrados} />

  {/* Modal único: usado tanto para Novo quanto para Editar */}
<Dialog
  open={modalNovoUsuario}
  onOpenChange={(open) => {
    setModalNovoUsuario(open);
    if (!open) setUsuarioEditando(null); //  limpa o estado ao fechar
  }}
>

    <DialogTrigger asChild>
      <Button className="tap-target gap-2 h-10 w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white">
        <Plus className="h-4 w-4" />
        Novo Usuário
      </Button>
    </DialogTrigger>

    <DialogContent className="sm:max-w-2xl">
      <DialogHeader>
        <DialogTitle>
          {usuarioEditando ? "Editar Usuário" : "Cadastrar Novo Usuário"}
        </DialogTitle>
        <DialogDescription>
          {usuarioEditando
            ? "Atualize as informações e clique em Salvar."
            : "Preencha as informações do novo usuário para cadastrá-lo no sistema."}
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4 py-4">

        
        {/* NOME E EMAIL */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome completo</Label>
            <Input
              id="nome"
              value={usuarioEditando ? usuarioEditando.nome : novoUsuario.nome}
              onChange={(e) =>
                usuarioEditando
                  ? setUsuarioEditando({
                      ...usuarioEditando,
                      nome: e.target.value,
                    })
                  : setNovoUsuario({ ...novoUsuario, nome: e.target.value })
              }
              placeholder="Ex: João Silva Santos"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={
                usuarioEditando ? usuarioEditando.email : novoUsuario.email
              }
              onChange={(e) =>
                usuarioEditando
                  ? setUsuarioEditando({
                      ...usuarioEditando,
                      email: e.target.value,
                    })
                  : setNovoUsuario({ ...novoUsuario, email: e.target.value })
              }
              placeholder="joao@email.com"
            />
          </div>
        </div>

        {/* CPF e Telefone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>CPF</Label>
            <InputMask
              mask="999.999.999-99"
              value={usuarioEditando ? usuarioEditando.cpf ?? "" : novoUsuario.cpf}
              onChange={(e) =>
                usuarioEditando
                  ? setUsuarioEditando({
                      ...usuarioEditando,
                      cpf: e.target.value,
                    })
                  : setNovoUsuario({ ...novoUsuario, cpf: e.target.value })
              }
            >
              {(inputProps: any) => <Input {...inputProps} placeholder="000.000.000-00" />}
            </InputMask>
          </div>

          <div className="space-y-2">
            <Label>Telefone</Label>
            <InputMask
              mask="(99) 99999-9999"
              value={usuarioEditando ? usuarioEditando.telefone ?? "" : novoUsuario.telefone}
              onChange={(e) =>
                usuarioEditando
                  ? setUsuarioEditando({
                      ...usuarioEditando,
                      telefone: e.target.value,
                    })
                  : setNovoUsuario({ ...novoUsuario, telefone: e.target.value })
              }
            >
              {(inputProps: any) => <Input {...inputProps} placeholder="(00) 00000-0000" />}
            </InputMask>
          </div>
        </div>

        {/* Apartamento e Bloco */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Apartamento</Label>
            <Input
              value={
                usuarioEditando
                  ? usuarioEditando.apartamento
                  : novoUsuario.apartamento
              }
              onChange={(e) =>
                usuarioEditando
                  ? setUsuarioEditando({
                      ...usuarioEditando,
                      apartamento: e.target.value,
                    })
                  : setNovoUsuario({
                      ...novoUsuario,
                      apartamento: e.target.value,
                    })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Bloco</Label>
            <Input
              value={usuarioEditando ? usuarioEditando.bloco : novoUsuario.bloco}
              onChange={(e) =>
                usuarioEditando
                  ? setUsuarioEditando({
                      ...usuarioEditando,
                      bloco: e.target.value,
                    })
                  : setNovoUsuario({ ...novoUsuario, bloco: e.target.value })
              }
            />
          </div>
        </div>

        {/* Tipo de usuário */}
<div className="space-y-2">
  <Label>Tipo de usuário</Label>
  <Select
    value={usuarioEditando ? usuarioEditando.tipo : novoUsuario.tipo}
    onValueChange={(value: any) =>
      usuarioEditando
        ? setUsuarioEditando({ ...usuarioEditando, tipo: value })
        : setNovoUsuario({ ...novoUsuario, tipo: value })
    }
  >
    <SelectTrigger className="h-11">
      <SelectValue placeholder="Selecione o tipo" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="morador">Morador</SelectItem>
      <SelectItem value="subsindico">Subsíndico</SelectItem>
      <SelectItem value="sindico">Síndico</SelectItem>
    </SelectContent>
  </Select>
</div>


        {/* Observações */}
        <div className="space-y-2">
          <Label>Observações (opcional)</Label>
          <Input
            value={
              usuarioEditando ? usuarioEditando.observacoes ?? "" : novoUsuario.observacoes
            }
            onChange={(e) =>
              usuarioEditando
                ? setUsuarioEditando({
                    ...usuarioEditando,
                    observacoes: e.target.value,
                  })
                : setNovoUsuario({
                    ...novoUsuario,
                    observacoes: e.target.value,
                  })
            }
            placeholder="Informações adicionais..."
          />
        </div>

        {/* BOTÕES */}
        <div className="flex gap-2 pt-4">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => {
              setModalNovoUsuario(false);
              setUsuarioEditando(null);
            }}
          >
            Cancelar
          </Button>

          <Button
            className="flex-1"
            onClick={() => {
              if (usuarioEditando) {
                handleSalvarEdicao();
              } else {
                handleNovoUsuario();
              }
            }}
          >
            {usuarioEditando ? "Salvar Alterações" : "Cadastrar"}
          </Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</div>

      </div>

      {/* Cards de resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card><CardContent className="p-4 flex items-center justify-between"><div className="space-y-1"><p className="text-xs font-medium text-muted-foreground uppercase">Total de Usuários</p><p className="text-2xl font-bold text-foreground">{totais.total}</p></div><div className="p-2.5 rounded-xl bg-blue-500/10"><UserCheck className="h-5 w-5 text-blue-500" /></div></CardContent></Card>
        <Card><CardContent className="p-4 flex items-center justify-between"><div className="space-y-1"><p className="text-xs font-medium text-muted-foreground uppercase">Usuários Ativos</p><p className="text-2xl font-bold text-green-600">{totais.ativo}</p></div><div className="p-2.5 rounded-xl bg-green-500/10"><UserCheck className="h-5 w-5 text-green-500" /></div></CardContent></Card>
        <Card><CardContent className="p-4 flex items-center justify-between"><div className="space-y-1"><p className="text-xs font-medium text-muted-foreground uppercase">Inativos</p><p className="text-2xl font-bold text-orange-600">{totais.inativo}</p></div><div className="p-2.5 rounded-xl bg-orange-500/10"><UserX className="h-5 w-5 text-orange-500" /></div></CardContent></Card>
        <Card><CardContent className="p-4 flex items-center justify-between"><div className="space-y-1"><p className="text-xs font-medium text-muted-foreground uppercase">Bloqueados</p><p className="text-2xl font-bold text-red-600">{totais.bloqueado}</p></div><div className="p-2.5 rounded-xl bg-red-500/10"><Lock className="h-5 w-5 text-red-500" /></div></CardContent></Card>
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
                className="pl-10 h-12"
              />
            </div>
            <Select value={filtroStatus} onValueChange={setFiltroStatus}>
              <SelectTrigger className="tap-target h-11 w-full md:w-48" aria-label="Filtrar por status">
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
              <SelectTrigger className="tap-target h-11 w-full md:w-48" aria-label="Filtrar por tipo">
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
          <CardTitle>Lista de Usuários ({usuariosFiltrados.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="overflow-x-auto"
            role="region"
            aria-label="Tabela de usuários cadastrados"
            tabIndex={0}
          >
            <Table className="min-w-[720px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[12rem]">Usuário</TableHead>
                  <TableHead className="min-w-[12rem]">Contato</TableHead>
                  <TableHead className="hidden lg:table-cell">Localização</TableHead>
                  <TableHead className="hidden md:table-cell">Tipo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden lg:table-cell">Observações</TableHead>
                  <TableHead className="hidden xl:table-cell">Último Acesso</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {usuariosFiltrados.map((usuario) => (
                  <TableRow key={usuario.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {usuario.nome.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium truncate" title={usuario.nome}>
                            {usuario.nome}
                          </p>
                          {usuario.observacoes && (
                            <p
                              className="text-xs text-muted-foreground truncate"
                              title={usuario.observacoes}
                            >
                              {usuario.observacoes}
                            </p>
                          )}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm truncate" title={usuario.email}>
                          <Mail className="h-3 w-3 text-muted-foreground" />
                          <span className="truncate">{usuario.email}</span>
                        </div>

                        {usuario.telefone && (
                          <div
                            className="flex items-center gap-1 text-sm text-muted-foreground truncate"
                            title={usuario.telefone}
                          >
                            <Phone className="h-3 w-3" />
                            <span className="truncate">{usuario.telefone}</span>
                          </div>
                        )}

                        {usuario.cpf && (
                          <div className="flex items-center gap-2 pt-1 text-xs font-medium text-foreground/70 border-t border-border/20 mt-1">
                            <span className="px-2 py-[1px] rounded-md bg-primary/10 text-primary font-mono tracking-widest shadow-sm">
                              CPF:{" "}
                              {usuario.cpf.replace(
                                /(\d{3})(\d{3})(\d{3})(\d{2})/,
                                "$1.$2.$3-$4"
                              )}
                            </span>
                          </div>
                        )}
                      </div>
                    </TableCell>

                    <TableCell className="hidden lg:table-cell">
                      <div className="flex items-center gap-1">
                        <Building className="h-3 w-3 text-muted-foreground" />
                        <span
                          className="text-sm truncate"
                          title={`Apt ${usuario.apartamento} - Bloco ${usuario.bloco}`}
                        >
                          Apt {usuario.apartamento} - Bloco {usuario.bloco}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="hidden md:table-cell">
                      <Badge variant={getTipoBadge(usuario.tipo).variant}>
                        {getTipoBadge(usuario.tipo).label}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <Badge variant={getStatusBadge(usuario.status).variant}>
                        {getStatusBadge(usuario.status).label}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-muted-foreground truncate" title={usuario.observacoes || "—"}>
  {usuario.observacoes || "—"}
</TableCell>


                    <TableCell className="hidden xl:table-cell text-sm text-muted-foreground">
                      {usuario.dataUltimoAcesso}
                    </TableCell>

                   <TableCell className="text-right">
  <div className="flex flex-wrap items-center gap-2 justify-end">
    <Button
  variant="ghost"
  size="icon"
  className="tap-target h-8 w-8"
  onClick={() => {
    setUsuarioEditando(usuario);
    setModalNovoUsuario(true);
  }}
>
  <Edit className="h-4 w-4" />
</Button>



                        <Button
                          variant="ghost"
                          size="icon"
                          className="tap-target h-8 w-8"
                          onClick={() => handleRedefinirSenha(usuario.id)}
                        >
                          <Key className="h-4 w-4" />
                        </Button>

                        <Select
                          value={usuario.status}
                          onValueChange={(value: any) =>
                            handleAlterarStatus(usuario.id, value)
                          }
                        >
                          <SelectTrigger
                            className="tap-target h-9 min-w-[5.5rem]"
                            aria-label="Alterar status do usuário"
                          >
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
                            <Button
                              variant="ghost"
                              size="icon"
                              className="tap-target text-destructive h-8 w-8"
                            >
                              <Trash2 className="h-4 w-4" />
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
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
