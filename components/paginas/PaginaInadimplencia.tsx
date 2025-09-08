import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

interface Historico { data: string; acao: string }
interface Inadimplente {
  unidade: string;
  valor: number;
  historico: Historico[];
}

export function PaginaInadimplencia() {
  const [unidades, setUnidades] = useState<Inadimplente[]>([
    {
      unidade: 'Apt 101',
      valor: 1200,
      historico: [{ data: '2024-05-01', acao: 'Cobrança enviada' }],
    },
    {
      unidade: 'Apt 202',
      valor: 800,
      historico: [{ data: '2024-05-10', acao: 'Aviso de atraso' }],
    },
  ]);
  const [novaAcao, setNovaAcao] = useState('');

  const registrarAcao = (index: number) => {
    if (!novaAcao) return;
    setUnidades(prev => {
      const copia = [...prev];
      copia[index].historico.push({
        data: new Date().toISOString().slice(0, 10),
        acao: novaAcao,
      });
      return copia;
    });
    setNovaAcao('');
  };

  const gerarCarta = (unidade: Inadimplente) => {
    alert(`Carta de cobrança gerada para ${unidade.unidade} no valor de R$ ${unidade.valor.toFixed(2)}`);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Dashboard de Inadimplência</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Unidade</TableHead>
                <TableHead className="text-right">Valor Devido</TableHead>
                <TableHead>Última ação</TableHead>
                <TableHead className="w-[180px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {unidades.map((u, i) => {
                const ultima = u.historico[u.historico.length - 1];
                return (
                  <TableRow key={u.unidade}>
                    <TableCell>{u.unidade}</TableCell>
                    <TableCell className="text-right">R$ {u.valor.toFixed(2)}</TableCell>
                    <TableCell>
                      {ultima.data}: {ultima.acao}
                    </TableCell>
                    <TableCell className="space-y-2">
                      <Button size="sm" onClick={() => gerarCarta(u)} className="w-full">
                        Gerar carta
                      </Button>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Registrar ação"
                          value={novaAcao}
                          onChange={e => setNovaAcao(e.target.value)}
                          className="h-8"
                        />
                        <Button size="sm" onClick={() => registrarAcao(i)} className="shrink-0">
                          OK
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

