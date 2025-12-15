// File: src/components/Client/ClientCard.tsx
import React, { useState } from "react";
import type { SustainabilityReport, IngredientItem, DishItem } from "../../data/clientItems.ts";
import { fetchSustainabilityReport, fetchTop10Desperdicios, openPdfBlobInNewTab } from "../../api/relatorios_requests";
import LoadingSpinner from "../LoadingSpinner";

type Props = { item: SustainabilityReport | IngredientItem | DishItem; compact?: boolean };

function isIngredient(i: unknown): i is IngredientItem {
    return typeof (i as IngredientItem)?.month === "string";
}

function isSustainability(i: unknown): i is SustainabilityReport {
    const obj = i as Record<string, unknown>;
    return typeof obj?.year === "number" && !("month" in obj);
}

const monthsList = [
    "janeiro","fevereiro","marco","abril","maio","junho",
    "julho","agosto","setembro","outubro","novembro","dezembro"
];
function normalize(s: string) {
    return s.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
function parseMonthFallback(monthName: string): number {
    const n = normalize(monthName);
    const idx = monthsList.indexOf(n);
    return idx !== -1 ? idx + 1 : 1;
}

export default function ClientCard({ item, compact = false }: Props) {
    const [loading, setLoading] = useState(false);

    const cardBaseLarge =
        "border-black shadow-xl rounded-2xl overflow-hidden bg-[#D9D9D9] transform transition-transform duration-200 ease-out hover:scale-105 hover:shadow-xl group";

    const dishCardBaseLarge =
        "border-2 border-black shadow-2xl rounded-2xl overflow-hidden bg-[#D9D9D9] transform transition-transform duration-200 ease-out hover:scale-105 hover:shadow-2xl group md:h-72 h-auto";
    const dishCardBaseCompact =
        "border-2 border-black shadow-2xl rounded-lg overflow-hidden bg-[#D9D9D9] transform transition-transform duration-150 hover:scale-105 hover:shadow-2xl group md:h-56 h-auto";

    const imgClassesLarge =
        "w-full h-full object-cover object-top transform transition-transform duration-300 group-hover:scale-105";
    const imgClassesCompact =
        "w-full h-full object-cover object-top transform transition-transform duration-250 group-hover:scale-105";
    const imgClasses = compact ? imgClassesCompact : imgClassesLarge;

    const bottomBandLarge = "w-full text-white text-center py-3";
    const bottomBandCompact = "w-full text-white text-center py-2 text-sm";
    const bottomBand = compact ? bottomBandCompact : bottomBandLarge;

    const reportLabelClass = compact ? "text-base" : "text-xl";

    const handleDownload = async () => {
        if (loading) return;
        setLoading(true);
        try {
            if (isIngredient(item)) {
                const monthNumber = item.monthNumber ?? parseMonthFallback(item.month);
                const blob = await fetchTop10Desperdicios(item.year, monthNumber);
                openPdfBlobInNewTab(blob, `Relatório ${item.month} ${item.year}`);
            } else if (isSustainability(item)) {
                const blob = await fetchSustainabilityReport(item.year);
                openPdfBlobInNewTab(blob, `Relatório ${item.year}`);
            }
        } catch (err) {
            console.error("Error downloading report:", err);
        } finally {
            setLoading(false);
        }
    };

    const onKeyDown = (e: React.KeyboardEvent) => {
        if ((e.key === "Enter" || e.key === " ") && !loading) {
            e.preventDefault();
            handleDownload();
        }
    };

    if (isIngredient(item)) {
        return (
            <div
                className={`${cardBaseLarge} aspect-square relative`}
                onClick={() => !loading && handleDownload()}
                role="button"
                tabIndex={0}
                aria-disabled={loading}
                aria-busy={loading}
                onKeyDown={onKeyDown}
            >
                <div className="w-full h-full flex flex-col">
                    <div className="flex-1 w-full overflow-hidden ">
                        <img src={item.image} alt={item.month} className={imgClasses} />
                    </div>
                    <div className={bottomBand + " bg-[#4C6E43] " + reportLabelClass}>
                        <span className={compact ? "text-xl font-semibold" : "text-3xl font-extrabold"}>
                            {item.month}
                        </span>
                    </div>
                </div>

                {loading && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/70 pointer-events-auto">
                        <LoadingSpinner message={""} size={40} ariaLabel="loading-report" />
                    </div>
                )}
            </div>
        );
    }

    if (isSustainability(item)) {
        return (
            <div
                className={`${cardBaseLarge} aspect-square relative`}
                onClick={() => !loading && handleDownload()}
                role="button"
                tabIndex={0}
                aria-disabled={loading}
                aria-busy={loading}
                onKeyDown={onKeyDown}
            >
                <div className="w-full h-full flex flex-col">
                    <div className="flex-1 w-full overflow-hidden ">
                        <img src={item.image} alt={`Relatório ${item.year}`} className={imgClasses} />
                    </div>
                    <div className={bottomBand + " bg-[#4C6E43] " + reportLabelClass}>{item.year}</div>
                </div>

                {loading && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/70 pointer-events-auto">
                        <LoadingSpinner message={""} size={44} ariaLabel="loading-report" />
                    </div>
                )}
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

    const dishCardBase = compact ? dishCardBaseCompact : dishCardBaseLarge;

    // Responsive thumbnail sizes:
    // Keep container full-width on small screens but constrain the *image* max width
    // and use the same card background so no white band shows.
    const thumbContainerClass = compact
        ? "w-full md:w-44 md:min-w-[112px] flex-shrink-0 flex items-center justify-center bg-[#D9D9D9] overflow-hidden"
        : "w-full md:w-52 md:min-w-[128px] flex-shrink-0 flex items-center justify-center bg-[#D9D9D9] overflow-hidden";

    // Image will not stretch to fill container on small screens — use `w-auto` + `max-w-...`
    const thumbImgClass = compact
        ? "w-auto max-w-[9rem] md:max-w-[11rem] h-auto max-h-28 md:max-h-40 object-contain transform transition-transform duration-200"
        : "w-auto max-w-[11rem] md:max-w-[14rem] h-auto max-h-36 md:max-h-52 object-contain transform transition-transform duration-200";

    // Typography hierarchy:
    const dishNameClass = compact
        ? "text-xl font-bold text-gray-800"
        : "text-2xl md:text-3xl font-extrabold text-gray-800";
    const ingredientsLabelClass = compact
        ? "text-base text-gray-600 mt-2 font-medium"
        : "text-lg md:text-xl text-gray-600 mt-2 font-medium";
    const ingredientsListSize = compact ? "text-sm" : "text-base";

    return (
        <div className={`${dishCardBase} ${unavailableClass} relative`}>
            <div className="w-full flex flex-col md:flex-row items-start md:items-center p-4 h-full">
                <div className={`${thumbContainerClass}`}>
                    {dish.image ? (
                        <img
                            src={dish.image}
                            alt={dish.name ?? "Prato"}
                            className={thumbImgClass}
                        />
                    ) : (
                        <div className="text-gray-500 p-2">No image</div>
                    )}
                </div>

                <div className="flex-1 md:ml-4 mt-3 md:mt-0 flex flex-col justify-center">
                    {/* prominent dish name */}
                    <div className={dishNameClass}>
                        {dish.name}
                    </div>

                    {/* gray label "Ingredientes" */}
                    <div className={ingredientsLabelClass}>
                        Ingredientes
                    </div>

                    {dish.ingredients && dish.ingredients.length > 0 ? (
                        <ul className={`${ingredientsListSize} text-gray-600 mt-1 pl-5 space-y-1`}>
                            {dish.ingredients.map((ing, idx) => (
                                <li key={idx} className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span className="flex-1">{ing}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="text-xs text-gray-400 mt-1">Sem ingredientes listados</div>
                    )}
                </div>
            </div>

            {isUnavailable && (
                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center pb-4 pointer-events-none">
                    <div className={`bg-[#4C6E43] text-white ${badgeClasses}`}>
                        Indisponível
                    </div>
                </div>
            )}
        </div>
    );
}