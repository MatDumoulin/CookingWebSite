import { NgModule } from '@angular/core';
import {
        MdButtonModule,
        MdCheckboxModule,
        MdTableModule,
        MdDialogModule,
        MdSidenavModule,
        MdCardModule,
        MdToolbarModule,
        MdSnackBarModule
       }                from '@angular/material';
import {CdkTableModule} from '@angular/cdk';

@NgModule({
  imports: [
            MdButtonModule,
            MdCheckboxModule,
            MdTableModule,
            CdkTableModule,
            MdDialogModule,
            MdSidenavModule,
            MdCardModule,
            MdToolbarModule,
            MdSnackBarModule
           ],
  exports: [
            MdButtonModule,
            MdCheckboxModule,
            MdTableModule,
            CdkTableModule,
            MdDialogModule,
            MdSidenavModule,
            MdCardModule,
            MdToolbarModule,
            MdSnackBarModule
           ]
})
export class AngularMaterialModule { }
