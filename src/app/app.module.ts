import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// Angular Material Module. This module imports all needed material components.
// See https://material.angular.io/guide/getting-started for more information.
import { AngularMaterialModule } from './angular-material.module';
import 'hammerjs'; // To support gestures.
// Custom components/services made for this app.
import { RecipeList } from './recipes/recipe-list/recipe-list.component';
import { GetRecipesApiService } from './recipes/shared/get-recipes-api.service';
import { RecipesService } from './recipes/shared/recipes.service';
import { StarRatingModule } from './star-rating/star-rating.module';

@NgModule({
  declarations: [
    RecipeList
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // To enable animations for angular-material.
    FormsModule,             // ngModel
    HttpModule,
    AngularMaterialModule,
    StarRatingModule
  ],
  providers: [ GetRecipesApiService, RecipesService ],
  bootstrap: [RecipeList]
})
export class AppModule { }
