import { usarContextoApp } from '../../contexts/AppContext';
import { 
  User, 
  Bell, 
  Shield, 
  Smartphone, 
  Mail, 
  Lock, 
  Eye, 
  Download, 
  HelpCircle,
  MessageSquare,
  ShoppingBag,
  Package,
  Settings,
  ChevronRight,
  UserCog,
  Database,
  FileText,
  TrendingUp
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';

interface PaginaConfiguracoesProps {
  onMudarPagina: (pagina: string) => void;
}

interface SecaoConfig {
  id: string;
  titulo: string;
  descricao: string;
  icone: React.ComponentType<{ className?: string }>;
  items: {
    id: string;
    titulo: string;
    descricao?: string;
    tipo: 'toggle' | 'acao' | 'navegacao';
    valor?: boolean;
    badge?: number;
    pagina?: string;
  }[];
}

export function PaginaConfiguracoes({ onMudarPagina }: PaginaConfiguracoesProps) {
  const { usuarioLogado } = usarContextoApp();
  const ehSindico = usuarioLogado?.tipo === 'sindico';

  const secoesConfig: SecaoConfig[] = [
    {
      id: 'conta',
      titulo: 'Minha Conta',
      descricao: 'Gerencie suas informações pessoais',
      icone: User,
      items: [
        {
          id: 'perfil',
          titulo: 'Dados do Perfil',
          descricao: 'Nome, email, telefone',
          tipo: 'acao'
        },
        {
          id: 'senha',
          titulo: 'Alterar Senha',
          descricao: 'Segurança da conta',
          tipo: 'acao'
        },
        {
          id: 'privacidade',
          titulo: 'Privacidade',
          descricao: 'Controle de dados pessoais',
          tipo: 'acao'
        }
      ]
    },
    {
      id: 'notificacoes',
      titulo: 'Notificações',
      descricao: 'Configure como receber avisos',
      icone: Bell,
      items: [
        {
          id: 'push',
          titulo: 'Notificações Push',
          descricao: 'Receber no dispositivo',
          tipo: 'toggle',
          valor: true
        },
        {
          id: 'email',
          titulo: 'Email',
          descricao: 'Comunicados por email',
          tipo: 'toggle',
          valor: true
        },
        {
          id: 'sms',
          titulo: 'SMS',
          descricao: 'Emergências por SMS',
          tipo: 'toggle',
          valor: false
        }
      ]
    }
  ];

  // Adicionar seções específicas para morador
  if (!ehSindico) {
    secoesConfig.push(
      {
        id: 'servicos',
        titulo: 'Serviços Extras',
        descricao: 'Funcionalidades adicionais',
        icone: Package,
        items: [
          {
            id: 'marketplace',
            titulo: 'Marketplace',
            descricao: 'Comprar e vender entre vizinhos',
            tipo: 'navegacao',
            pagina: 'marketplace'
          },
          {
            id: 'chat',
            titulo: 'Chat Portaria',
            descricao: 'Conversar com a portaria',
            tipo: 'navegacao',
            badge: 2,
            pagina: 'chat'
          },
          {
            id: 'entregas',
            titulo: 'Controle de Entregas',
            descricao: 'Acompanhar pacotes',
            tipo: 'toggle',
            valor: true
          }
        ]
      }
    );
  }

  // Adicionar seções específicas para síndico
  if (ehSindico) {
    secoesConfig.push(
      {
        id: 'gestao',
        titulo: 'Ferramentas de Gestão',
        descricao: 'Recursos administrativos',
        icone: UserCog,
        items: [
          {
            id: 'anexos',
            titulo: 'Documentos',
            descricao: 'Gerenciar anexos e arquivos',
            tipo: 'navegacao',
            pagina: 'anexos'
          },
          {
            id: 'relatorios',
            titulo: 'Relatórios',
            descricao: 'Análises e exportações',
            tipo: 'navegacao',
            pagina: 'relatorios'
          },
          {
            id: 'avaliacao',
            titulo: 'Avaliações',
            descricao: 'Índice de satisfação',
            tipo: 'navegacao',
            pagina: 'avaliacao'
          }
        ]
      },
      {
        id: 'sistema',
        titulo: 'Sistema',
        descricao: 'Configurações avançadas',
        icone: Database,
        items: [
          {
            id: 'backup',
            titulo: 'Backup de Dados',
            descricao: 'Exportar informações',
            tipo: 'acao'
          },
          {
            id: 'integracao',
            titulo: 'Integrações',
            descricao: 'APIs e webhooks',
            tipo: 'acao'
          }
        ]
      }
    );
  }

  // Seção de ajuda (comum para todos)
  secoesConfig.push({
    id: 'suporte',
    titulo: 'Ajuda & Suporte',
    descricao: 'Dúvidas e assistência',
    icone: HelpCircle,
    items: [
      {
        id: 'tutorial',
        titulo: 'Tutorial',
        descricao: 'Como usar o sistema',
        tipo: 'acao'
      },
      {
        id: 'contato',
        titulo: 'Falar com Suporte',
        descricao: 'Relatar problemas',
        tipo: 'acao'
      },
      {
        id: 'termos',
        titulo: 'Termos de Uso',
        descricao: 'Política de privacidade',
        tipo: 'acao'
      }
    ]
  });

  const handleItemClick = (item: any) => {
    if (item.tipo === 'navegacao' && item.pagina) {
      onMudarPagina(item.pagina);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1>Configurações</h1>
        <p className="text-muted-foreground">
          Gerencie suas preferências e configurações do sistema
        </p>
      </div>

      {/* Informações do usuário */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-full">
              <User className="h-8 w-8 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-foreground">{usuarioLogado?.nome}</h3>
              <p className="text-muted-foreground">{usuarioLogado?.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline">
                  {ehSindico ? 'Síndico' : `Apartamento ${usuarioLogado?.apartamento}`}
                </Badge>
                <Badge variant="secondary">
                  {ehSindico ? 'Administrador' : 'Morador'}
                </Badge>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Editar Perfil
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Seções de configuração */}
      <div className="space-y-6">
        {secoesConfig.map((secao) => {
          const IconeSecao = secao.icone;
          return (
            <Card key={secao.id}>
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <IconeSecao className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{secao.titulo}</CardTitle>
                    <p className="text-sm text-muted-foreground">{secao.descricao}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {secao.items.map((item, index) => (
                  <div key={item.id}>
                    <div 
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        item.tipo === 'navegacao' ? 'hover:bg-accent cursor-pointer' : ''
                      }`}
                      onClick={() => handleItemClick(item)}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-foreground">{item.titulo}</p>
                          {item.badge && (
                            <Badge className="h-5 min-w-5 px-1.5 bg-destructive text-destructive-foreground">
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                        {item.descricao && (
                          <p className="text-sm text-muted-foreground mt-1">{item.descricao}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {item.tipo === 'toggle' && (
                          <Switch checked={item.valor} />
                        )}
                        {item.tipo === 'navegacao' && (
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        )}
                        {item.tipo === 'acao' && (
                          <Button variant="ghost" size="sm">
                            Configurar
                          </Button>
                        )}
                      </div>
                    </div>
                    {index < secao.items.length - 1 && <Separator />}
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Informações do app */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">ResidenceApp</p>
              <p className="text-sm text-muted-foreground">Versão 2.1.0</p>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar Dados
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}