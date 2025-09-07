import React, { createContext, useContext, useState, useEffect } from 'react';

type TipoUsuario = 'morador' | 'sindico' | null;

interface DadosUsuario {
  id: string;
  nome: string;
  email: string;
  tipo: TipoUsuario;
  apartamento?: string;
}

interface ContextoApp {
  // Tema
  temaDark: boolean;
  alternarTema: () => void;
  
  // Autenticação
  usuarioLogado: DadosUsuario | null;
  fazerLogin: (email: string, senha: string) => boolean;
  fazerLogout: () => void;
  estaCarregando: boolean;
}

const ContextoApp = createContext<ContextoApp | undefined>(undefined);

// Dados mockados para demonstração
const usuariosMock = [
  {
    id: '1',
    nome: 'João Silva',
    email: 'morador@email.com',
    senha: '123456',
    tipo: 'morador' as TipoUsuario,
    apartamento: '302'
  },
  {
    id: '2',
    nome: 'Maria Santos',
    email: 'sindico@email.com',
    senha: '123456',
    tipo: 'sindico' as TipoUsuario
  }
];

export function ProvedorContextoApp({ children }: { children: React.ReactNode }) {
  const [temaDark, setTemaDark] = useState(false);
  const [usuarioLogado, setUsuarioLogado] = useState<DadosUsuario | null>(null);
  const [estaCarregando, setEstaCarregando] = useState(true);

  // Carregar tema salvo
  useEffect(() => {
    const temaSalvo = localStorage.getItem('condominioTema');
    if (temaSalvo === 'dark') {
      setTemaDark(true);
      document.documentElement.classList.add('dark');
    }
    
    // Simular carregamento inicial
    setTimeout(() => setEstaCarregando(false), 1000);
  }, []);

  const alternarTema = () => {
    const novoTema = !temaDark;
    setTemaDark(novoTema);
    
    if (novoTema) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('condominioTema', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('condominioTema', 'light');
    }
  };

  const fazerLogin = (email: string, senha: string): boolean => {
    const usuario = usuariosMock.find(u => u.email === email && u.senha === senha);
    
    if (usuario) {
      const { senha: _, ...dadosUsuario } = usuario;
      setUsuarioLogado(dadosUsuario);
      return true;
    }
    
    return false;
  };

  const fazerLogout = () => {
    setUsuarioLogado(null);
  };

  return (
    <ContextoApp.Provider value={{
      temaDark,
      alternarTema,
      usuarioLogado,
      fazerLogin,
      fazerLogout,
      estaCarregando
    }}>
      {children}
    </ContextoApp.Provider>
  );
}

export function usarContextoApp() {
  const contexto = useContext(ContextoApp);
  if (!contexto) {
    throw new Error('usarContextoApp deve ser usado dentro de ProvedorContextoApp');
  }
  return contexto;
}