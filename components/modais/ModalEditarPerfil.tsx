import { useState } from 'react';
import { Button } from '../ui/button';

interface ModalEditarPerfilProps {
  usuario: any;
  onClose: () => void;
  onSave: (dados: any) => Promise<void>;
}

export function ModalEditarPerfil({ usuario, onClose, onSave }: ModalEditarPerfilProps) {
  const [nome, setNome] = useState(usuario?.nome || '');
  const [email, setEmail] = useState(usuario?.email || '');
  const [apartamento, setApartamento] = useState(usuario?.apartamento || '');
  const [salvando, setSalvando] = useState(false);

  const handleSalvar = async () => {
    setSalvando(true);
    try {
      await onSave({ nome, email, apartamento });
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
          <h3 className="text-lg font-medium mb-4">Editar Perfil</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1">Nome</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1">Apartamento</label>
              <input
                type="text"
                value={apartamento}
                onChange={(e) => setApartamento(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-2">
            <Button variant="ghost" onClick={onClose} disabled={salvando}>
              Cancelar
            </Button>
            <Button onClick={handleSalvar} disabled={salvando}>
              {salvando ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
