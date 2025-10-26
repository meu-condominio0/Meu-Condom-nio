import { useState } from 'react';
import { Button } from '../ui/button';

interface ModalAlterarSenhaProps {
  onClose: () => void;
  onSave: (senhas: any) => Promise<void>;
}

export function ModalAlterarSenha({ onClose, onSave }: ModalAlterarSenhaProps) {
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');

  const handleSalvar = async () => {
    if (novaSenha !== confirmarSenha) {
      setErro('As senhas não conferem');
      return;
    }

    setSalvando(true);
    try {
      await onSave({ senhaAtual, novaSenha });
      onClose();
    } catch (error) {
      console.error('Erro ao salvar:', error);
      setErro('Erro ao alterar senha');
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="relative bg-background rounded-lg shadow-lg w-full max-w-md p-6">
          <h3 className="text-lg font-medium mb-4">Alterar Senha</h3>
          <div className="space-y-4">
            {erro && (
              <div className="text-sm text-destructive">{erro}</div>
            )}
            <div>
              <label className="text-sm font-medium mb-1">Senha Atual</label>
              <input
                type="password"
                value={senhaAtual}
                onChange={(e) => setSenhaAtual(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1">Nova Senha</label>
              <input
                type="password"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1">Confirmar Nova Senha</label>
              <input
                type="password"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                className="w-full p-2 border rounded-md"
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
