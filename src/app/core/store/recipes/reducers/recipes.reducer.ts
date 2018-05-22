import * as fromRecipes from '../actions/recipes.action';
import { Recipe } from '../../../../recipes/shared/recipe.model';

export interface RecipesState {
    entities: { [id: string]: Recipe };
    loaded: boolean;
    loading: boolean;
    canLoadMore: boolean;
}

export const initialState: RecipesState = {
    entities: {},
    loaded: false,
    loading: false,
    canLoadMore: true
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
            console.log(action.payload);
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

        // Not handling the create recipe fail for now.
        // Not handling the update recipe fail for now.
    }

    return state;
}

export const getRecipesLoading = (state: RecipesState) => state.loading;
export const getRecipesLoaded = (state: RecipesState) => state.loading;
export const getRecipesEntities = (state: RecipesState) => state.entities;
export const getCanLoadMoreRecipes = (state: RecipesState) => state.canLoadMore;
