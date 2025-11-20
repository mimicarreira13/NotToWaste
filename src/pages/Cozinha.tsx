import {useNavigate} from "react-router-dom";
import {FiSearch} from "react-icons/fi";
import { createCards } from "../components/cards";
import foodDataJSON from "../tmp/datafood.json";
import ingredientDataJSON from "../tmp/dataingredient.json";
import {useState} from "react";

export type CardOptions = {
    id: string;
    title: string;
    imageName: string;
    ingredients?: string[];
    isIngredient: boolean;
}

const foodData = foodDataJSON as CardOptions[];
const ingredientData = ingredientDataJSON as CardOptions[];

const foods = createCards(foodData);
const ingredients = createCards(ingredientData);

export default function Cozinha() {
    const navigate = useNavigate();
    const [pageMode, setPageMode] = useState(false);
    let fColor;
    let iColor;

    if (pageMode) {
        iColor = "grey";
        fColor = "lightgrey";
    } else {
        iColor = "lightgrey";
        fColor = "grey";
    }

    const topBar = [
        {
            id:"voltar",
            content: (
                <div style={{fontSize:"25px"}} onClick={() => navigate("/")}>← Voltar</div>
            )
        },
        {
            id:"categoria",
            content: (
                <div className={"flex flex-row"}>

                    <button className="border-b-2" style={{paddingLeft:"5px", paddingRight:"5px", color:fColor, borderColor:fColor}} onClick={() =>setPageMode(false)}>Pratos</button>
                    <button className="border-b-2" style={{paddingLeft:"5px", paddingRight:"5px", color:iColor, borderColor:iColor}} onClick={() =>setPageMode(true)}>Ingredientes</button>
                </div>
            )
        },
        {
            id:"pesquisa",
            content: (
                <div className={"flex flex-row bg-gray-300 shadow items-center"} style={{padding:"5px", borderRadius:"10px", fontSize:"25px"}}>
                    <FiSearch className="text-black" />
                    <input
                        type="text"
                        placeholder="Pesquisar..."
                        className="bg-transparent placeholder-black text-black ml-2 outline-none"
                    />
                </div>
            )
        }
    ];

    return (
    <div className=" justify-center p-4">
        <div className="flex flex-row h-14 w-2/3 justify-around items-start mb-3" style={{fontFamily:"Sansita"}}>
            {topBar.map(item => (
                <div key={item.id}>{item.content}</div>
            ))}
        </div>
        {pageMode ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 min-h-200"
                 style={{width: '100%', fontFamily: "Sansita", fontWeight:"400", fontStyle:"normal"}}>
                {ingredients.map(item => (
                    <div id={item.id} key={item.id} className={"bg-[#D9D9D9] rounded-5 shadow flex flex-row"} onClick={() => navigate(item.id)}
                         style={{"height": "345px", borderRadius: "10px", width: "444px"}}>
                        {item.content}
                    </div>
                ))}
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 min-h-200"
            style={{width: '100%', fontFamily: "Sansita", fontWeight:"400", fontStyle:"normal"}}>
        {foods.map(plate => (
            <div id={plate.id} key={plate.id} className={"bg-[#D9D9D9] rounded-5 shadow flex flex-row"} onClick={() => navigate(plate.id)}
                 style={{"height": "345px", borderRadius: "10px", width: "444px"}}>
                {plate.content}
            </div>
        ))}
    </div>
            )}
    </div>
)
    ;
}