// api/useIngredients.ts
import { useState, useEffect } from "react";
import api from "./api.ts"; // Adjust the path as needed

type Ingredient = {
    id: string;
    nome: string;
    quantidade: number;
    caminhoImagem: string | null;
    custo: number;
    dataValidade: string | null;
    unidade: number;
};

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
            } catch (err: any) {
                console.error("Error fetching ingredients:", err);
                setError(err.message || "Failed to fetch ingredients");
            } finally {
                setLoading(false);
            }
        };

        fetchIngredients();
    }, []);

    // Helper function to get options for select
    const getOptions = (): IngredientOption[] => {
        return ingredients.map(ing => ({
            id: ing.id,
            name: ing.nome,
            type: unidade(ing.unidade)
        }));
    };

    // Helper function to get ingredient by ID
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