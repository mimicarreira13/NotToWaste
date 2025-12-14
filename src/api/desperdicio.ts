import api from "./api";

export async function getDesperdicio() {
    const response = await api.get("/api/SaidaStock");
    //console.log("Desperdicio Api , get desperdicio", response.data.objeto);
    return response.data.objeto;
}

export async function addDesperdicioItem(item: {
    id: string;
    ingredienteId: string;
    descricao: string;
    //motivo: string;
    quantidade: number; 
    
}) {
    const response = await api.post("/api/SaidaStock", item);
    return response.data;
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