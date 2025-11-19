import {useNavigate, type NavigateFunction} from "react-router-dom";
import {FiSearch} from "react-icons/fi";

const ingredients = [
    {
        id: "espetada",
        content: (
            <>
                <img src="/src/assets/food/Espetada.jpg" style={{
                    height: "345px",
                    width: "174px",
                    borderTopLeftRadius: "10px",
                    borderBottomLeftRadius: "10px"
                }} alt="Espetada"/>
                <div className="w-1" style={{backgroundColor: "#4c6e43"}}></div>
                <div className="flex-col" style={{marginLeft: "20px", height: "345px"}}>
                    <div className="font-black" style={{fontSize: "32px", fontWeight: "bold"}}>Espetada</div>
                    <div className="" style={{fontSize: "24px", color: "grey"}}>Ingredientes</div>
                    <div className="font-black" style={{fontSize: "24px", fontWeight: "normal"}}>•Carne</div>
                </div>
            </>
        ),
        classes: "bg-[#D9D9D9] rounded-5 shadow flex flex-row"
    },
    {
        id: "Picado de Vaca",
        content: (
            <>
                <img src="/src/assets/food/picado%20de%20vaca.jpg" style={{
                    height: "345px",
                    width: "174px",
                    borderTopLeftRadius: "10px",
                    borderBottomLeftRadius: "10px"
                }} alt="Picado de Vaca"/>
                <div className="w-1" style={{backgroundColor: "#4c6e43"}}></div>
                <div className="flex-col" style={{marginLeft: "20px", height: "345px"}}>
                    <div className="font-black" style={{fontSize: "32px", fontWeight: "bold"}}>Picado de Vaca</div>
                    <div className="" style={{fontSize: "24px", color: "grey"}}>Ingredientes</div>
                    <div className="font-black" style={{fontSize: "24px", fontWeight: "normal"}}>•Carne <br/>•Batata
                    </div>
                </div>
            </>
        ),
        classes: "bg-[#D9D9D9] rounded-5 shadow flex flex-row"
    },
    {
        id: "Francisinha",
        content: (
            <>
                <img src="/src/assets/food/francesinha.jpg" style={{
                    height: "345px",
                    width: "174px",
                    borderTopLeftRadius: "10px",
                    borderBottomLeftRadius: "10px"
                }} alt="Francisinha"/>
                <div className="w-1" style={{backgroundColor: "#4c6e43"}}></div>
                <div className="flex-col" style={{marginLeft: "20px", height: "345px"}}>
                    <div className="font-black" style={{fontSize: "32px", fontWeight: "bold"}}>Francisinha</div>
                    <div className="" style={{fontSize: "24px", color: "grey"}}>Ingredientes</div>
                    <div className="font-black"
                         style={{fontSize: "24px", fontWeight: "normal"}}>•Bife<br/>•Salsicha<br/>•Pão<br/>•Ovo<br/>•Queijo<br/>•Linguiça<br/>•...<br/>
                    </div>
                </div>
            </>
        ),
        classes: "bg-[#D9D9D9] rounded-5 shadow flex flex-row"
    },
    {
        id: "Carne Vinha de Alhos",
        content: (
            <>
                <img src="/src/assets/food/carne vinha de alhos.jpg" style={{
                    height: "345px",
                    width: "174px",
                    borderTopLeftRadius: "10px",
                    borderBottomLeftRadius: "10px"
                }} alt="Francisinha"/>
                <div className="w-1" style={{backgroundColor: "#4c6e43"}}></div>
                <div className="flex-col" style={{marginLeft: "20px", height: "345px"}}>
                    <div className="font-black" style={{fontSize: "32px", fontWeight: "bold"}}>Carne vinha de Alhos
                    </div>
                    <div className="" style={{fontSize: "24px", color: "grey"}}>Ingredientes</div>
                    <div className="font-black" style={{fontSize: "24px", fontWeight: "normal"}}>•Carne<br/>•Vinha<br/>•Alhos
                    </div>
                </div>
            </>
        ),
        classes: "bg-[#D9D9D9] rounded-5 shadow flex flex-row"
    },
    {
        id: "Bifana",
        content: (
            <>
                <img src="/src/assets/food/bifana.jpg" style={{
                    height: "345px",
                    width: "174px",
                    borderTopLeftRadius: "10px",
                    borderBottomLeftRadius: "10px"
                }} alt="Francisinha"/>
                <div className="w-1" style={{backgroundColor: "#4c6e43"}}></div>
                <div className="flex-col" style={{marginLeft: "20px", height: "345px"}}>
                    <div className="font-black" style={{fontSize: "32px", fontWeight: "bold"}}>Bifana</div>
                    <div className="" style={{fontSize: "24px", color: "grey"}}>Ingredientes</div>
                    <div className="font-black" style={{fontSize: "24px", fontWeight: "normal"}}>•Carne<br/>•Arroz<br/>•Batata
                    </div>
                </div>
            </>
        ),
        classes: "bg-[#D9D9D9] rounded-5 shadow flex flex-row"
    },
    {
        id: "Esparguete a Bolhonhesa",
        content: (
            <>
                <img src="/src/assets/food/esparguete.jpg" style={{
                    height: "345px",
                    width: "174px",
                    borderTopLeftRadius: "10px",
                    borderBottomLeftRadius: "10px"
                }} alt="Francisinha"/>
                <div className="w-1" style={{backgroundColor: "#4c6e43"}}></div>
                <div className="flex-col" style={{marginLeft: "20px", height: "345px"}}>
                    <div className="font-black" style={{fontSize: "32px", fontWeight: "bold"}}>Esparguete</div>
                    <div className="" style={{fontSize: "24px", color: "grey"}}>Ingredientes</div>
                    <div className="font-black" style={{fontSize: "24px", fontWeight: "normal"}}>•Carne<br/>•Esparguete
                    </div>
                </div>
            </>
        ),
        classes: "bg-[#D9D9D9] rounded-5 shadow flex flex-row"
    }
]

const food = [
    {
        id: "espetada",
        content: (
            <>
                <img src="/src/assets/food/Espetada.jpg" style={{
                    height: "345px",
                    width: "174px",
                    borderTopLeftRadius: "10px",
                    borderBottomLeftRadius: "10px"
                }} alt="Espetada"/>
                <div className="w-1" style={{backgroundColor: "#4c6e43"}}></div>
                <div className="flex-col" style={{marginLeft: "20px", height: "345px"}}>
                    <div className="font-black" style={{fontSize: "32px", fontWeight: "bold"}}>Espetada</div>
                    <div className="" style={{fontSize: "24px", color: "grey"}}>Ingredientes</div>
                    <div className="font-black" style={{fontSize: "24px", fontWeight: "normal"}}>•Carne</div>
                </div>
            </>
        ),
        classes: "bg-[#D9D9D9] rounded-5 shadow flex flex-row"
    },
    {
        id: "Picado de Vaca",
        content: (
            <>
                <img src="/src/assets/food/picado%20de%20vaca.jpg" style={{
                    height: "345px",
                    width: "174px",
                    borderTopLeftRadius: "10px",
                    borderBottomLeftRadius: "10px"
                }} alt="Picado de Vaca"/>
                <div className="w-1" style={{backgroundColor: "#4c6e43"}}></div>
                <div className="flex-col" style={{marginLeft: "20px", height: "345px"}}>
                    <div className="font-black" style={{fontSize: "32px", fontWeight: "bold"}}>Picado de Vaca</div>
                    <div className="" style={{fontSize: "24px", color: "grey"}}>Ingredientes</div>
                    <div className="font-black" style={{fontSize: "24px", fontWeight: "normal"}}>•Carne <br/>•Batata
                    </div>
                </div>
            </>
        ),
        classes: "bg-[#D9D9D9] rounded-5 shadow flex flex-row"
    },
    {
        id: "Francisinha",
        content: (
            <>
                <img src="/src/assets/food/francesinha.jpg" style={{
                    height: "345px",
                    width: "174px",
                    borderTopLeftRadius: "10px",
                    borderBottomLeftRadius: "10px"
                }} alt="Francisinha"/>
                <div className="w-1" style={{backgroundColor: "#4c6e43"}}></div>
                <div className="flex-col" style={{marginLeft: "20px", height: "345px"}}>
                    <div className="font-black" style={{fontSize: "32px", fontWeight: "bold"}}>Francisinha</div>
                    <div className="" style={{fontSize: "24px", color: "grey"}}>Ingredientes</div>
                    <div className="font-black"
                         style={{fontSize: "24px", fontWeight: "normal"}}>•Bife<br/>•Salsicha<br/>•Pão<br/>•Ovo<br/>•Queijo<br/>•Linguiça<br/>•...<br/>
                    </div>
                </div>
            </>
        ),
        classes: "bg-[#D9D9D9] rounded-5 shadow flex flex-row"
    },
    {
        id: "Carne Vinha de Alhos",
        content: (
            <>
                <img src="/src/assets/food/carne vinha de alhos.jpg" style={{
                    height: "345px",
                    width: "174px",
                    borderTopLeftRadius: "10px",
                    borderBottomLeftRadius: "10px"
                }} alt="Francisinha"/>
                <div className="w-1" style={{backgroundColor: "#4c6e43"}}></div>
                <div className="flex-col" style={{marginLeft: "20px", height: "345px"}}>
                    <div className="font-black" style={{fontSize: "32px", fontWeight: "bold"}}>Carne vinha de Alhos
                    </div>
                    <div className="" style={{fontSize: "24px", color: "grey"}}>Ingredientes</div>
                    <div className="font-black" style={{fontSize: "24px", fontWeight: "normal"}}>•Carne<br/>•Vinha<br/>•Alhos
                    </div>
                </div>
            </>
        ),
        classes: "bg-[#D9D9D9] rounded-5 shadow flex flex-row"
    },
    {
        id: "Bifana",
        content: (
            <>
                <img src="/src/assets/food/bifana.jpg" style={{
                    height: "345px",
                    width: "174px",
                    borderTopLeftRadius: "10px",
                    borderBottomLeftRadius: "10px"
                }} alt="Francisinha"/>
                <div className="w-1" style={{backgroundColor: "#4c6e43"}}></div>
                <div className="flex-col" style={{marginLeft: "20px", height: "345px"}}>
                    <div className="font-black" style={{fontSize: "32px", fontWeight: "bold"}}>Bifana</div>
                    <div className="" style={{fontSize: "24px", color: "grey"}}>Ingredientes</div>
                    <div className="font-black" style={{fontSize: "24px", fontWeight: "normal"}}>•Carne<br/>•Arroz<br/>•Batata
                    </div>
                </div>
            </>
        ),
        classes: "bg-[#D9D9D9] rounded-5 shadow flex flex-row"
    },
    {
        id: "Esparguete a Bolhonhesa",
        content: (
            <>
                <img src="/src/assets/food/esparguete.jpg" style={{
                    height: "345px",
                    width: "174px",
                    borderTopLeftRadius: "10px",
                    borderBottomLeftRadius: "10px"
                }} alt="Francisinha"/>
                <div className="w-1" style={{backgroundColor: "#4c6e43"}}></div>
                <div className="flex-col" style={{marginLeft: "20px", height: "345px"}}>
                    <div className="font-black" style={{fontSize: "32px", fontWeight: "bold"}}>Esparguete</div>
                    <div className="" style={{fontSize: "24px", color: "grey"}}>Ingredientes</div>
                    <div className="font-black" style={{fontSize: "24px", fontWeight: "normal"}}>•Carne<br/>•Esparguete
                    </div>
                </div>
            </>
        ),
        classes: "bg-[#D9D9D9] rounded-5 shadow flex flex-row"
    }
]

const makeTopBar = (navigate: NavigateFunction) => [
    {
        id:"voltar",
        content: (
            <div className="font-black font-bold" style={{fontSize:"25px"}} onClick={() => navigate("/")}>← Voltar</div>
        )
    },
    {
        id:"categoria",
        content: (
            <div className={"flex flex-row"}>
                <div className="border-b-2" style={{paddingLeft:"5px", paddingRight:"5px", color:"grey", borderColor:"grey"}}>Pratos</div>
                <div className="border-b-2" style={{paddingLeft:"5px", paddingRight:"5px", color:"lightgrey", borderColor:"lightgrey"}} onClick={() => navigate("/ingredientes")}>Ingredientes</div>
            </div>
        )
    },
    {
        id:"pesquisa",
        content: (
            <div className={"flex flex-row bg-gray-300 shadow items-center"} style={{padding:"5px", borderRadius:"10px", fontSize:"25px"}}>
                <FiSearch className="text-black" />
                <input
                    type="text"
                    placeholder="Pesquisar..."
                    className="bg-transparent placeholder-black text-black ml-2 outline-none"
                />
            </div>
        )
    }
];


export default function Cozinha() {
    const navigate = useNavigate();
    const topBar = makeTopBar(navigate);
    return (
    <div className=" justify-center p-4">
        <script>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
            <link href="https://fonts.googleapis.com/css2?family=Sansita:ital,wght@0,400;0,700;0,800;0,900;1,400;1,700;1,800;1,900&display=swap" rel="stylesheet"/>
        </script>
        <div className="flex flex-row h-14 w-2/3 justify-around items-start mb-3" style={{fontFamily:"Sansita"}}>
            {topBar.map(item => (
                <div key={item.id}>{item.content}</div>
            ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 min-h-200"
             style={{width: '100%', fontFamily: "Sansita", fontWeight:"400", fontStyle:"normal"}}>
            {food.map(plate => (
                <div id={plate.id} key={plate.id} className={plate.classes}
                     style={{"height": "345px", borderRadius: "10px", width: "444px"}}>
                    {plate.content}
                </div>
            ))}
        </div>
    </div>
)
    ;
}