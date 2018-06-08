import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar, MatSnackBarConfig } from "@angular/material";
import { take } from "rxjs/operators";

@Injectable()
export class BasicLoggerService {
    infoDuration = 2000;
    errorDuration = 4000;

    constructor(protected snackBar: MatSnackBar) {}

    info(message: string, action = "Parfait!"): MatSnackBarRef<SimpleSnackBar> {
        return this.snackBar.open(message, action, {
            duration: this.infoDuration
        });
    }

    error(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
        return this.snackBar.open(`Une erreur est survenue: ${message}`, action, {
            duration: this.errorDuration
        });
    }
}
