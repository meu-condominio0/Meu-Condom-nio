import { CategoriaConta } from '../contexts/PlanoContasContext';

export interface Lancamento {
  categoriaId: string;
  valor: number;
}

export interface BalanceteItem {
  id: string;
  nome: string;
  total: number;
  filhos?: BalanceteItem[];
}

export function gerarBalanceteSintetico(categorias: CategoriaConta[], lancamentos: Lancamento[]): BalanceteItem[] {
  const mapa = new Map(categorias.map(c => [c.id, c]));
  const totais = new Map<string, number>();

  const encontrarRaiz = (id: string): string => {
    const cat = mapa.get(id);
    if (cat?.paiId) {
      return encontrarRaiz(cat.paiId);
    }
    return cat ? cat.id : id;
  };

  for (const l of lancamentos) {
    const raiz = encontrarRaiz(l.categoriaId);
    totais.set(raiz, (totais.get(raiz) || 0) + l.valor);
  }

  return categorias
    .filter(c => !c.paiId)
    .map(c => ({ id: c.id, nome: c.nome, total: totais.get(c.id) || 0 }));
}

export function gerarBalanceteAnalitico(categorias: CategoriaConta[], lancamentos: Lancamento[]): BalanceteItem[] {
  const mapa = new Map(categorias.map(c => [c.id, c]));
  const filhos = new Map<string | undefined | null, CategoriaConta[]>();
  for (const c of categorias) {
    const arr = filhos.get(c.paiId) || [];
    arr.push(c);
    filhos.set(c.paiId, arr);
  }

  const totaisDiretos = new Map<string, number>();
  for (const l of lancamentos) {
    totaisDiretos.set(l.categoriaId, (totaisDiretos.get(l.categoriaId) || 0) + l.valor);
  }

  const construir = (id: string): BalanceteItem => {
    const cat = mapa.get(id)!;
    const sub = filhos.get(id) || [];
    const filhosItens = sub.map(s => construir(s.id));
    const totalFilhos = filhosItens.reduce((s, f) => s + f.total, 0);
    const proprio = totaisDiretos.get(id) || 0;
    const item: BalanceteItem = { id, nome: cat.nome, total: proprio + totalFilhos };
    if (filhosItens.length) item.filhos = filhosItens;
    return item;
  };

  return (filhos.get(undefined) || filhos.get(null) || [])
    .map(f => construir(f.id));
}

