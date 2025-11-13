import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export function DetalhesMarketplace() {
  const { id } = useParams();
  const [anuncio, setAnuncio] = useState<any>(null);

  useEffect(() => {
    async function carregar() {
      const res = await fetch(`/api/marketplace/${id}`);
      const data = await res.json();
      setAnuncio(data);
    }
    carregar();
  }, [id]);

  if (!anuncio) return <p>Carregando...</p>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">{anuncio.titulo}</h1>
      <p>{anuncio.descricao}</p>

      <div className="grid grid-cols-3 gap-2">
        {anuncio.imagens_lista.map((img: string, i: number) => (
          <img
            key={i}
            src={`/uploads/marketplace/${img}`}
            className="w-full h-40 object-cover rounded-md"
          />
        ))}
      </div>

      <p className="text-lg font-semibold">
        Preço:{" "}
        {anuncio.preco
          ? anuncio.preco.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })
          : "—"}
      </p>

      <p>Vendedor: {anuncio.nome_vendedor}</p>
      <p>Apartamento: {anuncio.apartamento_vendedor}</p>
    </div>
  );
}
