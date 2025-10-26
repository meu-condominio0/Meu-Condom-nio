import { useState } from 'react';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';

interface ModalPrivacidadeProps {
  configuracoes: any;
  onClose: () => void;
  onSave: (config: any) => Promise<void>;
}

export function ModalPrivacidade({ configuracoes, onClose, onSave }: ModalPrivacidadeProps) {
  const [config, setConfig] = useState({
    perfilPublico: configuracoes?.perfilPublico ?? false,
    mostrarEmail: configuracoes?.mostrarEmail ?? false,
    mostrarTelefone: configuracoes?.mostrarTelefone ?? false,
    receberNotificacoes: configuracoes?.receberNotificacoes ?? true
  });
  const [salvando, setSalvando] = useState(false);

  const handleSalvar = async () => {
    setSalvando(true);
    try {
      await onSave(config);
      onClose();
    } catch (error) {
      console.error('Erro ao salvar:', error);
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="relative bg-background rounded-lg shadow-lg w-full max-w-md p-6">
          <h3 className="text-lg font-medium mb-4">Configurações de Privacidade</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Perfil Público</p>
                <p className="text-sm text-muted-foreground">Permitir que outros vejam seu perfil</p>
              </div>
              <Switch
                checked={config.perfilPublico}
                onCheckedChange={(checked) => setConfig(prev => ({ ...prev, perfilPublico: checked }))}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Mostrar Email</p>
                <p className="text-sm text-muted-foreground">Exibir seu email para outros usuários</p>
              </div>
              <Switch
                checked={config.mostrarEmail}
                onCheckedChange={(checked) => setConfig(prev => ({ ...prev, mostrarEmail: checked }))}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Mostrar Telefone</p>
                <p className="text-sm text-muted-foreground">Exibir seu telefone para outros usuários</p>
              </div>
              <Switch
                checked={config.mostrarTelefone}
                onCheckedChange={(checked) => setConfig(prev => ({ ...prev, mostrarTelefone: checked }))}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Receber Notificações</p>
                <p className="text-sm text-muted-foreground">Permitir notificações do sistema</p>
              </div>
              <Switch
                checked={config.receberNotificacoes}
                onCheckedChange={(checked) => setConfig(prev => ({ ...prev, receberNotificacoes: checked }))}
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-2">
            <Button variant="ghost" onClick={onClose}>Cancelar</Button>
            <Button onClick={handleSalvar} disabled={salvando}>
              {salvando ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
