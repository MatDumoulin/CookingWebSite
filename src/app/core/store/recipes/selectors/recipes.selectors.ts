import { createSelector } from "@ngrx/store";

import * as fromRoot from "../../../../routing/router-store";
import * as fromFeatures from "../reducers";
import * as fromRecipes from "../reducers/recipes.reducer";
import { Recipe } from "../../../../recipes/shared/recipe.model";

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
// Returns the selected recipe from the url.
export const getSelectedRecipe = createSelector(
    getRecipesEntities,
    fromRoot.getRouterState,
    (entities, router): Recipe => {
        return router.state && entities[router.state.params.id];
    }
);
