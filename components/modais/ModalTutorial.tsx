import { useState } from 'react';
import { Button } from '../ui/button';
import { 
  ChevronLeft, 
  ChevronRight, 
  X,
  Home,
  BookOpen,
  Users,
  AlertCircle,
  Calendar,
  MessageSquare,
  FileText,
  TrendingUp,
  Settings
} from 'lucide-react';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';

interface ModalTutorialProps {
  onClose: () => void;
}

interface TutorialStep {
  id: number;
  titulo: string;
  descricao: string;
  icone: React.ComponentType<any>;
  conteudo: string[];
  dicas?: string[];
}

const steps: TutorialStep[] = [
  {
    id: 1,
    titulo: 'Bem-vindo ao Meu Condomínio',
    descricao: 'Sistema completo de gestão condominial',
    icone: Home,
    conteudo: [
      'O Meu Condomínio é uma plataforma integrada para gerenciar todas as atividades do seu condomínio',
      'Oferecemos ferramentas para comunicação, reservas, financeiro e muito mais',
      'Esta é a sua primeira vez? Siga este tutorial para conhecer todas as funcionalidades!'
    ],
    dicas: [
      'Este tutorial pode ser acessado novamente nas Configurações',
      'Use a navegação na parte inferior da tela para acessar as principais seções'
    ]
  },
  {
    id: 2,
    titulo: 'Cadastro e Login',
    descricao: 'Como acessar sua conta',
    icone: BookOpen,
    conteudo: [
      '1. Acesse o aplicativo e clique em "Fazer Login"',
      '2. Insira seu email e senha cadastrados',
      '3. Se ainda não tem cadastro, clique em "Criar Conta" e preencha seus dados',
      '4. Use "Esqueci a Senha" se precisar recuperar acesso à sua conta'
    ],
    dicas: [
      'Mantenha sua senha segura e não compartilhe com ninguém',
      'Você pode fazer login em múltiplos dispositivos simultaneamente'
    ]
  },
  {
    id: 3,
    titulo: 'Painel Principal (Home)',
    descricao: 'Sua tela inicial',
    icone: Home,
    conteudo: [
      'O Painel Principal exibe um resumo das informações mais importantes',
      'Você verá: Saldo financeiro, avisos pendentes, próximas reservas e comunicados',
      'Use os Atalhos Rápidos para acessar funcionalidades mais usadas',
      'O botão de notificações mostra atualizações recentes'
    ],
    dicas: [
      'Defina suas notificações em Configurações para não perder avisos importantes',
      'Deslize para o lado nos cartões para ver mais informações'
    ]
  },
  {
    id: 4,
    titulo: 'Navegação entre Seções',
    descricao: 'Explorando as funcionalidades',
    icone: Users,
    conteudo: [
      'Use a barra de navegação inferior (mobile) ou menu lateral (desktop) para navegar',
      'Principais seções:',
      '  • Reservas: Agende uso de áreas comuns',
      '  • Avisos: Leia comunicados do condomínio',
      '  • Financeiro: Acompanhe boletos e pagamentos',
      '  • Moradores: Veja informações dos vizinhos',
      '  • Marketplace: Compre e venda entre vizinhos (moradores)'
    ],
    dicas: [
      'Cada seção tem funcionalidades específicas para você',
      'Síndicos têm acesso a seções administrativas adicionais'
    ]
  },
  {
    id: 5,
    titulo: 'Reservas e Agendamentos',
    descricao: 'Como agendar áreas comuns',
    icone: Calendar,
    conteudo: [
      '1. Acesse a seção Reservas',
      '2. Selecione a área comum desejada (salão, piscina, churrasqueira, etc)',
      '3. Escolha a data e horário disponível',
      '4. Confirme a reserva e receba confirmação por email',
      'Você pode visualizar, modificar ou cancelar suas reservas'
    ],
    dicas: [
      'Reserve com antecedência para garantir o horário desejado',
      'Cancele com tempo se não conseguir usar a reserva'
    ]
  },
  {
    id: 6,
    titulo: 'Comunicados e Avisos',
    descricao: 'Receba informações importantes',
    icone: AlertCircle,
    conteudo: [
      'Veja todos os comunicados e avisos do condomínio nesta seção',
      'Filtros disponíveis:',
      '  • Por categoria (Manutenção, Financeiro, Eventos, etc)',
      '  • Por data',
      '  • Lidos/Não lidos',
      'Clique em um aviso para ler o conteúdo completo'
    ],
    dicas: [
      'Avisos importantes em vermelho requerem atenção imediata',
      'Você pode desmarcar avisos como lidos para se manter organizado'
    ]
  },
  {
    id: 7,
    titulo: 'Módulo Financeiro',
    descricao: 'Gerencie suas contas',
    icone: TrendingUp,
    conteudo: [
      'Acompanhe:',
      '  • Boletos pendentes e vencidos',
      '  • Histórico de pagamentos',
      '  • Saldo atual',
      '  • Acordo de débitos',
      'Você pode visualizar e baixar comprovantes de pagamento',
      'Use o chat para esclarecer dúvidas sobre cobranças'
    ],
    dicas: [
      'Defina lembretes para não perder datas de vencimento',
      'Consulte o síndico sobre parcelamentos e acordos'
    ]
  },
  {
    id: 8,
    titulo: 'Moradores e Comunicação',
    descricao: 'Se conecte com vizinhos',
    icone: MessageSquare,
    conteudo: [
      'Seção Moradores:',
      '  • Veja informações dos residentes',
      '  • Acesse telefones e emails',
      '  • Participe de discussões',
      'Chat com Portaria:',
      '  • Envie mensagens diretas à portaria',
      '  • Reporte problemas',
      '  • Receba respostas em tempo real'
    ],
    dicas: [
      'Respeite a privacidade dos outros moradores',
      'Use o chat para emergências urgentes'
    ]
  },
  {
    id: 9,
    titulo: 'Documentos e Anexos',
    descricao: 'Acesse arquivos do condomínio',
    icone: FileText,
    conteudo: [
      'Encontre documentos importantes:',
      '  • Regulamento condominial',
      '  • Atas de assembleias',
      '  • Contratos de serviços',
      '  • Relatórios financeiros',
      'Você pode baixar e compartilhar documentos',
      'Síndicos podem adicionar novos documentos'
    ],
    dicas: [
      'Consulte documentos antes de tirar dúvidas',
      'Mantenha backups de documentos importantes'
    ]
  },
  {
    id: 10,
    titulo: 'Configurações e Privacidade',
    descricao: 'Personalize sua experiência',
    icone: Settings,
    conteudo: [
      'Em Configurações você pode:',
      '  • Editar seu perfil',
      '  • Alterar sua senha',
      '  • Gerenciar notificações (Push, Email, SMS)',
      '  • Controlar preferências de privacidade',
      '  • Ver documentos da conta',
      'Síndicos acessam ferramentas administrativas adicionais'
    ],
    dicas: [
      'Atualize suas informações de contato regularmente',
      'Habilite notificações para não perder avisos importantes',
      'Altere sua senha periodicamente para maior segurança'
    ]
  }
];

export function ModalTutorial({ onClose }: ModalTutorialProps) {
  const [etapaAtual, setEtapaAtual] = useState(0);
  const step = steps[etapaAtual];
  const IconeStep = step.icone;
  const totalSteps = steps.length;

  const avancar = () => {
    if (etapaAtual < totalSteps - 1) {
      setEtapaAtual(etapaAtual + 1);
    }
  };

  const voltarStep = () => {
    if (etapaAtual > 0) {
      setEtapaAtual(etapaAtual - 1);
    }
  };

  const irParaEtapa = (index: number) => {
    setEtapaAtual(index);
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto">
        <div className="relative bg-background rounded-lg shadow-2xl w-full max-w-2xl my-8">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-3 flex-1">
              <div className="p-2 rounded-lg bg-primary/10">
                <IconeStep className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">{step.titulo}</h2>
                <p className="text-sm text-muted-foreground">{step.descricao}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Fechar"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Conteúdo */}
          <div className="p-6 max-h-96 overflow-y-auto">
            <div className="space-y-4">
              {/* Principais conteúdos */}
              <div className="space-y-3">
                {step.conteudo.map((linha, idx) => (
                  <p
                    key={idx}
                    className="text-sm text-foreground leading-relaxed whitespace-pre-wrap"
                  >
                    {linha}
                  </p>
                ))}
              </div>

              {/* Dicas */}
              {step.dicas && step.dicas.length > 0 && (
                <>
                  <Separator className="my-4" />
                  <div className="bg-secondary/50 rounded-lg p-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      <AlertCircle className="h-4 w-4 text-primary" />
                      Dicas
                    </div>
                    <ul className="space-y-2">
                      {step.dicas.map((dica, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          {dica}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Indicador de progresso */}
          <div className="px-6 py-4 border-t">
            <div className="flex gap-2 justify-center flex-wrap">
              {steps.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => irParaEtapa(idx)}
                  className={`h-2 transition-all ${
                    idx === etapaAtual
                      ? 'bg-primary w-8'
                      : 'bg-muted-foreground/30 w-2 hover:bg-muted-foreground/50'
                  }`}
                  aria-label={`Ir para etapa ${idx + 1}`}
                />
              ))}
            </div>
            <p className="text-center text-xs text-muted-foreground mt-2">
              Etapa {etapaAtual + 1} de {totalSteps}
            </p>
          </div>

          {/* Footer com botões */}
          <div className="flex items-center justify-between gap-2 p-6 border-t bg-muted/30">
            <Button
              variant="outline"
              size="sm"
              onClick={voltarStep}
              disabled={etapaAtual === 0}
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Anterior
            </Button>

            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={onClose}>
                Pular
              </Button>
              {etapaAtual === totalSteps - 1 && (
                <Button size="sm" onClick={onClose} className="gap-2">
                  Concluído
                </Button>
              )}
              {etapaAtual < totalSteps - 1 && (
                <Button onClick={avancar} size="sm" className="gap-2">
                  Próximo
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
