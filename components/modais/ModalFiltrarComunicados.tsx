import React, { useState } from 'react';
import { Button } from '../ui/button';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Separator } from '../ui/separator';

interface Props {
  filtrosAtuais: {
    prioridade: string[];
    lidos: string;
    periodo: string;
  };
  onAplicar: (filtros: any) => void;
  onFechar: () => void;
}

export function ModalFiltrarComunicados({ filtrosAtuais, onAplicar, onFechar }: Props) {
  const [filtros, setFiltros] = useState(filtrosAtuais);

  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/50" onClick={onFechar} />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="relative bg-background rounded-lg shadow-lg w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
          <h3 className="text-lg font-medium mb-6">Filtrar Comunicados</h3>

          {/* Filtro de Prioridade */}
          <div className="space-y-4 mb-6">
            <h4 className="text-sm font-medium">Prioridade</h4>
            <div className="grid grid-cols-3 gap-4">
              {['baixa', 'media', 'alta'].map((prioridade) => (
                <div key={prioridade} className="flex items-center space-x-2">
                  <Checkbox
                    id={`prioridade-${prioridade}`}
                    checked={filtros.prioridade.includes(prioridade)}
                    onCheckedChange={(checked) => {
                      setFiltros(prev => ({
                        ...prev,
                        prioridade: checked
                          ? [...prev.prioridade, prioridade]
                          : prev.prioridade.filter(p => p !== prioridade)
                      }));
                    }}
                  />
                  <Label htmlFor={`prioridade-${prioridade}`}>
                    {prioridade.charAt(0).toUpperCase() + prioridade.slice(1)}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-6" />

          {/* Filtro de Status */}
          <div className="space-y-4 mb-6">
            <h4 className="text-sm font-medium">Status de Leitura</h4>
            <RadioGroup
              value={filtros.lidos}
              onValueChange={(value) => setFiltros(prev => ({ ...prev, lidos: value }))}
            >
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="todos" id="todos" />
                  <Label htmlFor="todos">Todos</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="lidos" id="lidos" />
                  <Label htmlFor="lidos">Lidos</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="naoLidos" id="naoLidos" />
                  <Label htmlFor="naoLidos">Não lidos</Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Botões */}
          <div className="flex justify-end gap-2 mt-8">
            <Button variant="outline" onClick={onFechar}>
              Cancelar
            </Button>
            <Button onClick={() => onAplicar(filtros)}>
              Aplicar Filtros
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
