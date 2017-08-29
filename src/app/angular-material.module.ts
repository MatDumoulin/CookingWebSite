import { NgModule } from '@angular/core';
import {MdButtonModule,
        MdCheckboxModule,
        MdTableModule,
        MdDialogModule
      } from '@angular/material';
import {CdkTableModule} from '@angular/cdk';

@NgModule({
  imports: [
            MdButtonModule,
            MdCheckboxModule,
            MdTableModule,
            CdkTableModule,
            MdDialogModule
           ],
  exports: [
            MdButtonModule,
            MdCheckboxModule,
            MdTableModule,
            CdkTableModule,
            MdDialogModule
           ]
})
export class AngularMaterialModule { }
