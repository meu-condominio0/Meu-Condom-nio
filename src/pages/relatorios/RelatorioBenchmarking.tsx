import React from 'react';

export default function RelatorioBenchmarking() {
  return (
    <div className="p-8 space-y-6 text-gray-800">
      <h1 className="text-3xl font-bold text-center">Relatório de Benchmarking — Projeto Meu Condomínio</h1>

      <section>
        <h2 className="text-2xl font-semibold mt-6">1. Objetivo</h2>
        <p>
          Analisar os principais concorrentes do setor de gestão condominial, comparando funcionalidades e propostas de valor,
          para identificar diferenciais, gaps e oportunidades de melhoria e monetização do <strong>Meu Condomínio</strong>.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mt-6">2. Concorrentes Analisados</h2>
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Concorrente</th>
              <th className="border p-2">Destaque</th>
              <th className="border p-2">Público</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2 font-semibold">Superlógica</td>
              <td className="border p-2">Plataforma completa com conta digital e automação financeira.</td>
              <td className="border p-2">Administradoras e condomínios grandes.</td>
            </tr>
            <tr>
              <td className="border p-2 font-semibold">uCondo</td>
              <td className="border p-2">Comunicação, reservas e gestão integrada.</td>
              <td className="border p-2">Condomínios médios e pequenos.</td>
            </tr>
            <tr>
              <td className="border p-2 font-semibold">CondoConta</td>
              <td className="border p-2">Foco em finanças e conta digital.</td>
              <td className="border p-2">Condomínios menores.</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mt-6">3. Comparativo de Funcionalidades</h2>
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Funcionalidade</th>
              <th className="border p-2">Superlógica</th>
              <th className="border p-2">uCondo</th>
              <th className="border p-2">Meu Condomínio</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border p-2">Comunicação interna</td><td className="border p-2">✅</td><td className="border p-2">✅</td><td className="border p-2">✅</td></tr>
            <tr><td className="border p-2">Gestão financeira</td><td className="border p-2">✅</td><td className="border p-2">✅</td><td className="border p-2">✅</td></tr>
            <tr><td className="border p-2">Reserva de áreas</td><td className="border p-2">✅</td><td className="border p-2">✅</td><td className="border p-2">✅</td></tr>
            <tr><td className="border p-2">Controle de visitantes</td><td className="border p-2">✅</td><td className="border p-2">✅</td><td className="border p-2">🟡 Planejado</td></tr>
            <tr><td className="border p-2">Relatórios automáticos</td><td className="border p-2">✅</td><td className="border p-2">✅</td><td className="border p-2">🟡 Em desenvolvimento</td></tr>
            <tr><td className="border p-2">App mobile</td><td className="border p-2">✅</td><td className="border p-2">✅</td><td className="border p-2">✅</td></tr>
            <tr><td className="border p-2 font-semibold">Marketplace interno de serviços</td><td className="border p-2">❌</td><td className="border p-2">❌</td><td className="border p-2 text-green-600 font-semibold">✅ Diferencial principal</td></tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mt-6">4. Diferenciais e Oportunidades</h2>
        <ul className="list-disc ml-6">
          <li><strong>Diferencial principal:</strong> Marketplace interno que conecta moradores e prestadores (limpeza, manutenção, jardinagem etc.), gerando conveniência e novas fontes de receita.</li>
        </ul>
        <p className="mt-3 font-semibold">Oportunidades de ganho rápido:</p>
        <ul className="list-disc ml-6">
          <li>Lançar o MVP do marketplace com serviços básicos.</li>
          <li>Implementar avaliação e ranking de prestadores.</li>
          <li>Adicionar relatórios automáticos e notificações automáticas para melhorar a gestão.</li>
          <li>Explorar parcerias locais (empresas de segurança, manutenção, limpeza).</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mt-6">5. Conclusão</h2>
        <p>
          O <strong>Meu Condomínio</strong> se diferencia dos principais concorrentes por oferecer um marketplace interno que amplia o valor entregue aos moradores e síndicos.
          Enquanto os concorrentes focam na gestão e finanças, o Meu Condomínio agrega utilidade prática e monetização por meio da conexão com prestadores.
        </p>
        <p className="mt-3 font-semibold">Próximos passos:</p>
        <ul className="list-disc ml-6">
          <li>Finalizar MVP do marketplace.</li>
          <li>Testar com condomínios pilotos.</li>
          <li>Coletar feedbacks e ajustar fluxo de uso.</li>
          <li>Explorar modelo de receita por comissão e destaque de prestadores.</li>
        </ul>
      </section>
    </div>
  );
}
