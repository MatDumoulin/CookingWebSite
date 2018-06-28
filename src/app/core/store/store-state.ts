import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { RecipesState, recipesReducer } from './recipes/reducers';
import { AuthState, authReducer } from './auth/reducers';

export interface DataState {
    recipes: RecipesState;
    auth: AuthState;
}

// Describes the reducer map and how they are composed.
export const reducers: ActionReducerMap<DataState> = {
    recipes: recipesReducer,
    auth: authReducer
};

export const getDataState = createFeatureSelector<DataState>('data');
