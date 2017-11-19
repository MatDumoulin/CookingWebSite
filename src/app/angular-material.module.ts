import { NgModule } from '@angular/core';
import {
        MatButtonModule,
        MatCheckboxModule,
        MatTableModule,
        MatDialogModule,
        MatSidenavModule,
        MatCardModule,
        MatToolbarModule,
        MatSnackBarModule,
        MatTooltipModule,
        MatIconModule
       }                from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';

@NgModule({
  exports: [
            MatButtonModule,
            MatCheckboxModule,
            MatTableModule,
            CdkTableModule,
            MatDialogModule,
            MatSidenavModule,
            MatCardModule,
            MatToolbarModule,
            MatSnackBarModule,
            MatTooltipModule,
            MatIconModule
           ]
})
export class AngularMaterialModule { }
