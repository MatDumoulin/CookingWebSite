import { createSelector } from "@ngrx/store";

import * as fromRoot from "../../../../routing/router-store";
import * as fromFeatures from "../../store-state";
import * as fromRecipes from "../reducers/recipes.reducer";
import { Recipe } from "../../../../recipes/shared/recipe.model";
import { SearchIntent, SearchIntentMatcher } from "../../../../search/advanced-recipe-search/shared/";

// Recipes state
export const getRecipesState = createSelector(
    fromFeatures.getDataState,
    (state: fromFeatures.DataState) => state.recipes
);

export const getRecipesEntities = createSelector(
    getRecipesState,
    fromRecipes.getRecipesEntities
);
// Returns all entites in an array
export const getAllRecipes = createSelector(getRecipesEntities, entities => {
    return Object.keys(entities).map(id => entities[id]);
});

export const getRecipesLoaded = createSelector(
    getRecipesState,
    fromRecipes.getRecipesLoaded
);

export const getRecipesLoading = createSelector(
    getRecipesState,
    fromRecipes.getRecipesLoading
);

export const getCanLoadMoreRecipes = createSelector(
    getRecipesState,
    fromRecipes.getCanLoadMoreRecipes
);

export const getSearchIntent = createSelector(
    getRecipesState,
    fromRecipes.getSearchIntent
);

export const getSearchedRecipes = createSelector(
    getAllRecipes,
    fromRecipes.getSearchIntent,
    (recipes: Recipe[], searchIntent: SearchIntent) => {
        // If no search intent is applied, return all recipes.
        if (!searchIntent) {
            return recipes;
        }
        // Else, retrieve the recipes that are matching the search intent.
        else {
            return recipes.filter(recipe =>
                SearchIntentMatcher.isRecipeMatchingIntent(recipe, searchIntent)
            );
        }
    }
);

// Returns the selected recipe from the url.
export const getSelectedRecipe = createSelector(
    getRecipesEntities,
    fromRoot.getRouterState,
    (entities, router): Recipe => {
        return router.state && entities[router.state.params.id];
    }
);
