import React from 'react';
import { Button } from './ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { BookOpen, MessageCircle, Activity, ArrowRight } from 'lucide-react';

interface SuportePageProps {
  onOpenSupportForm?: () => void;
}

export function SuportePage({ onOpenSupportForm }: SuportePageProps) {
  const supportCards = [
    {
      icon: BookOpen,
      title: 'Central de Ajuda',
      description: 'Tutoriais, guias e documentação completa para usar todas as funcionalidades',
      action: 'Acessar central',
      href: '#',
    },
    {
      icon: MessageCircle,
      title: 'Abrir Chamado',
      description: 'Precisa de ajuda? Nossa equipe está pronta para atender você',
      action: 'Abrir chamado',
      isButton: true,
    },
    {
      icon: Activity,
      title: 'Status do Sistema',
      description: 'Verifique o status operacional de todos os nossos serviços',
      action: 'Ver status',
      href: '#',
      badge: 'Todos os sistemas operacionais',
      badgeColor: 'bg-green-100 text-green-700',
    },
  ];

  const faqItems = [
    {
      question: 'Como faço para cadastrar novos moradores?',
      answer: 'Acesse o menu Moradores > Adicionar Morador. Preencha os dados básicos (nome, e-mail, telefone) e selecione a Torre e Unidade. O morador receberá automaticamente um convite por e-mail para acessar o app. Você também pode importar uma planilha com vários moradores de uma vez através do menu Importar > Moradores.',
    },
    {
      question: 'Como emitir boletos para taxa condominial?',
      answer: 'Vá em Financeiro > Gerar Boletos. Selecione o mês de referência e o sistema calculará automaticamente os valores baseados nas configurações de cada unidade. Você pode revisar antes de enviar e os boletos serão enviados por e-mail e estarão disponíveis no app dos moradores. Lembrando que esta funcionalidade requer o plano Financeiro.',
    },
    {
      question: 'Posso personalizar as regras de reserva de áreas comuns?',
      answer: 'Sim! Em Configurações > Espaços Comuns você pode definir horários de funcionamento, valores de taxa, limite de reservas por morador, antecedência mínima/máxima, e até bloquear datas específicas. Cada espaço pode ter regras diferentes adaptadas às necessidades do seu condomínio.',
    },
    {
      question: 'Como funciona o controle de acesso na portaria?',
      answer: 'O morador pode pré-autorizar visitantes pelo app gerando um QR code com validade determinada. Na portaria, o porteiro escaneia o código e libera automaticamente. Para visitantes não autorizados, o porteiro registra no sistema e o morador recebe notificação para aprovar. Todo o histórico fica registrado para auditoria.',
    },
    {
      question: 'Como acompanho a inadimplência do condomínio?',
      answer: 'No dashboard Financeiro você tem um painel completo com inadimplência por unidade, histórico mensal, lista de devedores e ações de cobrança. O sistema envia lembretes automáticos antes e depois do vencimento. Você também pode gerar relatórios detalhados para apresentar em assembleias.',
    },
    {
      question: 'Posso exportar dados para minha contabilidade?',
      answer: 'Sim! O sistema permite exportar relatórios em diversos formatos (PDF, Excel, CSV). Para integrações automáticas com sistemas contábeis, você pode instalar apps do Marketplace como ContaExata e TaxHelper que sincronizam dados automaticamente, eliminando trabalho manual.',
    },
  ];

  return (
    <div className="w-full bg-white py-12">
      <div className="container-custom">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="mb-4">Estamos aqui para ajudar</h1>
          <p className="text-xl text-[var(--ink-body)] max-w-3xl mx-auto">
            Acesse nossa central de conhecimento, abra um chamado ou confira o status dos nossos sistemas
          </p>
        </div>

        {/* Support Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-24">
          {supportCards.map((card, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 p-8 rounded-2xl bg-white border border-[var(--border-soft)] hover:shadow-[var(--shadow-md)] transition-all duration-200"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-accent)] flex items-center justify-center">
                <card.icon className="w-7 h-7 text-white" strokeWidth={2} />
              </div>
              <div className="flex-1">
                <h4 className="mb-2">{card.title}</h4>
                <p className="text-sm text-[var(--ink-body)] mb-3">{card.description}</p>
                {card.badge && (
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${card.badgeColor}`}>
                    {card.badge}
                  </div>
                )}
              </div>
              {card.isButton ? (
                <Button
                  onClick={onOpenSupportForm}
                  className="bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-600)] text-white w-full"
                >
                  {card.action}
                </Button>
              ) : (
                <a
                  href={card.href}
                  className="text-[var(--brand-primary)] font-bold hover:text-[var(--brand-primary-600)] flex items-center gap-2"
                >
                  {card.action}
                  <ArrowRight className="w-4 h-4" />
                </a>
              )}
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="mb-4">Perguntas frequentes</h2>
            <p className="text-[var(--ink-body)]">
              Respostas rápidas para as dúvidas mais comuns
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

        {/* Contact CTA */}
        <div className="text-center mt-16 pt-16 border-t border-[var(--border-soft)]">
          <h3 className="mb-4">Não encontrou o que procura?</h3>
          <p className="text-lg text-[var(--ink-body)] mb-6">
            Nossa equipe de suporte está pronta para ajudar
          </p>
          <Button
            onClick={onOpenSupportForm}
            size="lg"
            className="bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-600)] text-white"
          >
            Falar com suporte
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
