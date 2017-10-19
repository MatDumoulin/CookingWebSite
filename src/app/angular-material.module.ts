import { NgModule } from '@angular/core';
import {
        MdButtonModule,
        MdCheckboxModule,
        MdTableModule,
        MdDialogModule,
        MdSidenavModule,
        MdCardModule,
        MdToolbarModule,
        MdSnackBarModule,
        MdTooltipModule
       }                from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';

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
            MdSnackBarModule,
            MdTooltipModule
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
            MdSnackBarModule,
            MdTooltipModule
           ]
})
export class AngularMaterialModule { }
