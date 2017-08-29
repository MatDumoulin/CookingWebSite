import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Recipe } from './recipe.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

// Interacts with the API when it comes to single recipe request.
@Injectable()
export class ApiSpecificRecipeService {

    constructor(private http:Http) {}

    getRecipe(recipeId:string): Observable<Recipe> {

      // Parameter validation
      if(!recipeId) {
        console.error(`Invalid parameter 'recipeId' in app/recipes/shared/getRecipe: ${recipeId}`);
        return;
      }

      const url = `/api/recipes/${recipeId}`;
      // Calling the API.
      return this.http.get(url)
                      .map(res => <Recipe>res.json());
    }
}


/*  angular.module('app.core')
         .factory('apiRecipeService', recipeService);
*/
  /*
   * This service handles the api requests that are related to a single recipe.
   */
 /* recipeService.$inject = ['$http'];

  function recipeService($http) {
    const service = {
      addRecipe: addRecipe,
      getRecipe: getRecipe
    };

    return service;

    ///////////

    // Adds the given recipe into the database.
    function addRecipe(newRecipe) {
      // Parameter validation
      if(newRecipe == null) {
        console.error("Invalid parameter 'newRecipe' in app.core.addRecipe: " + newRecipe);
        return;
      }

      // Calling the API.
      return $http.post("/api/recipe/", newRecipe)
                  .then(addRecipeComplete)
                  .catch(addRecipeFailed);

      // Promises
      function addRecipeComplete(response) {
        return response.data;
      }

      function addRecipeFailed(error) {
        console.error("An error occurred while trying to add a recipe using the API for app.core.addRecipe: " + error);
      }
    }

    // Gets a specific recipe from the database.
    function getRecipe(idOfRecipe) {
      // Parameter validation
      if(idOfRecipe == null) {
        console.error("Invalid parameter 'idOfRecipe' in app.core.getRecipe: " + idOfRecipe);
        return;
      }

      // Calling the API.
      return $http.get('/api/recipes/' + idOfRecipe)
                  .then(getRecipeComplete)
                  .catch(getRecipeFailed);

      // Promises
      function getRecipeComplete(response) {
        return response.data[0];
      }

      function getRecipeFailed(error) {
        console.error("An error occurred while trying to fetch data from the API for app.core.getRecipe: " + error);
      }
    }


  }*/
