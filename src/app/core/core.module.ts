import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggerService } from './logger/logger.service';
import { MdSnackBarModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MdSnackBarModule // For the logger.
  ],
  providers: [LoggerService]
})
export class CoreModule { }
