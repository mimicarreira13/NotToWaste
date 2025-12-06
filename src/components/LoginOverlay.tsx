// typescript
// src/components/LoginOverlay.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../contexts/ProfileContext";
import api from "../api/api";
import { login, decodeToken, getCurrentUser, getUserTypeById } from "../api/login";
import Modal from "./Modal";

const presetCredentials: Record<string, { email: string; password: string }> = {
    Gerente: { email: "gerente@nottowaste.local", password: "gerente123" },
    "Funcionário de Stock": { email: "stock@nottowaste.local", password: "stock123" },
    "Chef de Cozinha": { email: "chef@nottowaste.local", password: "chef123" },
    Cozinheiro: { email: "cozinheiro@nottowaste.local", password: "cozinheiro123" },
};

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
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState<string>("");

    const [successOpen, setSuccessOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string>("");

    const [isLoading, setIsLoading] = useState<boolean>(false);

    // ESTE É O CORRETO A USAR
/*    useEffect(() => {
        setEmail("");
        setPassword("");
        setShowPassword(false);
    }, [selected]);*/

    // ESTE É PARA COMENTAR DEPOIS
    useEffect(() => {
        // reseta visibilidade da password sempre que muda o perfil
        setShowPassword(false);

        if (!selected) {
            setEmail("");
            setPassword("");
            return;
        }
    // DEPOIS TBM É PARA COMENTAR
   const creds = presetCredentials[selected.alt as keyof typeof presetCredentials];
        if (creds) {
            setEmail(creds.email);
            setPassword(creds.password);
        } else {
            setEmail("");
            setPassword("");
        }
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

                    <div className="modal-body px-6 py-4">
                        <form
                            onSubmit={async (e) => {
                                e.preventDefault();
                                await handleEnter();
                            }}
                        >
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

                            <div className="w-full mb-4 relative">
                                <label className="block text-left mb-1 font-semibold">Password</label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full border px-3 py-2 rounded bg-gray-100 pr-12"
                                    autoComplete="off"
                                    disabled={isLoading}
                                    aria-describedby="toggle-password"
                                />
                                <button
                                    id="toggle-password"
                                    type="button"
                                    onClick={() => setShowPassword((s) => !s)}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 translate-y-1 w-9 h-9 inline-flex items-center justify-center bg-transparent border-0 cursor-pointer text-black rounded-md z-10 disabled:opacity-40 disabled:cursor-not-allowed"
                                    aria-pressed={showPassword}
                                    aria-label={showPassword ? "Ocultar password" : "Mostrar password"}
                                    disabled={isLoading}
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" className="stroke-current text-black">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.58 10.58A3 3 0 1113.42 13.42" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.94 12.94A12.04 12.04 0 0112 6c2.1 0 4.05.5 5.8 1.38" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.06 11.06A12.04 12.04 0 0112 18c-2.1 0-4.05-.5-5.8-1.38" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" className="stroke-current text-black">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 12s4-7.5 9.5-7.5S21.5 12 21.5 12s-4 7.5-9.5 7.5S2.5 12 2.5 12z" />
                                            <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    )}
                                </button>
                            </div>

                            <div className="flex gap-3 mt-4">
                                <button
                                    type="submit"
                                    className="modal-button-default flex-1"
                                    disabled={isLoading}
                                    aria-disabled={isLoading}
                                >
                                    {isLoading ? "A entrar..." : "Entrar"}
                                </button>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="border border-[#4C6E43] px-4 py-2 rounded flex-1"
                                    disabled={isLoading}
                                >
                                    Voltar
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Loading overlay */}
                    {isLoading && (
                        <div
                            className="absolute inset-0 flex items-center justify-center"
                            style={{ background: "rgba(255,255,255,0.6)" }}
                            aria-hidden="true"
                        >
                            <div className="flex flex-col items-center gap-3">
                                <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-[#4C6E43] animate-spin" />
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
        </>
    );
}