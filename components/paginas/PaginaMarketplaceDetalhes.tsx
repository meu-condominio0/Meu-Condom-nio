import { useState } from "react";
import { ChevronLeft, ChevronRight, Phone, MessageCircle, MapPin, X } from "lucide-react";

type Contato = {
  telefone?: string;
  whatsapp?: string;
};

type Vendedor = {
  nome: string;
  apartamento: string;
};

type AnuncioDetalhes = {
  titulo: string;
  descricao: string;
  preco?: number;
  imagens: string[];
  contato: Contato;
  vendedor?: Vendedor;
  dataPublicacao?: string;
  categoria?: string;
  subcategoria?: string;
};

interface PaginaMarketplaceDetalhesProps {
  anuncio: AnuncioDetalhes | null;
  onVoltar: () => void;
}

export function PaginaMarketplaceDetalhes({
  anuncio,
  onVoltar,
}: PaginaMarketplaceDetalhesProps) {
  if (!anuncio) {
    return (
      <div className="p-6 space-y-4">
        <button className="bg-gray-700 text-white px-4 py-2 rounded" onClick={onVoltar}>
          ← Voltar
        </button>
        <p>Carregando anúncio...</p>
      </div>
    );
  }

  const imagens =
    anuncio.imagens?.length > 0
      ? anuncio.imagens
      : [
          "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=600&fit=crop",
        ];

  const [indiceAtual, setIndiceAtual] = useState(0);
  const [modalAberto, setModalAberto] = useState(false);

  const irAnterior = () => {
    setIndiceAtual((prev) => (prev === 0 ? imagens.length - 1 : prev - 1));
  };

  const irProximo = () => {
    setIndiceAtual((prev) => (prev === imagens.length - 1 ? 0 : prev + 1));
  };

  const imagemAtual = imagens[indiceAtual];

  return (
    <div className="space-y-6 p-4 max-w-5xl mx-auto">
      {/* VOLTAR */}
      <button
        className="bg-gray-700 text-white px-4 py-2 rounded mb-2 hover:bg-gray-600 transition"
        onClick={onVoltar}
      >
        ← Voltar
      </button>

      {/* TÍTULO */}
      <h1 className="text-2xl font-bold">{anuncio.titulo}</h1>

      {/* ================================
           GALERIA / SLIDER
         ================================ */}
      <div className="space-y-3">
        <div className="relative w-full aspect-[16/6] rounded-xl overflow-hidden bg-black/40">
          <img
            src={imagemAtual}
            alt={anuncio.titulo}
            className="w-full h-full object-cover cursor-pointer transition-all duration-300"
            onClick={() => setModalAberto(true)}
          />

          {imagens.length > 1 && (
            <>
              {/* ESQUERDA */}
              <button
                onClick={irAnterior}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full p-2 hover:bg-black/80 transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* DIREITA */}
              <button
                onClick={irProximo}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full p-2 hover:bg-black/80 transition"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* INDICADOR */}
              <div className="absolute bottom-3 right-4 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
                {indiceAtual + 1} / {imagens.length}
              </div>
            </>
          )}
        </div>

        {/* MINIATURAS */}
        {imagens.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-1">
            {imagens.map((img, index) => (
              <button
                key={index}
                onClick={() => setIndiceAtual(index)}
                className={`relative rounded-md overflow-hidden border ${
                  index === indiceAtual
                    ? "border-blue-500 ring-2 ring-blue-400"
                    : "border-neutral-300 hover:border-blue-300"
                }`}
              >
                <img src={img} alt={`mini-${index}`} className="w-24 h-16 object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* MODAL FULLSCREEN */}
      {modalAberto && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setModalAberto(false)}
        >
          <button
            className="absolute top-6 right-6 bg-white/20 text-white p-2 rounded-full hover:bg-white/30 transition"
            onClick={(e) => {
              e.stopPropagation();
              setModalAberto(false);
            }}
          >
            <X className="w-6 h-6" />
          </button>

          <img
            src={imagemAtual}
            className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-lg"
          />
        </div>
      )}

      {/* DESCRIÇÃO */}
      <div className="space-y-2">
        <p className="text-base leading-relaxed">{anuncio.descricao}</p>

        <p className="text-green-500 font-bold text-xl">
          {anuncio.preco ? `R$ ${anuncio.preco}` : "Preço não informado"}
        </p>
      </div>

      {/* INFO DO VENDEDOR */}
      {(anuncio.vendedor || anuncio.dataPublicacao || anuncio.categoria) && (
        <div className="space-y-1 text-sm text-muted-foreground">
          {anuncio.vendedor && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>
                {anuncio.vendedor.nome} — Apt {anuncio.vendedor.apartamento}
              </span>
            </div>
          )}

          {anuncio.dataPublicacao && <p>Publicado em {anuncio.dataPublicacao}</p>}

          {anuncio.categoria && (
            <p>
              Categoria: <strong>{anuncio.categoria}</strong>
              {anuncio.subcategoria && ` • ${anuncio.subcategoria}`}
            </p>
          )}
        </div>
      )}

      {/* CONTATO */}
      <div className="mt-4 space-y-2">
        <h3 className="font-semibold text-lg">Contato</h3>
        <div className="flex flex-wrap gap-3">
          {anuncio.contato.telefone && (
            <button className="inline-flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition">
              <Phone className="w-4 h-4" />
              {anuncio.contato.telefone}
            </button>
          )}

          {anuncio.contato.whatsapp && (
            <button className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
