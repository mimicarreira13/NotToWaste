import {useNavigate} from "react-router-dom";
import desperdicioDataJSON from "../tmp/dataDesperdicio.json";
import {useState} from "react";
import { Table } from "../components/Tabels/CriarTabela";
import type { Column } from "../components/Tabels/CriarTabela";
import BotaoAdicionar from "../components/BotaoAdicionar";
import DesperdicioFormulario from "../components/forms/DesperdicioFormulario";
import BackButton from "../components/Back.tsx";

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
    { key: "quantidade", label: "Quantidade" },
    { key: "unidade", label: "Unidade" },
    {key: "custo", label: "Custo"},
    {key: "dataDesperdicio", label: "Data do Desperdício"}

];

export default function Desperdicio() {
    return (

        <div className="p-6">

            <h1 className="text-4xl md:text-5l mb-7 text-center font-bold">Desperdício</h1>

            <div className="flex items-center justify-between mb-4">
            
            
                <BackButton />
            
                <BotaoAdicionar 
                title="Adicionar ingrediente ao Desperdício" 
                modalComponent={DesperdicioFormulario} 
                buttonLabel="Adicionar" 
                />

            </div>

            <Table 
                data={desperdicioData} 
                columns={desperdicioColumns} 
                rowKey={(i) => i.id} 
            />

        </div>
    );
}

