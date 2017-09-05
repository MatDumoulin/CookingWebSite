import {DataSource} from '@angular/cdk';
import {Observable} from 'rxjs/Observable';
import { Recipe } from './../shared/recipe.model';
import { RecipesService } from './../shared/recipes.service';

export class RecipeListDataSource extends DataSource<any> {

  constructor(private recipesService:RecipesService) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Recipe[]> {
    return this.recipesService.dataChange;
  }

  disconnect() {}
}
