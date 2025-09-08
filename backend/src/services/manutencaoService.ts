import nodemailer from 'nodemailer';

export type ManutencaoStatus = 'pendente' | 'em_andamento' | 'concluida';

export interface Comentario {
  autor: string;
  texto: string;
  data: string;
}

export interface Manutencao {
  id: string;
  titulo: string;
  descricao: string;
  tipo: 'preventiva' | 'corretiva' | 'seguro';
  dataAgendada: string;
  status: ManutencaoStatus;
  fotos: string[];
  comentarios: Comentario[];
  responsavel?: string;
}

const manutencoes: Manutencao[] = [];

export function listarManutencoes(): Manutencao[] {
  return manutencoes;
}

export function adicionarManutencao(dados: {
  titulo: string;
  descricao: string;
  tipo: 'preventiva' | 'corretiva' | 'seguro';
  dataAgendada: string;
  responsavel?: string;
}): Manutencao {
  const manutencao: Manutencao = {
    id: Date.now().toString(),
    titulo: dados.titulo,
    descricao: dados.descricao,
    tipo: dados.tipo,
    dataAgendada: dados.dataAgendada,
    responsavel: dados.responsavel,
    status: 'pendente',
    fotos: [],
    comentarios: []
  };

  manutencoes.push(manutencao);
  return manutencao;
}

export function atualizarStatus(id: string, status: ManutencaoStatus): Manutencao {
  const manutencao = manutencoes.find(m => m.id === id);
  if (!manutencao) {
    throw new Error('Manutenção não encontrada');
  }
  manutencao.status = status;
  return manutencao;
}

export function adicionarComentario(id: string, autor: string, texto: string): Comentario {
  const manutencao = manutencoes.find(m => m.id === id);
  if (!manutencao) {
    throw new Error('Manutenção não encontrada');
  }
  const comentario: Comentario = {
    autor,
    texto,
    data: new Date().toISOString()
  };
  manutencao.comentarios.push(comentario);
  return comentario;
}

export function adicionarFoto(id: string, url: string): string {
  const manutencao = manutencoes.find(m => m.id === id);
  if (!manutencao) {
    throw new Error('Manutenção não encontrada');
  }
  manutencao.fotos.push(url);
  return url;
}

export async function verificarManutencoesProximas(): Promise<void> {
  const agora = new Date();
  const tresDias = 1000 * 60 * 60 * 24 * 3;
  for (const manutencao of manutencoes) {
    const data = new Date(manutencao.dataAgendada);
    if (data.getTime() - agora.getTime() <= tresDias && manutencao.status === 'pendente') {
      await enviarNotificacao(manutencao);
    }
  }
}

async function enviarNotificacao(manutencao: Manutencao): Promise<void> {
  if (!process.env.SMTP_HOST || !manutencao.responsavel) {
    console.log(`Lembrete de manutenção: ${manutencao.titulo} em ${manutencao.dataAgendada}`);
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
    to: manutencao.responsavel,
    subject: `Lembrete de manutenção: ${manutencao.titulo}`,
    text: `A manutenção "${manutencao.titulo}" está agendada para ${manutencao.dataAgendada}.`
  });
}

