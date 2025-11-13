import { useState } from 'react';
import { Download, Upload, Plus, Trash } from 'lucide-react';
import { usarPlanoContas, CategoriaConta } from '../../contexts/PlanoContasContext';
import { toast } from "sonner";
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '../ui/select';

export function PaginaPlanoContas() {
  const { categorias, adicionarCategoria, removerCategoria, importarCategorias, exportarCategorias } = usarPlanoContas();
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState<'ativo' | 'passivo' | 'receita' | 'despesa' | ''>('');
  const [paiId, setPaiId] = useState('');

  const handleAdicionar = () => {
    if (!nome || !tipo) return;
    adicionarCategoria({ nome, tipo, paiId: paiId || undefined });
    setNome('');
    setTipo('');
    setPaiId('');
  };

  const handleImportar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const arquivo = e.target.files?.[0];
    if (!arquivo) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const dados = JSON.parse(ev.target?.result as string) as CategoriaConta[];
        importarCategorias(dados);
      } catch (error) {
        toast.error('Não foi possível importar o arquivo. Confira se o arquivo está no formato correto.');
        console.error('Erro ao importar categorias do plano de contas:', error);
      }
    };
    reader.readAsText(arquivo);
  };

  const handleExportar = () => {
    const dados = exportarCategorias();
    const blob = new Blob([dados], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'planoContas.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const categoriasRaiz = categorias.filter(c => !c.paiId);

  const renderCategoria = (cat: CategoriaConta) => {
    const filhos = categorias.filter(c => c.paiId === cat.id);
    return (
      <li key={cat.id} className="ml-4 list-disc">
        <div className="flex items-center gap-2">
          <span>{cat.nome} ({cat.tipo})</span>
          <Button variant="ghost" size="sm" onClick={() => removerCategoria(cat.id)} className="h-6 px-2">
            <Trash className="h-4 w-4" />
          </Button>
        </div>
        {filhos.length > 0 && (
          <ul className="ml-4">
            {filhos.map(f => renderCategoria(f))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1>Plano de Contas</h1>
          <p className="text-muted-foreground">Gerencie categorias e hierarquias financeiras</p>
        </div>
        <div className="flex gap-2">
          <Button className="gap-2" onClick={handleExportar}>
            <Download className="h-4 w-4" />
            Exportar
          </Button>
          <Button asChild className="gap-2">
            <label className="cursor-pointer flex items-center">
              <Upload className="h-4 w-4" />
              Importar
              <input type="file" accept="application/json" className="hidden" onChange={handleImportar} />
            </label>
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Input placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} />
          <Select value={tipo} onValueChange={v => setTipo(v as any)}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ativo">Ativo</SelectItem>
              <SelectItem value="passivo">Passivo</SelectItem>
              <SelectItem value="receita">Receita</SelectItem>
              <SelectItem value="despesa">Despesa</SelectItem>
            </SelectContent>
          </Select>
          <Select value={paiId || 'nenhuma'} onValueChange={v => setPaiId(v === 'nenhuma' ? '' : v)}>
  <SelectTrigger className="w-full sm:w-48">
    <SelectValue placeholder="Categoria pai" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="nenhuma">Nenhuma</SelectItem>
    {categorias.map(c => (
      <SelectItem key={c.id} value={c.id}>{c.nome}</SelectItem>
    ))}
  </SelectContent>
</Select>
          <Button onClick={handleAdicionar} className="gap-2 w-full sm:w-auto">
            <Plus className="h-4 w-4" />
            Adicionar
          </Button>
        </div>

        <ul className="ml-4 space-y-2">
          {categoriasRaiz.map(cat => renderCategoria(cat))}
        </ul>
      </div>
    </div>
  );
}

