import {FiSearch} from "react-icons/fi";
import {type JSX, useCallback, useEffect, useState} from "react";
import BackButton from "../components/Back.tsx";
import Info from "../api/PlatesAndIngredients.tsx";
import {createCards} from "../components/Cards.tsx";
import {useNavigate} from "react-router-dom";

type ItemUI = {
    id: string;
    title: string;
    imageName: string;
    ingredients: string[];
    isIngredient: boolean;
}

type CardUI = {
    id: string;
    content: JSX.Element;
    title: string;
};


export default function CozinhaBase({
                                        overlay,
                                        extraDiv,
                                        pageState,
                                        onPageModeChange,
                                        pageType
                                    }: {
    overlay?: React.ReactNode;
    extraDiv?: React.ReactNode;
    pageState : boolean;
    onPageModeChange: (mode: boolean) => void;
    pageType : string;
}) {
    const [, setSearch] = useState("");
    const navigate = useNavigate();
    let fColor;
    let iColor;

    const updatePageMode = (value: boolean) => {
        onPageModeChange(value);
        localStorage.setItem("pageMode", value.toString());
        setIsLoading(true);
    }

    if (pageState) {
        iColor = "#303030";
        fColor = "#767676";
    } else {
        iColor = "#767676";
        fColor = "#303030";
    }

    const [ingredientCards, setIngredientCards] = useState<CardUI[]>([]);
    const [foodCards, setFoodCards] = useState<CardUI[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        console.log("Ingredient cards updated:", ingredientCards.length);
        console.log("Food cards updated:", foodCards.length);
    }, [ingredientCards, foodCards]);

    const handleIngredientData = useCallback((data: ItemUI[]) => {
        console.log("Ingredient data received:", data);
        const cards = createCards(data);
        console.log("Created ingredient cards:", cards);
        setIngredientCards(cards);
        setIsLoading(false);
    }, []);

    const handleFoodData = useCallback((data: ItemUI[]) => {
        console.log("Food data received:", data);
        const cards = createCards(data);
        console.log("Created food cards:", cards);
        setFoodCards(cards);
        setIsLoading(false);
    }, []);

    const topBar = [
        {
          id:"back",
          content: (
              <BackButton />
          )
        },
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
            id:"add-button",
            content: (extraDiv)
        }
    ];

    return (
        <div className="p-4 mt-20 w-full h-full flex flex-col justify-start self-start">
            <div className="flex flex-row justify-around w-full">
            <div className="flex items-center flex-row h-14 w-full mb-3 flex-wrap gap-4 ml-auto mr-auto">
                {topBar.map(item => (
                    <div key={item.id}>{item.content}</div>
                ))}
            </div>
                <div className={"flex flex-row bg-gray-300 shadow items-center p-[5px] rounded-[10px] text-[25px] h-14"}>
                    <FiSearch className="text-black" />
                    <input
                        type="text"
                        placeholder="Pesquisar..."
                        className="bg-transparent placeholder-black text-black ml-2 outline-none"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>
            {isLoading && (
                <div className="text-center py-10">
                    Carregando...
                </div>
            )}
            {pageState ? (
                <>
                    <Info
                        key="ingredients-loader"
                        type="Ingrediente"
                        onData={handleIngredientData}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-[2%] min-h-200"
                         style={{width: '100%', fontFamily: "Sansita", fontWeight:"400", fontStyle:"normal"}}>
                        {ingredientCards.length > 0 ? (
                            ingredientCards.map(card => (
                                <div
                                    key={card.id}
                                    className="bg-[#D9D9D9] rounded-5 shadow flex flex-row cursor-pointer hover:shadow-lg transition-shadow"
                                    onClick={() => navigate(`/ingredient/${card.id}`)}
                                    style={{height: "345px", borderRadius: "10px", width: "400px"}}
                                >
                                    {card.content}
                                </div>
                            ))
                        ) : !isLoading && (
                            <div className="col-span-3 text-center py-10">
                                Nenhum ingrediente encontrado
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <>
                    <Info
                        type="Prato"
                        onData={handleFoodData}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[2%] min-h-200"
                         style={{width: '100%', fontFamily: "Sansita", fontWeight:"400", fontStyle:"normal"}}>
                        {foodCards.length > 0 ? (
                            foodCards.map(card => (
                                <div
                                    key={card.id}
                                    className="bg-[#D9D9D9] rounded-5 shadow flex flex-row cursor-pointer hover:shadow-lg transition-shadow"
                                    onClick={() => navigate(`/${pageType}/food/${card.id}`)}
                                    style={{height: "345px", borderRadius: "10px", width: "444px"}}
                                >
                                    {card.content}
                                </div>
                            ))
                        ) : !isLoading && (
                            <div className="col-span-3 text-center py-10">
                                Nenhum prato encontrado
                            </div>
                        )}
                    </div>
                </>
            )}
            {overlay}
        </div>
    );
}