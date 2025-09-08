import { useState } from 'react';
import { Search, Plus, Check, X, UserPlus, Truck, FileDown, LogIn, LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Switch } from '../ui/switch';

interface RegistroVisitante {
  id: string;
  nome: string;
  tipo: 'visitante' | 'entrega';
  documento: string;
  apartamento: string;
  status: 'aguardando' | 'autorizado' | 'negado' | 'dentro' | 'finalizado';
  dataHora: string;
  preAutorizado?: boolean;
  recorrente?: boolean;
  entrada?: string;
  saida?: string;
}

const registrosMock: RegistroVisitante[] = [
  {
    id: '1',
    nome: 'João da Silva',
    tipo: 'visitante',
    documento: 'RG 123456',
    apartamento: '101',
    status: 'aguardando',
    dataHora: '20/05/2025 14:00',
    preAutorizado: false,
    recorrente: false
  },
  {
    id: '2',
    nome: 'Entrega Mercado',
    tipo: 'entrega',
    documento: 'Pedido 456',
    apartamento: '202',
    status: 'autorizado',
    dataHora: '20/05/2025 15:30',
    preAutorizado: true,
    recorrente: false
  }
];

export function PaginaVisitantes() {
  const [registros, setRegistros] = useState(registrosMock);
  const [busca, setBusca] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [novoRegistro, setNovoRegistro] = useState({
    nome: '',
    tipo: 'visitante',
    documento: '',
    apartamento: '',
    preAutorizado: false,
    recorrente: false
  });

  const registrosFiltrados = registros.filter(r =>
    r.nome.toLowerCase().includes(busca.toLowerCase()) ||
    r.apartamento.includes(busca)
  );

  const handleAutorizar = (id: string) => {
    setRegistros(prev => prev.map(r => r.id === id ? { ...r, status: 'autorizado' } : r));
  };

  const handleNegar = (id: string) => {
    setRegistros(prev => prev.map(r => r.id === id ? { ...r, status: 'negado' } : r));
  };

  const handleRegistrarEntrada = (id: string) => {
    const registro = registros.find(r => r.id === id);
    if (registro) {
      alert(`Visitante ${registro.nome} chegou. Notificando morador do apto ${registro.apartamento}.`);
    }
    setRegistros(prev => prev.map(r => r.id === id ? { ...r, status: 'dentro', entrada: new Date().toLocaleString('pt-BR') } : r));
  };

  const handleRegistrarSaida = (id: string) => {
    setRegistros(prev => prev.map(r => r.id === id ? { ...r, status: 'finalizado', saida: new Date().toLocaleString('pt-BR') } : r));
  };

  const handleGerarRelatorio = () => {
    const headers = ['Nome', 'Tipo', 'Documento', 'Apartamento', 'Status', 'Entrada', 'Saída'];
    const rows = registros.map(r => [
      r.nome,
      r.tipo,
      r.documento,
      r.apartamento,
      r.status,
      r.entrada || '',
      r.saida || ''
    ]);
    const csv = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'relatorio_acessos.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleAdicionar = () => {
    if (novoRegistro.nome && novoRegistro.apartamento) {
      const registro: RegistroVisitante = {
        id: (registros.length + 1).toString(),
        nome: novoRegistro.nome,
        tipo: novoRegistro.tipo as 'visitante' | 'entrega',
        documento: novoRegistro.documento,
        apartamento: novoRegistro.apartamento,
        status: novoRegistro.preAutorizado ? 'autorizado' : 'aguardando',
        dataHora: new Date().toLocaleString('pt-BR'),
        preAutorizado: novoRegistro.preAutorizado,
        recorrente: novoRegistro.recorrente
      };
      setRegistros([...registros, registro]);
      setModalAberto(false);
      setNovoRegistro({ nome: '', tipo: 'visitante', documento: '', apartamento: '', preAutorizado: false, recorrente: false });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Controle de Visitantes</h2>
          <p className="text-muted-foreground">Autorize visitantes e registre entregas</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2" onClick={handleGerarRelatorio}>
            <FileDown className="h-4 w-4" />
            Relatório
          </Button>
          <Dialog open={modalAberto} onOpenChange={setModalAberto}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Novo Registro
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Novo Visitante/Entrega</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome</Label>
                  <Input id="nome" value={novoRegistro.nome} onChange={e => setNovoRegistro({ ...novoRegistro, nome: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tipo">Tipo</Label>
                  <Select value={novoRegistro.tipo} onValueChange={v => setNovoRegistro({ ...novoRegistro, tipo: v as any })}>
                    <SelectTrigger id="tipo">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="visitante">Visitante</SelectItem>
                      <SelectItem value="entrega">Entrega</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="documento">Documento</Label>
                  <Input id="documento" value={novoRegistro.documento} onChange={e => setNovoRegistro({ ...novoRegistro, documento: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apartamento">Apartamento</Label>
                  <Input id="apartamento" value={novoRegistro.apartamento} onChange={e => setNovoRegistro({ ...novoRegistro, apartamento: e.target.value })} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="preAutorizado">Pré-autorizado</Label>
                  <Switch id="preAutorizado" checked={novoRegistro.preAutorizado} onCheckedChange={v => setNovoRegistro({ ...novoRegistro, preAutorizado: v })} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="recorrente">Recorrente</Label>
                  <Switch id="recorrente" checked={novoRegistro.recorrente} onCheckedChange={v => setNovoRegistro({ ...novoRegistro, recorrente: v })} />
                </div>
                <Button onClick={handleAdicionar} className="w-full">Salvar</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle>Registros Recentes</CardTitle>
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar"
                className="pl-8"
                value={busca}
                onChange={e => setBusca(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Documento</TableHead>
                <TableHead>Apto</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Entrada</TableHead>
                <TableHead>Saída</TableHead>
                <TableHead className="w-32"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {registrosFiltrados.map(registro => (
                <TableRow key={registro.id}>
                  <TableCell className="font-medium">{registro.nome}</TableCell>
                  <TableCell className="capitalize flex items-center gap-2">
                    {registro.tipo === 'visitante' ? <UserPlus className="h-4 w-4" /> : <Truck className="h-4 w-4" />}
                    {registro.tipo}
                  </TableCell>
                  <TableCell>{registro.documento}</TableCell>
                  <TableCell>{registro.apartamento}</TableCell>
                  <TableCell>
                    <Badge variant={
                      registro.status === 'autorizado' || registro.status === 'dentro' ? 'default' :
                      registro.status === 'negado' ? 'destructive' : 'outline'
                    }>
                      {registro.status === 'aguardando'
                        ? 'Aguardando'
                        : registro.status === 'autorizado'
                        ? 'Autorizado'
                        : registro.status === 'dentro'
                        ? 'No Local'
                        : registro.status === 'finalizado'
                        ? 'Finalizado'
                        : 'Negado'}
                    </Badge>
                  </TableCell>
                  <TableCell>{registro.entrada || '-'}</TableCell>
                  <TableCell>{registro.saida || '-'}</TableCell>
                  <TableCell className="flex gap-2">
                    {registro.status === 'aguardando' && (
                      <>
                        <Button size="sm" variant="outline" onClick={() => handleAutorizar(registro.id)}>
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleNegar(registro.id)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    {registro.status === 'autorizado' && (
                      <Button size="sm" variant="outline" onClick={() => handleRegistrarEntrada(registro.id)}>
                        <LogIn className="h-4 w-4" />
                      </Button>
                    )}
                    {registro.status === 'dentro' && (
                      <Button size="sm" variant="outline" onClick={() => handleRegistrarSaida(registro.id)}>
                        <LogOut className="h-4 w-4" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
