import { useState } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, Plus, Users, CheckCircle, X } from 'lucide-react';
import { toast } from "sonner";
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';
import { Calendar } from '../ui/calendar';

interface Reserva {
  id: string;
  area: string;
  data: string;
  horario: string;
  status: 'confirmada' | 'pendente' | 'cancelada';
}

interface AreaComum {
  id: string;
  nome: string;
  descricao: string;
  capacidade: number;
  horariosDisponiveis: string[];
}

const reservasMock: Reserva[] = [
  {
    id: '1',
    area: 'Salão de festas I',
    data: '20/05/2024',
    horario: '14:00 - 18:00',
    status: 'confirmada'
  },
  {
    id: '2',
    area: 'Churrasqueira III',
    data: '27/05/2024',
    horario: '12:00 - 16:00',
    status: 'confirmada'
  },
  {
    id: '3',
    area: 'Quadra I',
    data: '15/06/2024',
    horario: '18:00 - 20:00',
    status: 'pendente'
  }
];

const areasComuns: AreaComum[] = [
  {
    id: '1',
    nome: 'Salão de festas I',
    descricao: 'Salão com capacidade para 50 pessoas, ideal para festas e eventos',
    capacidade: 50,
    horariosDisponiveis: ['08:00 - 12:00', '14:00 - 18:00', '19:00 - 23:00']
  },
  {
    id: '2',
    nome: 'Churrasqueira I',
    descricao: 'Área de churrasqueira coberta com mesas e cadeiras',
    capacidade: 20,
    horariosDisponiveis: ['10:00 - 14:00', '15:00 - 19:00', '20:00 - 24:00']
  },
  {
    id: '3',
    nome: 'Quadra esportiva',
    descricao: 'Quadra poliesportiva para futebol, vôlei e basquete',
    capacidade: 12,
    horariosDisponiveis: ['06:00 - 10:00', '14:00 - 18:00', '19:00 - 22:00']
  },
  {
    id: '4',
    nome: 'Academia',
    descricao: 'Espaço fitness com equipamentos modernos',
    capacidade: 8,
    horariosDisponiveis: ['06:00 - 10:00', '14:00 - 18:00', '19:00 - 22:00']
  }
];

// Mock de reservas existentes para mostrar indisponibilidade
const reservasExistentes = [
  { areaId: '1', data: '2024-06-20', horario: '14:00 - 18:00' },
  { areaId: '1', data: '2024-06-22', horario: '19:00 - 23:00' },
  { areaId: '2', data: '2024-06-21', horario: '15:00 - 19:00' },
  { areaId: '3', data: '2024-06-25', horario: '14:00 - 18:00' },
];

export function PaginaReservas() {
  const [modalAberto, setModalAberto] = useState(false);
  const [areaSelecionada, setAreaSelecionada] = useState('');
  const [dataSelecionada, setDataSelecionada] = useState<Date | undefined>(undefined);
  const [horarioSelecionado, setHorarioSelecionado] = useState('');

  const getStatusBadge = (status: string) => {
    const badges = {
      confirmada: { variant: 'default' as const, label: 'Confirmada' },
      pendente: { variant: 'secondary' as const, label: 'Pendente' },
      cancelada: { variant: 'destructive' as const, label: 'Cancelada' }
    };
    return badges[status as keyof typeof badges];
  };

  const handleNovaReserva = () => {
    if (areaSelecionada && dataSelecionada && horarioSelecionado) {
      const areaNome = areaSelecionadaInfo?.nome || 'Área selecionada';
      const dataFormatada = dataSelecionada.toLocaleDateString('pt-BR');
      
      // Simular processo de reserva
      setTimeout(() => {
        toast.success('Reserva confirmada com sucesso!', {
          description: `${areaNome} reservada para ${dataFormatada} das ${horarioSelecionado}`,
          duration: 5000,
        });
      }, 500);
      
      setModalAberto(false);
      // Reset form
      setAreaSelecionada('');
      setDataSelecionada(undefined);
      setHorarioSelecionado('');
    }
  };

  const areaSelecionadaInfo = areasComuns.find(area => area.id === areaSelecionada);

  // Função para verificar se uma data/horário está disponível
  const isHorarioDisponivel = (areaId: string, data: Date, horario: string) => {
    const dataString = data.toISOString().split('T')[0];
    return !reservasExistentes.some(reserva => 
      reserva.areaId === areaId && 
      reserva.data === dataString && 
      reserva.horario === horario
    );
  };

  // Função para determinar se uma data tem horários disponíveis
  const getDisponibilidadeData = (areaId: string, data: Date) => {
    if (!areaId) return { disponivel: true, parcial: false };
    
    const area = areasComuns.find(a => a.id === areaId);
    if (!area) return { disponivel: true, parcial: false };

    const horariosDisponiveis = area.horariosDisponiveis?.filter(horario => 
      isHorarioDisponivel(areaId, data, horario)
    ) || [];

    return {
      disponivel: horariosDisponiveis.length > 0,
      parcial: horariosDisponiveis.length > 0 && horariosDisponiveis.length < area.horariosDisponiveis.length
    };
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1>Reservas</h1>
          <p className="text-muted-foreground">
            Gerencie suas reservas de áreas comuns
          </p>
        </div>
        
        <Dialog open={modalAberto} onOpenChange={setModalAberto}>
          <DialogTrigger asChild>
            <Button className="gap-2 h-12 px-6">
              <Plus className="h-5 w-5" />
              Nova Reserva
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Agendar Área Comum</DialogTitle>
              <DialogDescription>
                Selecione a área, data e horário para fazer sua reserva
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Seleção de área */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label>Selecione a Área</Label>
                  <Select value={areaSelecionada} onValueChange={setAreaSelecionada}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Escolha uma área comum" />
                    </SelectTrigger>
                    <SelectContent>
                      {areasComuns.map((area) => (
                        <SelectItem key={area.id} value={area.id}>
                          <div className="flex items-center gap-3 py-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <div className="font-medium">{area.nome}</div>
                              <div className="text-sm text-muted-foreground">
                                Capacidade: {area.capacidade} pessoas
                              </div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {areaSelecionadaInfo && (
                  <Card className="border-primary/20 bg-primary/5">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-primary/10">
                          <MapPin className="h-6 w-6 text-primary" />
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-semibold text-lg">{areaSelecionadaInfo.nome}</h4>
                          <p className="text-muted-foreground">
                            {areaSelecionadaInfo.descricao}
                          </p>
                          <div className="flex items-center gap-2 text-sm">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>Capacidade: {areaSelecionadaInfo.capacidade} pessoas</span>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Horários disponíveis:</Label>
                            <div className="flex flex-wrap gap-2">
                              {areaSelecionadaInfo.horariosDisponiveis.map((horario) => (
                                <Badge key={horario} variant="outline" className="px-3 py-1">
                                  {horario}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {areaSelecionada && dataSelecionada && (
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">Horários Disponíveis</Label>
                    <div className="grid gap-2">
                      {areaSelecionadaInfo?.horariosDisponiveis.map((horario) => {
                        const disponivel = isHorarioDisponivel(areaSelecionada, dataSelecionada, horario);
                        return (
                          <Button
                            key={horario}
                            variant={horarioSelecionado === horario ? "default" : "outline"}
                            disabled={!disponivel}
                            onClick={() => setHorarioSelecionado(horario)}
                            className="justify-between h-12"
                          >
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              {horario}
                            </div>
                            {disponivel ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <X className="h-4 w-4 text-red-500" />
                            )}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Calendário */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Selecione a Data</Label>
                  <div className="border rounded-lg p-4">
                    <Calendar
                      mode="single"
                      selected={dataSelecionada}
                      onSelect={setDataSelecionada}
                      disabled={(date) => date < new Date() || date < new Date(new Date().setHours(0, 0, 0, 0))}
                      modifiers={areaSelecionada ? {
                        indisponivel: (date) => !getDisponibilidadeData(areaSelecionada, date).disponivel,
                        parcial: (date) => getDisponibilidadeData(areaSelecionada, date).parcial
                      } : {}}
                      modifiersStyles={{
                        indisponivel: { 
                          backgroundColor: '#fee2e2', 
                          color: '#dc2626',
                          textDecoration: 'line-through'
                        },
                        parcial: { 
                          backgroundColor: '#fef3c7', 
                          color: '#d97706' 
                        }
                      }}
                      className="w-full"
                    />
                  </div>
                  
                  {areaSelecionada && (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Legenda:</Label>
                      <div className="grid grid-cols-1 gap-2 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
                          <span>Disponível</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded"></div>
                          <span>Parcialmente ocupado</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
                          <span>Indisponível</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-6 border-t">
              <Button
                variant="outline"
                className="flex-1 h-12"
                onClick={() => setModalAberto(false)}
              >
                Cancelar
              </Button>
              <Button
                className="flex-1 h-12"
                onClick={handleNovaReserva}
                disabled={!areaSelecionada || !dataSelecionada || !horarioSelecionado}
              >
                Confirmar Reserva
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Grid de áreas disponíveis */}
      <div className="space-y-6">
        <h2>Áreas Disponíveis</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {areasComuns.map((area) => (
            <Card key={area.id} className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
              <CardHeader className="pb-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{area.nome}</CardTitle>
                    <p className="text-muted-foreground leading-relaxed">
                      {area.descricao}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pt-0">
                <div className="flex items-center gap-3 p-3 bg-accent/30 rounded-lg">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Capacidade: {area.capacidade} pessoas</span>
                </div>

                <div className="space-y-3">
                  <Label className="font-semibold">Horários disponíveis:</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {area.horariosDisponiveis.map((horario) => (
                      <div key={horario} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{horario}</span>
                        </div>
                        <Badge variant="outline" className="px-3 py-1">
                          Disponível
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <Button 
                  className="w-full h-12 mt-4" 
                  onClick={() => {
                    setAreaSelecionada(area.id);
                    setModalAberto(true);
                  }}
                >
                  Reservar Agora
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Minhas reservas */}
      <div className="space-y-6">
        <h2>Minhas Reservas</h2>
        {reservasMock.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-accent/50 rounded-full flex items-center justify-center">
                  <CalendarIcon className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-2">Nenhuma reserva encontrada</h4>
                  <p className="text-muted-foreground">
                    Você não possui reservas no momento.
                  </p>
                </div>
                <Button onClick={() => setModalAberto(true)}>
                  Fazer primeira reserva
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {reservasMock.map((reserva) => (
              <Card key={reserva.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-primary/10">
                        <CalendarIcon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-lg font-semibold">{reserva.area}</h4>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4" />
                            <span className="font-medium">Data:</span>
                            <span>{reserva.data}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span className="font-medium">Horário:</span>
                            <span>{reserva.horario}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                      <Badge {...getStatusBadge(reserva.status)} className="px-4 py-2">
                        {getStatusBadge(reserva.status).label}
                      </Badge>
                      {reserva.status === 'confirmada' && (
                        <Button variant="outline" size="sm" className="h-10 px-4">
                          Cancelar
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}