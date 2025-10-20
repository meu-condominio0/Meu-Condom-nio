import React from 'react';
import { Button } from './ui/button';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';

interface BlogPostPageProps {
  postId: number;
  onBack?: () => void;
}

export function BlogPostPage({ postId, onBack }: BlogPostPageProps) {
  // Mock data - in real app would fetch based on postId
  const post = {
    title: 'Síndico profissional: o que muda na prática?',
    image: 'https://images.unsplash.com/photo-1581065178047-8ee15951ede6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MDM5MTUwN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Gestão',
    date: '10 de Outubro de 2025',
    author: 'Equipe MeuCondomínio',
    readTime: '8 min de leitura',
    content: `
      <p>A figura do síndico profissional vem ganhando cada vez mais espaço na gestão condominial brasileira. Diferente do síndico morador, que exerce a função de forma voluntária, o síndico profissional é contratado e remunerado para administrar o condomínio com dedicação exclusiva.</p>

      <h3>O que muda com um síndico profissional?</h3>
      
      <p>A principal diferença está no nível de dedicação e especialização. Enquanto o síndico morador concilia a gestão com suas atividades pessoais e profissionais, o síndico profissional tem a administração condominial como sua principal ocupação.</p>

      <p>Isso se traduz em:</p>
      
      <ul>
        <li><strong>Disponibilidade integral:</strong> O síndico profissional está sempre disponível para atender demandas urgentes e acompanhar de perto o dia a dia do condomínio.</li>
        <li><strong>Conhecimento técnico:</strong> Por atuar exclusivamente nesta área, desenvolve expertise em legislação, gestão financeira e relacionamento com fornecedores.</li>
        <li><strong>Imparcialidade:</strong> Por não morar no condomínio, tende a ser mais imparcial nas decisões, evitando conflitos de interesse.</li>
        <li><strong>Profissionalização da gestão:</strong> Implementa processos, controles e métricas que tornam a administração mais eficiente e transparente.</li>
      </ul>

      <h3>Responsabilidades e deveres</h3>

      <p>O síndico profissional assume as mesmas responsabilidades legais do síndico morador, mas com expectativas ampliadas de resultados. Entre suas principais atribuições estão:</p>

      <ul>
        <li>Gestão financeira completa, incluindo orçamento, controle de inadimplência e prestação de contas</li>
        <li>Supervisão de funcionários e fornecedores</li>
        <li>Manutenção preventiva e corretiva das áreas comuns</li>
        <li>Relacionamento com moradores e resolução de conflitos</li>
        <li>Cumprimento de obrigações legais e trabalhistas</li>
        <li>Organização de assembleias e documentação de decisões</li>
      </ul>

      <h3>Remuneração e custos</h3>

      <p>A remuneração do síndico profissional varia bastante conforme o porte do condomínio, complexidade da gestão e região. Em São Paulo, por exemplo, a média fica entre R$ 3.000 e R$ 8.000 mensais.</p>

      <p>É importante considerar que, embora represente um custo adicional, a contratação de um síndico profissional pode gerar economia através de:</p>

      <ul>
        <li>Negociações mais eficientes com fornecedores</li>
        <li>Redução da inadimplência</li>
        <li>Prevenção de problemas que gerariam custos maiores</li>
        <li>Melhor aproveitamento de recursos e planejamento financeiro</li>
      </ul>

      <h3>Quando vale a pena contratar?</h3>

      <p>A contratação de um síndico profissional faz mais sentido em algumas situações:</p>

      <ul>
        <li>Condomínios grandes (acima de 100 unidades)</li>
        <li>Empreendimentos com muitas áreas comuns e serviços</li>
        <li>Quando há histórico de conflitos entre moradores</li>
        <li>Dificuldade em encontrar moradores dispostos a assumir a função</li>
        <li>Necessidade de profissionalizar a gestão financeira</li>
      </ul>

      <h3>Tecnologia como aliada</h3>

      <p>Independente de ser profissional ou morador, todo síndico se beneficia de ferramentas tecnológicas que automatizam processos e facilitam a comunicação.</p>

      <p>Plataformas como o MeuCondomínio permitem:</p>

      <ul>
        <li>Gestão financeira integrada com emissão de boletos e controle de inadimplência</li>
        <li>Comunicação rápida e organizada com moradores</li>
        <li>Controle de reservas, chamados e ocorrências</li>
        <li>Transparência na prestação de contas</li>
        <li>Redução do tempo gasto em tarefas administrativas</li>
      </ul>

      <h3>Conclusão</h3>

      <p>A decisão entre síndico profissional e síndico morador deve considerar as características específicas de cada condomínio. O importante é garantir que, seja qual for a escolha, a gestão seja transparente, eficiente e conte com o apoio de ferramentas adequadas.</p>

      <p>O síndico profissional representa uma tendência de profissionalização da gestão condominial, trazendo expertise e dedicação integral. Combinado com a tecnologia certa, pode transformar a administração e a qualidade de vida dos moradores.</p>
    `,
  };

  return (
    <div className="w-full bg-white py-12">
      <div className="container-custom">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-8 text-[var(--brand-primary)] hover:text-[var(--brand-primary-600)] -ml-2"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Voltar para o blog
        </Button>

        <article className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="mb-4">
              <span className="inline-block px-4 py-1 bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] rounded-full text-sm font-bold">
                {post.category}
              </span>
            </div>
            <h1 className="mb-6">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-[var(--ink-muted)]">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-12 shadow-[var(--shadow-lg)]">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
            style={{
              fontSize: 'var(--text-body)',
              lineHeight: 'var(--line-body)',
              color: 'var(--ink-body)',
            }}
          />

          {/* CTA */}
          <div className="mt-16 pt-12 border-t border-[var(--border-soft)]">
            <div className="bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-primary-600)] rounded-2xl p-8 md:p-12 text-white text-center">
              <h3 className="text-white mb-4">Simplifique a gestão do seu condomínio</h3>
              <p className="text-lg mb-6 text-white/90">
                Descubra como o MeuCondomínio pode ajudar na sua gestão
              </p>
              <Button
                size="lg"
                className="bg-white text-[var(--brand-primary)] hover:bg-white/90"
              >
                Conhecer solução
              </Button>
            </div>
          </div>
        </article>
      </div>

      <style>{`
        .prose h3 {
          font-size: 24px;
          line-height: 32px;
          font-weight: 700;
          color: var(--ink-title);
          margin-top: 2em;
          margin-bottom: 1em;
        }
        
        .prose p {
          margin-bottom: 1.5em;
        }
        
        .prose ul {
          margin: 1.5em 0;
          padding-left: 1.5em;
        }
        
        .prose li {
          margin-bottom: 0.75em;
          padding-left: 0.5em;
        }
        
        .prose strong {
          font-weight: 700;
          color: var(--ink-title);
        }
      `}</style>
    </div>
  );
}
