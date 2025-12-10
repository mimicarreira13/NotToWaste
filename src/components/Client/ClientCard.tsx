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

function parseMonthToNumber(month: string | undefined): number {
    if (!month) return 1;
    const m = month.trim().toLowerCase();
    const pt: Record<string, number> = {
        janeiro: 1, fevereiro: 2, março: 3, marco: 3, abril: 4, maio: 5, junho: 6,
        julho: 7, agosto: 8, setembro: 9, outubro: 10, novembro: 11, dezembro: 12
    };
    const en: Record<string, number> = {
        january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
        july: 7, august: 8, september: 9, october: 10, november: 11, december: 12
    };
    if (/^\d+$/.test(m)) {
        const n = Math.max(1, Math.min(12, Number(m)));
        return n;
    }
    if (pt[m]) return pt[m];
    if (en[m]) return en[m];
    return 1;
}

export default function ClientCard({ item, compact = false }: Props) {
    const [loading, setLoading] = useState(false);

    const cardBaseLarge = "border-black shadow-xl rounded-2xl overflow-hidden bg-[#D9D9D9] transform transition-transform duration-200 ease-out hover:scale-105 hover:shadow-xl group";
    const cardBaseCompact = "border-black shadow-xl rounded-lg overflow-hidden bg-[#D9D9D9] transform transition-transform duration-150 hover:scale-105 hover:shadow-md group";
    const cardBase = compact ? cardBaseCompact : cardBaseLarge;

    const imgClassesLarge = "w-full h-full object-cover object-top transform transition-transform duration-300 group-hover:scale-105";
    const imgClassesCompact = "w-full h-full object-cover object-top transform transition-transform duration-250 group-hover:scale-105";
    const imgClasses = compact ? imgClassesCompact : imgClassesLarge;

    const bottomBandLarge = "w-full text-white text-center py-3";
    const bottomBandCompact = "w-full text-white text-center py-2 text-sm";
    const bottomBand = compact ? bottomBandCompact : bottomBandLarge;

    const handleDownload = async () => {
        if (loading) return;
        setLoading(true);
        try {
            if (isIngredient(item)) {
                const monthNumber = parseMonthToNumber(item.month);
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

    // ingrediente
    if (isIngredient(item)) {
        return (
            <div
                className={`${cardBase} aspect-square relative`}
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
                    <div className={bottomBand + " bg-[#4C6E43]"}>{item.month}</div>
                </div>

                {loading && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/70 pointer-events-auto">
                        <LoadingSpinner message={""} size={40} ariaLabel="loading-report" />
                    </div>
                )}
            </div>
        );
    }

    // sustentabilidade
    if (isSustainability(item)) {
        return (
            <div
                className={`${cardBase} aspect-square relative`}
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
                    <div className={bottomBand + " bg-[#4C6E43]"}>{item.year}</div>
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

    return (
        <div className={`${cardBase} ${unavailableClass} h-60 relative`}>
            <div className="w-full flex items-center p-4 h-full">
                <div className="w-40 min-w-[96px] flex-shrink-0 flex items-center justify-center bg-gray-100 overflow-hidden ">
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