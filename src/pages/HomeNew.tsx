// src/pages/HomeNew.tsx
import React from "react";

export default function HomeNew() {
  return (
    <>
      <style>{`
        :root {
          --bg: #0b1020; --bg-soft: #111734; --card: #0f1430;
          --text: #e6ecff; --text-dim: #b6c2ff;
          --brand: #6aa7ff; --brand-2: #5ef1c2; --accent: #9b8cff;
          --muted: rgba(255,255,255,0.08); --border: rgba(255,255,255,0.12);
          --shadow: 0 10px 30px rgba(0,0,0,0.35);
          --radius: 16px; --radius-lg: 22px; --radius-xl: 28px;
        }
        * { box-sizing: border-box; }
        .wrap { min-height: 100dvh; background:
          radial-gradient(1200px 800px at 10% -10%, rgba(106,167,255,.18), transparent 55%),
          radial-gradient(900px 600px at 110% 10%, rgba(94,241,194,.12), transparent 40%),
          var(--bg); color: var(--text); display: flex; flex-direction: column; }
        a { color: inherit; text-decoration: none; }
        a:focus-visible, button:focus-visible { outline: 2px solid var(--brand-2); outline-offset: 3px; border-radius: 10px; }
        .container { width: min(1100px, 92%); margin: 0 auto; }

        .header { position: sticky; top: 0; z-index: 20; backdrop-filter: saturate(160%) blur(8px);
          background: rgba(11,16,32,0.55); border-bottom: 1px solid var(--border); }
        .nav { display: flex; align-items: center; justify-content: space-between; gap: 16px; height: 68px; }
        .logo { font-size: 20px; font-weight: 800; letter-spacing: .2px; position: relative; display: inline-block;
          background: linear-gradient(90deg, #fff 0%, #d8e4ff 50%, #fff 100%);
          -webkit-background-clip: text; background-clip: text; color: transparent; }
        .logo::after { content: ""; position: absolute; inset: 0;
          background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,.0) 35%, rgba(255,255,255,.8) 50%, rgba(255,255,255,.0) 65%, transparent 100%);
          transform: translateX(-120%); animation: shine 3.2s linear infinite; mix-blend-mode: screen; }
        @keyframes shine { 0% { transform: translateX(-120%);} 60%,100% { transform: translateX(120%);} }
        .menu { display: flex; gap: 16px; align-items: center; }
        .menu a { padding: 8px 12px; border-radius: 12px; color: var(--text-dim);
          transition: transform .15s, background .15s, color .15s; }
        .menu a:hover { background: var(--muted); color: #fff; transform: translateY(-1px); }
        .cta { padding: 10px 16px; border-radius: 14px; border: 1px solid var(--border);
          background: linear-gradient(180deg, rgba(106,167,255,.15), rgba(106,167,255,.06));
          color: #fff; font-weight: 600; box-shadow: var(--shadow);
          transition: transform .15s, box-shadow .15s, background .2s; }
        .cta:hover { transform: translateY(-1px) scale(1.01); box-shadow: 0 12px 34px rgba(106,167,255,.25); }

        .hero { padding: 72px 0 28px; text-align: center; }
        .eyebrow { display: inline-flex; align-items: center; gap: 8px; padding: 6px 12px; border-radius: 999px;
          border: 1px solid var(--border); background: rgba(255,255,255,.04); color: var(--text-dim); font-size: 12px; }
        .h1 { margin: 18px auto 12px; font-size: clamp(28px, 4.2vw, 44px); line-height: 1.1; font-weight: 900; letter-spacing: -0.5px; max-width: 900px;
          background: linear-gradient(180deg, #ffffff 0%, #dfe7ff 100%); -webkit-background-clip: text; background-clip: text; color: transparent; }
        .sub { margin: 0 auto 26px; color: var(--text-dim); font-size: 16px; line-height: 1.6; max-width: 760px; }
        .hero-ctas { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
        .btn { padding: 12px 18px; border-radius: 14px; border: 1px solid var(--border); font-weight: 700; letter-spacing: .2px; cursor: pointer;
          transition: transform .15s, box-shadow .15s, background .2s; background: linear-gradient(180deg, rgba(94,241,194,.2), rgba(94,241,194,.06));
          box-shadow: var(--shadow); }
        .btn:hover { transform: translateY(-1px) scale(1.01); }
        .btn.secondary { background: linear-gradient(180deg, rgba(155,140,255,.16), rgba(155,140,255,.06)); }

        .section { padding: 40px 0; }
        .feature { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 26px; align-items: center; background: rgba(255,255,255,.03);
          border: 1px solid var(--border); border-radius: var(--radius-xl); padding: 26px; }
        .feature h2 { font-size: clamp(22px, 3.1vw, 30px); margin: 8px 0 10px; font-weight: 800; }
        .tag { display: inline-flex; align-items: center; gap: 8px; padding: 6px 10px; border-radius: 999px;
          background: rgba(106,167,255,.12); color: #dfe9ff; font-size: 12px; border: 1px solid var(--border); }
        .illus { min-height: 180px; border-radius: var(--radius-lg);
          background: linear-gradient(120deg, rgba(106,167,255,.18), rgba(94,241,194,.14)); border: 1px solid var(--border);
          position: relative; overflow: hidden; }
        .illus::before, .illus::after { content: ""; position: absolute; border-radius: 999px; filter: blur(20px); }
        .illus::before { width: 160px; height: 160px; background: rgba(106,167,255,.38); top: -30px; right: -10px; animation: float1 6s ease-in-out infinite; }
        .illus::after { width: 220px; height: 220px; background: rgba(94,241,194,.32); bottom: -40px; left: -20px; animation: float2 7s ease-in-out infinite; }
        @keyframes float1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(12px)} }
        @keyframes float2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }

        .grid { display: grid; gap: 16px; grid-template-columns: repeat(6, 1fr); }
        @media (max-width: 1024px) { .grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 640px)  { .grid { grid-template-columns: repeat(1, 1fr); } }

        .card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 18px; min-height: 140px;
          transition: transform .15s, background .2s, border-color .2s; }
        .card:hover { transform: translateY(-2px); background: var(--bg-soft); border-color: rgba(255,255,255,.18); }
        .card h3 { margin: 0 0 8px; font-size: 16px; }
        .card p  { margin: 0; color: var(--text-dim); font-size: 14px; line-height: 1.5; }

        .footer { margin-top: auto; border-top: 1px solid var(--border); background: rgba(255,255,255,.03); }
        .foot { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 22px 0; color: var(--text-dim); font-size: 14px; }
      `}</style>

      <div className="wrap">
        <header className="header" role="banner">
          <div className="container nav">
            <a href="/" className="logo" aria-label="MeuCondomínio — voltar ao início">MeuCondomínio</a>
            <nav className="menu" aria-label="Navegação principal">
              <a href="/solucoes">Soluções</a>
              <a href="/precos">Preços</a>
              <a href="/sobre">Sobre</a>
              <a href="/suporte">Suporte</a>
              <a href="/blog">Blog</a>
              <a href="/entrar" className="cta" aria-label="Entrar">Entrar</a>
            </nav>
          </div>
        </header>

        <section className="hero" aria-labelledby="titulo-hero">
          <div className="container">
            <span className="eyebrow" aria-hidden="true">• lançamento • experiência premium</span>
            <h1 id="titulo-hero" className="h1">
              Gestão de condomínio que dá superpoderes ao síndico — e uma vida mais simples aos moradores.
            </h1>
            <p className="sub">
              Financeiro afiado, comunicação fluida e operações sob controle.
              Agora com <strong>Marketplace no condomínio</strong>: venda e contrate serviços sem sair do app.
            </p>
            <div className="hero-ctas" role="group" aria-label="Ações principais">
              <a href="/comece" className="btn" aria-label="Começar agora">Começar agora</a>
              <a href="/demo" className="btn secondary" aria-label="Ver demonstração">Ver demo</a>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="titulo-market">
          <div className="container feature">
            <div>
              <span className="tag" aria-hidden="true">Diferencial exclusivo</span>
              <h2 id="titulo-market">Marketplace no seu condomínio</h2>
              <p style={{color: "var(--text-dim)", lineHeight: 1.6, marginBottom: 14}}>
                Moradores vendem produtos e oferecem serviços como um <em>OLX</em> — mas com a segurança do seu
                condomínio. Economia local, confiança máxima e praticidade absurda.
              </p>
              <div style={{display: "flex", gap: 10, flexWrap: "wrap"}}>
                <a href="/marketplace" className="btn" aria-label="Explorar marketplace">Explorar marketplace</a>
                <a href="/entrar" className="btn secondary" aria-label="Entrar para anunciar">Entrar para anunciar</a>
              </div>
            </div>
            <div className="illus" role="img" aria-label="Ilustração abstrata do marketplace"></div>
          </div>
        </section>

        <section className="section" aria-labelledby="titulo-beneficios">
          <div className="container">
            <h2 id="titulo-beneficios" style={{fontSize: "22px", fontWeight: 800, marginBottom: 14}}>
              Tudo o que um condomínio moderno precisa
            </h2>
            <div className="grid">
              <article className="card"><h3>Financeiro de alta precisão</h3><p>Boletos, inadimplência e relatórios sem sofrimento. Dados claros para decisões rápidas.</p></article>
              <article className="card"><h3>Comunicação que engaja</h3><p>Avisos, enquetes e mensagens com confirmação de leitura. Adeus murais ignorados.</p></article>
              <article className="card"><h3>Reservas sem dor de cabeça</h3><p>Áreas comuns com regras, horários e multas automáticas. Transparência total.</p></article>
              <article className="card"><h3>Atendimentos e manutenções</h3><p>Chamados, SLA e histórico por unidade. O problema aparece e some — com rastreio.</p></article>
              <article className="card"><h3>Marketplace interno</h3><p>Compre e venda com quem mora do seu lado. Mais segurança, menos fricção.</p></article>
              <article className="card"><h3>Relatórios e auditoria</h3><p>Transparência blindada para síndicos e conselheiros. Tudo auditável, tudo profissional.</p></article>
            </div>
          </div>
        </section>

        <footer className="footer" role="contentinfo">
          <div className="container foot">
            <span>© {new Date().getFullYear()} MeuCondomínio</span>
            <nav className="menu" aria-label="Links do rodapé">
              <a href="/privacidade">Privacidade</a>
              <a href="/termos">Termos</a>
              <a href="/contato">Contato</a>
            </nav>
          </div>
        </footer>
      </div>
    </>
  );
}
