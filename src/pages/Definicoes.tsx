const cardStyle = [
    {
    id: "alerta-prato",
    content:(
        <>
            <div className="text-center bg-[#4C6E43] text-[#FFFFFF] py-2 rounded-lg font-bold width-auto">
                Editar Sugestões de Pratos
            </div>
            <div className="grid grid-cols-5 m-1 px-14 items-center text-sm">
                <div className="w-8 h-8 bg-[#FFFFFF] text-black flex justify-center items-center rounded-lg">
                    <h5>3</h5>
                </div>
                <div>
                    <h5>dia(s)</h5>
                </div>
                <div className="w-8 h-8 bg-[#4C6E43] text-white flex justify-center items-center rounded-lg">
                    <button>+</button>
                </div>
                <div className="w-8 h-8 bg-[#6E4343] text-white flex justify-center items-center rounded-lg">
                    <button>-</button>
                </div>
                <div className="text-end">
                    <h5>Pratos com ingredientes a</h5>
                    <h5>3 dias de atingir a validade</h5>
                </div>
            </div>
        </>
    )},
    {
    id: "alerta-ingrediente",
    content:(
        <>
            <div className="text-center bg-[#4C6E43] text-[#FFFFFF] py-2 rounded-lg font-bold width-auto">
                Editar Alertas de Notificações
            </div>
            <div className="grid grid-cols-5 m-1 px-14 items-center text-sm">
                <div className="w-8 h-8 bg-[#FFFFFF] text-black flex justify-center items-center rounded-lg">
                    <h5>7</h5>
                </div>
                <div>
                    <h5>dia(s)</h5>
                </div>
                <div className="w-8 h-8 bg-[#4C6E43] text-white flex justify-center items-center rounded-lg">
                    <button>+</button>
                </div>
                <div className="w-8 h-8 bg-[#6E4343] text-white flex justify-center items-center rounded-lg">
                    <button>-</button>
                </div>
                <div className="text-end">
                    <h5>Ingredientes a</h5>
                    <h5>7 dias de atingir a validade</h5>
                </div>
            </div>
        </>
    )}
];

export default function Definicoes(){
    return(
        <div>
            {cardStyle.map(card => (
                <div
                    id={card.id}
                    key={card.id}
                    className="border-2 border-[#CFCFCF] rounded-lg mb-6"
                    style={{width: "750px"}}
                >
                    {card.content}
                </div>
            ))}
            <div className="flex flex-row align-items items-center text-white rounded-lg">
                <button className="bg-[#C34A3A]">Cancelar</button>
                <button className="bg-[#4C6E43]">Guardar Alterações</button>
            </div>
        </div>
    );
}
