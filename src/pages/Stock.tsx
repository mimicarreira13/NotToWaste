
import React, { useEffect, useState } from "react";
//import stockDataJSON from "../tmp/dataStock.json";
import { Tabela } from "../components/Tabelas/CriarTabela";
import type { Column } from "../components/Tabelas/CriarTabela";
import BotaoAdicionar from "../components/BotaoAdicionar";
import StockFormulario from "../components/forms/StockFormulario";
import BackButton from "../components/Back.tsx";
import Contador from "../components/Contador.tsx";
import { getStock, addStockItem, updateStockItem } from "../api/stock.ts";



export type IngredientesStockTabela = {

    id: number;
    nome: string;
    marca: string;
    quantidade: number;
    unidade: string; 
    //custo
    dataAbertura: string; //tirar
    dataValidade: string;
    //imAGEM
    
}

export default function StockPage() 
{


    const [stockData, setStockData] = useState<IngredientesStockTabela[]>([]);

    useEffect(() => 
    {
        async function load() {
            const data = await getStock();
            /*const fixData = data.map((item: IngredientesStockTabela ) => ({
                ...item,
                quantidade: Number(item.quantidade)
            }));
            setStockData(fixData);*/
        }   
        load();
    }, []);

    async function handleUpdateQuantidade(id:number, quantidade:number) 
    {
        await updateStockItem(id, { quantidade });

        setStockData((prev) =>
            prev.map((item) => 
            item.id === id ? { ...item, quantidade} : item
            )
        );
    }

    async function handleAdd(item: IngredientesStockTabela) 
    {
        const saved = await addStockItem(item);
        setStockData(prev => [...prev, saved]);

    }

    const stockColumns = 
    [

        { key: "nome", label: "Nome" },
        { key: "marca", label: "Marca" },
        { key: "quantidade", label: "Quantidade",
                render: (row: IngredientesStockTabela) => ( // ver no lado da modal form como fazer onAdded(item);
            <Contador
                value={Number(row.quantidade)}
                onChange={(int) => handleUpdateQuantidade(row.id, int)}
            />
            )
        },
        { key: "unidade", label: "Unidade" },
        { key: "dataAbertura", label: "Data Abertura" },
        { key: "dataValidade", label: "Data Validade" },

    ];

    return (

         <div className="w-full min-h-full flex flex-col p-3 sm:p-6">

            <h1 className="text-2xl sm:text-3xl md:text-4xl text-center font-bold mb-6">
                Stock   
            </h1>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">

                <BackButton />

                <BotaoAdicionar 
                        title="Adicionar ingrediente ao Stock" 
                        modalComponent={StockFormulario} 
                        buttonLabel="Adicionar" 
                        onAdded={handleAdd}      
                />

            </div>

            <Tabela 
                data={stockData} 
                columns={stockColumns} 
                rowKey={(i) => i.id} 
            />

        </div>
    );
}



