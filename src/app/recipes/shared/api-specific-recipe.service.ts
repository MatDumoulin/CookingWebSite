import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Recipe } from './recipe.model';
import { Observable } from 'rxjs/Observable';
import { environment } from './../../../environments/environment';
import { LoggerService } from '../../core/logger/logger.service';
import { ObjectID } from 'bson';

import 'rxjs/add/operator/map';

// Interacts with the API when it comes to single recipe request.
@Injectable()
export class ApiSpecificRecipeService {
    // There is no function to retrieve the images since having images saved in
    // javascript slows down the browser. Images are directly served in the <img> tag.
    //
    // To get an image, you must GET, then specify the image name after this url.
    // To store an image, you must POST, then specify the name of the image and
    //                    the data in the body of the request.
    imagesUrl = `${environment.apiUrl}/recipes/image/`;

    constructor(private http:HttpClient, private logger:LoggerService) {}

    getRecipe(recipeId:string): Observable<Recipe> {
      // Parameter validation
      if(!recipeId) {
        console.error(`Invalid parameter 'recipeId' in app/recipes/shared/getRecipe: ${recipeId}`);
        return;
      }

      const url = `${environment.apiUrl}/recipes/${recipeId}`;
      // Calling the API.
      return this.http.get(url)
                      .map((res:Recipe) => res);
    }

    getImage(imageURL:string): Observable<Blob> {
      // Parameter validation
      if(!imageURL) {
        console.error(`Invalid parameter 'recipeId' in app/recipes/shared/getImage: ${imageURL}`);
        return;
      }

      console.log(imageURL);

      const url = `${this.imagesUrl}${imageURL}`;
      // Calling the API.
      return this.http.get(url, { responseType: "blob" });
                      /*.map(res => {
                        return res.blob();
                      });*/
    }

    addRecipe(newRecipe:Recipe) {
      // Parameter validation
      if(!newRecipe) {
        this.logger.error(`Il est impossible de créer une recette qui ne contient aucune information.`, `Ok`);
        console.error(`Invalid parameter 'newRecipe' in app/recipes/shared/addRecipe: ${newRecipe}`);
        return;
      }

      newRecipe._id = (new ObjectID()).toString();

      const url = `${environment.apiUrl}/recipe`;
      // Calling the API.
      return this.http.post(url, newRecipe)
                      .subscribe((res:any) => {
                          if(!res.insertWasSuccessful) {
                            this.logger.error(`Une erreur de réseau empèche la création de votre recette. Nous sommes désolé de cet inconvénient.`, `Ok`);
                          }
                      });
    }

    updateRecipe(idOfRecipeToUpdate:string, newRecipe:Recipe) {
            // Parameter validation
      if(!newRecipe) {
        this.logger.error(`Il est impossible de modifier une recette avec une recette qui ne contient aucune information.`, `Ok`);
        console.error(`Invalid parameter 'newRecipe' in app/recipes/shared/updateRecipe: ${newRecipe}`);
        return;
      }

      const url = `${environment.apiUrl}/recipes/${idOfRecipeToUpdate}`;
      // Calling the API.
      return this.http.post(url, newRecipe)
                      .subscribe((res:any) => {
                          if(!res.updateWasSuccessful) {
                            this.logger.error(`Une erreur de réseau empèche la modification de votre recette. Nous sommes désolé de cet inconvénient.`, `Ok`);
                          }
                      });

    }

    deleteRecipe(id:string) {
            // Parameter validation
      if(!id) {
        this.logger.error(`Identifiant de recette invalide. La suppression est annulée.`, `Ok`);
        console.error(`Invalid parameter 'id' in app/recipes/shared/deleteRecipe: ${id}`);
        return;
      }

      const url = `${environment.apiUrl}/recipes/${id}`;
      // Calling the API.
      return this.http.delete(url)
                      .subscribe(() => {}, (err: HttpErrorResponse) => {
                        this.logger.error(`Une erreur de réseau empèche la suppression de votre recette. Nous sommes désolés de cet inconvénient.`, `Ok`);
                      });

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
