import api from "./api";

export async function getStock() {
    const response = await api.get("/api/Ingrediente");
    console.log("Stock Api , get stock", response.data.objeto);
    return response.data.objeto;
}
/*
export async function addStockItem(item: {
    id: string;
    nome: string;
    quantidade: number;
    unidade: number;
    custo: number;
    dataValidade: string;
}) {
    const response = await api.post("/api/Ingrediente", item);
    return response.data;
}*/
export async function addStockItem(item: any) {
  const res = await api.post("/api/Ingredientes", item);
  /*await fetch("/api/SaidaStock", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });*/

  console.log("Resposta raw da API:", res);

  if (!res) throw new Error("Erro ao adicionar");
    return res.data;
}


export async function updateStockItem(id: string, item: {
    quantidade: number;
}) {
    const response = await api.put(`/api/EntradaStock/${id}`, item);
    return response.data;
}