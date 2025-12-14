import React, { useEffect, useState } from "react";
import desperdicioDataJSON from "../tmp/dataDesperdicio.json";
import { Tabela } from "../components/Tabelas/CriarTabela";
import type { Column } from "../components/Tabelas/CriarTabela";
import BotaoAdicionar from "../components/BotaoAdicionar";
import DesperdicioFormulario from "../components/forms/DesperdicioFormulario";
import BackButton from "../components/Back.tsx";
import Contador from "../components/Contador.tsx";
import { getDesperdicio, addDesperdicioItem, updateDesperdicioItem, getIngredientes } from "../api/desperdicio.ts";

export type ItemDesperdicio = {

    id: string;
    ingredienteId: string;
    descricao: string;
    quantidade: number;
    dataMovimento?: string;
}
type Ingrediente = {
  id: string;
  nome: string;
}
    
//const desperdicioData = desperdicioDataJSON as ItemDesperdicio[];


export default function Desperdicio() {

    const [desperdicioData, setDesperdicioData] = useState<ItemDesperdicio[]>([]);
    const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);
    useEffect(() => {
        async function load() {
            const [desperdicio, ingredientesResp] = await Promise.all([
                getDesperdicio(),
                getIngredientes(),
            ]);

            console.log( "Página desperdicio - desperdicio: " , desperdicio);
            console.log( "Página desperdicio - ingredientes: " , ingredientesResp);

            setDesperdicioData(desperdicio);
            setIngredientes(ingredientesResp);
            
            
        }
        load();
    }, []);

    const ingredientesMap = React.useMemo(() => {
        const map: Record<string, string> = {};
        ingredientes.forEach(i => {
            map[i.id] = i.nome;
        });
        return map;
    }, [ingredientes]);

    async function handleAdd(item: ItemDesperdicio) 
    {
        const saved = await addDesperdicioItem(item);
        setDesperdicioData(prev => [...prev, saved]);
    }

    async function handleUpdateQuantidade(id: string, quantidade: number) 
    {
        //await updateDesperdicioItem(id, { quantidade });  // chamada a api falta ter no backend

        setDesperdicioData(prev =>
            prev.map(item =>
                item.id === id ? { ...item, quantidade } : item
            )
        );
    }

    const desperdicioColumns: Column<ItemDesperdicio>[] = 
    [
        { key: "ingredienteId", label: "Nome", render: (row) =>
            ingredientesMap[row.ingredienteId] ?? "—" 
        }, //select endoreço api ingredientes get 
        { key: "descricao", label: "Motivo" }, //select
        { key: "quantidade", label: "Quantidade",
            render: (row) => (
                <Contador
                    value={row.quantidade}
                    onChange={(int) => handleUpdateQuantidade(row.id, int)}
                />
            )
        },
        { key: "dataMovimento", label: "Data de Registo",  render: (row) =>
            row.dataMovimento
            ? row.dataMovimento.split("T")[0]
            : "-" 
        },

    ];

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
                onAdded={handleAdd} 
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

