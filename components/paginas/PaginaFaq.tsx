import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Shield, CalendarDays, Home, Wallet, Users } from "lucide-react";

export function PaginaFaq() {
  const perguntas = [
    {
      icone: <Shield className="h-6 w-6 text-primary" />,
      titulo: "Como acessar o sistema?",
      resposta:
        "Acesse com seu CPF e senha cadastrados. Caso esqueça, use 'Esqueci minha senha' para redefinir. Suas informações são protegidas por criptografia e autenticação segura.",
    },
    {
      icone: <Users className="h-6 w-6 text-primary" />,
      titulo: "Como cadastrar visitantes?",
      resposta:
        "Vá até o menu 'Visitantes' e clique em 'Novo Cadastro'. O visitante receberá um QR Code que garante acesso rápido e seguro na portaria.",
    },
    {
      icone: <CalendarDays className="h-6 w-6 text-primary" />,
      titulo: "Como agendar áreas comuns?",
      resposta:
        "No menu 'Reservas', selecione a área, data e horário disponíveis. O sistema aplica automaticamente as regras definidas pelo síndico, evitando conflitos.",
    },
    {
      icone: <Wallet className="h-6 w-6 text-primary" />,
      titulo: "Como visualizar boletos e pagamentos?",
      resposta:
        "No menu 'Financeiro', você pode visualizar taxas, emitir segunda via de boletos e acompanhar o histórico de pagamentos e notificações de vencimento.",
    },
    {
      icone: <Home className="h-6 w-6 text-primary" />,
      titulo: "Posso cadastrar veículos e pets?",
      resposta:
        "Sim! No menu 'Perfil', registre seus veículos e animais de estimação. Essas informações ajudam na segurança e controle de acessos do condomínio.",
    },
    {
      icone: <MessageSquare className="h-6 w-6 text-primary" />,
      titulo: "Como entrar em contato com o suporte?",
      resposta:
        "Basta clicar no botão abaixo para falar diretamente com o suporte via WhatsApp. O atendimento é automatizado e disponível 24h por dia.",
    },
  ];

  return (
    <div className="space-y-10">
      <div className="text-center">
        <h1 className="text-3xl font-semibold">FAQ – Morador</h1>
        <p className="text-muted-foreground mt-2 text-sm max-w-lg mx-auto">
          Encontre respostas rápidas sobre o uso do sistema MeuCondomínio e descubra como aproveitar ao máximo todas as funcionalidades disponíveis.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {perguntas.map((item, index) => (
          <Card
            key={index}
            className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <CardHeader className="flex flex-row items-center space-x-3">
              {item.icone}
              <CardTitle className="text-base font-semibold">{item.titulo}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.resposta}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center pt-6">
        <Button
          onClick={() => window.open("https://wa.me/5599999999999", "_blank")}
          size="lg"
          className="rounded-2xl px-8 py-5 text-base"
        >
          <MessageSquare className="mr-2 h-5 w-5" />
          Fale com o Suporte
        </Button>
      </div>
    </div>
  );
}
