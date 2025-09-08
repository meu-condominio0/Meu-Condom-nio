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

export interface Comunicado {
  id: string;
  titulo: string;
  mensagem: string;
  imagemUrl?: string;
  autorId: string;
  destinatarios: string[]; // ids dos usuarios
  data: Date;
}

// Mock de usuarios
const usuarios: Usuario[] = [
  { id: '1', nome: 'Síndico', email: 'sindico@condominio.com', role: 'gestor', bloco: 'A', unidade: '101' },
  { id: '2', nome: 'Maria', email: 'maria@exemplo.com', role: 'morador', bloco: 'A', unidade: '102' },
  { id: '3', nome: 'João', email: 'joao@exemplo.com', role: 'morador', bloco: 'B', unidade: '201' },
  { id: '4', nome: 'Ana', email: 'ana@exemplo.com', role: 'morador', bloco: 'B', unidade: '202' }
];

const comunicados: Comunicado[] = [];

interface DestinatarioTodos { tipo: 'todos'; }
interface DestinatarioBloco { tipo: 'bloco'; bloco: string; }
interface DestinatarioUnidade { tipo: 'unidade'; bloco: string; unidade: string; }
interface DestinatarioPessoa { tipo: 'pessoa'; usuarioId: string; }

export type Destinatario = DestinatarioTodos | DestinatarioBloco | DestinatarioUnidade | DestinatarioPessoa;

interface ComunicadoInput {
  titulo: string;
  mensagem: string;
  imagemUrl?: string;
  destinatario: Destinatario;
}

export function enviarComunicado(autorId: string, dados: ComunicadoInput): Comunicado {
  const autor = usuarios.find(u => u.id === autorId);
  if (!autor || autor.role !== 'gestor') {
    throw new Error('Apenas gestores podem enviar comunicados');
  }

  let destinatarios: Usuario[] = [];
  switch (dados.destinatario.tipo) {
    case 'todos':
      destinatarios = usuarios.filter(u => u.id !== autor.id);
      break;
    case 'bloco':
      destinatarios = usuarios.filter(u => u.bloco === dados.destinatario.bloco);
      break;
    case 'unidade':
      destinatarios = usuarios.filter(
        u => u.bloco === dados.destinatario.bloco && u.unidade === dados.destinatario.unidade
      );
      break;
    case 'pessoa':
      destinatarios = usuarios.filter(u => u.id === dados.destinatario.usuarioId);
      break;
  }

  const comunicado: Comunicado = {
    id: Date.now().toString(),
    titulo: dados.titulo,
    mensagem: dados.mensagem,
    imagemUrl: dados.imagemUrl,
    autorId: autor.id,
    destinatarios: destinatarios.map(d => d.id),
    data: new Date()
  };

  comunicados.push(comunicado);

  destinatarios.forEach(u => {
    enviarNotificacaoPush(u, comunicado);
    enviarEmailComunicado(u.email, comunicado);
  });

  return comunicado;
}

export function listarComunicados(): Comunicado[] {
  return comunicados;
}

function enviarNotificacaoPush(usuario: Usuario, comunicado: Comunicado): void {
  // Placeholder para integração com serviço de push notifications
  console.log(`Push para ${usuario.nome}: ${comunicado.titulo}`);
}

async function enviarEmailComunicado(destino: string, comunicado: Comunicado): Promise<void> {
  if (!process.env.SMTP_HOST) {
    console.log(`Email para ${destino}: ${comunicado.titulo}`);
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
    subject: comunicado.titulo,
    text: comunicado.mensagem
  });
}

