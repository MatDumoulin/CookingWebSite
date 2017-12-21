import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

import { Recipe } from './../shared/recipe.model';
import { Genres } from './../genre/shared/genre.service';
import { ApiSpecificRecipeService } from './../shared/api-specific-recipe.service';
import { RecipesService } from './../shared/recipes.service';
import { MinutesToTimeConverter } from './../../utils/minutes-to-time-converter';

@Component({
  selector: 'recipe-creator',
  templateUrl: 'recipe-creator.html',
  styleUrls: ['recipe-creator.css']
})
export class RecipeCreator{
  recipe = new Recipe();
  originalRecipe:Recipe; // Keeping a copy of the recipe before modification.
  GENRES = Genres.get();
  NUMBER_OF_TABS = 2;
  selectedTab = 0;
  displayedImage = Recipe.DEFAULT_IMAGE;
  converter = new MinutesToTimeConverter();
  // Text to display wether we are on edit or create mode.
  isEdit: boolean;
  finishButtonText = "Créer";
  windowTitle = "Création d'une recette";
  isImageLoaded = false;

  constructor(private dialogRef: MatDialogRef<RecipeCreator>,
              private snackBar: MatSnackBar,
              public sanitizer: DomSanitizer,
              private recipeApi:ApiSpecificRecipeService,
              private recipesService:RecipesService,
              @Inject(MAT_DIALOG_DATA) private data: any) {}

  ngOnInit() {
    this.isEdit = this.data;
    // If the window has been open to edit a recipe.
    if(this.isEdit) {
      // Fetch the full recipe from the api.
      this.finishButtonText = "Modifier";
      this.windowTitle = "Modification d'une recette";

      this.recipeApi.getRecipe(this.data.recipeId)
                    .subscribe(recipe => {
                      this.recipe = recipe;
                      if(recipe.image) {
                        this.loadImage()
                            .then(() => this.originalRecipe = this.recipe);
                      }
                      else {
                        this.recipe.fullImage = Recipe.DEFAULT_IMAGE;
                      }
                    });
    }
    // else, the window is already set up for recipe creation.
  }

  goToNextTab() {
    this.selectedTab++;
  }

  createRecipe() {
    if(this.recipe.fullImage == Recipe.DEFAULT_IMAGE) {
      this.recipe.fullImage = null;
    }
    this.recipesService.addRecipe(this.recipe);
    this.closeDialog();
  }

  updateRecipe() {
    if(this.recipe.fullImage == Recipe.DEFAULT_IMAGE) {
      this.recipe.fullImage = null;
    }
    this.recipesService.updateRecipe(this.recipe._id, this.recipe);
    this.closeDialog();
  }

  deleteRecipe() {
    this.recipesService.deleteRecipe(this.recipe._id);
    this.closeDialog();

    // Displaying a message to indicate that the recipe was removed.
    let snackBarRef = this.snackBar.open('La recette a été supprimée', 'Annuler', { duration: 3000 });
    snackBarRef.onAction().subscribe(() => {
      if(this.recipe.fullImage == Recipe.DEFAULT_IMAGE) {
        this.recipe.fullImage = null;
      }
      this.recipesService.addRecipe(this.originalRecipe);
    });
  }

  updateImage(fileInput: any): void {
    if (fileInput.target.files && fileInput.target.files[0]) {
      this.readImage(fileInput.target.files[0]);
    }
  }

  private loadImage() : Promise<boolean> {
    return new Promise( (resolve, reject) => {
      this.recipeApi.getImage(this.recipe.image)
                    .subscribe(image => {
                        this.readImage(image)
                          .then(() => resolve());
                    });
    });
  }

  // This is needed to convert an image from a blob into a readable format
  // for the image tag.
  private readImage(imageFile:any): Promise<boolean> {
    return new Promise( (resolve, reject) => {

      const displayedImageReader = new FileReader();
      // When the file is completly converted to a readable format
      displayedImageReader.onload = ((e) => {
        this.recipe.fullImage = e.target['result'];
        resolve();
      });

      displayedImageReader.readAsDataURL(imageFile);
      resolve();
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
