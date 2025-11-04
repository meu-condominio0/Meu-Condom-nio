import { useState, useEffect, ReactNode } from "react";
import InputMask from "react-input-mask";
import { toast } from "sonner";
import { Search, Plus, MoreHorizontal, UserPlus, Truck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BotaoExportarVisitantes } from "@/components/ui/BotaoExportarVisitantes";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const API_URL = "http://127.0.0.1:8000/api";

interface RegistroVisitante {
  id: string;
  nome: string;
  tipo: "visitante" | "entrega";
  cpf: string | null;
  telefone: string | null;
  apartamento: string;
  status: "aguardando" | "autorizado" | "negado" | "dentro" | "finalizado";
  dataHora: string;
  preAutorizado?: boolean;
  recorrente?: boolean;
  entrada?: string;
  saida?: string;
  observacao?: string | null;
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================
export function PaginaVisitantes() {
  const [registros, setRegistros] = useState<RegistroVisitante[]>([]);
  const [busca, setBusca] = useState("");

  const fetchRegistros = async () => {
    try {
      const response = await fetch(`${API_URL}/visitante/`);
      if (response.ok) setRegistros(await response.json());
    } catch (error) {
      console.error("Erro ao buscar registros:", error);
    }
  };

  useEffect(() => {
    fetchRegistros();
  }, []);

  const registrosFiltrados = registros.filter(
    (r) =>
      r.nome.toLowerCase().includes(busca.toLowerCase()) ||
      r.apartamento.includes(busca)
  );

  return (
    <div className="space-y-6 p-4 md:p-6">
     <div className="flex flex-wrap items-center justify-between gap-3">
  <div>
    <h2 className="text-2xl font-semibold mb-2">Controle de Visitantes</h2>
    <p className="text-muted-foreground">
      Gerencie o fluxo de acesso ao condomínio.
    </p>
  </div>

{/* Bloco de ações (Exportar + Novo Registro) */}
<div className="flex items-center gap-2 w-full sm:w-auto">
  {/* Botão de exportar visitantes */}
  <BotaoExportarVisitantes data={registrosFiltrados} />

  {/* Botão de novo registro */}
  <ModalNovoRegistro onRegistroCriado={fetchRegistros} />
</div>


</div>


      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle>Registros Recentes</CardTitle>
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome ou apto"
                className="pl-8"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>CPF</TableHead>
                <TableHead>Apto</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Entrada</TableHead>
                <TableHead>Saída</TableHead>
                <TableHead>Observação</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {registrosFiltrados.map((registro) => (
                <TableRow key={registro.id}>
                  <TableCell className="font-medium">{registro.nome}</TableCell>
                  <TableCell className="capitalize flex items-center gap-2">
                    {registro.tipo === "visitante" ? (
                      <UserPlus className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Truck className="h-4 w-4 text-muted-foreground" />
                    )}
                    {registro.tipo}
                  </TableCell>
                  <TableCell>{registro.cpf || "-"}</TableCell>
                  <TableCell>{registro.apartamento}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        registro.status === "aguardando"
                          ? "bg-yellow-500/30 text-yellow-300 border border-yellow-500/50"
                          : registro.status === "autorizado"
                          ? "bg-blue-500/30 text-blue-300 border border-blue-500/50"
                          : registro.status === "dentro"
                          ? "bg-green-500/30 text-green-300 border border-green-500/50"
                          : registro.status === "finalizado"
                          ? "bg-gray-500/30 text-gray-300 border border-gray-500/50 italic"
                          : "bg-red-500/30 text-red-300 border border-red-500/50"
                      }
                    >
                      {registro.status.charAt(0).toUpperCase() +
                        registro.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {registro.entrada
                      ? new Date(registro.entrada).toLocaleString("pt-BR")
                      : "-"}
                  </TableCell>
               <TableCell>
  {registro.saida
    ? new Date(registro.saida).toLocaleString("pt-BR", {
        hour12: false,
      })
    : "-"}
</TableCell>


                  <TableCell className="text-muted-foreground max-w-[200px] truncate">
                    {registro.observacao || "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    <ActionsMenu
                      registro={registro}
                      onActionCompleted={fetchRegistros}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

// ============================================================================
// COMPONENTE FILHO: MENU DE AÇÕES
// ============================================================================
function ActionsMenu({
  registro,
  onActionCompleted,
}: {
  registro: RegistroVisitante;
  onActionCompleted: () => void;
}) {
  const [observacao, setObservacao] = useState(registro.observacao || "");
  const [loading, setLoading] = useState(false);

  const handleUpdateStatus = async (novoStatus: RegistroVisitante["status"]) => {
  if (loading) return;
  setLoading(true);

  try {
    const response = await fetch(`${API_URL}/visitante/${registro.id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: novoStatus, observacao }),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.detail || "Erro ao atualizar status");
    }

    // ✅ Atualiza tabela primeiro
    await onActionCompleted();

    // ✅ Agora mostra o toast (somente uma vez)
    toast.success(
      novoStatus === "finalizado"
        ? "Visita finalizada com sucesso!"
        : "Status atualizado com sucesso!",
      { description: `${registro.nome} agora está como ${novoStatus}.` }
    );
  } catch (err: any) {
    toast.error("Erro ao atualizar status", {
      description: err.message || "Tente novamente.",
    });
  } finally {
    setLoading(false);
  }
};



  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_URL}/visitante/${registro.id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || "Erro ao excluir registro");
      }
      toast.success("Registro excluído com sucesso!", {
        description: `${registro.nome} foi removido.`,
      });
      onActionCompleted();
    } catch (err: any) {
      toast.error("Erro ao excluir registro", {
        description: err.message || "Tente novamente.",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {registro.status === "aguardando" && (
          <>
            <DropdownMenuItem onClick={() => handleUpdateStatus("autorizado")}>
              Autorizar Entrada
            </DropdownMenuItem>
            <AlertaAcao
              trigger={
                <DropdownMenuItem
                  onSelect={(e) => e.preventDefault()}
                  className="text-red-600"
                >
                  Negar Entrada...
                </DropdownMenuItem>
              }
              title="Negar entrada?"
              description={`Isso negará a entrada de "${registro.nome}".`}
              actionText="Confirmar"
              onActionConfirm={() => handleUpdateStatus("negado")}
            />
          </>
        )}

        {registro.status === "autorizado" && (
          <DropdownMenuItem onClick={() => handleUpdateStatus("dentro")}>
            Registrar Chegada
          </DropdownMenuItem>
        )}

        {registro.status === "dentro" && (
          <Dialog>
            <DialogTrigger asChild>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                Finalizar Visita...
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Finalizar Visita de "{registro.nome}"
                </DialogTitle>
                <DialogDescription>
                  A hora de saída será registrada automaticamente.
                </DialogDescription>
              </DialogHeader>
              <div className="py-2">
                <Label>Observação (Opcional)</Label>
                <Textarea
                  value={observacao}
                  onChange={(e) => setObservacao(e.target.value)}
                  className="mt-2"
                />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancelar</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    onClick={() => handleUpdateStatus("finalizado")}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Salvando...
                      </>
                    ) : (
                      "Confirmar Saída"
                    )}
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        <DropdownMenuSeparator />
        <AlertaAcao
          trigger={
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className="text-red-600"
            >
              Excluir Registro
            </DropdownMenuItem>
          }
          title="Excluir registro?"
          description={`Isso apagará permanentemente o registro de "${registro.nome}".`}
          actionText="Sim, excluir"
          onActionConfirm={handleDelete}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// ============================================================================
// ALERTA DE CONFIRMAÇÃO REUTILIZÁVEL
// ============================================================================
function AlertaAcao({
  trigger,
  title,
  description,
  actionText,
  onActionConfirm,
}: {
  trigger: ReactNode;
  title: string;
  description: string;
  actionText: string;
  onActionConfirm: () => void;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={onActionConfirm}
            className="bg-red-600 hover:bg-red-700"
          >
            {actionText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// ============================================================================
// MODAL DE NOVO REGISTRO
// ============================================================================
function ModalNovoRegistro({
  onRegistroCriado,
}: {
  onRegistroCriado: () => void;
}) {
  const [aberto, setAberto] = useState(false);
  const [novoRegistro, setNovoRegistro] = useState({
    nome: "",
    tipo: "visitante" as "visitante" | "entrega",
    cpf: "",
    telefone: "",
    apartamento: "",
    preAutorizado: false,
    recorrente: false,
  });

  const handleAdicionar = async () => {
    if (!novoRegistro.nome || !novoRegistro.apartamento) {
      toast.warning("Campos obrigatórios faltando", {
        description: "Informe o nome e o apartamento.",
      });
      return;
    }

    const payload = {
      ...novoRegistro,
      cpf: novoRegistro.cpf.replace(/\D/g, ""),
    };

    try {
      const response = await fetch(`${API_URL}/visitante/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Erro ao cadastrar visitante.");
      }

      toast.success("Registro criado com sucesso!");
      onRegistroCriado();
      setAberto(false);
      setNovoRegistro({
        nome: "",
        tipo: "visitante",
        cpf: "",
        telefone: "",
        apartamento: "",
        preAutorizado: false,
        recorrente: false,
      });
    } catch (error: any) {
      toast.error("Erro ao cadastrar visitante", {
        description: error.message || "Tente novamente.",
      });
    }
  };

  return (
    <Dialog open={aberto} onOpenChange={setAberto}>
      <DialogTrigger asChild>
    <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium h-10 px-4 rounded-md">
  <Plus className="h-4 w-4" /> Novo Registro
</Button>

      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Novo Visitante/Entrega</DialogTitle>
          <DialogDescription>
            Preencha os campos para criar um novo registro.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome</Label>
            <Input
              id="nome"
              value={novoRegistro.nome}
              onChange={(e) =>
                setNovoRegistro({ ...novoRegistro, nome: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tipo">Tipo</Label>
            <Select
              value={novoRegistro.tipo}
              onValueChange={(v) =>
                setNovoRegistro({
                  ...novoRegistro,
                  tipo: v as "visitante" | "entrega",
                })
              }
            >
              <SelectTrigger id="tipo">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="visitante">Visitante</SelectItem>
                <SelectItem value="entrega">Entrega</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cpf">CPF</Label>
            <InputMask
              mask="999.999.999-99"
              maskChar=""
              value={novoRegistro.cpf}
              onChange={(e) =>
                setNovoRegistro({ ...novoRegistro, cpf: e.target.value })
              }
            >
              {(inputProps: any) => (
                <Input {...inputProps} id="cpf" placeholder="000.000.000-00" />
              )}
            </InputMask>
          </div>

          <div className="space-y-2">
            <Label htmlFor="telefone">Telefone</Label>
            <InputMask
              mask="(99) 99999-9999"
              maskChar=""
              value={novoRegistro.telefone}
              onChange={(e) =>
                setNovoRegistro({ ...novoRegistro, telefone: e.target.value })
              }
            >
              {(inputProps: any) => (
                <Input {...inputProps} id="telefone" placeholder="(00) 00000-0000" />
              )}
            </InputMask>
          </div>

          <div className="space-y-2">
            <Label htmlFor="apartamento">Apartamento</Label>
            <Input
              id="apartamento"
              value={novoRegistro.apartamento}
              onChange={(e) =>
                setNovoRegistro({ ...novoRegistro, apartamento: e.target.value })
              }
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <Label htmlFor="preAutorizado">Pré-autorizado</Label>
            <Switch
              id="preAutorizado"
              checked={novoRegistro.preAutorizado}
              onCheckedChange={(v) =>
                setNovoRegistro({ ...novoRegistro, preAutorizado: v })
              }
            />
          </div>
                <div className="flex items-center justify-between">
            <Label htmlFor="recorrente">Recorrente</Label>
            <Switch
              id="recorrente"
              checked={novoRegistro.recorrente}
              onCheckedChange={(v) =>
                setNovoRegistro({ ...novoRegistro, recorrente: v })
              }
            />
          </div>

          <Button onClick={handleAdicionar} className="w-full mt-4">
            Salvar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}