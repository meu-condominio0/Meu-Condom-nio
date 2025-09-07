import { Calendar, CreditCard, Package, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface ItemInformativo {
  id: string;
  titulo: string;
  valor: string;
  descricao: string;
  tipo: 'boleto' | 'reserva' | 'entrega' | 'comunicado';
  status?: 'pendente' | 'pago' | 'agendado' | 'recebido';
  data?: string;
}

const itensMorador: ItemInformativo[] = [
  {
    id: '1',
    titulo: 'Boletos em aberto',
    valor: 'R$300',
    descricao: 'Vencimento próximo',
    tipo: 'boleto',
    status: 'pendente'
  },
  {
    id: '2',
    titulo: 'Próximas reservas',
    valor: '3',
    descricao: 'Salão de festas agendado',
    tipo: 'reserva',
    data: '20/05 14:00'
  },
  {
    id: '3',
    titulo: 'Entregas recentes',
    valor: '1',
    descricao: 'Pacote recebido',
    tipo: 'entrega',
    data: '22/05'
  }
];

const itensSindico: ItemInformativo[] = [
  {
    id: '1',
    titulo: 'Usuários ativos',
    valor: '124',
    descricao: 'Moradores cadastrados',
    tipo: 'comunicado'
  },
  {
    id: '2',
    titulo: 'Reservas hoje',
    valor: '8',
    descricao: 'Áreas comuns ocupadas',
    tipo: 'reserva'
  },
  {
    id: '3',
    titulo: 'Boletos pendentes',
    valor: '23',
    descricao: 'Aguardando pagamento',
    tipo: 'boleto',
    status: 'pendente'
  }
];

interface CardsInformativosProps {
  tipo: 'morador' | 'sindico';
  onClicarItem?: (item: ItemInformativo) => void;
}

export function CardsInformativos({ tipo, onClicarItem }: CardsInformativosProps) {
  const itens = tipo === 'morador' ? itensMorador : itensSindico;

  const getIcone = (tipoItem: string) => {
    const icones = {
      boleto: CreditCard,
      reserva: Calendar,
      entrega: Package,
      comunicado: Users
    };
    return icones[tipoItem as keyof typeof icones] || CreditCard;
  };

  const getCorStatus = (status?: string) => {
    const cores = {
      pendente: 'destructive',
      pago: 'default',
      agendado: 'secondary',
      recebido: 'default'
    };
    return cores[status as keyof typeof cores];
  };

  return (
    <div className="space-y-4">
      {itens.map((item) => {
        const Icone = getIcone(item.tipo);
        
        return (
          <Card 
            key={item.id} 
            className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
            onClick={() => onClicarItem?.(item)}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10 shrink-0">
                  <Icone className="h-6 w-6 text-primary" />
                </div>
                
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <h4 className="font-semibold text-lg text-foreground">
                      {item.titulo}
                    </h4>
                    {item.status && (
                      <Badge 
                        variant={getCorStatus(item.status) as any}
                        className="text-xs px-3 py-1 shrink-0 w-fit"
                      >
                        {item.status === 'pendente' && 'Pendente'}
                        {item.status === 'pago' && 'Pago'}
                        {item.status === 'agendado' && 'Agendado'}
                        {item.status === 'recebido' && 'Recebido'}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="text-3xl sm:text-4xl font-bold text-foreground">
                      {item.valor}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {item.descricao}
                    </p>
                  </div>
                  
                  {item.data && (
                    <p className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full w-fit">
                      {item.data}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}