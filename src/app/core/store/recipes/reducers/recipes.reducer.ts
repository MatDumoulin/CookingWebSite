import * as fromRecipes from '../actions/recipes.action';
import { Recipe } from '../../../../recipes/shared/recipe.model';
import { SearchIntent } from '../../../../search/advanced-recipe-search/shared';

export interface RecipesState {
    entities: { [id: string]: Recipe };
    loaded: boolean;
    loading: boolean;
    canLoadMore: boolean;
    searchIntent: SearchIntent;
}

export const initialState: RecipesState = {
    entities: {},
    loaded: false,
    loading: false,
    canLoadMore: true,
    searchIntent: null
};

export function reducer(state = initialState, action: fromRecipes.RecipesAction): RecipesState {
    switch (action.type) {
        case fromRecipes.LOAD_RECIPES:
        case fromRecipes.LOAD_RECIPE: {
            return {
                ...state,
                loading: true
            };
        }
        case fromRecipes.LOAD_RECIPES_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }
        case fromRecipes.LOAD_RECIPES_SUCCESS: {
            const recipes = action.payload;
            // Flattening the state for faster lookup. It becomes a map of <id, recipe>.
            const allEntities = recipes.reduce(
                (entities: { [id: string]: Recipe }, recipe: Recipe) => {
                    return {
                        ...entities,
                        [recipe._id]: recipe
                    };
                },
                {
                    ...state.entities
                }
            );

            return {
                ...state,
                loading: false,
                loaded: true,
                entities: allEntities
            };
        }
        case fromRecipes.HAS_LOADED_ALL_RECIPES: {
            return {
                ...state,
                canLoadMore: false
            };
        }
        // Search
        case fromRecipes.SEARCH_RECIPES: {
            const searchIntent = action.payload;

            return {
                ...state,
                searchIntent
            };
        }
        case fromRecipes.CANCEL_SEARCH_RECIPES: {

            return {
                ...state,
                searchIntent: null
            };
        }
        // Create
        case fromRecipes.CREATE_RECIPE_SUCCESS: {
            const newRecipe = action.payload;
            const flattenedNewRecipe = {[newRecipe._id]: newRecipe};
            const entities = Object.assign({}, state.entities, flattenedNewRecipe);

            return {
                ...state,
                entities
            };
        }
        // Update
        case fromRecipes.UPDATE_RECIPE_SUCCESS: {
            const updatedRecipe = action.payload;
            // Working on a copy of the entities for immutability.
            const copyOfEntities = Object.assign({}, state.entities);
            // Updating our clientside recipe.
            copyOfEntities[updatedRecipe._id] = updatedRecipe;

            return {
                ...state,
                entities: copyOfEntities
            };
        }
        // Delete
        case fromRecipes.DELETE_RECIPE_SUCCESS: {
            const deletedRecipeId = action.payload;
            // Working on a copy of the entities for immutability.
            const copyOfEntities = Object.assign({}, state.entities);
            // Removing the recipe from our clientside recipe.
            delete copyOfEntities[deletedRecipeId];

            return {
                ...state,
                entities: copyOfEntities
            };
        }

        // We are handling the create, update and delete recipe fail in the error-handling.effects.ts file
        // since it requires logging.
    }

    return state;
}

export const getRecipesLoading = (state: RecipesState) => state.loading;
export const getRecipesLoaded = (state: RecipesState) => state.loading;
export const getRecipesEntities = (state: RecipesState) => state.entities;
export const getCanLoadMoreRecipes = (state: RecipesState) => state.canLoadMore;
export const getSearchIntent = (state: RecipesState) => state.searchIntent;
