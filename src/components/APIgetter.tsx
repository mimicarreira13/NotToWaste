import { useState, useEffect } from "react";
import api from "../api";
import {createCards} from "./Cards.tsx";
import {useNavigate} from "react-router-dom";  // o ficheiro criado

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
// type Ingredient = {
//     id: string;
//     nome: string;
//     quantidade: number;
//     caminhoImagem: null
//     custo: number;
//     dataValidade: string;
//     unidade: number;
// }

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

function converterImg(item: any): ItemUI {
    return {
        id: item.id,
        title: item.nome, // Maps 'nome' to 'title'
        imageName: item.caminhoImagem || "", // Handle potential nulls
        ingredients: [], // You might need extra logic here to extract ingredient names
        isIngredient: false // You might need logic to determine this based on the input
    };
}

export default function Info({type, id, onData} : InfoProps) {
    const [info, setInfo] = useState<Mensagem | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        api.get<Mensagem>(`/api/${type}${id ? "/" + id : ""}`, { timeout: 10000 })
            .then(res => {
                setInfo(res.data);
                if (res.data.objeto && Array.isArray(res.data.objeto)) {
                    const converted = res.data.objeto.map(item => converterImg(item));
                    onData?.(converted);
                } else {
                    onData?.([]);
                }
            })
            .catch(err => {
                console.error("API Error Details:", {
                    message: err.message,
                    code: err.code,
                    url: err.config?.url,
                    status: err.response?.status,
                    statusText: err.response?.statusText,
                });

                if (err.code === "ECONNABORTED") {
                    setError("A conexão com o servidor está demorando muito. Verifique sua internet ou tente novamente.");
                } else if (err.response) {
                    setError(`Erro ${err.response.status}: ${err.response.statusText}`);
                } else if (err.request) {
                    setError("Não foi possível conectar ao servidor. Verifique se o servidor está online.");
                } else {
                    setError("Falha ao carregar dados");
                }
            })
            .finally(() => setLoading(false));
    }, [type, id, onData]);

    if (loading) return <div>Loading…</div>;
    if (error) return <div>{error}</div>;

    const [ingredientCards, setIngredientCards] = useState<CardUI[]>([]);
    const [foodCards, setFoodCards] = useState<CardUI[]>([]);

    const handleIngredientData = useCallback((data: ItemUI[]) => {
        console.log("Ingredient data received:", data);
        setIngredientCards(createCards(data));
    }, []);

    const handleFoodData = useCallback((data: ItemUI[]) => {
        console.log("Food data received:", data);
        setFoodCards(createCards(data));
    }, []);


    return <></>;
    // if (info !== null){
    //     if (type === "Prato" && id === null) {
    //         return(FoodList(info.objeto));
    //     } else if (type === "Ingrediente" && id === null) {
    //         return(IngredientList(info.objeto));
    //     }// else if (type === "Prato" && id !== null) {
    //     //     return(FoodItem(info.objeto));
    //     // } else if (type === "Ingrediente" && id !== null) {
    //     //     return(IngredientItem(info.objeto));
    //     // }
    // }
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
