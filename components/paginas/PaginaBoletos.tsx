import { useState } from 'react';
import { Search, Download, Eye, Calendar, CreditCard, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface Boleto {
  id: string;
  descricao: string;
  valor: number;
  dataVencimento: string;
  dataPagamento?: string;
  status: 'pago' | 'pendente' | 'atrasado';
  categoria: 'condominio' | 'agua' | 'gas' | 'fundo_reserva' | 'outros';
  codigoBarras: string;
  linhaDigitavel: string;
}

const boletosMock: Boleto[] = [
  {
    id: '1',
    descricao: 'Taxa condominial - Maio 2024',
    valor: 450.00,
    dataVencimento: '10/05/2024',
    dataPagamento: '08/05/2024',
    status: 'pago',
    categoria: 'condominio',
    codigoBarras: '23790123456789012345678901234567890123456789',
    linhaDigitavel: '23790.12345 67890.123456 78901.234567 8 90123456789012345'
  },
  {
    id: '2',
    descricao: 'Taxa condominial - Junho 2024',
    valor: 450.00,
    dataVencimento: '10/06/2024',
    status: 'pendente',
    categoria: 'condominio',
    codigoBarras: '23790123456789012345678901234567890123456789',
    linhaDigitavel: '23790.12345 67890.123456 78901.234567 8 90123456789012345'
  },
  {
    id: '3',
    descricao: 'Taxa de água - Abril 2024',
    valor: 85.30,
    dataVencimento: '15/04/2024',
    status: 'atrasado',
    categoria: 'agua',
    codigoBarras: '23790123456789012345678901234567890123456789',
    linhaDigitavel: '23790.12345 67890.123456 78901.234567 8 90123456789012345'
  },
  {
    id: '4',
    descricao: 'Taxa de gás - Maio 2024',
    valor: 45.20,
    dataVencimento: '20/05/2024',
    dataPagamento: '18/05/2024',
    status: 'pago',
    categoria: 'gas',
    codigoBarras: '23790123456789012345678901234567890123456789',
    linhaDigitavel: '23790.12345 67890.123456 78901.234567 8 90123456789012345'
  },
  {
    id: '5',
    descricao: 'Fundo de reserva - 2024',
    valor: 120.00,
    dataVencimento: '30/06/2024',
    status: 'pendente',
    categoria: 'fundo_reserva',
    codigoBarras: '23790123456789012345678901234567890123456789',
    linhaDigitavel: '23790.12345 67890.123456 78901.234567 8 90123456789012345'
  },
  {
    id: '6',
    descricao: 'Taxa condominial - Abril 2024',
    valor: 450.00,
    dataVencimento: '10/04/2024',
    dataPagamento: '09/04/2024',
    status: 'pago',
    categoria: 'condominio',
    codigoBarras: '23790123456789012345678901234567890123456789',
    linhaDigitavel: '23790.12345 67890.123456 78901.234567 8 90123456789012345'
  }
];

export function PaginaBoletos() {
  const [boletos] = useState(boletosMock);
  const [termoBusca, setTermoBusca] = useState('');
  const [statusFiltro, setStatusFiltro] = useState('todos');
  const [periodoFiltro, setPeriodoFiltro] = useState('todos');

  const boletosFiltrados = boletos.filter(boleto => {
    const correspondeTermo = boleto.descricao.toLowerCase().includes(termoBusca.toLowerCase());
    const correspondeStatus = statusFiltro === 'todos' || boleto.status === statusFiltro;
    
    return correspondeTermo && correspondeStatus;
  });

  const getStatusBadge = (status: string) => {
    const badges = {
      pago: { variant: 'default' as const, label: 'Pago', icon: CheckCircle, cor: 'text-green-600' },
      pendente: { variant: 'secondary' as const, label: 'Pendente', icon: Clock, cor: 'text-yellow-600' },
      atrasado: { variant: 'destructive' as const, label: 'Em Atraso', icon: AlertTriangle, cor: 'text-red-600' }
    };
    return badges[status as keyof typeof badges];
  };

  const getCategoriaNome = (categoria: string) => {
    const nomes = {
      condominio: 'Taxa Condominial',
      agua: 'Taxa de Água',
      gas: 'Taxa de Gás',
      fundo_reserva: 'Fundo de Reserva',
      outros: 'Outros'
    };
    return nomes[categoria as keyof typeof nomes] || categoria;
  };

  const getTotaisPorStatus = () => {
    const totais = {
      pago: { quantidade: 0, valor: 0 },
      pendente: { quantidade: 0, valor: 0 },
      atrasado: { quantidade: 0, valor: 0 }
    };

    boletos.forEach(boleto => {
      totais[boleto.status].quantidade++;
      totais[boleto.status].valor += boleto.valor;
    });

    return totais;
  };

  const totais = getTotaisPorStatus();

  const calcularDiasRestantes = (dataVencimento: string) => {
    const hoje = new Date();
    const vencimento = new Date(dataVencimento.split('/').reverse().join('-'));
    const diffTime = vencimento.getTime() - hoje.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-semibold mb-3">Boletos</h2>
        <p className="text-lg text-muted-foreground">
          Acompanhe seus boletos e mantenha suas contas em dia
        </p>
      </div>

      {/* Cards de resumo */}
      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="font-medium text-muted-foreground">Pagos</CardTitle>
            <div className="p-2 rounded-lg bg-green-50 dark:bg-green-950">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 mb-2">{totais.pago.quantidade}</div>
            <p className="text-sm text-muted-foreground">
              Total: {formatarMoeda(totais.pago.valor)}
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="font-medium text-muted-foreground">No Prazo</CardTitle>
            <div className="p-2 rounded-lg bg-yellow-50 dark:bg-yellow-950">
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600 mb-2">{totais.pendente.quantidade}</div>
            <p className="text-sm text-muted-foreground">
              Total: {formatarMoeda(totais.pendente.valor)}
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="font-medium text-muted-foreground">Em Atraso</CardTitle>
            <div className="p-2 rounded-lg bg-red-50 dark:bg-red-950">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600 mb-2">{totais.atrasado.quantidade}</div>
            <p className="text-sm text-muted-foreground">
              Total: {formatarMoeda(totais.atrasado.valor)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e busca */}
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Buscar boletos..."
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
            className="pl-12 h-12 text-base"
          />
        </div>
        <Select value={periodoFiltro} onValueChange={setPeriodoFiltro}>
          <SelectTrigger className="w-56 h-12">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os períodos</SelectItem>
            <SelectItem value="mes_atual">Mês atual</SelectItem>
            <SelectItem value="mes_passado">Mês passado</SelectItem>
            <SelectItem value="trimestre">Último trimestre</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Abas por status */}
      <Tabs value={statusFiltro} onValueChange={setStatusFiltro}>
        <TabsList className="grid w-full grid-cols-4 h-12">
          <TabsTrigger value="todos" className="text-base">Todos</TabsTrigger>
          <TabsTrigger value="pendente" className="text-base">Pendentes</TabsTrigger>
          <TabsTrigger value="pago" className="text-base">Pagos</TabsTrigger>
          <TabsTrigger value="atrasado" className="text-base">Em Atraso</TabsTrigger>
        </TabsList>

        <TabsContent value={statusFiltro} className="space-y-6 mt-8">
          {boletosFiltrados.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  Nenhum boleto encontrado para os filtros selecionados.
                </p>
              </CardContent>
            </Card>
          ) : (
            boletosFiltrados.map((boleto) => {
              const statusInfo = getStatusBadge(boleto.status);
              const IconeStatus = statusInfo.icon;
              const diasRestantes = calcularDiasRestantes(boleto.dataVencimento);
              
              return (
                <Card key={boleto.id} className="hover:shadow-lg transition-all duration-200 hover:scale-[1.01]">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex items-start gap-6 flex-1">
                        <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10">
                          <CreditCard className="h-8 w-8 text-primary" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-3">
                            <h4 className="font-semibold text-lg">{boleto.descricao}</h4>
                            <Badge variant={statusInfo.variant} className="px-3 py-1">
                              {statusInfo.label}
                            </Badge>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                              <span className="flex items-center gap-2">
                                <span className="font-medium">Categoria:</span>
                                {getCategoriaNome(boleto.categoria)}
                              </span>
                              <span className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span className="font-medium">Vencimento:</span>
                                {boleto.dataVencimento}
                              </span>
                              {boleto.dataPagamento && (
                                <span className="flex items-center gap-2 text-green-600">
                                  <CheckCircle className="h-4 w-4" />
                                  <span className="font-medium">Pago em:</span>
                                  {boleto.dataPagamento}
                                </span>
                              )}
                            </div>
                            
                            {boleto.status === 'pendente' && diasRestantes >= 0 && (
                              <div className="flex items-center gap-2 text-yellow-600 font-medium">
                                <Clock className="h-4 w-4" />
                                <span>{diasRestantes} dias restantes</span>
                              </div>
                            )}
                            
                            {boleto.status === 'atrasado' && (
                              <div className="flex items-center gap-2 text-red-600 font-medium">
                                <AlertTriangle className="h-4 w-4" />
                                <span>{Math.abs(diasRestantes)} dias em atraso</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-2xl font-bold mb-4">
                            {formatarMoeda(boleto.valor)}
                          </div>
                          <div className="flex flex-col sm:flex-row items-center gap-2">
                            <Button variant="outline" size="sm" className="gap-2 w-full sm:w-auto">
                              <Eye className="h-4 w-4" />
                              Ver
                            </Button>
                            <Button variant="outline" size="sm" className="gap-2 w-full sm:w-auto">
                              <Download className="h-4 w-4" />
                              PDF
                            </Button>
                            {boleto.status === 'pendente' && (
                              <Button size="sm" className="gap-2 w-full sm:w-auto">
                                <CreditCard className="h-4 w-4" />
                                Pagar
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Código de barras (oculto por padrão) */}
                    <div className="mt-6 pt-4 border-t border-border">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-muted-foreground">Linha digitável:</span>
                          <Button variant="ghost" size="sm" className="h-8 text-sm">
                            Copiar
                          </Button>
                        </div>
                        <div className="font-mono text-sm bg-muted p-4 rounded-lg">
                          {boleto.linhaDigitavel}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}