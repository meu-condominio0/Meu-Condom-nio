import { useState } from 'react';
import { Upload, FileText, Search, Filter, Eye, Download, Trash2, Plus, File, Image } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';

interface Documento {
  id: string;
  nome: string;
  categoria: 'atas' | 'regulamentos' | 'comunicados' | 'manuais' | 'outros';
  tipo: 'pdf' | 'docx' | 'jpg' | 'png';
  tamanho: string;
  dataUpload: string;
  descricao?: string;
  url: string;
}

const documentosMock: Documento[] = [
  {
    id: '1',
    nome: 'Ata da Assembleia - Janeiro 2024',
    categoria: 'atas',
    tipo: 'pdf',
    tamanho: '2.3 MB',
    dataUpload: '15/01/2024',
    descricao: 'Ata da assembleia ordinária de janeiro',
    url: '#'
  },
  {
    id: '2',
    nome: 'Regulamento Interno Atualizado',
    categoria: 'regulamentos',
    tipo: 'pdf',
    tamanho: '1.8 MB',
    dataUpload: '03/02/2024',
    descricao: 'Regulamento interno com as novas normas aprovadas',
    url: '#'
  },
  {
    id: '3',
    nome: 'Manual da Academia',
    categoria: 'manuais',
    tipo: 'pdf',
    tamanho: '5.2 MB',
    dataUpload: '20/02/2024',
    descricao: 'Instruções de uso dos equipamentos da academia',
    url: '#'
  },
  {
    id: '4',
    nome: 'Comunicado - Manutenção Elevadores',
    categoria: 'comunicados',
    tipo: 'docx',
    tamanho: '0.5 MB',
    dataUpload: '10/03/2024',
    descricao: 'Cronograma de manutenção dos elevadores',
    url: '#'
  },
  {
    id: '5',
    nome: 'Planta do Salão de Festas',
    categoria: 'outros',
    tipo: 'jpg',
    tamanho: '1.2 MB',
    dataUpload: '25/03/2024',
    descricao: 'Layout do salão para organização de eventos',
    url: '#'
  }
];

export function PaginaAnexos() {
  const [documentos, setDocumentos] = useState(documentosMock);
  const [termoBusca, setTermoBusca] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('todas');
  const [modalUploadAberto, setModalUploadAberto] = useState(false);
  const [novoDocumento, setNovoDocumento] = useState({
    nome: '',
    categoria: '',
    descricao: ''
  });

  const documentosFiltrados = documentos.filter(doc => {
    const correspondeTermo = doc.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
                           doc.descricao?.toLowerCase().includes(termoBusca.toLowerCase());
    const correspondeCategoria = categoriaFiltro === 'todas' || doc.categoria === categoriaFiltro;
    
    return correspondeTermo && correspondeCategoria;
  });

  const getIconeArquivo = (tipo: string) => {
    switch (tipo) {
      case 'pdf':
      case 'docx':
        return <FileText className="h-8 w-8 text-red-600" />;
      case 'jpg':
      case 'png':
        return <Image className="h-8 w-8 text-blue-600" />;
      default:
        return <File className="h-8 w-8 text-gray-600" />;
    }
  };

  const getCategoriaNome = (categoria: string) => {
    const nomes = {
      todas: 'Todas',
      atas: 'Atas de Reunião',
      regulamentos: 'Regulamentos',
      comunicados: 'Comunicados Oficiais',
      manuais: 'Manuais de Manutenção',
      outros: 'Outros'
    };
    return nomes[categoria as keyof typeof nomes] || categoria;
  };

  const getCategoriaVariant = (categoria: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      atas: 'default',
      regulamentos: 'secondary',
      comunicados: 'outline',
      manuais: 'secondary',
      outros: 'outline'
    };
    return variants[categoria] || 'outline';
  };

  const handleExcluirDocumento = (id: string) => {
    setDocumentos(docs => docs.filter(doc => doc.id !== id));
  };

  const handleUploadDocumento = () => {
    if (novoDocumento.nome && novoDocumento.categoria) {
      // Simular upload
      const novoDoc: Documento = {
        id: (documentos.length + 1).toString(),
        nome: novoDocumento.nome,
        categoria: novoDocumento.categoria as any,
        tipo: 'pdf',
        tamanho: '1.0 MB',
        dataUpload: new Date().toLocaleDateString('pt-BR'),
        descricao: novoDocumento.descricao,
        url: '#'
      };
      
      setDocumentos([...documentos, novoDoc]);
      setModalUploadAberto(false);
      setNovoDocumento({ nome: '', categoria: '', descricao: '' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Anexos</h2>
          <p className="text-muted-foreground">
            Gerencie os documentos importantes do condomínio
          </p>
        </div>
        
        <Dialog open={modalUploadAberto} onOpenChange={setModalUploadAberto}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Novo Documento
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Upload de Documento</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">
                  Clique aqui ou arraste arquivos
                </p>
                <p className="text-xs text-muted-foreground">
                  Suporte: PDF, DOCX, JPG, PNG (máx. 10MB)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nome">Nome do documento</Label>
                <Input
                  id="nome"
                  value={novoDocumento.nome}
                  onChange={(e) => setNovoDocumento({...novoDocumento, nome: e.target.value})}
                  placeholder="Ex: Ata da Assembleia - Abril 2024"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="categoria">Categoria</Label>
                <Select value={novoDocumento.categoria} onValueChange={(value) => setNovoDocumento({...novoDocumento, categoria: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="atas">Atas de Reunião</SelectItem>
                    <SelectItem value="regulamentos">Regulamentos</SelectItem>
                    <SelectItem value="comunicados">Comunicados Oficiais</SelectItem>
                    <SelectItem value="manuais">Manuais de Manutenção</SelectItem>
                    <SelectItem value="outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição (opcional)</Label>
                <Textarea
                  id="descricao"
                  value={novoDocumento.descricao}
                  onChange={(e) => setNovoDocumento({...novoDocumento, descricao: e.target.value})}
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
                  onClick={handleUploadDocumento}
                  disabled={!novoDocumento.nome || !novoDocumento.categoria}
                >
                  Fazer Upload
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
            placeholder="Buscar documentos..."
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={categoriaFiltro} onValueChange={setCategoriaFiltro}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todas as categorias</SelectItem>
            <SelectItem value="atas">Atas de Reunião</SelectItem>
            <SelectItem value="regulamentos">Regulamentos</SelectItem>
            <SelectItem value="comunicados">Comunicados Oficiais</SelectItem>
            <SelectItem value="manuais">Manuais de Manutenção</SelectItem>
            <SelectItem value="outros">Outros</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Abas por categoria */}
      <Tabs value={categoriaFiltro} onValueChange={setCategoriaFiltro}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="todas">Todas</TabsTrigger>
          <TabsTrigger value="atas">Atas</TabsTrigger>
          <TabsTrigger value="regulamentos">Regulamentos</TabsTrigger>
          <TabsTrigger value="comunicados">Comunicados</TabsTrigger>
          <TabsTrigger value="manuais">Manuais</TabsTrigger>
          <TabsTrigger value="outros">Outros</TabsTrigger>
        </TabsList>

        <TabsContent value={categoriaFiltro} className="space-y-4">
          {documentosFiltrados.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">
                  Nenhum documento encontrado para os filtros selecionados.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {documentosFiltrados.map((documento) => (
                <Card key={documento.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        {getIconeArquivo(documento.tipo)}
                        <div className="min-w-0 flex-1">
                          <CardTitle className="text-sm line-clamp-2">{documento.nome}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant={getCategoriaVariant(documento.categoria)} className="text-xs">
                              {getCategoriaNome(documento.categoria)}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    {documento.descricao && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {documento.descricao}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{documento.tamanho}</span>
                      <span>{documento.dataUpload}</span>
                    </div>
                    
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm" className="flex-1 gap-1">
                        <Eye className="h-3 w-3" />
                        Visualizar
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 gap-1">
                        <Download className="h-3 w-3" />
                        Download
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm" className="gap-1 text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                            <AlertDialogDescription>
                              Tem certeza de que deseja excluir o documento "{documento.nome}"? 
                              Esta ação não pode ser desfeita.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleExcluirDocumento(documento.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Excluir
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
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