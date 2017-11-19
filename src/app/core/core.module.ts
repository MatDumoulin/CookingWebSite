import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggerService } from './logger/logger.service';
import { MatSnackBarModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatSnackBarModule // For the logger.
  ],
  providers: [LoggerService]
})
export class CoreModule { }
