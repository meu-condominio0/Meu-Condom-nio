import { ChangeEvent, useState } from 'react';
import { Search, Plus, Car, Trash2, Bike } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface Veiculo {
  id: string;
  tipo: 'carro' | 'moto' | 'bicicleta';
  modelo: string;
  placa: string;
  cor: string;
  apartamento: string;
  morador: string;
  garagem: string;
  foto?: string;
}

const veiculosMock: Veiculo[] = [
  {
    id: '1',
    tipo: 'carro',
    modelo: 'Honda Civic',
    placa: 'ABC-1234',
    cor: 'Prata',
    apartamento: '101',
    morador: 'João da Silva',
    garagem: 'G1'
  },
  {
    id: '2',
    tipo: 'carro',
    modelo: 'Toyota Corolla',
    placa: 'DEF-5678',
    cor: 'Preto',
    apartamento: '202',
    morador: 'Maria Oliveira',
    garagem: 'G2'
  }
];

export function PaginaVeiculos() {
  const [veiculos, setVeiculos] = useState(veiculosMock);
  const [busca, setBusca] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [novoVeiculo, setNovoVeiculo] = useState<Omit<Veiculo, 'id'>>({
    tipo: 'carro',
    modelo: '',
    placa: '',
    cor: '',
    apartamento: '',
    morador: '',
    garagem: '',
    foto: ''
  });

  const veiculosFiltrados = veiculos.filter(v =>
    v.modelo.toLowerCase().includes(busca.toLowerCase()) ||
    v.placa.toLowerCase().includes(busca.toLowerCase()) ||
    v.cor.toLowerCase().includes(busca.toLowerCase()) ||
    v.tipo.toLowerCase().includes(busca.toLowerCase()) ||
    v.garagem.toLowerCase().includes(busca.toLowerCase()) ||
    v.apartamento.includes(busca) ||
    v.morador.toLowerCase().includes(busca.toLowerCase())
  );

  const handleAdicionar = () => {
    if (novoVeiculo.modelo && novoVeiculo.placa) {
      const veiculo: Veiculo = {
        id: (veiculos.length + 1).toString(),
        tipo: novoVeiculo.tipo,
        modelo: novoVeiculo.modelo,
        placa: novoVeiculo.placa,
        cor: novoVeiculo.cor,
        apartamento: novoVeiculo.apartamento,
        morador: novoVeiculo.morador,
        garagem: novoVeiculo.garagem,
        foto: novoVeiculo.foto
      };
      setVeiculos([...veiculos, veiculo]);
      setModalAberto(false);
      setNovoVeiculo({ tipo: 'carro', modelo: '', placa: '', cor: '', apartamento: '', morador: '', garagem: '', foto: '' });
    }
  };

  const handleFoto = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setNovoVeiculo({ ...novoVeiculo, foto: url });
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
                <Label htmlFor="tipo">Tipo</Label>
                <Select value={novoVeiculo.tipo} onValueChange={v => setNovoVeiculo({ ...novoVeiculo, tipo: v as 'carro' | 'moto' | 'bicicleta' })}>
                  <SelectTrigger id="tipo">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="carro">Carro</SelectItem>
                    <SelectItem value="moto">Moto</SelectItem>
                    <SelectItem value="bicicleta">Bicicleta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
              <div className="space-y-2">
                <Label htmlFor="garagem">Garagem</Label>
                <Input id="garagem" value={novoVeiculo.garagem} onChange={e => setNovoVeiculo({ ...novoVeiculo, garagem: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="foto">Foto</Label>
                <Input id="foto" type="file" accept="image/*" onChange={handleFoto} />
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
                <TableHead>Foto</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Modelo</TableHead>
                <TableHead>Placa</TableHead>
                <TableHead>Cor</TableHead>
                <TableHead>Apto</TableHead>
                <TableHead>Morador</TableHead>
                <TableHead>Garagem</TableHead>
                <TableHead className="w-16"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {veiculosFiltrados.map(v => (
                <TableRow key={v.id}>
                  <TableCell>{v.foto ? <img src={v.foto} alt={v.modelo} className="h-8 w-8 object-cover rounded" /> : v.tipo === 'bicicleta' ? <Bike className="h-4 w-4" /> : <Car className="h-4 w-4" />}</TableCell>
                  <TableCell className="capitalize">{v.tipo}</TableCell>
                  <TableCell className="font-medium">{v.modelo}</TableCell>
                  <TableCell>{v.placa}</TableCell>
                  <TableCell>{v.cor}</TableCell>
                  <TableCell>{v.apartamento}</TableCell>
                  <TableCell>{v.morador}</TableCell>
                  <TableCell>{v.garagem}</TableCell>
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
