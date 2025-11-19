const food = [
    {
        id: "espetada",
        content: (
            <>
                <img src="/src/assets/food/Espetada.jpg" style={{height:"345px", width:"174px", borderRadius:"10px"}} alt="Espetada" />
                <div className="flex-col" style={{height:"345px"}} >
                    <div className="font-black" style={{fontSize:"32px"}}>Espetada</div>
                    <div className="" style={{fontSize:"24px", color:"grey"}}>Ingredientes</div>
                    <div className="font-black" style={{fontSize:"24px"}}>•Carne</div>
                </div>
            </>
        ),
        classes: "bg-[#D9D9D9] rounded-5 shadow flex flex-row justify-between"
    },
    {
        id: "Picado de Vaca",
        content: (
            <>
                <img src="/src/assets/food/picado%20de%20vaca.jpg" style={{height:"345px", width:"174px", borderRadius:"10"}} alt="Picado de Vaca" />
                <div className="flex-col" style={{height:"345px"}}>
                    <div className="font-black" style={{fontSize:"32px"}}>Picado de Vaca</div>
                    <div className="" style={{fontSize:"24px", color:"grey"}}>Ingredientes</div>
                    <div className="font-black" style={{fontSize:"24px"}}>•Carne <br />•Batata</div>
                </div>
            </>
        ),
        classes: "bg-[#D9D9D9] rounded-5 shadow border-2 border-[#CFCFCF] flex flex-row"
    },
    {
        id: "Francisinha",
        content: (
            <>
                <img src="/src/assets/food/francesinha.jpg" style={{height:"345px", width:"174px", borderRadius:"10px"}} alt="Francisinha"/>
                <div className="flex-col" style={{height:"345px"}}>
                    <div className="font-black" style={{fontSize:"32px"}}>Francisinha</div>
                    <div className="" style={{fontSize:"24px", color:"grey"}}>Ingredientes</div>
                    <div className="font-black" style={{fontSize:"24px"}}>•Bife<br />•Salsicha<br />•Pão<br />•Ovo<br />•Queijo<br />•Linguiça<br />•Sal<br />•...<br /></div>
                </div>
            </>
        ),
        classes: "bg-[#D9D9D9] flex flex-row justify-center items-center rounded-5 shadow border-2 border-[#CFCFCF] "
    },
    {
        id:"Carne Vinha de Alhos",
        content: (
            <>
                <img src="/src/assets/food/carne vinha de alhos.jpg" style={{height:"345px", width:"174px"}} alt="Francisinha"/>
                <div className="flex-col" style={{height:"345px"}}>
                    <div className="font-black" style={{fontSize:"32px"}}>Carne vinha de Alhos</div>
                    <div className="" style={{fontSize:"24px", color:"grey"}}>Ingredientes</div>
                    <div className="font-black" style={{fontSize:"24px"}}>•Carne<br />•Vinha<br />•Alhos</div>
                </div>
            </>
        ),
        classes: "bg-[#D9D9D9] rounded-5 shadow flex flex-row items-center border-2 border-[#CFCFCF]"
    },
    {
        id: "Bifana",
        content: (
            <>
                <img src="/src/assets/food/bifana.jpg" style={{height:"345px", width:"174px", borderRadius:"10px"}} alt="Francisinha"/>
                <div className="flex-col" style={{height:"345px"}}>
                    <div className="font-black" style={{fontSize:"32px"}}>Bifana</div>
                    <div className="" style={{fontSize:"24px", color:"grey"}}>Ingredientes</div>
                    <div className="font-black" style={{fontSize:"24px"}}>•Carne<br />•Arroz<br />•Batata</div>
                </div>
            </>
        ),
        classes: "bg-[#D9D9D9] rounded-5 shadow flex flex-row justify-center border-2 border-[#CFCFCF] text-center"
    },
    {
        id: "Esparguete a Bolhonhesa",
        content: (
            <>
                <img src="/src/assets/food/esparguete.jpg" style={{height:"345px", width:"174px", borderRadius:"10px"}} alt="Francisinha"/>
                <div className="flex-col" style={{height:"345px"}}>
                    <div className="font-black" style={{fontSize:"32px"}}>Esparguete</div>
                    <div className="" style={{fontSize:"24px", color:"grey"}}>Ingredientes</div>
                    <div className="font-black" style={{fontSize:"24px"}}>•Carne
                        •Esparguete</div>
                </div>
            </>
        ),
        classes: "bg-[#D9D9D9] flex flex-row justify-center items-center rounded-5 shadow border-2 border-[#CFCFCF]"
    }
]

export default function Cozinha() {
    return (
        <div className="flex justify-center p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 min-h-200" style={{width:'100%'}}>
                {food.map(plate => (
                    <div id={plate.id} key={plate.id} className={plate.classes} style={{"height":"345px", borderRadius:"10px", width:"444px"}} >
                        {plate.content}
                    </div>
                ))}
            </div>
        </div>
    );
}