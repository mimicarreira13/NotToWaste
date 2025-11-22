import { useState } from "react";
import ToggleTabs from "../components/Client/ToggleTabs.tsx";
import ClientGrid from "../components/Client/ClientGrid.tsx";
import ClientCard from "../components/Client/ClientCard.tsx";
import ClientYearSections from "../components/Client/ClientYearSections";
import { sustainabilityReports, ingredientItems, dishes } from "../data/clientItems";

export default function Client() {
    const [selected, setSelected] = useState<"reports" | "dishes">("reports");
    const [reportTab, setReportTab] = useState<"ingredients" | "sustainability">("ingredients");

    const bandHeight = 190; // altura da banda fixa no topo

    return (
        <div className="w-full" style={{ paddingLeft: "10%", paddingRight: "10%", paddingTop: 24, paddingBottom: 24 }}>
            <div
                className="fixed left-0 right-0 top-0 z-30 pointer-events-none"
                style={{ height: `${bandHeight}px`, backgroundColor: "#D9D9D9" }}
                aria-hidden="true"
            />
            <div className="fixed top-32 left-48 right-48 flex items-center justify-between z-40">
                <ToggleTabs
                    options={[
                        { id: "reports", label: "Relatórios" },
                        { id: "dishes", label: "Pratos" },
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
        </div>
    );
}