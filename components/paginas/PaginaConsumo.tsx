import { useState, ChangeEvent, FormEvent } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { calcularValorConsumo, FaixaTarifaria } from '../../utils/consumo';

interface LeituraConsumo {
  id: string;
  unidade: string;
  tipo: 'agua' | 'gas';
  leituraAtual: number;
  leituraAnterior: number;
  data: string;
  foto?: string;
  valor: number;
}

const faixasAgua: FaixaTarifaria[] = [
  { limite: 10, valor: 5 },
  { limite: 20, valor: 6 },
  { limite: Infinity, valor: 7 }
];

const faixasGas: FaixaTarifaria[] = [
  { limite: 10, valor: 8 },
  { limite: 20, valor: 10 },
  { limite: Infinity, valor: 12 }
];

export function PaginaConsumo() {
  const [leituras, setLeituras] = useState<LeituraConsumo[]>([]);
  const [form, setForm] = useState({
    unidade: '',
    tipo: 'agua',
    leituraAtual: '',
    leituraAnterior: '',
    foto: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFoto = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setForm({ ...form, foto: url });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const consumo = Number(form.leituraAtual) - Number(form.leituraAnterior || 0);
    const faixas = form.tipo === 'agua' ? faixasAgua : faixasGas;
    const valor = calcularValorConsumo(consumo, faixas);
    const nova: LeituraConsumo = {
      id: Date.now().toString(),
      unidade: form.unidade,
      tipo: form.tipo as 'agua' | 'gas',
      leituraAtual: Number(form.leituraAtual),
      leituraAnterior: Number(form.leituraAnterior || 0),
      data: new Date().toLocaleDateString('pt-BR'),
      foto: form.foto,
      valor
    };
    setLeituras([nova, ...leituras]);
    setForm({ unidade: '', tipo: 'agua', leituraAtual: '', leituraAnterior: '', foto: '' });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Registrar Consumo</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
            <Input
              name="unidade"
              placeholder="Unidade"
              value={form.unidade}
              onChange={handleChange}
              required
            />
            <Select value={form.tipo} onValueChange={valor => setForm({ ...form, tipo: valor })}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="agua">Água</SelectItem>
                <SelectItem value="gas">Gás</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="number"
              name="leituraAnterior"
              placeholder="Leitura anterior"
              value={form.leituraAnterior}
              onChange={handleChange}
            />
            <Input
              type="number"
              name="leituraAtual"
              placeholder="Leitura atual"
              value={form.leituraAtual}
              onChange={handleChange}
              required
            />
            <Input type="file" accept="image/*" onChange={handleFoto} />
            <Button type="submit" className="md:col-span-2">Salvar</Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {leituras.map(l => (
          <Card key={l.id}>
            <CardHeader>
              <CardTitle>
                {l.unidade} - {l.tipo === 'agua' ? 'Água' : 'Gás'} ({l.data})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>Leitura anterior: {l.leituraAnterior} m³</p>
              <p>Leitura atual: {l.leituraAtual} m³</p>
              <p>Consumo: {l.leituraAtual - l.leituraAnterior} m³</p>
              <p>Valor: R$ {l.valor.toFixed(2)}</p>
              {l.foto && (
                <img src={l.foto} alt="Medidor" className="mt-2 w-32 h-32 object-cover" />
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
