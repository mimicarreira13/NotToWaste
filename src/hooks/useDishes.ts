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

function mapPratoToDishItem(p: Prato): DishItem {
    return {
        id: p.id,
        name: p.nome ?? "",
        ingredients: (p.pratoIngredientes ?? []).map((pi) => String(pi.ingredienteId)),
        image: PLACEHOLDER,
        available: p.disponivel ?? true,
    };
}

export default function useDishes() {
    const [dishes, setDishes] = useState<DishItem[]>([]);
    //const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const pratos = await getDishes();
                const mapped = (pratos ?? [])
                    .filter((p) => p.nome !== null && p.nome !== undefined)
                    .map(mapPratoToDishItem);
                if (mounted) setDishes(mapped.length ? mapped : []);
            } catch (err) {
                console.error("Failed to load pratos:", err);
            } finally {
                //if (mounted) setLoading(false);
            }
        })();
        return () => {
            mounted = false;
        };
    }, []);

    return { dishes, /*loading*/ };
}