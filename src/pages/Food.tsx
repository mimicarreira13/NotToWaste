import foodDataJSON from "../tmp/fullDataFood.json";
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

export default function Food({ mode }: { mode: boolean }) {
    const [showPopupDelete, setShowPopupDelete] = useLocalStorageState("popupDelete", false);
    const [showPopupEdit, setShowPopupEdit] = useLocalStorageState("popupEdit", false);

    const { id } = useParams();
    const info = foodDataJSON.find(entry => entry.id === id);

    return (
        <>
            {info ? (
            <div className={"h-full! align-top! font-[Sansita]"}>
                <div className={"shadow bg-[#D9D9D9] rounded-[15px] block ml-auto mr-auto "} style={{width:"80%", height:"80%"}}>
                    <h1 className={"text-center text-[64px] font-[Sansita]"}>{info.title}</h1>
                    <div className="flex flex-row">
                        <div className="w-1/2 ml-[20px] mr-[10px] text-[32px] font-[Sansita]">
                            <div className={"mb-[25px]"}>Ingrediente(s): <span className={"text-stone-600"}>{info.ingredients.join(", ")}</span></div>
                            <div className={"mb-[25px]"}>Preço: <span className={"text-stone-600"}>{info.price}€</span></div>
                            <div className={"scroll-auto text-stone-600"}>{info.description}</div>
                        </div>
                        <img src={"/src/assets/food/" + info.imageName} alt={info.title} className="rounded-[15px] w-1/3 h-1/3 block ml-auto mr-auto mb-[20px]" />
                    </div>
                    <div>
                        {mode ?
                            (
                                <div className={"mt-4 text-[25px] flex flex-row w-full justify-evenly text-center pb-[30px]"}>
                                    <div className={"bg-[#c34a3a] text-white w-[500px] h-[70px] content-center text-[40px] rounded-[10px]"} onClick={() => setShowPopupDelete(true)}>
                                        Eliminar Prato
                                    </div>
                                    <div className={"bg-[#4c6e43] text-white w-[500px] h-[70px] content-center text-[40px] rounded-[10px]"} onClick={() => setShowPopupEdit(true)}>
                                        Editar Prato
                                    </div>
                                </div>):(<></>)}
                        {showPopupDelete && (
                            <BasePopup
                                type="infoDelete"
                                greenButton="Eliminar Prato"
                                redFunction="close"
                                greenFunction="navigate"
                                onClose={() => setShowPopupDelete(false)}
                                title={"Eliminar Prato"}
                            />
                        )}
                        {showPopupEdit && (
                            <BasePopup
                                type="ingredients"
                                greenButton="Guardar"
                                redFunction="close"
                                greenFunction="close"
                                onClose={() => setShowPopupEdit(false)}
                                title={"Edição de Prato"}
                            />
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