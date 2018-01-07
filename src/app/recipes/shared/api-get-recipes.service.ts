import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Recipe } from './recipe.model';
import { Observable } from 'rxjs/Observable';
import { environment } from './../../../environments/environment';
import { LoggerService } from '../../core/logger/logger.service';
import { LocalStorageService } from 'angular-2-local-storage'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concatAll';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';

@Injectable()
export class ApiGetRecipesService {

    constructor(private http: HttpClient,
                private logger: LoggerService,
                private localStorageService: LocalStorageService) {}

    getRecipes(from:number, to:number): Observable<Recipe[]> {
      const url = `${environment.apiUrl}/recipes?filter=&from=${from}&to=${to}`;

      return this.http.get<Recipe[]>(url);
    }



    advancedSearch(searchIntention) {
      // Parameter validation
      if(searchIntention == null) {
        console.error("Invalid parameter 'searchIntention' in app.recipes.shared.advancedSearch: " + searchIntention);
        return;
      }

      const url = `${environment.apiUrl}/recipes/advanced`;

      // Fetching the API.
      return this.http.post(url, searchIntention)
                      .catch((err: HttpErrorResponse) => {
                        this.logger.error(`Une erreur de réseau empèche la recherche avancée. Nous sommes désolé de cet inconvénient.`, `Ok`);

                        return Observable.empty<any>()
                      });
    }

    getMatchingIngredientNames(ingredientName:string): Observable<string[]> {
      ingredientName = ingredientName || "";

      const url = `${environment.apiUrl}/recipes/ingredients`;

      return this.http.get(url, {params: {filter: ingredientName}})
                      .map((ingredients:Array<any>) => ingredients.map((ingredient:any) => ingredient.name));
    }

    getMatchingRecipeNames(recipeName:string): Observable<string[]> {
      recipeName = recipeName || "";

      const url = `${environment.apiUrl}/recipes/names`;

      return this.http.get(url, {params: {filter: recipeName}})
                      .map((recipes:Array<any>) => {
                        return recipes.map((recipe:any)=>recipe.name);
                      });
    }
}

/*(function() {

  angular
    .module('app.core')
    .factory('apiRecipesService', recipesService);
*/
    /*
     * This service handles the api requests to fetch multiple recipes.
     */
 /*   recipesService.$inject = ['$http'];

    function recipesService($http) {
      const service = {
        getRecipesMatchingFilter: getRecipesMatchingFilter,
        advancedSearch: advancedSearch,
        getMatchingRecipeNames: getMatchingRecipeNames,
        getMatchingIngredientNames: getMatchingIngredientNames,
        getGenres: getGenres
      };

      return service;

      ///////////

      // Gets all of the recipes matching the current filter.
      function getRecipesMatchingFilter(filter, from, to) {
        // Parameter validation
        if(Number.isNaN(from)) {
          console.error("Invalid parameter 'from' in app.core.getRecipesMatchingFilter: " + from);
          return;
        }
        if(Number.isNaN(to)) {
          console.error("Invalid parameter 'to' in app.core.getRecipesMatchingFilter:" + to);
          return;
        }

        // Preparation to call the API.
        const url = '/api/recipes?filter=' + filter + '&from=' + from + '&to=' + to;
        // Calling the API.
        return $http.get(url)
                    .then(getRecipesComplete)
                    .catch(getRecipesFailed);

        // Promises
        function getRecipesComplete(response) {
          return response.data;
        }

        function getRecipesFailed(error) {
          console.error("An error occurred while trying to fetch data from the API for app.core.getRecipesMatchingFilter: " + error);
        }
      }


      function advancedSearch(searchIntention) {
        // Parameter validation
        if(searchIntention == null) {
          console.error("Invalid parameter 'searchIntention' in app.core.advancedSearch: " + searchIntention);
          return;
        }
        // Calling the API.
        return $http.post('/api/recipes/advanced', searchIntention)
                    .then(advancedSearchComplete)
                    .catch(advancedSearchFailed);
        // Promises
        function advancedSearchComplete(response) {
          return response.data;
        }

        function advancedSearchFailed(error) {
          console.error("An error occurred while trying to fetch data from the API for app.core.advancedSearch: " + error);
        }
      }

      function getMatchingRecipeNames(filter) {
        // Parameter validation
        if(filter == null) {
          console.error("Invalid parameter 'filter' in app.core.getMatchingRecipeNames: " + filter);
          return;
        }
        // Calling the API.
        return $http.get('/api/recipes/names', {params: {filter: filter} })
                    .then(getMatchingRecipeNamesComplete)
                    .catch(getMatchingRecipeNamesFailed);
        // Promises
        function getMatchingRecipeNamesComplete(response) {
          return response.data;
        }

        function getMatchingRecipeNamesFailed(error) {
          console.error("An error occurred while trying to fetch data from the API for app.core.getMatchingRecipeNames: " + error);
        }
      }


      function getMatchingIngredientNames(filter) {
        // Parameter validation
        if(filter == null) {
          console.error("Invalid parameter 'filter' in app.core.getMatchingIngredientNames: " + filter);
          return;
        }
        // Calling the API.
        return $http.get('/api/recipes/ingredients', {params: {filter: filter} })
                    .then(getMatchingIngredientNamesComplete)
                    .catch(getMatchingIngredientNamesFailed);
        // Promises
        function getMatchingIngredientNamesComplete(response) {
          return response.data;
        }

        function getMatchingIngredientNamesFailed(error) {
          console.error("An error occurred while trying to fetch data from the API for app.core.getMatchingIngredientNames: " + error);
        }
      }

      function getGenres() {
        // Calling the API.
        return $http.get('/api/recipes/genres')
                    .then(getGenresComplete)
                    .catch(getGenresFailed);

        // Promises
        function getGenresComplete(response) {
          return response.data;
        }

        function getGenresFailed(error) {
          console.error("An error occurred while trying to fetch data from the API for app.core.getGenres: " + error);
        }
      }


    }

})();*/
