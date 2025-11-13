import { useState, useEffect } from "react";
import { Upload, Eye, Download, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

interface Documento {
  id: string;
  nome: string;
  categoria: string;
  tipo: string;
  tamanho: string;
  data_upload: string;
  descricao?: string;
  url: string;
}

export function PaginaAnexos() {
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [arquivoSelecionado, setArquivoSelecionado] = useState<File | null>(null);
  const [novoDoc, setNovoDoc] = useState({ nome: "", categoria: "", descricao: "" });
  const [modalUploadAberto, setModalUploadAberto] = useState(false);

  const API_URL = "http://localhost:8000/api/anexos";

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setDocumentos(data))
      .catch(() => toast.error("Erro ao buscar documentos"));
  }, []);


  const handleBaixarArquivo = async (arquivoUrl: string, nomeArquivo: string) => {
  try {
    const response = await fetch(`http://localhost:8000${arquivoUrl}`);
    if (!response.ok) throw new Error("Erro ao baixar arquivo");

    // Converte o arquivo em blob
    const blob = await response.blob();

    // Cria um link oculto para download forçado
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = nomeArquivo; // nome sugerido na janela de download
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    toast.error("Falha ao baixar o arquivo");
  }
};


  const handleUpload = async () => {
    if (!arquivoSelecionado || !novoDoc.nome || !novoDoc.categoria) return;

    const formData = new FormData();
    formData.append("file", arquivoSelecionado);
    formData.append("nome", novoDoc.nome);
    formData.append("categoria", novoDoc.categoria);
    formData.append("descricao", novoDoc.descricao);

    const res = await fetch(`${API_URL}/upload`, {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const novo = await res.json();
      setDocumentos([...documentos, novo]);
      setModalUploadAberto(false);
      setNovoDoc({ nome: "", categoria: "", descricao: "" });
      setArquivoSelecionado(null);
      toast.success("Upload realizado com sucesso!");
    } else {
      toast.error("Erro ao enviar o arquivo");
    }
  };

const handleExcluir = async (id: string, nome: string) => {
  const confirmar = window.confirm(`Deseja realmente excluir o arquivo "${nome}"?`);
  if (!confirmar) return;

  try {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

    if (res.ok) {
      setDocumentos(documentos.filter((d) => d.id !== id));
      toast.success("Documento excluído com sucesso!");
    } else {
      toast.error("Erro ao excluir documento.");
    }
  } catch (error) {
    toast.error("Não foi possível excluir o documento.");
  }
};


 return (
  <div className="space-y-8">
    {/* Header */}
    <div className="flex items-center justify-between flex-wrap gap-3">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Anexos</h1>
        <p className="text-muted-foreground">
          Gerencie documentos e arquivos do condomínio, separados por categoria.
        </p>
      </div>

      <Dialog open={modalUploadAberto} onOpenChange={setModalUploadAberto}>
        <DialogTrigger asChild>
          <Button className="bg-green-600 hover:bg-green-700 text-white gap-2">
            <Plus className="h-4 w-4" />
            Novo Documento
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md" aria-describedby="upload-descricao">
          <DialogHeader>
            <DialogTitle>Upload de Documento</DialogTitle>
          </DialogHeader>
          <div id="upload-descricao" className="sr-only">
            Faça o upload de documentos importantes do condomínio.
          </div>

          {/* 🔹 Reaproveita o mesmo conteúdo do modal que você já tinha */}
          <div className="space-y-4">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <input
                type="file"
                onChange={(e) => setArquivoSelecionado(e.target.files?.[0] || null)}
                className="mb-3 text-center"
              />
              <p className="text-sm text-muted-foreground mb-2">
                Clique aqui ou arraste arquivos
              </p>
              <p className="text-xs text-muted-foreground">
                Suporte: PDF, DOCX, JPG, PNG (sem limite de tamanho)
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nome">Nome do documento</Label>
              <Input
                id="nome"
                value={novoDoc.nome}
                onChange={(e) => setNovoDoc({ ...novoDoc, nome: e.target.value })}
                placeholder="Ex: Ata da Assembleia - Abril 2024"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="categoria">Categoria</Label>
              <Select
                value={novoDoc.categoria}
                onValueChange={(value) => setNovoDoc({ ...novoDoc, categoria: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="atas">Atas de Reunião</SelectItem>
                  <SelectItem value="balancetes">Balancetes</SelectItem>
                  <SelectItem value="contratos">Contratos</SelectItem>
                  <SelectItem value="regimentos">Regimentos</SelectItem>
                  <SelectItem value="outros">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="descricao">Descrição (opcional)</Label>
              <Textarea
                id="descricao"
                value={novoDoc.descricao}
                onChange={(e) => setNovoDoc({ ...novoDoc, descricao: e.target.value })}
                placeholder="Breve descrição do documento"
                rows={3}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setModalUploadAberto(false)}
              >
                Cancelar
              </Button>
              <Button
                className="flex-1"
                onClick={handleUpload}
                disabled={!novoDoc.nome || !novoDoc.categoria || !arquivoSelecionado}
              >
                Fazer Upload
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>

    {/* 🔸 Agrupamento por Categoria */}
    {["atas", "balancetes", "contratos", "regimentos", "outros"].map((categoria) => {
      const docsCategoria = documentos.filter((d) => d.categoria === categoria);
      if (docsCategoria.length === 0) return null;

      const nomesCategoria: Record<string, string> = {
        atas: "Atas de Reunião",
        balancetes: "Balancetes",
        contratos: "Contratos",
        regimentos: "Regimentos",
        outros: "Outros",
      };

      const cores: Record<string, string> = {
        atas: "text-blue-500",
        balancetes: "text-green-500",
        contratos: "text-yellow-500",
        regimentos: "text-purple-500",
        outros: "text-gray-400",
      };

      return (
        <div key={categoria} className="space-y-3">
          <h3 className={`text-xl font-semibold flex items-center gap-2 ${cores[categoria]}`}>
             {nomesCategoria[categoria]}{" "}
            <span className="text-muted-foreground text-sm">
              ({docsCategoria.length})
            </span>
          </h3>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {docsCategoria.map((doc) => (
              <Card key={doc.id} className="hover:shadow-md transition border-border/30">
                <CardHeader>
                  <CardTitle className="truncate">{doc.nome}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-3 truncate">
                    {doc.descricao || "Sem descrição"}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button asChild variant="outline" size="sm">
                      <a
                        href={`http://localhost:8000${doc.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Visualizar
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleBaixarArquivo(doc.url, doc.nome)}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleExcluir(doc.id, doc.nome)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Excluir
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      );
    })}

    {/* Caso não tenha nenhum */}
    {documentos.length === 0 && (
      <p className="text-center text-muted-foreground pt-10">
        Nenhum documento cadastrado ainda.
      </p>
    )}
  </div>
);
}