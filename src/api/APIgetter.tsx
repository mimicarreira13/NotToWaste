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

// type Food = {
//     id: string;
//     nome: string;
//     descricao: string;
//     disponivel: boolean
//     preco: number;
//     pratoIngredientes:[
//         {
//             pratoId:string;
//             prato: null
//             ingredienteId: string;
//             ingrediente:null;
//             quantidade: number;
//             id: string;
//             dataCriacao:string;
//             deletado: boolean
//         }
//     ];
// };
//
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
        if (hasFetched.current) return;

        console.log(`Fetching ${type}${id ? "/" + id : ""}`);

        api.get<Mensagem>(`/api/${type}${id ? "/" + id : ""}`, { timeout: 10000 })
            .then(res => {
                console.log(`API Response for ${type}:`, res.data);
                setInfo(res.data);
                hasFetched.current = true; // Mark as fetched

                if (res.data.objeto && Array.isArray(res.data.objeto)) {
                    const converted = res.data.objeto.map(item => convertToItemUI(item));
                    console.log(`Converted ${converted.length} items`, converted);
                    onData?.(converted);
                } else {
                    console.warn("No objeto array in response");
                    onData?.([]);
                }
            })
            .catch(err => {
                console.error("API Error:", {
                    message: err.message,
                    code: err.code,
                    url: err.config?.url,
                    isTimeout: err.code === 'ECONNABORTED'
                });

                if (err.code === "ECONNABORTED") {
                    setError("Timeout - o servidor demorou muito a responder");
                } else {
                    setError("Falha ao carregar dados");
                }
            })
            .finally(() => {
                console.log(`Finished loading ${type}`);
                setLoading(false);
            });
    }, [type, id, onData]); // Dependencies

    // Add a cleanup function
    useEffect(() => {
        return () => {
            // Reset when component unmounts
            hasFetched.current = false;
        };
    }, []);

    if (loading) return <div>Loading…</div>;
    if (error) return <div>{error}</div>;
    return null; // Return null instead of empty fragment
}

function convertToItemUI(item: any): ItemUI {
    return {
        id: item.id || "",
        title: item.nome || item.title || "",
        imageName: item.caminhoImagem || item.imageName || "",
        ingredients: [], // You'll need to populate this based on your data
        isIngredient: false // You'll need logic to determine this
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
