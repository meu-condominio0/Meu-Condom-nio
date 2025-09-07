import { useState } from 'react';
import { Search, Plus, Car, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

interface Veiculo {
  id: string;
  modelo: string;
  placa: string;
  cor: string;
  apartamento: string;
  morador: string;
}

const veiculosMock: Veiculo[] = [
  {
    id: '1',
    modelo: 'Honda Civic',
    placa: 'ABC-1234',
    cor: 'Prata',
    apartamento: '101',
    morador: 'João da Silva'
  },
  {
    id: '2',
    modelo: 'Toyota Corolla',
    placa: 'DEF-5678',
    cor: 'Preto',
    apartamento: '202',
    morador: 'Maria Oliveira'
  }
];

export function PaginaVeiculos() {
  const [veiculos, setVeiculos] = useState(veiculosMock);
  const [busca, setBusca] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [novoVeiculo, setNovoVeiculo] = useState({
    modelo: '',
    placa: '',
    cor: '',
    apartamento: '',
    morador: ''
  });

  const veiculosFiltrados = veiculos.filter(v =>
    v.modelo.toLowerCase().includes(busca.toLowerCase()) ||
    v.placa.toLowerCase().includes(busca.toLowerCase()) ||
    v.apartamento.includes(busca) ||
    v.morador.toLowerCase().includes(busca.toLowerCase())
  );

  const handleAdicionar = () => {
    if (novoVeiculo.modelo && novoVeiculo.placa) {
      const veiculo: Veiculo = {
        id: (veiculos.length + 1).toString(),
        modelo: novoVeiculo.modelo,
        placa: novoVeiculo.placa,
        cor: novoVeiculo.cor,
        apartamento: novoVeiculo.apartamento,
        morador: novoVeiculo.morador
      };
      setVeiculos([...veiculos, veiculo]);
      setModalAberto(false);
      setNovoVeiculo({ modelo: '', placa: '', cor: '', apartamento: '', morador: '' });
    }
  };

  const handleExcluir = (id: string) => {
    setVeiculos(prev => prev.filter(v => v.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Cadastro de Veículos</h2>
          <p className="text-muted-foreground">Gerencie os veículos dos moradores</p>
        </div>
        <Dialog open={modalAberto} onOpenChange={setModalAberto}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Novo Veículo
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Novo Veículo</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="modelo">Modelo</Label>
                <Input id="modelo" value={novoVeiculo.modelo} onChange={e => setNovoVeiculo({ ...novoVeiculo, modelo: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="placa">Placa</Label>
                <Input id="placa" value={novoVeiculo.placa} onChange={e => setNovoVeiculo({ ...novoVeiculo, placa: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cor">Cor</Label>
                <Input id="cor" value={novoVeiculo.cor} onChange={e => setNovoVeiculo({ ...novoVeiculo, cor: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apartamento">Apartamento</Label>
                <Input id="apartamento" value={novoVeiculo.apartamento} onChange={e => setNovoVeiculo({ ...novoVeiculo, apartamento: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="morador">Morador Responsável</Label>
                <Input id="morador" value={novoVeiculo.morador} onChange={e => setNovoVeiculo({ ...novoVeiculo, morador: e.target.value })} />
              </div>
              <Button onClick={handleAdicionar} className="w-full">Salvar</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle>Veículos Cadastrados</CardTitle>
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
                <TableHead>Modelo</TableHead>
                <TableHead>Placa</TableHead>
                <TableHead>Cor</TableHead>
                <TableHead>Apto</TableHead>
                <TableHead>Morador</TableHead>
                <TableHead className="w-16"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {veiculosFiltrados.map(v => (
                <TableRow key={v.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <Car className="h-4 w-4" />
                    {v.modelo}
                  </TableCell>
                  <TableCell>{v.placa}</TableCell>
                  <TableCell>{v.cor}</TableCell>
                  <TableCell>{v.apartamento}</TableCell>
                  <TableCell>{v.morador}</TableCell>
                  <TableCell>
                    <Button size="sm" variant="ghost" onClick={() => handleExcluir(v.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
