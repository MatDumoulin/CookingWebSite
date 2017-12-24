import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule,
         MatIconModule,
         MatButtonModule,
         MatInputModule,
         MatAutocompleteModule,
         MatCheckboxModule,
         MatSelectModule,
         MatListModule,
         MatTooltipModule
       } from '@angular/material';
import { AdvancedRecipeSearchComponent } from './advanced-recipe-search.component';
import { CustomListBoxModule } from '../../controls/custom-listbox/custom-listbox.module';
import { StarRatingModule } from './../../controls/star-rating/star-rating.module';
import { TimeInputModule } from './../../controls/time-input/time-input.module';
import { AutocompleteInputModule } from './../../controls/autocomplete-input/autocomplete-input.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatSelectModule,
    MatListModule,
    MatTooltipModule,
    CustomListBoxModule,
    StarRatingModule,
    TimeInputModule,
    AutocompleteInputModule
  ],
  declarations: [
    AdvancedRecipeSearchComponent
  ],
  exports: [ AdvancedRecipeSearchComponent ]
})
export class AdvancedRecipeSearchModule { }
