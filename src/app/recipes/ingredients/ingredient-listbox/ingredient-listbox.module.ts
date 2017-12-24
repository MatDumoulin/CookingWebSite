import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule,
         MatInputModule,
         MatIconModule,
         MatListModule
       } from '@angular/material';
import { IngredientListbox } from './ingredient-listbox.component';
import { AutocompleteInputModule } from '../../../controls/autocomplete-input/autocomplete-input.module';

@NgModule({
  declarations: [
    IngredientListbox
  ],
  imports: [
             CommonModule,
             MatInputModule,
             MatButtonModule,
             MatIconModule,
             MatListModule,
             FormsModule,
             AutocompleteInputModule
           ],
  providers: [],
  exports: [ IngredientListbox ]
})
export class IngredientListboxModule { }
