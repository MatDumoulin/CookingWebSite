import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromRecipes from './recipes.reducer';

export interface DataState {
    recipes: fromRecipes.RecipesState;
}

// Describes the reducer map and how they are composed.
export const reducers: ActionReducerMap<DataState> = {
    recipes: fromRecipes.reducer
};

export const getDataState = createFeatureSelector<DataState>('data');
