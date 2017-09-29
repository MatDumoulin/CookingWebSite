import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdButtonModule, MdCardModule, MdListModule, MdTooltipModule, MdIconModule } from '@angular/material';

import { CustomListBox } from './custom-listbox.component';

@NgModule({
  declarations: [
    CustomListBox
  ],
  imports: [
             CommonModule,
             MdButtonModule,
             MdCardModule,
             MdListModule,
             MdTooltipModule,
             MdIconModule
           ],
  providers: [],
  exports: [ CustomListBox ]
})
export class CustomListBoxModule { }
