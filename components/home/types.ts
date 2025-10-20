export interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
}

export interface FinanceSummary {
  month: string;
  amount: string;
  trend: number[];
  status: 'paid' | 'pending' | 'overdue';
}

export interface NewsItem {
  id: string;
  title: string;
  description: string;
  unread: boolean;
  actionLabel: string;
}

export interface ReservationSlot {
  id: string;
  area: string;
  date: string;
  timeRange: string;
}

export interface HomeContent {
  user: {
    name: string;
    avatarUrl: string;
  };
  quickActions: QuickAction[];
  finance: FinanceSummary;
  news: NewsItem[];
  reservations: ReservationSlot[];
}
