 //MOCK DATA
import sustImg from "../assets/images/reports/sustentabilidade.png";
import ingImg from "../assets/images/reports/ingredients.png";
import espetadaImg from "../assets/images/dishes/espetada.png";
import picadoVacaImg from "../assets/images/dishes/picado.jpg";
import francesinhaImg from "../assets/images/dishes/francesinha.jpg";
import bifanaImg from "../assets/images/dishes/bifana.jpg";
import carneVinhaAlhosImg from "../assets/images/dishes/carne_vinho_alhos.jpg";
import espargueteBoloImg from "../assets/images/dishes/bolonhesa.jpg";

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
    {
        id: 1,
        name: "Espetada",
        ingredients: ["Carne", "Sal", "Alho", "Louro"],
        image: espetadaImg,
        available: true,
    },
    {
        id: 2,
        name: "Picado de Vaca",
        ingredients: ["Carne", "Alho", "Louro", "Molho com manteiga", "Cerveja", "Batata frita"],
        image: picadoVacaImg,
        available: true,
    },
    {
        id: 3,
        name: "Francesinha",
        ingredients: ["Bife", "Salsicha", "Pão", "Ovo", "Queijo", "Molho especial", "Linguiça", "Sal"],
        image: francesinhaImg,
        available: false,
    },
    {
        id: 4,
        name: "Carne Vinha de Alhos",
        ingredients: ["Carne", "Sal", "Alho", "Vinho", "Viagre", "Salsa", "Batata cozida"],
        image: carneVinhaAlhosImg,
        available: true,
    },
    {
        id: 5,
        name: "Bifana",
        ingredients: ["Carne", "Alho", "Arroz", "Batata frita", "Molho da casa"],
        image: bifanaImg,
        available: true,
    },
    {
        id: 6,
        name: "Esparguete à Bolonhesa",
        ingredients: ["Carne moída", "Chouriço", "Bacon", "Tomate", "Esparguete"],
        image: espargueteBoloImg,
        available: false,
    },
];


