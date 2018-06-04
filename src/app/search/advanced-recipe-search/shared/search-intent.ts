export interface IngredentSearch {
    name: string;
    include: boolean;
}

export interface SearchIntent {
    name?: string;
    genre?: string;
    rating?: number;
    totalTime?: number;
    ingredients?: IngredentSearch[];
}

