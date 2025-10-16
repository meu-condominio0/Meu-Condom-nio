import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Star,
  Shield,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Download,
} from 'lucide-react';

interface AppModalProps {
  open: boolean;
  onClose: () => void;
  app: any;
}

export function AppModal({ open, onClose, app }: AppModalProps) {
  const [installing, setInstalling] = useState(false);
  const [installed, setInstalled] = useState(false);
  const [apiKey, setApiKey] = useState('');

  if (!app) return null;

  const handleInstall = () => {
    setInstalling(true);
    setTimeout(() => {
      setInstalling(false);
      setInstalled(true);
      setTimeout(() => {
        onClose();
        setInstalled(false);
        setApiKey('');
      }, 2000);
    }, 2000);
  };

  const features = [
    'Integração em tempo real',
    'Suporte técnico dedicado',
    'Atualizações automáticas',
    'Documentação completa',
    'API REST disponível',
  ];

  const permissions = [
    'Ler dados de condomínios',
    'Criar e modificar registros',
    'Acessar relatórios financeiros',
    'Enviar notificações',
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        {installed ? (
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <CheckCircle2 className="w-16 h-16 text-[var(--brand-accent)]" />
            <DialogTitle className="text-center">App instalado com sucesso!</DialogTitle>
            <p className="text-center text-[var(--ink-body)]">
              {app.name} está pronto para uso.
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-accent)] flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-2xl">{app.name?.charAt(0)}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <DialogTitle>{app.name}</DialogTitle>
                    {app.isOfficial && (
                      <Badge variant="secondary" className="bg-[var(--brand-accent)]/10 text-[var(--brand-accent)] border-0">
                        <Shield className="w-3 h-3 mr-1" />
                        Oficial
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-[var(--ink-muted)]">{app.category}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-[var(--brand-accent)] text-[var(--brand-accent)]" />
                      <span className="font-bold text-sm">{app.rating?.toFixed(1)}</span>
                    </div>
                    <span className="text-sm text-[var(--ink-muted)]">•</span>
                    <span className="text-sm text-[var(--ink-muted)]">1.2k avaliações</span>
                  </div>
                </div>
              </div>
            </DialogHeader>

            <Tabs defaultValue="overview" className="mt-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Visão geral</TabsTrigger>
                <TabsTrigger value="permissions">Permissões</TabsTrigger>
                <TabsTrigger value="pricing">Preço</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6 mt-6">
                <div>
                  <h4 className="mb-3">Sobre o app</h4>
                  <p className="text-[var(--ink-body)]">{app.description}</p>
                </div>

                <div>
                  <h4 className="mb-3">Recursos principais</h4>
                  <ul className="space-y-2">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-[var(--ink-body)]">
                        <CheckCircle2 className="w-5 h-5 text-[var(--brand-accent)] flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {app.price === 'paid' && (
                  <div className="bg-[var(--bg-soft)] rounded-xl p-4">
                    <h4 className="mb-3">Configuração necessária</h4>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="apiKey">Chave de API (opcional)</Label>
                        <Input
                          id="apiKey"
                          placeholder="sk_live_..."
                          value={apiKey}
                          onChange={(e) => setApiKey(e.target.value)}
                          className="mt-1"
                        />
                        <p className="text-xs text-[var(--ink-muted)] mt-1">
                          Você pode configurar isso depois nas configurações do app
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="permissions" className="space-y-4 mt-6">
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-amber-900 mb-1">Permissões solicitadas</h4>
                    <p className="text-sm text-amber-700">
                      Este app precisa das seguintes permissões para funcionar corretamente
                    </p>
                  </div>
                </div>

                <ul className="space-y-3">
                  {permissions.map((permission, index) => (
                    <li key={index} className="flex items-start gap-3 p-3 bg-[var(--bg-soft)] rounded-lg">
                      <Shield className="w-5 h-5 text-[var(--brand-primary)] flex-shrink-0 mt-0.5" />
                      <span className="text-[var(--ink-body)]">{permission}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-sm text-[var(--ink-muted)] pt-2">
                  Você pode revogar essas permissões a qualquer momento nas configurações
                </p>
              </TabsContent>

              <TabsContent value="pricing" className="space-y-6 mt-6">
                <div className="bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-primary-600)] rounded-xl p-6 text-white">
                  <h4 className="text-white mb-2">
                    {app.price === 'free' ? 'Grátis' : 'Plano Premium'}
                  </h4>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-4xl font-bold">
                      {app.price === 'free' ? 'R$ 0' : 'R$ 49'}
                    </span>
                    {app.price !== 'free' && (
                      <span className="text-white/80">/mês por condomínio</span>
                    )}
                  </div>
                  {app.price !== 'free' && (
                    <Badge className="bg-[var(--brand-accent)] text-white border-0">
                      30 dias de teste grátis
                    </Badge>
                  )}
                </div>

                <div className="space-y-3">
                  <h4>O que está incluído:</h4>
                  <ul className="space-y-2">
                    {features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-[var(--ink-body)]">
                        <CheckCircle2 className="w-5 h-5 text-[var(--brand-accent)] flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {app.price !== 'free' && (
                  <p className="text-sm text-[var(--ink-muted)] bg-[var(--bg-soft)] rounded-lg p-4">
                    Cancele a qualquer momento. Sem taxas de cancelamento.
                  </p>
                )}
              </TabsContent>
            </Tabs>

            <div className="flex gap-3 pt-6 border-t border-[var(--border-soft)]">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Cancelar
              </Button>
              <Button
                onClick={handleInstall}
                disabled={installing}
                className="flex-1 bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-600)] text-white"
              >
                {installing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Instalando...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Instalar app
                  </>
                )}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
