import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRecipes from './recipes.reducer';

export interface DataState {
    recipes: fromRecipes.RecipesState;
}

// Describes the reducer map and how they are composed.
export const reducers: ActionReducerMap<DataState> = {
    recipes: fromRecipes.reducer
};

export const getDataState = createFeatureSelector<DataState>('data');

// Recipes state
export const getRecipesState = createSelector(getDataState, (state: DataState) => state.recipes);

export const getRecipesEntities = createSelector(getRecipesState, fromRecipes.getRecipesEntities);
// Returns all entites in an array
export const getAllRecipes = createSelector(getRecipesEntities, (entities) => {
    return Object.keys(entities).map(id => entities[id]);
});
export const getRecipesLoaded = createSelector(getRecipesState, fromRecipes.getRecipesLoaded);
export const getRecipesLoading = createSelector(getRecipesState, fromRecipes.getRecipesLoading);
export const getCanLoadMoreRecipes = createSelector(getRecipesState, fromRecipes.getCanLoadMoreRecipes);
