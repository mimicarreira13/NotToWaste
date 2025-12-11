import {useParams} from "react-router-dom";
import {FiAlertTriangle} from "react-icons/fi";
import {useEffect, useState} from "react";
import BasePopup from "../bases/BasePopup.tsx";
import api from "../api/api.ts";

type UnidadeMedida = 1 | 2 | 3; // 1=Unidades, 2=Kg, 3=L

interface ApiIngrediente {
    id: string;
    nome: string;
    quantidade: number;
    caminhoImagem: string | null;
    custo: number;
    dataValidade: string | null;
    unidade: UnidadeMedida;
}

interface ApiResponse<T> {
    exito: boolean;
    mensagem: string;
    objeto: T;
}

// Define the UI data structure (similar to your old JSON structure)
interface IngredientUI {
    id: string;
    title: string;
    custo: number;
    quantidade: number;
    validade: string;
    imageName: string;
    unidade: UnidadeMedida;
}

function useLocalStorageState(key: string, defaultValue: boolean) {
    const stored = localStorage.getItem(key);
    const initial = stored !== null ? stored === "true" : defaultValue;

    const [value, setValue] = useState(initial);

    useEffect(() => {
        localStorage.setItem(key, String(value));
    }, [key, value]);

    return [value, setValue] as const;
}

// Helper function to format date
function formatDate(dateString: string | null): string {
    if (!dateString) return "Não definida";

    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-PT', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    } catch {
        return dateString;
    }
}

// Helper function to get unit name
function getUnitName(unidade: UnidadeMedida): string {
    switch (unidade) {
        case 1: return "Unidades";
        case 2: return "Kg";
        case 3: return "L";
        default: return "Unidades";
    }
}

// Convert API response to UI format
function convertApiToUI(apiIngrediente: ApiIngrediente): IngredientUI {
    return {
        id: apiIngrediente.id,
        title: apiIngrediente.nome,
        custo: apiIngrediente.custo,
        quantidade: apiIngrediente.quantidade,
        validade: formatDate(apiIngrediente.dataValidade),
        imageName: apiIngrediente.caminhoImagem || "",
        unidade: apiIngrediente.unidade
    };
}

export default function Ingredient({ mode }: { mode: boolean }) {
    const [showPopup, setShowPopup] = useLocalStorageState("popup", false);
    const { id } = useParams();
    const [ingredient, setIngredient] = useState<IngredientUI | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            setError("ID do ingrediente não encontrado");
            setLoading(false);
            return;
        }

        const fetchIngredient = async () => {
            try {
                setLoading(true);
                console.log(`Fetching ingredient with ID: ${id}`);

                const response = await api.get<ApiResponse<ApiIngrediente>>(`/api/Ingrediente/${id}`, {
                    timeout: 10000
                });

                console.log("API Response:", response.data);

                if (response.data.exito && response.data.objeto) {
                    const uiData = convertApiToUI(response.data.objeto);
                    setIngredient(uiData);
                } else {
                    setError(response.data.mensagem || "Falha ao carregar ingrediente");
                }
            } catch (err: any) {
                console.error("Error fetching ingredient:", err);

                if (err.response?.status === 404) {
                    setError("Ingrediente não encontrado");
                } else if (err.code === "ECONNABORTED") {
                    setError("O servidor demorou muito a responder");
                } else {
                    setError("Falha ao carregar dados do ingrediente");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchIngredient();
    }, [id]);

    if (loading) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <div className="text-[32px]">Carregando ingrediente...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center">
                <FiAlertTriangle className="text-red-500 text-[64px] mb-4" />
                <div className="text-[32px] text-red-600">{error}</div>
                <div className="text-[20px] text-gray-600 mt-2">ID: {id}</div>
            </div>
        );
    }

    if (!ingredient) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center">
                <FiAlertTriangle className="text-yellow-500 text-[64px] mb-4" />
                <div className="text-[32px]">Ingrediente não encontrado</div>
                <div className="text-[20px] text-gray-600 mt-2">ID: {id}</div>
            </div>
        );
    }

    return (
        <>
            <div className="w-full h-full">
                <div className={"shadow bg-[#D9D9D9] rounded-[15px] block ml-auto mr-auto w-[80%] pb-24"}>
                    <h1 className={"text-center text-[64px] mb-10"}>{ingredient.title}</h1>
                    <div className="flex flex-row">
                        <div className="w-1/2 ml-[20px] mr-[10px] text-[32px] h-full p-6 flex flex-col gap-12">
                            <div className={"mb-[25px]"}>
                                Custo: <span className={"text-stone-600"}>{ingredient.custo.toFixed(2)}€</span>
                            </div>
                            <div className={"mb-[25px]"}>
                                Quantidade em stock: <span className={"text-stone-600"}>
                                    {ingredient.quantidade} {getUnitName(ingredient.unidade)}
                                </span>
                            </div>
                            <div className={"mb-[25px]"}>
                                Data de Validade: <span className={"text-stone-600"}>{ingredient.validade}</span>
                            </div>
                        </div>

                        {mode ? (
                            <div className={"w-1/2 h-1/2"}>
                                <div className={"aspect-[5/4] pb-5"}>
                                    {ingredient.imageName ? (
                                        <img
                                            src={ingredient.imageName}
                                            alt={ingredient.title}
                                            className="w-[90%] h-[90%] rounded-[15px] block ml-auto mr-auto mb-[20px] object-cover"
                                            onError={(e) => {
                                                // Fallback if image fails to load
                                                const target = e.target as HTMLImageElement;
                                                target.src = "/src/assets/placeholder-ingredient.png";
                                            }}
                                        />
                                    ) : (
                                        <div className="w-[90%] h-[90%] rounded-[15px] block ml-auto mr-auto mb-[20px] bg-gray-300 flex items-center justify-center">
                                            <span className="text-gray-500 text-[20px]">Sem imagem</span>
                                        </div>
                                    )}

                                    <button
                                        onClick={() => setShowPopup(true)}
                                        className={"ml-auto mr-auto block bg-[#4c6e43] rounded-[5px] shadow p-[20px] text-[35px] text-white hover:bg-[#3a5a32] transition-colors"}
                                    >
                                        Editar Ingrediente
                                    </button>
                                </div>

                                {showPopup && (
                                    <BasePopup
                                        type={"ingredients"}
                                        greenButton={"Salvar Ingrediente"}
                                        redFunction={"close"}
                                        greenFunction={"close"}
                                        onClose={() => setShowPopup(false)}
                                        title={"Editar Ingrediente"}
                                    />
                                )}
                            </div>
                        ) : (
                            <div className="w-1/3 h-1/3 flex items-center justify-center">
                                {ingredient.imageName ? (
                                    <img
                                        src={ingredient.imageName}
                                        alt={ingredient.title}
                                        className="rounded-[15px] w-full h-full object-cover"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.src = "/src/assets/placeholder-ingredient.png";
                                        }}
                                    />
                                ) : (
                                    <div className="w-full h-full rounded-[15px] bg-gray-300 flex items-center justify-center">
                                        <span className="text-gray-500 text-[20px]">Sem imagem</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}