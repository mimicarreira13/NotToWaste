import { useState } from "react";
import { FaUtensils, FaRegFileAlt } from "react-icons/fa";
import ToggleTabs from "../components/ToggleTabs.tsx";
import ClientGrid from "../components/Client/ClientGrid.tsx";
import ClientCard from "../components/Client/ClientCard.tsx";
import { dishes } from "../data/clientItems";
import { RelatoriosContent, RelatoriosToggle } from "./Relatorios";

export default function Client() {
    const [selected, setSelected] = useState<"reports" | "dishes">("dishes");
    // estado para o segundo toggle (ingredientes / sustentabilidade)
    const [reportTab, setReportTab] = useState<"ingredients" | "sustainability">("ingredients");
    const bandHeight = 190; // altura da banda fixa no topo

    const DishesIcon = <FaUtensils size={20} aria-hidden />;
    const ReportsIcon = <FaRegFileAlt size={20} aria-hidden />;

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
                        { id: "dishes", label: "Pratos", icon: DishesIcon },
                        { id: "reports", label: "Relatórios", icon: ReportsIcon },
                    ]}
                    value={selected}
                    onChange={(id) => setSelected(id as "reports" | "dishes")}
                />

                {/* passa o estado real do segundo toggle para permitir clique */}
                {selected === "reports" && (
                    <RelatoriosToggle value={reportTab} onChange={(v) => setReportTab(v)} />
                )}
            </div>

            <div style={{ marginTop: 220 }}>
                {selected === "reports" && (
                    // renderiza o conteúdo de relatórios usando o estado controlado aqui
                    <RelatoriosContent tab={reportTab} />
                )}

                {selected === "dishes" && (
                    <ClientGrid
                        variant="dishes"
                        items={dishes}
                        columns={4}
                        className="client-dishes-grid"
                        renderItem={(d) => <ClientCard item={d} />}
                    />
                )}
            </div>

            <style>{`
                /* pequenas regras de responsividade herdadas e mantidas */
                @media (max-width: 650px) {
                    .client-page .first-year-wrap {
                        margin-top: 280px !important;
                    }
                    .client-page .sust_grid {
                        margin-top: 280px !important;
                    }

                    .client-page [role="list"] {
                        grid-template-columns: repeat(1, minmax(0, 1fr)) !important;
                        gap: 1rem !important;
                    }

                    .client-page .w-full[role="list"] > div[role="listitem"] {
                        width: 100% !important;
                        margin: 0 auto;
                    }

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
                        pointer-events: auto;
                    }

                    .client-page.has-second-toggle .band {
                        height: 260px !important;
                    }
                }
            `}</style>
        </div>
    );
}