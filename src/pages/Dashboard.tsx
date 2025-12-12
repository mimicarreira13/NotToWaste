import Modal from '../components/Modal';
import React from "react";
import {getPontuacaoSustentabilidade, type RankingItem, getRankingDesperdicio} from "../api/dashboard.ts"
import { useNavigate } from "react-router-dom";

const cardBaseClasses = "bg-[#D9D9D9] rounded-5 shadow flex flex-col border-2 border-[#CFCFCF] w-full min-h-[220px] text-center p-0";

export default function Dashboard() {
    const [openSugestoesModal, setOpenSugestoesModal] = React.useState(false);
    const [pontuacaoSustentabilidade, setPontuacaoSustentabilidade] = React.useState<number>(0);
    const [ranking, setRanking] = React.useState<RankingItem[]>([]);
    const [totalKgDesperdicado, setTotalKgDesperdicado] = React.useState<number>(0);
    const [totalCustoDesperdicio, setTotalCustoDesperdicio] = React.useState<number>(0);
    const [percentagemDesperdicio, setPercentagemCustoDesperdicio] = React.useState<number>(0);
    const navigate = useNavigate();

    React.useEffect(() => {
        async function loadPontuacao() {
            try {
                const objeto = await getPontuacaoSustentabilidade();
                setPontuacaoSustentabilidade(objeto);
            } catch (err) {
                console.error("Erro ao calcular a pontuação de sustentabilidade", err);
            }
        }
        loadPontuacao();
    }, []);

    React.useEffect(() => {
        async function loadRanking() {
            try {
                const rankingData = await getRankingDesperdicio();
                console.log("rankingData", rankingData); // verifica no console
                setRanking(rankingData);
                const totalKg = rankingData.reduce(
                    (custoDesperdicio, item) => custoDesperdicio + item.quantidadeDesperdicada,
                    0
                );
                const totalCusto = rankingData.reduce(
                    (custoEuros, item) => custoEuros + item.custoDesperdicio,
                    0
                );
                const percentagemDesperdicio = rankingData.reduce(
                    (percentagem, item) => percentagem + item.percentagemDesperdicio,
                    0
                );
                setPercentagemCustoDesperdicio(percentagemDesperdicio);
                setTotalKgDesperdicado(totalKg);
                setTotalCustoDesperdicio(totalCusto);
            } catch (err) {
                console.error("Erro ao carregar ranking de desperdício", err);
            }
        }
        loadRanking();
    }, []);

    function getClassificacaoSustentabilidade(score: number | null): string {
        if (score === null || Number.isNaN(score)) return "-";

        if (score <= 25) return "Péssima";
        if (score <= 50) return "Média";
        if (score <= 75) return "Bom";
        if (score <= 99) return "Muito bom";
        return "Excelente"; // 100
    }

    const cards = [
    {
        id: "card-sugestoes",
        content: (
            <button onClick={() => setOpenSugestoesModal(true)} className="flex flex-col w-full h-full text-center m-0" >
                <div className="w-full bg-[#4C6E43] text-[#D9D9D9] py-2 text-center mt-auto">Ingredientes a terminar o prazo</div>
                <div className="bg-[#cfcfcf] text-left h-auto">
                    <ul>
                        <ul>
                            <li className="text-s px-2">Polvo</li>
                        </ul>
                        <li className="text-sm px-2">Sugestão de prato: Polvo à Lagareiro</li>
                    </ul>
                    <span className="float-right text-sm font-semibold px-2">3 dias restantes</span>
                </div>
                <div className="bg-[#bcbcbc] text-left h-auto">
                    <ul>
                        <ul>
                            <li className="text-s px-2">Ovo</li>
                        </ul>
                        <li className="text-sm px-2">Sugestão de Prato: Bitoque</li>
                    </ul>
                    <span className="float-right text-sm font-semibold px-2">4 dias restantes</span>
                </div>
                <div className="bg-[#cfcfcf] text-left h-auto">
                    <ul>
                        <ul>
                            <li className="text-s px-2">Salada</li>
                        </ul>
                        <li className="text-sm px-2">Sugestão de Prato: Prego</li>
                    </ul>
                    <span className="float-right text-sm font-semibold px-2">6 dias restantes</span></div>
            </button>
        )
    },
    {
        id: "card-mes",
        content: (
            <>
                <div className="w-full bg-[#4C6E43] text-[#D9D9D9] py-[6px] text-center mt-auto">Ranking Mensal de
                    Desperdício
                </div>
                <div className="bg-[#D9D9D9] text-[#000000] pb-4 p-4 rounded mb-1 text-lg">{percentagemDesperdicio.toFixed(3)}% ({totalCustoDesperdicio.toFixed(2)}€) de compras desperdiçadas
                </div>
                <div className="bg-[#D9D9D9] text-[#000000] rounded text-lg">{totalKgDesperdicado}kg</div>
                <div className="bg-[#BCBCBC] text-[#000000] p-2 text-sm text-left h-[80px] mt-2">
                    <ul>
                        {ranking.slice(0, 3).map((item, index) => (
                            <li key={item.ingredienteId}>
                                {index + 1}º - {item.nome} ({item.quantidadeDesperdicada}Kg /{" "}
                                {item.custoDesperdicio}€)
                            </li>
                        ))}
                        {ranking.length < 3 &&
                            Array.from({length: 3 - ranking.length}).map((_, i) => (
                                <li key={`empty-${i}`}>{ranking.length + i + 1}º -</li>
                            ))}
                    </ul>
                </div>
            </>
        )
    },
        {
            id: "card-pontuacao",
            content: (
                <>
                    <div className="w-full bg-[#4C6E43] text-[#D9D9D9] py-2 text-center">Pontuação de Sustentabilidade</div>
                    <div className="text-[#000000] pt-8 mb-2 text-lg">A sua pontuação é:</div>
                    <div className="text-[#4C6E43] font-medium text-lg">{getClassificacaoSustentabilidade(pontuacaoSustentabilidade)}</div>
                    <div className="text-3xl font-bold 4C6E43 my-2">{Math.round(pontuacaoSustentabilidade) ?? "--"}</div>
                </>
            )
        },
        {
            id: "card-relatorio-sustentabilidade",
            content: (
                <button onClick={()=>navigate("/relatorios?only=sustainability")}>
                    <div className="w-full bg-[#4C6E43] text-[#D9D9D9] py-2 mt-auto">Baixar Relatório de Sustentabilidade</div>
                    <div className="flex flex-center">
                        <img src="src/assets/images/icons/sustainability_report.png" className="w-1/3 h-15 mx-auto pt-6" alt="Sustentabilidade"/>
                    </div>
                </button>
            )
        },
        {
            id: "card-relatorio-ingredientes",
            content: (
                <button onClick={()=>navigate("/relatorios?only=ingredients")}>
                    <div className="w-full bg-[#4C6E43] text-[#D9D9D9] py-2 mt-auto">Baixar Relatório de Ingredientes</div>
                    <div className="flex flex-center">
                        <img src="src/assets/images/icons/ingredients_report.png" className="w-1/3 h-15 mx-auto pt-6" alt="Ingredientes"/>
                    </div>
                </button>
            )
        }
    ];
    return (
        <div className="flex justify-center p-4">
            <div className="max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-20 mt-12">
                {cards.map((card,index) => (
                    <div id={card.id} key={card.id} className={cardBaseClasses + (index === 0 ? " md:col-span-2 md:mt-8" : "")}>
                        {card.content}
                    </div>
                ))}
            </div>
            <Modal
                open={openSugestoesModal}
                onClose={() => setOpenSugestoesModal(false)}
                title="Ingredientes a terminar o prazo"
                widthClass="max-w-6xl"
                buttons={[
                    {
                        label: "Fechar",
                        className:
                            "px-6 py-2 rounded text-sm text-white bg-[#4C6E43] hover:opacity-90",
                        onClick: () => setOpenSugestoesModal(false),
                    },
                ]}
            >
                {/* Conteúdo da tabela da modal */}
                <div className="max-full overflow-x-auto">
                    <table className="w-auto text-left text-sm border-collapse">
                        <tbody>
                        <tr className="bg-[#bcbcbc]">
                            <td className="px-3 py-2 font-semibold border border-[#949494]">Ovo</td>
                            <td className="px-3 py-2 border border-[#949494]">
                                Pratos recomendados: Bitoque, Prego, Prego no Prato, Hamburger
                                Especial, Tostas Benedict
                            </td>
                            <td className="px-3 py-2 border border-[#949494]">Tempo restante: 1 dia</td>
                            <td className="px-3 py-2 border border-[#949494]">Quantidade restante: 4 kg</td>
                        </tr>
                        <tr className="bg-[#bcbcbc]">
                            <td className="px-3 py-2 font-semibold border border-[#949494]">Polvo</td>
                            <td className="px-3 py-2 border border-[#949494]">
                                Pratos recomendados: Polvo Lagareiro, Polvo Salteado, Arroz de Polvo
                            </td>
                            <td className="px-3 py-2 border border-[#949494]">Tempo restante: 3 dias</td>
                            <td className="px-3 py-2 border border-[#949494]">Quantidade restante: 1 kg</td>
                        </tr>
                        <tr className="bg-[#bcbcbc]">
                            <td className="px-3 py-2 font-semibold border border-[#949494]">Alface</td>
                            <td className="px-3 py-2 border border-[#949494]">
                                Pratos recomendados: Bitoque, Salada Cesar, Pokebowl, Salada de Atum,
                                Salada Colorida com Requeijão
                            </td>
                            <td className="px-3 py-2 border border-[#949494]">Tempo restante: 4 dias</td>
                            <td className="px-3 py-2 border border-[#949494]">Quantidade restante: 0,2 kg</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </Modal>
        </div>
    );
}