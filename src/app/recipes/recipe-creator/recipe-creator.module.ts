import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdButtonModule,
         MdCardModule,
         MdDialogModule,
         MdTabsModule,
         MdListModule,
         MdInputModule,
         MdIconModule,
         MdSelectModule,
         MdTooltipModule
          } from '@angular/material';

import { RecipeCreator } from './recipe-creator.component';
import { StarRatingModule } from '../../star-rating/star-rating.module';
import { IngredientListbox } from '../ingredients/ingredient-listbox/ingredient-listbox.component';
import { IngredientSectionComponent } from '../ingredients/ingredient-section/ingredient-section.component';

@NgModule({
  declarations: [
    RecipeCreator,
    IngredientListbox,
    IngredientSectionComponent
  ],
  imports: [
             CommonModule,
             MdDialogModule,
             MdButtonModule,
             MdCardModule,
             MdTabsModule,
             MdListModule,
             MdInputModule,
             MdIconModule,
             MdSelectModule,
             MdTooltipModule,
             StarRatingModule,
             FormsModule
           ],
  providers: [],
  exports: [ RecipeCreator ]
})
export class RecipeCreatorModule { }
