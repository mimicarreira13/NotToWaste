// typescript
// File: `src/hooks/useReports.ts`
import { useEffect, useState } from "react";
import sustImg from "../assets/images/reports/sustentabilidade.png";
import ingImg from "../assets/images/reports/ingredients.png";
import {
    fetchAvailableSustainabilityYears,
    fetchAvailableIngredientYearsMonths,
} from "../api/relatorios_requests";
import type { SustainabilityReport, IngredientItem } from "../data/clientItems";

const monthsList = [
    "janeiro","fevereiro","marco","abril","maio","junho",
    "julho","agosto","setembro","outubro","novembro","dezembro"
];

function normalize(s: string) {
    return s.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
function capitalizeMonth(m: string) {
    if (!m) return m;
    return m.charAt(0).toUpperCase() + m.slice(1);
}

export default function useReports() {
    const [sustainabilityItems, setSustainabilityItems] = useState<SustainabilityReport[]>([]);
    const [ingredientItems, setIngredientItems] = useState<IngredientItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        (async () => {
            setLoading(true);
            try {
                const [yrs, ing] = await Promise.all([
                    fetchAvailableSustainabilityYears(),
                    fetchAvailableIngredientYearsMonths(),
                ]);

                if (!mounted) return;

                const sust = (yrs ?? []).map((y) => ({
                    id: y,
                    year: y,
                    image: sustImg,
                })) as SustainabilityReport[];

                const ingItems = Object.keys(ing ?? {})
                    .map((k) => Number(k))
                    .sort((a, b) => b - a)
                    .flatMap((year) => {
                        const months = (ing as Record<number, string[]>)[year] ?? [];
                        return months.map((m, idx) => {
                            const n = normalize(m);
                            const found = monthsList.indexOf(n);
                            const monthNumber = found !== -1 ? found + 1 : Math.max(1, Math.min(12, idx + 1));
                            // include monthNumber — extra prop is fine structurally
                            return {
                                id: year * 100 + idx,
                                month: capitalizeMonth(m),
                                year,
                                image: ingImg,
                                monthNumber,
                            } as unknown as IngredientItem;
                        });
                    });

                setSustainabilityItems(sust);
                setIngredientItems(ingItems as IngredientItem[]);
            } catch (err) {
                console.error("Failed to load reports:", err);
                if (mounted) {
                    setSustainabilityItems([]);
                    setIngredientItems([]);
                }
            } finally {
                if (mounted) setLoading(false);
            }
        })();

        return () => {
            mounted = false;
        };
    }, []);

    return { sustainabilityItems, ingredientItems, loading };
}