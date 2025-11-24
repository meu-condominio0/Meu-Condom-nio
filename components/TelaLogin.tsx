import { useRef, useState } from 'react';
import { Building2, Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Separator } from './ui/separator';
import { ToggleTema } from './ToggleTema';
import { usarContextoApp } from '../contexts/AppContext';
import { cn } from './ui/utils';

interface TelaLoginProps {
  onVoltarInicio?: () => void;
}

export function TelaLogin({ onVoltarInicio }: TelaLoginProps) {
  const { fazerLogin, temaDark } = usarContextoApp();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [estaCarregando, setEstaCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const senhaRef = useRef<HTMLInputElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setEstaCarregando(true);

    try {
      const sucesso = await fazerLogin(email, senha);
      if (!sucesso) {
        setErro('Email ou senha incorretos. Tente novamente.');
      }
    } catch (error: any) {
      const mensagemErro = error?.response?.data?.detail;
      if (mensagemErro) {
        setErro(mensagemErro);
      } else {
        setErro('Erro ao conectar ao servidor.');
      }
    } finally {
      setEstaCarregando(false);
    }
  };

  const preencherCredenciais = (tipo: 'morador' | 'sindico') => {
    if (tipo === 'morador') {
      setEmail('morador@email.com');
      setSenha('123456');
    } else {
      setEmail('sindico@email.com');
      setSenha('123456');
    }

    requestAnimationFrame(() => {
      if (senhaRef.current) {
        senhaRef.current.focus();
        senhaRef.current.select();
      } else {
        submitRef.current?.focus();
      }
    });
  };

  return (
    <div
      className={cn(
        'relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10 transition-colors duration-300 sm:py-12',
        temaDark
          ? 'bg-gradient-to-br from-emerald-950 via-slate-950 to-slate-900 text-slate-100'
          : 'bg-gradient-to-br from-slate-50 via-emerald-50 to-slate-100 text-slate-900',
      )}
    >
      {onVoltarInicio && (
        <div className="absolute top-4 left-4">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-muted-foreground hover:text-foreground"
            onClick={onVoltarInicio}
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
        </div>
      )}
      {/* Toggle tema no canto superior direito */}
      <div className="absolute top-4 right-4">
        <ToggleTema />
      </div>

      <div className="w-full max-w-md space-y-6">
        {/* Logo e título */}
        <div className="space-y-5 text-center">
          <div className="flex items-center justify-center">
            <div className="flex h-[72px] w-[72px] items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-900/40 ring-4 ring-emerald-500/15">
              <Building2 className="h-10 w-10 text-slate-950" aria-hidden />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">MeuCondomínio</h1>
            <p
              className={cn(
                'text-sm font-medium',
                temaDark ? 'text-emerald-100/90' : 'text-emerald-700',
              )}
            >
              Portal do Condomínio
            </p>
          </div>
        </div>

        {/* Card de login */}
        <Card
          className={cn(
            'w-full max-w-md rounded-2xl border px-6 py-7 sm:px-8 sm:py-8 lg:px-10 lg:py-10 shadow-[0_18px_45px_rgba(0,0,0,0.55)] backdrop-blur transition-colors duration-300',
            temaDark
              ? 'bg-slate-950/70 border-slate-800/70 text-slate-100'
              : 'bg-white border-slate-200 text-slate-900 shadow-[0_18px_45px_rgba(0,0,0,0.15)]',
          )}
        >
          <CardHeader className="space-y-2 px-0 pb-4 pt-0 text-center">
            <CardTitle className="text-2xl font-semibold">Bem-vindo de volta</CardTitle>
            <CardDescription
              className={cn('text-sm', temaDark ? 'text-slate-300' : 'text-slate-600')}
            >
              Faça login para acessar sua conta
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 px-0">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Campo de email */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className={cn('text-sm font-medium', temaDark ? 'text-slate-100' : 'text-slate-800')}
                >
                  E-mail
                </Label>
                <div className="relative">
                  <Mail
                    className={cn(
                      'absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2',
                      temaDark ? 'text-slate-400' : 'text-slate-500',
                    )}
                    aria-hidden
                  />
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={cn(
                      'h-12 rounded-xl border px-4 pl-11 text-base transition focus:border-emerald-400 focus:ring-emerald-500 focus:ring-1',
                      temaDark
                        ? 'bg-slate-900/60 border-slate-700/70 text-slate-100 placeholder:text-slate-400'
                        : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-500',
                    )}
                    required
                  />
              </div>
              </div>

              {/* Campo de senha */}
              <div className="space-y-2">
                <Label
                  htmlFor="senha"
                  className={cn('text-sm font-medium', temaDark ? 'text-slate-100' : 'text-slate-800')}
                >
                  Senha
                </Label>
                <div className="relative">
                  <Lock
                    className={cn(
                      'absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2',
                      temaDark ? 'text-slate-400' : 'text-slate-500',
                    )}
                    aria-hidden
                  />
                  <Input
                    id="senha"
                    ref={senhaRef}
                    type={mostrarSenha ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="Sua senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className={cn(
                      'h-12 rounded-xl border px-4 pl-11 pr-12 text-base transition focus:border-emerald-400 focus:ring-emerald-500 focus:ring-1',
                      temaDark
                        ? 'bg-slate-900/60 border-slate-700/70 text-slate-100 placeholder:text-slate-400'
                        : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-500',
                    )}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    className={cn(
                      'tap-target absolute right-1 top-1 h-[calc(100%-0.5rem)] rounded-lg px-3 transition',
                      temaDark
                        ? 'text-slate-400 hover:bg-transparent hover:text-slate-100'
                        : 'text-slate-500 hover:bg-transparent hover:text-slate-700',
                    )}
                    onClick={() => setMostrarSenha(!mostrarSenha)}
                    aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
                  >
                    {mostrarSenha ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Mensagem de erro */}
              {erro && (
                <Alert className="border-destructive/50 text-destructive" role="alert" aria-live="polite">
                  <AlertDescription>{erro}</AlertDescription>
                </Alert>
              )}

              {/* Botão de login */}
              <Button
                type="submit"
                ref={submitRef}
                className="w-full rounded-lg bg-emerald-500 py-3 text-base font-semibold text-slate-950 transition hover:bg-emerald-400 active:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={estaCarregando || !email || !senha}
              >
                {estaCarregando ? (
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        'h-4 w-4 animate-spin rounded-full border-b-2',
                        temaDark ? 'border-slate-100' : 'border-slate-900',
                      )}
                    ></div>
                    Entrando...
                  </div>
                ) : (
                  'Entrar'
                )}
              </Button>
            </form>

            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase tracking-[0.08em]">
                  <span className={cn('px-3', temaDark ? 'bg-slate-950/70 text-slate-300' : 'bg-white text-slate-600')}>
                    Ou teste com
                  </span>
                </div>
              </div>

              {/* Botões de demonstração */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => preencherCredenciais('morador')}
                  className={cn(
                    'tap-target h-11 rounded-lg border text-sm font-medium transition',
                    temaDark
                      ? 'bg-slate-900/70 border-slate-700/70 text-slate-100 hover:bg-slate-800'
                      : 'bg-slate-50 border-slate-300 text-slate-900 hover:bg-slate-100',
                  )}
                  disabled={estaCarregando}
                >
                  Demo Morador
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => preencherCredenciais('sindico')}
                  className={cn(
                    'tap-target h-11 rounded-lg border text-sm font-medium transition',
                    temaDark
                      ? 'bg-slate-900/70 border-slate-700/70 text-slate-100 hover:bg-slate-800'
                      : 'bg-slate-50 border-slate-300 text-slate-900 hover:bg-slate-100',
                  )}
                  disabled={estaCarregando}
                >
                  Demo Síndico
                </Button>
              </div>

              {/* Credenciais de teste */}
              <div className="mt-4 space-y-1 rounded-xl border border-emerald-700/60 bg-emerald-900/70 px-4 py-3 text-xs text-emerald-50/90">
                <p className="font-semibold">Credenciais de teste:</p>
                <div className="space-y-1">
                  <p>• Morador: morador@email.com / 123456</p>
                  <p>• Síndico: sindico@email.com / 123456</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-slate-500">
          <p>© 2025 MeuCondomínio. Sistema de gerenciamento condominial.</p>
        </div>
      </div>
    </div>
  );
}
