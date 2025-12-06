// src/components/LoginOverlay.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../contexts/ProfileContext";
import api from "../api/api";
import { login, decodeToken, getCurrentUser, getUserTypeById } from "../api/login";
import Modal from "./Modal";

type SelectedCard = { id: number; src: string; alt: string } | null;

type Props = {
    selected: SelectedCard;
    onClose: () => void;
};

function normalizeForCompare(s?: string) {
    if (!s) return "";
    return s
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // remove acentos
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase();
}

export default function LoginOverlay({ selected, onClose }: Props) {
    const navigate = useNavigate();
    const { setProfile } = useProfile();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState<string>("");

    const [successOpen, setSuccessOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string>("");

    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setEmail("");
        setPassword("");
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

    function proceedAfterSuccess() {
        setSuccessOpen(false);
        onClose();
        navigate("/", { replace: true });
    }

    async function handleEnter() {
        if (!selected) return;
        setIsLoading(true);
        try {
            const resp = await login(email, password);
            console.log("Login response data:", resp);

            const token = resp.objeto;
            if (!token) {
                console.warn("Nenhum token na resposta do login.");
                setProfile({ id: selected.id.toString(), alt: selected.alt });
                setSuccessMessage(`Login bem sucedido como "${selected.alt}".`);
                setSuccessOpen(true);
                return;
            }

            // guarda token e define header para chamadas subsequentes
            localStorage.setItem("authToken", token);
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            const decoded = decodeToken(token);
            console.log("Decoded token payload:", decoded);

            try {
                const user = await getCurrentUser();
                console.log("User from API:", user);

                let roleName = selected.alt;
                if (user.tipoUtilizadorId) {
                    try {
                        const tipo = await getUserTypeById(user.tipoUtilizadorId);
                        console.log("UserType from API:", tipo);
                        if (tipo?.nome) roleName = tipo.nome;
                    } catch (e) {
                        console.warn("Erro ao obter tipo de utilizador:", e);
                    }
                }

                const normalizedRole = normalizeForCompare(roleName);
                const normalizedSelected = normalizeForCompare(selected.alt);

                if (normalizedRole !== normalizedSelected) {
                    // acesso negado para este perfil - informar via Modal e limpar token
                    const msg = `Acesso negado: o seu tipo de utilizador é "${roleName}" e não corresponde ao perfil seleccionado "${selected.alt}".`;
                    setModalMessage(msg);
                    setModalOpen(true);

                    // limpa token e header
                    localStorage.removeItem("authToken");
                    delete api.defaults.headers.common["Authorization"];

                    console.warn("Tipo de utilizador não coincide com perfil seleccionado:", roleName, selected.alt);
                    return; // mantém overlay aberto
                }

                // acesso autorizado -> define perfil e mostra modal de sucesso
                setProfile({ id: user.id, alt: roleName });
                setSuccessMessage(`Login bem sucedido como "${roleName}".`);
                setSuccessOpen(true);
                return;
            } catch (e) {
                console.warn("Erro ao obter utilizador atual, fallback para perfil seleccionado:", e);
                setProfile({ id: selected.id.toString(), alt: selected.alt });
                setSuccessMessage(`Login bem sucedido como "${selected.alt}".`);
                setSuccessOpen(true);
                return;
            }
        } catch (err: any) {
            console.error("Erro no login:", err?.response?.data ?? err.message ?? err);
            // opcional: mostrar erro via modal
            setModalMessage("Erro ao efetuar login. Verifique credenciais e tente novamente.");
            setModalOpen(true);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center" aria-busy={isLoading}>
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
                                autoComplete="off"
                                autoFocus
                                disabled={isLoading}
                            />
                        </div>

                        <div className="w-full mb-4">
                            <label className="block text-left mb-1 font-semibold">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full border px-3 py-2 rounded bg-gray-100"
                                autoComplete="off"
                                disabled={isLoading}
                            />
                        </div>

                        <div className="flex gap-3 mt-4">
                            <button
                                onClick={handleEnter}
                                className="modal-button-default flex-1"
                                disabled={isLoading}
                                aria-disabled={isLoading}
                            >
                                {isLoading ? "A entrar..." : "Entrar"}
                            </button>
                            <button
                                onClick={onClose}
                                className="border border-[#4C6E43] px-4 py-2 rounded flex-1"
                                disabled={isLoading}
                            >
                                Voltar
                            </button>
                        </div>
                    </div>

                    {/* Loading overlay */}
                    {isLoading && (
                        <div
                            className="absolute inset-0 flex items-center justify-center"
                            style={{ background: "rgba(255,255,255,0.6)" }}
                            aria-hidden="true"
                        >
                            <div className="flex flex-col items-center gap-3">
                                <div className="loader" />
                                <div className="text-[#4C6E43] font-medium">A entrar...</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal de acesso negado / erros */}
            <Modal
                open={modalOpen}
                title="Acesso negado"
                message={modalMessage}
                onClose={() => setModalOpen(false)}
            />

            {/* Modal de sucesso - botão OK fecha overlay e navega */}
            <Modal
                open={successOpen}
                title="Sucesso"
                message={successMessage}
                onClose={() => setSuccessOpen(false)}
                buttons={[
                    {
                        label: "OK",
                        onClick: () => {
                            proceedAfterSuccess();
                        },
                    },
                ]}
            />

            <style>{`
                .loader {
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    border: 4px solid rgba(76,110,67,0.2);
                    border-top-color: #4C6E43;
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </>
    );
}