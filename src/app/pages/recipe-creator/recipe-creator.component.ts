import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Recipe } from '../../recipes/shared/recipe.model';
import { ApiSpecificRecipeService } from '../../recipes/shared/api-specific-recipe.service';
import { RecipesService } from '../../recipes/shared/recipes.service';
import { ImageLoaderService } from '../../core/images/image-loader.service';
import { ENTER, COMMA } from '@angular/cdk/keycodes';

@Component({
    selector: 'mcb-recipe-creator',
    templateUrl: 'recipe-creator.component.html',
    styleUrls: ['recipe-creator.component.css']
})
export class RecipeCreatorComponent implements OnInit {
    recipe = new Recipe();
    originalRecipe: Recipe; // Keeping a copy of the recipe before modification.
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
        private recipeApi: ApiSpecificRecipeService,
        private recipesService: RecipesService,
        private imageLoader: ImageLoaderService) { }

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
        this.recipesService.addRecipe(this.recipe);
        this.closeDialog();
    }

    updateRecipe() {
        if (this.recipe.fullImage === Recipe.DEFAULT_IMAGE) {
            this.recipe.fullImage = null;
        }
        this.recipesService.updateRecipe(this.recipe._id, this.recipe);
        this.closeDialog();
    }

    deleteRecipe() {
        this.recipesService.deleteRecipe(this.recipe._id);
        this.closeDialog();

        // Displaying a message to indicate that the recipe was removed.
        const snackBarRef = this.snackBar.open('La recette a été supprimée', 'Annuler', { duration: 3000 });
        snackBarRef.onAction().subscribe(() => {
            if (this.recipe.fullImage === Recipe.DEFAULT_IMAGE) {
                this.recipe.fullImage = null;
            }

            this.recipesService.addRecipe(this.originalRecipe);
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

    closeDialog() {
        // this.dialogRef.close();
    }
}
