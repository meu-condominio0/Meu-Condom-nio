import { useState } from 'react';
import { Search, Plus, PawPrint, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

interface Pet {
  id: string;
  nome: string;
  especie: 'cachorro' | 'gato' | 'outro';
  raca: string;
  apartamento: string;
  morador: string;
}

const petsMock: Pet[] = [
  {
    id: '1',
    nome: 'Rex',
    especie: 'cachorro',
    raca: 'Vira-lata',
    apartamento: '101',
    morador: 'João da Silva'
  },
  {
    id: '2',
    nome: 'Mimi',
    especie: 'gato',
    raca: 'Siames',
    apartamento: '202',
    morador: 'Maria Oliveira'
  }
];

export function PaginaPets() {
  const [pets, setPets] = useState(petsMock);
  const [busca, setBusca] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [novoPet, setNovoPet] = useState({
    nome: '',
    especie: 'cachorro',
    raca: '',
    apartamento: '',
    morador: ''
  });

  const petsFiltrados = pets.filter(p =>
    p.nome.toLowerCase().includes(busca.toLowerCase()) ||
    p.apartamento.includes(busca) ||
    p.morador.toLowerCase().includes(busca.toLowerCase())
  );

  const handleAdicionar = () => {
    if (novoPet.nome && novoPet.apartamento) {
      const pet: Pet = {
        id: (pets.length + 1).toString(),
        nome: novoPet.nome,
        especie: novoPet.especie as 'cachorro' | 'gato' | 'outro',
        raca: novoPet.raca,
        apartamento: novoPet.apartamento,
        morador: novoPet.morador
      };
      setPets([...pets, pet]);
      setModalAberto(false);
      setNovoPet({ nome: '', especie: 'cachorro', raca: '', apartamento: '', morador: '' });
    }
  };

  const handleExcluir = (id: string) => {
    setPets(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Cadastro de Pets</h2>
          <p className="text-muted-foreground">Gerencie os animais de estimação dos moradores</p>
        </div>
        <Dialog open={modalAberto} onOpenChange={setModalAberto}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Novo Pet
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Novo Pet</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome</Label>
                <Input id="nome" value={novoPet.nome} onChange={e => setNovoPet({ ...novoPet, nome: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="especie">Espécie</Label>
                <Select value={novoPet.especie} onValueChange={v => setNovoPet({ ...novoPet, especie: v as any })}>
                  <SelectTrigger id="especie">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cachorro">Cachorro</SelectItem>
                    <SelectItem value="gato">Gato</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="raca">Raça</Label>
                <Input id="raca" value={novoPet.raca} onChange={e => setNovoPet({ ...novoPet, raca: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apartamento">Apartamento</Label>
                <Input id="apartamento" value={novoPet.apartamento} onChange={e => setNovoPet({ ...novoPet, apartamento: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="morador">Morador Responsável</Label>
                <Input id="morador" value={novoPet.morador} onChange={e => setNovoPet({ ...novoPet, morador: e.target.value })} />
              </div>
              <Button onClick={handleAdicionar} className="w-full">Salvar</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle>Pets Cadastrados</CardTitle>
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
                <TableHead>Espécie</TableHead>
                <TableHead>Raça</TableHead>
                <TableHead>Apto</TableHead>
                <TableHead>Morador</TableHead>
                <TableHead className="w-16"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {petsFiltrados.map(pet => (
                <TableRow key={pet.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <PawPrint className="h-4 w-4" />
                    {pet.nome}
                  </TableCell>
                  <TableCell className="capitalize">{pet.especie}</TableCell>
                  <TableCell>{pet.raca}</TableCell>
                  <TableCell>{pet.apartamento}</TableCell>
                  <TableCell>{pet.morador}</TableCell>
                  <TableCell>
                    <Button size="sm" variant="ghost" onClick={() => handleExcluir(pet.id)}>
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
