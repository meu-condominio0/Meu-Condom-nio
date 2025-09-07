import { useState } from 'react';
import { Download, Filter, Calendar, FileText, TrendingUp, Users, DollarSign, Home, Eye } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

// Dados mockados para relatórios
const dadosFinanceiro = [
  { mes: 'Jan', receitas: 95000, despesas: 78000, saldo: 17000 },
  { mes: 'Fev', receitas: 98000, despesas: 82000, saldo: 16000 },
  { mes: 'Mar', receitas: 102000, despesas: 79000, saldo: 23000 },
  { mes: 'Abr', receitas: 99000, despesas: 85000, saldo: 14000 },
  { mes: 'Mai', receitas: 104000, despesas: 81000, saldo: 23000 }
];

const dadosReservas = [
  { area: 'Salão de Festas', jan: 24, fev: 22, mar: 28, abr: 26, mai: 30 },
  { area: 'Churrasqueira', jan: 18, fev: 20, mar: 25, abr: 22, mai: 28 },
  { area: 'Quadra', jan: 12, fev: 15, mar: 18, abr: 16, mai: 20 },
  { area: 'Academia', jan: 35, fev: 38, mar: 42, abr: 40, mai: 45 },
  { area: 'Piscina', jan: 8, fev: 12, mar: 15, abr: 18, mai: 22 }
];

const dadosOcorrencias = [
  { tipo: 'Manutenção', quantidade: 45, resolvidas: 40 },
  { tipo: 'Limpeza', quantidade: 28, resolvidas: 26 },
  { tipo: 'Barulho', quantidade: 22, resolvidas: 18 },
  { tipo: 'Elevador', quantidade: 15, resolvidas: 12 },
  { tipo: 'Segurança', quantidade: 8, resolvidas: 7 }
];

const dadosAcessos = [
  { periodo: '00-04h', quantidade: 45 },
  { periodo: '04-08h', quantidade: 120 },
  { periodo: '08-12h', quantidade: 380 },
  { periodo: '12-16h', quantidade: 290 },
  { periodo: '16-20h', quantidade: 450 },
  { periodo: '20-24h', quantidade: 180 }
];

interface TipoRelatorio {
  id: string;
  titulo: string;
  descricao: string;
  icone: React.ComponentType<{ className?: string }>;
  categoria: 'financeiro' | 'operacional' | 'administrativo';
  dados: any[];
  tipoGrafico: 'bar' | 'line' | 'pie';
}

const tiposRelatorios: TipoRelatorio[] = [
  {
    id: 'financeiro',
    titulo: 'Relatório Financeiro',
    descricao: 'Receitas, despesas e saldo mensal',
    icone: DollarSign,
    categoria: 'financeiro',
    dados: dadosFinanceiro,
    tipoGrafico: 'bar'
  },
  {
    id: 'reservas',
    titulo: 'Relatório de Reservas',
    descricao: 'Utilização das áreas comuns',
    icone: Calendar,
    categoria: 'operacional',
    dados: dadosReservas,
    tipoGrafico: 'line'
  },
  {
    id: 'ocorrencias',
    titulo: 'Relatório de Ocorrências',
    descricao: 'Problemas reportados e resoluções',
    icone: FileText,
    categoria: 'administrativo',
    dados: dadosOcorrencias,
    tipoGrafico: 'bar'
  },
  {
    id: 'acessos',
    titulo: 'Relatório de Acessos',
    descricao: 'Fluxo de entrada e saída',
    icone: Home,
    categoria: 'operacional',
    dados: dadosAcessos,
    tipoGrafico: 'bar'
  }
];

export function PaginaRelatorios() {
  const [relatorioSelecionado, setRelatorioSelecionado] = useState('financeiro');
  const [periodoSelecionado, setPeriodoSelecionado] = useState('ultimos_6_meses');
  const [formatoExportacao, setFormatoExportacao] = useState('pdf');
  const [visualizandoPreview, setVisualizandoPreview] = useState(false);

  const relatorioAtual = tiposRelatorios.find(r => r.id === relatorioSelecionado);

  const handleExportar = () => {
    // Simular exportação
    const nomeArquivo = `${relatorioAtual?.titulo}_${periodoSelecionado}.${formatoExportacao}`;
    alert(`Exportando: ${nomeArquivo}`);
  };

  const renderizarGrafico = (relatorio: TipoRelatorio) => {
    switch (relatorio.tipoGrafico) {
      case 'bar':
        if (relatorio.id === 'financeiro') {
          return (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={relatorio.dados}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip formatter={(value: any) => [`R$ ${value.toLocaleString()}`, '']} />
                <Bar dataKey="receitas" fill="hsl(var(--chart-1))" name="Receitas" />
                <Bar dataKey="despesas" fill="hsl(var(--chart-2))" name="Despesas" />
                <Bar dataKey="saldo" fill="hsl(var(--chart-3))" name="Saldo" />
              </BarChart>
            </ResponsiveContainer>
          );
        } else if (relatorio.id === 'ocorrencias') {
          return (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={relatorio.dados}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="tipo" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="quantidade" fill="hsl(var(--chart-1))" name="Total" />
                <Bar dataKey="resolvidas" fill="hsl(var(--chart-2))" name="Resolvidas" />
              </BarChart>
            </ResponsiveContainer>
          );
        } else {
          return (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={relatorio.dados}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="periodo" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="quantidade" fill="hsl(var(--chart-1))" />
              </BarChart>
            </ResponsiveContainer>
          );
        }
      
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={relatorio.dados}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="area" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="mai" stroke="hsl(var(--chart-1))" name="Maio" />
              <Line type="monotone" dataKey="abr" stroke="hsl(var(--chart-2))" name="Abril" />
              <Line type="monotone" dataKey="mar" stroke="hsl(var(--chart-3))" name="Março" />
            </LineChart>
          </ResponsiveContainer>
        );
      
      default:
        return <div className="h-64 flex items-center justify-center text-muted-foreground">Gráfico não disponível</div>;
    }
  };

  const getResumoRelatorio = (relatorio: TipoRelatorio) => {
    switch (relatorio.id) {
      case 'financeiro':
        return {
          total: 'R$ 104.000',
          indicador: '+5% vs mês anterior',
          detalhes: 'Receita total em Maio'
        };
      case 'reservas':
        return {
          total: '145',
          indicador: '+12% vs mês anterior',
          detalhes: 'Total de reservas em Maio'
        };
      case 'ocorrencias':
        return {
          total: '118',
          indicador: '87% resolvidas',
          detalhes: 'Ocorrências no período'
        };
      case 'acessos':
        return {
          total: '1.465',
          indicador: 'Pico: 16-20h',
          detalhes: 'Acessos registrados hoje'
        };
      default:
        return {
          total: '-',
          indicador: '-',
          detalhes: '-'
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-foreground">Relatórios</h1>
        <p className="text-muted-foreground">
          Gere relatórios detalhados sobre as atividades do condomínio
        </p>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Configurações do Relatório
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Tipo de Relatório</Label>
              <Select value={relatorioSelecionado} onValueChange={setRelatorioSelecionado}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  {tiposRelatorios.map((relatorio) => {
                    const Icone = relatorio.icone;
                    return (
                      <SelectItem key={relatorio.id} value={relatorio.id}>
                        <div className="flex items-center gap-2">
                          <Icone className="h-4 w-4" />
                          {relatorio.titulo}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Período</Label>
              <Select value={periodoSelecionado} onValueChange={setPeriodoSelecionado}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ultimo_mes">Último mês</SelectItem>
                  <SelectItem value="ultimos_3_meses">Últimos 3 meses</SelectItem>
                  <SelectItem value="ultimos_6_meses">Últimos 6 meses</SelectItem>
                  <SelectItem value="ultimo_ano">Último ano</SelectItem>
                  <SelectItem value="personalizado">Período personalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Formato</Label>
              <Select value={formatoExportacao} onValueChange={setFormatoExportacao}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end gap-2">
              <Button 
                variant="outline" 
                onClick={() => setVisualizandoPreview(!visualizandoPreview)}
                className="flex-1"
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button onClick={handleExportar} className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de relatórios disponíveis */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tiposRelatorios.map((relatorio) => {
          const Icone = relatorio.icone;
          const selecionado = relatorioSelecionado === relatorio.id;
          
          return (
            <Card 
              key={relatorio.id}
              className={`cursor-pointer transition-all duration-200 ${
                selecionado 
                  ? 'ring-2 ring-primary shadow-md' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => setRelatorioSelecionado(relatorio.id)}
            >
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-lg bg-accent/50">
                      <Icone className="h-5 w-5 text-primary" />
                    </div>
                    <Badge variant={selecionado ? 'default' : 'outline'}>
                      {relatorio.categoria}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium text-foreground">
                      {relatorio.titulo}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {relatorio.descricao}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Preview do relatório */}
      {visualizandoPreview && relatorioAtual && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <relatorioAtual.icone className="h-5 w-5" />
                {relatorioAtual.titulo} - Preview
              </CardTitle>
              <Badge>{periodoSelecionado.replace('_', ' ')}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Resumo executivo */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(() => {
                  const resumo = getResumoRelatorio(relatorioAtual);
                  return (
                    <>
                      <div className="text-center p-4 bg-accent/30 rounded-lg">
                        <p className="text-2xl font-bold text-foreground">{resumo.total}</p>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">
                          {resumo.detalhes}
                        </p>
                      </div>
                      <div className="text-center p-4 bg-accent/30 rounded-lg">
                        <p className="text-lg font-semibold text-green-600">{resumo.indicador}</p>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">
                          Variação
                        </p>
                      </div>
                      <div className="text-center p-4 bg-accent/30 rounded-lg">
                        <p className="text-lg font-semibold text-foreground">
                          {new Date().toLocaleDateString('pt-BR')}
                        </p>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">
                          Data de Geração
                        </p>
                      </div>
                    </>
                  );
                })()}
              </div>

              <Separator />

              {/* Gráfico */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Análise Gráfica</h3>
                {renderizarGrafico(relatorioAtual)}
              </div>

              <Separator />

              {/* Tabela de dados */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Dados Detalhados</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        {Object.keys(relatorioAtual.dados[0] || {}).map((key) => (
                          <th key={key} className="text-left p-2 font-medium">
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {relatorioAtual.dados.slice(0, 5).map((item, index) => (
                        <tr key={index} className="border-b">
                          {Object.values(item).map((value: any, idx) => (
                            <td key={idx} className="p-2">
                              {typeof value === 'number' && relatorioAtual.id === 'financeiro' 
                                ? `R$ ${value.toLocaleString()}` 
                                : value}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}