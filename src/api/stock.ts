import api from "./api";

export async function getStock() {
    const response = await api.get("/api/Ingrediente");
    return response.data.objeto;
}

export async function addStockItem(item: {
    id: number;
    nome: string;
    marca: string;  
    quantidade: number;
    unidade: string;
    dataAbertura: string;
    dataValidade: string;
}) {
    const response = await api.post("/api/Ingrediente", item);
    return response.data;
}


export async function updateStockItem(id: number, item: {
    quantidade: number;
}) {
    const response = await api.put(`/api/EntradaStock/${id}`, item);
    return response.data;
}