import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material';
import { LoggerService } from './logger/logger.service';
import { AuthenticationService } from './authentication/authentication.service'
import { GoogleAuthenticationService } from './authentication/google-authentication/google-authentication.service'

@NgModule({
  imports: [
    CommonModule,
    MatSnackBarModule // For the logger.
  ],
  providers: [LoggerService, AuthenticationService, GoogleAuthenticationService]
})
export class CoreModule { }
