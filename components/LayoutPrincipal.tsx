import { useState } from 'react';
import { 
  Home, 
  MessageSquare, 
  Calendar, 
  CreditCard, 
  AlertTriangle, 
  MessageCircle,
  ShoppingBag,
  BarChart3,
  FileText,
  TrendingUp,
  Star,
  Users,
  UserPlus,
  PawPrint,
  Car,
  Settings,
  LogOut,
  Building2,
  User,
  Bell
} from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { ToggleTema } from './ToggleTema';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from './ui/sidebar';
import { usarContextoApp } from '../contexts/AppContext';

interface LayoutPrincipalProps {
  children: React.ReactNode;
  paginaAtiva: string;
  onMudarPagina: (pagina: string) => void;
}

export function LayoutPrincipal({ children, paginaAtiva, onMudarPagina }: LayoutPrincipalProps) {
  const { usuarioLogado, fazerLogout } = usarContextoApp();

  const menuMorador = [
    { id: 'inicio', label: 'Início', icone: Home },
    { id: 'comunicados', label: 'Comunicados', icone: MessageSquare, badge: 3 },
    { id: 'reservas', label: 'Reservas', icone: Calendar },
    { id: 'boletos', label: 'Boletos', icone: CreditCard, badge: 2 },
    { id: 'ocorrencias', label: 'Ocorrências', icone: AlertTriangle },
    { id: 'chat', label: 'Chat Portaria', icone: MessageCircle },
    { id: 'visitantes', label: 'Visitantes', icone: UserPlus },
    { id: 'pets', label: 'Pets', icone: PawPrint },
    { id: 'veiculos', label: 'Veículos', icone: Car },
    { id: 'marketplace', label: 'Marketplace', icone: ShoppingBag }
  ];

  const menuSindico = [
    { id: 'inicio', label: 'Dashboard', icone: Home },
    { id: 'paineis', label: 'Painéis', icone: BarChart3 },
    { id: 'anexos', label: 'Anexos', icone: FileText },
    { id: 'relatorios', label: 'Relatórios', icone: TrendingUp },
    { id: 'avaliacao', label: 'Avaliações', icone: Star },
    { id: 'usuarios', label: 'Usuários', icone: Users },
    { id: 'visitantes', label: 'Visitantes', icone: UserPlus },
    { id: 'pets', label: 'Pets', icone: PawPrint },
    { id: 'veiculos', label: 'Veículos', icone: Car },
    { id: 'comunicados', label: 'Comunicados', icone: MessageSquare },
    { id: 'reservas', label: 'Reservas', icone: Calendar },
    { id: 'ocorrencias', label: 'Ocorrências', icone: AlertTriangle, badge: 5 }
  ];

  const menuItens = usuarioLogado?.tipo === 'sindico' ? menuSindico : menuMorador;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar className="border-r border-border/50">
          <SidebarHeader className="border-b border-border/50 p-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl">
                <Building2 className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground text-lg">ResidenceApp</h2>
                <p className="text-sm text-muted-foreground">Portal do Condomínio</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-4">
            <SidebarMenu className="space-y-2">
              {menuItens.map((item) => {
                const Icone = item.icone;
                const ativo = paginaAtiva === item.id;
                
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => onMudarPagina(item.id)}
                      className={`w-full justify-start gap-4 h-12 px-4 rounded-xl transition-all duration-200 ${
                        ativo 
                          ? 'bg-primary text-primary-foreground shadow-md scale-105' 
                          : 'hover:bg-accent/70 text-foreground hover:scale-105'
                      }`}
                    >
                      <Icone className="h-5 w-5 shrink-0" />
                      <span className="font-medium text-base">{item.label}</span>
                      {item.badge && (
                        <Badge 
                          variant={ativo ? "secondary" : "outline"} 
                          className="ml-auto h-6 min-w-6 px-2 text-xs font-medium"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarContent>
          
          <SidebarFooter className="border-t border-border/50 p-6">
            <div className="space-y-4">
              {/* Perfil do usuário */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-accent/30">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-base">
                    {usuarioLogado?.nome?.split(' ').map(n => n[0]).join('') || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground truncate">
                    {usuarioLogado?.nome}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-sm text-muted-foreground">
                      {usuarioLogado?.tipo === 'sindico' ? 'Síndico' : `Apt ${usuarioLogado?.apartamento}`}
                    </p>
                    <Badge variant="outline" className="h-5 px-2 text-xs">
                      {usuarioLogado?.tipo === 'sindico' ? 'Admin' : 'Morador'}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Botões de ação */}
              <div className="flex gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onMudarPagina('configuracoes')}
                  className="flex-1 gap-2 h-10"
                >
                  <Settings className="h-4 w-4" />
                  <span className="text-sm">Config</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={fazerLogout}
                  className="flex-1 gap-2 h-10 text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="text-sm">Sair</span>
                </Button>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="bg-background border-b border-border/50 px-4 sm:px-6 lg:px-8 py-5">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="lg:hidden" />
                <div>
                  <h1 className="text-xl sm:text-2xl font-semibold text-foreground">
                    {menuItens.find(item => item.id === paginaAtiva)?.label || 'Dashboard'}
                  </h1>
                  <p className="text-sm text-muted-foreground hidden sm:block">
                    {new Date().toLocaleDateString('pt-BR', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-4 w-4" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-destructive text-destructive-foreground">
                    3
                  </Badge>
                </Button>
                <ToggleTema />
              </div>
            </div>
          </header>

          {/* Conteúdo principal */}
          <main className="flex-1 overflow-auto bg-background">
            <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-none">
              <div className="max-w-7xl mx-auto">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}