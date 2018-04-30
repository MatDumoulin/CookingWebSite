import { Injectable } from '@angular/core';
// Ngrx
import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import * as recipesActions from '../actions/recipes.action';
import * as fromReducers from '../reducers';
// Rxjs
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
// Models
import { Recipe } from '../../../../recipes/shared/recipe.model';
// Services
import { ApiGetRecipesService } from '../../../../recipes/shared/api-get-recipes.service';

@Injectable()
export class RecipesEffects {
    readonly LOADING_CHUNKS = 20;

    constructor(private actions$: Actions,
        private apiGetRecipesService: ApiGetRecipesService,
        private store: Store<fromReducers.DataState>) { }

    @Effect()
    loadRecipes$ = this.actions$.ofType(recipesActions.LOAD_RECIPES).pipe(
        withLatestFrom(this.store.select(fromReducers.getRecipesState)),
        switchMap(([action, storeState]) => {
            // If the store can load more recipes
            if (storeState.canLoadMore) {
                // Request more recipes from the database.
                const numberOfRecipes = Object.keys(storeState.entities).length;
                return this.apiGetRecipesService.getRecipes(numberOfRecipes, numberOfRecipes + this.LOADING_CHUNKS).pipe(
                    // Handle the status of the request.
                    switchMap(recipes => {
                        // Here, we return a first action that is the loading success.
                        const actions: recipesActions.RecipesAction[] = [new recipesActions.LoadRecipesSuccess(recipes)];
                        // If the api returned less recipes that what asked for, we have reached the end of our data.
                        if (recipes.length < this.LOADING_CHUNKS) {
                            actions.push(new recipesActions.HasLoadedAllRecipes());
                        }

                        return actions;
                    }),
                    catchError(error => of(new recipesActions.LoadRecipesFail(error)))
                );
            }
            else {
                return of(new recipesActions.HasLoadedAllRecipes());
            }

        })
    );
}
