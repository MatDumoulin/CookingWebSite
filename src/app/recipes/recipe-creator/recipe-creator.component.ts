import { Component, OnInit, Inject} from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { Recipe } from './../shared/recipe.model';
import { Genres } from './../genre/shared/genre.service';
import { ApiGetRecipesService } from './../shared/api-get-recipes.service';
import { MinutesToTimeConverter } from './../../utils/minutes-to-time-converter';

@Component({
  selector: 'recipe-creator',
  templateUrl: 'recipe-creator.html',
  styleUrls: ['recipe-creator.css']
})
export class RecipeCreator{
  recipe = new Recipe();
  GENRES = Genres.get();
  image = [];
  converter = new MinutesToTimeConverter();

  constructor(private dialogRef: MdDialogRef<RecipeCreator>, private ApiGetRecipesService:ApiGetRecipesService) {}

  ngOnInit() {

  }

  createRecipe() {
    alert("Creation...");
    this.closeDialog();
  }

  updateImage(fileInput: any): void {
    console.log(fileInput.target.files);

    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();

      reader.onload = ((e) => {
        this.image = e.target['result'];
      });

      reader.readAsArrayBuffer(fileInput.target.files[0]);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
