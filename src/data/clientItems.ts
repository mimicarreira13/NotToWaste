// File: src/data/clientItems.ts
export type ApiIngredientYearsMonths = Record<number, string[]>;
export type ApiSustainabilityYears = number[];

export type SustainabilityReport = {
    id: number;
    year: number;
    image: string;
};

export type IngredientItem = {
    id: number;
    month: string;
    monthNumber?: number; // precomputed 1-12 from API month name
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