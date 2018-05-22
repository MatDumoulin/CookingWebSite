import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import 'hammerjs'; // To support gestures.
import { LocalStorageModule } from 'angular-2-local-storage'; // To access HTML5 LocalStorage's features
import { NgMdTimeInputModule } from 'ng-md-time-input';
// NgRx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// Custom modules
import { AngularMaterialModule } from './angular-material.module';
import { CoreModule } from './core/core.module';
import { RoutingModule } from './routing/routing.module';
import { RecipeViewerModule } from './recipes/recipe-viewer/recipe-viewer.module';
/* import { RecipeCreatorModule } from './recipes/recipe-creator/recipe-creator.module'; */
import { ControlsModule } from './controls/controls.module';
// Components
import { AppComponent } from './app.component';
import { AdvancedRecipeSearchComponent } from './search/advanced-recipe-search/advanced-recipe-search.component';
import { AdvancedRecipeSearchModule } from './search/advanced-recipe-search/advanced-recipe-search.module';
import { EquipmentListBox } from './recipes/equipment/equipment-listbox/equipment-listbox.component';
import { EquipmentListItem } from './recipes/equipment/equipment-listitem/equipment-listitem.component';
import { HomePage } from './pages/home-page/home-page.component';
import { IngredientListboxModule } from './recipes/ingredients/ingredient-listbox/ingredient-listbox.module';
import { IngredientSectionComponent } from './recipes/ingredients/ingredient-section/ingredient-section.component';
import { IngredientSectionWrapper } from './recipes/ingredients/ingredient-section-wrapper/ingredient-section-wrapper.component';
import { IntroPage } from './pages/intro-page/intro-page.component';
import { LoginPage } from './pages/login-page/login-page.component';
import { RecipePageComponent } from './pages/recipe-page/recipe-page.component';
/* import { RecipeCreator } from './recipes/recipe-creator/recipe-creator.component'; */
import { RecipeCreatorComponent } from './pages/recipe-creator/recipe-creator.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeViewer } from './recipes/recipe-viewer/recipe-viewer.component';
import { StepListbox } from './recipes/steps/step-listbox/step-listbox.component';
import { StepSectionComponent } from './recipes/steps/step-section/step-section.component';
import { StepSectionWrapper } from './recipes/steps/step-section-wrapper/step-section-wrapper.component';
import { TopNav } from './top-nav/top-nav.component';
// Services
import { ApiGetRecipesService } from './recipes/shared/api-get-recipes.service';
import { ApiSpecificRecipeService } from './recipes/shared/api-specific-recipe.service';
import { GenresService } from './recipes/genre/shared/genre.service';
import { RecipesService } from './recipes/shared/recipes.service';
import { TokenInterceptor } from './core/authentication/auth-http-interceptor.service';
// Others
import { environment } from '../environments/environment';
import { routing } from './app.routes';
import { UtilsModule } from './utils/utils.module';
import { SidenavContentComponent } from './sidenav-content/sidenav-content.component';


@NgModule({
    declarations: [
        AppComponent,
        HomePage,
        IntroPage,
        LoginPage,
        RecipeCreatorComponent,
        RecipeListComponent,
        RecipePageComponent,
        TopNav,
        IngredientSectionComponent,
        IngredientSectionWrapper,
        StepListbox,
        StepSectionComponent,
        StepSectionWrapper,
        EquipmentListBox,
        EquipmentListItem,
        SidenavContentComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule, // To enable animations for angular-material.
        FormsModule,             // ngModel
        ReactiveFormsModule,
        HttpClientModule,
        AngularMaterialModule,
        RoutingModule,
        RouterModule,
        routing,
        LocalStorageModule.withConfig({
            prefix: 'mycookingbook',
            storageType: 'sessionStorage',
            notifyOptions: { setItem: true, removeItem: true }
        }),
        CoreModule,
        ControlsModule,
        RecipeViewerModule,
        /* RecipeCreatorModule, */
        AdvancedRecipeSearchModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
            logOnly: environment.production // Restrict extension to log-only mode
        }),
        UtilsModule,
        IngredientListboxModule,
        NgMdTimeInputModule
    ],
    entryComponents: [
        RecipeViewer,
        /* RecipeCreator, */
        AdvancedRecipeSearchComponent
    ],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
        ApiGetRecipesService, ApiSpecificRecipeService, RecipesService, GenresService],
    bootstrap: [AppComponent]
})
export class AppModule { }
