import { useState } from "react";
import ToggleTabs from "../components/ToggleTabs";
import ClientGrid from "../components/ClientGrid";
import ClientCard from "../components/ClientCard";
import { sustainabilityReports, ingredientItems, dishes } from "../data/clientItems";

export default function Client() {
    const [selected, setSelected] = useState<"reports" | "dishes">("reports");
    const [reportTab, setReportTab] = useState<"ingredients" | "sustainability">("ingredients");

    return (
        <div className="w-full max-w-6xl mx-auto p-6">
            <div className="fixed top-32 left-48 right-48 flex items-center justify-between">
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
                    <ClientGrid
                        variant="ingredients"
                        items={ingredientItems}
                        columns={6}
                        renderItem={(ing) => <ClientCard item={ing} compact />}
                    />
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