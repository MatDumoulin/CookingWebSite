import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

import { Recipe } from "./../shared/recipe.model";
import { ApiSpecificRecipeService } from "./../shared/api-specific-recipe.service";
import { MinutesToTimeConverter } from "./../../utils/minutes-to-time-converter";

@Component({
    selector: "recipe-viewer",
    templateUrl: "recipe-viewer.html",
    styleUrls: ["recipe-viewer.css"]
})
export class RecipeViewer implements OnInit {
    recipe = new Recipe();
    isLoading = true;
    defaultImage = Recipe.DEFAULT_IMAGE;
    converter = new MinutesToTimeConverter();
    biggestSection = [];

    constructor(
        private recipeApi: ApiSpecificRecipeService,
        private dialogRef: MatDialogRef<RecipeViewer>,
        @Inject(MAT_DIALOG_DATA) private data: any
    ) {}

    ngOnInit() {
        this.recipe = this.data.recipe;
        this.isLoading = false;
        this.biggestSection = this.getBiggestSection();
        // If the image comes from the database, get it.
        if (this.recipe.image) {
            this.getImage();
        }
    }

    convertToTime(minutes: number): string {
        return this.converter.getTime(minutes);
    }

    getImage() {
        this.recipeApi.getImage(this.recipe.image).then(image => {
            this.recipe.fullImage = image.displayableImage;
        });
    }

    private getBiggestSection() {
        if (
            this.recipe.ingredientSection.length >=
            this.recipe.stepSection.length
        ) {
            return this.recipe.ingredientSection;
        } else {
            return this.recipe.stepSection;
        }
    }

    closeDialog() {
        this.dialogRef.close();
    }
}
