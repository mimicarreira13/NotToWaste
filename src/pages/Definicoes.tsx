import { useState } from 'react';
import Modal from '../components/Modal';
import {useNavigate} from "react-router-dom";

export default function Definicoes(){

    const [numeroDiasPrato, setNumeroDiasPrato] = useState(() => {
        const saved = localStorage.getItem('numeroDiasPrato');
        return saved ? Number(saved) : 3;
    });

    const [numeroDiasIngrediente, setNumeroDiasIngrediente] = useState(() => {
        const saved = localStorage.getItem('numeroDiasIngrediente');
        return saved ? Number(saved) : 7;
    });

    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();

    function contagemDiasPrato(action: 'increment' | 'decrement') {
        setNumeroDiasPrato((prev) => {
            if (action === 'increment') return prev + 1;
            if (action === 'decrement' && prev > 0) return prev - 1;
            return prev;
        });
    }

    function contagemDiasIngrediente(action: 'increment' | 'decrement') {
        setNumeroDiasIngrediente((prev) => {
            if (action === 'increment') return prev + 1;
            if (action === 'decrement' && prev > 0) return prev - 1;
            return prev;
        });
    }

    function guardarAlteracoes() {
        localStorage.setItem('numeroDiasPrato', String(numeroDiasPrato));
        localStorage.setItem('numeroDiasIngrediente', String(numeroDiasIngrediente));
        setModalOpen(false);
    }

    const cardStyle = [
        {
            id: "alerta-prato",
            content:(
                <>
                    <div className="text-center bg-[#4C6E43] text-[#FFFFFF] py-2 rounded-lg font-bold width-auto">
                        Editar Sugestões de Pratos
                    </div>
                    <div className="grid grid-cols-5 m-1 px-14 items-center text-lg">
                        <div className="w-8 h-8 bg-[#FFFFFF] text-black flex justify-center items-center rounded-lg">
                            <h5>{numeroDiasPrato}</h5>
                        </div>
                        <div>
                            <h5>dia(s)</h5>
                        </div>
                        <div className="w-8 h-8 bg-[#4C6E43] text-white flex justify-center items-center rounded-lg text-lg">
                            <button onClick={() => contagemDiasPrato('increment')}>+</button>
                        </div>
                        <div className="w-8 h-8 bg-[#6E4343] text-white flex justify-center items-center rounded-lg text-lg">
                            <button onClick={() => contagemDiasPrato('decrement')}>-</button>
                        </div>
                        <div className="text-end">
                            <h5>Pratos com ingredientes a</h5>
                            <h5>{numeroDiasPrato} dias de atingir a validade</h5>
                        </div>
                    </div>
                </>
            )
        },
        {
            id: "alerta-ingrediente",
            content:(
                <>
                    <div className="text-center bg-[#4C6E43] text-[#FFFFFF] py-2 rounded-lg font-bold width-auto">
                        Editar Alertas de Notificações
                    </div>
                    <div className="grid grid-cols-5 m-1 px-14 items-center text-lg">
                        <div className="w-8 h-8 bg-[#FFFFFF] text-black flex justify-center items-center rounded-lg">
                            <h5>{numeroDiasIngrediente}</h5>
                        </div>
                        <div>
                            <h5>dia(s)</h5>
                        </div>
                        <div className="w-8 h-8 bg-[#4C6E43] text-white flex justify-center items-center rounded-lg text-lg">
                            <button onClick={() => contagemDiasIngrediente('increment')}>+</button>
                        </div>
                        <div className="w-8 h-8 bg-[#6E4343] text-white flex justify-center items-center rounded-lg text-lg">
                            <button onClick={() => contagemDiasIngrediente('decrement')}>-</button>
                        </div>
                        <div className="text-end">
                            <h5>Ingredientes a</h5>
                            <h5>{numeroDiasIngrediente} dias de atingir a validade</h5>
                        </div>
                    </div>
                </>
            )
        }
    ];

    return(
        <>
            <div>
                {cardStyle.map(card => (
                    <div
                        id={card.id}
                        key={card.id}
                        className="border-2 border-[#CFCFCF] rounded-lg mb-6"
                        style={{width: "850px"}}
                    >
                        {card.content}
                    </div>
                ))}

                <div className="flex flex-row items-center justify-center text-white gap-32">
                    <button className="bg-[#C34A3A] px-10 py-2 rounded-lg" onClick={() => navigate(-1)}>
                        Cancelar
                    </button>
                    <button
                        className="bg-[#4C6E43] px-10 py-2 rounded-lg"
                        onClick={() => setModalOpen(true)}   // abre o modal
                    >
                        Guardar Alterações
                    </button>
                </div>
            </div>

            {/* Modal reutilizado da Milena*/}
            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                title="Alterações"
                message={`Guardadas com sucesso!`}
                buttons={[
                    {
                        label: "Ok",
                        className: "px-8 py-2 rounded text-lg text-white bg-[#4C6E43] hover:opacity-90",
                        onClick:guardarAlteracoes,
                    },
                ]}
            />
        </>
    );
}
