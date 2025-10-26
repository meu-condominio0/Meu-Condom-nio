import React, { createContext, useContext, useState, useEffect } from 'react';

type TipoUsuario = 'morador' | 'sindico' | null;

interface ConfiguracoesNotificacao {
  push: boolean;
  email: boolean;
  sms: boolean;
}

interface DadosUsuario {
  id: string;
  nome: string;
  email: string;
  tipo: TipoUsuario;
  apartamento?: string;
  isentoTaxaCondominial?: boolean;
  fracaoIdeal?: number;
  configuracoes?: {
    notificacoes: ConfiguracoesNotificacao;
  };
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

  // Adicionar função de atualização
  atualizarUsuario: (dadosAtualizados: Partial<DadosUsuario>) => Promise<void>;
  atualizarConfiguracoes: (novasConfiguracoes: Partial<ConfiguracoesNotificacao>) => Promise<void>;
}

const ContextoApp = createContext<ContextoApp | undefined>(undefined);

// Dados mockados para demonstração
export const usuariosMock: (DadosUsuario & { senha: string })[] = [
  {
    id: '1',
    nome: 'João Silva',
    email: 'morador@email.com',
    senha: '123456',
    tipo: 'morador' as TipoUsuario,
    apartamento: '302',
    fracaoIdeal: 80,
    isentoTaxaCondominial: false,
    configuracoes: {
      notificacoes: {
        push: true,
        email: true,
        sms: false
      }
    }
  },
  {
    id: '2',
    nome: 'Ana Souza',
    email: 'ana@email.com',
    senha: '123456',
    tipo: 'morador' as TipoUsuario,
    apartamento: '402',
    fracaoIdeal: 70,
    isentoTaxaCondominial: false,
    configuracoes: {
      notificacoes: {
        push: true,
        email: true,
        sms: false
      }
    }
  },
  {
    id: '3',
    nome: 'Maria Santos',
    email: 'sindico@email.com',
    senha: '123456',
    tipo: 'sindico' as TipoUsuario,
    fracaoIdeal: 100,
    isentoTaxaCondominial: true,
    configuracoes: {
      notificacoes: {
        push: true,
        email: true,
        sms: false
      }
    }
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

  const atualizarUsuario = async (dadosAtualizados: Partial<DadosUsuario>) => {
    if (!usuarioLogado) return;
    
    // Atualizar usuário no estado
    const novosDados = { ...usuarioLogado, ...dadosAtualizados };
    setUsuarioLogado(novosDados);
    
    // Atualizar na "base de dados" mock
    const index = usuariosMock.findIndex(u => u.id === usuarioLogado.id);
    if (index !== -1) {
      usuariosMock[index] = { ...usuariosMock[index], ...dadosAtualizados };
    }

    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 500));
  };

  const atualizarConfiguracoes = async (novasConfiguracoes: Partial<ConfiguracoesNotificacao>) => {
    if (!usuarioLogado) return;

    const configuracoesAtualizadas = {
      ...usuarioLogado.configuracoes?.notificacoes,
      ...novasConfiguracoes
    };

    const novoUsuario = {
      ...usuarioLogado,
      configuracoes: {
        ...usuarioLogado.configuracoes,
        notificacoes: configuracoesAtualizadas
      }
    };

    setUsuarioLogado(novoUsuario);

    // Atualizar mock
    const index = usuariosMock.findIndex(u => u.id === usuarioLogado.id);
    if (index !== -1) {
      usuariosMock[index] = { ...usuariosMock[index], ...novoUsuario };
    }
  };

  return (
    <ContextoApp.Provider value={{
      temaDark,
      alternarTema,
      usuarioLogado,
      fazerLogin,
      fazerLogout,
      estaCarregando,
      atualizarUsuario, // Adicionar ao provider
      atualizarConfiguracoes
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
