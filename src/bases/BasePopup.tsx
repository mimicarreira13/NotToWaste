import {useNavigate} from "react-router-dom";

function dishes(){
    return (
        <>
            <div className={"h-[80%] flex flex-row items-center"}>
                <div className={"w-1/2"}>Nome:
                    <input id={"name"} className={"bg-white rounded-[15px] p-[5px] ml-[15px]"}
                           placeholder={"Insira o nome"}/>
                </div>
                <div className={"w-1/2"}>Ingredientes:
                    <select id={"ingredients"} className={"bg-white rounded-[15px] p-[5px] m-[15px]"}
                            defaultValue={"Selecione os incredientes"}>
                        <option>Selecione ingredientes</option>
                    </select>
                </div>
            </div>
            <div className={"h-[80%] flex flex-row items-center"}>
                <div className={"w-1/2"}>Imagem:
                    <input type={"file"} className={"ml-[15px] w-[423px]"}/>
                </div>
                <div className={"w-1/2"}></div>
            </div>
            <div className={"h-[80%] flex flex-row items-center"}>
                <div className={"w-1/2"}>Preço (€)
                    <input id={"price"} className={"bg-white rounded-[15px] p-[5px] ml-[15px]"}
                           placeholder={"Insira o custo"}/>
                </div>
                <div className={"w-1/2"}></div>
            </div>
        </>
    )
}

function ingredients(){
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

function infoDelete(){
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

    const { functionFinder } = useFunctionFinder(onClose);
    const render = () => {
        switch(type){
            case "dishes": return dishes();
            case "ingredients": return ingredients();
            case "infoDelete": return infoDelete();
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