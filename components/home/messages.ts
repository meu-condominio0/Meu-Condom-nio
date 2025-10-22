export const homeMessages = {
  greeting: {
    pt: 'Olá, {name}',
    en: 'Hello, {name}',
  },
  notifications: {
    pt: 'Notificações',
    en: 'Notifications',
  },
  quickActions: {
    pt: 'Acessos rápidos',
    en: 'Quick access',
  },
  finance: {
    pt: 'Resumo financeiro',
    en: 'Finance summary',
    seeMore: {
      pt: 'Ver extrato',
      en: 'View statement',
    },
    status: {
      paid: { pt: 'Pago', en: 'Paid' },
      pending: { pt: 'Pendente', en: 'Pending' },
      overdue: { pt: 'Em atraso', en: 'Overdue' },
    },
  },
  news: {
    pt: 'Últimos avisos',
    en: 'Latest news',
    markAsRead: {
      pt: 'Marcar como lido',
      en: 'Mark as read',
    },
    comment: {
      pt: 'Comentar',
      en: 'Comment',
    },
  },
  reservations: {
    pt: 'Agendar área comum',
    en: 'Book common area',
    upcoming: {
      pt: 'Próximas reservas',
      en: 'Upcoming reservations',
    },
    cta: {
      pt: 'Agendar agora',
      en: 'Book now',
    },
  },
  qr: {
    pt: 'QR Code visitante',
    en: 'Visitor QR Code',
    open: {
      pt: 'Abrir QR',
      en: 'Open QR',
    },
    sendNotification: {
      pt: 'Enviar notificação',
      en: 'Send notification',
    },
  },
} as const;

export type LocaleKey = keyof typeof homeMessages['greeting'];
