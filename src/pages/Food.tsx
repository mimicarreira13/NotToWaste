import foodDataJSON from "../tmp/fullDataFood.json";
import {useNavigate, useParams} from "react-router-dom";
import {FiAlertTriangle} from "react-icons/fi";
import {useState} from "react";
import BasePopup from "../bases/BasePopup.tsx";

export default function Food({ mode }: { mode: boolean }) {
    const navigate = useNavigate();
    const popupStateDelete = localStorage.getItem("popupDelete") === "false";
    const [showPopupDelete, setShowPopupDelete] = useState(popupStateDelete);
    const popupStateEdit = localStorage.getItem("popupEdit") === "false";
    const [showPopupEdit, setShowPopupEdit] = useState(popupStateEdit);
    const { id } = useParams();
    console.log("This thing " + id);
    const info = foodDataJSON.find(entry => entry.id === id);
    console.log("Info " + info);

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
                            {(showPopupDelete && mode) && (
                                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                    <div className="bg-[#4c6e43] w-[50%] h-[40%]  shadow-lg  overflow-auto rounded-[25px]">
                                        <div className={"text-[45px] text-white text-center content-center h-[15%]"}>Eliminar Prato</div>
                                        <div className="bg-[#d9d9d9] w-full h-[85%] overflow-auto rounded-[25px] flex flex-col items-center  justify-evenly text-center">
                                            <div className={"h-[80%] flex flex-col w-[90%] text-[35px]"}>
                                                Tem a certeza que pretende eliminar o prato?
                                                <div className={"mt-4 text-[25px] flex flex-row w-full justify-evenly text-center"}>
                                                    <div className={"bg-[#c34a3a] text-white w-[200px] h-[70px] content-center text-[40px] rounded-[10px]"} onClick={() => setShowPopupDelete(false)}>
                                                        Cancelar
                                                    </div>
                                                    <div className={"bg-[#4c6e43] text-white w-[500px] h-[70px] content-center text-[40px] rounded-[10px]"} onClick={() => navigate("/pratos")}>
                                                        Eliminar Prato
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {(showPopupEdit && mode) && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                <div className="bg-[#4c6e43] w-[70%] h-[70%]  shadow-lg  overflow-auto rounded-[25px]">
                                    <div className={"text-[45px] text-white text-center content-center h-[15%]"}>Edição de Prato</div>
                                        <div className="bg-[#d9d9d9] w-full h-[85%] overflow-auto rounded-[25px] flex flex-col items-center  justify-evenly text-center">
                                            <div className={"h-[80%] flex flex-col w-[90%] text-[35px]"}>
                                            <BasePopup
                                                type="ingredients"
                                            />
                                            <div className={"mt-4 text-[25px] flex flex-row w-full justify-evenly text-center"}>
                                                <div className={"bg-[#c34a3a] text-white w-[200px] h-[70px] content-center text-[40px] rounded-[10px]"} onClick={() => setShowPopupEdit(false)}>
                                                    Cancelar
                                                </div>
                                                <div className={"bg-[#4c6e43] text-white w-[500px] h-[70px] content-center text-[40px] rounded-[10px]"} onClick={() => setShowPopupEdit(false)}>
                                                    Guardar Prato
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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