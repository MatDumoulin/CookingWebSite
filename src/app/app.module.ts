import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
// Angular Material Module. This module imports all needed material components.
// See https://material.angular.io/guide/getting-started for more information.
import { AngularMaterialModule } from './angular-material.module';
import 'hammerjs'; // To support gestures.
// To access HTML5 LocalStorage's features
import { LocalStorageModule } from 'angular-2-local-storage';
// Routes for the app
import { routing } from './app.routes';
// Custom components/services made for this app.
import { CoreModule } from './core/core.module';
import { App } from './app.component';
import { IntroPage } from './pages/intro-page/intro-page.component';
import { HomePage } from './pages/home-page/home-page.component';
import { RecipePage } from './pages/recipe-page/recipe-page.component';
import { TopNav } from './top-nav/top-nav.component';
import { RecipeList } from './recipes/recipe-list/recipe-list.component';
import { ApiGetRecipesService } from './recipes/shared/api-get-recipes.service';
import { ApiSpecificRecipeService } from './recipes/shared/api-specific-recipe.service';
import { RecipesService } from './recipes/shared/recipes.service';
import { GenresService } from './recipes/genre/shared/genre.service';
import { StarRatingModule } from './controls/star-rating/star-rating.module';
import { RecipeViewerModule } from './recipes/recipe-viewer/recipe-viewer.module';
import { RecipeViewer } from './recipes/recipe-viewer/recipe-viewer.component';
import { RecipeCreatorModule } from './recipes/recipe-creator/recipe-creator.module';
import { RecipeCreator } from './recipes/recipe-creator/recipe-creator.component';
import { AdvancedRecipeSearchModule } from './search/advanced-recipe-search/advanced-recipe-search.module';
import { AdvancedRecipeSearchComponent } from './search/advanced-recipe-search/advanced-recipe-search.component';
import { LoginPage } from './pages/login-page/login-page.component';
import { TokenInterceptor } from './core/authentication/auth-http-interceptor.service'


@NgModule({
  declarations: [
    IntroPage,
    HomePage,
    RecipePage,
    TopNav,
    RecipeList,
    App,
    LoginPage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // To enable animations for angular-material.
    FormsModule,             // ngModel
    ReactiveFormsModule,
    HttpClientModule,
    AngularMaterialModule,
    RouterModule,
    routing,
    LocalStorageModule.withConfig({
            prefix: 'mycookingbook',
            storageType: 'sessionStorage',
            notifyOptions : {setItem: true, removeItem:true}
        }),
    CoreModule,
    StarRatingModule,
    RecipeViewerModule,
    RecipeCreatorModule,
    AdvancedRecipeSearchModule
  ],
  entryComponents: [
    RecipeViewer,
    RecipeCreator,
    AdvancedRecipeSearchComponent
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
               ApiGetRecipesService, ApiSpecificRecipeService, RecipesService, GenresService],
  bootstrap: [App]
})
export class AppModule { }
