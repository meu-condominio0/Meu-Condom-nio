import React, { createContext, useContext, useReducer, useEffect } from 'react';

export interface CategoriaConta {
  id: string;
  nome: string;
  tipo: 'ativo' | 'passivo' | 'receita' | 'despesa';
  paiId?: string | null;
}

type Acao =
  | { tipo: 'adicionar'; categoria: CategoriaConta }
  | { tipo: 'atualizar'; categoria: CategoriaConta }
  | { tipo: 'remover'; id: string }
  | { tipo: 'importar'; categorias: CategoriaConta[] };

function reduzirCategorias(state: CategoriaConta[], acao: Acao): CategoriaConta[] {
  switch (acao.tipo) {
    case 'adicionar':
      return [...state, acao.categoria];
    case 'atualizar':
      return state.map(c => (c.id === acao.categoria.id ? acao.categoria : c));
    case 'remover': {
      const idsParaRemover = new Set<string>();
      const coletar = (id: string) => {
        idsParaRemover.add(id);
        state.filter(c => c.paiId === id).forEach(c => coletar(c.id));
      };
      coletar(acao.id);
      return state.filter(c => !idsParaRemover.has(c.id));
    }
    case 'importar':
      return acao.categorias;
    default:
      return state;
  }
}

interface PlanoContasContexto {
  categorias: CategoriaConta[];
  adicionarCategoria: (cat: Omit<CategoriaConta, 'id'>) => void;
  atualizarCategoria: (cat: CategoriaConta) => void;
  removerCategoria: (id: string) => void;
  importarCategorias: (cats: CategoriaConta[]) => void;
  exportarCategorias: () => string;
}

const PlanoContasContext = createContext<PlanoContasContexto | undefined>(undefined);

export function ProvedorPlanoContas({ children }: { children: React.ReactNode }) {
  const [categorias, dispatch] = useReducer(reduzirCategorias, [], () => {
    const armazenado = localStorage.getItem('planoContas');
    return armazenado ? JSON.parse(armazenado) : [];
  });

  useEffect(() => {
    localStorage.setItem('planoContas', JSON.stringify(categorias));
  }, [categorias]);

  const adicionarCategoria = (cat: Omit<CategoriaConta, 'id'>) => {
    const nova: CategoriaConta = { ...cat, id: Date.now().toString() };
    dispatch({ tipo: 'adicionar', categoria: nova });
  };

  const atualizarCategoria = (cat: CategoriaConta) => {
    dispatch({ tipo: 'atualizar', categoria: cat });
  };

  const removerCategoria = (id: string) => {
    dispatch({ tipo: 'remover', id });
  };

  const importarCategorias = (cats: CategoriaConta[]) => {
    dispatch({ tipo: 'importar', categorias: cats });
  };

  const exportarCategorias = () => JSON.stringify(categorias, null, 2);

  return (
    <PlanoContasContext.Provider value={{ categorias, adicionarCategoria, atualizarCategoria, removerCategoria, importarCategorias, exportarCategorias }}>
      {children}
    </PlanoContasContext.Provider>
  );
}

export function usarPlanoContas() {
  const contexto = useContext(PlanoContasContext);
  if (!contexto) {
    throw new Error('usarPlanoContas deve ser usado dentro de ProvedorPlanoContas');
  }
  return contexto;
}

