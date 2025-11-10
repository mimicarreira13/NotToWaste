import dashboard from "../assets/images/icons/dashboard.png";
import cozinha from "../assets/images/icons/cozinha.png";
import definicoes from "../assets/images/icons/definicoes.png";
import pratos from "../assets/images/icons/pratos.png";
import stock from "../assets/images/icons/stock.png";
import desperdicio from "../assets/images/icons/desperdicio.png";

export default function Home() {
    const cards = [
        { id: 1, src: dashboard, alt: "Dashboard" },
        { id: 2, src: cozinha, alt: "Cozinha" },
        { id: 3, src: definicoes, alt: "Definições" },
        { id: 4, src: pratos, alt: "Gerir Pratos" },
        { id: 5, src: stock, alt: "Stock" },
        { id: 6, src: desperdicio, alt: "Desperdício" },
    ];

    return (
        <div className="w-full max-w-6xl mx-auto p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {cards.map((card) => (
                    <div
                        key={card.id}
                        className="border border-gray-300 rounded-lg shadow-xl p-3 aspect-square flex flex-col items-center justify-between overflow-hidden transition-transform duration-150 hover:shadow-md hover:scale-105"
                        role="group"
                        aria-label={card.alt}
                    >
                        <div className="flex-1 flex items-center justify-center w-full">
                        <img
                            src={card.src}
                            alt={card.alt}
                            className="max-h-40 max-w-full object-contain"
                        />
                        </div>
                        <div className="w-full bg-[#4C6E43] text-white text-center py-2 mt-2 rounded">
                            {card.alt}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}