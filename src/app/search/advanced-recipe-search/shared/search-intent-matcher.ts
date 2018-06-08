import { SearchIntent } from "./search-intent";
import { Recipe } from "../../../recipes/shared/recipe.model";

export class SearchIntentMatcher {

    static isRecipeMatchingIntent(
        recipe: Recipe,
        intent: SearchIntent
    ): boolean {
        const genreIsMatching =
            !intent.genre || recipe.genre.indexOf(intent.genre) !== -1;

        const nameIsMatching =
            !intent.name || recipe.name.indexOf(intent.name) !== -1;

        const ratingIsMatching =
            !intent.rating || recipe.rating >= intent.rating;

        const totalTimeIsMatching =
            !intent.totalTime ||
            recipe.prepTime + recipe.cookTime + recipe.cooldownTime <=
                intent.totalTime;

        // Is the recipe matching the incredient search
        const ingredientsAreMatching =
            !intent.ingredients ||
            intent.ingredients.every(searchedIngredient => {
                const isIngredientInRecipe =
                    recipe.ingredientSection.findIndex(
                        section =>
                            section.ingredients.findIndex(ingredient =>
                                ingredient.name.includes(
                                    searchedIngredient.name
                                )
                            ) !== -1
                    ) !== -1;

                return searchedIngredient.include
                    ? isIngredientInRecipe
                    : !isIngredientInRecipe;
            });

        return (
            genreIsMatching &&
            nameIsMatching &&
            ratingIsMatching &&
            totalTimeIsMatching &&
            ingredientsAreMatching
        );
    }
}
