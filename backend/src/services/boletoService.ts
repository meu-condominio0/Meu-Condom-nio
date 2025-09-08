import axios from 'axios';
import nodemailer from 'nodemailer';

export interface Unidade {
  id: string;
  email: string;
  valor: number;
}

export interface Boleto {
  id: string;
  descricao: string;
  valor: number;
  dataVencimento: string;
  status: 'pago' | 'pendente' | 'atrasado';
  codigoBarras: string;
  linhaDigitavel: string;
}

const unidades: Unidade[] = [
  { id: '101', email: 'morador101@example.com', valor: 500 },
  { id: '102', email: 'morador102@example.com', valor: 500 }
];

const boletos: Boleto[] = [];

export async function gerarBoletosParaCondominio(): Promise<void> {
  for (const unidade of unidades) {
    await gerarBoleto(unidade);
  }
}

export function listarBoletos(): Boleto[] {
  return boletos;
}

async function gerarBoleto(unidade: Unidade): Promise<Boleto> {
  try {
    const resposta = await axios.post(
      'https://apis.bancointer.com.br/openbanking/v1/boletos',
      {
        valorNominal: unidade.valor,
        dataVencimento: new Date().toISOString().split('T')[0],
        pagador: {
          email: unidade.email,
          nome: `Unidade ${unidade.id}`
        }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.BANCO_INTER_TOKEN}`
        }
      }
    );

    const dados = resposta.data;
    const boleto: Boleto = {
      id: dados.nossoNumero || Date.now().toString(),
      descricao: `Taxa condominial - ${new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}`,
      valor: unidade.valor,
      dataVencimento: dados.dataVencimento || new Date().toISOString().split('T')[0],
      status: 'pendente',
      codigoBarras: dados.codigoBarras || '',
      linhaDigitavel: dados.linhaDigitavel || ''
    };

    boletos.push(boleto);
    await enviarEmail(unidade.email, boleto);
    return boleto;
  } catch (err) {
    const boleto: Boleto = {
      id: Date.now().toString(),
      descricao: `Taxa condominial - ${new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}`,
      valor: unidade.valor,
      dataVencimento: new Date().toISOString().split('T')[0],
      status: 'pendente',
      codigoBarras: '00000000000000000000000000000000000000000000',
      linhaDigitavel: '00000.00000 00000.000000 00000.000000 0 00000000000000'
    };

    boletos.push(boleto);
    return boleto;
  }
}

async function enviarEmail(destino: string, boleto: Boleto): Promise<void> {
  if (!process.env.SMTP_HOST) {
    console.log(`Envio de boleto para ${destino}: ${boleto.linhaDigitavel}`);
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
    subject: boleto.descricao,
    text: `Seu boleto está disponível. Linha digitável: ${boleto.linhaDigitavel}`
  });
}
