import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlyNumber } from './only-number.directive'

@NgModule({
  declarations: [OnlyNumber],
  exports: [OnlyNumber]
})
export class UtilsModule { }
