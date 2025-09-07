import { ComponenteFeed } from '../ComponenteFeed';
import { CardsInformativos } from '../CardsInformativos';
import { usarContextoApp } from '../../contexts/AppContext';
import { 
  Bell, 
  Calendar, 
  CreditCard, 
  MessageSquare, 
  Users, 
  AlertTriangle,
  Clock,
  CheckCircle,
  ArrowRight,
  BarChart3,
  FileText,
  Settings,
  Plus
} from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface PaginaInicioProps {
  onMudarPagina: (pagina: string) => void;
}

interface AcaoRapida {
  id: string;
  titulo: string;
  icone: React.ComponentType<{ className?: string }>;
  badge?: number;
  cor: string;
  pagina: string;
  prioridade: 'alta' | 'media';
}

// Ações principais para morador (4 mais importantes)
const acoesRapidaMorador: AcaoRapida[] = [
  {
    id: 'comunicados',
    titulo: 'Comunicados',
    icone: MessageSquare,
    badge: 3,
    cor: 'bg-blue-500',
    pagina: 'comunicados',
    prioridade: 'alta'
  },
  {
    id: 'boletos',
    titulo: 'Boletos',
    icone: CreditCard,
    badge: 2,
    cor: 'bg-orange-500',
    pagina: 'boletos',
    prioridade: 'alta'
  },
  {
    id: 'reservas',
    titulo: 'Reservar Área',
    icone: Calendar,
    cor: 'bg-green-500',
    pagina: 'reservas',
    prioridade: 'alta'
  },
  {
    id: 'ocorrencias',
    titulo: 'Ocorrências',
    icone: AlertTriangle,
    cor: 'bg-red-500',
    pagina: 'ocorrencias',
    prioridade: 'alta'
  }
];

// Ações principais para síndico (4 mais importantes)
const acoesRapidaSindico: AcaoRapida[] = [
  {
    id: 'paineis',
    titulo: 'Dashboard',
    icone: BarChart3,
    cor: 'bg-blue-500',
    pagina: 'paineis',
    prioridade: 'alta'
  },
  {
    id: 'usuarios',
    titulo: 'Moradores',
    icone: Users,
    cor: 'bg-green-500',
    pagina: 'usuarios',
    prioridade: 'alta'
  },
  {
    id: 'ocorrencias',
    titulo: 'Ocorrências',
    icone: AlertTriangle,
    badge: 5,
    cor: 'bg-red-500',
    pagina: 'ocorrencias',
    prioridade: 'alta'
  },
  {
    id: 'comunicados',
    titulo: 'Comunicados',
    icone: MessageSquare,
    cor: 'bg-orange-500',
    pagina: 'comunicados',
    prioridade: 'alta'
  }
];

export function PaginaInicio({ onMudarPagina }: PaginaInicioProps) {
  const { usuarioLogado } = usarContextoApp();
  const ehSindico = usuarioLogado?.tipo === 'sindico';
  const acoesRapidas = ehSindico ? acoesRapidaSindico : acoesRapidaMorador;

  const estatisticasRapidas = ehSindico ? [
    { titulo: 'Moradores Ativos', valor: '124', mudanca: '+3', icone: Users, cor: 'text-blue-600' },
    { titulo: 'Ocorrências Abertas', valor: '5', mudanca: '-2', icone: AlertTriangle, cor: 'text-red-600' },
    { titulo: 'Taxa Pagamento', valor: '94%', mudanca: '+2%', icone: CheckCircle, cor: 'text-green-600' }
  ] : [
    { titulo: 'Próxima Reserva', valor: '15/06', mudanca: 'Piscina', icone: Calendar, cor: 'text-blue-600' },
    { titulo: 'Boletos Pendentes', valor: '2', mudanca: 'Venc. 10/06', icone: CreditCard, cor: 'text-orange-600' },
    { titulo: 'Comunicados', valor: '3', mudanca: 'Novos', icone: Bell, cor: 'text-green-600' }
  ];

  return (
    <div className="space-y-8">
      {/* Header de boas-vindas */}
      <div className="space-y-3">
        <h1>
          Olá, {usuarioLogado?.nome?.split(' ')[0]}! 👋
        </h1>
        <p className="text-muted-foreground">
          {ehSindico 
            ? 'Acompanhe as principais atividades do condomínio'
            : 'Confira as novidades do seu condomínio'
          }
        </p>
      </div>

      {/* Estatísticas rápidas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {estatisticasRapidas.map((stat, index) => {
          const Icone = stat.icone;
          return (
            <Card key={index} className="hover:shadow-md transition-all duration-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <small className="text-muted-foreground uppercase tracking-wide">
                      {stat.titulo}
                    </small>
                    <p className="text-2xl font-medium text-foreground">
                      {stat.valor}
                    </p>
                    <small className="text-muted-foreground">
                      {stat.mudanca}
                    </small>
                  </div>
                  <div className="p-2.5 rounded-lg bg-primary/10">
                    <Icone className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Ações rápidas - versão mais enxuta */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2>Ações Rápidas</h2>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onMudarPagina(ehSindico ? 'paineis' : 'configuracoes')}
          >
            <Settings className="h-4 w-4 mr-1" />
            {ehSindico ? 'Mais opções' : 'Configurações'}
          </Button>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {acoesRapidas.map((acao) => {
            const Icone = acao.icone;
            return (
              <Card 
                key={acao.id} 
                className="relative hover:shadow-md transition-all duration-200 cursor-pointer group hover:border-primary/50"
                onClick={() => onMudarPagina(acao.pagina)}
              >
                <CardContent className="p-4">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="relative">
                      <div className={`p-3 rounded-full ${acao.cor} transition-transform group-hover:scale-110`}>
                        <Icone className="h-6 w-6 text-white" />
                      </div>
                      {acao.badge && (
                        <Badge className="absolute -top-1 -right-1 h-5 min-w-5 px-1.5 bg-destructive text-destructive-foreground text-xs">
                          {acao.badge}
                        </Badge>
                      )}
                    </div>
                    <h5 className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {acao.titulo}
                    </h5>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Conteúdo principal baseado no tipo de usuário */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Feed/Atividades */}
        <div className="xl:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2>
              {ehSindico ? 'Atividades Recentes' : 'Feed do Condomínio'}
            </h2>
            <Button variant="ghost" size="sm" onClick={() => onMudarPagina('comunicados')}>
              Ver todos <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
          <ComponenteFeed />
        </div>

        {/* Cards informativos */}
        <div className="space-y-4">
          <h2>Informações</h2>
          <CardsInformativos tipo={ehSindico ? 'sindico' : 'morador'} />
        </div>
      </div>
    </div>
  );
}