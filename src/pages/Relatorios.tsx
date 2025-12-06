import { useState } from "react";
import { GiCarrot } from "react-icons/gi";
import { MdEco } from "react-icons/md";
import ToggleTabs from "../components/ToggleTabs.tsx";
import ClientGrid from "../components/Client/ClientGrid.tsx";
import ClientCard from "../components/Client/ClientCard.tsx";
import ClientYearSections from "../components/Client/ClientYearSections";
import { sustainabilityReports, ingredientItems } from "../data/clientItems";

type Props = {
    embedded?: boolean; // quando true, não desenha banda/toggles fixos da página principal
};

export default function Relatorios({ embedded = false }: Props) {
    const [reportTab, setReportTab] = useState<"ingredients" | "sustainability">("ingredients");

    const IngredientsIcon = <GiCarrot size={18} aria-hidden />;
    const SustainabilityIcon = <MdEco size={18} aria-hidden />;

    return (
        <div className={`relatorios-page ${embedded ? "embedded" : ""}`}>
            {/*
                Quando não está embebido (acesso directo à página de relatórios),
                desenhamos a banda e os toggles fixos como na versão original.
                Quando embebido, apenas mostramos o toggle local (não-fixo) acima do conteúdo.
            */}
            {!embedded && (
                <>
                    <div
                        className="band fixed left-0 right-0 top-0 z-30 pointer-events-none"
                        style={{ height: `190px`, backgroundColor: "#D9D9D9" }}
                        aria-hidden="true"
                    />
                    <div className="fixed-top-toggles fixed top-32 left-48 right-48 flex items-center justify-center z-40">
                        <ToggleTabs
                            options={[
                                { id: "ingredients", label: "Ingredientes", icon: IngredientsIcon },
                                { id: "sustainability", label: "Sustentabilidade", icon: SustainabilityIcon },
                            ]}
                            value={reportTab}
                            onChange={(id) => setReportTab(id as "ingredients" | "sustainability")}
                        />
                    </div>
                </>
            )}

            {/*
                Quando embebido, mostramos o toggle local (não-fixo) para não conflitar
                com os elementos fixos da página que o incorpora.
            */}
            {embedded && (
                <div style={{ marginBottom: 12 }}>
                    <ToggleTabs
                        options={[
                            { id: "ingredients", label: "Ingredientes", icon: IngredientsIcon },
                            { id: "sustainability", label: "Sustentabilidade", icon: SustainabilityIcon },
                        ]}
                        value={reportTab}
                        onChange={(id) => setReportTab(id as "ingredients" | "sustainability")}
                    />
                </div>
            )}

            <div style={{ marginTop: embedded ? 0 : 220 }}>
                {reportTab === "sustainability" && (
                    <div className="sust_grid">
                        <ClientGrid
                            variant="sustainability"
                            items={sustainabilityReports}
                            columns={4}
                            renderItem={(r) => <ClientCard item={r} />}
                        />
                    </div>
                )}

                {reportTab === "ingredients" && (
                    <div className="first-year-wrap">
                        <ClientYearSections items={ingredientItems} columns={6} compact />
                    </div>
                )}
            </div>

            <style>{`
                /* Ajustes simples para uso embebido vs página completa */
                .relatorios-page.embedded .band,
                .relatorios-page.embedded .fixed-top-toggles {
                    display: none;
                }

                /* Responsividade mínima: quando usado sozinho mantém comportamento anterior */
                @media (max-width: 650px) {
                    .relatorios-page .band {
                        height: 190px !important;
                    }
                    .relatorios-page .sust_grid,
                    .relatorios-page .first-year-wrap {
                        margin-top: 280px !important;
                    }
                    .relatorios-page [role="list"] {
                        grid-template-columns: repeat(1, minmax(0, 1fr)) !important;
                        gap: 1rem !important;
                    }
                }
            `}</style>
        </div>
    );
}