import { randomBytes } from 'crypto';

export interface Encomenda {
  id: string;
  moradorId: string;
  unidade: string;
  porteiroId: string;
  codigoRetirada: string;
  status: 'pendente' | 'retirada';
  dataChegada: Date;
  dataRetirada?: Date;
  fotoChegada?: string;
  fotoRetirada?: string;
  retiradoPor?: string;
}

const encomendas: Encomenda[] = [];

export interface RegistroChegadaInput {
  moradorId: string;
  unidade: string;
  porteiroId: string;
  fotoChegada?: string;
}

export function registrarChegada({
  moradorId,
  unidade,
  porteiroId,
  fotoChegada
}: RegistroChegadaInput): Encomenda {
  const encomenda: Encomenda = {
    id: Date.now().toString(),
    moradorId,
    unidade,
    porteiroId,
    codigoRetirada: gerarCodigo(),
    status: 'pendente',
    dataChegada: new Date(),
    fotoChegada
  };

  encomendas.push(encomenda);
  notificarMorador(moradorId, encomenda);
  return encomenda;
}

export function confirmarRetiradaPorQRCode(
  codigo: string,
  options: { recebedor?: string; fotoRetirada?: string } = {}
): Encomenda {
  const encomenda = encomendas.find(e => e.codigoRetirada === codigo);
  if (!encomenda || encomenda.status !== 'pendente') {
    throw new Error('Encomenda inválida ou já retirada');
  }

  encomenda.status = 'retirada';
  encomenda.dataRetirada = new Date();
  encomenda.retiradoPor = options.recebedor || encomenda.moradorId;
  encomenda.fotoRetirada = options.fotoRetirada;
  return encomenda;
}

export function confirmarRetiradaPorUnidade(
  id: string,
  unidadeConfirmada: string,
  options: { recebedor?: string; fotoRetirada?: string } = {}
): Encomenda {
  const encomenda = encomendas.find(e => e.id === id && e.unidade === unidadeConfirmada);
  if (!encomenda || encomenda.status !== 'pendente') {
    throw new Error('Encomenda inválida ou já retirada');
  }

  encomenda.status = 'retirada';
  encomenda.dataRetirada = new Date();
  encomenda.retiradoPor = options.recebedor || encomenda.moradorId;
  encomenda.fotoRetirada = options.fotoRetirada;
  return encomenda;
}

export function listarHistorico(): Encomenda[] {
  return encomendas.filter(e => e.status === 'retirada');
}

export function listarPendentes(): Encomenda[] {
  return encomendas.filter(e => e.status === 'pendente');
}

export function listarHistoricoPorMorador(moradorId: string): Encomenda[] {
  return encomendas.filter(
    e => e.status === 'retirada' && e.moradorId === moradorId
  );
}

function gerarCodigo(): string {
  return randomBytes(4).toString('hex');
}

function notificarMorador(moradorId: string, encomenda: Encomenda): void {
  // Placeholder para integração com serviço de notificações
  console.log(`Notificação para morador ${moradorId}: encomenda ${encomenda.id} recebida`);
}
