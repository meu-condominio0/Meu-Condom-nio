import React from 'react';
import { PricingCard } from './PricingCard';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

interface PrecosPageProps {
  onOpenLeadForm?: () => void;
}

export function PrecosPage({ onOpenLeadForm }: PrecosPageProps) {
  const essencialFeatures = [
    'App de gestão e comunicação completo',
    'Livro de ocorrências digital',
    'Sistema de mensagens entre moradores',
    'Reservas de espaços comuns',
    'Controle de entregas e encomendas',
    'Enquetes e votações',
    'Repositório de documentos',
    'Tarefas do síndico organizadas',
    'Registro completo de moradores',
    'Notificações em tempo real',
  ];

  const financeiroFeatures = [
    'Tudo do plano Essencial',
    'Pagamentos em tempo real (Pix, boleto, cartão)',
    'Extrato bancário disponível 24h',
    'Prestação de contas automatizada',
    'Relatório de inadimplência detalhado',
    'Gráficos de gastos x arrecadações',
    'Previsão orçamentária inteligente',
    'Conta bancária exclusiva do condomínio',
    'Gestão fiscal e declarações',
    'Folha de pagamento de funcionários',
  ];

  const faqItems = [
    {
      question: 'Como funciona a migração de outro sistema?',
      answer: 'Nossa equipe especializada cuida de todo o processo de migração. Importamos seus dados históricos, configuramos o sistema conforme suas necessidades e treinamos sua equipe. O processo leva de 5 a 10 dias úteis e não há custo adicional.',
    },
    {
      question: 'Quanto tempo leva a implantação?',
      answer: 'A implantação completa leva em média 7 dias úteis. Isso inclui configuração inicial, migração de dados, treinamento da equipe e suporte durante os primeiros dias de uso. Você conta com um consultor dedicado durante todo o processo.',
    },
    {
      question: 'Quais bancos são suportados?',
      answer: 'Trabalhamos com os principais bancos do mercado: Banco do Brasil, Bradesco, Itaú, Santander, Caixa Econômica Federal, Sicoob, Sicredi e bancos digitais como Nubank, Inter e C6 Bank. Também integramos com gateways de pagamento para Pix e cartão.',
    },
    {
      question: 'Como funciona o suporte?',
      answer: 'Oferecemos suporte multicanal via WhatsApp, e-mail e chat dentro do app. Nosso time atende de segunda a sexta, das 8h às 18h. Para urgências, temos plantão 24/7. Todos os planos incluem suporte ilimitado sem custo adicional.',
    },
    {
      question: 'Os dados estão protegidos (LGPD)?',
      answer: 'Sim, somos 100% adequados à LGPD. Utilizamos criptografia de ponta a ponta, servidores seguros no Brasil, backup automático diário e controle rigoroso de acesso. Você tem total controle sobre os dados e pode exportá-los ou excluí-los a qualquer momento.',
    },
  ];

  return (
    <div className="w-full bg-white py-12">
      <div className="container-custom">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="mb-4">Escolha o plano ideal para seu condomínio ou administradora</h1>
          <p className="text-xl text-[var(--ink-body)] max-w-3xl mx-auto">
            Soluções flexíveis que crescem com você. Todos os planos incluem suporte ilimitado e atualizações gratuitas.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          <PricingCard
            title="Essencial"
            features={essencialFeatures}
            onSelectPlan={onOpenLeadForm}
          />
          <PricingCard
            title="Financeiro"
            features={financeiroFeatures}
            highlighted
            onSelectPlan={onOpenLeadForm}
          />
        </div>

        {/* Additional Info */}
        <div className="bg-[var(--bg-soft)] rounded-2xl p-8 md:p-12 text-center mb-16">
          <h3 className="mb-4">Administra vários condomínios?</h3>
          <p className="text-lg text-[var(--ink-body)] mb-6 max-w-2xl mx-auto">
            Temos planos especiais para administradoras com descontos progressivos. 
            Fale com nosso time comercial para uma proposta personalizada.
          </p>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="mb-4">Perguntas frequentes</h2>
            <p className="text-[var(--ink-body)]">
              Tire suas dúvidas sobre planos, migração e suporte
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white border border-[var(--border-soft)] rounded-2xl px-6 data-[state=open]:shadow-[var(--shadow-md)] transition-all"
              >
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <h4 className="pr-4">{item.question}</h4>
                </AccordionTrigger>
                <AccordionContent className="text-[var(--ink-body)] pb-6">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA Final */}
        <div className="text-center mt-16 pt-16 border-t border-[var(--border-soft)]">
          <h3 className="mb-4">Ainda tem dúvidas?</h3>
          <p className="text-lg text-[var(--ink-body)] mb-6">
            Fale com nosso time e receba uma proposta personalizada
          </p>
        </div>
      </div>
    </div>
  );
}
