import { Facebook, Instagram, Linkedin } from 'lucide-react';

const POSTS = [
  {
    title: 'Síndico profissional: o que muda na prática?',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Como reduzir inadimplência em 30 dias (sem briga).',
    image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Portaria digital: do QR à liberação 1-toque.',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80',
  },
];

export function NewsSection() {
  return (
    <section className="px-4 py-20" aria-labelledby="news-heading">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 text-slate-500">
            <Facebook className="size-5" aria-hidden="true" />
            <Instagram className="size-5" aria-hidden="true" />
            <Linkedin className="size-5" aria-hidden="true" />
          </div>
          <h2 id="news-heading" className="text-3xl font-semibold text-slate-900 sm:text-4xl">
            Novidades
          </h2>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {POSTS.map((post) => (
            <article key={post.title} className="space-y-4">
              <div className="overflow-hidden rounded-3xl shadow-lg">
                <img src={post.image} alt={post.title} className="h-52 w-full object-cover" loading="lazy" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">{post.title}</h3>
              <button
                type="button"
                className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-900 underline-offset-4 transition hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-500 focus-visible:outline-offset-2"
              >
                Saiba mais →
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
