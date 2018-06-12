import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, Resolve, RouterStateSnapshot } from '@angular/router';
// Rxjs
import { Observable } from 'rxjs';
import { filter, map, take, withLatestFrom, first } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
// Services
// Ngrx Store
import { Store } from '@ngrx/store';
import * as fromStore from '../core/store';
import { Recipe } from '../recipes/shared/recipe.model';

@Injectable()
export class LoadRecipeResolverService implements Resolve<Recipe> {
    constructor(
        private router: Router,
        private store: Store<fromStore.DataState>) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe> {
        const id = route.paramMap.get('id');

        this.loadRecipeIfNotItStore(id);

        // Get the recipe if it is in the store. Else, it waits for it to be in the store.
        const recipe$ = this.waitForRecipeToBeInStore(id);
        const errorOnLoading$ = this.waitForErrors();

        // If the recipe observable resolves first, it means that there was no error. Otherwise, a null recipe will be returned.
        return merge(recipe$, errorOnLoading$).pipe(first());
    }

    private loadRecipeIfNotItStore(id: string): void {
        const loadRecipe$ = this.store.select(fromStore.getRecipesEntities).pipe(
            take(1)
        ).subscribe(entities => {
            // If the recipe is already loaded, return it.
            if (!entities[id]) {
                this.store.dispatch(new fromStore.LoadRecipe(id));
            }

            return entities;
        });
    }

    private waitForRecipeToBeInStore(id: string): Observable<Recipe> {
        return this.store.select(fromStore.getRecipesEntities).pipe(
            filter(entities => !!entities[id]),
            take(1),
            map(entities => {
                // If the recipe is already loaded, return it.
                return entities[id];
            })
        );
    }

    private waitForErrors(): Observable<null> {
        return this.store.select(fromStore.getRecipesLoaded).pipe(
            withLatestFrom(this.store.select(fromStore.getRecipesLoading)),
            take(1),
            map(([isLoading, hasLoadedRecipe]) => {
                if (!isLoading && !hasLoadedRecipe) {
                    this.router.navigateByUrl("recipes");
                    return null;
                }
            })
        );
    }
}
