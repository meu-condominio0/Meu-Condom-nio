import React from "react";

type Operation = {
  title: string;
  description: string;
  bullets: string[];
};

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
  return (
    <section
      id="operations"
      className="w-full border-t border-slate-800 bg-slate-900/90"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-16 md:py-20">
        <header className="max-w-3xl space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300/80">
            Operações do dia a dia
          </p>
          <h2 className="text-3xl font-semibold text-slate-50 md:text-4xl">
            <span className="block max-w-3xl text-balance">
              Da portaria ao financeiro, o{" "}
              <span className="text-emerald-300">Meu Condomínio</span> cuida do
              fluxo inteiro.
            </span>
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-200/80 md:text-base">
            Estruturamos o sistema para refletir como um condomínio realmente
            funciona: chamados, comunicação, serviços e números andando juntos,
            sem ruído.
          </p>
        </header>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {operations.map((op) => (
            <article
              key={op.title}
              className="flex h-full flex-col rounded-3xl bg-slate-950/60 px-6 py-6 shadow-md transition-transform transition-shadow hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex flex-1 flex-col">
                <h3 className="text-lg font-semibold text-white">{op.title}</h3>
                <p className="mt-2 text-sm text-slate-200/80">{op.description}</p>
                <ul className="mt-4 space-y-1.5">
                  {op.bullets.map((item) => (
                    <li key={item} className="flex items-start text-sm text-slate-100">
                      <span className="mr-2 mt-1 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-emerald-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default OperationsSection;
