import api from "./api";

export type PratoIngrediente = {
    pratoId: string;
    prato?: string | null;
    ingredienteId: string;
    ingrediente?: string | null;
    quantidade: number;
    id: string;
    dataCriacao?: string;
    deletado?: boolean;
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