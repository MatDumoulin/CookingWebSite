/*
 * Represents an ingredient in a recipe.
 */
export class Ingredient {
  name: string;
  quantity: string;
  units: string;

  constructor(ingredient ?: Ingredient) {
    // Default constructor
    if(ingredient == null) {
      this.name = "";
      this.quantity = "";
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
