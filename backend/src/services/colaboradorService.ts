import { UsuarioAutenticado } from './moradorService';

export type TipoColaborador = 'porteiro' | 'zelador' | 'seguranca';

export interface Colaborador {
  id: string;
  nome: string;
  funcao: TipoColaborador;
  turno: string;
}

const colaboradores: Colaborador[] = [];

function garantirPermissaoAdmin(requester: UsuarioAutenticado) {
  if (requester.role !== 'admin') {
    throw new Error('Acesso negado');
  }
}

export function listarColaboradores(): Colaborador[] {
  return colaboradores;
}

export function adicionarColaborador(
  dados: Omit<Colaborador, 'id'>,
  requester: UsuarioAutenticado
): Colaborador {
  garantirPermissaoAdmin(requester);
  const novo: Colaborador = { ...dados, id: Date.now().toString() };
  colaboradores.push(novo);
  return novo;
}
