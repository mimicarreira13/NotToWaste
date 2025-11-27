import foodDataJSON from "../tmp/fullDataFood.json";
import {useParams} from "react-router-dom";
import {FiAlertTriangle} from "react-icons/fi";

export default function ManageFood() {
    const { id } = useParams();
    console.log("This thing " + id);
    const info = foodDataJSON.find(entry => entry.id === id);
    console.log("Info " + info);

    return (
        <>
            {info ? (
            <div className={"h-full! align-top!"}>
                <div className={"shadow bg-[#D9D9D9] rounded-[15px] block ml-auto mr-auto "} style={{width:"80%", height:"80%"}}>
                    <h1 className={"text-center text-[64px] font-[Sansita]"}>{info.title}</h1>
                    <div className="flex flex-row">
                        <div className="w-1/2 ml-[20px] mr-[10px] text-[32px] font-[Sansita]">
                            <div className={"mb-[25px]"}>Ingrediente(s): <span className={"text-stone-600"}>{info.ingredients.join(", ")}</span></div>
                            <div className={"mb-[25px]"}>Preço: <span className={"text-stone-600"}>{info.price}€</span></div>
                            <div className={"scroll-auto text-stone-600"}>{info.description}</div>
                        </div>
                        <img src={"/src/assets/food/" + info.imageName} alt={info.title} className="rounded-[15px] w-1/3 h-1/3 block ml-auto mr-auto mb-[20px]" />
                    </div>
                </div>
            </div>
            ):(
                <div className="text-[64px] text-black">
                    Page not available.
                    <FiAlertTriangle className={"text-black block ml-auto mr-auto"} />
                </div>
            )}
        </>
    )
}