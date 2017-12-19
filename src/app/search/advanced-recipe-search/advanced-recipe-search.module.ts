import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule,
         MatIconModule,
         MatButtonModule,
         MatInputModule,
         MatCheckboxModule,
         MatSelectModule,
         MatListModule,
       } from '@angular/material';
import { AdvancedRecipeSearchComponent } from './advanced-recipe-search.component';
import { CustomListBoxModule } from '../../controls/custom-listbox/custom-listbox.module';
import { StarRatingModule } from './../../controls/star-rating/star-rating.module';
import { TimeInputModule } from './../../controls/time-input/time-input.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatListModule,
    CustomListBoxModule,
    StarRatingModule,
    TimeInputModule
  ],
  declarations: [
    AdvancedRecipeSearchComponent
  ],
  exports: [ AdvancedRecipeSearchComponent ]
})
export class AdvancedRecipeSearchModule { }
