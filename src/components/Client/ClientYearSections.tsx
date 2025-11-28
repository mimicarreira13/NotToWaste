import type { IngredientItem } from "../../data/clientItems.ts";
import ClientGrid from "./ClientGrid";
import ClientCard from "./ClientCard";

type Props = {
    items: IngredientItem[];
    columns?: number;
    compact?: boolean;
};

export default function ClientYearSections({ items, columns = 6, compact = true }: Props) {
    // agrupa por ano
    const groups = items.reduce<Record<number, IngredientItem[]>>((acc, it) => {
        (acc[it.year] = acc[it.year] || []).push(it);
        return acc;
    }, {});

    // anos em ordem decrescente
    const years = Object.keys(groups)
        .map((y) => Number(y))
        .sort((a, b) => b - a);

    if (years.length === 0) return null;

    return (
        <div className="flex flex-col gap-12">
            {years.map((year) => (
                <section key={year} aria-labelledby={`year-${year}`} className="w-full">
                    {/* ano em cima (maior) + risca fina com gradiente por baixo alinhada à esquerda */}
                    <div className="mb-4">
                        <div id={`year-${year}`} className="text-5xl font-extrabold text-gray-800 leading-none">
                            {year}
                        </div>
                        <div
                            aria-hidden="true"
                            className="mt-2 h-1 w-28 rounded-full bg-gradient-to-r from-[#4C6E43] via-[#4C6E43] to-[#D9D9D9]"
                            style={{ opacity: 0.95 }}
                        />
                    </div>

                    <ClientGrid
                        items={groups[year]}
                        variant="ingredients"
                        columns={columns}
                        renderItem={(it) => <ClientCard item={it} compact={compact} />}
                    />
                </section>
            ))}
        </div>
    );
}