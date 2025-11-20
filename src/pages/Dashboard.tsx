const cards = [
    {
        id: "card-mes",
        content: (
            <>
                <div className="bg-[#D9D9D9] text-[#000000] pb-4 p-4 rounded mb-1 text-2xl text-center">1 kg - 2€</div>
                <div className="bg-[#BCBCBC] text-[#000000] p-2 rounded mb-1 text-sm">1º - Esparguete (1Kg / 2€)</div>
                <div className="w-full bg-[#4C6E43] text-[#D9D9D9] py-[6px] text-center mt-auto">Neste Mês</div>
            </>
        ),
        classes: "bg-[#D9D9D9] rounded-5 shadow flex flex-col justify-between border-2 border-[#CFCFCF] pt-5"
    },
    {
        id: "card-sugestoes",
        content: (
            <>
                <div className="mb-2">Polvo à Lagareiro <span className="float-right text-sm text-[#000000]">3 dias restantes</span></div>
                <div className="mb-2">Bitoque <span className="float-right text-sm text-[#000000]">4 dias restantes</span></div>
                <div>Prego <span className="float-right text-sm text-[#000000]">6 dias restantes</span></div>
                <div className="w-full bg-[#4C6E43] text-[#D9D9D9] py-2 mt-20 text-center">Sugestões</div>
            </>
        ),
        classes: "bg-[#D9D9D9] rounded-5 shadow border-2 border-[#CFCFCF]"
    },
    {
        id: "card-relatorio-sustentabilidade",
        content: (
            <>
                <img src="src/assets/images/icons/sustainability_report.png" className="w-1/3 h-15 pt-5" alt="Sustentabilidade"/>
                <button className="w-full bg-[#4C6E43] text-[#D9D9D9] py-2 mt-auto">Baixar Relatório de Sustentabilidade</button>
            </>
        ),
        classes: "bg-[#D9D9D9] flex flex-col justify-center items-center rounded-5 shadow border-2 border-[#CFCFCF]"
    },
    {
        id: "card-pontuacao",
        content: (
            <>
                <div className="text-[#000000] pt-8 mb-2 text-sm">A sua pontuação é:</div>
                <div className="text-[#4C6E43] font-medium text-lg">EXCELENTE</div>
                <div className="text-3xl font-bold 4C6E43 my-2">85</div>
                <div className="w-full bg-[#4C6E43] text-[#D9D9D9] py-2 mt-auto text-center">Pontuação de Sustentabilidade</div>
            </>
        ),
        classes: "bg-[#D9D9D9] rounded-5 shadow flex flex-col items-center border-2 border-[#CFCFCF]"
    },
    {
        id: "card-desperdicio",
        content: (
            <>
                <div className="text-[#6E4343] text-lg font-bold">2% das compras</div>
                <div className="text-[#000000]">foram desperdiçadas</div>
                <div className="text-[#6E4343] mt-2">2€ de desperdicio neste mês</div>
                <div className="w-full bg-[#4C6E43] text-[#D9D9D9] py-2 mt-auto text-center">Desperdício de compras</div>
            </>
        ),
        classes: "bg-[#D9D9D9] rounded-5 shadow flex flex-col justify-center border-2 border-[#CFCFCF] text-center pt-6"
    },
    {
        id: "card-relatorio-ingredientes",
        content: (
            <>
                <img src="src/assets/images/icons/ingredients_report.png" className="w-1/3 h-15 pt-5" alt="Ingredientes"/>
                <button className="w-full bg-[#4C6E43] text-[#D9D9D9] py-2 mt-auto">Baixar Relatório de Ingredientes</button>
            </>
        ),
        classes: "bg-[#D9D9D9] flex flex-col justify-center items-center rounded-5 shadow border-2 border-[#CFCFCF]"
    }
];

export default function Dashboard() {
    return (
        <div className="flex justify-center p-4">
            <div className="max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
                {cards.map(card => (
                    <div id={card.id} key={card.id} className={card.classes}>
                        {card.content}
                    </div>
                ))}
            </div>
        </div>
    );
}
