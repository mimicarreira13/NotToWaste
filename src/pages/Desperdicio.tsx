import {useNavigate} from "react-router-dom";
import desperdicioDataJSON from "../tmp/dataDesperdicio.json";
import {useState} from "react";
import { Table } from "../components/Tabels/CriarTabela";
import type { Column } from "../components/Tabels/CriarTabela";
import BotaoAdicionar from "../components/BotaoAdicionar";
import DesperdicioFormulario from "../components/forms/DesperdicioFormulario";


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
];

export default function Desperdicio() {
    return (
        <div className="p-6">
            <div className="flex items-center justify-end mb-4">
            
            <BotaoAdicionar 
            title="Adicionar ingrediente ao Desperdício" 
            modalComponent={DesperdicioFormulario} 
            buttonLabel="Adicionar" />
        </div>
            <Table data={desperdicioData} columns={desperdicioColumns} rowKey={(i) => i.id} />
        </div>
    );
}//<h1 className="text-xl mb-7 text-center font-bold">Desperdício</h1>
