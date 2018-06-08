import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';
// Components
import { AdvancedRecipeSearchComponent } from "../search/advanced-recipe-search/advanced-recipe-search.component";
import { AdvancedRecipeSearchModule } from "../search/advanced-recipe-search/advanced-recipe-search.module";
import { EquipmentListBox } from "../recipes/equipment/equipment-listbox/equipment-listbox.component";
import { EquipmentListItem } from "../recipes/equipment/equipment-listitem/equipment-listitem.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { IngredientListboxModule } from "../recipes/ingredients/ingredient-listbox/ingredient-listbox.module";
import { IngredientSectionComponent } from "../recipes/ingredients/ingredient-section/ingredient-section.component";
import { IngredientSectionWrapper } from "../recipes/ingredients/ingredient-section-wrapper/ingredient-section-wrapper.component";
import { IntroPageComponent } from "./intro-page/intro-page.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { RecipeCreatorComponent } from "./recipe-creator/recipe-creator.component";
import { RecipeListComponent } from "../recipes/recipe-list/recipe-list.component";
import { RecipePageComponent } from "./recipe-page/recipe-page.component";
import { StepListbox } from "../recipes/steps/step-listbox/step-listbox.component";
import { StepSectionComponent } from "../recipes/steps/step-section/step-section.component";
import { StepSectionWrapper } from "../recipes/steps/step-section-wrapper/step-section-wrapper.component";
// Modules
import { AngularMaterialModule } from "../angular-material.module";
import { ControlsModule } from "../controls/controls.module";
import { CoreModule } from "../core/core.module";
import { UtilsModule } from "../utils/utils.module";
// Services
import { ApiGetRecipesService } from "../recipes/shared/api-get-recipes.service";
import { ApiSpecificRecipeService } from "../recipes/shared/api-specific-recipe.service";
import { GenresService } from "../recipes/genre/shared/genre.service";
import { RecipeCreatorFormComponent } from './recipe-creator/recipe-creator-form/recipe-creator-form.component';
import { RecipeViewerComponent } from './recipe-viewer/recipe-viewer.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
    imports: [
        AdvancedRecipeSearchModule,
        AngularMaterialModule,
        BrowserModule,
        CommonModule,
        ControlsModule,
        CoreModule,
        FormsModule, // ngModel
        IngredientListboxModule,
        ReactiveFormsModule,
        RouterModule,
        UtilsModule
    ],
    declarations: [
        EquipmentListBox,
        EquipmentListItem,
        HomePageComponent,
        IngredientSectionComponent,
        IngredientSectionWrapper,
        IntroPageComponent,
        LoginPageComponent,
        RecipeCreatorComponent,
        RecipeListComponent,
        RecipePageComponent,
        StepListbox,
        StepSectionComponent,
        StepSectionWrapper,
        RecipeCreatorFormComponent,
        RecipeViewerComponent,
        NotFoundComponent
    ],
    exports: [
        AngularMaterialModule,
        BrowserModule,
        CommonModule,
        ControlsModule,
        CoreModule,
        FormsModule, // ngModel,
        ReactiveFormsModule
    ],
    entryComponents: [AdvancedRecipeSearchComponent],
    providers: [
        ApiGetRecipesService,
        ApiSpecificRecipeService,
        GenresService
    ]
})
export class PagesModule {}
