import {useState, useRef, useEffect} from "react";
import { Dishes, type DishesHandle } from "../api/AddDish.tsx";
import {useNavigate} from "react-router-dom";
import api from "../api/api.ts";

interface DishData {
    id: string;
    nome: string;
    preco: number;
    descricao: string;
    pratoIngredientes: Array<{ ingredienteNome: string; quantidade: number }>;
    imagem?: string;
}

interface PratoIngrediente {
    nome: string;
    quantidade: number;
    custo: number;
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

interface FoodUI {
    id: string;
    title: string;
    description: string;
    price: number;
    ingredients: string[];
    imageName: string;
    available: boolean;
    pratoIngredientes: Array<{ingredienteNome: string; quantidade: number}>;
    apiData?: ApiPrato;
}

interface BasePopupProps {
    type: string;
    greenButton: string;
    redFunction: string;
    greenFunction: string;
    onClose: () => void;
    title: string;
    onConfirm?: () => Promise<void> | void;
    itemName?: string;
    dishData?: DishData | ApiPrato | FoodUI;
}

function Ingredients(){
    return(
        <>
            <div className={"h-[80%] flex flex-row items-center"}>
                <div className={"w-1/2"}>Nome:
                    <input id={"name"} className={"bg-white rounded-[15px] p-[5px] ml-[15px]"}
                           placeholder={"Insira o nome"}/>
                </div>
                <div className={"w-1/2"}>Data de Validade:
                    <input id={"data"} className={"bg-white rounded-[15px] p-[5px] ml-[15px]"} type="date"
                           placeholder={"Insira a data de validade"} />
                </div>
            </div>
            <div className={"h-[80%] flex flex-row items-center"}>
                <div className={"w-1/2"}>Marca:
                    <input id={"brand"} className={"bg-white rounded-[15px] p-[5px] ml-[15px]"}
                           placeholder={"Insira a marca"}/>
                </div>
                <div className={"w-1/2"}>Preço (€):
                    <input id={"price"} className={"bg-white rounded-[15px] p-[5px] ml-[15px]"}
                           placeholder={"Insira o custo"}/>
                </div>
            </div>
            <div className={"h-[80%] flex flex-row items-center"}>
                <div className={"w-1/2"}>Imagem:
                    <input type={"file"} className={"ml-[15px] w-[423px]"}/>
                </div>
                <div className={"w-1/2"}>Quantidade:
                    <input id={"quantity"} className={"bg-white rounded-[15px] p-[5px] ml-[15px]"}
                           placeholder={"Insira a quantidade"}/>
                </div>
            </div>
        </>
    )
}

function CookConfirm({ ItemName, ingredients }: {
    ItemName?: string;
    ingredients?: string[]
}) {
    return (
        <div className="text-center text-[24px] p-4">
            <p>Tem a certeza que pretende cozinhar o prato?</p>
            {ItemName && (
                <p className="font-bold mt-2 text-[28px]">"{ItemName}"</p>
            )}

            {ingredients && ingredients.length > 0 && (
                <div className="mt-6">
                    <p className="text-[20px] font-medium mb-2">Ingredientes a utilizar:</p>
                    <div className="bg-gray-100 rounded-lg p-3 max-h-40 overflow-y-auto">
                        {ingredients.map((ingredient, index) => (
                            <div key={index} className="text-[18px] text-gray-700 py-1 border-b last:border-b-0">
                                {ingredient}
                            </div>
                        ))}
                    </div>
                    <p className="text-[18px] text-gray-600 mt-3">
                        Esta ação irá reduzir o stock dos ingredientes listados.
                    </p>
                </div>
            )}
        </div>
    );
}


function InfoDelete({ ItemName }: { ItemName?: string }) {
    return (
        <div className="text-center text-[24px] p-4">
            <p>Tem a certeza que pretende eliminar o prato?</p>
            {ItemName && (
                <p className="font-bold mt-2 text-[28px]">"{ItemName}"</p>
            )}
            <p className="text-red-600 mt-4 text-[20px]">
                Esta ação não pode ser desfeita!
            </p>
        </div>
    );
}

interface ApiIngrediente {
    id: string;
    nome: string;
    quantidade: number;
    caminhoImagem: string | null;
    custo: number;
    dataValidade: string | null;
    unidade: number;
}

interface ApiResponseArray<T> {
    exito: boolean;
    mensagem: string;
    objeto: T[];
}

interface itemIDs {
    id: string;
    nome: string;
}

async function getIngredientIdByName(name: string): Promise<string | undefined> {
    try {
        const response = await api.get<ApiResponseArray<ApiIngrediente>>("/api/Ingrediente");
        const ingredients: itemIDs[] = response.data.objeto.map(item => ({
            id: item.id,
            nome: item.nome,
        }));
        console.log(ingredients);
        if (response.data.exito && response.data.objeto) {
            const ingredient = ingredients.find(item => item.nome.includes(name));
            console.log("This bitch " + name);
            return ingredient?.id;
        }
        return undefined;
    } catch (error) {
        console.error("Error fetching ingredients:", error);
        return undefined;
    }
}

function useFunctionFinder(
    close: () => void,
    onConfirm: (() => void | Promise<void>) | undefined,
    dishData?: DishData | ApiPrato | FoodUI
) {
    const navigate = useNavigate();

    async function functionFinder(funcType: string) {
        switch (funcType) {
            case "navigate":
                navigate("/pratos");
                break;
            case "close":
                close();
                break;
            case "delete":
                if (onConfirm) {
                    try {
                        await onConfirm();
                        close();
                    } catch (error) {
                        console.error("Erro ao eliminar:", error);
                    }
                }
                break;
            case "cook":
                if (onConfirm) {
                    try {
                        await onConfirm();
                        close();
                    } catch (error) {
                        console.error("Erro ao cozinhar prato:", error);
                        throw error;
                    }
                }
                break;
            case "editDish":
                if (dishData && 'id' in dishData && 'nome' in dishData) {
                    try {
                        await editDish(dishData as DishData);
                        close();
                    } catch (error) {
                        console.error("Erro ao editar prato:", error);
                        throw error;
                    }
                }
                break;
        }
    }


    async function editDish(data: DishData) {
        const formData = new FormData();

        formData.append('Nome', data.nome);
        formData.append('Preco', data.preco.toString());
        formData.append('Descricao', data.descricao);
        formData.append('PratoIngredientes', JSON.stringify(data.pratoIngredientes));

        if (data.imagem && typeof data.imagem !== 'string') {
            formData.append('imagem', data.imagem);
        } else if (data.imagem && data.imagem.startsWith('data:')) {
            const response = await fetch(data.imagem);
            const blob = await response.blob();
            formData.append('imagem', blob, 'dish-image.jpg');
        }

        const response = await fetch(`/api/Prato/${data.id}`, {
            method: 'PUT',
            body: formData,
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erro ao editar prato: ${response.status} - ${errorText}`);
        }

        return await response.json();
    }

    return { functionFinder };
}

export default function BasePopup({type, greenButton, redFunction, greenFunction, onClose, title, onConfirm, itemName, dishData,}: BasePopupProps) {
    const [selectedIngredientIds, setSelectedIngredientIds] = useState<string[]>([]);
    const { functionFinder } = useFunctionFinder(onClose, onConfirm, dishData);
    const dishesRef = useRef<DishesHandle>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (type === "edit" && dishData && 'pratoIngredientes' in dishData) {
            const fetchIngredientIds = async () => {
                const editData = dishData as DishData;

                const nameToIdMap = new Map<string, string>();

                try {
                    const response = await api.get<ApiResponseArray<ApiIngrediente>>("/api/Ingrediente");
                    if (response.data.exito && response.data.objeto) {
                        response.data.objeto.forEach(item => {
                            nameToIdMap.set(item.nome, item.id);
                        });

                        const ingredientIds = editData.pratoIngredientes
                            .map(ing => {
                                const ingredientName = ing.ingredienteNome;
                                for (const [storedName, id] of nameToIdMap.entries()) {
                                    if (storedName.includes(ingredientName) || ingredientName.includes(storedName)) {
                                        return id;
                                    }
                                }
                                return undefined;
                            })
                            .filter((id): id is string => id !== undefined); // Remove undefined

                        setSelectedIngredientIds(ingredientIds);
                    }
                } catch (error) {
                    console.error("Error fetching ingredients:", error);
                }
            };

            fetchIngredientIds();
        }
    }, [type, dishData]);


    const render = () => {
        switch(type) {
            case "dishes":
                return (
                    <Dishes
                        ref={dishesRef}
                        selectedIds={selectedIngredientIds}
                        onChange={setSelectedIngredientIds}
                        onClose={onClose}
                    />
                );
            case "edit":
                { const editDishData = dishData as DishData;
                return (
                    <Dishes
                        ref={dishesRef}
                        selectedIds={selectedIngredientIds}
                        onChange={setSelectedIngredientIds}
                        onClose={onClose}
                        isEdit={true}
                        dishData={editDishData}
                    />
                ); }
            case "ingredients":
                return <Ingredients />;
            case "infoDelete":
                return <InfoDelete ItemName={itemName} />;
            case "cook":
                { let ingredients: string[] = [];

                if (dishData) {
                    if ('pratoIngredientes' in dishData && Array.isArray(dishData.pratoIngredientes)) {
                        const apiDish = dishData as ApiPrato;
                        ingredients = apiDish.pratoIngredientes.map((pi) =>
                            pi.nome ? `${pi.nome} (${pi.quantidade || 1})` : `Ingrediente ID: ${getIngredientIdByName(pi.nome)}`
                        );
                        console.log("THE ONE AND ONLY: " + ingredients[0]);
                    }
                    else if ('ingredients' in dishData && Array.isArray(dishData.ingredients)) {
                        const foodUI = dishData as FoodUI;
                        ingredients = foodUI.ingredients;
                    }
                }

                return <CookConfirm ItemName={itemName} ingredients={ingredients} />; }
            default:
                return null;
        }
    };


    const handleSubmit = async () => {
        if (dishesRef.current) {
            setIsSubmitting(true);
            try {
                if (type === "edit" && dishData) {
                    await dishesRef.current.handleEdit(dishData.id);
                } else {
                    await dishesRef.current.handleSubmit();
                }
            } finally {
                setIsSubmitting(false);
            }
        }
    };



    let widthPop = "70%";
    let heightPop = "80%";
    let divWhite = "85%";
    let divGreen = "15%";

    if (type === "infoDelete") {
        widthPop = "50%";
        heightPop = "45%";
        divWhite = "75%";
        divGreen = "25%";
    }

    if (type === "cook") {
        widthPop = "50%";
        heightPop = "";
        divWhite = "85%";
        divGreen = "15%";
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#4c6e43] shadow-lg overflow-auto rounded-[25px]" style={{width: widthPop, height: heightPop}}>
                <div className={"text-[45px] text-white text-center content-center"} style={{height: divGreen}}>
                    {title}
                </div>
                <div className="bg-[#d9d9d9] w-full overflow-auto rounded-[25px] flex flex-col items-center justify-evenly text-center" style={{height: divWhite}}>
                    <div className={"h-[95%] flex flex-col w-[90%] text-[25px]"}>
                        {render()}
                        <div className={"mt-4 text-[15px] flex flex-row w-full justify-evenly text-center"}>
                            <button
                                className={"bg-[#c34a3a] text-white w-[200px] h-[70px] content-center text-[40px] rounded-[10px] hover:bg-[#a93a2a] transition-colors"}
                                onClick={() => functionFinder(redFunction)}
                                disabled={isSubmitting}
                            >
                                {type === "cook" ? "Não" : "Cancelar"}
                            </button>
                            <button
                                className={"bg-[#4c6e43] text-white w-[500px] h-[70px] content-center text-[40px] rounded-[10px] hover:bg-[#3a5a32] transition-colors mb-5"}
                                onClick={async () => {
                                    if (type === "dishes" || type === "edit") {
                                        await handleSubmit();
                                    } else {
                                        await functionFinder(greenFunction);
                                    }
                                }}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "A processar..." : greenButton}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}