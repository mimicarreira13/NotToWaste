const cardBaseClasses = "bg-[#D9D9D9] rounded-5 shadow flex flex-col border-2 border-[#CFCFCF] w-full min-h-[220px] text-center";

const cards = [
    {
        id: "card-mes",
        content: (
            <>
                <div className="bg-[#D9D9D9] text-[#000000] pb-4 p-4 rounded mb-1 text-2xl">1 kg - 2€</div>
                <div className="bg-[#BCBCBC] text-[#000000] p-2 text-sm text-left h-[80px] mt-2">
                    <ul>
                        <li>1º - Esparguete (1Kg / 2€)</li>
                        <li>2º -</li>
                        <li>3º -</li>
                    </ul>
                </div>
                <div className="w-full bg-[#4C6E43] text-[#D9D9D9] py-[6px] text-center mt-auto">Neste Mês</div>
            </>
        )
    },
    {
        id: "card-sugestoes",
        content: (
            <>
                <div className="bg-[#cfcfcf] text-left h-auto">
                    <ul>
                        <ul>
                            <li className="text-s">Polvo</li>
                        </ul>
                        <li className="text-xs">Polvo à Lagareiro</li>
                    </ul>
                    <span className="float-right text-sm font-semibold">3 dias restantes</span>
                </div>
                <div className="bg-[#bcbcbc] text-left h-auto">
                    <ul>
                        <ul>
                            <li className="text-s">Ovo</li>
                        </ul>
                        <li className="text-xs">Bitoque</li>
                    </ul>
                    <span className="float-right text-sm font-semibold">4 dias restantes</span>
                </div>
                <div className="bg-[#cfcfcf] text-left h-auto">
                    <ul>
                        <ul>
                            <li className="text-s">Salada</li>
                        </ul>
                        <li className="text-xs">Prego</li>
                    </ul>
                    <span className="float-right text-sm font-semibold">6 dias restantes</span></div>
                <button className="w-full bg-[#4C6E43] text-[#D9D9D9] py-2 text-center mt-auto">Sugestões</button>
            </>
        )
    },
    {
        id: "card-relatorio-sustentabilidade",
        content: (
            <>
                <div className="flex flex-center">
                    <img src="src/assets/images/icons/sustainability_report.png" className="w-1/3 h-15 mx-auto pt-10"
                         alt="Sustentabilidade"/>
                </div>
                <button className="w-full bg-[#4C6E43] text-[#D9D9D9] py-2 mt-auto">Baixar Relatório de Sustentabilidade</button>
            </>
        )
    },
    {
        id: "card-pontuacao",
        content: (
            <>
                <div className="text-[#000000] pt-10 mb-2 text-sm">A sua pontuação é:</div>
                <div className="text-[#4C6E43] font-medium text-lg">EXCELENTE</div>
                <div className="text-3xl font-bold 4C6E43 my-2">85</div>
                <div className="w-full bg-[#4C6E43] text-[#D9D9D9] py-2 mt-auto text-center">Pontuação de Sustentabilidade</div>
            </>
        )
    },
    {
        id: "card-desperdicio",
        content: (
            <>
                <div className="text-[#6E4343] text-lg font-bold pt-10">2% das compras</div>
                <div className="text-[#000000]">foram desperdiçadas</div>
                <div className="text-[#6E4343] mt-2">2€ de desperdicio neste mês</div>
                <div className="w-full bg-[#4C6E43] text-[#D9D9D9] py-2 mt-auto text-center">Desperdício de compras</div>
            </>
        )
    },
    {
        id: "card-relatorio-ingredientes",
        content: (
            <>
            <div className="flex flex-center">
                <img src="src/assets/images/icons/ingredients_report.png" className="w-1/3 h-15 mx-auto pt-10" alt="Ingredientes"/>
            </div>
                <button className="w-full bg-[#4C6E43] text-[#D9D9D9] py-2 mt-auto">Baixar Relatório de Ingredientes</button>
            </>
        )
    }
];

export default function Dashboard() {
    return (
        <div className="flex justify-center p-4">
            <div className="max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
                {cards.map(card => (
                    <div id={card.id} key={card.id} className={cardBaseClasses}>
                        {card.content}
                    </div>
                ))}
            </div>
        </div>
    );
}
