import CozinhaBase from "../bases/BaseCozinha.tsx";
import {FiPlus} from "react-icons/fi";
import {useState} from "react";
import BasePopup from "../bases/BasePopup.tsx";

export default function Pratos(
) {
    const popupState = localStorage.getItem("popup") === "false";
    const [showPopup, setShowPopup] = useState(popupState);

    const saved = localStorage.getItem("pageMode") === "true";
    const [pageMode] = useState(saved);
    let type = "dishes";
    let title = "Adição de pratos"

    switch (pageMode) {
        case true:
            type = "ingredients";
            title = "Adição de ingredientes"
            break;
        case false:
            type = "dishes";
            title = "Adição de pratos"
            break;
    }

    return (
        <CozinhaBase
            path="/pratos"
            extraDiv={
                <div className="bg-[#4c6e43] rounded-[5px] shadow flex flex-row p-[5px] text-[25px] items-center" onClick={() => setShowPopup(true)}>
                    <FiPlus className="text-[#D9D9D9]" />
                    <span className={"text-[#D9D9D9]"}>Adicionar</span>
                </div>
            }
            overlay={
                showPopup && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-[#4c6e43] w-[90%] h-[90%]  shadow-lg  overflow-auto rounded-[25px]">
                            <div className={"text-[35px] text-white text-center content-center h-[7%]"}>{title}</div>
                            <div className="bg-[#d9d9d9] w-full h-[93%] overflow-auto rounded-[25px] flex flex-col items-center  justify-evenly text-center">
                                <div className={"h-[80%] flex flex-col w-[90%] text-[35px]"}>
                                    <BasePopup
                                        type={type}
                                    />
                                    <div className={"text-[25px] flex flex-row w-[80%] justify-evenly text-center"}>
                                        <div className={"bg-[#c34a3a] text-white w-[200px] h-[70px] content-center text-[40px] rounded-[10px]"} onClick={() => setShowPopup(false)}>
                                            Cancelar
                                        </div>
                                        <div className={"bg-[#4c6e43] text-white w-[500px] h-[70px] content-center text-[40px] rounded-[10px]"} onClick={() => setShowPopup(false)}>
                                            Adicionar Prato
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                )
            }
        />
    );
}