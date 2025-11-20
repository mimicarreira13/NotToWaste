type CardOptions = {
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
                           }: CardOptions) {
    const imagePath = `/src/assets/${isIngredient ? "ingredients" : "food"}/${imageName}`;

    return {
        id,
        content: (
            <>
                <img src={imagePath} style={{height: "345px", width: "174px", borderTopLeftRadius: "10px", borderBottomLeftRadius: "10px"}} alt={title}/>
                <div className="w-1" style={{ backgroundColor: "#4c6e43" }}></div>
                <div className="flex-col" style={{ marginLeft: "20px", height: "345px" }}>
                    <div className="font-black" style={{ fontSize: "32px", fontWeight: "bold" }}>{title}</div>
                    {!isIngredient && (
                        <>
                            <div style={{ fontSize: "24px", color: "grey" }}>Ingredientes</div>
                            <div className="font-black" style={{ fontSize: "24px", fontWeight: "normal" }}
                                 dangerouslySetInnerHTML={{__html: ingredients.map(i => `•${i}`).join("<br/>"),}}/>
                        </>
                    )}
                </div>
            </>
        ),
        classes: "bg-[#D9D9D9] rounded-5 shadow flex flex-row",
    };
}

export function createCards(data: CardOptions[]) {
    return data.map(item => createCard(item));
}
