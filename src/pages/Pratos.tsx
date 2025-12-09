import CozinhaBase from "../bases/BaseCozinha.tsx";
import {FiPlus} from "react-icons/fi";
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

export default function Pratos(
) {
    const [showPopup, setShowPopup] = useLocalStorageState("popup", false);
    const pageMode = localStorage.getItem("pageMode") === "true";
    let type = "dishes";
    let title = "Adição de pratos"
    const [popupType, setPopupType] = useState("dishes");

    const handleCreateDish = () => {
        setPopupType("dishes");
        setShowPopup(true);
    };

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
            extraDiv={
                !pageMode && (
                    <button
                        className="bg-[#4c6e43] rounded-[5px] shadow flex flex-row p-[5px] text-[25px] items-center"
                        onClick={handleCreateDish}
                    >
                        <FiPlus className="text-[#D9D9D9]"/>
                        <span className={"text-[#D9D9D9]"}>Adicionar</span>
                    </button>
                )
            }
            overlay={
                showPopup && (
                    <BasePopup
                        type={type}
                        greenButton="Adicionar Prato"
                        redFunction="close"
                        greenFunction="navigate"
                        onClose={() => setShowPopup(false)}
                        title={title}
                    />
                )
            }
        />
    );
}