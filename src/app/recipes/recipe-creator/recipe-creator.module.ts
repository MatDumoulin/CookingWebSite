import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule,
         MatCardModule,
         MatDialogModule,
         MatTabsModule,
         MatListModule,
         MatInputModule,
         MatIconModule,
         MatSelectModule,
         MatTooltipModule
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
import { EquipmentListBox } from '../equipment/equipment-listbox/equipment-listbox.component';
import { EquipmentListItem } from '../equipment/equipment-listitem/equipment-listitem.component';

@NgModule({
  declarations: [
    RecipeCreator,
    IngredientListbox,
    IngredientSectionComponent,
    IngredientSectionWrapper,
    StepListbox,
    StepSectionComponent,
    StepSectionWrapper,
    EquipmentListBox,
    EquipmentListItem
  ],
  imports: [
             CommonModule,
             MatDialogModule,
             MatButtonModule,
             MatCardModule,
             MatTabsModule,
             MatListModule,
             MatInputModule,
             MatIconModule,
             MatSelectModule,
             MatTooltipModule,
             StarRatingModule,
             CustomListBoxModule,
             FormsModule
           ],
  providers: [],
  exports: [ RecipeCreator ]
})
export class RecipeCreatorModule { }
