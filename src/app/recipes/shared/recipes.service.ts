import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/Observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import { ApiGetRecipesService } from './api-get-recipes.service';
import { ApiSpecificRecipeService } from './api-specific-recipe.service';
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
  // Saving the filter so that we can feed the infinite scroll with the proper recipes
  searchIntent = null;

  constructor(private apiGetRecipesService:ApiGetRecipesService,
              private apiSpecificRecipeService:ApiSpecificRecipeService) {}

  addRecipe(newRecipe:Recipe) {
    this.apiSpecificRecipeService.addRecipe(newRecipe);
    this.addToClientSideList(newRecipe);
  }

  /* Adds a recipe to the local list of recipe. */
  addToClientSideList(newRecipe:Recipe) {
    // Creating a copy of the list of recipes                                    // TODO: Investigate if the copy is mandatory.
    const copiedData = this.data.slice();
    copiedData.push(newRecipe);
    this.dataChange.next(copiedData);
  }

  private overrideClientSideList(newList:Recipe[]) {
    this.dataChange.next(newList);
  }

  /* Updates the recipe with the given ID with the new recipe */
  updateRecipe(idOfRecipeToUpdate: string, newRecipe: Recipe) {
    this.apiSpecificRecipeService.updateRecipe(idOfRecipeToUpdate, newRecipe);
    const copiedData = this.data.slice();
    const indexOfOldRecipe = copiedData.findIndex(recipe => recipe._id === idOfRecipeToUpdate);
    copiedData[indexOfOldRecipe] = newRecipe;
    this.dataChange.next(copiedData);
  }

  deleteRecipe(id:string): Recipe {
    this.apiSpecificRecipeService.deleteRecipe(id);
    const indexOfOldRecipe = this.data.findIndex(recipe => recipe._id === id);
    const deletedRecipe = this.data.splice(indexOfOldRecipe, 1); // Removing the recipe from the list.
    const copiedData = this.data.slice();
    this.dataChange.next(copiedData);

    return deletedRecipe[0];
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

  loadFromAdvancedSearch(searchIntent): Promise<boolean> {
    this.searchIntent = searchIntent;

    return new Promise( (resolve, reject) => {
      this.apiGetRecipesService.advancedSearch(searchIntent)
                               .subscribe( recipes => {
                                    this.overrideClientSideList(recipes);
                                    this.canLoadMoreRecipe = false;
                                    this.isLoadingMoreRecipes = false;

                                    resolve(true);
                                  }
                                );
    });
  }

  cancelSearch() {
    this.searchIntent = null;
    this.overrideClientSideList([]);
    this.canLoadMoreRecipe = true;
    this.isLoadingMoreRecipes = false;
  }

  searchIsActive(): boolean {
    return this.searchIntent != null;
  }
}
