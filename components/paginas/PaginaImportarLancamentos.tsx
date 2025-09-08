import { useState } from 'react';
import { usarLancamentos, Lancamento } from '../../contexts/LancamentosContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface LancamentoCSV {
  data: string;
  tipo: string;
  categoria: string;
  descricao: string;
  valor: string;
}

export function PaginaImportarLancamentos() {
  const { importarLancamentos, lancamentos } = usarLancamentos();
  const [previsao, setPrevisao] = useState<LancamentoCSV[]>([]);

  const handleArquivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const arquivo = e.target.files?.[0];
    if (!arquivo) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const texto = ev.target?.result as string;
      const linhas = texto.trim().split(/\r?\n/);
      const conteudo = linhas.slice(1).map(linha => {
        const [data, tipo, categoria, descricao, valor] = linha.split(',');
        return { data, tipo, categoria, descricao, valor };
      });
      setPrevisao(conteudo);
    };
    reader.readAsText(arquivo);
  };

  const confirmarImportacao = () => {
    const dados: Lancamento[] = previsao.map(l => ({
      id: Date.now().toString() + Math.random().toString(36).slice(2),
      data: l.data,
      tipo: l.tipo as 'receita' | 'despesa',
      categoria: l.categoria,
      descricao: l.descricao,
      valor: Number(l.valor),
    }));
    importarLancamentos(dados);
    setPrevisao([]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Importar Lançamentos</h1>
        <p className="text-muted-foreground">Selecione um arquivo CSV com as colunas data, tipo, categoria, descricao e valor.</p>
      </div>

      <Input type="file" accept=".csv" onChange={handleArquivo} />

      {previsao.length > 0 && (
        <div className="space-y-2">
          <p>{previsao.length} lançamentos prontos para importar.</p>
          <Button onClick={confirmarImportacao}>Confirmar importação</Button>
        </div>
      )}

      {lancamentos.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold">Lançamentos atuais</h2>
          <ul className="list-disc ml-4 space-y-1">
            {lancamentos.map(l => (
              <li key={l.id}>
                {l.data} - {l.tipo} - {l.categoria} - {l.descricao} - R$ {l.valor}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

