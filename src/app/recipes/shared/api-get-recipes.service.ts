import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Recipe } from './recipe.model';
import { Observable } from 'rxjs/Observable';
import { environment } from './../../../environments/environment';
import { LoggerService } from '../../core/logger/logger.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { map, catchError } from 'rxjs/operators';
import { empty } from 'rxjs/observable/empty';

@Injectable()
export class ApiGetRecipesService {

    constructor(private http: HttpClient,
        private logger: LoggerService,
        private localStorageService: LocalStorageService) { }

    getRecipes(from: number, to: number): Observable<Recipe[]> {
        const url = `${environment.apiUrl}/recipes?filter=&from=${from}&to=${to}`;

        return this.http.get<Recipe[]>(url);
    }

    advancedSearch(searchIntention) {
        // Parameter validation
        if (searchIntention == null) {
            console.error("Invalid parameter 'searchIntention' in app.recipes.shared.advancedSearch: " + searchIntention);
            return;
        }

        const url = `${environment.apiUrl}/recipes/advanced`;

        // Fetching the API.
        return this.http.post(url, searchIntention).pipe(
            catchError((err: HttpErrorResponse) => {
                this.logger.error(`Une erreur de réseau empèche la recherche avancée. Nous sommes désolé de cet inconvénient.`, `Ok`);

                return empty();
            })
        );

    }

    getMatchingIngredientNames(ingredientName: string): Observable<string[]> {
        ingredientName = ingredientName || "";

        const url = `${environment.apiUrl}/recipes/ingredients`;

        return this.http.get(url, { params: { filter: ingredientName } }).pipe(
            map((ingredients: Array<any>) => ingredients.map((ingredient: any) => ingredient.name))
        );
    }

    getMatchingRecipeNames(recipeName: string): Observable<string[]> {
        recipeName = recipeName || "";

        const url = `${environment.apiUrl}/recipes/names`;

        return this.http.get(url, { params: { filter: recipeName } }).pipe(
            map((recipes: Array<any>) => {
                return recipes.map((recipe: any) => recipe.name);
            })
        );
    }

    getGenres() {
        const url = `${environment.apiUrl}/recipes/genres`;

        return this.http.get<string[]>(url);
    }
}
