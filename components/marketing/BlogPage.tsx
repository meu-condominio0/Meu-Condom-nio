import { useEffect } from 'react';
import { MarketingLayout, type MarketingPageProps } from './MarketingLayout';

interface PostPreview {
  titulo: string;
  categoria: string;
  resumo: string;
  data: string;
}

const POSTS: PostPreview[] = [
  {
    titulo: 'Como reduzir a inadimplência com acordos digitais',
    categoria: 'Financeiro',
    resumo: 'Um guia prático com scripts de comunicação, fluxos automatizados e indicadores para acompanhar.',
    data: 'Set 2024',
  },
  {
    titulo: 'Checklist de transição para uma nova administradora',
    categoria: 'Operações',
    resumo: 'Os passos essenciais para migrar dados, comunicar moradores e manter o conselho informado.',
    data: 'Ago 2024',
  },
  {
    titulo: 'Marketplace interno: como criar uma comunidade ativa',
    categoria: 'Comunidade',
    resumo: 'Cases reais de condomínios que transformaram o marketplace em fonte de renda e bem-estar.',
    data: 'Jul 2024',
  },
];

const NEWSLETTER_POINTS = [
  'Insights mensais com dados de mais de 2.000 condomínios',
  'Agenda de eventos exclusivos para síndicos e administradoras',
  'Acesso antecipado a novas funcionalidades',
];

export function MarketingBlogPage({ onNavigate, onLogin }: MarketingPageProps) {
  useEffect(() => {
    document.title = 'Blog — MeuCondomínio';
  }, []);

  return (
    <MarketingLayout currentPath="/blog" onNavigate={onNavigate} onLogin={onLogin}>
      <section className="marketing-section" aria-labelledby="blog-heading">
        <div className="marketing-section-header">
          <span className="marketing-badge" aria-hidden="true">
            Conteúdo para lideranças condominiais
          </span>
          <h1 id="blog-heading" className="marketing-title">
            Insights, guias e histórias para o condomínio do futuro.
          </h1>
          <p className="marketing-lead">
            Receba materiais estratégicos produzidos com dados reais da nossa base e especialistas convidados.
          </p>
        </div>
      </section>

      <section className="marketing-section" aria-labelledby="posts-heading">
        <h2 id="posts-heading" className="marketing-tagline">
          Destaques recentes.
        </h2>

        <div className="marketing-grid">
          {POSTS.map((post) => (
            <article key={post.titulo} className="marketing-card" aria-label={post.titulo}>
              <span className="marketing-badge" aria-hidden="true">
                {post.categoria}
              </span>
              <h3>{post.titulo}</h3>
              <p>{post.resumo}</p>
              <span className="marketing-note">{post.data}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="marketing-section" aria-labelledby="newsletter-heading">
        <div className="marketing-section-header">
          <span className="marketing-badge" aria-hidden="true">
            Newsletter
          </span>
          <h2 id="newsletter-heading" className="marketing-tagline">
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <svg aria-hidden width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.5v7A2.5 2.5 0 0 0 5.5 18h13a2.5 2.5 0 0 0 2.5-2.5v-7" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5 12 13 3 7.5" />
              </svg>
              Assine para receber novidades e convites.
            </span>
          </h2>
          <p className="marketing-subtitle">
            Sem spam. Um e-mail por mês com os melhores conteúdos e aprendizados da nossa comunidade.
          </p>
        </div>

        <div className="marketing-grid-2">
          <div className="marketing-card" aria-label="Benefícios da newsletter">
            <h3>Por que assinar?</h3>
            <ul className="marketing-list">
              {NEWSLETTER_POINTS.map((point) => (
                <li key={point}>
                  <strong>•</strong>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <form
            className="marketing-card"
            aria-label="Formulário de assinatura"
            onSubmit={(event) => {
              event.preventDefault();
              onNavigate('/comece');
            }}
          >
            <h3>Receba os próximos conteúdos</h3>
            <p className="marketing-subtitle">Informe seu e-mail corporativo para começar.</p>
            <label style={{ display: 'grid', gap: 8 }}>
              <span className="marketing-note">E-mail</span>
              <input
                type="email"
                required
                placeholder="voce@suaempresa.com"
                style={{
                  padding: '12px 14px',
                  borderRadius: 12,
                  border: '1px solid var(--border)',
                  background: 'var(--card)',
                  color: 'var(--text)',
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
                background: 'linear-gradient(180deg, #60756B, #344E41)',
                color: '#fff',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Quero receber
            </button>
            <p className="marketing-note">Ao enviar, você concorda em receber comunicações do MeuCondomínio.</p>
          </form>
        </div>
      </section>
    </MarketingLayout>
  );
}
