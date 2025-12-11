import { useState, useRef } from "react";
import { Dishes, type DishesHandle } from "../api/AddDish.tsx";
import {useNavigate} from "react-router-dom";


function Ingredients(){
    return(
        <>
            <div className={"h-[80%] flex flex-row items-center"}>
                <div className={"w-1/2"}>Nome:
                    <input id={"name"} className={"bg-white rounded-[15px] p-[5px] ml-[15px]"}
                           placeholder={"Insira o nome"}/>
                </div>
                <div className={"w-1/2"}>Data de Validade:
                    <input id={"data"} className={"bg-white rounded-[15px] p-[5px] ml-[15px]"} type="date"
                           placeholder={"Insira a data de validade"} />
                </div>
            </div>
            <div className={"h-[80%] flex flex-row items-center"}>
                <div className={"w-1/2"}>Marca:
                    <input id={"brand"} className={"bg-white rounded-[15px] p-[5px] ml-[15px]"}
                           placeholder={"Insira a marca"}/>
                </div>
                <div className={"w-1/2"}>Preço (€):
                    <input id={"price"} className={"bg-white rounded-[15px] p-[5px] ml-[15px]"}
                           placeholder={"Insira o custo"}/>
                </div>
            </div>
            <div className={"h-[80%] flex flex-row items-center"}>
                <div className={"w-1/2"}>Imagem:
                    <input type={"file"} className={"ml-[15px] w-[423px]"}/>
                </div>
                <div className={"w-1/2"}>Quantidade:
                    <input id={"quantity"} className={"bg-white rounded-[15px] p-[5px] ml-[15px]"}
                           placeholder={"Insira a quantidade"}/>
                </div>
            </div>
        </>
    )
}

function InfoDelete({ ItemName }: { ItemName?: string }) {
    return (
        <div className="text-center text-[24px] p-4">
            <p>Tem a certeza que pretende eliminar o prato?</p>
            {ItemName && (
                <p className="font-bold mt-2 text-[28px]">"{ItemName}"</p>
            )}
            <p className="text-red-600 mt-4 text-[20px]">
                Esta ação não pode ser desfeita!
            </p>
        </div>
    );
}

function useFunctionFinder(close: () => void, onConfirm: (() => void | Promise<void>) | undefined) {
    const navigate = useNavigate();
    async function functionFinder(type: string) {
        switch (type) {
            case "navigate":
                navigate("/pratos")
                break;
            case "close":
                close();
                break;
            case "delete":
                if (onConfirm) {
                    try {
                        await onConfirm();
                        close();
                    } catch (error) {
                        console.error("Erro ao eliminar:", error);
                    }
                }
                break;
        }
    }

    return { functionFinder };
}

export default function BasePopup({
                                      type,
                                      greenButton,
                                      redFunction,
                                      greenFunction,
                                      onClose,
                                      title,
                                      onConfirm,
                                      itemName,
                                  }: {
    type: string,
    greenButton: string,
    redFunction: string,
    greenFunction: string,
    onClose: () => void,
    title: string,
    onConfirm?: () => Promise<void> | void,
    itemName?: string,
}) {
    const [selectedIngredientIds, setSelectedIngredientIds] = useState<string[]>([]);
    const { functionFinder } = useFunctionFinder(onClose, onConfirm);
    const dishesRef = useRef<DishesHandle>(null);
    const [isSubmitting, setIsSubmitting] = useState(false); // Add this state

    const render = () => {
        switch(type) {
            case "dishes":
                return (
                    <Dishes
                        ref={dishesRef}
                        selectedIds={selectedIngredientIds}
                        onChange={setSelectedIngredientIds}
                        onClose={onClose}
                    />
                );
            case "ingredients":
                return <Ingredients />;
            case "infoDelete":
                return <InfoDelete ItemName={itemName} />;
            default:
                return null;
        }
    };


    const handleSubmit = async () => {
        if (dishesRef.current) {
            setIsSubmitting(true);
            try {
                await dishesRef.current.handleSubmit();
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    let widthPop = "70%";
    let heightPop = "80%";
    let divWhite = "85%";
    let divGreen = "15%";

    if (type === "infoDelete") {
        widthPop = "50%";
        heightPop = "45%";
        divWhite = "75%";
        divGreen = "25%";
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#4c6e43] shadow-lg overflow-auto rounded-[25px]" style={{width: widthPop, height: heightPop}}>
                <div className={"text-[45px] text-white text-center content-center"} style={{height: divGreen}}>
                    {title}
                </div>
                <div className="bg-[#d9d9d9] w-full overflow-auto rounded-[25px] flex flex-col items-center justify-evenly text-center" style={{height: divWhite}}>
                    <div className={"h-[95%] flex flex-col w-[90%] text-[25px]"}>
                        {render()}
                        <div className={"mt-4 text-[15px] flex flex-row w-full justify-evenly text-center"}>
                            <button
                                className={"bg-[#c34a3a] text-white w-[200px] h-[70px] content-center text-[40px] rounded-[10px] hover:bg-[#a93a2a] transition-colors"}
                                onClick={() => functionFinder(redFunction)}
                                disabled={isSubmitting}
                            >
                                Cancelar
                            </button>
                            <button
                                className={"bg-[#4c6e43] text-white w-[500px] h-[70px] content-center text-[40px] rounded-[10px] hover:bg-[#3a5a32] transition-colors"}
                                onClick={async () => {
                                    if (type === "dishes") {
                                        await handleSubmit();
                                    } else {
                                        await functionFinder(greenFunction);
                                    }
                                }}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "A processar..." : greenButton}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}