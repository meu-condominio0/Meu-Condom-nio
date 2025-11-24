import { useEffect } from 'react';
import { MarketingLayout, type MarketingPageProps } from './MarketingLayout';

const ETAPAS = [
  {
    titulo: 'Exploração',
    descricao: 'Entendemos sua operação, principais dores e objetivos com a plataforma.',
    detalhes: ['Reunião de diagnóstico de 45 minutos', 'Análise dos sistemas atuais', 'Mapeamento das integrações necessárias'],
  },
  {
    titulo: 'Plano de implantação',
    descricao: 'Configuramos o ambiente, definimos prazos e responsabilidades compartilhadas.',
    detalhes: ['Importação de dados assistida', 'Treinamentos específicos por perfil', 'Plano de comunicação com moradores'],
  },
  {
    titulo: 'Go-live e expansão',
    descricao: 'Acompanhamos o lançamento, monitoramos indicadores e ativamos novos módulos.',
    detalhes: ['Squad dedicado nas primeiras semanas', 'Análises quinzenais com gerente de sucesso', 'Roadmap conjunto de melhorias'],
  },
];

export function MarketingComecePage({ onNavigate, onLogin }: MarketingPageProps) {
  useEffect(() => {
    document.title = 'Comece agora | MeuCondomínio';
  }, []);

  return (
    <MarketingLayout currentPath="/comece" onNavigate={onNavigate} onLogin={onLogin}>
      <section className="marketing-section" aria-labelledby="comece-heading">
        <div className="marketing-section-header">
          <span className="marketing-badge" aria-hidden="true">
            Comece em 48 horas
          </span>
          <h1 id="comece-heading" className="marketing-title">
            Vamos levar a experiência do seu condomínio para o próximo nível.
          </h1>
          <p className="marketing-lead">
            Preencha o formulário e nosso time comercial entrará em contato com um plano personalizado para sua operação.
          </p>
        </div>
      </section>

      <section className="marketing-section" aria-labelledby="form-heading">
        <div className="marketing-grid-2">
          <form
            className="marketing-card"
            aria-labelledby="form-heading"
            onSubmit={(event) => {
              event.preventDefault();
              onLogin();
            }}
          >
            <h2 id="form-heading">Conte mais sobre o seu condomínio</h2>
            <p className="marketing-subtitle">
              Responder leva menos de 2 minutos. Usamos essas informações para preparar a demonstração ideal.
            </p>

            <label style={{ display: 'grid', gap: 8 }}>
              <span className="marketing-note">Nome completo</span>
              <input
                required
                placeholder="Nome e sobrenome"
                style={{
                  padding: '12px 14px',
                  borderRadius: 12,
                  border: '1px solid var(--border)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#fff',
                }}
              />
            </label>

            <label style={{ display: 'grid', gap: 8 }}>
              <span className="marketing-note">E-mail corporativo</span>
              <input
                type="email"
                required
                placeholder="voce@suaempresa.com"
                style={{
                  padding: '12px 14px',
                  borderRadius: 12,
                  border: '1px solid var(--border)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#fff',
                }}
              />
            </label>

            <label style={{ display: 'grid', gap: 8 }}>
              <span className="marketing-note">Quantidade de condomínios</span>
              <select
                required
                style={{
                  padding: '12px 14px',
                  borderRadius: 12,
                  border: '1px solid var(--border)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#fff',
                }}
              >
                <option value="" disabled>
                  Selecione uma opção
                </option>
                <option value="ate-5">Até 5</option>
                <option value="6-20">De 6 a 20</option>
                <option value="21-100">De 21 a 100</option>
                <option value="101+">Mais de 100</option>
              </select>
            </label>

            <label style={{ display: 'grid', gap: 8 }}>
              <span className="marketing-note">Principal objetivo</span>
              <textarea
                rows={3}
                placeholder="Conte brevemente o que deseja melhorar"
                style={{
                  padding: '12px 14px',
                  borderRadius: 12,
                  border: '1px solid var(--border)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#fff',
                  resize: 'vertical',
                }}
              />
            </label>

            <button
              type="submit"
              style={{
                marginTop: 16,
                padding: '12px 18px',
                borderRadius: 14,
                border: '1px solid var(--border)',
                background: 'linear-gradient(180deg, rgba(94, 241, 194, 0.2), rgba(94, 241, 194, 0.06))',
                color: '#05142e',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Quero uma demonstração
            </button>
            <p className="marketing-note">Prometemos responder em até 1 dia útil.</p>
          </form>

          <div className="marketing-card" aria-label="Etapas de implantação">
            <h2>Como conduzimos a implantação</h2>
            <ul className="marketing-list">
              {ETAPAS.map((etapa, index) => (
                <li key={etapa.titulo}>
                  <strong>{index + 1}.</strong>
                  <span>
                    <strong>{etapa.titulo}</strong>: {etapa.descricao}
                  </span>
                  <ul className="marketing-list" style={{ marginLeft: 28 }}>
                    {etapa.detalhes.map((detalhe) => (
                      <li key={detalhe}>
                        <strong>•</strong>
                        <span>{detalhe}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="marketing-section" aria-labelledby="cta-heading">
        <div className="marketing-section-header">
          <span className="marketing-badge" aria-hidden="true">
            Preferir contato direto?
          </span>
          <h2 id="cta-heading" className="marketing-tagline">
            Nosso time comercial está disponível pelo WhatsApp.
          </h2>
          <p className="marketing-subtitle">Segunda a sexta, das 8h às 19h (horário de Brasília).</p>
        </div>

        <div className="marketing-hero-actions" role="group" aria-label="Atalhos de contato">
          <a
            href="https://wa.me/5500000000000"
            onClick={(event) => {
              event.preventDefault();
              if (typeof window !== 'undefined') {
                window.open('https://wa.me/5500000000000', '_blank', 'noopener');
              }
            }}
          >
            Iniciar conversa
          </a>
          <a
            className="secondary"
            href="/entrar"
            onClick={(event) => {
              event.preventDefault();
              onLogin();
            }}
          >
            Já sou cliente
          </a>
        </div>
      </section>
    </MarketingLayout>
  );
}
