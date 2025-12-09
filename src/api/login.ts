import api from "./api";

export type LoginResponse = {
    exito: boolean;
    mensagem: string;
    objeto?: string;
};

export type User = {
    id: string;
    nome: string;
    email: string;
    dataCriacao?: string;
    tipoUtilizadorId?: string;
};

export type UserType = {
    id: string;
    nome: string;
    descricao?: string;
};

type JwtPayload = Record<string, unknown>;

function base64UrlToBase64(input: string): string {
    let base64 = input.replace(/-/g, "+").replace(/_/g, "/");
    const pad = base64.length % 4;
    if (pad === 2) base64 += "==";
    else if (pad === 3) base64 += "=";
    else if (pad === 1) return "";
    return base64;
}

export function decodeToken(token: string): JwtPayload | null {
    try {
        const parts = token.split(".");
        if (parts.length < 2) return null;
        const base64 = base64UrlToBase64(parts[1]);
        if (!base64) return null;
        const binary = atob(base64);
        const json = decodeURIComponent(
            [...binary]
                .map((c: string) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                .join("")
        );
        return JSON.parse(json) as JwtPayload;
    } catch {
        return null;
    }
}

export async function login(email: string, password: string): Promise<LoginResponse> {
    const resp = await api.post("/api/Autenticacao/Login", { email, password });
    const token = resp.data.objeto as string | undefined;
    if (token && typeof window !== "undefined") {
        // guarda token e atualiza header global para chamadas subsequentes
        localStorage.setItem("authToken", token);
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    return resp.data as LoginResponse;
}

// usa o token presente no header Authorization para obter o utilizador atual
export async function getCurrentUser(): Promise<User> {
    const resp = await api.get("/api/Utilizador/GetById");
    // backend devolve wrapper { exito, mensagem, objeto }
    return resp.data.objeto as User;
}

export async function getUserTypeById(id: string): Promise<UserType> {
    const resp = await api.get(`/api/TipoUtilizador/GetById?id=${encodeURIComponent(id)}`);
    return resp.data.objeto as UserType;
}