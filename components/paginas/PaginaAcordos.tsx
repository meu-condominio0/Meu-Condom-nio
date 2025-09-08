import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

interface Parcela {
  numero: number;
  data: string;
  valor: number;
}

export function PaginaAcordos() {
  const [valorPrincipal, setValorPrincipal] = useState('');
  const [multa, setMulta] = useState('2');
  const [juros, setJuros] = useState('1');
  const [correcao, setCorrecao] = useState('0');
  const [honorarios, setHonorarios] = useState('10');
  const [parcelas, setParcelas] = useState('3');
  const [resultado, setResultado] = useState<Parcela[]>([]);

  const calcularAcordo = () => {
    const principal = parseFloat(valorPrincipal) || 0;
    const total = principal * (1 + (parseFloat(multa)||0)/100 + (parseFloat(juros)||0)/100 + (parseFloat(correcao)||0)/100 + (parseFloat(honorarios)||0)/100);
    const qtd = parseInt(parcelas) || 1;
    const valorParcela = total / qtd;
    const hoje = new Date();
    const parcelasGeradas: Parcela[] = Array.from({ length: qtd }, (_, i) => {
      const data = new Date(hoje);
      data.setMonth(data.getMonth() + i);
      return {
        numero: i + 1,
        data: data.toISOString().slice(0, 10),
        valor: valorParcela,
      };
    });
    setResultado(parcelasGeradas);
  };

  const gerarContrato = () => {
    alert('Contrato e boletos gerados e enviados.');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Gerar Acordo de Cobrança</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input placeholder="Valor principal" value={valorPrincipal} onChange={e => setValorPrincipal(e.target.value)} />
            <Input placeholder="Multa (%)" value={multa} onChange={e => setMulta(e.target.value)} />
            <Input placeholder="Juros (%)" value={juros} onChange={e => setJuros(e.target.value)} />
            <Input placeholder="Correção (%)" value={correcao} onChange={e => setCorrecao(e.target.value)} />
            <Input placeholder="Honorários (%)" value={honorarios} onChange={e => setHonorarios(e.target.value)} />
            <Input placeholder="Parcelas" value={parcelas} onChange={e => setParcelas(e.target.value)} />
          </div>
          <Button onClick={calcularAcordo}>Gerar acordo</Button>

          {resultado.length > 0 && (
            <div className="space-y-4 mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Parcela</TableHead>
                    <TableHead>Vencimento</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {resultado.map(p => (
                    <TableRow key={p.numero}>
                      <TableCell>{p.numero}</TableCell>
                      <TableCell>{p.data}</TableCell>
                      <TableCell className="text-right">R$ {p.valor.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button onClick={gerarContrato} className="w-full">Gerar contrato e enviar boletos</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

