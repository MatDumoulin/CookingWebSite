import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdButtonModule,
         MdDialogModule,
         MdTabsModule,
         MdInputModule,
         MdIconModule,
         MdSelectModule,
         MdTooltipModule
          } from '@angular/material';

import { RecipeCreator } from './recipe-creator.component';
import { StarRatingModule } from './../../star-rating/star-rating.module';

@NgModule({
  declarations: [
    RecipeCreator
  ],
  imports: [
             CommonModule,
             MdDialogModule,
             MdButtonModule,
             MdTabsModule,
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
