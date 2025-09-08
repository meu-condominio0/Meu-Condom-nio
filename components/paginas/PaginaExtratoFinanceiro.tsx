import { useState, useMemo } from 'react';
import { usarLancamentos } from '../../contexts/LancamentosContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../ui/table';

export function PaginaExtratoFinanceiro() {
  const { lancamentos } = usarLancamentos();
  const [inicio, setInicio] = useState('');
  const [fim, setFim] = useState('');

  const filtrados = useMemo(() => {
    return lancamentos
      .filter((l) => {
        const data = new Date(l.data);
        if (inicio && data < new Date(inicio)) return false;
        if (fim && data > new Date(fim)) return false;
        return true;
      })
      .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());
  }, [lancamentos, inicio, fim]);

  const exportarCSV = () => {
    const linhas = [
      ['data', 'tipo', 'categoria', 'descricao', 'valor'],
      ...filtrados.map((l) => [l.data, l.tipo, l.categoria, l.descricao, l.valor.toString()])
    ]
      .map((linha) => linha.join(','))
      .join('\n');
    const blob = new Blob([linhas], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'extrato.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Extrato Financeiro</h1>
        <p className="text-muted-foreground">Filtre os lançamentos por período e exporte em CSV.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 space-y-2">
            <label className="text-sm font-medium">Início</label>
            <Input type="date" value={inicio} onChange={(e) => setInicio(e.target.value)} />
          </div>
          <div className="flex-1 space-y-2">
            <label className="text-sm font-medium">Fim</label>
            <Input type="date" value={fim} onChange={(e) => setFim(e.target.value)} />
          </div>
          <div className="flex items-end">
            <Button onClick={exportarCSV} disabled={filtrados.length === 0}>
              Exportar CSV
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtrados.map((l) => (
                <TableRow key={l.id}>
                  <TableCell>{l.data}</TableCell>
                  <TableCell className="capitalize">{l.tipo}</TableCell>
                  <TableCell>{l.categoria}</TableCell>
                  <TableCell>{l.descricao}</TableCell>
                  <TableCell className="text-right">R$ {l.valor.toFixed(2)}</TableCell>
                </TableRow>
              ))}
              {filtrados.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                    Nenhum lançamento no período.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

