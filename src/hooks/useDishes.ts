// File: `src/hooks/useDishes.ts`
import { useEffect, useState, useRef } from "react";
import { getDishes, getIngredientById, type Prato } from "../api/client_requests";
import type { DishItem } from "../data/clientItems";

const placeholderSvg = encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'>
     <rect width='100%' height='100%' fill='#ddd'/>
     <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#666' font-size='20'>Imagem aqui</text>
   </svg>`
);
const PLACEHOLDER = `data:image/svg+xml;utf8,${placeholderSvg}`;

function mapPratoToDishItem(p: Prato, ingredientNameFor: (id: string) => string): DishItem {
    return {
        id: p.id,
        name: p.nome ?? "",
        ingredients: (p.pratoIngredientes ?? []).map((pi) => ingredientNameFor(String(pi.ingredienteId))),
        image: p.caminhoImagem ?? PLACEHOLDER,
        available: p.disponivel ?? true,
    };
}

export default function useDishes() {
    const [dishes, setDishes] = useState<DishItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const cacheRef = useRef<Record<string, string>>({});

    useEffect(() => {
        let mounted = true;

        (async () => {
            setLoading(true);
            try {
                const pratos = await getDishes();
                const allIds = new Set<string>();
                (pratos ?? []).forEach((p) => {
                    (p.pratoIngredientes ?? []).forEach((pi) => {
                        if (pi?.ingredienteId) allIds.add(String(pi.ingredienteId));
                    });
                });

                const missing = Array.from(allIds).filter((id) => !cacheRef.current[id]);

                await Promise.all(
                    missing.map(async (id) => {
                        try {
                            const ing = await getIngredientById(id);
                            if (ing && ing.nome) cacheRef.current[id] = ing.nome;
                            else cacheRef.current[id] = id;
                        } catch (err) {
                            console.error("Failed to load ingredient", id, err);
                            cacheRef.current[id] = id;
                        }
                    })
                );

                const mapped = (pratos ?? [])
                    .filter((p) => p.nome !== null && p.nome !== undefined)
                    .map((p) => mapPratoToDishItem(p, (id) => cacheRef.current[id] ?? id));

                // sort so available dishes appear first
                mapped.sort((a, b) => {
                    if (a.available === b.available) return 0;
                    return a.available ? -1 : 1;
                });

                if (mounted) setDishes(mapped);
            } catch (err) {
                console.error("Failed to load pratos:", err);
                if (mounted) setDishes([]);
            } finally {
                if (mounted) setLoading(false);
            }
        })();

        return () => {
            mounted = false;
        };
    }, []);

    return { dishes, loading  };
}