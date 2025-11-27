import {useNavigate} from "react-router-dom";
import stockDataJSON from "../tmp/dataStock.json";
import {useState} from "react";
import { Table } from "../components/CriarTabela";
import type { Column } from "../components/CriarTabela";

export type IngredientesStockTabela = {

    id: number;
    nome: string;
    marca: string;
    quantidade: string;
    unidade: string;
    dataAbertura: string;
    dataValidade: string;
    
}
    
const stockData = stockDataJSON as IngredientesStockTabela[];

const stockColumns: Column<IngredientesStockTabela>[] = [
    { key: "nome", label: "Nome" },
    { key: "marca", label: "Marca" },
    { key: "quantidade", label: "Quantidade" },
    { key: "unidade", label: "Unidade" },
    { key: "dataAbertura", label: "Data Abertura" },
    { key: "dataValidade", label: "Data Validade" },
];

export default function StockPage() {
    return (
         <div className="p-6">
            <h1 className="text-xl mb-7 text-center font-bold">Stock</h1>
            
                <Table data={stockData} columns={stockColumns} rowKey={(i) => i.id} />
        </div>
    );
}