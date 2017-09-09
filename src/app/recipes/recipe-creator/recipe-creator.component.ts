import { Component, Inject} from '@angular/core';
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
  NUMBER_OF_TABS = 2;
  selectedTab = 0;
  image = [];
  displayedImage: any = '../../../assets/food-plate.png';
  converter = new MinutesToTimeConverter();

  constructor(private dialogRef: MdDialogRef<RecipeCreator>, private ApiGetRecipesService:ApiGetRecipesService) {}


  nextCreateBtnClick() {
    if(this.selectedTab === this.NUMBER_OF_TABS) {
      this.createRecipe();
    }
    else {
      this.goToNextTab();
    }
  }

  goToNextTab() {
    this.selectedTab++;
  }

  createRecipe() {
    alert("Creation...");
    this.closeDialog();
  }

  updateImage(fileInput: any): void {
    console.log(fileInput.target.files);

    if (fileInput.target.files && fileInput.target.files[0]) {
      // I create two file reader. One for the backend image (an array buffer)
      // and one for the image display (a data url).
      const backendImageReader = new FileReader();
      const displayedImageReader = new FileReader();

      backendImageReader.onload = ((e) => {
        this.image = e.target['result'];
      });

      displayedImageReader.onload = ((e) => {
        this.displayedImage = e.target['result'];
      });

      backendImageReader.readAsArrayBuffer(fileInput.target.files[0]);
      displayedImageReader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  selectedTabChanged(newTab) {
    /*let btnNextCreate = document.getElementById("btn_next_create");

    if(newTab === this.NUMBER_OF_TABS) {
      btnNextCreate.innerText = "Créer";
    }
    else {
      btnNextCreate.innerText = "Suivant";
    }*/
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
