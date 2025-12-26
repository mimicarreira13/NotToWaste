// TypeScript
import {FiSearch} from "react-icons/fi";
import React, {type JSX, useCallback, useEffect, useState} from "react";
import BackButton from "../components/Back.tsx";
import Info from "../api/PlatesAndIngredients.tsx";
import {createCards} from "../components/Cards.tsx";
import {useNavigate} from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner.tsx";
import ToggleTabs from "../components/ToggleTabs";
import { GiCarrot } from "react-icons/gi";
import { FaUtensils } from "react-icons/fa";

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
    const IngredientsIcon = <GiCarrot size={18} aria-hidden />;
    const DishesIcon = <FaUtensils size={20} aria-hidden />;
    let fColor;

    const updatePageMode = (value: boolean) => {
        onPageModeChange(value);
        localStorage.setItem("pageMode", value.toString());
        setIsLoading(true);
    }

    if (pageState) {
        fColor = "#767676";
    } else {
        fColor = "#303030";
    }

    const [ingredientCards, setIngredientCards] = useState<CardUI[]>([]);
    const [foodCards, setFoodCards] = useState<CardUI[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // selected tab state synchronized with pageState
    const [selectedTab, setSelectedTab] = useState(pageState ? "ingredientes" : "pratos");
    useEffect(() => {
        setSelectedTab(pageState ? "ingredientes" : "pratos");
    }, [pageState]);

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

    // when the tab changes, update local state and call updatePageMode
    const handleTabChange = (id: string) => {
        setSelectedTab(id);
        const isIngredient = id === "ingredientes";
        updatePageMode(isIngredient);
    };

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
                <ToggleTabs
                    options={[
                        { id: "pratos", label: "Pratos", icon: DishesIcon },
                        { id: "ingredientes", label: "Ingredientes", icon: IngredientsIcon }
                    ]}
                    value={selectedTab}
                    onChange={handleTabChange}
                    selectedBackgroundColor="#4C6E43"
                    selectedTextColor="#D9D9D9"
                    baseTextColor={fColor}
                    fontSize="20px"
                />
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
                <div className={"flex flex-row bg-gray-300 shadow items-center p-[5px] rounded-[10px] text-[25px] h-14 xl:mr-2"}>
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
                <div className="w-full flex items-center justify-center" style={{ minHeight: 'calc(100vh - 25rem)' }}>
                    <LoadingSpinner message="Carregando cozinha..." size={64} ariaLabel="loading-kitchen" />
                </div>
            )}
            {pageState ? (
                <>
                    <Info
                        key="ingredients-loader"
                        type="Ingrediente"
                        onData={handleIngredientData}
                    />
                    <div className=" grid xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 gap-[2%] min-h-200"
                         style={{width: '100%', fontFamily: "Sansita", fontWeight:"400", fontStyle:"normal"}}>
                        {ingredientCards.length > 0 ? (
                            ingredientCards.map(card => (
                                <div
                                    key={card.id}
                                    className="bg-[#D9D9D9] rounded-5 shadow flex flex-row 2xl:w-[400px] cursor-pointer hover:shadow-lg transition-shadow xl:w-1/2"
                                    onClick={() => navigate(`/ingredient/${card.id}`)}
                                    style={{height: "345px", borderRadius: "10px"}}
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
                    <div className="grid xl:grid-cols-2 gap-[2%] 2xl:grid-cols-3 3xl:grid-cols-4 min-h-200"
                         style={{width: '100%', fontFamily: "Sansita", fontWeight:"400", fontStyle:"normal"}}>
                        {foodCards.length > 0 ? (
                            foodCards.map(card => (
                                <div
                                    key={card.id}
                                    className="bg-[#D9D9D9] rounded-5 shadow 3xl:w-[400px] 2xl:w-[500px] flex flex-row cursor-pointer hover:shadow-lg transition-shadow xl:w-[600px]"
                                    onClick={() => navigate(`/${pageType}/food/${card.id}`)}
                                    style={{height: "345px", borderRadius: "10px"}}
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