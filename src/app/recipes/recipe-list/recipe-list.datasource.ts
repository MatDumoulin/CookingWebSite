import { DataSource } from "@angular/cdk/collections";
// Rxjs
import { Observable } from "rxjs/Observable";
import {
    map,
    count,
    withLatestFrom,
    filter
} from "rxjs/operators";
// Ngrx Store
import { Store } from "@ngrx/store";
import * as fromStore from "../../core/store";
// Models
import { Recipe } from "./../shared/recipe.model";
// Services
import { SearchIntent, SearchIntentMatcher } from "../../search/advanced-recipe-search/shared";
import { combineLatest } from "rxjs";

export class RecipeListDataSource extends DataSource<any> {
    private recipes$: Observable<Recipe[]>;

    constructor(private store: Store<fromStore.DataState>) {
        super();
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<Recipe[]> {
        this.recipes$ = combineLatest(
            this.store.select(fromStore.getAllRecipes),
            this.store.select(fromStore.getSearchIntent))
            .pipe(
                map(([recipes, searchIntent]) => {
                    // If no search intent is applied, return all recipes.
                    if (!searchIntent) {
                        return recipes;
                    }
                    // Else, retrieve the recipes that are matching the search intent.
                    else {
                        return recipes.filter(recipe =>
                            SearchIntentMatcher.isRecipeMatchingIntent(
                                recipe,
                                searchIntent
                            )
                        );
                    }
                }));

        return this.recipes$.pipe(
            map((data) => this.sortData(data))
        );
    }

    disconnect() {
        // Not completing the recipes$ stream since it will kill our store.
    }

    private sortData(data: Recipe[]): Recipe[] {
        return data.sort((a, b) => {
            return this.compareRecipeNames(a, b);
        });
    }

    private compareRecipeNames(a: Recipe, b: Recipe): number {
        return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
    }
}
