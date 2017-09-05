/*
 * Gives a list of all the possible genres for a recipe.
 */
export class Genres {
  static genres = ['Repas', 'Dessert', 'Collation', 'Entrée'];

  static get(): string[] {
    return this.genres;
  }
}
