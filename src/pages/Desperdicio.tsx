import desperdicioDataJSON from "../tmp/dataDesperdicio.json";
import { Table } from "../components/Tabels/CriarTabela";
import type { Column } from "../components/Tabels/CriarTabela";
import BotaoAdicionar from "../components/BotaoAdicionar";
import DesperdicioFormulario from "../components/forms/DesperdicioFormulario";
import BackButton from "../components/Back.tsx";
import Contador from "../components/Contador.tsx";

export type IngredientesTabela = {

    id: number;
    nome: string;
    marca: string;
    motivo: string;
    quantidade: string;
    unidade: string;
    
}
    
const desperdicioData = desperdicioDataJSON as IngredientesTabela[];

const desperdicioColumns: Column<IngredientesTabela>[] = [

    { key: "nome", label: "Nome" },
    { key: "marca", label: "Marca" },
    { key: "motivo", label: "Motivo" },
    { key: "quantidade", label: "Quantidade",
        render: (row, updateRow) => (
      <Contador
        value={Number(row.quantidade)}
        onChange={(int) => updateRow({ quantidade: String(int) })}
      />
    )
     },
    { key: "unidade", label: "Unidade" },
    {key: "custo", label: "Custo"},
    {key: "dataDesperdicio", label: "Data do Desperdício"}

];

export default function Desperdicio() {
    return (

        <div className="w-full min-h-full flex flex-col p-3 sm:p-6">   

            <h1 className="text-2xl sm:text-3xl md:text-4xl text-center font-bold mb-6">
                Desperdício
            </h1>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            
            
                <BackButton />
            
                <BotaoAdicionar 
                title="Adicionar ingrediente ao Desperdício" 
                modalComponent={DesperdicioFormulario} 
                buttonLabel="Adicionar" 
                />

            </div>
                <Tabela 
                    data={desperdicioData} 
                    columns={desperdicioColumns} 
                    rowKey={(i) => i.id} 
                />

        </div>
    );
}

