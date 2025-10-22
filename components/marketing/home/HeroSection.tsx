import { ArrowRight, CheckCircle2 } from 'lucide-react';
import type { MarketingPageProps } from '../MarketingLayout';

interface HeroSectionProps extends MarketingPageProps {}

const BULLETS = [
  '-29% do tempo em rotinas',
  'Inadimplência sob controle',
  'Reservas e portaria sem telefonema',
];

export function HeroSection({ onNavigate, onLogin }: HeroSectionProps) {
  return (
    <section className="bg-gradient-to-b from-white via-emerald-50/40 to-white" aria-labelledby="hero-heading">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 pb-16 pt-24 md:grid-cols-[1.1fr_0.9fr] md:pb-24 md:pt-32">
        <div className="space-y-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100/80 px-4 py-1.5 text-sm font-medium text-emerald-800">
            + Marketplace para integrar pagamentos, portaria & IoT, contabilidade e BI.
          </span>
          <div className="space-y-5">
            <h1 id="hero-heading" className="text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">
              Administre seu condomínio
              <span className="block">sem fricção.</span>
            </h1>
            <p className="text-lg text-slate-600 md:text-xl">
              Boletos, reservas, chamados e portaria — em 3 cliques e com visão financeira de ponta.
            </p>
          </div>
          <div className="flex flex-col items-stretch gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => onNavigate('/demo')}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-900 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-500 focus-visible:outline-offset-2"
            >
              Ver demonstração →
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={onLogin}
              className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-base font-semibold text-emerald-900 underline-offset-4 transition hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-500 focus-visible:outline-offset-2"
            >
              Já sou cliente — acessar
            </button>
          </div>
          <ul className="grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
            {BULLETS.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 size-5 text-emerald-600" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-center">
          <div className="relative h-[520px] w-[280px] rounded-[32px] border border-slate-200 bg-white p-4 shadow-[0_20px_80px_rgba(16,185,129,0.2)]">
            <div className="absolute inset-0 rounded-[32px] bg-gradient-to-b from-emerald-100/40 via-transparent to-white" aria-hidden="true" />
            <div className="relative flex h-full w-full flex-col rounded-3xl bg-white p-4 shadow-inner">
              <div className="h-10 rounded-2xl bg-slate-100" />
              <div className="mt-4 space-y-3">
                <div className="h-16 rounded-2xl bg-emerald-100/70" />
                <div className="h-12 rounded-xl bg-slate-100" />
                <div className="h-12 rounded-xl bg-slate-100" />
                <div className="h-24 rounded-2xl bg-emerald-50" />
                <div className="h-12 rounded-xl bg-slate-100" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
