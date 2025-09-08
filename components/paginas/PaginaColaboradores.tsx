import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

interface Colaborador {
  id: string;
  nome: string;
  funcao: 'porteiro' | 'zelador' | 'seguranca';
  turno: string;
}

export function PaginaColaboradores() {
  const [colaboradores, setColaboradores] = useState<Colaborador[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/colaboradores')
      .then(r => r.json())
      .then(setColaboradores)
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Colaboradores</h2>
        <p className="text-muted-foreground">Veja os funcionários e seus turnos de trabalho</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Equipe</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Função</TableHead>
                <TableHead>Turno</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {colaboradores.map(c => (
                <TableRow key={c.id}>
                  <TableCell>{c.nome}</TableCell>
                  <TableCell className="capitalize">{c.funcao}</TableCell>
                  <TableCell>{c.turno}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
