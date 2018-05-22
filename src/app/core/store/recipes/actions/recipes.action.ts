import { Action } from '@ngrx/store';
import { Recipe } from '../../../../recipes/shared/recipe.model';

// Load
export const LOAD_RECIPES = '[Recipes] Load Recipes';
export const LOAD_RECIPES_FAIL = '[Recipes] Load Recipes Fail';
export const LOAD_RECIPES_SUCCESS = '[Recipes] Load Recipes Success';
export const HAS_LOADED_ALL_RECIPES = '[Recipes] Has Loaded All Recipes';
export const LOAD_RECIPE = '[Recipes] Load Recipe';
// CRUD operations for a single recipe.
export const CREATE_RECIPE = '[Recipe] Create Recipe';
export const CREATE_RECIPE_FAIL = '[Recipe] Create Recipe Fail';
export const CREATE_RECIPE_SUCCESS = '[Recipe] Create Recipe Success';
export const UPDATE_RECIPE = '[Recipe] Update Recipe';
export const UPDATE_RECIPE_FAIL = '[Recipe] Update Recipe Fail';
export const UPDATE_RECIPE_SUCCESS = '[Recipe] Update Recipe Success';

// Load
export class LoadRecipes implements Action {
    readonly type = LOAD_RECIPES;
}

export class LoadRecipe implements Action {
    readonly type = LOAD_RECIPE;

    constructor(public payload: string) { }
}

export class LoadRecipesFail implements Action {
    readonly type = LOAD_RECIPES_FAIL;

    constructor(public payload: any) { }
}

export class LoadRecipesSuccess implements Action {
    readonly type = LOAD_RECIPES_SUCCESS;

    constructor(public payload: Recipe[]) { }
}

export class HasLoadedAllRecipes implements Action {
    readonly type = HAS_LOADED_ALL_RECIPES;
}

// Create
export class CreateRecipe implements Action {
    readonly type = CREATE_RECIPE;

    constructor(public payload: Recipe) { }
}

export class CreateRecipeFail implements Action {
    readonly type = CREATE_RECIPE_FAIL;

    constructor(public payload: any) { }
}

export class CreateRecipeSuccess implements Action {
    readonly type = CREATE_RECIPE_SUCCESS;

    constructor(public payload: Recipe) { }
}

// Update
export class UpdateRecipe implements Action {
    readonly type = UPDATE_RECIPE;

    constructor(public payload: Recipe) { }
}

export class UpdateRecipeFail implements Action {
    readonly type = UPDATE_RECIPE_FAIL;

    constructor(public payload: any) { }
}

export class UpdateRecipeSuccess implements Action {
    readonly type = UPDATE_RECIPE_SUCCESS;

    constructor(public payload: Recipe) { }
}

// Action types
export type RecipesAction =
    // Load
    LoadRecipes | LoadRecipe | LoadRecipesFail | LoadRecipesSuccess | HasLoadedAllRecipes |
    // Create
    CreateRecipe | CreateRecipeFail | CreateRecipeSuccess |
    // Update
    UpdateRecipe | UpdateRecipeFail | UpdateRecipeSuccess;
