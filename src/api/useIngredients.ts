import { useState, useEffect } from "react";
import api from "./api.ts";
import { isAxiosError } from "axios";

type Ingredient = {
    id: string;
    nome: string;
    quantidade: number;
    caminhoImagem: string | null;
    custo: number;
    dataValidade: string | null;
    unidade: number;
};

interface ApiErrorResponse {
    exito?: boolean;
    mensagem?: string;
    errors?: Record<string, string[]>;
    [key: string]: unknown;
}

type Mensagem<T> = {
    exito: boolean;
    mensagem: string;
    objeto: T[];
};

type IngredientOption = {
    type: string;
    id: string;
    name: string;
};

export function extractErrorMessage(error: unknown): string {
    if (isAxiosError(error)) {
        if (error.response?.data && typeof error.response.data === 'object') {
            const data = error.response.data as ApiErrorResponse;
            return data.mensagem || error.message || "Erro desconhecido";
        }
        return error.message || "Erro de rede";
    }

    if (error instanceof Error) {
        return error.message;
    }

    if (typeof error === 'string') {
        return error;
    }

    return "Ocorreu um erro desconhecido";
}

function unidade(uni : number) {
    switch (uni) {
        case 1:
            return "Unidades";
        case 2:
            return "Kg";
        case 3:
            return "L";
        default:
            return uni.toString();
    }
}

export function useIngredients() {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                setLoading(true);
                const response = await api.get<Mensagem<Ingredient>>("/api/Ingrediente", {
                    timeout: 10000
                });

                if (response.data.exito && response.data.objeto) {
                    setIngredients(response.data.objeto);
                } else {
                    setError(response.data.mensagem || "Failed to fetch ingredients");
                }
            } catch (err: unknown) {
                console.error("Error fetching ingredients:", err);
                const errorMessage = extractErrorMessage(err);
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        fetchIngredients();
    }, []);

    const getOptions = (): IngredientOption[] => {
        return ingredients.map(ing => ({
            id: ing.id,
            name: ing.nome,
            type: unidade(ing.unidade)
        }));
    };

    const getIngredientById = (id: string): Ingredient | undefined => {
        return ingredients.find(ing => ing.id === id);
    };

    return {
        ingredients,
        loading,
        error,
        getOptions,
        getIngredientById
    };
}