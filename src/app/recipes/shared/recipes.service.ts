import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/Observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import { ApiGetRecipesService } from './api-get-recipes.service';
import { Recipe } from './recipe.model';

// This service contains the list of client side recipes that are being displayed
// in the application. This is the interface that communicates to the database
// for the recipes.
@Injectable()
export class RecipesService {
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<Recipe[]> = new BehaviorSubject<Recipe[]>([]);
  get data(): Recipe[] { return this.dataChange.value; }

  constructor(private apiGetRecipesService:ApiGetRecipesService) {
  }

   /* Adds a new recipe to the database. */                                      // TODO: Add the recipe to the database.
  addRecipe(newRecipe:Recipe) {                                                  // TODO: Investigate if the copy is mandatory.
    const copiedData = this.data.slice();
    copiedData.push(newRecipe);
    this.dataChange.next(copiedData);
  }

  loadMoreRecipes(): Promise<Recipe[]> {
    return new Promise( (resolve, reject) => {
      this.apiGetRecipesService.getRecipes()
        .subscribe( recipes => {
            for(let recipe of recipes) {
              this.addRecipe(recipe);
            }
            resolve(this.data);
        });
      });
  }
}
