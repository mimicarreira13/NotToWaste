import sustImg from "../assets/images/reports/sustentabilidade.png";
import ingImg from "../assets/images/reports/ingredients.png";

export type SustainabilityReport = {
    id: number;
    year: number;
    image: string;
};

export type IngredientItem = {
    id: number;
    month: string;
    year: number;
    image: string;
};

export type DishItem = {
    id: number;
    image?: string;
    available?: boolean;
};

export const sustainabilityReports: SustainabilityReport[] = [
    { id: 1, year: 2024, image: sustImg },
    { id: 2, year: 2023, image: sustImg },
    { id: 3, year: 2022, image: sustImg },
    { id: 4, year: 2021, image: sustImg }
];

export const ingredientItems: IngredientItem[] = [
    { id: 1, month: "Janeiro", year: 2025,image: ingImg },
    { id: 2, month: "Fevereiro", year: 2025,image: ingImg },
    { id: 3, month: "Março", year: 2025, image: ingImg },
    { id: 4, month: "Abril", year: 2025, image: ingImg },
    { id: 5, month: "Maio", year: 2025, image: ingImg },
    { id: 6, month: "Junho", year: 2025, image: ingImg },
    { id: 7, month: "Julho", year: 2025, image: ingImg },
    { id: 8, month: "Agosto", year: 2025, image: ingImg },
    { id: 9, month: "Setembro", year: 2025, image: ingImg },
    { id: 11, month: "Outubro", year: 2025, image: ingImg },
    { id: 12, month: "Janeiro", year: 2024, image: ingImg },
    { id: 13, month: "Fevereiro", year: 2024, image: ingImg },
    { id: 14, month: "Março", year: 2024, image: ingImg },
    { id: 15, month: "Abril", year: 2024, image: ingImg },
    { id: 16, month: "Maio", year: 2024, image: ingImg },
    { id: 17, month: "Junho", year: 2024, image: ingImg },
    { id: 18, month: "Julho", year: 2024, image: ingImg },
    { id: 19, month: "Agosto", year: 2024, image: ingImg },
    { id: 20, month: "Setembro", year: 2024, image: ingImg },
    { id: 21, month: "Outubro", year: 2024, image: ingImg },
    { id: 22, month: "Novembro", year: 2024, image: ingImg },
    { id: 23, month: "Dezembro", year: 2024, image: ingImg }
];

export const dishes: DishItem[] = [
    // deixado vazio por enquanto
];