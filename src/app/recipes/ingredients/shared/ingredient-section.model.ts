import { Ingredient } from "./ingredient.model";

export class IngredientSection {
    name: string;
    ingredients: Ingredient[];

    constructor(section?: IngredientSection) {
        // Default constructor
        if (section == null) {
            this.name = "";
            this.ingredients = [new Ingredient()];
        }
        // Copy constructor.
        else {
            this.name = section.name;
            this.ingredients = section.ingredients;
        }
    }
}
