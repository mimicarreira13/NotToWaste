import api from "./api";

type atualizarquantidade = {
  quantidade: number;
};

export async function getDesperdicio() {
    const response = await api.get("/api/SaidaStock");
    const todos = response.data.objeto;
    const desperdicio = todos.filter((item: any) => item.tipoSaida === 2);
    return desperdicio;
}

export async function addDesperdicioItem(item: any) {
  const res = await api.post("/api/SaidaStock", item);

  console.log("Resposta raw da API:", res);

  if (!res) throw new Error("Erro ao adicionar");
    return res.data;
}

export async function updateDesperdicioItem(id: number, item: {
    quantidade: number;
}) {
    const response = await api.put(`/api/SaidaStock/${id}`, item);
    return response.data; 
}

export async function getIngredientes() {
  const response = await api.get("/api/Ingrediente");
  return response.data.objeto; 
}

export async function updateDesperdicioQuantidadeItem(id: string, quantidade: number) 
{
    const body: atualizarquantidade = { quantidade };
    console.log("PUT quantidade →", id, body);
    const res = await api.put(`/api/SaidaStock/${id}/atualizar-quantidade`,
        body,
        {
        headers: {
            "Content-Type": "application/json",
        },
        }
    );

    console.log("Resposta backend:", res.data);
    return res.data;
}