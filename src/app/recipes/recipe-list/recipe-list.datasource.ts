import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { Recipe } from './../shared/recipe.model';
import { RecipesService } from './../shared/recipes.service';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

export class RecipeListDataSource extends DataSource<any> {

  constructor(private recipesService:RecipesService) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Recipe[]> {
    const displayDataChanges = [
      this.recipesService.dataChange
    ];

    return Observable.merge(...displayDataChanges).map(() => this.getSortedData());
  }

  disconnect() {}

  getSortedData(): Recipe[] {
    return this.recipesService.data.sort((a,b) => {
      return (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1);
    });
  }
}
