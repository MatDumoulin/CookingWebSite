import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
// Angular Material Module. This module imports all needed material components.
// See https://material.angular.io/guide/getting-started for more information.
import { AngularMaterialModule } from './angular-material.module';
import 'hammerjs'; // To support gestures.
// Routes for the app
import { routing } from './app.routes';
// Custom components/services made for this app.
import { CoreModule } from './core/core.module';
import { App } from './app.component';
import { HomePage } from './pages/home-page/home-page.component';
import { RecipePage } from './pages/recipe-page/recipe-page.component';
import { TopNav } from './top-nav/top-nav.component';
import { RecipeList } from './recipes/recipe-list/recipe-list.component';
import { ApiGetRecipesService } from './recipes/shared/api-get-recipes.service';
import { ApiSpecificRecipeService } from './recipes/shared/api-specific-recipe.service';
import { RecipesService } from './recipes/shared/recipes.service';
import { StarRatingModule } from './controls/star-rating/star-rating.module';
import { RecipeViewerModule } from './recipes/recipe-viewer/recipe-viewer.module';
import { RecipeViewer } from './recipes/recipe-viewer/recipe-viewer.component';
import { RecipeCreatorModule } from './recipes/recipe-creator/recipe-creator.module';
import { RecipeCreator } from './recipes/recipe-creator/recipe-creator.component';


@NgModule({
  declarations: [
    HomePage,
    RecipePage,
    TopNav,
    RecipeList,
    App
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // To enable animations for angular-material.
    FormsModule,             // ngModel
    HttpModule,
    AngularMaterialModule,
    RouterModule,
    routing,
    CoreModule,
    StarRatingModule,
    RecipeViewerModule,
    RecipeCreatorModule
  ],
  entryComponents: [
    RecipeViewer,
    RecipeCreator
  ],
  providers: [ ApiGetRecipesService, ApiSpecificRecipeService, RecipesService ],
  bootstrap: [App]
})
export class AppModule { }
