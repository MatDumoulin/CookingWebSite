import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule,
         MatIconModule,
         MatButtonModule,
         MatInputModule,
         MatCheckboxModule,
         MatSelectModule
       } from '@angular/material';
import { AdvancedRecipeSearchComponent } from './advanced-recipe-search.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule
  ],
  declarations: [AdvancedRecipeSearchComponent],
  exports: [ AdvancedRecipeSearchComponent ]
})
export class AdvancedRecipeSearchModule { }
