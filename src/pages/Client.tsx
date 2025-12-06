import { useState } from "react";
import { FaUtensils, FaRegFileAlt } from "react-icons/fa";
import { GiCarrot } from "react-icons/gi";
import { MdEco } from "react-icons/md";
import ToggleTabs from "../components/ToggleTabs.tsx";
import ClientGrid from "../components/Client/ClientGrid.tsx";
import ClientCard from "../components/Client/ClientCard.tsx";
import ClientYearSections from "../components/Client/ClientYearSections";
import { sustainabilityReports, ingredientItems, dishes } from "../data/clientItems";

export default function Client() {
    const [selected, setSelected] = useState<"reports" | "dishes">("dishes");
    const [reportTab, setReportTab] = useState<"ingredients" | "sustainability">("ingredients");

    const bandHeight = 190; // altura da banda fixa no topo

    const DishesIcon = <FaUtensils size={20} aria-hidden />;
    const ReportsIcon = <FaRegFileAlt size={20} aria-hidden />;

    const IngredientsIcon = <GiCarrot size={18} aria-hidden />;
    const SustainabilityIcon = <MdEco size={18} aria-hidden />;

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

                {selected === "reports" && (
                    <ToggleTabs
                        options={[
                            { id: "ingredients", label: "Ingredientes", icon: IngredientsIcon},
                            { id: "sustainability", label: "Sustentabilidade", icon: SustainabilityIcon },
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
                    <div className="first-year-wrap">
                        <ClientYearSections items={ingredientItems} columns={6} compact />
                    </div>
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
                /* mobile: até 550px — toggles em coluna */
                @media (max-width: 650px) {
                
                    .client-page .first-year-wrap {
                        margin-top: 250px !important;
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

                    /* altura da banda em mobile: 170px por omissão */
                    .client-page .band {
                        height: 190px !important;
                    }

                    /* quando existe o 2º toggle, aumentar para 220px */
                    .client-page.has-second-toggle .band {
                        height: 260px !important;
                    }
                }

                /* entre 551px e 800px: 2 colunas e toggles na mesma linha (row) com gap maior */
                @media (min-width: 601px) and (max-width: 800px) {
                    /* grid com 2 colunas */
                    .client-page [role="list"] {
                        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
                        gap: 1rem !important;
                    }

                    .client-page .w-full[role="list"] > div[role="listitem"] {
                        width: 100% !important;
                        margin: 0 auto;
                    }

                    /* toggles na mesma linha, centralizados com espaço entre os dois grupos */
                    .client-page .fixed-top-toggles {
                        position: fixed !important;
                        top: 120px !important;
                        left: 50% !important;
                        transform: translateX(-50%) !important;
                        right: auto !important;
                        display: flex !important;
                        flex-direction: row;
                        align-items: center;
                        justify-content: center;
                        gap: 2rem; /* espaço entre 1º toggle e 2º toggle */
                        padding: 0.5rem 0.75rem;
                        box-sizing: border-box;
                        pointer-events: auto;
                        background: transparent;
                    }

                    /* cada ToggleTabs fica inline-flex com largura automática */
                    .client-page .fixed-top-toggles > .relative.inline-flex,
                    .client-page .fixed-top-toggles > div > .relative.inline-flex {
                        display: inline-flex !important;
                        width: auto !important;
                        justify-content: center;
                        gap: 0.5rem;
                        align-items: center;
                    }

                    /* manter botões do primeiro toggle com largura equilibrada */
                    .client-page .fixed-top-toggles > .relative.inline-flex > button {
                        flex: 0 0 auto;
                        min-width: 4rem;
                        text-align: center;
                    }

                    /* --- ajustes para deixar os cards de PRATOS um pouco menores --- */
                    /* limita largura do cartão, reduz tamanho do bloco de imagem e padding */
                    .client-page .client-dishes-grid [role="listitem"] > div {
                        max-width: 480px !important;
                        margin: 0 auto;
                    }

                    .client-page .client-dishes-grid [role="listitem"] .w-40 {
                        width: 8rem !important; /* reduzir de 10rem para 8rem */
                        min-width: 5rem !important;
                    }

                    .client-page .client-dishes-grid [role="listitem"] .p-4 {
                        padding: 0.75rem !important; /* reduzir padding interno do card */
                    }
                }

                /* entre 801px e 1200px: 3 colunas */
                @media (min-width: 801px) and (max-width: 1200px) {
                    .client-page [role="list"] {
                        grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
                        gap: 1rem !important;
                    }

                    .client-page .w-full[role="list"] > div[role="listitem"] {
                        width: 100% !important;
                        margin: 0 auto;
                    }

                    /* toggles em linha, centralizados */
                    .client-page .fixed-top-toggles {
                        position: fixed !important;
                        top: 120px !important;
                        left: 50% !important;
                        transform: translateX(-50%) !important;
                        right: auto !important;
                        display: flex !important;
                        flex-direction: row;
                        align-items: center;
                        justify-content: center;
                        gap: 2rem;
                        padding: 0.5rem 0.75rem;
                        box-sizing: border-box;
                        pointer-events: auto;
                        background: transparent;
                    }

                    .client-page .fixed-top-toggles > .relative.inline-flex,
                    .client-page .fixed-top-toggles > div > .relative.inline-flex {
                        display: inline-flex !important;
                        width: auto !important;
                        justify-content: center;
                        gap: 0.5rem;
                        align-items: center;
                    }

                    .client-page .fixed-top-toggles > .relative.inline-flex > button {
                        flex: 0 0 auto;
                        min-width: 4rem;
                        text-align: center;
                    }

                    /* ajustes leves para os cards de pratos nesta faixa */
                    .client-page .client-dishes-grid [role="listitem"] > div {
                        max-width: 440px !important;
                        margin: 0 auto;
                    }

                    .client-page .client-dishes-grid [role="listitem"] .w-40 {
                        width: 7.5rem !important;
                        min-width: 5rem !important;
                    }

                    .client-page .client-dishes-grid [role="listitem"] .p-4 {
                        padding: 0.85rem !important;
                    }
                }

            `}</style>
        </div>
    );
}