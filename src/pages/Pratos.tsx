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
    const [pageMode, setPageMode] = useState(() => {
        return localStorage.getItem("pageMode") === "true";
    });

    const handleCreateDish = () => {
        setShowPopup(true);
    };


    console.log("PageMode " + pageMode.valueOf())
    return (
        <CozinhaBase
            extraDiv={
                !pageMode && (
                    <button
                        className="bg-[#4c6e43] rounded-[5px] shadow flex flex-row p-[5px] text-[25px] items-center hover:p-[6px] hover:shadow hover:ease-in-out"
                        onClick={handleCreateDish}
                    >
                        <FiPlus className="text-[#D9D9D9]"/>
                    </button>
                )
            }
            overlay={
                showPopup && (
                    <BasePopup
                        type={"dishes"}
                        greenButton="Adicionar Prato"
                        redFunction="close"
                        greenFunction="navigate"
                        onClose={() => setShowPopup(false)}
                        title={"Adicionar Prato"}
                    />
                )
            }
            pageState={pageMode}
            onPageModeChange={setPageMode}
        />
    );
}