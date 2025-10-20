import { useEffect } from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import type { MarketingPageProps } from './MarketingLayout';
import { Navbar } from './landing/Navbar';
import { PillHighlight } from './landing/PillHighlight';
import { MarketplaceCard } from './landing/MarketplaceCard';
import { Button } from './landing/Button';
import type { Product } from './landing/types';

const products: Product[] = [
  {
    id: '1',
    title: 'iPhone 13 Pro 256GB',
    price: 'R$ 3.200',
    condition: 'Usado',
    tower: 'Torre A',
    rating: 4.9,
    imageUrl: '/img/inicio/marketplace-iphone.svg',
  },
  {
    id: '2',
    title: 'Sofá 3 lugares',
    price: 'R$ 1.500',
    condition: 'Usado',
    tower: 'Torre B',
    rating: 5.0,
    imageUrl: '/img/inicio/marketplace-sofa.svg',
  },
];

export function MarketingHomePage({ onNavigate, onLogin }: MarketingPageProps) {
  useEffect(() => {
    document.title = 'MeuCondomínio — Administre seu condomínio sem fricção';
  }, []);

  const handleNavigate = (path: Parameters<typeof onNavigate>[0]) => () => {
    onNavigate(path);
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden text-[#0B0F12]"
      style={{
        backgroundImage:
          'radial-gradient(120% 120% at 15% -10%, rgba(30, 107, 87, 0.12), transparent 55%), linear-gradient(180deg, #FFFFFF 0%, #F6FBF9 100%)',
      }}
    >
      <Navbar currentPath="/" onNavigate={onNavigate} onLogin={onLogin} />

      <main className="pt-28 pb-16 md:pt-32" role="main">
        <section className="mx-auto max-w-[1280px] px-4 md:px-8">
          <div className="grid min-h-[560px] grid-cols-1 items-center gap-12 py-14 md:py-24 lg:grid-cols-2">
            <div className="mx-auto w-full max-w-xl text-center lg:mx-0 lg:text-left">
              <h1 className="max-w-[14ch] text-4xl font-bold tracking-tight text-[#0B0F12] sm:text-5xl md:text-6xl">
                Administre seu condomínio
                <span className="block">sem fricção</span>
              </h1>
              <p className="mt-6 text-lg text-slate-600 md:text-xl">
                Boletos, reservas, chamados e portaria — em 3 cliques.
              </p>
              <div className="flex justify-center lg:justify-start">
                <PillHighlight
                  icon={<ShieldCheck className="size-5 text-emerald-600" strokeWidth={1.75} />}
                  className="mt-8 w-full max-w-xl text-left"
                >
                  + Marketplace de Moradores → venda de produtos e oferta de serviços entre vizinhos, com proteção e regras do
                  condomínio.
                </PillHighlight>
              </div>
              <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <Button
                  icon={<ArrowRight className="size-5" strokeWidth={1.75} />}
                  onClick={handleNavigate('/marketplace')}
                  className="w-full sm:w-auto"
                >
                  Explorar Marketplace
                </Button>
                <Button variant="secondary" onClick={handleNavigate('/sobre')} className="w-full sm:w-auto">
                  Como funciona
                </Button>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <MarketplaceCard products={products} />
            </div>
          </div>

          <div className="mt-12 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Button
              icon={<ArrowRight className="size-5" strokeWidth={1.75} />}
              onClick={handleNavigate('/marketplace')}
              className="w-full sm:w-auto"
            >
              Explorar Marketplace
            </Button>
            <Button variant="secondary" onClick={handleNavigate('/sobre')} className="w-full sm:w-auto">
              Como funciona
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
