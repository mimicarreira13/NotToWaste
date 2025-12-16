import api from "./api";

export async function getDesperdicio() {
    const response = await api.get("/api/SaidaStock");
    const todos = response.data.objeto;
    const desperdicio = todos.filter((item: any) => item.tipoSaida === 2);
    return desperdicio;
}

/*export async function addDesperdicioItem(item: CriarItemDesperdicio) {
    const response = await api.post("/api/SaidaStock", item);
     if (!response.data?.exito) {
    throw new Error(response.data?.mensagem ?? "Erro desconhecido");
    }
    return response.data.objeto;
}*/
export async function addDesperdicioItem(item: any) {
  const res = await api.post("/api/SaidaStock", item);
  /*await fetch("/api/SaidaStock", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });*/

  console.log("Resposta raw da API:", res);

  if (!res) throw new Error("Erro ao adicionar");
    return res.data;
}

export async function updateDesperdicioItem(id: number, item: {
    quantidade: number;
}) {
    const response = await api.put(`/api/SaidaStock/${id}`, item);
    return response.data; //dar o return com o objeto tbm?
}

export async function getIngredientes() {
  const response = await api.get("/api/Ingrediente");
  return response.data.objeto; 
}