import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { HomePage } from './components/HomePage';
import { SolucoesPage } from './components/SolucoesPage';
import { PrecosPage } from './components/PrecosPage';
import { SobrePage } from './components/SobrePage';
import { SuportePage } from './components/SuportePage';
import { BlogPage } from './components/BlogPage';
import { BlogPostPage } from './components/BlogPostPage';
import { MarketplaceMoradoresPage } from './components/MarketplaceMoradoresPage';
import { MarketplaceCreatePage } from './components/MarketplaceCreatePage';
import { MarketplaceListingPage } from './components/MarketplaceListingPage';
import { LeadForm } from './components/LeadForm';
import { SupportForm } from './components/SupportForm';
import { AppModal } from './components/AppModal';
import { Toaster } from './components/ui/sonner';

type Page =
  | 'home'
  | 'solucoes'
  | 'precos'
  | 'sobre'
  | 'suporte'
  | 'blog'
  | 'blogPost'
  | 'marketplace-moradores'
  | 'marketplace-create'
  | 'marketplace-listing';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [leadFormOpen, setLeadFormOpen] = useState(false);
  const [supportFormOpen, setSupportFormOpen] = useState(false);
  const [appModalOpen, setAppModalOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [selectedPostId, setSelectedPostId] = useState<number>(1);
  const [selectedListingId, setSelectedListingId] = useState<number>(1);
  const [solucoesTab, setSolucoesTab] = useState<string>('financeiro');

  const handleNavigate = (page: string, options?: { tab?: string }) => {
    setCurrentPage(page as Page);
    if (options?.tab) {
      setSolucoesTab(options.tab);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAppModal = (app: any) => {
    setSelectedApp(app);
    setAppModalOpen(true);
  };

  const handleOpenPost = (postId: number) => {
    setSelectedPostId(postId);
    setCurrentPage('blogPost');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToBlog = () => {
    setCurrentPage('blog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateMarketplaceMoradores = () => {
    setCurrentPage('marketplace-moradores');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateMarketplaceCreate = () => {
    setCurrentPage('marketplace-create');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateMarketplaceListing = (id: number) => {
    setSelectedListingId(id);
    setCurrentPage('marketplace-listing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToMarketplace = () => {
    setCurrentPage('marketplace-moradores');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header
        onNavigate={handleNavigate}
        onOpenLeadForm={() => setLeadFormOpen(true)}
      />

      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigateMarketplace={() => handleNavigate('solucoes', { tab: 'marketplace' })}
            onNavigateMarketplaceMoradores={handleNavigateMarketplaceMoradores}
            onOpenLeadForm={() => setLeadFormOpen(true)}
            onOpenAppModal={handleOpenAppModal}
          />
        )}
        
        {currentPage === 'solucoes' && (
          <SolucoesPage
            onOpenLeadForm={() => setLeadFormOpen(true)}
            onOpenAppModal={handleOpenAppModal}
            onNavigateMarketplaceMoradores={handleNavigateMarketplaceMoradores}
            initialTab={solucoesTab}
          />
        )}

        {currentPage === 'precos' && (
          <PrecosPage onOpenLeadForm={() => setLeadFormOpen(true)} />
        )}

        {currentPage === 'sobre' && (
          <SobrePage
            onOpenLeadForm={() => setLeadFormOpen(true)}
            onNavigateMarketplaceMoradores={handleNavigateMarketplaceMoradores}
          />
        )}

        {currentPage === 'suporte' && (
          <SuportePage onOpenSupportForm={() => setSupportFormOpen(true)} />
        )}

        {currentPage === 'blog' && (
          <BlogPage onOpenPost={handleOpenPost} />
        )}

        {currentPage === 'blogPost' && (
          <BlogPostPage postId={selectedPostId} onBack={handleBackToBlog} />
        )}

        {currentPage === 'marketplace-moradores' && (
          <MarketplaceMoradoresPage
            onNavigateCreate={handleNavigateMarketplaceCreate}
            onNavigateListing={handleNavigateMarketplaceListing}
          />
        )}

        {currentPage === 'marketplace-create' && (
          <MarketplaceCreatePage
            onBack={handleBackToMarketplace}
            onSuccess={handleBackToMarketplace}
          />
        )}

        {currentPage === 'marketplace-listing' && (
          <MarketplaceListingPage listingId={selectedListingId} onBack={handleBackToMarketplace} />
        )}
      </main>

      <Footer onNavigate={handleNavigate} />
      
      <FloatingWhatsApp />

      <LeadForm
        open={leadFormOpen}
        onClose={() => setLeadFormOpen(false)}
      />

      <SupportForm
        open={supportFormOpen}
        onClose={() => setSupportFormOpen(false)}
      />

      <AppModal
        open={appModalOpen}
        onClose={() => setAppModalOpen(false)}
        app={selectedApp}
      />

      <Toaster />
    </div>
  );
}
