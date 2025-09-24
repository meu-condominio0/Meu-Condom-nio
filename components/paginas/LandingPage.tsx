import { ReactNode, type FC } from 'react';
import {
  Building2,
  LogIn,
  Users,
  MessageSquare,
  CalendarCheck,
  FileText,
  BellRing,
  ShieldCheck,
  Smartphone,
  Clock3,
  ArrowRight
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '../ui/card';
import { Separator } from '../ui/separator';

export type LandingSection =
  | 'login'
  | 'morador'
  | 'comunicados'
  | 'reservas'
  | 'documentos'
  | 'avisos';

interface LandingPageProps {
  onNavigate?: (target: LandingSection) => void;
}

interface ShortcutItem {
  id: LandingSection;
  title: string;
  description: string;
  icon: ReactNode;
  badgeLabel?: string;
  accentClass: string;
}

const shortcutItems: ShortcutItem[] = [
  {
    id: 'morador',
    title: 'Área do Morador',
    description: 'Centralize boletos, reservas, ocorrências e dados da sua unidade em uma única experiência.',
    icon: <Users className="h-6 w-6" />,
    badgeLabel: 'Acesso rápido',
    accentClass: 'from-primary/15 to-primary/5 border-primary/40'
  },
  {
    id: 'comunicados',
    title: 'Comunicados Inteligentes',
    description: 'Receba alertas em tempo real e mantenha a comunidade alinhada com notificações multicanal.',
    icon: <MessageSquare className="h-6 w-6" />,
    badgeLabel: 'Novidades',
    accentClass: 'from-blue-500/15 to-blue-500/5 border-blue-500/40'
  },
  {
    id: 'reservas',
    title: 'Reservas Ágeis',
    description: 'Agende áreas comuns com regras claras, confirmação instantânea e histórico transparente.',
    icon: <CalendarCheck className="h-6 w-6" />,
    badgeLabel: 'Automatizado',
    accentClass: 'from-emerald-500/15 to-emerald-500/5 border-emerald-500/40'
  },
  {
    id: 'documentos',
    title: 'Documentos e Atas',
    description: 'Biblioteca digital com versionamento e acesso seguro para moradores e administradores.',
    icon: <FileText className="h-6 w-6" />,
    badgeLabel: 'Sempre disponível',
    accentClass: 'from-amber-500/15 to-amber-500/5 border-amber-500/40'
  }
];

const noticeHighlights = [
  {
    title: 'Manutenção preventiva dos elevadores',
    date: '15 de junho, 09h às 14h',
    detail: 'Equipe técnica certificada atuará nas torres A e B. O acesso será monitorado via QR Code.',
    status: 'Importante'
  },
  {
    title: 'Assembleia extraordinária on-line',
    date: '20 de junho, 19h',
    detail: 'Participe via plataforma segura com gravação automática e registro de presença digital.',
    status: 'Comunidade'
  }
];

export function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background text-foreground">
      <header
        id="landing-login"
        className="relative overflow-hidden border-b border-border/60 bg-gradient-to-br from-primary/10 via-background to-background"
      >
        {/* Hero com foco em confiança e inovação, reforçando o posicionamento premium do produto */}
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-16 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl space-y-6">
            <Badge variant="outline" className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm">
              <Building2 className="h-4 w-4 text-primary" />
              Meu Condomínio • Gestão integrada e humana
            </Badge>
            <div className="space-y-4">
              <h1 className="text-balance text-4xl font-bold leading-tight md:text-5xl">
                Conecte seu condomínio a uma gestão inteligente, segura e acolhedora.
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                Centralize comunicação, finanças e relacionamento em uma plataforma desenhada para síndicos modernos e moradores exigentes.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              {/* CTA primário direcionado à área autenticada */}
              <Button
                size="lg"
                className="group h-12 rounded-xl px-6 text-base"
                onClick={() => onNavigate?.('login')}
              >
                Acessar área do morador
                <LogIn className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              {/* CTA secundário permitindo explorar funcionalidades antes de entrar */}
              <Button
                size="lg"
                variant="outline"
                className="h-12 rounded-xl border-border px-6 text-base"
                onClick={() => onNavigate?.('morador')}
              >
                Explorar recursos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Autenticação segura por CPF
              </li>
              <li className="flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-primary" />
                Experiência responsiva
              </li>
              <li className="flex items-center gap-2">
                <Clock3 className="h-4 w-4 text-primary" />
                Comunicação em tempo real
              </li>
            </ul>
          </div>

          {/* Ilustração conceitual acessível que reforça o ecossistema digital */}
          <div className="relative mx-auto max-w-md rounded-3xl border border-border/80 bg-card/70 p-8 shadow-lg backdrop-blur-sm">
            <div className="space-y-6 text-sm">
              <div className="space-y-2">
                <p className="text-xs font-medium uppercase tracking-wide text-primary">Status em tempo real</p>
                <p className="text-2xl font-semibold text-foreground">Condomínio Aurora</p>
                <p className="text-muted-foreground">Indicadores consolidados para síndicos e moradores.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <MetricCard label="Reservas confirmadas" value="12" trend="+3 esta semana" />
                <MetricCard label="Comunicados lidos" value="98%" trend="Engajamento alto" />
                <MetricCard label="Visitantes hoje" value="24" trend="Controle digital" />
                <MetricCard label="Ocorrências abertas" value="2" trend="Tratativas em curso" variant="alert" />
              </div>
              <Separator className="bg-border/70" />
              <p className="flex items-center gap-2 text-xs text-muted-foreground">
                <BellRing className="h-4 w-4 text-primary" />
                Avisos críticos disparam notificações push, e-mail e WhatsApp automaticamente.
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-16">
        <section aria-labelledby="atalhos" className="space-y-8">
          {/* Atalhos estratégicos para as funcionalidades mais usadas pelos perfis descritos no TAP */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="space-y-2">
              <h2 id="atalhos" className="text-2xl font-semibold">Comece pelos pilares do dia a dia</h2>
              <p className="max-w-2xl text-muted-foreground">
                Navegue pelas funções que garantem transparência, segurança e colaboração entre síndicos, moradores e equipes de apoio.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {shortcutItems.map((item) => (
              <div key={item.id} className="h-full">
                <ShortcutCard item={item} onNavigate={onNavigate} />
              </div>
            ))}
          </div>
        </section>

        <section id="landing-avisos" aria-labelledby="avisos" className="grid gap-10 lg:grid-cols-[3fr_2fr]">
          <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h2 id="avisos" className="text-2xl font-semibold">Avisos e agenda do condomínio</h2>
                <p className="text-muted-foreground">Planejamento proativo mantendo todos informados com antecedência.</p>
              </div>
              <Button
                variant="ghost"
                className="text-primary hover:text-primary"
                onClick={() => onNavigate?.('avisos')}
              >
                Ver todos os comunicados
              </Button>
            </div>

            <div className="space-y-4">
              {noticeHighlights.map((notice) => (
                <Card key={notice.title} className="border border-border/70 bg-card/80">
                  <CardHeader className="gap-3 pb-4">
                    <Badge variant="secondary" className="w-fit rounded-full bg-primary/10 text-xs text-primary">
                      {notice.status}
                    </Badge>
                    <CardTitle className="text-xl font-semibold">{notice.title}</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">{notice.date}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0 text-sm text-foreground/80">
                    {notice.detail}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Bloco informativo destacando diferenciais e suporte omnichannel */}
          <aside className="flex flex-col gap-6 rounded-3xl border border-border/70 bg-muted/30 p-8">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Portal seguro e acessível</h3>
              <p className="text-sm text-muted-foreground">
                Autenticação por CPF com criptografia e logs auditáveis garantem confiabilidade em cada acesso.
              </p>
            </div>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <ShieldCheck className="mt-1 h-5 w-5 text-primary" />
                <span>
                  Conformidade com boas práticas OWASP e monitoramento contínuo contra vulnerabilidades.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Smartphone className="mt-1 h-5 w-5 text-primary" />
                <span>
                  Layout responsivo para portaria, síndicos e moradores em desktop, tablets e dispositivos móveis.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <BellRing className="mt-1 h-5 w-5 text-primary" />
                <span>
                  Comunicados automáticos por push, e-mail e WhatsApp garantem alto engajamento comunitário.
                </span>
              </li>
            </ul>
          </aside>
        </section>
      </main>

      <footer className="border-t border-border/60 bg-background/90">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-foreground">Pronto para elevar a gestão do seu condomínio?</p>
            <p className="text-sm text-muted-foreground">
              Conte com um ecossistema digital completo, suporte especializado e implantação assistida.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button className="rounded-xl" onClick={() => onNavigate?.('login')}>
              Entrar agora
            </Button>
            <Button variant="outline" className="rounded-xl border-border" onClick={() => onNavigate?.('morador')}>
              Falar com o síndico
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}

interface MetricCardProps {
  label: string;
  value: string;
  trend: string;
  variant?: 'default' | 'alert';
}

function MetricCard({ label, value, trend, variant = 'default' }: MetricCardProps) {
  return (
    <div
      className={`rounded-2xl border p-4 ${
        variant === 'alert'
          ? 'border-destructive/60 bg-destructive/10 text-destructive'
          : 'border-border/60 bg-background/70 text-foreground'
      }`}
    >
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{trend}</p>
    </div>
  );
}

interface ShortcutCardProps {
  item: ShortcutItem;
  onNavigate?: (target: LandingSection) => void;
}

const ShortcutCard: FC<ShortcutCardProps> = ({ item, onNavigate }) => {
  return (
    <button
      id={`landing-${item.id}`}
      type="button"
      onClick={() => onNavigate?.(item.id)}
      className="group relative flex h-full flex-col gap-4 rounded-3xl border border-border/70 bg-card/80 p-6 text-left shadow-sm transition-transform hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2"
    >
      {/* Fundo suave com gradiente reforçando a identidade e trazendo profundidade */}
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br ${item.accentClass} opacity-0 transition-opacity group-hover:opacity-100`}
      />
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          {item.icon}
        </span>
        <div className="space-y-1">
          <p className="text-lg font-semibold text-foreground">{item.title}</p>
          <Badge variant="secondary" className="w-fit rounded-full bg-primary/10 text-xs text-primary">
            {item.badgeLabel}
          </Badge>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">{item.description}</p>
      <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
        Acessar agora
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </button>
  );
};
