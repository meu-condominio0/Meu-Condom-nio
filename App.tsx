import { ProvedorContextoApp } from './contexts/AppContext';
import { ProvedorPlanoContas } from './contexts/PlanoContasContext';
import { ProvedorLancamentos } from './contexts/LancamentosContext';
import { AplicativoCondominio } from './components/AplicativoCondominio';

export default function App() {
  return (
    <ProvedorContextoApp>
      <ProvedorPlanoContas>
        <ProvedorLancamentos>
          <div className="size-full">
            <AplicativoCondominio />
          </div>
        </ProvedorLancamentos>
      </ProvedorPlanoContas>
    </ProvedorContextoApp>
  );
}
