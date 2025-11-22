// src/pages/Perfis.tsx
import { useState } from "react";
import LoginOverlay from "../components/LoginOverlay";

import gerente from "../assets/images/icons/icon_gerente.png";
import funcionario_stock from "../assets/images/icons/icon_stock.png";
import chef from "../assets/images/icons/icon_chef.png";
import cozinheiro from "../assets/images/icons/icon_cozinehiro.png";

type Card = { id: number; src: string; alt: string };

export default function Perfis() {
    const [selected, setSelected] = useState<Card | null>(null);

    const cards: Card[] = [
        { id: 1, src: gerente, alt: "Gerente" },
        { id: 2, src: funcionario_stock, alt: "Funcionário de Stock" },
        { id: 3, src: chef, alt: "Chef de Cozinha" },
        { id: 4, src: cozinheiro, alt: "Cozinheiro" },
    ];

    function selectProfile(card: Card) {
        setSelected(card);
    }

    return (
        <div className="w-full max-w-6xl mx-auto p-4" style={{ marginTop: 20 }}>
            <div className="flex justify-center w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 perfis-grid">
                    {cards.map((card) => (
                        <div
                            key={card.id}
                            role="group"
                            aria-label={card.alt}
                            onClick={() => selectProfile(card)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") selectProfile(card);
                            }}
                            className={
                                "cursor-pointer border border-gray-300 shadow-xl p-3 flex flex-col aspect-square items-center justify-between overflow-hidden transition-transform duration-150 hover:shadow-md hover:scale-105 w-full perfis-card"
                            }
                            style={{ borderRadius: 5 }}
                        >
                            <img
                                src={card.src}
                                alt={card.alt}
                                className="max-w-full object-contain card-img"
                                style={{ maxHeight: "65%" }}
                            />
                            <div
                                className="w-full bg-[#4C6E43] text-white text-center py-2 mt-2"
                                style={{ borderRadius: 5 }}
                            >
                                {card.alt}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <LoginOverlay selected={selected} onClose={() => setSelected(null)} />

            <style>{`
                @media (max-width: 1030px) {
                    .perfis-grid {
                        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
                        gap: 1.25rem !important; /* approx gap-5 */
                    }
                    .perfis-card {
                        width: 250px;
                        margin: 0 auto;
                    }
                    .perfis-card .card-img {
                        max-height: 150px !important;
                    }
                }
                
                @media (max-width: 530px) {
                    .perfis-grid {
                        margin-top: 4rem;
                        grid-template-columns: repeat(1, minmax(0, 1fr)) !important;
                        gap: 2rem !important; /* approx gap-5 */
                    }
                    .perfis-card {
                        width: 250px;
                        margin: 0 auto;
                    }
                    .perfis-card .card-img {
                        max-height: 150px !important;
                    }
                }
                    
                @media (min-width: 1400px) {
                    .perfis-grid {
                        margin-top: 4rem; /* substituir top por margin-top */
                        justify-content: center; /* centra a grelha no eixo horizontal */
                        justify-items: center; /* centra itens dentro das células (opcional) */
                        grid-template-columns: repeat(4, 300px) !important; /* colunas com largura fixa para manter cards centrados */
                        gap: 2rem !important; /* reduzir gap gigante para algo mais apropriado */
                    }

                    .perfis-card {
                        width: 300px; /* largura fixa que corresponde às colunas */
                        margin: 0; /* já centrado pela grelha */
                    }

                    .perfis-card .card-img {
                        max-height: 200px !important;
                    }
                }
            `}</style>
        </div>
    );
}