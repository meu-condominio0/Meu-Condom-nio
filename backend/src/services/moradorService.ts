export type PerfilMorador = 'proprietario' | 'inquilino';
export type RoleUsuario = 'admin' | 'morador' | 'porteiro';

export interface Morador {
  id: string;
  nome: string;
  email: string;
  telefone?: string;
  tipo: PerfilMorador;
  unidades: string[];
  status: 'ativo' | 'inativo';
}

export interface UsuarioAutenticado {
  id: string;
  role: RoleUsuario;
}

const moradores: Morador[] = [];

function garantirPermissaoAdmin(requester: UsuarioAutenticado) {
  if (requester.role !== 'admin') {
    throw new Error('Acesso negado');
  }
}

export function listarMoradores(requester: UsuarioAutenticado): Morador[] {
  if (requester.role === 'admin') {
    return moradores;
  }
  return moradores.filter(m => m.id === requester.id);
}

export function obterMorador(id: string, requester: UsuarioAutenticado): Morador {
  if (requester.role !== 'admin' && requester.id !== id) {
    throw new Error('Acesso negado');
  }
  const morador = moradores.find(m => m.id === id);
  if (!morador) {
    throw new Error('Morador não encontrado');
  }
  return morador;
}

export function cadastrarMorador(dados: Omit<Morador, 'id'>, requester: UsuarioAutenticado): Morador {
  garantirPermissaoAdmin(requester);
  const novo: Morador = { ...dados, id: Date.now().toString() };
  moradores.push(novo);
  return novo;
}

export function editarMorador(id: string, dados: Partial<Omit<Morador, 'id'>>, requester: UsuarioAutenticado): Morador {
  if (requester.role !== 'admin' && requester.id !== id) {
    throw new Error('Acesso negado');
  }
  const morador = moradores.find(m => m.id === id);
  if (!morador) {
    throw new Error('Morador não encontrado');
  }
  Object.assign(morador, dados);
  return morador;
}

export function excluirMorador(id: string, requester: UsuarioAutenticado): void {
  garantirPermissaoAdmin(requester);
  const index = moradores.findIndex(m => m.id === id);
  if (index === -1) {
    throw new Error('Morador não encontrado');
  }
  moradores.splice(index, 1);
}
