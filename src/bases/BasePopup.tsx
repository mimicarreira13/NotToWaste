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

export default function BasePopup(
    {type} : {type: string}
) {

    const render = () => {
        switch(type){
            case "dishes": return dishes();
            case "ingredients": return ingredients();
        }
    }

    return (
        <>
            {render()}
        </>
    )
}