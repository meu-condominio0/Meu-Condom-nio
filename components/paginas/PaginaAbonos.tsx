import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui/select';

interface Boleto {
  id: string;
  descricao: string;
  valorOriginal: number;
  valorAtual: number;
}

interface Abono {
  id: string;
  boletoId: string;
  tipo: 'multa' | 'juros' | 'valor';
  valor: number;
  motivo: string;
  data: string;
}

export function PaginaAbonos() {
  const [boletos, setBoletos] = useState<Boleto[]>([
    { id: '1', descricao: 'Taxa condominial Maio', valorOriginal: 450, valorAtual: 450 },
    { id: '2', descricao: 'Taxa condominial Junho', valorOriginal: 450, valorAtual: 450 },
  ]);
  const [abonos, setAbonos] = useState<Abono[]>([]);
  const [form, setForm] = useState({ boletoId: '', tipo: 'multa', valor: '', motivo: '' });

  const handleAbonar = () => {
    const { boletoId, tipo, valor, motivo } = form;
    if (!boletoId || !valor) return;
    const val = parseFloat(valor);

    setBoletos(prev =>
      prev.map(b => (b.id === boletoId ? { ...b, valorAtual: b.valorAtual - val } : b))
    );

    setAbonos(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        boletoId,
        tipo: tipo as Abono['tipo'],
        valor: val,
        motivo,
        data: new Date().toISOString(),
      },
    ]);

    setForm({ boletoId: '', tipo: 'multa', valor: '', motivo: '' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Abono de Boletos</h1>
        <p className="text-muted-foreground">Abone multas, juros ou parte do valor de boletos.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Novo Abono</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select value={form.boletoId} onValueChange={(v) => setForm(f => ({ ...f, boletoId: v }))}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione um boleto" />
            </SelectTrigger>
            <SelectContent>
              {boletos.map(b => (
                <SelectItem key={b.id} value={b.id}>
                  {b.descricao} (R$ {b.valorAtual.toFixed(2)})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select value={form.tipo} onValueChange={(v) => setForm(f => ({ ...f, tipo: v }))}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo de abono" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="multa">Multa</SelectItem>
                <SelectItem value="juros">Juros</SelectItem>
                <SelectItem value="valor">Valor</SelectItem>
              </SelectContent>
            </Select>

            <Input
              type="number"
              placeholder="Valor"
              value={form.valor}
              onChange={e => setForm(f => ({ ...f, valor: e.target.value }))}
            />
          </div>

          <Input
            placeholder="Motivo"
            value={form.motivo}
            onChange={e => setForm(f => ({ ...f, motivo: e.target.value }))}
          />

          <Button onClick={handleAbonar}>Abonar</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Abonos Registrados</CardTitle>
        </CardHeader>
        <CardContent>
          {abonos.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nenhum abono registrado.</p>
          ) : (
            <ul className="space-y-2 text-sm">
              {abonos.map(a => (
                <li key={a.id}>
                  {boletos.find(b => b.id === a.boletoId)?.descricao}: R$ {a.valor.toFixed(2)} ({a.tipo}) - {a.motivo}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Boletos</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            {boletos.map(b => (
              <li key={b.id}>
                {b.descricao}: R$ {b.valorAtual.toFixed(2)} (original: R$ {b.valorOriginal.toFixed(2)})
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

