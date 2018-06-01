import { Component, Inject, OnInit, OnDestroy } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { ApiSpecificRecipeService } from "../../recipes/shared/api-specific-recipe.service";
import { RecipesService } from "../../recipes/shared/recipes.service";
/* import { ImageLoaderService } from "../../core/images/image-loader.service"; */
/* import { ENTER, COMMA } from '@angular/cdk/keycodes'; */
/* // Moment
import { Duration } from 'moment';
import * as moment from 'moment'; */
// Rxjs
import { Observable, Subscription } from "rxjs";
// Ngrx Store
import { Store } from "@ngrx/store";
import * as fromStore from "../../core/store";
// Models
import { Recipe } from "../../recipes/shared/recipe.model";

@Component({
    selector: "mcb-recipe-creator",
    templateUrl: "recipe-creator.component.html",
    styleUrls: ["recipe-creator.component.css"]
})
export class RecipeCreatorComponent implements OnInit, OnDestroy {
    recipe$: Observable<Recipe>;
    originalRecipe: Recipe; // Keeping a copy of the recipe before modification.
    isImageLoaded = false;
    displayedImage: string;
    private subscriptions: Subscription[] = [];

    constructor(
        private snackBar: MatSnackBar,
        /* private imageLoader: ImageLoaderService ,*/
        private store: Store<fromStore.DataState>
    ) {}

    ngOnInit() {
        this.recipe$ = this.store.select(fromStore.getSelectedRecipe);

        /* TODO: Load image async

        this.subscriptions.push(
            this.recipe$.subscribe(selectedRecipe => {
                if (recipe.image) {
                    this.recipeApi.getImage(this.recipe.image).then(image => {
                        this.recipe.fullImage = image.imageString;
                        this.displayedImage = image.displayableImage;
                        // Waiting for the full image to be loaded before saving the original recipe.
                        this.originalRecipe = this.recipe;
                    });
                } else {
                    this.recipe.fullImage = Recipe.DEFAULT_IMAGE;
                    this.originalRecipe = this.recipe;
                }
            })
        ); */
    }

    ngOnDestroy() {
        for (const sub of this.subscriptions) {
            sub.unsubscribe();
        }
    }

    createRecipe(recipe: Recipe): void {
        if (recipe.fullImage === Recipe.DEFAULT_IMAGE) {
            recipe.fullImage = null;
        }
        // this.recipesService.addRecipe(this.recipe);
        this.store.dispatch(new fromStore.CreateRecipe(recipe));
        this.closeDialog();
    }

    updateRecipe(recipe: Recipe): void {
        if (recipe.fullImage === Recipe.DEFAULT_IMAGE) {
            recipe.fullImage = null;
        }

        this.store.dispatch(new fromStore.UpdateRecipe(recipe));
        this.closeDialog();
    }

    deleteRecipe(recipe: Recipe): void {
        alert("TODO: Delete recipe with ngrx");
        // this.recipesService.deleteRecipe(this.recipe._id);
        this.closeDialog();

        // Displaying a message to indicate that the recipe was removed.
        const snackBarRef = this.snackBar.open(
            "La recette a été supprimée",
            "Annuler",
            { duration: 3000 }
        );
        snackBarRef.onAction().subscribe(() => {
            // if (this.recipe.fullImage === Recipe.DEFAULT_IMAGE) {
            //   this.recipe.fullImage = null;
            // }
            // this.recipesService.addRecipe(this.originalRecipe);
        });
    }

    closeDialog() {
        // this.dialogRef.close();
    }
}
