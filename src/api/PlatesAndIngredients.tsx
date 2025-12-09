import {useState, useEffect, type JSX, useRef} from "react";
import api from "./api.ts";
import {createCards} from "../components/Cards.tsx";
import {useNavigate} from "react-router-dom";
import type {IngredientItem} from "../data/clientItems.ts";  // o ficheiro criado



type Mensagem<T = any> = {
    exito: boolean;
    mensagem: string;
    objeto: T[]; // This defines 'objeto' as an array of items
}

type Food = {
    id: string;
    nome: string;
    descricao: string;
    disponivel: boolean
    preco: number;
    pratoIngredientes:[
        {
            pratoId:string;
            prato: null
            ingredienteId: string;
            ingrediente:null;
            quantidade: number;
            id: string;
            dataCriacao:string;
            deletado: boolean
        }
    ];
};

type Ingredient = {
    id: string;
    nome: string;
    quantidade: number;
    caminhoImagem: null
    custo: number;
    dataValidade: string;
    unidade: number;
}

type ItemUI = {
    id: string;
    title: string;
    imageName: string;
    ingredients: string[];
    isIngredient: boolean;
}

type InfoProps = {
    type: string;
    id?: string;
    onData?: (data: ItemUI[]) => void;
};

type CardUI = {
    id: string;
    content: JSX.Element;
    title: string;
};



export default function Info({type, id, onData} : InfoProps) {
    const [info, setInfo] = useState<Mensagem | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const hasFetched = useRef(false); // Add this to track if we've already fetched

    useEffect(() => {
        // Prevent multiple fetches
        console.log(`Info component called with: type="${type}", id="${id}"`);
        console.log(`Making request to: /api/${type}${id ? "/" + id : ""}`);

        if (hasFetched.current) return;
        hasFetched.current = true;

        if (hasFetched.current) return;

        console.log(`Fetching ${type}${id ? "/" + id : ""}`);

        api.get<Mensagem>(`/api/${type}${id ? "/" + id : ""}`, { timeout: 10000 })
            .then(res => {
                console.log(`API Response for ${type}:`, res.data);
                setInfo(res.data);
                hasFetched.current = true;

                if (res.data.objeto && Array.isArray(res.data.objeto)) {
                    // Use different converter based on type
                    const converter = type === "Ingrediente" || type === "Ingredientes"
                        ? convertIngredientToItemUI
                        : convertFoodToItemUI;

                    const converted = res.data.objeto.map(item => converter(item));
                    console.log(`Converted ${converted.length} items`, converted);
                    onData?.(converted);
                } else {
                    console.warn("No objeto array in response");
                    onData?.([]);
                }
            })
            .catch(err => {
                console.error("❌ API Error Details:", {
                    message: err.message,
                    code: err.code,
                    url: err.config?.url,
                    status: err.response?.status,
                    statusText: err.response?.statusText,
                    data: err.response?.data
                });

                if (err.response) {
                    // Server responded with error status
                    console.error("Response error:", err.response.data);
                    if (err.response.status === 404) {
                        setError(`Endpoint não encontrado: ${err.config?.url}. Verifique se o endpoint está correto.`);
                    } else {
                        setError(`Erro ${err.response.status}: ${err.response.statusText}`);
                    }
                } else if (err.request) {
                    // Request was made but no response
                    console.error("No response received");
                    setError("Sem resposta do servidor. Verifique sua conexão.");
                } else {
                    // Something else happened
                    setError(`Falha ao carregar: ${err.message}`);
                }

                // Always call onData with empty array to prevent infinite loading
                onData?.([]);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [type, id, onData]);

    useEffect(() => {
        return () => {
            hasFetched.current = false;
        };
    }, []);

    if (loading) return <div></div>;
    if (error) return <div>{error}</div>;
}

function convertIngredientToItemUI(item: any): ItemUI {
    return {
        id: item.id || "",
        title: item.nome || "Sem nome",
        imageName: item.caminhoImagem || null,
        ingredients: [],
        isIngredient: true
    };
}

function convertFoodToItemUI(item: any): ItemUI {
    // Extract ingredient names from pratoIngredientes
    const ingredients: string[] = [];
    if (item.pratoIngredientes && Array.isArray(item.pratoIngredientes)) {
        item.pratoIngredientes.forEach((pi: any) => {
            if (pi.ingrediente && pi.ingrediente.nome) {
                ingredients.push(pi.ingrediente.nome);
            }
        });
    }

    return {
        id: item.id || "",
        title: item.nome || "Sem nome",
        imageName: item.caminhoImagem || null,
        ingredients,
        isIngredient: false
    };
}



// function converterFoods(apiIng: Food): ItemUI {
//     return {
//         id: apiIng.id,
//         title: apiIng.nome,
//         imageName: "",
//         ingredients: [],
//         isIngredient: false
//     };
// }
//
//
// function IngredientList() {
//     const [cards, setCards] = useState<any[]>([]);
//     const navigate = useNavigate();
//
//     return (
//         <>
//             <Info type="Ingredientes" onData={(data) => setCards(createCards(data))} />
//
//             <div className="grid grid-cols-3 gap-5">
//                 {cards.map(card => (
//                     <div
//                         key={card.id}
//                         className="bg-[#D9D9D9] rounded-5 shadow flex flex-row"
//                         onClick={() => navigate("/cozinha/ingredient/" + card.id)}
//                         style={{height: "345px", width:"444px"}}
//                     >
//                         {card.content}
//                     </div>
//                 ))}
//             </div>
//         </>
//     );
// }
//
// function FoodList(pratos : []) {
//     const [foods, setFoods] = useState<ItemUI[]>([]);
//     setFoods(pratos.map(converterFoods));
//     createCards(foods)
// }

// function FoodItem() {
//     const [food, setFood] = useState<Food | null>(null);
//     return null
// }
//
// function IngredientItem() {
//     const [Ingredient, setIngredient] = useState<Ingredient | null>(null);
//     return null
// }