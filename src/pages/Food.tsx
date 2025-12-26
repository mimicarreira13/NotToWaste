import {useParams} from "react-router-dom";
import {FiAlertTriangle} from "react-icons/fi";
import {useEffect, useState} from "react";
import BasePopup from "../bases/BasePopup.tsx";
import type { AxiosError } from "axios";
import api from "../api/api.ts";
import { useNavigate } from "react-router-dom";
import {useProfile} from "../contexts/ProfileContext.tsx";
import LoadingSpinner from "../components/LoadingSpinner.tsx";

interface ApiIngrediente {
    id: string;
    nome: string;
    quantidade: number;
    caminhoImagem: string | null;
    custo: number;
    dataValidade: string | null;
    unidade: number;
}

interface PratoIngrediente {
    pratoId: string;
    prato: null;
    ingredienteId: string;
    ingrediente: ApiIngrediente | null;
    quantidade: number;
    id: string;
    dataCriacao: string;
    deletado: boolean;
}

interface ApiPrato {
    id: string;
    nome: string;
    descricao: string;
    disponivel: boolean;
    preco: number;
    caminhoImagem: string | null;
    pratoIngredientes: PratoIngrediente[];
}

interface ApiResponse<T> {
    exito: boolean;
    mensagem: string;
    objeto: T;
}

interface FoodUI {
    id: string;
    title: string;
    description: string;
    price: number;
    ingredients: string[];
    imageName: string;
    available: boolean;
    pratoIngredientes: Array<{ingredienteId: string, quantidade: number}>;
    apiData?: ApiPrato;
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

function convertApiToUI(apiPrato: ApiPrato): FoodUI {
    const ingredients: string[] = [];
    const pratoIngredientes: Array<{ingredienteId: string, quantidade: number}> = [];

    if (apiPrato.pratoIngredientes && Array.isArray(apiPrato.pratoIngredientes)) {
        apiPrato.pratoIngredientes.forEach((pi: PratoIngrediente) => {
            if (pi.ingrediente?.nome) {
                const qty = pi.quantidade || 1;
                ingredients.push(`${pi.ingrediente.nome} (${qty})`);
                pratoIngredientes.push({
                    ingredienteId: pi.ingredienteId,
                    quantidade: qty
                });
            }
        });
    }

    return {
        id: apiPrato.id,
        title: apiPrato.nome,
        description: apiPrato.descricao || "Sem descrição disponível.",
        price: apiPrato.preco,
        ingredients: ingredients.length > 0 ? ingredients : ["Nenhum ingrediente listado"],
        imageName: apiPrato.caminhoImagem || "",
        available: apiPrato.disponivel,
        pratoIngredientes: pratoIngredientes,
        apiData: apiPrato
    };
}


export default function Food({ mode }: { mode: boolean }) {
    const [showPopupDelete, setShowPopupDelete] = useLocalStorageState("popupDelete", false);
    const [showPopupEdit, setShowPopupEdit] = useLocalStorageState("popupEdit", false);
    const [showPopupCook, setShowPopupCook] = useLocalStorageState("popupCook", false);
    const { id } = useParams();
    const navigate = useNavigate();
    const [food, setFood] = useState<FoodUI | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    let userId;
    const userShutUp= useProfile().profile;
    let userType;
    if (userShutUp) {
        userType = userShutUp.id
    } else
        userType = "4";
    if (userType === "3")
        userId = "644c931f-1bdd-42be-bad6-77adb3b172ca";
    else
        userId = "f00ba082-ce05-4076-aad0-fc1c8c99fe02";


    useEffect(() => {
        if (!id) {
            setError("ID do prato não encontrado");
            setLoading(false);
            return;
        }

        const fetchFood = async () => {
            try {
                setLoading(true);
                console.log(`Fetching food/plate with ID: ${id}`);

                const response = await api.get<ApiResponse<ApiPrato>>(`/api/Prato/${id}`, {
                    timeout: 10000
                });

                console.log("API Response:", response.data);

                if (response.data.exito && response.data.objeto) {
                    const uiData = convertApiToUI(response.data.objeto);
                    setFood(uiData);
                } else {
                    setError(response.data.mensagem || "Falha ao carregar prato");
                }
            } catch (err) {
                const error = err as AxiosError<ApiResponse<ApiPrato>>;
                console.error("Error fetching food:", error);

                if (error.response?.status === 404) {
                    setError("Prato não encontrado");
                } else if (error.code === "ECONNABORTED") {
                    setError("O servidor demorou muito a responder");
                } else {
                    const errorMessage = error.response?.data?.mensagem ||
                        error.message ||
                        "Falha ao carregar dados do prato";
                    setError(errorMessage);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchFood();
    }, [id]);

    if (loading) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent">
                <LoadingSpinner message="Carregando Prato..." size={64} ariaLabel="loading-dish" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-full align-top font-[Sansita] flex flex-col items-center justify-center">
                <FiAlertTriangle className="text-red-500 text-[64px] mb-4" />
                <div className="text-[32px] text-red-600">{error}</div>
                <div className="text-[20px] text-gray-600 mt-2">ID: {id}</div>
            </div>
        );
    }

    if (!food) {
        return (
            <div className="h-full align-top font-[Sansita] flex flex-col items-center justify-center">
                <FiAlertTriangle className="text-yellow-500 text-[64px] mb-4" />
                <div className="text-[32px]">Prato não encontrado</div>
                <div className="text-[20px] text-gray-600 mt-2">ID: {id}</div>
            </div>
        );
    }

    const handleDeleteFood = async () => {
        if (!id) return;

        try {
            const response = await api.delete(`/api/Prato/${id}`);

            if (response.status === 200 || response.status === 204) {
                console.log("Prato eliminado com sucesso");
                navigate("/pratos");
            } else {
                console.error("Falha ao eliminar prato");
            }
        } catch (error) {
            console.error("Erro ao eliminar prato:", error);
            throw error;
        }
    };

    const handleCookDish= async (): Promise<void> => {
        if (!food || !food.pratoIngredientes || food.pratoIngredientes.length === 0) {
            console.error("No dish or ingredients found");
            return;
        }

        try {
            const promises = food.pratoIngredientes.map(async (ingredient) => {
                const requestBody = {
                    ingredienteId: ingredient.ingredienteId,
                    utilizadorId: userId,
                    quantidade: ingredient.quantidade,
                    descricao: "Cozinhar prato: " + food.title,
                    tipoSaida: 1
                };

                console.log("Sending stock output request:", requestBody);

                return api.post("/api/SaidaStock", requestBody, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    timeout: 10000
                });
            });

            const responses = await Promise.all(promises);

            const allSuccessful = responses.every(response =>
                response.status === 200 || response.status === 201
            );

            if (allSuccessful) {
                console.log("Dish cooked successfully! All stock outputs recorded.");
            } else {
                console.error("Some stock output requests failed");
                throw new Error("Some stock outputs failed to process");
            }
        } catch (error) {
            console.error("Error cooking dish:", error);
            throw error;
        }
    };

    return (
        <>
            <div className={"h-full! align-top! font-[Sansita] w-full"}>
                <div className={"shadow bg-[#D9D9D9] rounded-[15px] block ml-auto mr-auto w-full"} style={{width:"80%", height:"80%"}}>
                    <h1 className={"text-center text-[64px] font-[Sansita]"}>{food.title}</h1>

                    {!food.available && (
                        <div className="text-center text-red-600 text-[20px] mb-4 shadow w-[500px] p-[5px] rounded block ml-auto mr-auto">
                            ⚠️ Este prato não está disponível no momento
                        </div>
                    )}

                    <div className="flex flex-row">
                        <div className="w-1/2 ml-[20px] mr-[10px] text-[32px] font-[Sansita]">
                            <div className={"mb-[25px]"}>
                                Ingrediente(s): <span className={"text-stone-600"}>{food.ingredients.join(", ")}</span>
                            </div>
                            <div className={"mb-[25px]"}>
                                Preço: <span className={"text-stone-600"}>{food.price.toFixed(2)}€</span>
                            </div>
                            <div className={"scroll-auto text-stone-600 max-h-[200px] overflow-y-auto pr-4"}>
                                {food.description}
                            </div>
                            <div className={"mt-4 text-[25px] flex flex-row w-full justify-evenly text-center pb-[30px]"}>
                                <button
                                    onClick={() => setShowPopupCook(true)}
                                    className={"bg-[#2d5b8c] text-white w-[500px] h-[70px] content-center text-[40px] rounded-[10px] hover:bg-[#1f4a7a] transition-colors"}
                                >
                                    Cozinhar Prato
                                </button>
                            </div>
                        </div>

                        <div className="w-1/3 flex items-center justify-center">
                            {food.imageName ? (
                                <img
                                    src={food.imageName}
                                    alt={food.title}
                                    className="rounded-[15px] w-full h-auto max-h-[300px] object-scale-down"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = "/src/assets/placeholder-food.png";
                                    }}
                                />
                            ) : (
                                <img
                                    src = "/src/assets/placeholder-food.png"
                                    alt={food.title}
                                    className="rounded-[15px] w-full h-auto max-h-[300px] object-scale-down"
                                />
                            )}
                        </div>
                    </div>

                    <div>

                        {mode && (
                            <div className={"mt-4 text-[25px] flex flex-row w-full justify-evenly text-center pb-[30px]"}>
                                <button
                                    onClick={() => setShowPopupDelete(true)}
                                    className={"bg-[#c34a3a] text-white w-[500px] h-[70px] content-center text-[40px] rounded-[10px] hover:bg-[#a9382a] transition-colors"}
                                >
                                    Eliminar Prato
                                </button>
                                <button
                                    onClick={() => setShowPopupEdit(true)}
                                    className={"bg-[#4c6e43] text-white w-[500px] h-[70px] content-center text-[40px] rounded-[10px] hover:bg-[#3a5a32] transition-colors"}
                                >
                                    Editar Prato
                                </button>
                            </div>
                        )}

                        {showPopupDelete && (
                            <BasePopup
                                type="infoDelete"
                                greenButton="Eliminar Prato"
                                redFunction="close"
                                greenFunction="delete"
                                onClose={() => setShowPopupDelete(false)}
                                title={"Eliminar Prato"}
                                onConfirm={handleDeleteFood}
                                itemName={food?.title}
                            />
                        )}

                        {showPopupEdit && (
                            <BasePopup
                                type="edit"
                                greenButton="Guardar"
                                redFunction="close"
                                greenFunction="close"
                                onClose={() => setShowPopupEdit(false)}
                                title={"Edição de Prato"}
                                dishData={{
                                    id: food.id,
                                    nome: food.title,
                                    preco: food.price,
                                    descricao: food.description,
                                    pratoIngredientes: food.pratoIngredientes || [],
                                    imagem: food.imageName
                                }}
                            />
                        )}

                        {showPopupCook && (
                            <BasePopup
                                type="cook"
                                greenButton="Sim, Cozinhar"
                                redFunction="close"
                                greenFunction="cook"
                                onClose={() => setShowPopupCook(false)}
                                title={"Cozinhar Prato"}
                                onConfirm={handleCookDish}
                                itemName={food?.title}
                                dishData={food.apiData}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}