import { useEffect } from 'react';
import type { MarketingPageProps } from './MarketingLayout';
import { Navbar } from './home/Navbar';
import { HeroSection } from './home/HeroSection';
import { MarketplaceResidents } from './home/MarketplaceResidents';
import { DifferentialsSection } from './home/DifferentialsSection';
import { OperationsGrid } from './home/OperationsGrid';
import { EfficiencyChecklist } from './home/EfficiencyChecklist';
import { MetricsBrands } from './home/MetricsBrands';
import { MarketplaceApps } from './home/MarketplaceApps';
import { Testimonials } from './home/Testimonials';
import { NewsSection } from './home/NewsSection';
import { CtaBanner } from './home/CtaBanner';
import { SolutionsSection } from './home/SolutionsSection';
import { PlansSection } from './home/PlansSection';
import { MultiCondoNotice } from './home/MultiCondoNotice';
import { FaqSection } from './home/FaqSection';
import { FooterSection } from './home/FooterSection';
import { ChatButton } from './home/ChatButton';

export function MarketingHomePage({ onNavigate, onLogin }: MarketingPageProps) {
  useEffect(() => {
    document.title = 'MeuCondomínio — Administre seu condomínio sem fricção';
  }, []);

  return (
    <div
      className="relative min-h-screen bg-gradient-to-b from-white via-slate-50 to-white text-slate-900"
      style={{
        backgroundImage:
          'radial-gradient(120% 120% at 20% -20%, rgba(16, 185, 129, 0.12), transparent 60%), radial-gradient(110% 90% at 120% 0%, rgba(13, 148, 136, 0.12), transparent 65%)',
      }}
    >
      <Navbar currentPath="/" onNavigate={onNavigate} onLogin={onLogin} />
      <main>
        <HeroSection onNavigate={onNavigate} onLogin={onLogin} />
        <MarketplaceResidents onNavigate={onNavigate} onLogin={onLogin} />
        <DifferentialsSection />
        <OperationsGrid />
        <EfficiencyChecklist />
        <MetricsBrands />
        <MarketplaceApps />
        <Testimonials />
        <NewsSection />
        <CtaBanner />
        <SolutionsSection onNavigate={onNavigate} onLogin={onLogin} />
        <PlansSection onNavigate={onNavigate} onLogin={onLogin} />
        <MultiCondoNotice />
        <FaqSection />
      </main>
      <FooterSection />
      <ChatButton />
    </div>
  );
}
