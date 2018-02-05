import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule,
         MatDialogModule,
         MatProgressSpinnerModule,
         MatIconModule,
         MatChipsModule } from '@angular/material';

import { RecipeViewer } from './recipe-viewer.component';
import { StarRatingModule } from './../../controls/star-rating/star-rating.module';

@NgModule({
  declarations: [
    RecipeViewer
  ],
  imports: [
             CommonModule,
             MatDialogModule,
             MatButtonModule,
             MatProgressSpinnerModule,
             MatIconModule,
             MatChipsModule,
             StarRatingModule,
             FormsModule
           ],
  providers: [],
  exports: [ RecipeViewer ]
})
export class RecipeViewerModule { }
