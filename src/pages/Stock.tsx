
import stockDataJSON from "../tmp/dataStock.json";
import { Tabela } from "../components/Tabelas/CriarTabela";
import type { Column } from "../components/Tabelas/CriarTabela";
import BotaoAdicionar from "../components/BotaoAdicionar";
import StockFormulario from "../components/forms/StockFormulario";
import BackButton from "../components/Back.tsx";
import Contador from "../components/Contador.tsx";

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
    { key: "quantidade", label: "Quantidade",
            render: (row, updateRow) => (
          <Contador
            value={Number(row.quantidade)}
            onChange={(int) => updateRow({ quantidade: String(int) })}
          />
        )
    },
    { key: "unidade", label: "Unidade" },
    { key: "dataAbertura", label: "Data Abertura" },
    { key: "dataValidade", label: "Data Validade" },

];

export default function StockPage() {

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



