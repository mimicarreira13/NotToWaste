
import { useEffect, useState } from "react";
//import stockDataJSON from "../tmp/dataStock.json";
import { Tabela } from "../components/Tabelas/CriarTabela";
import type { Column } from "../components/Tabelas/CriarTabela";
import BotaoAdicionar from "../components/BotaoAdicionar";
import StockFormulario from "../components/forms/StockFormulario";
import BackButton from "../components/Back.tsx";
import Contador from "../components/Contador.tsx";
import { getStock, addStockItem, updateStockItem } from "../api/stock.ts";


export type UpdateQuantidadeRequest = {
  quantidade: number;
};

export type ItemStock = {

    id: string;
    nome: string;
    marca: string;
    quantidade: number;
    unidade: number; 
    custo: number;
    dataValidade: string;

    //imAGEM
    
}
export type CriarItemStock = {
    nome: string;
    marca: string;
    quantidade: number;
    unidade: number; 
    custo: number;
    dataValidade: string;
}


export default function StockPage() 
{

    
    const [stockData, setStockData] = useState<ItemStock[]>([]);

    useEffect(() => 
    {
        async function load() {
            const data = await getStock();
            console.log("Página Stock - stock: " , data);
            setStockData(data);
        }   
        load();
    }, []);

    async function handleUpdateQuantidade(id:string, quantidade:number) 
    {
        if (quantidade < 1) return;
        
        setStockData((prev) =>
            prev.map((item) => 
            item.id === id ? { ...item, quantidade} : item
            )
        );

        try{
             await updateStockItem(id, { quantidade });
        } catch (error) {
            console.error("Erro ao atualizar quantidade na página stock:", error);
             setStockData(prev =>
                prev.map(item =>
                    item.id === id ? { ...item, quantidade: item.quantidade } : item
                )
            );
        }
    }

    async function handleAdd(item: ItemStock) 
    {
        if (!item) return; 
        console.log("Item recebido no handleAdd:", item);
        setStockData(prev => [...prev, item]);

    }

    function unidadeToLabel(unidade: number) {
        switch (unidade) {
            case 1:
            return "Unidade";
            case 2:
            return "Quilo";
            case 3:
            return "Litro";
            default:
            return "-";
        }
    }

    const stockColumns : Column<ItemStock>[] =  
    [

        { key: "nome", label: "Nome" },
        { key: "quantidade", label: "Quantidade",
                render: (row: ItemStock) => ( // ver no lado da modal form como fazer onAdded(item);
            <Contador
                value={Number(row.quantidade)}
                onChange={(int) => handleUpdateQuantidade(row.id, int)}
            />
            )
        },
        { key: "unidade", label: "Unidade",  render: (row) => unidadeToLabel(row.unidade), },
        { key: "custo", label: "Custo"},
        { key: "dataValidade", label: "Data Validade",  render: (row) =>
            row.dataValidade
            ? row.dataValidade.split("T")[0]
            : "-"  },

    ];

    return (

         <div className="w-full min-h-full flex flex-col p-3 sm:p-6">


            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 pt-16">

                <BackButton />

                <h1 className="text-2xl sm:text-3xl md:text-4xl text-center font-bold mb-6">
                    Stock   
                </h1>

                <BotaoAdicionar 
                    title="Adicionar ingrediente ao Stock" 
                    modalComponent={StockFormulario} 
                    buttonLabel="Adicionar" 
                    onAdded={handleAdd}      
                />

            </div>

            <div className="flex-1 overflow-y-auto max-h-[50vh]">
                <Tabela 
                    data={stockData} 
                    columns={stockColumns} 
                    rowKey={(i) => i.id} 
                />
            </div>

        </div>
    );
}



