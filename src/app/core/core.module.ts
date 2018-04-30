import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material';
import { LoggerService } from './logger/logger.service';
import { ImageLoaderService } from './images/image-loader.service';
import { AuthenticationService } from './authentication/authentication.service';
import { GoogleAuthenticationService } from './authentication/google-authentication/google-authentication.service';
import { AuthenticationGuard } from './authentication/auth-guard.service';
import { DataStoreModule } from './store/data-store.module';

@NgModule({
    imports: [
        CommonModule,
        MatSnackBarModule, // For the logger.
        DataStoreModule
    ],
    providers: [
        LoggerService,
        ImageLoaderService,
        AuthenticationService,
        GoogleAuthenticationService,
        AuthenticationGuard
    ],
    exports: [
        DataStoreModule
    ]
})
export class CoreModule { }
