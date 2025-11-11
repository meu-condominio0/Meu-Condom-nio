import React, { useMemo, useState } from 'react';
import { assembleiasMock, Assembleia } from '../../__mocks__/assembleias';
import { usarContextoApp } from '../../contexts/AppContext';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '../ui/dialog';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';

export function PaginaAssembleias() {
  const { usuarioLogado } = usarContextoApp();
  const ehSindico = usuarioLogado?.tipo === 'sindico';

  const [assembleias, setAssembleias] = useState<Assembleia[]>(assembleiasMock);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [editando, setEditando] = useState<Assembleia | null>(null);

  const [form, setForm] = useState({
    titulo: '',
    descricao: '',
    pauta: '',
    data: '',
    status: 'Agendada',
    ata_url: '' as string,
  });

  const ordenar = useMemo(() => {
    return [...assembleias].sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());
  }, [assembleias]);
  const [selecionada, setSelecionada] = useState<Assembleia | null>(null);

  function abrirNovo() {
    setEditando(null);
    setForm({ titulo: '', descricao: '', pauta: '', data: '', status: 'Agendada', ata_url: '' });
    setMostrarForm(true);
  }

  function abrirEditar(a: Assembleia) {
    setEditando(a);
    setForm({ titulo: a.titulo, descricao: a.descricao || '', pauta: a.pauta || '', data: a.data, status: a.status, ata_url: a.ata_url || '' });
    setMostrarForm(true);
  }

  function salvar() {
    if (!form.titulo || !form.data) return;

    if (editando) {
      setAssembleias(prev => prev.map(p => p.id === editando.id ? { ...p, ...form, ata_url: form.ata_url || null } as Assembleia : p));
    } else {
      const novo: Assembleia = {
        id: Math.max(0, ...assembleias.map(a => a.id)) + 1,
        titulo: form.titulo,
        descricao: form.descricao,
        pauta: form.pauta,
        data: form.data,
        status: form.status as Assembleia['status'],
        ata_url: form.ata_url || null,
      };

      setAssembleias(prev => [novo, ...prev]);
    }

    setMostrarForm(false);
    setEditando(null);
  }

  function excluir(id: number) {
    if (!confirm('Deseja realmente excluir esta assembleia?')) return;
    setAssembleias(prev => prev.filter(p => p.id !== id));
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Assembleias</h2>
          <p className="text-sm text-muted-foreground">Lista de assembleias realizadas e agendadas</p>
        </div>
        {ehSindico && (
          <div className="flex gap-2">
            <Button onClick={abrirNovo}>Nova Assembleia</Button>
          </div>
        )}
      </div>

      {mostrarForm && (
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input className="input" placeholder="Título" value={form.titulo} onChange={e => setForm({ ...form, titulo: e.target.value })} />
            <input className="input" type="datetime-local" value={form.data} onChange={e => setForm({ ...form, data: e.target.value })} />
            <select className="input" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
              <option>Agendada</option>
              <option>Concluida</option>
              <option>Cancelada</option>
            </select>
            <input className="input" placeholder="Link da ata (opcional)" value={form.ata_url} onChange={e => setForm({ ...form, ata_url: e.target.value })} />
          </div>

          <textarea className="input mt-3" placeholder="Descrição curta (resumo)" rows={3} value={form.descricao} onChange={e => setForm({ ...form, descricao: e.target.value })} />

          <label className="text-sm font-medium mt-3">Pauta / Descrição detalhada</label>
          <textarea className="input mt-1" placeholder="Pauta detalhada (itens, tópicos)" rows={6} value={form.pauta} onChange={e => setForm({ ...form, pauta: e.target.value })} />

          <div className="flex gap-2 mt-3">
            <Button onClick={salvar}>{editando ? 'Salvar alterações' : 'Criar assembleia'}</Button>
            <Button variant="ghost" onClick={() => { setMostrarForm(false); setEditando(null); }}>Cancelar</Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ordenar.map(a => {
          const dataAssembleia = new Date(a.data);
          const agora = new Date();
          const isFuture = dataAssembleia.getTime() > agora.getTime();

          const cardBg = isFuture
            ? 'bg-gradient-to-r from-emerald-50 to-white'
            : a.status === 'Concluida'
              ? 'bg-gray-50'
              : a.status === 'Cancelada'
                ? 'bg-rose-50'
                : 'bg-white';

          const statusClass = a.status === 'Agendada'
            ? 'bg-emerald-600 text-white'
            : a.status === 'Concluida'
              ? 'bg-sky-600 text-white'
              : 'bg-rose-600 text-white';

          return (
            <div key={a.id} className={`${cardBg} rounded-lg p-5 border border-border/40 shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 pr-3">
                  <p className="text-xs text-muted-foreground">{format(new Date(a.data), "dd 'de' MMMM 'de' yyyy '•' HH:mm", { locale: ptBR })}</p>
                  <h3 className="font-bold text-lg mt-1 text-slate-800">{a.titulo}</h3>
                  <p className="text-sm text-slate-600 mt-2">{a.descricao}</p>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusClass}`}>{a.status}</span>
                  {a.ata_url && (
                    <a href={a.ata_url} target="_blank" rel="noreferrer" className="text-sm text-primary underline">Ver ata</a>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4">
                {ehSindico && (
                  <>
                    <Button variant="ghost" size="sm" onClick={() => abrirEditar(a)}>Editar</Button>
                    <Button variant="destructive" size="sm" onClick={() => excluir(a.id)}>Excluir</Button>
                  </>
                )}

                {/* Mostrar 'Ver mais' para todos os usuários (morador e síndico) */}
                <Button variant="ghost" size="sm" onClick={() => setSelecionada(a)}>Ver mais</Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dialog para descrição detalhada da ata */}
      <Dialog open={!!selecionada} onOpenChange={(open) => { if (!open) setSelecionada(null); }}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selecionada?.titulo}</DialogTitle>
          </DialogHeader>

          <DialogDescription>
            <p className="text-sm text-muted-foreground">{selecionada ? format(new Date(selecionada.data), "dd 'de' MMMM 'de' yyyy '•' HH:mm", { locale: ptBR }) : ''}</p>
          </DialogDescription>

          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Pauta / Descrição detalhada</h4>
            <p className="text-sm text-slate-700 whitespace-pre-line">{selecionada?.pauta || selecionada?.descricao || 'Nenhuma descrição detalhada disponível.'}</p>
          </div>

          <DialogFooter>
            <div className="flex gap-2">
              {selecionada?.ata_url && (
                <a href={selecionada.ata_url} target="_blank" rel="noreferrer" className="text-sm bg-primary/10 text-primary px-3 py-2 rounded-md">Abrir ata</a>
              )}
              <DialogClose asChild>
                <Button variant="ghost">Fechar</Button>
              </DialogClose>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {assembleias.length === 0 && (
        <p className="text-muted-foreground">Nenhuma assembleia cadastrada.</p>
      )}
    </div>
  );
}
