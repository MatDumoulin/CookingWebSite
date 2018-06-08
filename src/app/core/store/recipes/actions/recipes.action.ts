import { Action } from '@ngrx/store';
import { Recipe } from '../../../../recipes/shared/recipe.model';
import { SearchIntent } from '../../../../search/advanced-recipe-search/shared';

// Load
export const LOAD_RECIPES = '[Recipes] Load Recipes';
export const LOAD_RECIPES_FAIL = '[RecipesApi] Load Recipes Fail';
export const LOAD_RECIPES_SUCCESS = '[RecipesApi] Load Recipes Success';
export const HAS_LOADED_ALL_RECIPES = '[RecipesApi] Has Loaded All Recipes';
export const LOAD_RECIPE = '[Recipes] Load Recipe';
export const RECIPE_NOT_FOUND = '[RecipesApi] Recipe Not Found';

// Search
export const SEARCH_RECIPES = '[Advanced Recipes] Search Recipes';
export const CANCEL_SEARCH_RECIPES = '[Advanced Recipes] Cancel Search Recipes';
// CRUD operations for a single recipe.
export const CREATE_RECIPE = '[Create and Update Recipe] Create Recipe';
export const CREATE_RECIPE_FAIL = '[RecipesApi] Create Recipe Fail';
export const CREATE_RECIPE_SUCCESS = '[RecipesApi] Create Recipe Success';
export const UPDATE_RECIPE = '[Create and Update Recipe] Update Recipe';
export const UPDATE_RECIPE_FAIL = '[RecipesApi] Update Recipe Fail';
export const UPDATE_RECIPE_SUCCESS = '[RecipesApi] Update Recipe Success';
export const DELETE_RECIPE = '[Create and Update Recipe] Delete Recipe';
export const DELETE_RECIPE_FAIL = '[RecipesApi] Delete Recipe Fail';
export const DELETE_RECIPE_SUCCESS = '[RecipesApi] Delete Recipe Success';

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

export class RecipeNotFound implements Action {
    readonly type = RECIPE_NOT_FOUND;

    constructor(public payload: any) { }
}

export class LoadRecipesSuccess implements Action {
    readonly type = LOAD_RECIPES_SUCCESS;

    constructor(public payload: Recipe[]) { }
}

export class HasLoadedAllRecipes implements Action {
    readonly type = HAS_LOADED_ALL_RECIPES;
}

// Search
export class SearchRecipes implements Action {
    readonly type = SEARCH_RECIPES;

    constructor(public payload: SearchIntent) { }
}

export class CancelSearchRecipes implements Action {
    readonly type = CANCEL_SEARCH_RECIPES;
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

// Delete
export class DeleteRecipe implements Action {
    readonly type = DELETE_RECIPE;

    constructor(public payload: string) { }
}

export class DeleteRecipeFail implements Action {
    readonly type = DELETE_RECIPE_FAIL;

    constructor(public payload: any) { }
}

export class DeleteRecipeSuccess implements Action {
    readonly type = DELETE_RECIPE_SUCCESS;

    constructor(public payload: string) { }
}

// Action types
export type RecipesAction =
    // Load Multiple Recipes
    LoadRecipes | LoadRecipesFail | LoadRecipesSuccess | HasLoadedAllRecipes |
    // Load Recipe
    LoadRecipe | RecipeNotFound |
    // Search
    SearchRecipes | CancelSearchRecipes |
    // Create
    CreateRecipe | CreateRecipeFail | CreateRecipeSuccess |
    // Update
    UpdateRecipe | UpdateRecipeFail | UpdateRecipeSuccess |
    // Delete
    DeleteRecipe | DeleteRecipeFail | DeleteRecipeSuccess;
