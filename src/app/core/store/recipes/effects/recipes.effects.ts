import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
// Ngrx
import { Store } from "@ngrx/store";
import { Actions, Effect } from "@ngrx/effects";
import * as recipesActions from "../actions/recipes.action";
import { DataState } from "../../store-state";
import { getRecipesState } from "../selectors";
// Rxjs
import {
    catchError,
    map,
    switchMap,
    withLatestFrom,
    filter
} from "rxjs/operators";
import { of } from "rxjs/observable/of";
import { empty } from "rxjs";
// Models
import { Recipe } from "../../../../recipes/shared/recipe.model";
// Services
import { ApiGetRecipesService } from "../../../../recipes/shared/api-get-recipes.service";
import { ApiSpecificRecipeService } from "../../../../recipes/shared/api-specific-recipe.service";
import { LoggerService } from "../../../logger/logger.service";

@Injectable()
export class RecipesEffects {
    private readonly LOADING_CHUNKS = 20;

    constructor(
        private actions$: Actions,
        private apiGetRecipesService: ApiGetRecipesService,
        private apiSpecificRecipeService: ApiSpecificRecipeService,
        private loggerService: LoggerService,
        private router: Router,
        private store: Store<DataState>
    ) {}

    /**
     * Handles the load recipes event when there is no active search.
     */
    @Effect()
    loadRecipesWithoutSearch$ = this.actions$
        .ofType(recipesActions.LOAD_RECIPES)
        .pipe(
            withLatestFrom(this.store.select(getRecipesState)),
            filter(([action, storeState]) => storeState.searchIntent === null),
            switchMap(([action, storeState]) => {
                // If the store can load more recipes
                if (storeState.canLoadMore) {
                    // Request more recipes from the database.
                    const numberOfRecipes = Object.keys(storeState.entities)
                        .length;
                    return this.apiGetRecipesService
                        .getRecipes(
                            numberOfRecipes,
                            numberOfRecipes + this.LOADING_CHUNKS
                        )
                        .pipe(
                            // Handle the status of the request.
                            switchMap(recipes => {
                                // Here, we return a first action that is the loading success.
                                const actions: recipesActions.RecipesAction[] = [
                                    new recipesActions.LoadRecipesSuccess(
                                        recipes
                                    )
                                ];
                                // If the api returned less recipes that what asked for, we have reached the end of our data.
                                if (recipes.length < this.LOADING_CHUNKS) {
                                    actions.push(
                                        new recipesActions.HasLoadedAllRecipes()
                                    );
                                }

                                return actions;
                            }),
                            catchError(error =>
                                of(new recipesActions.LoadRecipesFail(error))
                            )
                        );
                } else {
                    return of(new recipesActions.HasLoadedAllRecipes());
                }
            })
        );

    /**
     * Handles the load recipes event when there is an active search.
     */
    @Effect()
    loadRecipesWithSearch$ = this.actions$
        .ofType(recipesActions.LOAD_RECIPES)
        .pipe(
            withLatestFrom(this.store.select(getRecipesState)),
            filter(([action, storeState]) => storeState.searchIntent !== null),
            switchMap(([action, storeState]) => {
                const searchIntent = storeState.searchIntent;
                // If the store can load more recipes
                if (storeState.canLoadMore) {
                    // Request more recipes from the database.
                    return this.apiGetRecipesService
                        .advancedSearch(searchIntent)
                        .pipe(
                            // Handle the status of the request.
                            switchMap(recipes => {
                                // Here, we return a first action that is the loading success.
                                const actions = [
                                    new recipesActions.LoadRecipesSuccess(
                                        recipes
                                    ),
                                    new recipesActions.HasLoadedAllRecipes()
                                ];

                                return actions;
                            }),
                            catchError(error =>
                                of(new recipesActions.LoadRecipesFail(error))
                            )
                        );
                } else {
                    return of(new recipesActions.HasLoadedAllRecipes());
                }
            })
        );

    /**
     * This effect considers that the user already checked in the store if the recipe
     * was there.
     */
    @Effect()
    loadRecipe$ = this.actions$.ofType(recipesActions.LOAD_RECIPE).pipe(
        switchMap(action => {
            const recipeId = (<recipesActions.LoadRecipe>action).payload;
            // Request more recipes from the database.
            return this.apiSpecificRecipeService.getRecipe(recipeId).pipe(
                // Handle the status of the request.
                switchMap(recipe => {
                    return of(new recipesActions.LoadRecipesSuccess([recipe]));
                }),
                catchError(error => {
                    if (error.status === 404) {
                        return of(new recipesActions.RecipeNotFound(error));
                    } else {
                        return of(new recipesActions.LoadRecipesFail(error));
                    }
                })
            );
        })
    );

    @Effect()
    createRecipe$ = this.actions$.ofType(recipesActions.CREATE_RECIPE).pipe(
        switchMap(action => {
            const recipeToAdd = (<recipesActions.CreateRecipe>action).payload;
            // Add recipe to the database
            return this.apiSpecificRecipeService.addRecipe(recipeToAdd).pipe(
                // Handle the status of the request.
                switchMap((recipe: Recipe) => {
                    // Here, we return the create recipe success action.
                    return of(new recipesActions.CreateRecipeSuccess(recipe));
                }),
                catchError(error =>
                    of(new recipesActions.CreateRecipeFail(error))
                )
            );
        })
    );

    @Effect()
    updateRecipe$ = this.actions$.ofType(recipesActions.UPDATE_RECIPE).pipe(
        switchMap(action => {
            const recipeToUpdate = (<recipesActions.UpdateRecipe>action)
                .payload;
            // Update recipe in the database
            return this.apiSpecificRecipeService
                .updateRecipe(recipeToUpdate._id, recipeToUpdate)
                .pipe(
                    // Handle the status of the request.
                    switchMap((recipe: Recipe) => {
                        // Here, we return the update recipe success action.
                        return of(
                            new recipesActions.UpdateRecipeSuccess(recipe)
                        );
                    }),
                    catchError(error =>
                        of(new recipesActions.UpdateRecipeFail(error))
                    )
                );
        })
    );

    @Effect()
    deleteRecipe$ = this.actions$.ofType(recipesActions.DELETE_RECIPE).pipe(
        switchMap(action => {
            const recipeIdToDelete = (<recipesActions.DeleteRecipe>action)
                .payload;
            // Add recipe to the database
            return this.apiSpecificRecipeService
                .deleteRecipe(recipeIdToDelete)
                .pipe(
                    // Handle the status of the request.
                    switchMap(() => {
                        // Here, we return the delete recipe success action.
                        return of(
                            new recipesActions.DeleteRecipeSuccess(
                                recipeIdToDelete
                            )
                        );
                    }),
                    catchError(error =>
                        of(new recipesActions.DeleteRecipeFail(error))
                    )
                );
        })
    );

    @Effect()
    showSaveSuccessful$ = this.actions$
        .ofType(
            recipesActions.CREATE_RECIPE_SUCCESS,
            recipesActions.UPDATE_RECIPE_SUCCESS
        )
        .pipe(
            switchMap(action => {
                this.loggerService.info("Vos changements sont sauvegardés");

                return empty();
            })
        );

        @Effect()
        redirectToRecipePage$ = this.actions$
            .ofType(
                recipesActions.CREATE_RECIPE_SUCCESS,
                recipesActions.DELETE_RECIPE_SUCCESS,
                recipesActions.UPDATE_RECIPE_SUCCESS
            )
            .pipe(
                switchMap(action => {
                    this.router.navigateByUrl("recipes");

                    return empty();
                })
            );
}
