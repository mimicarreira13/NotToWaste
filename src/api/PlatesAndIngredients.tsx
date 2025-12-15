import {useState, useEffect, useRef} from "react";
import api from "./api.ts";


type UnidadeMedida = 1 | 2 | 3; // 1=Unidades, 2=Kg, 3=L

interface ApiIngrediente {
    id: string;
    nome: string;
    quantidade: number;
    caminhoImagem: string;
    custo: number;
    dataValidade: string | null;
    unidade: UnidadeMedida;
}


type ApiResponse<T> = {
    exito: boolean;
    mensagem: string;
    objeto: T[];
}

type Mensagem<T = never> = ApiResponse<T>;

type ItemUI = {
    id: string;
    title: string;
    imageName: string;
    ingredients: string[];
    isIngredient: boolean;
}

type InfoProps = {
    type: string;
    id?: string;
    onData?: (data: ItemUI[]) => void;
};

export default function Info({type, id, onData} : InfoProps) {
    const [, setInfo] = useState<Mensagem | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const hasFetched = useRef(false);

    useEffect(() => {
        console.log(`Info component called with: type="${type}", id="${id}"`);
        console.log(`Making request to: /api/${type}${id ? "/" + id : ""}`);

        if (hasFetched.current) return;
        hasFetched.current = true;

        console.log(`Fetching ${type}${id ? "/" + id : ""}`);

        api.get<Mensagem>(`/api/${type}${id ? "/" + id : ""}`, { timeout: 10000 })
            .then(res => {
                console.log(`API Response for ${type}:`, res.data);
                setInfo(res.data);
                hasFetched.current = true;

                if (res.data.objeto && Array.isArray(res.data.objeto)) {
                    const converted = res.data.objeto.map(item => convertIngredientToItemUI(item));
                    console.log(`Converted ${converted.length} items`, converted);
                    onData?.(converted);
                } else {
                    console.warn("No objeto array in response");
                    onData?.([]);
                }
            })
            .catch(err => {
                console.error("API Error Details:", {
                    message: err.message,
                    code: err.code,
                    url: err.config?.url,
                    status: err.response?.status,
                    statusText: err.response?.statusText,
                    data: err.response?.data
                });

                if (err.response) {
                    console.error("Response error:", err.response.data);
                    if (err.response.status === 404) {
                        setError(`Endpoint não encontrado: ${err.config?.url}. Verifique se o endpoint está correto.`);
                    } else {
                        setError(`Erro ${err.response.status}: ${err.response.statusText}`);
                    }
                } else if (err.request) {
                    console.error("No response received");
                    setError("Sem resposta do servidor. Verifique sua conexão.");
                } else {
                    setError(`Falha ao carregar: ${err.message}`);
                }
                onData?.([]);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [type, id, onData]);

    useEffect(() => {
        return () => {
            hasFetched.current = false;
        };
    }, []);

    if (loading) return <div></div>;
    if (error) return <div>{error}</div>;

    return null;
}

function convertIngredientToItemUI(item: ApiIngrediente): ItemUI {
    return {
        id: item.id || "",
        title: item.nome || "Sem nome",
        imageName: item.caminhoImagem,
        ingredients: [],
        isIngredient: true
    };
}