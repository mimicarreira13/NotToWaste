import api from "./api";

export type PratoIngrediente = {
    nome: string;
    quantidade: number;
    custo: number;
};

export type Prato = {
    id: string;
    nome: string;
    descricao?: string | null;
    disponivel?: boolean;
    preco?: number;
    pratoIngredientes?: PratoIngrediente[] | null;
    caminhoImagem?: string | null;
};

export async function getDishes(): Promise<Prato[]> {
    const resp = await api.get("/api/Prato");
    return resp.data.objeto as Prato[];
}
