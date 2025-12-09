import {useNavigate} from "react-router-dom";
import { useIngredients } from "../api/useIngredients.ts";
import {useState} from "react";

type MultiIngredientSelectProps = {
    selectedIds: string[];
    onChange: (ids: string[]) => void;
};

function Dishes({
                    selectedIds = [],
                    onChange
                }: MultiIngredientSelectProps){
    const { getOptions, loading } = useIngredients();
    const options = getOptions();

    const handleCheckboxChange = (ingredientId: string) => {
        const newSelected = selectedIds.includes(ingredientId)
            ? selectedIds.filter(id => id !== ingredientId)
            : [...selectedIds, ingredientId];

        onChange(newSelected);
    };

    if (loading) {
        return <div>Carregando ingredientes...</div>;
    }

    return (
        <>
            <div className={"flex flex-row gap-2"}>
                <div className={"w-1/2 flex flex-col"}>
                    <div className={"h-[80%] flex justify-between items-center"}>
                        <div>Nome:
                            <input id={"name"} className={"bg-white rounded-[15px] p-[5px] ml-[15px] w-[70%]"}
                                   placeholder={"Insira o nome"}/>
                        </div>

                    </div>
                    <div className={"h-[80%] flex justify-between items-center"}>
                        <div>Imagem:
                            <input type={"file"} className={"ml-[15px] w-[423px]"}/>
                        </div>
                    </div>
                    <div className={"h-[80%] flex justify-between items-center"}>
                        <div>Preço (€)
                            <input id={"price"} className={"bg-white rounded-[15px] p-[5px] ml-[15px] w-[70%]"}
                                   placeholder={"Insira o custo"}/>
                        </div>
                    </div>
                </div>
                <div className={"w-1/2"}>
                    <div className="space-y-2">
                        <label className="block font-medium">Ingredientes:</label>
                        <div className="max-h-60 overflow-y-auto border rounded p-2">
                            {options.map(option => (
                                <div key={option.id} className="flex items-center space-x-2 p-1 flex-row">
                                    <div className="w-1/2 flex items-start flex-row align-center">
                                        <input
                                            type="checkbox"
                                            id={`${option.id}`}
                                            checked={selectedIds.includes(option.id)}
                                            onChange={() => handleCheckboxChange(option.id)}
                                            className="rounded mt-auto mb-auto"
                                        />
                                        <label htmlFor={`${option.id}`} className="cursor-pointer text-[30px]">
                                            {option.name}
                                        </label>
                                    </div>
                                    <div className="w-1/2">
                                        <input id={`${option.id}`} className={"bg-white rounded-[15px] p-[5px] text-[15px]"} type={"number"} defaultValue={option.type} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="text-sm text-gray-500">
                            Selecionados: {selectedIds.length}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

function Ingredients(){
    return(
        <>
            <div className={"h-[80%] flex flex-row items-center"}>
                <div className={"w-1/2"}>Nome:
                    <input id={"name"} className={"bg-white rounded-[15px] p-[5px] ml-[15px]"}
                           placeholder={"Insira o nome"}/>
                </div>
                <div className={"w-1/2"}>Data de Validade:
                    <input id={"data"} className={"bg-white rounded-[15px] p-[5px] ml-[15px]"} type="date"
                           placeholder={"Insira a data de validade"} />
                </div>
            </div>
            <div className={"h-[80%] flex flex-row items-center"}>
                <div className={"w-1/2"}>Marca:
                    <input id={"brand"} className={"bg-white rounded-[15px] p-[5px] ml-[15px]"}
                           placeholder={"Insira a marca"}/>
                </div>
                <div className={"w-1/2"}>Preço (€):
                    <input id={"price"} className={"bg-white rounded-[15px] p-[5px] ml-[15px]"}
                           placeholder={"Insira o custo"}/>
                </div>
            </div>
            <div className={"h-[80%] flex flex-row items-center"}>
                <div className={"w-1/2"}>Imagem:
                    <input type={"file"} className={"ml-[15px] w-[423px]"}/>
                </div>
                <div className={"w-1/2"}>Quantidade:
                    <input id={"quantity"} className={"bg-white rounded-[15px] p-[5px] ml-[15px]"}
                           placeholder={"Insira a quantidade"}/>
                </div>
            </div>
        </>
    )
}

function InfoDelete(){
    return ("Tem a certeza que pretende eliminar o prato?");
}

function useFunctionFinder(close: () => void) {
    const navigate = useNavigate();

    function functionFinder(type: string) {
        switch (type) {
            case "navigate":
                close()
                navigate("/pratos");
                break;
            case "close":
                close();
                break;
        }
    }

    return { functionFinder };
}

export default function BasePopup({
                                      type,
                                      greenButton,
                                      redFunction,
                                      greenFunction,
                                      onClose,
                                    title,
                                  }: {
    type: string,
    greenButton: string,
    redFunction: string,
    greenFunction: string,
    onClose: () => void,
    title: string,
}) {

    const [selectedIngredientIds, setSelectedIngredientIds] = useState<string[]>([]);
    const { functionFinder } = useFunctionFinder(onClose);
    const render = () => {
        switch(type){
            case "dishes": return <Dishes
                selectedIds={selectedIngredientIds}
                onChange={setSelectedIngredientIds}
            />;
            case "ingredients": return <Ingredients />;
            case "infoDelete": return <InfoDelete />;
            default:
                return null;
        }
    }

    let widthPop = "70%";
    let heightPop = "70%";
    let divWhite = "85%";
    let divGreen = "15%";

    if (type==="infoDelete") {
        widthPop = "50%";
        heightPop = "30%";
        divWhite = "75%";
        divGreen = "25%";
    }

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-[#4c6e43] shadow-lg  overflow-auto rounded-[25px]" style={{width: widthPop, height: heightPop}}>
                    <div className={"text-[45px] text-white text-center content-center"} style={{height: divGreen}}>{title}</div>
                    <div className="bg-[#d9d9d9] w-full overflow-auto rounded-[25px] flex flex-col items-center  justify-evenly text-center" style={{height: divWhite}}>
                        <div className={"h-[80%] flex flex-col w-[90%] text-[35px]"}>
                            {render()}
                            <div className={"mt-4 text-[25px] flex flex-row w-full justify-evenly text-center"}>
                                <button className={"bg-[#c34a3a] text-white w-[200px] h-[70px] content-center text-[40px] rounded-[10px]"} onClick={() => functionFinder(redFunction)}>
                                    Cancelar
                                </button>
                                <button className={"bg-[#4c6e43] text-white w-[500px] h-[70px] content-center text-[40px] rounded-[10px]"} onClick={() => functionFinder(greenFunction)}>
                                    {greenButton}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}