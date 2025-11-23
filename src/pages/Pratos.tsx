import CozinhaBase from "./BaseCozinha.tsx";
import {FiPlus, FiUpload} from "react-icons/fi";
import {useState} from "react";

export default function Pratos() {
    const [showPopup, setShowPopup] = useState(false);
    const [fileName, setFileName] = useState("Nenhum ficheiro selecionado");
    return (
        <CozinhaBase
            path="/pratos"
            extraDiv={
                <div className="bg-[#4c6e43] rounded-[5px] shadow flex flex-row p-[5px] text-[25px] items-center" onClick={() => setShowPopup(true)}>
                    <FiPlus className="text-[#D9D9D9]" />
                    <span className={"text-[#D9D9D9]"}>Adicionar</span>
                </div>
            }
            overlay={
                showPopup && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-[#4c6e43] w-[90%] h-[90%]  shadow-lg  overflow-auto rounded-[25px]">
                            <div className={"text-[35px] text-white text-center content-center h-[7%]"}>Adição de Prato</div>
                            <div className="bg-[#d9d9d9] w-full h-[93%] overflow-auto rounded-[25px] flex flex-col items-center  justify-evenly text-center">
                                <div className={"h-[80%] flex flex-col w-[90%] text-[35px]"}>
                                   <div className={"h-[80%] flex flex-row items-center"}>
                                       <div className={"w-1/2"}>Nome:
                                           <input id={"name"} className={"bg-white rounded-[15px] p-[5px] ml-[15px]"} placeholder={"Insira o nome"}/>
                                       </div>
                                       <div className={"w-1/2"}>Ingredientes:
                                           <select id={"ingredients"} className={"bg-white rounded-[15px] p-[5px] m-[15px]"} defaultValue={"Selecione os incredientes"}>
                                               <option>Selecione ingredientes</option>
                                           </select>
                                       </div>
                                   </div>
                                    <div className={"w-1/2 h-[80%] flex flex-row items-center"}>
                                        <div className={"flex flex-row"}>Imagem:
                                            <FiUpload className={"ml-[15px]"}/>
                                            <input type={"file"} onChange={(e) => setFileName(e.target.files?.[0]?.name || "Nenhum ficheiro selecionado")}/>
                                        </div>
                                        <div className={"w-1/2"}></div>
                                    </div>
                                    <div className={"h-[80%] flex flex-row items-center"}>
                                        <div className={"w-1/2"}>Preço (€)
                                            <input id={"price"} className={"bg-white rounded-[15px] p-[5px] ml-[15px]"} placeholder={"Insira o custo"}/>
                                        </div>
                                        <div className={"w-1/2"}></div>
                                    </div>
                                    <div className={"text-[25px] flex flex-row w-[80%] justify-evenly text-center"}>
                                        <div className={"bg-[#c34a3a] text-white w-[200px] h-[70px] content-center text-[40px] rounded-[10px]"} onClick={() => setShowPopup(false)}>
                                            Cancelar
                                        </div>
                                        <div className={"bg-[#4c6e43] text-white w-[500px] h-[70px] content-center text-[40px] rounded-[10px]"} onClick={() => setShowPopup(false)}>
                                            Adicionar Prato
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                )
            }
        />
    );
}