import { useState } from 'react';
import { Building2, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Separator } from './ui/separator';
import { ToggleTema } from './ToggleTema';
import { usarContextoApp } from '../contexts/AppContext';

export function TelaLogin() {
  const { fazerLogin } = usarContextoApp();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [estaCarregando, setEstaCarregando] = useState(false);
  const [erro, setErro] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setEstaCarregando(true);

    try {
      const sucesso = await fazerLogin(email, senha);
      if (!sucesso) {
        setErro('Email ou senha incorretos. Tente novamente.');
      }
    } catch (error) {
      setErro('Erro ao fazer login. Tente novamente.');
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
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 flex items-center justify-center p-4">
      {/* Toggle tema no canto superior direito */}
      <div className="absolute top-4 right-4">
        <ToggleTema />
      </div>

      <div className="w-full max-w-md space-y-6">
        {/* Logo e título */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-2xl shadow-lg">
              <Building2 className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">ResidenceApp</h1>
            <p className="text-muted-foreground">Portal do Condomínio</p>
          </div>
        </div>

        {/* Card de login */}
        <Card className="shadow-xl border-0 bg-card/95 backdrop-blur">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl">Bem-vindo de volta</CardTitle>
            <CardDescription>
              Faça login para acessar sua conta
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Campo de email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Campo de senha */}
              <div className="space-y-2">
                <Label htmlFor="senha">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="senha"
                    type={mostrarSenha ? 'text' : 'password'}
                    placeholder="Sua senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setMostrarSenha(!mostrarSenha)}
                  >
                    {mostrarSenha ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Mensagem de erro */}
              {erro && (
                <Alert className="border-destructive/50 text-destructive">
                  <AlertDescription>{erro}</AlertDescription>
                </Alert>
              )}

              {/* Botão de login */}
              <Button
                type="submit"
                className="w-full h-11"
                disabled={estaCarregando}
              >
                {estaCarregando ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
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
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Ou teste com
                  </span>
                </div>
              </div>

              {/* Botões de demonstração */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => preencherCredenciais('morador')}
                  className="h-11"
                  disabled={estaCarregando}
                >
                  <div className="flex flex-col items-center">
                    <span className="text-xs font-medium">Demo Morador</span>
                  </div>
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => preencherCredenciais('sindico')}
                  className="h-11"
                  disabled={estaCarregando}
                >
                  <div className="flex flex-col items-center">
                    <span className="text-xs font-medium">Demo Síndico</span>
                  </div>
                </Button>
              </div>

              {/* Credenciais de teste */}
              <div className="bg-accent/30 rounded-lg p-3 space-y-1">
                <p className="text-xs font-medium text-foreground">Credenciais de teste:</p>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p>• Morador: morador@email.com / 123456</p>
                  <p>• Síndico: sindico@email.com / 123456</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground">
          <p>© 2024 ResidenceApp. Sistema de gerenciamento condominial.</p>
        </div>
      </div>
    </div>
  );
}