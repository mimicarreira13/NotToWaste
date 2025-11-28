import {useNavigate} from "react-router-dom";
import stockDataJSON from "../tmp/dataStock.json";
import {useState} from "react";
import { Table } from "../components/Tabels/CriarTabela";
import type { Column } from "../components/Tabels/CriarTabela";
import BotaoAdicionar from "../components/BotaoAdicionar";
import StockFormulario from "../components/forms/StockFormulario";
import BackButton from "../components/Back.tsx";

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

            <h1 className="text-4xl md:text-5l mb-7 text-center font-bold">Stock</h1>

            <div className="flex items-center justify-between mb-4">

                <BackButton />

                <BotaoAdicionar 
                        title="Adicionar ingrediente ao Stock" 
                        modalComponent={StockFormulario} 
                        buttonLabel="Adicionar"       
                />

            </div>

            <Table 
                data={stockData} 
                columns={stockColumns} 
                rowKey={(i) => i.id} 
            />

        </div>
    );
}



