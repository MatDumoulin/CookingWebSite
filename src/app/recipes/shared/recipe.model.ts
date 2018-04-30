import { IngredientSection } from './../ingredients/shared/ingredient-section.model';
import { StepSection } from './../steps/shared/step-section.model';

/*
 * Represents a Recipe document from the database.
 */
export class Recipe {
    static DEFAULT_IMAGE = '../../../assets/food-plate.png';
    _id?: string;
    name: string;
    ingredientSection: IngredientSection[];
    stepSection: StepSection[];
    rating: number;
    prepTime: number; // In minutes
    cookTime: number; // In minutes
    cooldownTime: number; // In minutes
    results: string;
    notes: string;
    genre: string;
    image: string;
    equipment: string[];
    fullImage?: string; // Contains the base64 encoded image.
    owner: string;
    tags: string[];


    // I'm using parameter overload since TypeScript doesn't support having more
    // than one constructor implementation.
    constructor(recipe?: Recipe) {
        // Default constructor
        if (recipe == null) {
            // _id is undefined.
            this.name = "";
            this.ingredientSection = [new IngredientSection()];
            this.stepSection = [new StepSection()];
            this.rating = 0;
            this.prepTime = null;
            this.cookTime = null;
            this.cooldownTime = null;
            this.results = "";
            this.notes = "";
            this.genre = "";
            this.image = "";
            this.equipment = [];
            this.fullImage = Recipe.DEFAULT_IMAGE;
            this.owner = null;
            this.tags = [];
        }
        // Copy constructor.
        else {
            this._id = recipe._id;
            this.name = recipe.name;
            this.ingredientSection = recipe.ingredientSection;
            this.stepSection = recipe.stepSection;
            this.rating = recipe.rating;
            this.prepTime = recipe.prepTime;
            this.cookTime = recipe.cookTime;
            this.cooldownTime = recipe.cooldownTime;
            this.results = recipe.results;
            this.notes = recipe.notes;
            this.genre = recipe.genre;
            this.image = recipe.image;
            this.equipment = recipe.equipment;
            this.fullImage = recipe.fullImage;
            this.owner = recipe.owner;
            this.tags = recipe.tags;
        }
    }
}
