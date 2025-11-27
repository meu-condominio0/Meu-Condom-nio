import { useRef, useState } from 'react';
import { Building2, Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
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
      if (!sucesso) setErro('Email ou senha incorretos. Tente novamente.');
    } catch (error: any) {
      const mensagemErro = error?.response?.data?.detail;
      setErro(mensagemErro || 'Erro ao conectar ao servidor.');
    } finally {
      setEstaCarregando(false);
    }
  };

  return (
  <section
  className={cn(
    'relative h-screen w-full overflow-hidden flex items-center justify-center px-4 py-10 sm:py-20 transition-colors duration-500',
    temaDark
      ? 'hero-with-bg text-white'
      : 'bg-gradient-to-br from-slate-50 via-emerald-50 to-slate-100 text-slate-900'
  )}
>

      {/* Fundo estilo HERO */}
      {temaDark && (
        <>
          <div
            className="absolute inset-0 bg-gradient-to-br from-[#0D2D25] via-[#0A2420] to-[#0F362D]"
            aria-hidden
          />
          <div className="absolute inset-0 bg-[url('/assets/marketing/pattern.svg')] opacity-[0.08] mix-blend-soft-light" />
          <div className="hero-overlay absolute inset-0 bg-black/20 backdrop-blur-[1px]" aria-hidden />
        </>
      )}

      {/* Botão Voltar */}
      {onVoltarInicio && (
        <div className="absolute top-6 left-6 z-20">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-white/70 hover:text-white"
            onClick={onVoltarInicio}
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
        </div>
      )}

      {/* Toggle Tema */}
      <div className="absolute top-6 right-6 z-20">
        <ToggleTema />
      </div>

      {/* CONTEÚDO DO LOGIN */}
      <div className="relative z-10 w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center space-y-4 drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
          <div className="flex items-center justify-center">
            <div className="flex h-[76px] w-[76px] items-center justify-center rounded-2xl 
               bg-gradient-to-br from-emerald-500 to-emerald-600 
               shadow-[0_20px_40px_rgba(0,0,0,0.45)]
               ring-4 ring-emerald-500/20">
              <Building2 className="h-11 w-11 text-slate-950" />
            </div>
          </div>

          <h1 className="text-4xl font-bold tracking-tight">MeuCondomínio</h1>
          <p className="text-sm font-medium text-white/80">Portal do Condomínio</p>
        </div>

        {/* CARD DE LOGIN */}
        <Card
          className={cn(
            'rounded-3xl px-8 py-10 border backdrop-blur-xl shadow-[0_26px_60px_rgba(0,0,0,0.45)]',
            temaDark
              ? 'bg-white/5 border-white/10 text-white'
              : 'bg-white border-slate-200 shadow-xl'
          )}
        >
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-2xl font-semibold">Bem-vindo de volta</CardTitle>
            <CardDescription className="text-sm text-white/70">
              Acesse sua conta para continuar
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* EMAIL */}
              <div className="space-y-2">
                <Label htmlFor="email" className="font-medium">E-mail</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={cn(
                      'h-12 rounded-xl pl-11 text-base',
                      temaDark
                        ? 'bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-emerald-400'
                        : 'bg-slate-50 border-slate-300 text-slate-900'
                    )}
                    required
                  />
                </div>
              </div>

              {/* SENHA */}
              <div className="space-y-2">
                <Label htmlFor="senha" className="font-medium">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                  <Input
                    id="senha"
                    ref={senhaRef}
                    type={mostrarSenha ? 'text' : 'password'}
                    placeholder="Sua senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className={cn(
                      'h-12 rounded-xl pl-11 pr-12 text-base',
                      temaDark
                        ? 'bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-emerald-400'
                        : 'bg-slate-50 border-slate-300 text-slate-900'
                    )}
                    required
                  />

                  <Button
                    type="button"
                    variant="ghost"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                    onClick={() => setMostrarSenha(!mostrarSenha)}
                  >
                    {mostrarSenha ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* ERRO */}
              {erro && (
                <Alert className="border-red-500/40 text-red-400 bg-red-500/10 backdrop-blur">
                  <AlertDescription>{erro}</AlertDescription>
                </Alert>
              )}

              {/* ENTRAR */}
              <Button
                type="submit"
                ref={submitRef}
                className="
                  w-full rounded-full bg-emerald-500 px-4 py-3 text-base font-semibold text-white 
                  shadow-lg transition hover:bg-emerald-600 hover:translate-y-[1px]
                "
                disabled={estaCarregando}
              >
                {estaCarregando ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-white" />
                    Entrando...
                  </div>
                ) : (
                  'Entrar'
                )}
              </Button>

              {/* Esqueci minha senha */}
              <button
                type="button"
                className="block w-full text-center text-sm mt-1 font-medium text-emerald-300 hover:text-emerald-200 underline underline-offset-4"
                onClick={() => alert('🔐 Tela de recuperação em desenvolvimento')}
              >
                Esqueci minha senha
              </button>
            </form>
          </CardContent>
        </Card>

        {/* Rodapé */}
        <p className="text-center text-xs text-white/60">
          © 2025 MeuCondomínio. Sistema de gerenciamento condominial.
        </p>
      </div>
    </section>
  );
}
