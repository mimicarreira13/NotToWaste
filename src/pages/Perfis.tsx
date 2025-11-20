import {useNavigate} from "react-router-dom";
import { useProfile } from "../contexts/ProfileContext";

import gerente from "../assets/images/icons/icon_gerente.png";
import funcionario_stock from "../assets/images/icons/icon_stock.png";
import chef from "../assets/images/icons/icon_chef.png";
import cozinheiro from "../assets/images/icons/icon_cozinehiro.png";

export default function Perfis() {
    const navigate = useNavigate();
    const { setProfile } = useProfile();

    const cards = [
        { id: 1, src: gerente, alt: "Gerente" },
        { id: 2, src: funcionario_stock, alt: "Funcinário de Stock" },
        { id: 3, src: chef, alt: "Chef de Cozinha" },
        { id: 4, src: cozinheiro, alt: "Cozinheiro" },
    ];

    function selectProfile(card: { id: number; src: string; alt: string }) {
        setProfile({ id: card.id, alt: card.alt });
        navigate("/");
    }

    return (
        <div className="w-full max-w-6xl mx-auto p-4" style={{ marginTop: 20 }}>
            <div className="flex justify-center w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-10">
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
                                "cursor-pointer border border-gray-300 shadow-xl p-3 flex flex-col aspect-square items-center justify-between overflow-hidden transition-transform duration-150 hover:shadow-md hover:scale-105 " +
                                "w-[360px] h-[360px]"
                            }
                            style={{ borderRadius: 5 }}
                        >
                            <img
                                src={card.src}
                                alt={card.alt}
                                className="max-w-full object-contain"
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
        </div>
    );
}