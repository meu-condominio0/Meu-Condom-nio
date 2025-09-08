import React, { createContext, useContext, useReducer, useEffect } from 'react';

export interface Lancamento {
  id: string;
  data: string;
  tipo: 'receita' | 'despesa';
  categoria: string;
  descricao: string;
  valor: number;
}

type Acao =
  | { tipo: 'adicionar'; lancamento: Lancamento }
  | { tipo: 'importar'; lancamentos: Lancamento[] };

function reduzirLancamentos(state: Lancamento[], acao: Acao): Lancamento[] {
  switch (acao.tipo) {
    case 'adicionar':
      return [...state, acao.lancamento];
    case 'importar':
      return [...state, ...acao.lancamentos];
    default:
      return state;
  }
}

interface LancamentosContexto {
  lancamentos: Lancamento[];
  importarLancamentos: (lancamentos: Lancamento[]) => void;
}

const LancamentosContext = createContext<LancamentosContexto | undefined>(undefined);

export function ProvedorLancamentos({ children }: { children: React.ReactNode }) {
  const [lancamentos, dispatch] = useReducer(reduzirLancamentos, [], () => {
    const armazenado = localStorage.getItem('lancamentos');
    return armazenado ? JSON.parse(armazenado) : [];
    });

  useEffect(() => {
    localStorage.setItem('lancamentos', JSON.stringify(lancamentos));
  }, [lancamentos]);

  const importarLancamentos = (lancs: Lancamento[]) => {
    dispatch({ tipo: 'importar', lancamentos: lancs });
  };

  return (
    <LancamentosContext.Provider value={{ lancamentos, importarLancamentos }}>
      {children}
    </LancamentosContext.Provider>
  );
}

export function usarLancamentos() {
  const contexto = useContext(LancamentosContext);
  if (!contexto) {
    throw new Error('usarLancamentos deve ser usado dentro de ProvedorLancamentos');
  }
  return contexto;
}

