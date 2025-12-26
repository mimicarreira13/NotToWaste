import React, { useEffect, useState } from "react";
import { Tabela } from "../components/Tabelas/CriarTabela";
import type { Column } from "../components/Tabelas/CriarTabela";
import BotaoAdicionar from "../components/BotaoAdicionar";
import DesperdicioFormulario from "../components/forms/DesperdicioFormulario";
import BackButton from "../components/Back.tsx";
import Contador from "../components/Contador.tsx";
import LoadingSpinner from "../components/LoadingSpinner";
import { getDesperdicio, /*addDesperdicioItem,*/ getIngredientes } from "../api/desperdicio.ts";

export type ItemDesperdicio = {
    id: string;
    ingredienteId: string;
    descricao: string;
    quantidade: number;
    unidadeIngrediente: number;
    dataMovimento?: string;
}

export type CriarItemDesperdicio = {
    ingredienteId: string;
    descricao: string;
    quantidade: number;
    unidadeIngrediente: number;
    utilizadorId: string;
}

type Ingrediente = {
  id: string;
  nome: string;
}
    
//const desperdicioData = desperdicioDataJSON as ItemDesperdicio[];


export default function Desperdicio() {

    const [desperdicioData, setDesperdicioData] = useState<ItemDesperdicio[]>([]);
    const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                const [desperdicio, ingredientesResp] = await Promise.all([
                    getDesperdicio(),
                    getIngredientes(),
                ]);

                console.log("Página desperdicio - desperdicio: ", desperdicio);
                console.log("Página desperdicio - ingredientes: ", ingredientesResp);

                setDesperdicioData(desperdicio);
                setIngredientes(ingredientesResp);
            } catch (err){
                console.error("Erro ao carregar desperdício:", err);
            } finally {
                setLoading(false);
            }
            
            
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
        if (!item) return; 
        console.log("Item recebido no handleAdd:", item);
        setDesperdicioData(prev => [...prev, item]);
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
        { key: "unidadeIngrediente", label: "Unidade",  render: (row) => unidadeToLabel(row.unidadeIngrediente) },
        { key: "dataMovimento", label: "Data de Registo",  render: (row) =>
            row.dataMovimento
            ? row.dataMovimento.split("T")[0]
            : "-" 
        },

    ];

    if (loading) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center">
                <LoadingSpinner message="Carregando Desperdicio..." size={72} ariaLabel="loading-waste" />
            </div>
        );
    }

    return (

        <div className="w-full min-h-full flex flex-col p-3 sm:p-6">   

            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 pt-16">
            
            
                <BackButton />

                <h1 className="text-2xl sm:text-3xl md:text-4xl text-center font-bold mb-6">
                    Desperdício
                </h1>

                <BotaoAdicionar 
                title="Adicionar ingrediente ao Desperdício" 
                modalComponent={DesperdicioFormulario} 
                buttonLabel="Adicionar" 
                onAdded={handleAdd} 
                />

            </div>

            <div className="flex-1 overflow-y-auto max-h-[50vh]">
                <Tabela 
                    data={desperdicioData} 
                    columns={desperdicioColumns} 
                    rowKey={(i) => i.id} 
                />
            </div>

        </div>
    );
}

