import api from "./api";

type atualizarquantidade = {
  quantidade: number;
};

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


export async function updateStockQuantidadeItem(id: string, quantidade: number) 
{
    const body: atualizarquantidade = { quantidade };
    console.log("PUT quantidade →", id, body);
    const res = await api.put(`/api/Ingrediente/${id}/atualizar-quantidade`,
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