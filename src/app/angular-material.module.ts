import { NgModule } from '@angular/core';
import {MdButtonModule, MdCheckboxModule, MdTableModule} from '@angular/material';
import {CdkTableModule} from '@angular/cdk';

@NgModule({
  imports: [MdButtonModule, MdCheckboxModule, MdTableModule, CdkTableModule],
  exports: [MdButtonModule, MdCheckboxModule, MdTableModule, CdkTableModule],
})
export class AngularMaterialModule { }
