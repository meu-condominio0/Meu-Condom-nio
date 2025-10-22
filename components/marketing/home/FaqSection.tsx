import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';

const QUESTIONS = [
  'Como funciona a migração de outro sistema?',
  'Quanto tempo leva a implantação?',
  'Quais bancos são suportados?',
  'Como funciona o suporte?',
  'Os dados estão protegidos (LGPD)?',
];

export function FaqSection() {
  return (
    <section className="px-4 py-20" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-4xl">
        <div className="space-y-3 text-center">
          <h2 id="faq-heading" className="text-3xl font-semibold text-slate-900 sm:text-4xl">
            Perguntas frequentes
          </h2>
          <p className="text-lg text-slate-600">Tire suas dúvidas sobre planos, migração e suporte</p>
        </div>
        <Accordion.Root type="single" collapsible className="mt-10 space-y-4">
          {QUESTIONS.map((question) => (
            <Accordion.Item key={question} value={question} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <Accordion.Header>
                <Accordion.Trigger
                  className="group flex w-full items-center justify-between gap-4 px-6 py-4 text-left text-base font-semibold text-slate-900 transition hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-500 focus-visible:outline-offset-2"
                >
                  {question}
                  <ChevronDown
                    className="size-4 shrink-0 text-emerald-700 transition group-data-[state=open]:rotate-180"
                    aria-hidden="true"
                  />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="px-6 pb-5 text-sm text-slate-600">
                <p>
                  Nossa equipe acompanha cada etapa para garantir uma transição tranquila e suporte dedicado conforme a necessidade do seu condomínio.
                </p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
        <div className="mt-10 rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/60 px-6 py-6 text-center text-sm text-emerald-900">
          Ainda tem dúvidas? —{' '}
          <button
            type="button"
            className="font-semibold underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-500 focus-visible:outline-offset-2"
          >
            Fale com nosso time e receba uma proposta personalizada
          </button>
        </div>
      </div>
    </section>
  );
}
