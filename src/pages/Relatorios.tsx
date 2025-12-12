import { useState } from "react";
import { GiCarrot } from "react-icons/gi";
import { MdEco } from "react-icons/md";
import ToggleTabs from "../components/ToggleTabs.tsx";
import ClientGrid from "../components/Client/ClientGrid.tsx";
import ClientCard from "../components/Client/ClientCard.tsx";
import ClientYearSections from "../components/Client/ClientYearSections";
import { sustainabilityReports, ingredientItems } from "../data/clientItems";
import { useLocation } from "react-router-dom";

export function RelatoriosToggle({
                                     value,
                                     onChange,
                                     only,
                                 }: {
    value: "ingredients" | "sustainability";
    onChange: (v: "ingredients" | "sustainability") => void;
    only?: "ingredients" | "sustainability";
}) {
    const IngredientsIcon = <GiCarrot size={18} aria-hidden />;
    const SustainabilityIcon = <MdEco size={18} aria-hidden />;

    const options = [
        { id: "ingredients", label: "Ingredientes", icon: IngredientsIcon },
        { id: "sustainability", label: "Sustentabilidade", icon: SustainabilityIcon },
    ];

    const filtered = only ? options.filter((o) => o.id === only) : options;

    return (
        <ToggleTabs
            options={filtered}
            value={value}
            onChange={(id) => onChange(id as "ingredients" | "sustainability")}
        />
    );
}

export function RelatoriosContent({ tab }: { tab: "ingredients" | "sustainability" }) {
    return (
        <div style={{ marginTop: 220 }}>
            {tab === "sustainability" && (
                <div className="sust_grid">
                    <ClientGrid
                        variant="sustainability"
                        items={sustainabilityReports}
                        columns={4}
                        renderItem={(r) => <ClientCard item={r} />}
                    />
                </div>
            )}

            {tab === "ingredients" && (
                <div className="first-year-wrap">
                    <ClientYearSections items={ingredientItems} columns={6} compact />
                </div>
            )}

            <style>{`
                @media (max-width: 650px) {
                    .client-page .first-year-wrap,
                    .relatorios-page .first-year-wrap {
                        margin-top: 280px !important;
                    }
                    .client-page .sust_grid,
                    .relatorios-page .sust_grid {
                        margin-top: 280px !important;
                    }
                    .client-page [role="list"],
                    .relatorios-page [role="list"] {
                        grid-template-columns: repeat(1, minmax(0, 1fr)) !important;
                        gap: 1rem !important;
                    }

                    .client-page .w-full[role="list"] > div[role="listitem"],
                    .relatorios-page .w-full[role="list"] > div[role="listitem"] {
                        width: 100% !important;
                        margin: 0 auto;
                    }

                    .client-page .fixed-top-toggles,
                    .relatorios-page .fixed-top-toggles {
                        position: fixed !important;
                        top: 110px !important;
                        left: 50% !important;
                        transform: translateX(-50%) !important;
                        right: auto !important;
                        display: flex !important;
                        flex-direction: column;
                        align-items: center;
                        gap: 1.25rem;
                        padding: 0.5rem 0.75rem;
                        box-sizing: border-box;
                        pointer-events: auto;
                    }

                    .client-page .fixed-top-toggles > .relative.inline-flex,
                    .client-page .fixed-top-toggles > div > .relative.inline-flex,
                    .relatorios-page .fixed-top-toggles > .relative.inline-flex,
                    .relatorios-page .fixed-top-toggles > div > .relative.inline-flex {
                        display: flex !important;
                        width: 100% !important;
                        justify-content: center;
                        gap: 0.5rem;
                        align-items: center;
                    }

                    .client-page .fixed-top-toggles > .relative.inline-flex > button,
                    .relatorios-page .fixed-top-toggles > .relative.inline-flex > button {
                        flex: 1 1 0;
                        text-align: center;
                    }

                    .client-page .fixed-top-toggles > :nth-child(2),
                    .relatorios-page .fixed-top-toggles > :nth-child(2) {
                        width: 100%;
                    }

                    .client-page .band,
                    .relatorios-page .band {
                        height: 190px !important;
                    }

                    .client-page.has-second-toggle .band,
                    .relatorios-page.has-second-toggle .band {
                        height: 260px !important;
                    }
                }
            `}</style>
        </div>
    );
}

export default function Relatorios() {
    const location = useLocation();
    const search = new URLSearchParams(location.search);
    const only = (search.get("only") as "ingredients" | "sustainability" | null) || undefined;

    const [reportTab, setReportTab] = useState<"ingredients" | "sustainability">(only ?? "ingredients");
    const bandHeight = 190;


    return (
        <div
            className={`w-full relatorios-page ${!only ? "has-second-toggle" : ""}`}
            style={{ paddingLeft: "10%", paddingRight: "10%", paddingTop: 24, paddingBottom: 24 }}
        >
            <div
                className="band fixed left-0 right-0 top-0 z-30 pointer-events-none"
                style={{ height: `${bandHeight}px`, backgroundColor: "#D9D9D9" }}
                aria-hidden="true"
            />
            <div className="fixed-top-toggles fixed top-32 left-48 right-48 flex items-center justify-between z-40">
                {/* agora o toggle secundário fica no lado esquerdo quando acessada a página Relatórios */}
                <RelatoriosToggle value={reportTab} onChange={(v) => setReportTab(v)} only={only} />

                <div>
                    {/* placeholder para o primeiro toggle quando acessada diretamente (lado direito) */}
                </div>
            </div>

            <RelatoriosContent tab={reportTab} />
        </div>
    );
}