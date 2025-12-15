// File: `src/hooks/useDishes.ts`
import { useEffect, useState } from "react";
import { getDishes, type Prato } from "../api/client_requests";
import type { DishItem } from "../data/clientItems";

const placeholderSvg = encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'>
     <rect width='100%' height='100%' fill='#ddd'/>
     <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#666' font-size='20'>Imagem aqui</text>
   </svg>`
);
const PLACEHOLDER = `data:image/svg+xml;utf8,${placeholderSvg}`;

type ApiPratoIngrediente = {
    ingredienteId?: string | number;
    ingrediente?: { nome?: string } | null;
    quantidade?: number;
    id?: string;
};

export default function useDishes() {
    const [dishes, setDishes] = useState<DishItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        let mounted = true;

        (async () => {
            setLoading(true);
            try {
                const pratos = (await getDishes()) as Prato[];

                const mapped = (pratos ?? [])
                    .filter((p) => p.nome !== null && p.nome !== undefined)
                    .map((p) => {
                        const ingredientNames = (p.pratoIngredientes ?? [])
                            .map((pi) => {
                                const apiPi = pi as unknown as ApiPratoIngrediente;
                                // safely read nested nome when ingrediente is an object
                                const nestedName =
                                    typeof apiPi.ingrediente === "object" && typeof apiPi.ingrediente?.nome === "string"
                                        ? apiPi.ingrediente!.nome!.trim()
                                        : undefined;
                                if (nestedName && nestedName !== "") return nestedName;
                                // fallback to ingredienteId if no nested name
                                return apiPi.ingredienteId ? String(apiPi.ingredienteId) : undefined;
                            })
                            .filter((n): n is string => typeof n === "string" && n.trim() !== "");

                        return {
                            id: p.id,
                            name: p.nome,
                            ingredients: ingredientNames,
                            image: p.caminhoImagem ?? PLACEHOLDER,
                            available: p.disponivel,
                        } as DishItem;
                    });

                // sort so available dishes appear first
                mapped.sort((a, b) => {
                    const avA = a.available === false ? 0 : 1;
                    const avB = b.available === false ? 0 : 1;
                    if (avA !== avB) return avB - avA;
                    return String(a.name ?? "").localeCompare(String(b.name ?? ""));
                });

                if (mounted) setDishes(mapped);
            } catch (err) {
                console.error("Failed to load dishes:", err);
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