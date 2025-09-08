import { UsuarioAutenticado } from './moradorService';

export type TipoFornecedor = 'pf' | 'pj';

export interface Fornecedor {
  id: string;
  tipo: TipoFornecedor;
  nome: string;
  documento: string; // CPF ou CNPJ
  contato?: string;
}

export interface HistoricoFornecedor {
  fornecedor: Fornecedor;
  acao: string;
  data: string; // ISO
}

const fornecedores: Fornecedor[] = [];
const historico: HistoricoFornecedor[] = [];

function garantirPermissaoAdmin(requester: UsuarioAutenticado) {
  if (requester.role !== 'admin') {
    throw new Error('Acesso negado');
  }
}

function maskDocumento(doc: string): string {
  const clean = doc.replace(/\D/g, '');
  const last4 = clean.slice(-4);
  return clean.slice(0, -4).replace(/\d/g, '*') + last4;
}

export function cadastrarFornecedor(
  dados: Omit<Fornecedor, 'id'>,
  requester: UsuarioAutenticado
): Fornecedor {
  garantirPermissaoAdmin(requester);
  const novo: Fornecedor = { ...dados, id: Date.now().toString() };
  fornecedores.push(novo);
  historico.push({ fornecedor: novo, acao: 'cadastrado', data: new Date().toISOString() });
  return { ...novo, documento: maskDocumento(novo.documento) };
}

export function listarFornecedores(): Fornecedor[] {
  return fornecedores.map(f => ({ ...f, documento: maskDocumento(f.documento) }));
}

export function buscarFornecedores(query: string): Fornecedor[] {
  const normalized = query.replace(/\D/g, '').toLowerCase();
  return fornecedores
    .filter(f =>
      f.nome.toLowerCase().includes(query.toLowerCase()) ||
      f.documento.replace(/\D/g, '').includes(normalized)
    )
    .map(f => ({ ...f, documento: maskDocumento(f.documento) }));
}

export function listarHistoricoFornecedores(): HistoricoFornecedor[] {
  return historico.map(h => ({
    ...h,
    fornecedor: { ...h.fornecedor, documento: maskDocumento(h.fornecedor.documento) }
  }));
}
