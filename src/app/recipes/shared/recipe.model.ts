import { IngredientSection } from './../ingredients/shared/ingredient-section.model';
import { StepSection } from './../steps/shared/step-section.model';

/*
 * Represents a Recipe document from the database.
 */
export class Recipe {
    _id?: string;
    name: string;
    ingredientSection: IngredientSection[];
    stepSection: StepSection[];
    rating:number;
    prepTime: number; // In minutes
    cookTime: number; // In minutes
    cooldownTime: number; // In minutes
    results: string;
    notes: string;
    genre: string;
    image: string;
    equipment: string[];


    // I'm using parameter overload since TypeScript doesn't support having more
    // than one constructor implementation.
    constructor(recipe?: Recipe) {
      // Default constructor
      if(recipe == null) {
        // _id is undefined.
        this.name= "";
        this.ingredientSection = [new IngredientSection()];
        this.stepSection = [new StepSection()];
        this.rating = 0;
        this.prepTime = 0;
        this.cookTime = 0;
        this.cooldownTime = 0;
        this.results = "";
        this.notes = "";
        this.genre = "";
        this.image = "";
        this.equipment = [];
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
      }
   }
}
