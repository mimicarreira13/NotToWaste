import api from "./api";

export type RankingItem = {
    ingredienteId: string;
    nome: string;
    quantidadeDesperdicada: number;
    custoDesperdicio: number;
    percentagemDesperdicio: number;
    caminhoImagem: string | null;
};

export type NotificacaoIngrediente={
    id:string;
    data:string;
    mensagem:string;
    ativo:boolean;
    ingredienteId:string;
}

export async function getPontuacaoSustentabilidade() {
    const response = await api.get("/api/Dashboard/pontuacao-sustentabilidade");
    return response.data.objeto;
}

export async function getRankingDesperdicio(): Promise<RankingItem[]> {
    const resp = await api.get("/api/Dashboard/top3-desperdicados-mes");
    return resp.data.objeto as RankingItem[];
}

export async function getNotificacoesIngredientesProximosValidade(dias: number): Promise<NotificacaoIngrediente[]> {
    const resp = await api.get(`/api/Notificacoes/GetNotificacoes/${dias}`);
    return resp.data.objeto as NotificacaoIngrediente[];
}
