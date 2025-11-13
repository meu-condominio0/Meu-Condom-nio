import { Clock, User } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

interface Props {
  comunicado: {
    titulo: string;
    conteudo: string;
    autor: string;
    data: string;
    categoria: string;
    prioridade: string;
    lido?: boolean;
  };
  onClose: () => void;
  onConfirmarLeitura?: () => void;
  getPrioridadeBadge: (prioridade: string) => any;
  getCategoriaNome: (categoria: string) => string;
}

export function ModalVerComunicado({ 
  comunicado, 
  onClose, 
  onConfirmarLeitura,
  getPrioridadeBadge,
  getCategoriaNome
}: Props) {
  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="relative bg-background rounded-lg shadow-lg w-full max-w-2xl p-6" onClick={e => e.stopPropagation()}>
          <div className="space-y-4">
            {/* Cabeçalho */}
            <div className="flex justify-between items-start gap-4">
              <h2 className="text-xl font-semibold">{comunicado.titulo}</h2>
              <div className="flex items-center gap-2">
                <Badge {...getPrioridadeBadge(comunicado.prioridade)}>
                  {getPrioridadeBadge(comunicado.prioridade).label}
                </Badge>
                {comunicado.lido && (
                  <Badge variant="secondary">Lido</Badge>
                )}
              </div>
            </div>

            {/* Metadados */}
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="p-1 rounded-full bg-primary/10">
                  <User className="h-3 w-3 text-primary" />
                </div>
                <small>Por: {comunicado.autor}</small>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1 rounded-full bg-primary/10">
                  <Clock className="h-3 w-3 text-primary" />
                </div>
                <small>Há: {comunicado.data}</small>
              </div>
            </div>

            {/* Conteúdo */}
            <div className="my-6">
              <p className="text-base leading-relaxed whitespace-pre-wrap">
                {comunicado.conteudo}
              </p>
            </div>

            {/* Rodapé */}
            <div className="flex items-center gap-2 pt-4 border-t">
              <span className="text-sm text-muted-foreground">Categoria:</span>
              <Badge variant="outline">
                {getCategoriaNome(comunicado.categoria)}
              </Badge>
            </div>

            {/* Ações */}
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={onClose}>
                Fechar
              </Button>
              {!comunicado.lido && onConfirmarLeitura && (
                <Button onClick={onConfirmarLeitura}>
                  Confirmar Leitura
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
