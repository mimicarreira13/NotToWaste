import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../contexts/ProfileContext";

type SelectedCard = { id: number; src: string; alt: string } | null;

type Props = {
    selected: SelectedCard;
    onClose: () => void;
};

const DEFAULTS: Record<string, { email: string; password: string }> = {
    Gerente: { email: "gerente@nottowaste.local", password: "gerente123" },
    "Funcinário de Stock": { email: "stock@nottowaste.local", password: "stock123" },
    "Chef de Cozinha": { email: "chef@nottowaste.local", password: "chef123" },
    Cozinheiro: { email: "cozinheiro@nottowaste.local", password: "cozinheiro123" },
};

export default function LoginOverlay({ selected, onClose }: Props) {
    const navigate = useNavigate();
    const { setProfile } = useProfile();

    // Hooks chamados sempre (não condicionais)
    const [email, setEmail] = useState<string>(() => (selected ? DEFAULTS[selected.alt]?.email ?? "" : ""));
    const [password, setPassword] = useState<string>(() => (selected ? DEFAULTS[selected.alt]?.password ?? "" : ""));

    // Sincroniza os campos quando o perfil selecionado muda
    useEffect(() => {
        setEmail(selected ? DEFAULTS[selected.alt]?.email ?? "" : "");
        setPassword(selected ? DEFAULTS[selected.alt]?.password ?? "" : "");
    }, [selected]);

    useEffect(() => {
        if (!selected) return;
        function onKey(e: KeyboardEvent) {
            if (e.key === "Escape") onClose();
        }
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [selected, onClose]);

    if (!selected) return null;

    function handleEnter() {
        if (!selected) return; // garante a não-nullabilidade para o TypeScript
        setProfile({ id: selected.id, alt: selected.alt });
        onClose();
        navigate("/", { replace: true });
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />

            <div
                role="dialog"
                aria-modal="true"
                className="relative z-10 bg-[#D9D9D9] w-full max-w-lg mx-4 rounded-lg shadow-xl overflow-hidden modal-dialog"
            >
                <div className="modal-title">Login como {selected.alt}</div>

                <div className="modal-body">
                    <div className="w-full mb-4">
                        <label className="block text-left mb-1 font-semibold">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-80 border px-2 py-2 rounded bg-gray-100 text-left"
                        />
                    </div>

                    <div className="w-full mb-4">
                        <label className="block text-left mb-1 font-semibold">Password</label>
                        <input
                            type="password"
                            value={password}
                            readOnly
                            className="w-full border px-3 py-2 rounded bg-gray-100"
                        />
                    </div>

                    <div className="flex gap-3 mt-4">
                        <button onClick={handleEnter} className="modal-button-default flex-1">
                            Entrar
                        </button>
                        <button onClick={onClose} className="border border-[#4C6E43] px-4 py-2 rounded flex-1">
                            Voltar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}