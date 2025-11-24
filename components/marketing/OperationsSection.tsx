import React from "react";

type Operation = {
  title: string;
  description: string;
  bullets: string[];
};

// Se quiser depois tipar certinho, troca `any` por `MarketingPath`
type OperationsSectionProps = {
  onNavigate?: (path: any) => void;
};

const operations: Operation[] = [
  {
    title: "Rotina do síndico sem dor de cabeça",
    description:
      "Organize as demandas do condomínio em um só lugar, com visão clara do que está em andamento e do que já foi concluído.",
    bullets: [
      "Abertura e acompanhamento de chamados",
      "Histórico centralizado por unidade",
      "Prioridade por tipo de ocorrência",
    ],
  },
  {
    title: "Operação financeira sob controle",
    description:
      "Acompanhe lançamentos, cobranças e inadimplência com visão amigável para o síndico e profissional para a administradora.",
    bullets: [
      "Resumo financeiro por período",
      "Indicadores de inadimplência",
      "Exportação para contabilidade",
    ],
  },
  {
    title: "Marketplace integrado ao dia a dia",
    description:
      "Conecte fornecedores e serviços ao condomínio direto no sistema, evitando WhatsApp perdido e orçamentos soltos.",
    bullets: [
      "Serviços recomendados para o condomínio",
      "Orçamentos organizados por demanda",
      "Registro das contratações realizadas",
    ],
  },
];

export function OperationsSection({ onNavigate }: OperationsSectionProps) {
  // por enquanto não usamos onNavigate, mas ele já está disponível se quiser
  return (
    <section
      id="operations"
      className="w-full bg-slate-900/90 border-t border-slate-800 py-16 md:py-24"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 md:px-6">
        <header className="max-w-3xl space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300/80">
            Operações do dia a dia
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-50">
            Da portaria ao financeiro, o{" "}
            <span className="text-emerald-300">Meu Condomínio</span> cuida do
            fluxo inteiro.
          </h2>
          <p className="text-sm md:text-base text-slate-300/80">
            Estruturamos o sistema para refletir como um condomínio realmente
            funciona: chamados, comunicação, serviços e números andando juntos,
            sem ruído.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          {operations.map((op) => (
            <article
              key={op.title}
              className="h-full rounded-2xl border border-slate-800/80 bg-slate-900/70 p-5 shadow-lg shadow-black/30 backdrop-blur-sm transition-transform hover:-translate-y-1 hover:border-emerald-400/70"
            >
              <h3 className="text-base md:text-lg font-semibold text-slate-50">
                {op.title}
              </h3>
              <p className="mt-2 text-xs md:text-sm text-slate-300/90">
                {op.description}
              </p>
              <ul className="mt-4 space-y-1.5 text-xs text-slate-300/80">
                {op.bullets.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-[3px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export de
