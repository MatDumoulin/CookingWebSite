import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule, MatAutocompleteModule } from '@angular/material';

import { UtilsModule } from '../../utils/utils.module';
import { AutocompleteInput } from './autocomplete-input.component';
import { IngredientAutocompleteInput } from './ingredient-autocomplete-input/ingredient-autocomplete-input.component';
import { RecipenameAutocompleteInput } from './recipename-autocomplete-input/recipename-autocomplete-input.component';
import { GenreAutocompleteInputComponent } from './genre-autocomplete-input/genre-autocomplete-input.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatInputModule,
        MatAutocompleteModule,
        UtilsModule
    ],
    declarations: [
        IngredientAutocompleteInput,
        RecipenameAutocompleteInput,
        GenreAutocompleteInputComponent
    ],
    exports: [
        IngredientAutocompleteInput,
        RecipenameAutocompleteInput,
        GenreAutocompleteInputComponent]
})
export class AutocompleteInputModule { }
