import { useState } from 'react';

export default function Definicoes(){
    const [numeroDiasPrato, setNumeroDiasPrato] = useState(3);
    const [numeroDiasIngrediente, setNumeroDiasIngrediente] = useState(7);

    function contagemDiasPrato(action: 'increment' | 'decrement') {
        if (action === 'increment') {
            setNumeroDiasPrato(numeroDiasPrato + 1);
        }
        if (action === 'decrement' && numeroDiasPrato > 0) {
            setNumeroDiasPrato(numeroDiasPrato - 1);
        }
    }

    function contagemDiasIngrediente(action: 'increment' | 'decrement') {
        if (action === 'increment') {
            setNumeroDiasIngrediente(numeroDiasIngrediente + 1);
        }
        if (action === 'decrement' && numeroDiasIngrediente > 0) {
            setNumeroDiasIngrediente(numeroDiasIngrediente - 1);
        }
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
            <div className="flex flex-row align-items items-center justify-center text-white gap-32">
                <button className="bg-[#C34A3A] px-10 py-2 rounded-lg">Cancelar</button>
                <button className="bg-[#4C6E43] px-10 py-2 rounded-lg">Guardar Alterações</button>
            </div>
        </div>
    );
}
