import {useNavigate} from "react-router-dom";
import desperdicioDataJSON from "../tmp/dataDesperdicio.json";
import {useState} from "react";
import { Table } from "../components/CriarTabela";
import type { Column } from "../components/CriarTabela";

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
            <h1 className="text-xl mb-7 text-center font-bold">Desperdício</h1>
            <Table data={desperdicioData} columns={desperdicioColumns} rowKey={(i) => i.id} />
        </div>
    );
}
