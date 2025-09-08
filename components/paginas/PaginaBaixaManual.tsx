import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui/select';

interface Boleto {
  id: string;
  descricao: string;
  valor: number;
  status: 'pendente' | 'pago';
  dataPagamento?: string;
}

interface Recebimento {
  id: string;
  boletoId: string;
  valor: number;
  metodo: 'pix' | 'dinheiro' | 'transferencia';
  data: string;
}

export function PaginaBaixaManual() {
  const [boletos, setBoletos] = useState<Boleto[]>([
    { id: '1', descricao: 'Taxa condominial Maio', valor: 450, status: 'pendente' },
    { id: '2', descricao: 'Taxa condominial Junho', valor: 450, status: 'pendente' },
  ]);
  const [recebimentos, setRecebimentos] = useState<Recebimento[]>([]);
  const [form, setForm] = useState({ boletoId: '', valor: '', metodo: 'pix' });

  const handleBaixa = () => {
    const { boletoId, valor, metodo } = form;
    if (!boletoId || !valor) return;
    const val = parseFloat(valor);

    setBoletos(prev =>
      prev.map(b =>
        b.id === boletoId ? { ...b, status: 'pago', dataPagamento: new Date().toISOString() } : b
      )
    );

    setRecebimentos(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        boletoId,
        valor: val,
        metodo: metodo as Recebimento['metodo'],
        data: new Date().toISOString(),
      },
    ]);

    setForm({ boletoId: '', valor: '', metodo: 'pix' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Baixa Manual de Recebimentos</h1>
        <p className="text-muted-foreground">Registre pagamentos recebidos fora do sistema.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Novo Recebimento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select value={form.boletoId} onValueChange={(v) => setForm(f => ({ ...f, boletoId: v }))}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione um boleto" />
            </SelectTrigger>
            <SelectContent>
              {boletos.filter(b => b.status === 'pendente').map(b => (
                <SelectItem key={b.id} value={b.id}>
                  {b.descricao} (R$ {b.valor.toFixed(2)})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="number"
              placeholder="Valor recebido"
              value={form.valor}
              onChange={e => setForm(f => ({ ...f, valor: e.target.value }))}
            />
            <Select value={form.metodo} onValueChange={(v) => setForm(f => ({ ...f, metodo: v }))}>
              <SelectTrigger>
                <SelectValue placeholder="Método de pagamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pix">Pix</SelectItem>
                <SelectItem value="dinheiro">Dinheiro</SelectItem>
                <SelectItem value="transferencia">Transferência</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleBaixa}>Registrar</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recebimentos Registrados</CardTitle>
        </CardHeader>
        <CardContent>
          {recebimentos.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nenhum recebimento registrado.</p>
          ) : (
            <ul className="space-y-2 text-sm">
              {recebimentos.map(r => (
                <li key={r.id}>
                  {boletos.find(b => b.id === r.boletoId)?.descricao}: R$ {r.valor.toFixed(2)} via {r.metodo}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

