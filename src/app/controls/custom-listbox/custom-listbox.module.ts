import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule,
         MatCardModule,
         MatListModule,
         MatTooltipModule,
         MatIconModule } from '@angular/material';

import { CustomListBox } from './custom-listbox.component';

@NgModule({
  declarations: [
    CustomListBox
  ],
  imports: [
             CommonModule,
             MatButtonModule,
             MatCardModule,
             MatListModule,
             MatTooltipModule,
             MatIconModule
           ],
  providers: [],
  exports: [ CustomListBox ]
})
export class CustomListBoxModule { }
