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
  // For the infinite scroll.
  LOADING_CHUNKS = 20;
  canLoadMoreRecipe = true;
  isLoadingMoreRecipes: boolean;
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<Recipe[]> = new BehaviorSubject<Recipe[]>([]);
  get data(): Recipe[] { return this.dataChange.value; }

  constructor(private apiGetRecipesService:ApiGetRecipesService) {}

   /* Adds a new recipe to the database. */                                      // TODO: Add the recipe to the database.
  addRecipe(newRecipe:Recipe) {
    // TODO: Add the recipe to the database.
    this.addToClientSideList(newRecipe);
  }

  /* Adds a recipe to the local list of recipe. */
  addToClientSideList(newRecipe:Recipe) {
    // Creating a copy of the list of recipes                                    // TODO: Investigate if the copy is mandatory.
    const copiedData = this.data.slice();
    copiedData.push(newRecipe);
    this.dataChange.next(copiedData);
  }

  // Fetches more recipes from the api.
  // Returns: A promise with true if there are more recipes to fetch.
  //                         false otherwise.
  // Note: The promise will contain true when this function is called at the
  //       same time that it is waiting for a response from the API.
  //       It is important to note that only one call to te API will be made.
  loadMoreRecipes(): Promise<boolean> {
    return new Promise( (resolve, reject) => {
      if(!this.canLoadMoreRecipe) {
        resolve(false);
        return;
      }

      // If we are already waiting for recipes to come from the API.
      if(this.isLoadingMoreRecipes) {
        resolve(true);
        return;
      }

      this.isLoadingMoreRecipes = true;
      this.apiGetRecipesService.getRecipes(this.data.length, this.data.length + this.LOADING_CHUNKS)
        .subscribe( recipes => {
            if(recipes.length < this.LOADING_CHUNKS) {
              this.canLoadMoreRecipe = false;
            }

            for(let recipe of recipes) {
              this.addToClientSideList(recipe);
            }

            this.isLoadingMoreRecipes = false;
            resolve(true);
        }
      );
    });
  }
}
