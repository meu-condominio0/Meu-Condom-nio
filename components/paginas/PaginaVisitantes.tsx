import { useState } from 'react';
import { Search, Plus, Check, X, UserPlus, Truck } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

interface RegistroVisitante {
  id: string;
  nome: string;
  tipo: 'visitante' | 'entrega';
  documento: string;
  apartamento: string;
  status: 'aguardando' | 'autorizado' | 'negado';
  dataHora: string;
}

const registrosMock: RegistroVisitante[] = [
  {
    id: '1',
    nome: 'João da Silva',
    tipo: 'visitante',
    documento: 'RG 123456',
    apartamento: '101',
    status: 'aguardando',
    dataHora: '20/05/2025 14:00'
  },
  {
    id: '2',
    nome: 'Entrega Mercado',
    tipo: 'entrega',
    documento: 'Pedido 456',
    apartamento: '202',
    status: 'autorizado',
    dataHora: '20/05/2025 15:30'
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
    apartamento: ''
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

  const handleAdicionar = () => {
    if (novoRegistro.nome && novoRegistro.apartamento) {
      const registro: RegistroVisitante = {
        id: (registros.length + 1).toString(),
        nome: novoRegistro.nome,
        tipo: novoRegistro.tipo as 'visitante' | 'entrega',
        documento: novoRegistro.documento,
        apartamento: novoRegistro.apartamento,
        status: 'aguardando',
        dataHora: new Date().toLocaleString('pt-BR')
      };
      setRegistros([...registros, registro]);
      setModalAberto(false);
      setNovoRegistro({ nome: '', tipo: 'visitante', documento: '', apartamento: '' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Controle de Visitantes</h2>
          <p className="text-muted-foreground">Autorize visitantes e registre entregas</p>
        </div>
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
              <Button onClick={handleAdicionar} className="w-full">Salvar</Button>
            </div>
          </DialogContent>
        </Dialog>
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
                <TableHead className="w-24"></TableHead>
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
                      registro.status === 'autorizado' ? 'default' :
                      registro.status === 'negado' ? 'destructive' : 'outline'
                    }>
                      {registro.status === 'aguardando' ? 'Aguardando' : registro.status === 'autorizado' ? 'Autorizado' : 'Negado'}
                    </Badge>
                  </TableCell>
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
