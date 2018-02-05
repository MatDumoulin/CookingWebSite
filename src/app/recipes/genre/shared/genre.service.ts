import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiGetRecipesService } from '../../shared/api-get-recipes.service';

/*
 * Gives a list of all the possible genres for a recipe.
 */
@Injectable()
export class GenresService {
  private _genres = new BehaviorSubject<string[]>([]);

  constructor(private api: ApiGetRecipesService) {
    this.fetchGenres();
  }

  get genres() {
    return this._genres;
  }

  private fetchGenres(): void {
    this.api.getGenres().subscribe(
      genres => this._genres.next(genres),
      err => console.log("An error occurred while fetching the recipe types."));
  }

  public getGenres() {
    return this._genres.getValue();
  }
}
