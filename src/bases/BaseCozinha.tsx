import {FiSearch} from "react-icons/fi";
import {type JSX, useState} from "react";
import BackButton from "../components/Back.tsx";
import Info from "../api/APIgetter.tsx";
import {createCards} from "../components/Cards.tsx";

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
                                    }: {
    overlay?: React.ReactNode;
    extraDiv?: React.ReactNode;
}) {
    const saved = localStorage.getItem("pageMode") === "true";
    const [pageMode, setPageMode] = useState(saved);
    const [search, setSearch] = useState("");
    const [cards, setCards] = useState<CardUI[]>([]);
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
          id:"voltar",
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
            id:"pesquisa",
            content: (
                <div className={"flex flex-row bg-gray-300 shadow items-center p-[5px] rounded-[10px] text-[25px]"}>
                    <FiSearch className="text-black" />
                    <input
                        type="text"
                        placeholder="Pesquisar..."
                        className="bg-transparent placeholder-black text-black ml-2 outline-none"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            )
        }
    ];

    return (
        <div className="p-4 mt-20 w-full h-full flex flex-col justify-start self-start">
            <div className="flex items-center flex-row h-14 w-[80%] mb-3 justify-between flex-wrap gap-4 ml-auto mr-auto">
                {topBar.map(item => (
                    <div key={item.id}>{item.content}</div>
                ))}
                <div>
                    {extraDiv}
                </div>
            </div>
            {pageMode ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[5%] min-h-200"
                     style={{width: '100%', fontFamily: "Sansita", fontWeight:"400", fontStyle:"normal"}}>
                    <div className={"bg-[#D9D9D9] rounded-5 shadow flex flex-row"}
                         style={{"height": "345px", borderRadius: "10px", width: "444px"}}>
                        <Info
                            type={"Ingrediente"} // Singular, not "Ingredientes"
                            onData={(data: ItemUI[]) => {
                                setCards(createCards(data));
                            }}
                        />
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[5%] min-h-200"
                     style={{width: '100%', fontFamily: "Sansita", fontWeight:"400", fontStyle:"normal"}}>
                    <div className={"bg-[#D9D9D9] rounded-5 shadow flex flex-row"}
                         style={{"height": "345px", borderRadius: "10px", width: "444px"}}>
                        <Info
                            type={"Prato"} // This should match your backend route
                            onData={(data: ItemUI[]) => {
                                setCards(createCards(data));
                            }}
                        />
                    </div>
                </div>
            )}
            {overlay}
        </div>
    );
}