import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeViewer } from './recipe-viewer.component';
import { MdButtonModule, MdDialogModule } from '@angular/material';

@NgModule({
  declarations: [
    RecipeViewer
  ],
  imports: [ CommonModule, MdDialogModule, MdButtonModule ],
  providers: [],
  exports: [ RecipeViewer ]
})
export class RecipeViewerModule { }
