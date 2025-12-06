//import {useNavigate} from "react-router-dom";

type ItemUI = {
    id: string;
    title: string;
    imageName: string;
    ingredients?: string[];
    isIngredient: boolean;
};

export function createCard({
                               id,
                               title,
                               imageName,
                               ingredients = [],
                               isIngredient,
                           }: ItemUI) {
    const imagePath = `/src/assets/${isIngredient ? "ingredients" : "food"}/${imageName}`;

    return {
        id,
        content: (
            <>
                <img src={imagePath} style={{
                    height: "345px",
                    width: "174px",
                    borderTopLeftRadius: "10px",
                    borderBottomLeftRadius: "10px"
                }} alt={title}/>
                <div className="w-1" style={{backgroundColor: "#4c6e43"}}></div>
                <div className="flex-col" style={{marginLeft: "20px", height: "345px"}}>
                    <div className="font-black" style={{fontSize: "32px", fontWeight: "bold"}}>{title}</div>
                    {!isIngredient && (
                        <>
                            <div className={"text-[24px] text-stone-800"}>Ingredientes</div>
                            <div className="text-stone-600 text-[24px]" dangerouslySetInnerHTML={{__html: ingredients.map(i => ` ${i}`).join(","),}}/>
                        </>
                    )}
                </div>
            </>
        ),
        title: title
    };
}


export function createCards(data: ItemUI[]) {
    return data.map(item => createCard(item));
}
