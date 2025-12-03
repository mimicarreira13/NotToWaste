// src/pages/Client.tsx
import { useState } from "react";
import ToggleTabs from "../components/Client/ToggleTabs.tsx";
import ClientGrid from "../components/Client/ClientGrid.tsx";
import ClientCard from "../components/Client/ClientCard.tsx";
import ClientYearSections from "../components/Client/ClientYearSections";
import { sustainabilityReports, ingredientItems, dishes } from "../data/clientItems";

export default function Client() {
    const [selected, setSelected] = useState<"reports" | "dishes">("dishes");
    const [reportTab, setReportTab] = useState<"ingredients" | "sustainability">("ingredients");

    const bandHeight = 190; // altura da banda fixa no topo

    return (
        <div
            className={`w-full client-page ${selected === "reports" ? "has-second-toggle" : ""}`}
            style={{ paddingLeft: "10%", paddingRight: "10%", paddingTop: 24, paddingBottom: 24 }}
        >
            <div
                className="band fixed left-0 right-0 top-0 z-30 pointer-events-none"
                style={{ height: `${bandHeight}px`, backgroundColor: "#D9D9D9" }}
                aria-hidden="true"
            />
            <div className="fixed-top-toggles fixed top-32 left-48 right-48 flex items-center justify-between z-40">
                <ToggleTabs
                    options={[
                        { id: "dishes", label: "Pratos" },
                        { id: "reports", label: "Relatórios" },
                    ]}
                    value={selected}
                    onChange={(id) => setSelected(id as "reports" | "dishes")}
                />

                {selected === "reports" && (
                    <ToggleTabs
                        options={[
                            { id: "ingredients", label: "Ingredientes" },
                            { id: "sustainability", label: "Sustentabilidade" },
                        ]}
                        value={reportTab}
                        onChange={(id) => setReportTab(id as "ingredients" | "sustainability")}
                    />
                )}
            </div>

            <div style={{ marginTop: 220 }}>
                {selected === "reports" && reportTab === "sustainability" && (
                    <ClientGrid
                        variant="sustainability"
                        items={sustainabilityReports}
                        columns={4}
                        renderItem={(r) => <ClientCard item={r} />}
                    />
                )}

                {selected === "reports" && reportTab === "ingredients" && (
                    <ClientYearSections items={ingredientItems} columns={6} compact />
                )}

                {selected === "dishes" && (
                    <ClientGrid
                        variant="dishes"
                        items={dishes}
                        columns={4}
                        renderItem={(d) => <ClientCard item={d} />}
                    />
                )}
            </div>
            <style>{`
                /* quando a largura do ecrã for <= 650px: forçar 1 coluna em todos os grids desta página */
                @media (max-width: 650px) {
                    .client-page [role="list"] {
                        grid-template-columns: repeat(1, minmax(0, 1fr)) !important;
                        gap: 1rem !important;
                    }

                    /* Ajuste visual dos cards para ocupar toda a largura */
                    .client-page .w-full[role="list"] > div[role="listitem"] {
                        width: 100% !important;
                        margin: 0 auto;
                    }

                    /* manter toggles fixos, no canto superior esquerdo, abaixo da navbar */
                    .client-page .fixed-top-toggles {
                        position: fixed !important;
                        top: 120px !important;   /* ajusta se necessário */
                        left: 1rem !important;
                        right: auto !important;
                        width: auto !important;
                        padding: 0.5rem 0.75rem;
                        box-sizing: border-box;
                        pointer-events: auto;
                        background: transparent;
                        justify-content: flex-start;
                        gap: 1rem;
                    }

                    .client-page .fixed-top-toggles .relative.inline-flex {
                        width: auto;
                        justify-content: flex-start;
                    }
                }

                /* para ecrãs muito pequenos: organizar toggles em coluna e centrar; ajustar altura da band conforme presença do 2º toggle */
                @media (max-width: 500px) {
                    .client-page .fixed-top-toggles {
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
                    }

                    .client-page .fixed-top-toggles > .relative.inline-flex,
                    .client-page .fixed-top-toggles > div > .relative.inline-flex {
                        display: flex !important;
                        width: 100% !important;
                        justify-content: center;
                        gap: 0.5rem;
                        align-items: center;
                    }

                    .client-page .fixed-top-toggles > .relative.inline-flex > button {
                        flex: 1 1 0;
                        text-align: center;
                    }

                    .client-page .fixed-top-toggles > :nth-child(2) {
                        width: 100%;
                    }

                    .client-page [role="list"] {
                        grid-template-columns: repeat(1, minmax(0, 1fr)) !important;
                        gap: 1rem !important;
                    }

                    /* altura da banda em mobile: 150px por omissão */
                    .client-page .band {
                        height: 170px !important;
                    }

                    /* quando existe o 2º toggle, aumentar para 220px */
                    .client-page.has-second-toggle .band {
                        height: 220px !important;
                    }
                }
            `}</style>
        </div>
    );
}