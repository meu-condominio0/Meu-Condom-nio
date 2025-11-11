export interface Assembleia {
  id: number;
  titulo: string;
  descricao?: string;
  pauta?: string;
  data: string; // ISO
  status: 'Agendada' | 'Concluida' | 'Cancelada';
  ata_url?: string | null;
}

export const assembleiasMock: Assembleia[] = [
  {
    id: 1,
    titulo: 'Assembleia Ordinária 2025',
    descricao: 'Discussão sobre manutenção da área comum e eleição de síndico.',
    pauta: '1) Abertura\n2) Apresentação do relatório financeiro\n3) Discussão sobre manutenção da área comum\n4) Eleição do síndico e conselho\n5) Assuntos gerais',
    data: '2025-11-15T19:00:00',
    status: 'Agendada',
    ata_url: null,
  },
  {
    id: 2,
    titulo: 'Assembleia Extraordinária - Reformas',
    descricao: 'Votação sobre reforma da piscina e aprovação de orçamento.',
    pauta: '1) Apresentação do projeto de reforma da piscina\n2) Orçamentos apresentados\n3) Votação e aprovação do orçamento\n4) Definição de prazos',
    data: '2025-08-20T18:00:00',
    status: 'Concluida',
    ata_url: 'https://example.com/atas/assembleia_2025_08.pdf',
  },
  {
    id: 3,
    titulo: 'Assembleia Tema: Segurança',
    descricao: 'Apresentação do novo sistema de segurança e aprovação de contrato.',
    pauta: '1) Demonstração do novo sistema de câmeras\n2) Proposta de contrato com empresa de segurança\n3) Perguntas e esclarecimentos',
    data: '2025-05-10T19:30:00',
    status: 'Cancelada',
    ata_url: null,
  },
];
