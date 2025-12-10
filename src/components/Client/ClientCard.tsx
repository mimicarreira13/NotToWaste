import type { SustainabilityReport, IngredientItem, DishItem } from "../../data/clientItems.ts";
import { generateReportPDF } from "../../utils/pdfGenerator";

type Props = { item: SustainabilityReport | IngredientItem | DishItem; compact?: boolean };

function isIngredient(i: unknown): i is IngredientItem {
    return typeof (i as IngredientItem)?.month === "string";
}

function isSustainability(i: unknown): i is SustainabilityReport {
    const obj = i as Record<string, unknown>;
    return typeof obj?.year === "number" && !("month" in obj);
}

export default function ClientCard({ item, compact = false }: Props) {
    const cardBaseLarge = "border-black shadow-xl rounded-2xl overflow-hidden bg-[#D9D9D9] transform transition-transform duration-200 ease-out hover:scale-105 hover:shadow-xl group";
    const cardBaseCompact = "border-black shadow-xl rounded-lg overflow-hidden bg-[#D9D9D9] transform transition-transform duration-150 hover:scale-105 hover:shadow-md group";
    const cardBase = compact ? cardBaseCompact : cardBaseLarge;

    const imgClassesLarge = "w-full h-full object-cover object-top transform transition-transform duration-300 group-hover:scale-105";
    const imgClassesCompact = "w-full h-full object-cover object-top transform transition-transform duration-250 group-hover:scale-105";
    const imgClasses = compact ? imgClassesCompact : imgClassesLarge;

    const bottomBandLarge = "w-full text-white text-center py-3";
    const bottomBandCompact = "w-full text-white text-center py-2 text-sm";
    const bottomBand = compact ? bottomBandCompact : bottomBandLarge;

    const handleDownload = () => {
        const logo = "./logo.png";

        if (isIngredient(item)) {
            generateReportPDF(logo, "ingredientes", item.year, item.month);
        } else if (isSustainability(item)) {
            generateReportPDF(logo, "sustentabilidade", item.year);
        }
    };

    // ingrediente
    if (isIngredient(item)) {
        return (
            <div
                className={`${cardBase} aspect-square`}
                onClick={handleDownload}
                role="button"
                tabIndex={0}
            >
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
            <div
                className={`${cardBase} aspect-square`}
                onClick={handleDownload}
                role="button"
                tabIndex={0}
            >
                <div className="w-full h-full flex flex-col">
                    <div className="flex-1 w-full overflow-hidden ">
                        <img src={item.image} alt={`Relatório ${item.year}`} className={imgClasses} />
                    </div>
                    <div className={bottomBand + " bg-[#4C6E43]"}>{item.year}</div>
                </div>
            </div>
        );
    }

    // pratos
    const dish = item as DishItem;
    const isUnavailable = dish.available === false;
    const unavailableClass = isUnavailable ? "opacity-50 filter grayscale" : "";

    const badgeClasses = compact
        ? "w-3/4 text-center px-3 py-1 rounded-md text-sm font-semibold"
        : "w-full text-center px-6 py-3 rounded-none text-2xl font-extrabold";

    return (
        <div className={`${cardBase} ${unavailableClass}`}>
            <div className="w-full flex items-center p-4">
                <div className="w-40 min-w-[96px] flex-shrink-0 flex items-center justify-center bg-gray-100 overflow-hidden">
                    {dish.image ? (
                        <img
                            src={dish.image}
                            alt={dish.name ?? "Prato"}
                            className="w-full h-auto object-contain transform transition-transform duration-200"
                        />
                    ) : (
                        <div className="text-gray-500 p-2">No image</div>
                    )}
                </div>

                <div className="flex-1 ml-4 flex flex-col justify-center">
                    <div className={`${compact ? "text-sm" : "text-lg"} font-semibold text-gray-800 leading-tight`}>
                        {dish.name}
                    </div>

                    {dish.ingredients && dish.ingredients.length > 0 && (
                        <div className={`${compact ? "text-xs" : "text-sm"} text-gray-600 mt-2`}>
                            {dish.ingredients.join(", ")}
                        </div>
                    )}
                </div>
            </div>

            {isUnavailable && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className={`bg-[#4C6E43] text-white ${badgeClasses}`}>
                        Indisponível
                    </div>
                </div>
            )}
        </div>
    );
}