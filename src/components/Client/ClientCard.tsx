import type { SustainabilityReport, IngredientItem, DishItem } from "../../data/clientItems.ts";

type Props = { item: SustainabilityReport | IngredientItem | DishItem; compact?: boolean };

function isIngredient(i: unknown): i is IngredientItem {
    return typeof (i as IngredientItem)?.month === "string";
}

function isSustainability(i: unknown): i is SustainabilityReport {
    const obj = i as Record<string, unknown>;
    return typeof obj?.year === "number" && !("month" in obj);
}

export default function ClientCard({ item, compact = false }: Props) {
    const cardBaseLarge = "border rounded-2xl overflow-hidden bg-white transform transition-transform duration-200 ease-out hover:scale-105 hover:shadow-xl group";
    const cardBaseCompact = "border rounded-lg overflow-hidden bg-white transform transition-transform duration-150 hover:scale-105 hover:shadow-md group";
    const cardBase = compact ? cardBaseCompact : cardBaseLarge;

    const imgClassesLarge = "w-full h-full object-cover object-top transform transition-transform duration-300 group-hover:scale-105";
    const imgClassesCompact = "w-full h-full object-cover object-top transform transition-transform duration-250 group-hover:scale-105";
    const imgClasses = compact ? imgClassesCompact : imgClassesLarge;

    const bottomBandLarge = "w-full text-white text-center py-3";
    const bottomBandCompact = "w-full text-white text-center py-2 text-sm";
    const bottomBand = compact ? bottomBandCompact : bottomBandLarge;

    // ingrediente
    if (isIngredient(item)) {
        return (
            <div className={`${cardBase} aspect-square`}>
                <div className="w-full h-full flex flex-col">
                    <div className="flex-1 w-full overflow-hidden ">
                        <img src={item.image} alt={item.month} className={imgClasses} />
                    </div>
                    <div className={bottomBand + " bg-[#4C6E43]"}>{item.month}</div>
                </div>
            </div>
        );
    }

    // sustentabilidade
    if (isSustainability(item)) {
        return (
            <div className={`${cardBase} aspect-square`}>
                <div className="w-full h-full flex flex-col">
                    <div className="flex-1 w-full overflow-hidden ">
                        <img src={item.image} alt={`Relatório ${item.year}`} className={imgClasses} />
                    </div>
                    <div className={bottomBand + " bg-[#4C6E43]"}>{item.year}</div>
                </div>
            </div>
        );
    }

    // pratos (fallback)
    return (
        <div className={`${cardBase} aspect-square`}>
            <div className="w-full h-full flex flex-col">
                <div className="flex-1 w-full flex items-center justify-center overflow-hidden">
                    {item.image ? <img src={item.image} alt="Prato" className="object-contain max-h-full" /> : <div className="text-gray-500">No image</div>}
                </div>
                <div className={bottomBand + " bg-[#4C6E43]"} />
            </div>
        </div>
    );
}