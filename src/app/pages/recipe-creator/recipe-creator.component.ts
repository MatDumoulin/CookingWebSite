import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Recipe } from '../../recipes/shared/recipe.model';
import { ApiSpecificRecipeService } from '../../recipes/shared/api-specific-recipe.service';
import { RecipesService } from '../../recipes/shared/recipes.service';
import { ImageLoaderService } from '../../core/images/image-loader.service';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
// Moment
import { Duration } from 'moment';
import * as moment from 'moment';
// Ngrx Store
import { Store } from '@ngrx/store';
import * as fromStore from '../../core/store';

@Component({
    selector: 'mcb-recipe-creator',
    templateUrl: 'recipe-creator.component.html',
    styleUrls: ['recipe-creator.component.css']
})
export class RecipeCreatorComponent implements OnInit {
    recipe = new Recipe();
    originalRecipe: Recipe; // Keeping a copy of the recipe before modification.
    prepDuration: Duration;
    cookDuration: Duration;
    cooldownDuration: Duration;
    NUMBER_OF_TABS = 2;
    selectedTab = 0;
    displayedImage = Recipe.DEFAULT_IMAGE;
    // Text to display wether we are on edit or create mode.
    isEdit: boolean;
    finishButtonText = "Créer";
    windowTitle = "Création de la recette";
    isImageLoaded = false;
    // Tag chip list
    separatorKeysCodes = [ENTER, COMMA];

    constructor(private snackBar: MatSnackBar,
        private imageLoader: ImageLoaderService,
        private store: Store<fromStore.DataState>) { }

    ngOnInit() {
        this.isEdit = false;
        // If the window has been open to edit a recipe.
        if (this.isEdit) {
            // Fetch the full recipe from the api.
            /* this.finishButtonText = "Modifier";
            this.windowTitle = "Modification d'une recette";

            this.recipeApi.getRecipe(this.data.recipeId)
                .subscribe(recipe => {
                    this.recipe = recipe;
                    if (recipe.image) {
                        this.recipeApi.getImage(this.recipe.image)
                            .then((image) => {
                                this.recipe.fullImage = image.imageString;
                                this.displayedImage = image.displayableImage;
                                // Waiting for the full image to be loaded before saving the original recipe.
                                this.originalRecipe = this.recipe;
                            });
                    }
                    else {
                        this.recipe.fullImage = Recipe.DEFAULT_IMAGE;
                        this.originalRecipe = this.recipe;
                    }
                }); */
        }
        // else, the window is already set up for recipe creation.
    }

    goToNextTab() {
        this.selectedTab++;
    }

    addTag(event) {
        const input = event.input;
        const value = event.value;

        // Add our tag
        if ((value || '').trim()) {
            this.recipe.tags.push(value.trim());
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }
    }

    removeTag(tagToDelete) {
        const indexOfTag = this.recipe.tags.findIndex(tag => tag === tagToDelete);
        this.recipe.tags.splice(indexOfTag, 1); // Removing the recipe from the list.
    }

    createRecipe() {
        if (this.recipe.fullImage === Recipe.DEFAULT_IMAGE) {
            this.recipe.fullImage = null;
        }
        // this.recipesService.addRecipe(this.recipe);
        this.store.dispatch(new fromStore.CreateRecipe(this.recipe));
        this.closeDialog();
    }

    updateRecipe() {
        if (this.recipe.fullImage === Recipe.DEFAULT_IMAGE) {
            this.recipe.fullImage = null;
        }
        // this.recipesService.updateRecipe(this.recipe._id, this.recipe);
        this.closeDialog();
    }

    deleteRecipe() {
        // this.recipesService.deleteRecipe(this.recipe._id);
        this.closeDialog();

        // Displaying a message to indicate that the recipe was removed.
        const snackBarRef = this.snackBar.open('La recette a été supprimée', 'Annuler', { duration: 3000 });
        snackBarRef.onAction().subscribe(() => {
            if (this.recipe.fullImage === Recipe.DEFAULT_IMAGE) {
                this.recipe.fullImage = null;
            }

            // this.recipesService.addRecipe(this.originalRecipe);
        });
    }

    updateImage(fileInput: any): void {
        if (fileInput.target.files && fileInput.target.files[0]) {
            this.imageLoader.readImage(fileInput.target.files[0])
                .then((image) => {
                    this.recipe.fullImage = image.imageString;
                    this.displayedImage = image.displayableImage;
                });
        }
    }

    updatePrepDuration(): void {
        if (this.prepDuration && moment.isDuration(this.prepDuration)) {
            this.recipe.prepTime = this.prepDuration.asMinutes();
        }
        else {
            this.recipe.prepTime = 0;
        }
    }

    updateCookDuration(): void {
        if (this.cookDuration && moment.isDuration(this.cookDuration)) {
            this.recipe.cookTime = this.cookDuration.asMinutes();
        }
        else {
            this.recipe.cookTime = 0;
        }
    }

    updateCooldownDuration(): void {
        if (this.cooldownDuration && moment.isDuration(this.cooldownDuration)) {
            this.recipe.cooldownTime = this.cooldownDuration.asMinutes();
        }
        else {
            this.recipe.cooldownTime = 0;
        }
    }

    closeDialog() {
        // this.dialogRef.close();
    }
}
