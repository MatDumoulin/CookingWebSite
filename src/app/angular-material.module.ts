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
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatTabsModule,
    MatSelectModule,
    MatChipsModule
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { NgMdTimeInputModule } from 'ng-md-time-input';

@NgModule({
    exports: [
        BrowserAnimationsModule, // To enable animations for angular-material.
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
        MatIconModule,
        MatListModule,
        MatInputModule,
        MatTabsModule,
        MatSelectModule,
        MatChipsModule,
        NgMdTimeInputModule
    ]
})
export class AngularMaterialModule { }
