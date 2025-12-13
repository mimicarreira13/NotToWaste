// api/AddDish.tsx
import {useState, type ChangeEvent, forwardRef, useImperativeHandle, useEffect} from "react";
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
    isEdit?: boolean;
    dishData?: {
        id?: string;
        nome?: string;
        preco?: number;
        descricao?: string;
        pratoIngredientes?: Array<{
            ingredienteId: string;
            quantidade: number;
        }>;
        imagem?: string;
    };
}

export interface DishesHandle {
    handleSubmit: () => Promise<void>;
    handleEdit: (dishId: string) => Promise<void>;
}


export const Dishes = forwardRef<DishesHandle, DishesProps>(({
                                                                 selectedIds = [],
                                                                 onChange,
                                                                 onClose,
                                                                 isEdit = false,
                                                                 dishData
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

    useEffect(() => {
        if (isEdit && dishData) {
            console.log("Initializing edit mode with dish data:", dishData);

            setNome(dishData.nome || "");
            setPreco(dishData.preco || 0);
            setDescricao(dishData.descricao || "");

            // Initialize selected ingredient IDs and quantities
            if (dishData.pratoIngredientes && dishData.pratoIngredientes.length > 0) {
                const ingredientIds = dishData.pratoIngredientes.map(ing => ing.ingredienteId);
                onChange(ingredientIds);

                // Initialize quantities
                const quantities: IngredientQuantity = {};
                dishData.pratoIngredientes.forEach(ing => {
                    quantities[ing.ingredienteId] = ing.quantidade;
                });
                setIngredientQuantities(quantities);
            }
        }
    }, [isEdit, dishData, onChange]);

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

    const validateImage = (file: File | null): string | null => {
        if (!file) return null; // No image is okay

        // Check file size (e.g., max 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        if (file.size > maxSize) {
            return "A imagem é muito grande. Tamanho máximo: 5MB";
        }

        // Check file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            return "Tipo de arquivo não suportado. Use JPEG, PNG, GIF ou WebP";
        }

        return null;
    };


    const handleSubmit = async () => {
        setSubmitError(null);

        if (!validateForm()) {
            return;
        }

        const imageError = validateImage(imagem);
        if (imageError) {
            setSubmitError(imageError);
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

            console.log("1. Submitting dish data:", dishData);
            console.log("2. Image file object:", imagem);
            console.log("3. Image file name:", imagem?.name);
            console.log("4. Image file size:", imagem?.size, "bytes");
            console.log("5. Image file type:", imagem?.type);

            const createResponse = await api.post("/api/Prato", dishData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: 15000
            });

            console.log("6. Create dish response:", createResponse);

            if (!createResponse.data.exito) {
                throw new Error(createResponse.data.mensagem || "Falha ao criar prato");
            }

            const newDishId = createResponse.data.objeto;
            console.log("7. Dish created successfully, ID:", newDishId);

            if (imagem && newDishId) {
                console.log("8. Attempting to upload image for dish ID:", newDishId);

                try {
                    const formData = new FormData();
                    formData.append("imagem", imagem);

                    // Check what's in formData
                    console.log("9. FormData contents:");
                    for (let [key, value] of formData.entries()) {
                        console.log(`  ${key}:`, value);
                    }

                    console.log("10. Making image upload request...");
                    const imageResponse = await api.post(`/api/Prato/${newDishId}/imagem`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        timeout: 30000
                    });

                    console.log("11. Image upload response:", imageResponse);
                    console.log("12. Image upload success:", imageResponse.data);

                } catch (imageError: any) {
                    console.error("13. Image upload failed:", imageError);
                    console.error("14. Image error status:", imageError.response?.status);
                    console.error("15. Image error data:", imageError.response?.data);
                    console.error("16. Image error message:", imageError.message);

                    // Check if it's a specific error
                    if (imageError.response) {
                        console.error("17. Full error response:", {
                            status: imageError.response.status,
                            statusText: imageError.response.statusText,
                            headers: imageError.response.headers,
                            data: imageError.response.data
                        });
                    }
                }
            } else {
                console.log("18. No image to upload or no dish ID available");
                console.log("19. Has image?", !!imagem);
                console.log("20. Has dish ID?", !!newDishId);
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
            console.error("21. Error in handleSubmit:", error);

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

    const handleEdit = async (dishId: string) => {
        setSubmitError(null);

        if (!validateForm()) {
            return;
        }

        if (!dishId) {
            setSubmitError("ID do prato não fornecido");
            return;
        }

        setIsSubmitting(true);

        try {
            // Prepare form data for the PUT request
            const formData = new FormData();

            // Add text fields
            formData.append('Nome', nome.trim());
            formData.append('Preco', preco.toString());
            formData.append('Descricao', descricao.trim() || "Sem descrição");

            // Format PratoIngredientes array
            const pratoIngredientes = selectedIds.map(id => ({
                ingredienteId: id,
                quantidade: ingredientQuantities[id] || 1
            }));
            formData.append('PratoIngredientes', JSON.stringify(pratoIngredientes));

            // Add image if selected
            if (imagem) {
                formData.append('imagem', imagem);
            }

            console.log("Editing dish with ID:", dishId);
            console.log("Form data:", {
                nome: nome.trim(),
                preco,
                descricao: descricao.trim() || "Sem descrição",
                pratoIngredientes,
                hasImage: !!imagem
            });

            // Make PUT request to edit dish
            const editResponse = await api.put(`/api/Prato/${dishId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                timeout: 30000
            });

            console.log("Edit response:", editResponse);

            if (!editResponse.data.exito) {
                throw new Error(editResponse.data.mensagem || "Falha ao editar prato");
            }

            setSubmitSuccess(true);

            // Reset form
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
            console.error("Error editing dish:", error);

            let errorMessage = "Falha ao editar prato";
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
        handleSubmit,
        handleEdit
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
                                id="dish-image-input" // Add ID for debugging
                            />
                            {imagem && (
                                <div className="text-sm text-gray-600 mt-1 ml-[15px]">
                                    Selecionado: {imagem.name} ({(imagem.size / 1024).toFixed(0)} KB)
                                    <br />
                                    Tipo: {imagem.type}
                                </div>
                            )}
                            {isEdit && dishData?.imagem && !imagem && (
                                <div className="text-sm text-gray-600 mt-1 ml-[15px]">
                                    Imagem atual: {dishData.imagem.substring(0, 30)}...
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
                        {isEdit ? "Prato editado com sucesso! Redirecionando..." : "Prato criado com sucesso! Redirecionando..."}
                    </div>
                )}

                {isSubmitting && (
                    <div className="text-blue-600 bg-blue-50 p-2 rounded mb-2">
                        {isEdit ? "A editar prato..." : "A criar prato..."}
                    </div>
                )}
            </div>
        </>
    );
});