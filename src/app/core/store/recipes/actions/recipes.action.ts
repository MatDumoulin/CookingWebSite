import { Action } from '@ngrx/store';
import { Recipe } from '../../../../recipes/shared/recipe.model';


export const LOAD_RECIPES = '[Recipes] Load Recipes';
export const LOAD_RECIPES_FAIL = '[Recipes] Load Recipes Fail';
export const LOAD_RECIPES_SUCCESS = '[Recipes] Load Recipes Success';
export const HAS_LOADED_ALL_RECIPES = '[Recipes] Has Loaded All Recipes';

export class LoadRecipes implements Action {
    readonly type = LOAD_RECIPES;
}

export class LoadRecipesFail implements Action {
    readonly type = LOAD_RECIPES_FAIL;

    constructor(public payload: any) {}
}

export class LoadRecipesSuccess implements Action {
    readonly type = LOAD_RECIPES_SUCCESS;

    constructor(public payload: Recipe[]) {}
}

export class HasLoadedAllRecipes implements Action {
    readonly type = HAS_LOADED_ALL_RECIPES;
}

// Action types
export type RecipesAction = LoadRecipes | LoadRecipesFail | LoadRecipesSuccess | HasLoadedAllRecipes;
