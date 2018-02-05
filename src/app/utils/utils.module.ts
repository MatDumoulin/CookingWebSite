import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlyNumber } from './only-number.directive';
import { HighlightPipe } from './pipes/highlight/highlight.pipe'

@NgModule({
  declarations: [OnlyNumber, HighlightPipe],
  exports: [OnlyNumber, HighlightPipe]
})
export class UtilsModule { }
