import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule, MatAutocompleteModule } from '@angular/material';
import { AutocompleteInput } from './autocomplete-input.component';
import { IngredientAutocompleteInput } from './ingredient-autocomplete-input/ingredient-autocomplete-input.component';
import { RecipenameAutocompleteInput } from './recipename-autocomplete-input/recipename-autocomplete-input.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatAutocompleteModule
  ],
  declarations: [IngredientAutocompleteInput, RecipenameAutocompleteInput],
  exports: [IngredientAutocompleteInput, RecipenameAutocompleteInput]
})
export class AutocompleteInputModule { }
