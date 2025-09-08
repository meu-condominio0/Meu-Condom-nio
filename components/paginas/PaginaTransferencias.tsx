import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui/select';

interface Conta {
  id: string;
  nome: string;
  saldo: number;
}

interface Transferencia {
  id: string;
  origemId: string;
  destinoId: string;
  valor: number;
  tipo: 'manual' | 'automatica';
  data: string;
}

export function PaginaTransferencias() {
  const [contas, setContas] = useState<Conta[]>([
    { id: '1', nome: 'Conta Corrente', saldo: 1000 },
    { id: '2', nome: 'Poupança', saldo: 500 },
  ]);
  const [transferencias, setTransferencias] = useState<Transferencia[]>([]);
  const [form, setForm] = useState({ origem: '', destino: '', valor: '', tipo: 'manual' });

  const handleTransferir = () => {
    const { origem, destino, valor, tipo } = form;
    if (!origem || !destino || origem === destino || !valor) return;

    const val = parseFloat(valor);
    setContas(prev =>
      prev.map(c => {
        if (c.id === origem) return { ...c, saldo: c.saldo - val };
        if (c.id === destino) return { ...c, saldo: c.saldo + val };
        return c;
      })
    );

    setTransferencias(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        origemId: origem,
        destinoId: destino,
        valor: val,
        tipo: tipo as 'manual' | 'automatica',
        data: new Date().toISOString(),
      },
    ]);

    setForm({ origem: '', destino: '', valor: '', tipo: 'manual' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Transferências de Saldo</h1>
        <p className="text-muted-foreground">Registre transferências entre contas.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Nova Transferência</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Select value={form.origem} onValueChange={(v) => setForm(f => ({ ...f, origem: v }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Conta de origem" />
                </SelectTrigger>
                <SelectContent>
                  {contas.map(c => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.nome} (Saldo: R$ {c.saldo.toFixed(2)})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={form.destino} onValueChange={(v) => setForm(f => ({ ...f, destino: v }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Conta de destino" />
                </SelectTrigger>
                <SelectContent>
                  {contas.map(c => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.nome} (Saldo: R$ {c.saldo.toFixed(2)})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="number"
              placeholder="Valor"
              value={form.valor}
              onChange={e => setForm(f => ({ ...f, valor: e.target.value }))}
            />
            <Select value={form.tipo} onValueChange={(v) => setForm(f => ({ ...f, tipo: v }))}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo de transferência" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="manual">Manual</SelectItem>
                <SelectItem value="automatica">Automática</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleTransferir}>Transferir</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Transferências</CardTitle>
        </CardHeader>
        <CardContent>
          {transferencias.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nenhuma transferência registrada.</p>
          ) : (
            <ul className="space-y-2">
              {transferencias.map(t => (
                <li key={t.id} className="text-sm">
                  {contas.find(c => c.id === t.origemId)?.nome} → {contas.find(c => c.id === t.destinoId)?.nome} : R$ {t.valor.toFixed(2)} ({t.tipo})
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

