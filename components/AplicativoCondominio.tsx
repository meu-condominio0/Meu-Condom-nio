import { useState } from 'react';
import { usarContextoApp } from '../contexts/AppContext';
import { TelaLogin } from './TelaLogin';
import { LayoutPrincipal } from './LayoutPrincipal';
import { PaginaInicio } from './paginas/PaginaInicio';
import { PaginaComunicados } from './paginas/PaginaComunicados';
import { PaginaReservas } from './paginas/PaginaReservas';
import { PaginaBoletos } from './paginas/PaginaBoletos';
import { PaginaOcorrencias } from './paginas/PaginaOcorrencias';
import { PaginaChat } from './paginas/PaginaChat';
import { PaginaMarketplace } from './paginas/PaginaMarketplace';
import { PaginaPaineis } from './paginas/PaginaPaineis';
import { PaginaAnexos } from './paginas/PaginaAnexos';
import { PaginaRelatorios } from './paginas/PaginaRelatorios';
import { PaginaAvaliacao } from './paginas/PaginaAvaliacao';
import { PaginaUsuarios } from './paginas/PaginaUsuarios';
import { PaginaConfiguracoes } from './paginas/PaginaConfiguracoes';
import { PaginaVisitantes } from './paginas/PaginaVisitantes';
import { PaginaPets } from './paginas/PaginaPets';
import { PaginaVeiculos } from './paginas/PaginaVeiculos';

// Páginas placeholder para outras funcionalidades
function PaginaPlaceholder({ titulo }: { titulo: string }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">{titulo}</h2>
        <p className="text-muted-foreground">
          Esta página está em desenvolvimento. Em breve teremos todas as funcionalidades disponíveis.
        </p>
      </div>
      
      <div className="bg-muted/50 rounded-lg p-8 text-center">
        <p className="text-muted-foreground">
          🚧 Funcionalidade em construção 🚧
        </p>
      </div>
    </div>
  );
}

export function AplicativoCondominio() {
  const { usuarioLogado, estaCarregando } = usarContextoApp();
  const [paginaAtiva, setPaginaAtiva] = useState('inicio');

  if (estaCarregando) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!usuarioLogado) {
    return <TelaLogin />;
  }

  const renderizarPagina = () => {
    switch (paginaAtiva) {
      case 'inicio':
        return <PaginaInicio onMudarPagina={setPaginaAtiva} />;
      case 'comunicados':
        return <PaginaComunicados />;
      case 'reservas':
        return <PaginaReservas />;
      case 'boletos':
        return <PaginaBoletos />;
      case 'ocorrencias':
        return <PaginaOcorrencias />;
      case 'chat':
        return <PaginaChat />;
      case 'marketplace':
        return <PaginaMarketplace />;
      case 'paineis':
        return <PaginaPaineis />;
      case 'anexos':
        return <PaginaAnexos />;
      case 'relatorios':
        return <PaginaRelatorios />;
      case 'avaliacao':
        return <PaginaAvaliacao />;
      case 'usuarios':
        return <PaginaUsuarios />;
      case 'visitantes':
        return <PaginaVisitantes />;
      case 'pets':
        return <PaginaPets />;
      case 'veiculos':
        return <PaginaVeiculos />;
      case 'configuracoes':
        return <PaginaConfiguracoes onMudarPagina={setPaginaAtiva} />;
      default:
        return <PaginaInicio onMudarPagina={setPaginaAtiva} />;
    }
  };

  return (
    <LayoutPrincipal 
      paginaAtiva={paginaAtiva} 
      onMudarPagina={setPaginaAtiva}
    >
      {renderizarPagina()}
    </LayoutPrincipal>
  );
}