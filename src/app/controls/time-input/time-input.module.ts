import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimeInput } from './time-input.component';
import { UtilsModule } from '../../utils/utils.module'
import { MatInputModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UtilsModule,
    MatInputModule
  ],
  declarations: [TimeInput],
  exports: [ TimeInput ]
})
export class TimeInputModule { }
