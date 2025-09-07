import { ProvedorContextoApp } from './contexts/AppContext';
import { AplicativoCondominio } from './components/AplicativoCondominio';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <ProvedorContextoApp>
      <div className="size-full">
        <AplicativoCondominio />
        <Toaster />
      </div>
    </ProvedorContextoApp>
  );
}