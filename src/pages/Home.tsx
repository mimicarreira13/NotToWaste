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
import proibido from "../assets/images/icons/proibido.png";

const permissions: Record<string, string[]> = {
    Gerente: ["Dashboard", "Cozinha", "Definições", "Gerir Pratos", "Stock", "Desperdício"],
    "Funcinário de Stock": ["Stock", "Desperdício"],
    "Chef de Cozinha": ["Dashboard", "Cozinha", "Gerir Pratos", "Desperdício"],
    Cozinheiro: ["Cozinha", "Desperdício"],
};

type ModalConfig = {
    open: boolean;
    title?: string;
    message?: string;
    buttons?: { label: string; onClick?: () => void }[];
};

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

    const allowed = profile ? permissions[profile.alt] ?? [] : cards.map(c => c.alt);

    function handleCardClick(card: Card, disabled: boolean) {
        if (disabled) {
            setModal({
                open: true,
                title: "Serviço Indisponível",
                message: "A conta atual não tem permissão para aceder a este serviço",
                buttons: [
                    { label: "OK", onClick: () => setModal({ open: false }) },
                ],
            });
            return;
        }
        if (card.route) {
            navigate(card.route);
        } else {
            setModal({
                open: true,
                title: "Indisponível",
                message: "Essa funcionalidade ainda não tem uma rota configurada.",
                buttons: [{ label: "OK", onClick: () => setModal({ open: false }) }],
            });
        }
    }

    // O .map fica dentro do return do JSX!
    return (
        <div className="w-full max-w-6xl mx-auto p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {cards.map((card) => {
                    const disabled = !allowed.includes(card.alt);
                    return (
                        <div
                            key={card.id}
                            onClick={() => handleCardClick(card, disabled)}
                            className={
                                "relative border border-gray-300 rounded-lg shadow-xl p-3 aspect-square flex flex-col items-center justify-between overflow-hidden transition-transform duration-150 hover:shadow-md hover:scale-105 " +
                                (disabled ? " cursor-not-allowed" : " cursor-pointer")
                            }
                            role="button"
                            aria-label={card.alt}
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") handleCardClick(card, disabled);
                            }}
                        >
                            {disabled && (
                                <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                                    <img src={proibido} alt="Proibido" className="w-32 h-32 opacity-90" />
                                </div>
                            )}

                            <div className={"flex-1 flex items-center justify-center w-full  z-10 " + (disabled ? " opacity-50 filter grayscale" : "")}>
                                <img
                                    src={card.src}
                                    alt={card.alt}
                                    className="max-h-40 max-w-full object-contain"
                                />
                            </div>
                            <div className={"w-full bg-[#4C6E43] text-white text-center py-2 mt-2 rounded"  + (disabled ? " opacity-50 filter grayscale" : "")}>
                                {card.alt}
                            </div>
                        </div>
                    );
                })}
            </div>

            <Modal
                open={modal.open}
                title={modal.title}
                message={modal.message}
                buttons={modal.buttons}
                onClose={() => setModal({ open: false })}
            />
        </div>
    );
}
