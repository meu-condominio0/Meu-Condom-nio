import { ProvedorContextoApp } from './contexts/AppContext';
import { ProvedorPlanoContas } from './contexts/PlanoContasContext';
import { ProvedorLancamentos } from './contexts/LancamentosContext';
import { AplicativoCondominio } from './components/AplicativoCondominio';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <ProvedorContextoApp>
      <ProvedorPlanoContas>
        <ProvedorLancamentos>
          <div className="size-full">
            <AplicativoCondominio />
            <Toaster />
          </div>
        </ProvedorLancamentos>
      </ProvedorPlanoContas>
    </ProvedorContextoApp>
  );
}