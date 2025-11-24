import {useNavigate} from "react-router-dom";
import {FiSearch} from "react-icons/fi";
import { createCards } from "../components/Cards.tsx";
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

export default function CozinhaBase({
                                        overlay,
                                        extraDiv,
                                        path,
                                    }: {
    overlay?: React.ReactNode;
    extraDiv?: React.ReactNode;
    path: string;
}) {
    const navigate = useNavigate();
    const saved = localStorage.getItem("pageMode") === "true";
    const [pageMode, setPageMode] = useState(saved);
    let fColor;
    let iColor;

    if (pageMode) {
        iColor = "#303030";
        fColor = "#767676";
    } else {
        iColor = "#767676";
        fColor = "#303030";
    }

    const updatePageMode = (value: boolean) => {
        setPageMode(value);
        localStorage.setItem("pageMode", value.toString());
    }

    const topBar = [
        {
            id:"categoria",
            content: (
                <div className={"flex flex-row text-[20px]"}>
                    <button className={"border-b-2 pl-[5px] pr-[5px]"} style={{color:fColor, borderColor:fColor}} onClick={() => updatePageMode(false)}>Pratos</button>
                    <button className={"border-b-2 pl-[5px] pr-[5px]"} style={{color:iColor, borderColor:iColor}} onClick={() => updatePageMode(true)}>Ingredientes</button>
                </div>
            )
        },
        {
            id:"pesquisa",
            content: (
                <div className={"flex flex-row bg-gray-300 shadow items-center p-[5px] rounded-[10px] text-[25px]"}>
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
    <div className="p-4 mt-4 font-[Sansita]">
        <div className="flex items-center flex-row h-14 w-full justify-around mb-3" style={{fontFamily:"Sansita"}}>
            {topBar.map(item => (
                <div key={item.id}>{item.content}</div>
            ))}
            <div>
                {extraDiv}
            </div>
        </div>
        {pageMode ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 min-h-200"
                 style={{width: '100%', fontFamily: "Sansita", fontWeight:"400", fontStyle:"normal"}}>
                {ingredients.map(item => (
                    <div id={item.id} key={item.id} className={"bg-[#D9D9D9] rounded-5 shadow flex flex-row"} onClick={() => navigate(path + "/ingredient/" + item.id)}
                         style={{"height": "345px", borderRadius: "10px", width: "444px"}}>
                        {item.content}
                    </div>
                ))}
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 min-h-200"
            style={{width: '100%', fontFamily: "Sansita", fontWeight:"400", fontStyle:"normal"}}>
                {foods.map(plate => (
                    <div id={plate.id} key={plate.id} className={"bg-[#D9D9D9] rounded-5 shadow flex flex-row"} onClick={() => navigate(path + "/food/" + plate.id)}
                         style={{"height": "345px", borderRadius: "10px", width: "444px"}}>
                        {plate.content}
                    </div>
                ))}
            </div>
        )}
        {overlay}
    </div>
)
    ;
}