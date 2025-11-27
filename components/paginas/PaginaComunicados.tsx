import { useState, useEffect } from "react";
import { Search, Plus, MessageSquare, Clock, User, ChevronRight, Trash2 } from "lucide-react";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";

import { ModalFiltrarComunicados } from "../modais/ModalFiltrarComunicados";
import { ModalVerComunicado } from "../modais/ModalVerComunicado";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";

// =============================
// BASE URL IGUAL A USUÁRIOS
// =============================
const API_URL = "http://127.0.0.1:8000/api";

// =============================
// TIPAGEM
// =============================
interface Comunicado {
  id: number;
  titulo: string;
  mensagem: string;
  criado_em: string;
}

// =============================
// FUNÇÕES API
// =============================
const fetchComunicados = async (): Promise<Comunicado[]> => {
  const response = await fetch(`${API_URL}/comunicados`);
  if (!response.ok) {
    throw new Error("Erro ao carregar comunicados");
  }
  return await response.json();
};

const criarComunicado = async (payload: any): Promise<Comunicado> => {
  const response = await fetch(`${API_URL}/comunicados`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.detail || "Erro ao criar comunicado");
  }

  return await response.json();
};

const excluirComunicado = async (id: number) => {
  const response = await fetch(`${API_URL}/comunicados/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Erro ao excluir comunicado");
  }
};


// =================================================
//   COMPONENTE PRINCIPAL
// =================================================
export function PaginaComunicados() {
  const [comunicados, setComunicados] = useState<Comunicado[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalCriar, setModalCriar] = useState(false);

  const [titulo, setTitulo] = useState("");
  const [mensagem, setMensagem] = useState("");

  const [comunicadoSelecionado, setComunicadoSelecionado] = useState<Comunicado | null>(null);

  // =============================
  // CARREGAR COMUNICADOS
  // =============================
  const carregar = async () => {
    try {
      setLoading(true);
      const dados = await fetchComunicados();
      setComunicados(dados);
    } catch (err) {
      console.error("Erro ao carregar comunicados:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  // =============================
  // ENVIAR NOVO COMUNICADO
  // =============================
  const handleCriar = async () => {
    if (!titulo || !mensagem) {
      alert("Preencha todos os campos.");
      return;
    }

    try {
      await criarComunicado({ titulo, mensagem });
      setModalCriar(false);
      setTitulo("");
      setMensagem("");
      carregar();
    } catch (err: any) {
      alert(err.message);
    }
  };

  // ================================================
  // CATEGORIAS (frontend apenas)
  // ================================================
  const [categoriaAtiva, setCategoriaAtiva] = useState("todos");

  const comunicadosFiltrados = comunicados.filter(() => true);

  if (loading) {
    return <p className="p-6 text-center">Carregando comunicados...</p>;
  }

  return (
    <div className="space-y-8">

      {/* Cabeçalho */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Comunicados</h1>
          <p className="text-muted-foreground">Acompanhe os avisos do condomínio</p>
        </div>

        <Dialog open={modalCriar} onOpenChange={setModalCriar}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700 text-white gap-2">
              <Plus className="h-4 w-4" />
              Criar Comunicado
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Novo Comunicado</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label>Título</Label>
                <Input
                  placeholder="Ex: Manutenção na piscina"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Mensagem</Label>
                <textarea
                  className="border rounded-md w-full p-3 h-32 resize-none"
                  placeholder="Digite a mensagem do comunicado..."
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                />
              </div>

              <Button className="w-full" onClick={handleCriar}>
                Enviar Comunicado
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Campo de busca */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input placeholder="Buscar comunicados..." className="pl-10 h-11" />
      </div>

      {/* Abas */}
      <Tabs value={categoriaAtiva} onValueChange={setCategoriaAtiva}>
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="todos">Todos</TabsTrigger>
          <TabsTrigger value="avisos">Avisos</TabsTrigger>
          <TabsTrigger value="manutencao">Manutenção</TabsTrigger>
          <TabsTrigger value="eventos">Eventos</TabsTrigger>
          <TabsTrigger value="regras">Regras</TabsTrigger>
        </TabsList>

       <TabsContent value={categoriaAtiva} className="space-y-6 mt-6">
  {comunicadosFiltrados.length === 0 ? (
    <Card>
      <CardContent className="text-center py-16">
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 bg-accent/40 rounded-full flex items-center justify-center">
            <MessageSquare className="h-8 w-8 text-muted-foreground" />
          </div>
          <h4 className="font-medium">Nenhum comunicado</h4>
          <p className="text-muted-foreground">Não há comunicados cadastrados.</p>
        </div>
      </CardContent>
    </Card>
  ) : (
    comunicadosFiltrados.map((c) => (
      <Card key={c.id} className="hover:shadow-md transition-all">
        
        {/* HEADER DO CARD */}
        <CardHeader className="pb-3 flex flex-row justify-between items-start">
          
          {/* TÍTULO (abre o modal ao clicar) */}
          <div
            className="flex-1 cursor-pointer"
            onClick={() => setComunicadoSelecionado(c)}
          >
            <CardTitle>{c.titulo}</CardTitle>
          </div>

          {/* BOTÃO DE EXCLUIR */}
          <Button
            variant="ghost"
            size="icon"
            className="text-red-600 hover:text-red-700 hover:bg-red-100"
            onClick={async (e) => {
              e.stopPropagation(); // NÃO abrir modal
              if (confirm("Tem certeza que deseja excluir este comunicado?")) {
                try {
                  await excluirComunicado(c.id);
                  carregar(); // recarrega lista
                } catch (err) {
                  alert("Erro ao excluir comunicado");
                }
              }
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>

        </CardHeader>

        {/* CONTEÚDO DO CARD */}
        <CardContent
          className="cursor-pointer"
          onClick={() => setComunicadoSelecionado(c)}
        >
          <p className="text-muted-foreground truncate">{c.mensagem}</p>

          <div className="flex items-center gap-3 mt-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" /> Administração
            </div>

            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {new Date(c.criado_em).toLocaleString("pt-BR")}
            </div>

            <ChevronRight className="h-4 w-4 ml-auto" />
          </div>
        </CardContent>

      </Card>
    ))
  )}
</TabsContent>

      </Tabs>

      {comunicadoSelecionado && (
        <ModalVerComunicado
          comunicado={{
            titulo: comunicadoSelecionado.titulo,
            conteudo: comunicadoSelecionado.mensagem,
            autor: "Administração",
            data: new Date(comunicadoSelecionado.criado_em).toLocaleString("pt-BR"),
            categoria: "todos",
            prioridade: "media",
          }}
          onClose={() => setComunicadoSelecionado(null)}
          getCategoriaNome={() => "Comunicado"}
          getPrioridadeBadge={() => ({ variant: "secondary", label: "Normal" })}
        />
      )}
    </div>
  );
}
