import crypto from 'crypto';
import nodemailer from 'nodemailer';

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  role: 'morador' | 'gestor';
  bloco: string;
  unidade: string;
  tokenPush?: string;
}

interface ReuniaoInput {
  data: Date;
  espacoId: string;
  pautas: string[];
}

export interface Reuniao {
  id: string;
  data: Date;
  espacoId: string;
  pautas: string[];
  convocacaoCarta: string;
  presencas: string[]; // ids dos usuarios presentes
  assinaturaDigital: string;
}

interface ReservaEspaco {
  espacoId: string;
  data: Date;
  reuniaoId: string;
}

// Mock de usuarios
const usuarios: Usuario[] = [
  { id: '1', nome: 'Síndico', email: 'sindico@condominio.com', role: 'gestor', bloco: 'A', unidade: '101' },
  { id: '2', nome: 'Maria', email: 'maria@exemplo.com', role: 'morador', bloco: 'A', unidade: '102' },
  { id: '3', nome: 'João', email: 'joao@exemplo.com', role: 'morador', bloco: 'B', unidade: '201' },
  { id: '4', nome: 'Ana', email: 'ana@exemplo.com', role: 'morador', bloco: 'B', unidade: '202' }
];

// Mock de espaços
const espacos = [
  { id: '1', nome: 'Salão de Festas' },
  { id: '2', nome: 'Sala de Reuniões' }
];

const reservas: ReservaEspaco[] = [];
const reunioes: Reuniao[] = [];

export function criarReuniao(autorId: string, dados: ReuniaoInput): Reuniao {
  const autor = usuarios.find(u => u.id === autorId);
  if (!autor || autor.role !== 'gestor') {
    throw new Error('Apenas gestores podem convocar reuniões');
  }

  const conflito = reservas.some(r => r.espacoId === dados.espacoId && r.data.getTime() === dados.data.getTime());
  if (conflito) {
    throw new Error('Espaço já reservado para esta data');
  }

  const carta = gerarCartaConvocacao(dados);
  const reuniao: Reuniao = {
    id: Date.now().toString(),
    data: dados.data,
    espacoId: dados.espacoId,
    pautas: [...dados.pautas],
    convocacaoCarta: carta,
    presencas: [],
    assinaturaDigital: gerarAssinaturaDigital(carta)
  };

  reunioes.push(reuniao);
  reservas.push({ espacoId: dados.espacoId, data: dados.data, reuniaoId: reuniao.id });

  usuarios.filter(u => u.id !== autor.id).forEach(u => {
    enviarNotificacaoPush(u, reuniao);
    enviarEmailConvocacao(u.email, reuniao);
  });

  return reuniao;
}

export function listarReunioes(): Reuniao[] {
  return reunioes;
}

export function adicionarPauta(reuniaoId: string, pauta: string): void {
  const reuniao = reunioes.find(r => r.id === reuniaoId);
  if (!reuniao) {
    throw new Error('Reunião não encontrada');
  }
  reuniao.pautas.push(pauta);
}

export function registrarPresenca(reuniaoId: string, usuarioId: string): void {
  const reuniao = reunioes.find(r => r.id === reuniaoId);
  if (!reuniao) {
    throw new Error('Reunião não encontrada');
  }
  if (!usuarios.some(u => u.id === usuarioId)) {
    throw new Error('Usuário inválido');
  }
  if (!reuniao.presencas.includes(usuarioId)) {
    reuniao.presencas.push(usuarioId);
  }
}

export function gerarListaPresenca(reuniaoId: string): Usuario[] {
  const reuniao = reunioes.find(r => r.id === reuniaoId);
  if (!reuniao) {
    throw new Error('Reunião não encontrada');
  }
  return usuarios.filter(u => reuniao.presencas.includes(u.id));
}

export function gerarCartaConvocacao(dados: ReuniaoInput): string {
  const espaco = espacos.find(e => e.id === dados.espacoId)?.nome || 'local a definir';
  const dataStr = dados.data.toLocaleString('pt-BR');
  const pautas = dados.pautas.join(', ');
  return `Convocação para reunião no dia ${dataStr} no ${espaco}. Pautas: ${pautas}`;
}

function enviarNotificacaoPush(usuario: Usuario, reuniao: Reuniao): void {
  console.log(`Push para ${usuario.nome}: Reunião em ${reuniao.data.toLocaleString('pt-BR')}`);
}

async function enviarEmailConvocacao(destino: string, reuniao: Reuniao): Promise<void> {
  if (!process.env.SMTP_HOST) {
    console.log(`Email para ${destino}: Reunião em ${reuniao.data.toLocaleString('pt-BR')}`);
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  await transporter.sendMail({
    from: 'condominio@example.com',
    to: destino,
    subject: 'Convocação de Reunião',
    text: reuniao.convocacaoCarta
  });
}

function gerarAssinaturaDigital(conteudo: string): string {
  return crypto.createHash('sha256').update(conteudo).digest('hex');
}

