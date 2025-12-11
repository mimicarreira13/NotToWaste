import { useLocation, useNavigate } from "react-router-dom";

export default function BackButton() {
    const navigate = useNavigate();
    const location = useLocation();

    function goUpOneLevel() {
        const path = location.pathname.split("/").filter(Boolean);
        path.pop();
        const newPath = "/" + path.join("/");
        navigate(newPath);
    }

    return (
        <button onClick={goUpOneLevel} className="bg-none text-black text-[25px]">← Voltar</button>
    );
}