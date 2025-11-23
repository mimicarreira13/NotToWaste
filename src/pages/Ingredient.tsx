import ingredientDataJSON from "../tmp/fullIngredientData.json";

export default function Ingredient() {
    const { id } = useParams();
    console.log("This thing " + id);
    const info = ingredientDataJSON.find(entry => entry.id === id);
    console.log("Info " + info);

    return (
        <>
            <div className="w-full">
                <div className={"shadow bg-[#D9D9D9] rounded-[15px] block ml-auto mr-auto w-[80%]"}>
                    <h1 className={"text-center text-[64px] font-[Sansita]"}>{info.title}</h1>
                    <div className="flex flex-row">
                        <div className="w-1/2 ml-[20px] mr-[10px] text-[32px] font-[Sansita]">
                            <div className={"mb-[25px]"}>Marca: <span className={"text-stone-600"}>{info.marca}</span></div>
                            <div className={"mb-[25px]"}>Custo: <span className={"text-stone-600"}>{info.custo}€</span></div>
                            <div className={"mb-[25px]"}>Quantidade em stock: <span className={"text-stone-600"}>{info.quantidade}</span></div>
                            <div className={"mb-[25px]"}>Data de Validade: <span className={"text-stone-600"}>{info.validade}</span></div>
                        </div>
                        <img src={"/src/assets/ingredients/" + info.imageName} alt={info.title} className="rounded-[15px] w-1/3 h-1/3 block ml-auto mr-auto mb-[20px]" />
                    </div>
                </div>
            </div>
        </>
    )
}