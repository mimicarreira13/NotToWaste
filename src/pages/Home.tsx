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

    Gerente: ["Dashboard", "Cozinha", "Definições", "Gerir Pratos", "Stock", "Desperdicio"],
    "Funcinário de Stock": ["Stock", "Desperdicio"],
    "Chef de Cozinha": ["Dashboard", "Cozinha", "Gerir Pratos", "Desperdicio"],
    Cozinheiro: ["Cozinha", "Desperdicio"],

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

    const cards = [
        { id: 1, src: dashboard, alt: "Dashboard" },
        { id: 2, src: cozinha, alt: "Cozinha" },
        { id: 3, src: definicoes, alt: "Definições" },
        { id: 4, src: pratos, alt: "Gerir Pratos" },
        { id: 5, src: stock, alt: "Stock" },
        { id: 6, src: desperdicio, alt: "Desperdicio" },
    ];

    const allowed = profile ? permissions[profile.alt] ?? [] : cards.map(c => c.alt);

    function handleCardClick(alt: string,disabled: boolean) {
        if (disabled) {
            setModal({
                open: true,
                title: "Serviço Indisponível",
                message: "A conta atual não tem permissão para aceder a este serviço",
                buttons: [
                    {
                        label: "OK",
                        onClick: () => setModal({ open: false }),
                    },
                ],
            });
            return;
        }
        // Mapa explícito de alt -> rota 
        const routeMap: Record<string, string> = {
            Dashboard: "/",
            Cozinha: "/cozinha",
            "Definições": "/definicoes",
            "Gerir Pratos": "/pratos",
            Stock: "/stock",
            Desperdicio: "/desperdicio",
       };

        const path = routeMap[alt] ?? "/" ;
        navigate(path);

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

                            onClick={() => handleCardClick(card.alt, disabled)}

                            className={
                                "home-card relative border border-gray-300 rounded-lg shadow-xl p-3 aspect-square flex flex-col items-center justify-between overflow-hidden transition-transform duration-150 hover:shadow-md hover:scale-105 cursor-pointer"
                            }
                            aria-label={card.alt}
                            tabIndex={0}
                            onKeyDown={(e) => {

                                if (e.key === "Enter" || e.key === " ") handleCardClick(card.alt, disabled);

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
