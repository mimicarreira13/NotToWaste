import api from "./api";
import { AxiosError } from "axios";

interface AddStockItemRequest {
    Nome: string;
    Marca: string;
    Quantidade: number;
    Custo: number;
    Unidade: number;
    DataValidade: string;
    //imagem?: string;
}

export async function getStock() {
    const response = await api.get("/api/Ingrediente");
    console.log("Stock Api , get stock", response.data.objeto);
    return response.data.objeto;
}


export async function addStockItem(item: {
    nome: string;
    marca: string;
    quantidade: number;
    unidade: number;
    custo: number;
    dataValidade: string;
    imagem?: File | null;
}) {
    const formData = new FormData();

    formData.append("Nome", item.nome);
    formData.append("Marca", item.marca);
    formData.append("Quantidade", String(item.quantidade));
    formData.append("Unidade", String(item.unidade));
    formData.append("Custo", String(item.custo));
    formData.append("DataValidade", item.dataValidade);

     if (item.imagem) {
        formData.append("Imagem", item.imagem);
    }

    const res = await api.post("/api/Ingrediente", formData, {
        headers: {
        "Content-Type": "multipart/form-data",
        },
    });

    return res.data;
}


export async function updateStockItem(id: string, item: {
    quantidade: number
}) {
    const res = await api.put(`/api/EntradaStock/${id}`, item,{ 
        headers: {
            "Content-Type": "application/json",
    },});
    return res.data;
}