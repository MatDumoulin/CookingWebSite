import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ENTER, COMMA } from "@angular/cdk/keycodes";
// Moment
import { Duration } from "moment";
import * as moment from "moment";
// Models
import { Recipe } from "../../../recipes/shared/recipe.model";
// Services
import { ImageLoaderService } from "../../../core/images/image-loader.service";


@Component({
    selector: "mcb-recipe-creator-form",
    templateUrl: "./recipe-creator-form.component.html",
    styleUrls: ["./recipe-creator-form.component.css"]
})
export class RecipeCreatorFormComponent implements OnInit {
    private _recipe = new Recipe();
    displayedImage = Recipe.DEFAULT_IMAGE;
    prepDuration: Duration;
    cookDuration: Duration;
    cooldownDuration: Duration;
    NUMBER_OF_TABS = 2;
    selectedTab = 0;
    isEdit: boolean;
    finishButtonText = "Créer";
    windowTitle = "Création de la recette";
    // Tag chip list
    separatorKeysCodes = [ENTER, COMMA];

    @Input()
    set recipe(recipe: Recipe) {
        if (recipe) {
            this._recipe = recipe;
            this.setToEditMode();
        } else {
            this._recipe = new Recipe();
            this.setToCreateMode();
        }
    }
    get recipe(): Recipe {
        return this._recipe;
    }

    @Output() createRecipe = new EventEmitter<Recipe>();
    @Output() updateRecipe = new EventEmitter<Recipe>();
    @Output() deleteRecipe = new EventEmitter<Recipe>();


    constructor(private imageLoader: ImageLoaderService) {}

    ngOnInit() {}

    setToEditMode(): void {
        this.isEdit = true;
        this.finishButtonText = "Modifier";
        this.windowTitle = "Modification d'une recette";
    }

    setToCreateMode(): void {
        this.isEdit = false;
        this.finishButtonText = "Créer";
        this.windowTitle = "Création de la recette";
    }

    goToNextTab() {
        this.selectedTab++;
    }

    addTag(event) {
        const input = event.input;
        const value = event.value;

        // Add our tag
        if ((value || "").trim()) {
            this.recipe.tags.push(value.trim());
        }

        // Reset the input value
        if (input) {
            input.value = "";
        }
    }

    removeTag(tagToDelete) {
        const indexOfTag = this.recipe.tags.findIndex(
            tag => tag === tagToDelete
        );
        this.recipe.tags.splice(indexOfTag, 1); // Removing the recipe from the list.
    }

    updatePrepDuration(): void {
        if (this.prepDuration && moment.isDuration(this.prepDuration)) {
            this.recipe.prepTime = this.prepDuration.asMinutes();
        } else {
            this.recipe.prepTime = 0;
        }
    }

    updateCookDuration(): void {
        if (this.cookDuration && moment.isDuration(this.cookDuration)) {
            this.recipe.cookTime = this.cookDuration.asMinutes();
        } else {
            this.recipe.cookTime = 0;
        }
    }

    updateCooldownDuration(): void {
        if (this.cooldownDuration && moment.isDuration(this.cooldownDuration)) {
            this.recipe.cooldownTime = this.cooldownDuration.asMinutes();
        } else {
            this.recipe.cooldownTime = 0;
        }
    }

    updateImage(fileInput: any): void {
        if (fileInput.target.files && fileInput.target.files[0]) {
            this.imageLoader
                .readImage(fileInput.target.files[0])
                .then(image => {
                    // this.recipe.fullImage = image.imageString;
                    this.displayedImage = image.displayableImage;
                });
        }
    }

    onCreateRecipe() {
        this.createRecipe.emit(this.recipe);
    }

    onUpdateRecipe() {
        this.updateRecipe.emit(this.recipe);
    }

    onDeleteRecipe() {
        this.deleteRecipe.emit(this.recipe);
    }


}
