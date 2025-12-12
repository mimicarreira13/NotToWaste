import CozinhaBase from "../bases/BaseCozinha.tsx";
import {useState} from "react";

export default function Cozinha() {
    const [pageMode, setPageMode] = useState(() => {
        return localStorage.getItem("pageMode") === "true";
    });

    return (
        <CozinhaBase
            pageState={pageMode}
            onPageModeChange = {setPageMode}
        />
    );
}