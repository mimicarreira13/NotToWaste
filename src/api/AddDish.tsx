// api/AddDish.tsx
import { useState, type ChangeEvent, forwardRef, useImperativeHandle } from "react";
import api from "./api.ts";
import { useIngredients } from "./useIngredients.ts";

interface DishFormData {
    nome: string;
    preco: number;
    descricao: string;
    pratoIngredientes: Array<{
        ingredienteId: string;
        quantidade: number;
    }>;
}

interface IngredientQuantity {
    [key: string]: number;
}

interface DishesProps {
    selectedIds?: string[];
    onChange: (ids: string[]) => void;
    onClose?: () => void;
}

export interface DishesHandle {
    handleSubmit: () => Promise<void>;
}

export const Dishes = forwardRef<DishesHandle, DishesProps>(({
                                                                 selectedIds = [],
                                                                 onChange,
                                                                 onClose
                                                             }, ref) => {
    const { getOptions, loading } = useIngredients();
    const options = getOptions();

    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState<number>(0);
    const [descricao, setDescricao] = useState("");
    const [imagem, setImagem] = useState<File | null>(null);
    const [ingredientQuantities, setIngredientQuantities] = useState<IngredientQuantity>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleCheckboxChange = (ingredientId: string) => {
        const newSelected = selectedIds.includes(ingredientId)
            ? selectedIds.filter(id => id !== ingredientId)
            : [...selectedIds, ingredientId];

        onChange(newSelected);

        if (selectedIds.includes(ingredientId)) {
            setIngredientQuantities(prev => {
                const newQuantities = { ...prev };
                delete newQuantities[ingredientId];
                return newQuantities;
            });
        }
    };

    const handleQuantityChange = (ingredientId: string, value: string) => {
        const numValue = parseFloat(value) || 0;
        setIngredientQuantities(prev => ({
            ...prev,
            [ingredientId]: numValue
        }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setImagem(file);
    };

    const validateForm = (): boolean => {
        if (!nome.trim()) {
            setSubmitError("O nome do prato é obrigatório");
            return false;
        }
        if (preco <= 0) {
            setSubmitError("O preço deve ser maior que zero");
            return false;
        }
        if (selectedIds.length === 0) {
            setSubmitError("Selecione pelo menos um ingrediente");
            return false;
        }

        const hasInvalidQuantities = selectedIds.some(id => {
            const quantity = ingredientQuantities[id] || 0;
            return quantity <= 0;
        });

        if (hasInvalidQuantities) {
            setSubmitError("Todos os ingredientes selecionados devem ter uma quantidade válida (maior que 0)");
            return false;
        }

        return true;
    };

    const handleSubmit = async () => {
        setSubmitError(null);

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const dishData: DishFormData = {
                nome: nome.trim(),
                preco: preco,
                descricao: descricao.trim() || "Sem descrição",
                pratoIngredientes: selectedIds.map(id => ({
                    ingredienteId: id,
                    quantidade: ingredientQuantities[id] || 1
                }))
            };

            console.log("Submitting dish data:", dishData);

            const createResponse = await api.post("/api/Prato", dishData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: 15000
            });

            if (!createResponse.data.exito) {
                throw new Error(createResponse.data.mensagem || "Falha ao criar prato");
            }

            const newDishId = createResponse.data.objeto?.id;
            console.log("Dish created successfully, ID:", newDishId);

            if (imagem && newDishId) {
                try {
                    const formData = new FormData();
                    formData.append("imagem", imagem);

                    await api.post(`/api/Prato/${newDishId}/imagem`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        timeout: 30000
                    });

                    console.log("Image uploaded successfully");
                } catch (imageError: any) {
                    console.warn("Image upload failed, but dish was created:", imageError);
                }
            }

            setSubmitSuccess(true);

            setNome("");
            setPreco(0);
            setDescricao("");
            setImagem(null);
            onChange([]);
            setIngredientQuantities({});

            setTimeout(() => {
                if (onClose) onClose();
            }, 2000);

        } catch (error: any) {
            console.error("Error creating dish:", error);

            let errorMessage = "Falha ao criar prato";
            if (error.response?.data?.mensagem) {
                errorMessage = error.response.data.mensagem;
            } else if (error.message) {
                errorMessage = error.message;
            }

            setSubmitError(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    useImperativeHandle(ref, () => ({
        handleSubmit
    }));

    if (loading) {
        return <div>Carregando ingredientes...</div>;
    }

    return (
        <>
            <div className={"flex flex-row gap-2"}>
                <div className={"w-1/2 flex flex-col"}>
                    <div className={"h-[80%] flex justify-between items-center mb-4"}>
                        <div className="flex-1">
                            <label className="block mb-1">Nome:</label>
                            <input
                                id="name"
                                className={"bg-white rounded-[15px] p-[5px] ml-[15px] w-[90%]"}
                                placeholder={"Insira o nome"}
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>

                    <div className={"h-[80%] flex justify-between items-center mb-4"}>
                        <div className="flex-1">
                            <label className="block mb-1">Descrição:</label>
                            <textarea
                                className={"bg-white rounded-[15px] p-[5px] ml-[15px] w-[90%] min-h-[100px] resize-none"}
                                placeholder={"Insira a descrição"}
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>

                    <div className={"h-[80%] flex justify-between items-center mb-4"}>
                        <div className="flex-1">
                            <label className="block mb-1">Preço (€):</label>
                            <input
                                id="price"
                                type="number"
                                step="0.01"
                                min="0"
                                className={"bg-white rounded-[15px] p-[5px] ml-[15px] w-[90%]"}
                                placeholder={"0.00"}
                                value={preco || ""}
                                onChange={(e) => setPreco(parseFloat(e.target.value) || 0)}
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>

                    <div className={"h-[80%] flex justify-between items-center"}>
                        <div className="flex-1">
                            <label className="block mb-1">Imagem:</label>
                            <input
                                type="file"
                                className={"ml-[15px] w-[90%]"}
                                accept="image/*"
                                onChange={handleFileChange}
                                disabled={isSubmitting}
                            />
                            {imagem && (
                                <div className="text-sm text-gray-600 mt-1 ml-[15px]">
                                    {imagem.name} ({(imagem.size / 1024).toFixed(0)} KB)
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className={"w-1/2"}>
                    <div className="space-y-2">
                        <label className="block font-medium">Ingredientes:</label>
                        <div className="max-h-60 overflow-y-auto border rounded p-2">
                            {options.length === 0 ? (
                                <div className="text-center py-2 text-gray-500">
                                    Nenhum ingrediente disponível
                                </div>
                            ) : (
                                options.map(option => {
                                    const isSelected = selectedIds.includes(option.id);
                                    const quantity = ingredientQuantities[option.id] || 0;

                                    return (
                                        <div key={option.id} className="flex items-center space-x-2 p-1 flex-row border-b last:border-b-0">
                                            <div className="w-1/2 flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id={`${option.id}`}
                                                    checked={isSelected}
                                                    onChange={() => handleCheckboxChange(option.id)}
                                                    className="rounded"
                                                    disabled={isSubmitting}
                                                />
                                                <label htmlFor={`${option.id}`} className="cursor-pointer text-[20px] ml-2">
                                                    {option.name}
                                                </label>
                                            </div>
                                            <div className="w-1/2">
                                                {isSelected ? (
                                                    <div className="flex items-center space-x-2">
                                                        <input
                                                            id={`qty-${option.id}`}
                                                            className={"bg-white rounded-[5px] p-[5px] text-[15px] w-20"}
                                                            type="number"
                                                            min="0.1"
                                                            step="0.1"
                                                            value={quantity || ""}
                                                            onChange={(e) => handleQuantityChange(option.id, e.target.value)}
                                                            placeholder="Qtd"
                                                            disabled={isSubmitting}
                                                        />
                                                        <span className="text-sm text-gray-600">{option.type}</span>
                                                    </div>
                                                ) : null}
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                        <p className="text-sm text-gray-500">
                            Selecionados: {selectedIds.length} ingrediente(s)
                        </p>
                    </div>

                    {selectedIds.length > 0 && (
                        <div className="mt-4 p-2 bg-gray-50 rounded">
                            <h4 className="font-medium mb-2">Resumo:</h4>
                            <div className="text-sm">
                                {selectedIds.map(id => {
                                    const ingredient = options.find(opt => opt.id === id);
                                    const quantity = ingredientQuantities[id] || 0;
                                    return (
                                        <div key={id} className="flex justify-between">
                                            <span>{ingredient?.name}</span>
                                            <span>{quantity} {ingredient?.type}</span>
                                        </div>
                                    );
                                })}
                                <div className="flex justify-between font-medium mt-1 border-t pt-1">
                                    <span>Total do prato:</span>
                                    <span>{preco.toFixed(2)}€</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Submit feedback */}
            <div className="mt-4">
                {submitError && (
                    <div className="text-red-600 bg-red-50 p-2 rounded mb-2">
                        {submitError}
                    </div>
                )}

                {submitSuccess && (
                    <div className="text-green-600 bg-green-50 p-2 rounded mb-2">
                         Prato criado com sucesso! Redirecionando...
                    </div>
                )}

                {isSubmitting && (
                    <div className="text-blue-600 bg-blue-50 p-2 rounded mb-2">
                        A criar prato...
                    </div>
                )}
            </div>
        </>
    );
});