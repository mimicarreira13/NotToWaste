import ingredientDataJSON from "../tmp/fullIngredientData.json";
import {useParams} from "react-router-dom";
import {FiAlertTriangle} from "react-icons/fi";
import {useEffect, useState} from "react";
import BasePopup from "../bases/BasePopup.tsx";

function useLocalStorageState(key: string, defaultValue: boolean) {
    const stored = localStorage.getItem(key);
    const initial = stored !== null ? stored === "true" : defaultValue;

    const [value, setValue] = useState(initial);

    useEffect(() => {
        localStorage.setItem(key, String(value));
    }, [key, value]);

    return [value, setValue] as const;
}

export default function Ingredient({ mode }: { mode: boolean }) {
    const [showPopup, setShowPopup] = useLocalStorageState("popup", false);
    const { id } = useParams();
    console.log("This thing " + id);
    const info = ingredientDataJSON.find(entry => entry.id === id);
    console.log("Info " + info);

    return (
        <>
            {info ? (
                <div className="w-full h-full">
                    <div className={"shadow bg-[#D9D9D9] rounded-[15px] block ml-auto mr-auto w-[80%]"}>
                        <h1 className={"text-center text-[64px] "}>{info.title}</h1>
                        <div className="flex flex-row">
                            <div className="w-1/2 ml-[20px] mr-[10px] text-[32px] h-full p-6 flex flex-col gap-12">
                                <div className={"mb-[25px]"}>Marca: <span
                                    className={"text-stone-600"}>{info.marca}</span></div>
                                <div className={"mb-[25px]"}>Custo: <span
                                    className={"text-stone-600"}>{info.custo}€</span></div>
                                <div className={"mb-[25px]"}>Quantidade em stock: <span
                                    className={"text-stone-600"}>{info.quantidade}</span></div>
                                <div className={"mb-[25px]"}>Data de Validade: <span
                                    className={"text-stone-600"}>{info.validade}</span></div>
                            </div>
                            {mode ? (
                                <div className={"w-1/2 h-1/2"}>
                                    <div className={"aspect-[5/4] pb-5"}>
                                        <img src={"/src/assets/ingredients/" + info.imageName} alt={info.title}
                                             className="w-[90%] h-[90%] rounded-[15px] block ml-auto mr-auto mb-[20px] object-cover object-top"/>
                                        <button onClick={() => setShowPopup(true)} className={"ml-auto mr-auto block bg-[#4c6e43] rounded-[5px] shadow p-[20px] text-[35px] text-white"}>Editar Ingrediente</button>
                                    </div>
                                    {showPopup && (
                                        <BasePopup
                                            type={"ingredients"}
                                            greenButton={"Salvar Ingrediente"}
                                            redFunction={"close"}
                                            greenFunction={"close"}
                                            onClose={() => setShowPopup(false)}
                                            title={"Editar Ingrediente"}
                                        />
                                    )}
                                </div>
                            ):(
                                <img src={"/src/assets/ingredients/" + info.imageName} alt={info.title}
                                     className="rounded-[15px] w-1/3 h-1/3 block ml-auto mr-auto mb-[20px]"/>
                            )}

                        </div>
                    </div>
                </div>
            ):(
                <div className="text-[64px] text-black">
                    Page not available.
                    <FiAlertTriangle className={"text-black block ml-auto mr-auto"} />
                </div>
            )}
        </>
    )
}