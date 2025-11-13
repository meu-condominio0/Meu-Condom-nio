import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  FileText,
  Users,
  Send,
  BarChart3,
  Wrench,
  ShieldCheck,
} from "lucide-react";

export function PaginaFaqSindico() {
  const perguntas = [
    {
      icone: <Send className="h-6 w-6 text-primary" />,
      titulo: "Como posso enviar comunicados aos moradores?",
      resposta:
        "Acesse o menu 'Comunicados' e clique em 'Novo Comunicado'. Você pode enviar mensagens, avisos e documentos a todos os moradores de forma simultânea, com confirmação de leitura.",
    },
    {
      icone: <Users className="h-6 w-6 text-primary" />,
      titulo: "Como cadastrar novos moradores ou atualizar dados?",
      resposta:
        "No menu 'Usuários', clique em 'Adicionar Usuário' e preencha as informações necessárias. Também é possível editar ou desativar cadastros conforme necessidade.",
    },
    {
      icone: <FileText className="h-6 w-6 text-primary" />,
      titulo: "Onde faço upload de documentos e atas?",
      resposta:
        "Utilize o menu 'Documentos' ou 'Biblioteca Digital' para anexar atas de reuniões, regulamentos internos, contratos e relatórios. Todos ficam acessíveis aos moradores conforme permissões definidas.",
    },
    {
      icone: <BarChart3 className="h-6 w-6 text-primary" />,
      titulo: "Como visualizar relatórios e controle financeiro?",
      resposta:
        "No menu 'Relatórios' você encontra dados de receitas, despesas, inadimplências e previsões orçamentárias. Os relatórios são gerados automaticamente com base nas movimentações cadastradas.",
    },
    {
      icone: <Wrench className="h-6 w-6 text-primary" />,
      titulo: "Como gerenciar manutenções e ocorrências?",
      resposta:
        "No painel 'Manutenções', registre reformas, serviços realizados e ocorrências reportadas pelos moradores. Isso ajuda a manter o histórico e facilita o planejamento de novas intervenções.",
    },
    {
      icone: <ShieldCheck className="h-6 w-6 text-primary" />,
      titulo: "Como garantir a segurança e controle de acessos?",
      resposta:
        "O sistema permite o acompanhamento de visitantes e entregas, com histórico e QR Codes de entrada. Você pode visualizar logs de acesso e configurar alertas de movimentação.",
    },
  ];

  return (
    <div className="space-y-10">
      <div className="text-center">
        <h1 className="text-3xl font-semibold">FAQ – Síndico</h1>
        <p className="text-muted-foreground mt-2 text-sm max-w-lg mx-auto">
          Encontre respostas rápidas sobre as principais funções administrativas do sistema
          <strong> MeuCondomínio</strong> e otimize a gestão do seu condomínio com eficiência e transparência.
        </p>
      </div>

      {/* Grade de Cards */}
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

      {/* Botão de suporte */}
      <div className="flex justify-center pt-6">
        <Button
          onClick={() =>
            window.open(
              "https://wa.me/5599999999999?text=Olá! Sou síndico e preciso de ajuda com o sistema MeuCondomínio.",
              "_blank"
            )
          }
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
