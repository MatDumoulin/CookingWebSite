/*
 * Represents an ingredient in a recipe.
 */
export class Ingredient {
  name: string;
  quantity: number;
  units: string;

  constructor(ingredient ?: Ingredient) {
    // Default constructor
    if(ingredient == null) {
      this.name = "";
      this.quantity = 0;
      this.units = "";
    }
    // Copy constructor.
    else {
      this.name = ingredient.name;
      this.quantity = ingredient.quantity;
      this.units = ingredient.units;
    }
  }
}
