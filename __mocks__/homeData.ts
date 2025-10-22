import { HomeContent } from '../components/home/types';

const homeData: HomeContent = {
  user: {
    name: 'Ana Clara',
    avatarUrl: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=facearea&w=256&h=256&q=80',
  },
  quickActions: [
    {
      id: 'reservations',
      title: 'Reservas',
      description: 'Agende salão, churrasqueira e quadras',
      icon: 'reservations',
      href: '#reservations',
    },
    {
      id: 'boletos',
      title: 'Boletos',
      description: 'Visualize e pague suas taxas',
      icon: 'boletos',
      href: '#billing',
    },
    {
      id: 'news',
      title: 'Avisos',
      description: 'Fique por dentro das novidades',
      icon: 'news',
      href: '#news',
    },
    {
      id: 'visitors',
      title: 'Visitantes',
      description: 'Gerencie acessos convidados',
      icon: 'visitors',
      href: '#visitors',
    },
  ],
  finance: {
    month: 'Novembro 2024',
    amount: '638.42',
    trend: [12, 15, 13, 17, 18, 21, 20, 24, 22, 25, 27, 29],
    status: 'pending',
  },
  news: [
    {
      id: 'news-1',
      title: 'Manutenção da piscina',
      description: 'A piscina estará fechada para manutenção preventiva na próxima segunda-feira (09).',
      unread: true,
      actionLabel: 'Comentar',
    },
    {
      id: 'news-2',
      title: 'Campanha de coleta seletiva',
      description: 'Participe da nova campanha de reciclagem e contribua com um condomínio mais sustentável.',
      unread: false,
      actionLabel: 'Comentar',
    },
    {
      id: 'news-3',
      title: 'Assembleia extraordinária',
      description: 'Agendada para 12/11 às 19h no salão de festas. Confirme sua presença até dia 10.',
      unread: true,
      actionLabel: 'Comentar',
    },
  ],
  reservations: [
    {
      id: 'res-1',
      area: 'Churrasqueira',
      date: new Date().toISOString(),
      timeRange: '18h às 22h',
    },
    {
      id: 'res-2',
      area: 'Salão de festas',
      date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
      timeRange: '14h às 18h',
    },
  ],
};

export default homeData;
