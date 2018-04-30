import { DataSource } from '@angular/cdk/collections';
// Rxjs
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
// Ngrx Store
import { Store } from '@ngrx/store';
import * as fromStore from '../../core/store';
// Models
import { Recipe } from './../shared/recipe.model';
// Services
import { RecipesService } from './../shared/recipes.service';

export class RecipeListDataSource extends DataSource<any> {
    private recipes$: Observable<Recipe[]>;

    constructor(private store: Store<fromStore.DataState>) {
        super();
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<Recipe[]> {

        this.recipes$ = this.store.select(fromStore.getAllRecipes);

        return this.recipes$.map((data) => this.sortData(data));
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
        return (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1);
    }
}
