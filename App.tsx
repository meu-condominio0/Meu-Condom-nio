import { ProvedorContextoApp } from './contexts/AppContext';
import { ProvedorPlanoContas } from './contexts/PlanoContasContext';
import { AplicativoCondominio } from './components/AplicativoCondominio';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <ProvedorContextoApp>
      <ProvedorPlanoContas>
        <div className="size-full">
          <AplicativoCondominio />
          <Toaster />
        </div>
      </ProvedorPlanoContas>
    </ProvedorContextoApp>
  );
}