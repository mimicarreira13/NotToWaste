import { useEffect, useState } from "react";
import { getDishes, type Prato } from "../api/client_requests";
import type { DishItem } from "../data/clientItems";

const placeholderSvg = encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'>
    <rect width='100%' height='100%' fill='#ddd'/>
    <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'
          fill='#666' font-size='20'>
      Imagem aqui
    </text>
  </svg>`
);
const PLACEHOLDER = `data:image/svg+xml;utf8,${placeholderSvg}`;

export default function useDishes() {
    const [dishes, setDishes] = useState<DishItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        (async () => {
            setLoading(true);
            try {
                const pratos: Prato[] = await getDishes();

                const mapped: DishItem[] = (pratos ?? [])
                    .filter((p) => !!p.nome)
                    .map((p) => ({
                        id: p.id,
                        name: p.nome,
                        ingredients: (p.pratoIngredientes ?? [])
                            .map((pi) => pi.nome?.trim())
                            .filter((n): n is string => n !== ""),
                        image: p.caminhoImagem ?? PLACEHOLDER,
                        available: p.disponivel,
                    }));

                // disponíveis primeiro, depois ordem alfabética
                mapped.sort((a, b) => {
                    const avA = a.available === false ? 0 : 1;
                    const avB = b.available === false ? 0 : 1;
                    if (avA !== avB) return avB - avA;
                    return a.name.localeCompare(b.name);
                });

                if (mounted) setDishes(mapped);
            } catch (error) {
                console.error("Failed to load dishes:", error);
                if (mounted) setDishes([]);
            } finally {
                if (mounted) setLoading(false);
            }
        })();

        return () => {
            mounted = false;
        };
    }, []);

    return { dishes, loading };
}
