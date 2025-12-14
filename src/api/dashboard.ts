import api from "./api";

export type RankingItem = {
    ingredienteId: string;
    nome: string;
    quantidadeDesperdicada: number;
    custoDesperdicio: number;
    percentagemDesperdicio: number;
    caminhoImagem: string | null;
};

export type NotificacaoIngrediente = {
    stockId: string;
    data: string;
    ativo: boolean;
    ingredienteId: string;
    nomeIngrediente: string;
    diasParaExpirar: number;
    pratosRelacionados: string[];
};

export async function getPontuacaoSustentabilidade() {
    const response = await api.get("/api/Dashboard/pontuacao-sustentabilidade");
    return response.data.objeto;
}

export async function getRankingDesperdicio(): Promise<RankingItem[]> {
    const resp = await api.get("/api/Dashboard/top3-desperdicados-mes");
    return resp.data.objeto as RankingItem[];
}

export async function getNotificacoesIngredientesProximosValidade(): Promise<NotificacaoIngrediente[]> {
    const resp = await api.get("/api/Notificacoes/ingredientes");
    console.log("dashboard", resp.data);
    return resp.data.objeto as NotificacaoIngrediente[];
}

export async function changeNumberDefinicoes(dias:number){
    const resp = await api.put("/api/Notificacoes/configuracao/dias" , {dias});
    return resp.data.objeto as {id: string, dias:number};
}
