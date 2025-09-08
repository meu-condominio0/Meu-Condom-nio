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

export interface Resposta {
  usuarioId: string;
  opcao?: string;
  texto?: string;
  data: Date;
  assinaturaDigital: string;
}

export interface Enquete {
  id: string;
  pergunta: string;
  tipo: 'multipla' | 'descritiva';
  opcoes?: string[];
  blocos?: string[];
  destinatarios: string[]; // ids dos usuarios
  reuniaoId?: string;
  respostas: Resposta[];
  dataCriacao: Date;
  assinaturaDigital: string;
}

// Mock de usuarios
const usuarios: Usuario[] = [
  { id: '1', nome: 'Síndico', email: 'sindico@condominio.com', role: 'gestor', bloco: 'A', unidade: '101' },
  { id: '2', nome: 'Maria', email: 'maria@exemplo.com', role: 'morador', bloco: 'A', unidade: '102' },
  { id: '3', nome: 'João', email: 'joao@exemplo.com', role: 'morador', bloco: 'B', unidade: '201' },
  { id: '4', nome: 'Ana', email: 'ana@exemplo.com', role: 'morador', bloco: 'B', unidade: '202' }
];

const enquetes: Enquete[] = [];

interface EnqueteInput {
  pergunta: string;
  tipo: 'multipla' | 'descritiva';
  opcoes?: string[];
  blocos?: string[];
  reuniaoId?: string;
}

export function criarEnquete(autorId: string, dados: EnqueteInput): Enquete {
  const autor = usuarios.find(u => u.id === autorId);
  if (!autor || autor.role !== 'gestor') {
    throw new Error('Apenas gestores podem criar enquetes');
  }

  let destinatarios: Usuario[];
  if (dados.blocos && dados.blocos.length > 0) {
    destinatarios = usuarios.filter(u => dados.blocos!.includes(u.bloco));
  } else {
    destinatarios = usuarios.filter(u => u.id !== autor.id);
  }

  if (dados.tipo === 'multipla' && (!dados.opcoes || dados.opcoes.length === 0)) {
    throw new Error('Enquetes de múltipla escolha requerem opções');
  }

  const enquete: Enquete = {
    id: Date.now().toString(),
    pergunta: dados.pergunta,
    tipo: dados.tipo,
    opcoes: dados.tipo === 'multipla' ? dados.opcoes : undefined,
    blocos: dados.blocos,
    destinatarios: destinatarios.map(d => d.id),
    reuniaoId: dados.reuniaoId,
    respostas: [],
    dataCriacao: new Date(),
    assinaturaDigital: gerarAssinaturaDigital(dados.pergunta + Date.now().toString())
  };

  enquetes.push(enquete);

  destinatarios.forEach(u => {
    enviarNotificacaoPush(u, enquete);
    enviarEmailEnquete(u.email, enquete);
  });

  return enquete;
}

export function listarEnquetes(): Enquete[] {
  return enquetes;
}

export function responderEnquete(enqueteId: string, usuarioId: string, resposta: { opcao?: string; texto?: string; }): Resposta {
  const enquete = enquetes.find(e => e.id === enqueteId);
  if (!enquete) {
    throw new Error('Enquete não encontrada');
  }
  if (!enquete.destinatarios.includes(usuarioId)) {
    throw new Error('Usuário não autorizado a responder');
  }
  if (enquete.respostas.some(r => r.usuarioId === usuarioId)) {
    throw new Error('Usuário já respondeu esta enquete');
  }
  let novaResposta: Resposta;
  if (enquete.tipo === 'multipla') {
    if (!resposta.opcao || !enquete.opcoes?.includes(resposta.opcao)) {
      throw new Error('Opção inválida');
    }
    novaResposta = {
      usuarioId,
      opcao: resposta.opcao,
      data: new Date(),
      assinaturaDigital: gerarAssinaturaDigital(usuarioId + resposta.opcao + Date.now().toString())
    };
  } else {
    if (!resposta.texto) {
      throw new Error('Resposta descritiva requer texto');
    }
    novaResposta = {
      usuarioId,
      texto: resposta.texto,
      data: new Date(),
      assinaturaDigital: gerarAssinaturaDigital(usuarioId + resposta.texto + Date.now().toString())
    };
  }

  enquete.respostas.push(novaResposta);
  return novaResposta;
}

export function gerarRelatorio(enqueteId: string) {
  const enquete = enquetes.find(e => e.id === enqueteId);
  if (!enquete) {
    throw new Error('Enquete não encontrada');
  }
  if (enquete.tipo === 'multipla') {
    const contagem = enquete.opcoes!.map(op => ({
      opcao: op,
      votos: enquete.respostas.filter(r => r.opcao === op).length
    }));
    return { id: enquete.id, pergunta: enquete.pergunta, contagem };
  }
  return {
    id: enquete.id,
    pergunta: enquete.pergunta,
    respostas: enquete.respostas.map(r => ({ usuarioId: r.usuarioId, texto: r.texto }))
  };
}

function enviarNotificacaoPush(usuario: Usuario, enquete: Enquete): void {
  console.log(`Push para ${usuario.nome}: ${enquete.pergunta}`);
}

async function enviarEmailEnquete(destino: string, enquete: Enquete): Promise<void> {
  if (!process.env.SMTP_HOST) {
    console.log(`Email para ${destino}: ${enquete.pergunta}`);
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
    subject: enquete.pergunta,
    text: 'Nova enquete disponível'
  });
}

function gerarAssinaturaDigital(conteudo: string): string {
  return crypto.createHash('sha256').update(conteudo).digest('hex');
}

