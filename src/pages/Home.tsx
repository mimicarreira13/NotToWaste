// src/pages/Home.tsx
import { useProfile } from "../contexts/ProfileContext";
import { useState } from "react";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";

import dashboard from "../assets/images/icons/dashboard.png";
import cozinha from "../assets/images/icons/cozinha.png";
import definicoes from "../assets/images/icons/definicoes.png";
import pratos from "../assets/images/icons/pratos.png";
import stock from "../assets/images/icons/stock.png";
import desperdicio from "../assets/images/icons/desperdicio.png";

const permissions: Record<string, string[]> = {
    Gerente: ["Dashboard", "Cozinha", "Definições", "Gerir Pratos", "Stock", "Desperdício"],
    "Funcionário de Stock": ["Stock", "Desperdício"],
    "Chef de Cozinha": ["Dashboard", "Cozinha", "Gerir Pratos", "Desperdício"],
    Cozinheiro: ["Cozinha", "Desperdício"],
};

function normalizeClassName(s?: string) {
    if (!s) return "";
    return s
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // remove acentos
        .replace(/\s+/g, "-")
        .replace(/[^a-zA-Z0-9-_]/g, "")
        .toLowerCase();
}

type Card = {
    id: number;
    src: string;
    alt: string;
    route?: string;
};

export default function Home() {
    const { profile } = useProfile();
    const [modal, setModal] = useState<ModalConfig>({ open: false });
    const navigate = useNavigate();

    const cards: Card[] = [
        { id: 1, src: dashboard, alt: "Dashboard", route: "/dashboard" },
        { id: 2, src: cozinha, alt: "Cozinha", route: "/cozinha" },
        { id: 3, src: definicoes, alt: "Definições", route: "/definicoes" },
        { id: 4, src: pratos, alt: "Gerir Pratos", route: "/pratos" },
        { id: 5, src: stock, alt: "Stock", route: "/stock" },
        { id: 6, src: desperdicio, alt: "Desperdício", route: "/desperdicio" },
    ];

    const allowed = profile ? permissions[profile.alt] ?? [] : cards.map((c) => c.alt);
    const visibleCards = cards.filter((c) => allowed.includes(c.alt));

    // default cols for large screens (keeps previous heuristic)
    const cols = visibleCards.length === 4 ? 4 : visibleCards.length === 2 ? 2 : 3;
    const columnWidth = 320;
    const gap = 16;

    const roleClass = profile ? `home-grid--${normalizeClassName(profile.alt)}` : "";

    function handleCardClick() {
        // placeholder: implementar navegação/ação real para cada cartão
    }

    // O .map fica dentro do return do JSX!
    return (
        <div
            className="w-full mx-auto p-6 flex items-center justify-center"
            style={{ minHeight: "calc(100vh - 80px)" }} // centra verticalmente abaixo da navbar
        >
            <div
                role="list"
                aria-label="Opções disponíveis"
                className={`home-grid ${roleClass}`}
                style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${cols}, ${columnWidth}px)`,
                    gap: `${gap}px`,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {visibleCards.map((card) => {
                    return (
                        <div
                            key={card.id}
                            role="listitem"
                            onClick={() => handleCardClick()}
                            className={
                                "home-card relative border border-gray-300 rounded-lg shadow-xl p-3 aspect-square flex flex-col items-center justify-between overflow-hidden transition-transform duration-150 hover:shadow-md hover:scale-105 cursor-pointer"
                            }
                            aria-label={card.alt}
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") handleCardClick();
                            }}
                            style={{ width: `${columnWidth}px`, maxWidth: `${columnWidth}px` }}
                        >
                            <div className="flex-1 flex items-center justify-center w-full z-10">
                                <img
                                    src={card.src}
                                    alt={card.alt}
                                    className="home-card-img max-h-56 max-w-full object-contain"
                                />
                            </div>
                            <div className="w-full bg-[#4C6E43] text-white text-center py-2 mt-2 rounded">
                                {card.alt}
                            </div>
                        </div>
                    );
                })}
            </div>

            <style>{`
                /* breakpoint até 1370px: aplica colunas por perfil */
                @media (max-width: 1370px) {
                    .home-grid {
                        /* fallback padrão: 1 coluna */
                        grid-template-columns: repeat(1, minmax(0, 1fr)) !important;
                        gap: 1.25rem !important;
                        justify-content: center;
                    }

                    /* Gerente: 4 colunas (vai ocupar 2 linhas se houver >4 itens) */
                    .home-grid--gerente {
                        grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
                    }

                    /* Chef de Cozinha: 4 colunas, normalmente 1 linha (quando houver 4 itens) */
                    .home-grid--chef-de-cozinha {
                        grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
                    }

                    /* Funcionário de Stock: 2 colunas (1 linha) */
                    .home-grid--funcionario-de-stock,
                    .home-grid--funcionário-de-stock {
                        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
                    }

                    /* Cozinheiro: 2 colunas (1 linha) */
                    .home-grid--cozinheiro {
                        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
                    }

                    .home-card {
                        width: 250px !important;
                        margin: 0 auto;
                    }

                    .home-card .home-card-img {
                        max-height: 150px !important;
                    }
                }
                
                @media (max-width: 1070px) {
                    .home-grid {
                        margin-top: 2rem;
                        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
                        gap: 1.5rem !important;
                    }
                    .home-grid--chef-de-cozinha {
                        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
                    }
                }

                /* mobile */
                @media (max-width: 850px) {
                    .home-grid {
                        margin-top: 2rem;
                        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
                        gap: 1.5rem !important;
                    }
                    .home-card {
                        width: 250px !important;
                        margin: 0 auto;
                    }
                    .home-card .home-card-img {
                        max-height: 150px !important;
                    }
                }
                 @media (max-width: 570px) {
                    .home-grid {
                        margin-top: 2rem;
                        grid-template-columns: repeat(1, minmax(0, 1fr)) !important;
                        gap: 1.5rem !important;
                    }
                    .home-card {
                        width: 250px !important;
                        margin: 0 auto;
                    }
                    .home-card .home-card-img {
                        max-height: 150px !important;
                    }
                }
            `}</style>
        </div>
    );
}
