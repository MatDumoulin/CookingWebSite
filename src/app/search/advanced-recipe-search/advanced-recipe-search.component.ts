import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { GenresService } from '../../recipes/genre/shared/genre.service';
import { Ingredient } from '../../recipes/ingredients/shared/ingredient.model';

@Component({
  selector: 'app-advanced-recipe-search',
  templateUrl: './advanced-recipe-search.component.html',
  styleUrls: ['./advanced-recipe-search.component.css']
})
export class AdvancedRecipeSearchComponent implements OnInit {
  searchCriteria = {
    name: "",
    ingredients: [],
    genre: "",
    rating: 0,
    totalTime: 0,
    wantsName: false,
    wantsIngredient: [],
    wantsGenre: false,
    wantsRating: false,
    wantsTotalTime: false
  };

  genres: string[];

  constructor(private dialogRef: MatDialogRef<AdvancedRecipeSearchComponent>,
              private genresService: GenresService) { }

  ngOnInit() {
    // Subscribing to the needed data stores
    this.genresService.genres.subscribe(genres => this.genres = genres);

    this.addIngredient();
  }

  addIngredient() {
    this.searchCriteria.ingredients.push({name:"", include:true});
    this.searchCriteria.wantsIngredient.push(false);
  }

  removeIngredient(index: number) {
    this.searchCriteria.ingredients.splice(index, 1);
  }

  validateRating() {
    if(this.searchCriteria.rating <= 0) {
      this.searchCriteria.rating = 1;
    }
  }

  search() {
    // First of, we need to get the search intent, which is a clean version of
    // the search criteria. Since it goes throught the network, we need to only keep the minimum.
    let searchIntent = {
      name:null,
      genre:null,
      rating:null,
      totalTime:null,
      ingredients: []
    };

    if(this.searchCriteria.wantsName) {
      searchIntent.name = this.searchCriteria.name;
    }

    if(this.searchCriteria.wantsGenre) {
      searchIntent.genre = this.searchCriteria.genre;
    }

    if(this.searchCriteria.wantsRating) {
      searchIntent.rating = this.searchCriteria.rating;
    }

    if(this.searchCriteria.wantsTotalTime) {
      searchIntent.totalTime = this.searchCriteria.totalTime;
    }

    for(var i = 0; i < this.searchCriteria.ingredients.length; ++i) {
      if(this.searchCriteria.wantsIngredient[i]) {
        searchIntent.ingredients.push(this.searchCriteria.ingredients[i]);
      }
    }

    this.closeDialog(searchIntent);
  }

  isOneSearchCriterionActive() {
    let atLeastOneIngredientToSearch = false;

    for(var i = 0; i < this.searchCriteria.ingredients.length && !atLeastOneIngredientToSearch; ++i) {
      if(this.searchCriteria.wantsIngredient[i]) {
        atLeastOneIngredientToSearch = true;
      }
    }

    // At least one criterion must be active
    return this.searchCriteria.wantsName || this.searchCriteria.wantsGenre ||
           this.searchCriteria.wantsRating || this.searchCriteria.wantsTotalTime ||
           atLeastOneIngredientToSearch;
  }

  closeDialog(closeValue?) {
    this.dialogRef.close(closeValue);
  }

}
