import { useEffect, useRef, useState } from 'react';
import type { ComponentType } from 'react';
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
import { PaginaPlanoContas } from './paginas/PaginaPlanoContas';
import { PaginaConsumo } from './paginas/PaginaConsumo';
import { PaginaImportarLancamentos } from './paginas/PaginaImportarLancamentos';
import { PaginaInadimplencia } from './paginas/PaginaInadimplencia';
import { PaginaAcordos } from './paginas/PaginaAcordos';
import { PaginaExtratoFinanceiro } from './paginas/PaginaExtratoFinanceiro';
import { PaginaColaboradores } from './paginas/PaginaColaboradores';
import type { MarketingPageProps, MarketingPath } from './marketing/MarketingLayout';
import { MarketingHomePage } from './marketing/HomePage';
import { MarketingSolucoesPage } from './marketing/SolucoesPage';
import { MarketingPrecosPage } from './marketing/PrecosPage';
import { MarketingSobrePage } from './marketing/SobrePage';
import { MarketingSuportePage } from './marketing/SuportePage';
import { MarketingBlogPage } from './marketing/BlogPage';
import { MarketingComecePage } from './marketing/ComecePage';
import { MarketingDemoPage } from './marketing/DemoPage';
import { MarketingMarketplacePage } from './marketing/MarketplacePage';

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

const MARKETING_PATHS: readonly MarketingPath[] = [
  '/',
  '/solucoes',
  '/precos',
  '/sobre',
  '/suporte',
  '/blog',
  '/comece',
  '/demo',
  '/marketplace',
] as const;

type PublicPath = MarketingPath | '/entrar';

const MARKETING_ROUTES: Record<MarketingPath, ComponentType<MarketingPageProps>> = {
  '/': MarketingHomePage,
  '/solucoes': MarketingSolucoesPage,
  '/precos': MarketingPrecosPage,
  '/sobre': MarketingSobrePage,
  '/suporte': MarketingSuportePage,
  '/blog': MarketingBlogPage,
  '/comece': MarketingComecePage,
  '/demo': MarketingDemoPage,
  '/marketplace': MarketingMarketplacePage,
};

function normalizarCaminhoPublico(pathname: string): PublicPath {
  const caminhoSemBarraFinal = pathname.replace(/\/$/, '') || '/';

  if (caminhoSemBarraFinal === '/entrar') {
    return '/entrar';
  }

  if ((MARKETING_PATHS as readonly string[]).includes(caminhoSemBarraFinal)) {
    return caminhoSemBarraFinal as MarketingPath;
  }

  return '/';
}

export function AplicativoCondominio() {
  const { usuarioLogado, estaCarregando } = usarContextoApp();
  const [paginaAtiva, setPaginaAtiva] = useState('inicio');
  const [publicPath, setPublicPath] = useState<PublicPath>(() => {
    if (typeof window === 'undefined') {
      return '/';
    }

    return normalizarCaminhoPublico(window.location.pathname);
  });
  const usuarioAnterior = useRef(usuarioLogado);

  useEffect(() => {
    if (!usuarioLogado && usuarioAnterior.current) {
      setPublicPath('/');

      if (typeof window !== 'undefined') {
        window.history.replaceState({}, '', '/');
      }
    }

    usuarioAnterior.current = usuarioLogado;
  }, [usuarioLogado]);

  useEffect(() => {
    if (typeof window === 'undefined' || usuarioLogado) {
      return;
    }

    const handlePopState = () => {
      setPublicPath(normalizarCaminhoPublico(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [usuarioLogado]);

  const navegarPublico = (path: MarketingPath) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
    }

    setPublicPath(path);
  };

  const abrirLoginPublico = () => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', '/entrar');
    }

    setPublicPath('/entrar');
  };

  useEffect(() => {
    if (typeof window === 'undefined' || usuarioLogado) {
      return;
    }

    const caminhoAtual = normalizarCaminhoPublico(window.location.pathname);

    if (caminhoAtual !== publicPath) {
      window.history.replaceState({}, '', publicPath);
    }
  }, [publicPath, usuarioLogado]);

  if (estaCarregando) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!usuarioLogado) {
    if (publicPath === '/entrar') {
      return <TelaLogin onVoltarInicio={() => navegarPublico('/')} />;
    }

    const MarketingComponent = MARKETING_ROUTES[publicPath] ?? MARKETING_ROUTES['/'];

    return (
      <MarketingComponent
        onNavigate={navegarPublico}
        onLogin={abrirLoginPublico}
      />
    );
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
      case 'consumo':
        return <PaginaConsumo />;
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
      case 'planoContas':
        return <PaginaPlanoContas />;
      case 'importarLancamentos':
        return <PaginaImportarLancamentos />;
      case 'inadimplencia':
        return <PaginaInadimplencia />;
      case 'acordos':
        return <PaginaAcordos />;
      case 'extrato':
        return <PaginaExtratoFinanceiro />;
      case 'usuarios':
        return <PaginaUsuarios />;
      case 'visitantes':
        return <PaginaVisitantes />;
      case 'colaboradores':
        return <PaginaColaboradores />;
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
