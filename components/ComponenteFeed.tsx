import { Heart, MessageCircle, Share2, Clock, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PostFeed {
  id: string;
  autor: string;
  cargo: string;
  avatar: string;
  conteudo: string;
  imagem?: string;
  timestamp: string;
  curtidas: number;
  comentarios: number;
  tipo: 'comunicado' | 'evento' | 'manutencao' | 'aviso';
  curtido?: boolean;
}

const postsMock: PostFeed[] = [
  {
    id: '1',
    autor: 'Keven',
    cargo: 'Síndico',
    avatar: 'K',
    conteudo: 'A piscina realmente ficou bem melhor! O novo sistema de filtragem está funcionando perfeitamente e a água está cristalina.',
    imagem: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=300&fit=crop',
    timestamp: '2 horas',
    curtidas: 12,
    comentarios: 3,
    tipo: 'comunicado'
  },
  {
    id: '2',
    autor: 'Ana',
    cargo: 'Moradora - Apt 205',
    avatar: 'A',
    conteudo: 'A pintura do estacionamento fez muita diferença! Agora está muito mais organizado e fácil de localizar as vagas.',
    imagem: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=400&h=300&fit=crop',
    timestamp: '4 horas',
    curtidas: 8,
    comentarios: 1,
    tipo: 'aviso'
  },
  {
    id: '3',
    autor: 'Marcus',
    cargo: 'Porteiro',
    avatar: 'M',
    conteudo: 'Quer tirar essa iluminação próxima aos elevadores? A instalação nova deixou tudo mais moderno e seguro.',
    imagem: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop',
    timestamp: '6 horas',
    curtidas: 15,
    comentarios: 5,
    tipo: 'manutencao'
  }
];

interface ComponenteFeedProps {
  tipo?: 'morador' | 'sindico';
}

export function ComponenteFeed({ tipo = 'morador' }: ComponenteFeedProps = {}) {
  const getTipoBadge = (tipoPost: string) => {
    const badges = {
      comunicado: { label: 'Comunicado', variant: 'default' as const },
      evento: { label: 'Evento', variant: 'secondary' as const },
      manutencao: { label: 'Manutenção', variant: 'destructive' as const },
      aviso: { label: 'Aviso', variant: 'outline' as const }
    };
    return badges[tipoPost as keyof typeof badges] || badges.comunicado;
  };

  return (
    <div className="space-y-6">
      {/* Alert de manutenção (exemplo) */}
      <Card className="border-orange-200 bg-orange-50 dark:border-orange-900 dark:bg-orange-950/50">
        <CardContent className="flex items-center gap-4 p-6">
          <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/50">
            <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <p className="font-semibold text-orange-800 dark:text-orange-200">
              Manutenção da piscina - 08/05
            </p>
            <p className="text-sm text-orange-700 dark:text-orange-300">
              A área ficará indisponível das 8h às 17h
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Feed de posts */}
      <div className="space-y-6">
        {postsMock.map((post) => (
          <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                      {post.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground">{post.autor}</p>
                    <p className="text-sm text-muted-foreground">{post.cargo}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge {...getTipoBadge(post.tipo)}>
                    {getTipoBadge(post.tipo).label}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {post.timestamp}
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0 space-y-4">
              <p className="text-base leading-relaxed text-foreground">{post.conteudo}</p>
              
              {post.imagem && (
                <div className="rounded-xl overflow-hidden">
                  <ImageWithFallback
                    src={post.imagem}
                    alt="Imagem do post"
                    className="w-full h-56 sm:h-64 object-cover"
                  />
                </div>
              )}

              <Separator />

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-6">
                  <Button variant="ghost" size="sm" className="gap-2 hover:text-red-500 transition-colors">
                    <Heart className={`h-4 w-4 ${post.curtido ? 'fill-red-500 text-red-500' : ''}`} />
                    <span className="font-medium">{post.curtidas}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2 hover:text-blue-500 transition-colors">
                    <MessageCircle className="h-4 w-4" />
                    <span className="font-medium">{post.comentarios}</span>
                  </Button>
                </div>
                <Button variant="ghost" size="sm" className="hover:text-green-500 transition-colors">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}