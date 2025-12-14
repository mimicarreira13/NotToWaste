 //DTOs
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
     id: string | number;
     name: string;
     ingredients?: string[];
     image?: string;
     available?: boolean;
 };

