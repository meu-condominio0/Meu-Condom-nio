import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

interface Colaborador {
  id: string;
  nome: string;
  funcao: 'porteiro' | 'zelador' | 'seguranca';
  turno: string;
}

const colaboradoresMock: Colaborador[] = [
  {
    id: '1',
    nome: 'João Silva',
    funcao: 'porteiro',
    turno: 'Manhã (6h às 14h)'
  },
  {
    id: '2',
    nome: 'Maria Santos',
    funcao: 'zelador',
    turno: 'Manhã (7h às 15h)'
  },
  {
    id: '3',
    nome: 'Pedro Oliveira',
    funcao: 'seguranca',
    turno: 'Noite (22h às 6h)'
  },
  {
    id: '4',
    nome: 'Ana Costa',
    funcao: 'porteiro',
    turno: 'Tarde (14h às 22h)'
  },
  {
    id: '5',
    nome: 'Carlos Souza',
    funcao: 'zelador',
    turno: 'Tarde (15h às 23h)'
  }
];

const getFuncaoFormatada = (funcao: string) => {
  const formatos = {
    porteiro: 'Porteiro',
    zelador: 'Zelador',
    seguranca: 'Segurança'
  };
  return formatos[funcao as keyof typeof formatos] || funcao;
};

export function PaginaColaboradores() {
  const [colaboradores, setColaboradores] = useState<Colaborador[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/colaboradores')
      .then(r => r.json())
      .then(setColaboradores)
      .catch(() => {
        // Usar dados mock se a API falhar
        setColaboradores(colaboradoresMock);
      });
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
                  <TableCell className="font-medium">{c.nome}</TableCell>
                  <TableCell>{getFuncaoFormatada(c.funcao)}</TableCell>
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