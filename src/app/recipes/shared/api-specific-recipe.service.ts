import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Recipe } from './recipe.model';
import { Observable } from 'rxjs/Observable';
import { LocalStorageService } from 'angular-2-local-storage';
import { environment } from './../../../environments/environment';
import { LoggerService } from '../../core/logger/logger.service';
import { ImageLoaderService } from '../../core/images/image-loader.service';
import { Image } from '../../core/images/image.model';
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
    imagesUrl = `${environment.apiUrl}/recipes/image`;

    constructor(private http: HttpClient,
        private logger: LoggerService,
        private imageLoader: ImageLoaderService,
        private localStorageService: LocalStorageService) { }

    getRecipe(recipeId: string): Observable<Recipe> {
        // Parameter validation
        if (!recipeId) {
            console.error(`Invalid parameter 'recipeId' in app/recipes/shared/getRecipe: ${recipeId}`);
            return;
        }

        const url = `${environment.apiUrl}/recipes/${recipeId}`;
        // Calling the API.
        return this.http.get(url)
            .map((res: Recipe) => res);
    }

    getImage(imageURL: string): Promise<Image> {
        // Parameter validation
        if (!imageURL) {
            console.error(`Invalid parameter 'recipeId' in app/recipes/shared/getImage: ${imageURL}`);
            return;
        }

        const url = `${this.imagesUrl}/${imageURL}`;
        // Calling the API.
        return this.imageLoader.getImage(url);
    }

    addRecipe(newRecipe: Recipe) {
        // Parameter validation
        if (!newRecipe) {
            this.logger.error(`Il est impossible de créer une recette qui ne contient aucune information.`, `Ok`);
            console.error(`Invalid parameter 'newRecipe' in app/recipes/shared/addRecipe: ${newRecipe}`);
            return;
        }

        newRecipe._id = (new ObjectID()).toString();

        const url = `${environment.apiUrl}/recipe`;
        // Calling the API.
        return this.http.post(url, newRecipe)
            .subscribe((res: any) => {
                if (!res.insertWasSuccessful) {
                    this.logger.error(`Une erreur empèche la création de votre recette. Nous sommes désolé de cet inconvénient.`, `Ok`);
                }
            });
    }

    updateRecipe(idOfRecipeToUpdate: string, newRecipe: Recipe) {
        // Parameter validation
        if (!newRecipe) {
            this.logger.error(`Il est impossible de modifier une recette avec une recette qui ne contient aucune information.`, `Ok`);
            console.error(`Invalid parameter 'newRecipe' in app/recipes/shared/updateRecipe: ${newRecipe}`);
            return;
        }

        const url = `${environment.apiUrl}/recipes/${idOfRecipeToUpdate}`;
        // Calling the API.
        return this.http.post(url, newRecipe)
            .subscribe((res: any) => {
                if (!res.updateWasSuccessful) {
                    this.logger.error(`Une erreur empèche la modification de votre recette. Nous sommes désolé de cet inconvénient.`, `Ok`);
                }
            });

    }

    deleteRecipe(id: string) {
        // Parameter validation
        if (!id) {
            this.logger.error(`Identifiant de recette invalide. La suppression est annulée.`, `Ok`);
            console.error(`Invalid parameter 'id' in app/recipes/shared/deleteRecipe: ${id}`);
            return;
        }

        const userAuthId = this.getUserId();

        const url = `${environment.apiUrl}/recipes/${id}`;
        // Calling the API.
        return this.http.delete(url)
            .subscribe(() => { }, (err: HttpErrorResponse) => {
                // As of Angular 5.0, there is a bug with the HttpClient where
                if (err.status !== 200) {
                    this.logger.error(`Une erreur empèche la suppression de votre recette. Nous sommes désolés de cet inconvénient.`, `Ok`);
                }
            });

    }

    private getUserId(): string {
        // Retrieving the user id to get his own recipes.
        const user: any = this.localStorageService.get("user");

        return user ? user.authId : undefined;
    }
}
