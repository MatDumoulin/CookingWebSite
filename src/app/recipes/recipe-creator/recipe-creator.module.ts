import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdButtonModule,
         MdCardModule,
         MdDialogModule,
         MdTabsModule,
         MdListModule,
         MdInputModule,
         MdIconModule,
         MdSelectModule,
         MdTooltipModule
          } from '@angular/material';

import { RecipeCreator } from './recipe-creator.component';
import { StarRatingModule } from '../../controls/star-rating/star-rating.module';
import { CustomListBoxModule } from '../../controls/custom-listbox/custom-listbox.module';
import { IngredientListbox } from '../ingredients/ingredient-listbox/ingredient-listbox.component';
import { IngredientSectionComponent } from '../ingredients/ingredient-section/ingredient-section.component';
import { IngredientSectionWrapper } from '../ingredients/ingredient-section-wrapper/ingredient-section-wrapper.component';
import { StepListbox } from '../steps/step-listbox/step-listbox.component';
import { StepSectionComponent } from '../steps/step-section/step-section.component';
import { StepSectionWrapper } from '../steps/step-section-wrapper/step-section-wrapper.component';

@NgModule({
  declarations: [
    RecipeCreator,
    IngredientListbox,
    IngredientSectionComponent,
    IngredientSectionWrapper,
    StepListbox,
    StepSectionComponent,
    StepSectionWrapper
  ],
  imports: [
             CommonModule,
             MdDialogModule,
             MdButtonModule,
             MdCardModule,
             MdTabsModule,
             MdListModule,
             MdInputModule,
             MdIconModule,
             MdSelectModule,
             MdTooltipModule,
             StarRatingModule,
             CustomListBoxModule,
             FormsModule
           ],
  providers: [],
  exports: [ RecipeCreator ]
})
export class RecipeCreatorModule { }
