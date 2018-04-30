import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimeInputMomentComponent } from './time-input-moment.component';
import { UtilsModule } from '../../utils/utils.module';
import { MatInputModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UtilsModule,
    MatInputModule
  ],
  declarations: [TimeInputMomentComponent],
  exports: [ TimeInputMomentComponent ]
})
export class TimeInputMomentModule { }
