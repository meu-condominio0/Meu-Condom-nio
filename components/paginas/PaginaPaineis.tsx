import { TrendingUp, TrendingDown, Users, Calendar, AlertTriangle, CreditCard, Home, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

// Dados mockados para os gráficos
const dadosReservasPorArea = [
  { nome: 'Salão de Festas', reservas: 24 },
  { nome: 'Churrasqueira', reservas: 18 },
  { nome: 'Quadra', reservas: 12 },
  { nome: 'Academia', reservas: 35 },
  { nome: 'Piscina', reservas: 8 }
];

const dadosOcorrencias = [
  { nome: 'Abertas', valor: 5, cor: '#ef4444' },
  { nome: 'Em Andamento', valor: 8, cor: '#f59e0b' },
  { nome: 'Resolvidas', valor: 27, cor: '#10b981' }
];

const dadosFinanceiro = [
  { mes: 'Jan', pagos: 85000, pendentes: 15000 },
  { mes: 'Fev', pagos: 88000, pendentes: 12000 },
  { mes: 'Mar', pagos: 92000, pendentes: 8000 },
  { mes: 'Abr', pagos: 89000, pendentes: 11000 },
  { mes: 'Mai', pagos: 94000, pendentes: 6000 }
];

interface IndicadorProps {
  titulo: string;
  valor: string;
  descricao: string;
  icone: React.ComponentType<{ className?: string }>;
  tendencia?: 'alta' | 'baixa' | 'estavel';
  percentualMudanca?: string;
}

function CartaoIndicador({ titulo, valor, descricao, icone: Icone, tendencia, percentualMudanca }: IndicadorProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{titulo}</CardTitle>
        <Icone className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{valor}</div>
        <p className="text-xs text-muted-foreground">{descricao}</p>
        {tendencia && percentualMudanca && (
          <div className="flex items-center gap-1 mt-1">
            {tendencia === 'alta' ? (
              <TrendingUp className="h-3 w-3 text-green-600" />
            ) : tendencia === 'baixa' ? (
              <TrendingDown className="h-3 w-3 text-red-600" />
            ) : null}
            <span className={`text-xs ${
              tendencia === 'alta' ? 'text-green-600' : 
              tendencia === 'baixa' ? 'text-red-600' : 
              'text-muted-foreground'
            }`}>
              {percentualMudanca}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function PaginaPaineis() {
  const coresTortaPorOcorrencia = ['#ef4444', '#f59e0b', '#10b981'];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Painéis de Gestão</h2>
        <p className="text-muted-foreground">
          Acompanhe os indicadores principais do condomínio
        </p>
      </div>

      {/* Indicadores principais */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CartaoIndicador
          titulo="Moradores Ativos"
          valor="124"
          descricao="Total de moradores cadastrados"
          icone={Users}
          tendencia="alta"
          percentualMudanca="+3 este mês"
        />
        <CartaoIndicador
          titulo="Reservas Hoje"
          valor="8"
          descricao="Áreas reservadas para hoje"
          icone={Calendar}
          tendencia="estavel"
          percentualMudanca="Igual a ontem"
        />
        <CartaoIndicador
          titulo="Ocorrências Abertas"
          valor="5"
          descricao="Aguardando resolução"
          icone={AlertTriangle}
          tendencia="baixa"
          percentualMudanca="-2 esta semana"
        />
        <CartaoIndicador
          titulo="Taxa de Pagamento"
          valor="94%"
          descricao="Boletos pagos este mês"
          icone={CreditCard}
          tendencia="alta"
          percentualMudanca="+2% vs mês anterior"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Gráfico de reservas por área */}
        <Card>
          <CardHeader>
            <CardTitle>Reservas por Área - Este Mês</CardTitle>
            <CardDescription>
              Distribuição das reservas pelas áreas comuns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dadosReservasPorArea}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nome" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="reservas" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Gráfico de ocorrências */}
        <Card>
          <CardHeader>
            <CardTitle>Status das Ocorrências</CardTitle>
            <CardDescription>
              Distribuição atual das ocorrências por status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dadosOcorrencias}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="valor"
                  label={(entry) => `${entry.nome}: ${entry.valor}`}
                >
                  {dadosOcorrencias.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={coresTortaPorOcorrencia[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Indicador de ocupação */}
        <Card>
          <CardHeader>
            <CardTitle>Ocupação do Condomínio</CardTitle>
            <CardDescription>
              Status dos apartamentos no edifício
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Home className="h-4 w-4 text-green-600" />
                <span className="text-sm">Apartamentos Ocupados</span>
              </div>
              <Badge variant="secondary">117</Badge>
            </div>
            <Progress value={94} className="h-2" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>94% ocupado</span>
              <span>117 de 124 unidades</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <div className="text-2xl font-bold text-green-600">117</div>
                <div className="text-xs text-green-700 dark:text-green-400">Ocupados</div>
              </div>
              <div className="text-center p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                <div className="text-2xl font-bold text-red-600">7</div>
                <div className="text-xs text-red-700 dark:text-red-400">Vagos</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resumo financeiro */}
        <Card>
          <CardHeader>
            <CardTitle>Resumo Financeiro - Últimos 5 Meses</CardTitle>
            <CardDescription>
              Evolução dos pagamentos de boletos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={dadosFinanceiro}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip 
                  formatter={(value: any) => [`R$ ${value.toLocaleString()}`, '']}
                />
                <Line 
                  type="monotone" 
                  dataKey="pagos" 
                  stroke="hsl(var(--chart-2))" 
                  strokeWidth={2}
                  name="Pagos"
                />
                <Line 
                  type="monotone" 
                  dataKey="pendentes" 
                  stroke="hsl(var(--chart-1))" 
                  strokeWidth={2}
                  name="Pendentes"
                />
              </LineChart>
            </ResponsiveContainer>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-center p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <div className="text-xl font-bold text-blue-600">R$ 94.000</div>
                <div className="text-xs text-blue-700 dark:text-blue-400">Pagos este mês</div>
              </div>
              <div className="text-center p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                <div className="text-xl font-bold text-orange-600">R$ 6.000</div>
                <div className="text-xs text-orange-700 dark:text-orange-400">Pendentes este mês</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Eventos programados */}
      <Card>
        <CardHeader>
          <CardTitle>Próximos Eventos</CardTitle>
          <CardDescription>
            Eventos e atividades programadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Calendar className="h-4 w-4 text-blue-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">Assembleia Ordinária</p>
                <p className="text-xs text-muted-foreground">15/06/2024 - 19:00</p>
              </div>
              <Badge>Confirmado</Badge>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Calendar className="h-4 w-4 text-green-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">Festa Junina</p>
                <p className="text-xs text-muted-foreground">23/06/2024 - 18:00</p>
              </div>
              <Badge variant="secondary">Planejando</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}