import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdButtonModule, MdDialogModule, MdProgressSpinnerModule, MdIconModule } from '@angular/material';

import { RecipeViewer } from './recipe-viewer.component';
import { StarRatingModule } from './../../controls/star-rating/star-rating.module';

@NgModule({
  declarations: [
    RecipeViewer
  ],
  imports: [
             CommonModule,
             MdDialogModule,
             MdButtonModule,
             MdProgressSpinnerModule,
             MdIconModule,
             StarRatingModule,
             FormsModule
           ],
  providers: [],
  exports: [ RecipeViewer ]
})
export class RecipeViewerModule { }
