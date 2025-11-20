// src/Contexts/AppContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from "../components/src/services/api"; // AGORA O CAMINHO ESTÁ CORRETO

type TipoUsuario = "morador" | "sindico" | null;

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
  temaDark: boolean;
  alternarTema: () => void;

  usuarioLogado: DadosUsuario | null;
  fazerLogin: (email: string, senha: string) => Promise<boolean>;
  fazerLogout: () => void;
  estaCarregando: boolean;

  atualizarUsuario: (dados: Partial<DadosUsuario>) => Promise<void>;
  atualizarConfiguracoes: (
    novas: Partial<ConfiguracoesNotificacao>
  ) => Promise<void>;
}

const ContextoApp = createContext<ContextoApp | undefined>(undefined);

export function ProvedorContextoApp({
  children,
}: {
  children: React.ReactNode;
}) {
  const [temaDark, setTemaDark] = useState(false);
  const [usuarioLogado, setUsuarioLogado] = useState<DadosUsuario | null>(null);
  const [estaCarregando, setEstaCarregando] = useState(true);

  // ==========================
  // 1) Carregar tema salvo
  // ==========================
  useEffect(() => {
    const temaSalvo = localStorage.getItem("condominioTema");
    if (temaSalvo === "dark") {
      setTemaDark(true);
      document.documentElement.classList.add("dark");
    }

    carregarUsuarioLogado();
  }, []);

  // ==========================
  // 2) Alternar tema
  // ==========================
  const alternarTema = () => {
    const novoTema = !temaDark;
    setTemaDark(novoTema);

    if (novoTema) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("condominioTema", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("condominioTema", "light");
    }
  };

  // ==========================
  // 3) Carregar usuário via /auth/me
  // ==========================
  const carregarUsuarioLogado = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setEstaCarregando(false);
      return;
    }

    try {
      const resp = await api.get("/auth/me");
      setUsuarioLogado(resp.data);
    } catch {
      // token inválido → força logout
      localStorage.removeItem("token");
    } finally {
      setEstaCarregando(false);
    }
  };

  // ==========================
  // 4) Login REAL
  // ==========================
  const fazerLogin = async (email: string, senha: string): Promise<boolean> => {
    try {
      const resp = await api.post("/auth/login", {
        email,
        senha,
      });

      // Salva token
      localStorage.setItem("token", resp.data.access_token);

      // Salva usuário no contexto
      setUsuarioLogado(resp.data.usuario);

      return true;
    } catch (error: any) {
      return false;
    }
  };

  // ==========================
  // 5) Logout REAL
  // ==========================
  const fazerLogout = () => {
    localStorage.removeItem("token");
    setUsuarioLogado(null);
  };

  // ==========================
  // 6) Atualizar dados do usuário
  // ==========================
  const atualizarUsuario = async (dados: Partial<DadosUsuario>) => {
    if (!usuarioLogado) return;

    const novosDados = { ...usuarioLogado, ...dados };
    setUsuarioLogado(novosDados);

    // Aqui você pode depois fazer PUT /usuarios/{id}
  };

  // ==========================
  // 7) Atualizar notificações
  // ==========================
  const atualizarConfiguracoes = async (
    novas: Partial<ConfiguracoesNotificacao>
  ) => {
    if (!usuarioLogado) return;

    const atualizadas = {
      ...usuarioLogado.configuracoes?.notificacoes,
      ...novas,
    };

    const novoUsuario = {
      ...usuarioLogado,
      configuracoes: {
        notificacoes: atualizadas,
      },
    };

    setUsuarioLogado(novoUsuario);
  };

  return (
    <ContextoApp.Provider
      value={{
        temaDark,
        alternarTema,
        usuarioLogado,
        fazerLogin,
        fazerLogout,
        estaCarregando,
        atualizarUsuario,
        atualizarConfiguracoes,
      }}
    >
      {children}
    </ContextoApp.Provider>
  );
}

export function usarContextoApp() {
  const contexto = useContext(ContextoApp);
  if (!contexto) {
    throw new Error(
      "usarContextoApp deve ser usado dentro de ProvedorContextoApp"
    );
  }
  return contexto;
}
