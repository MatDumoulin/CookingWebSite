import { Injectable } from "@angular/core";
import {
    MatSnackBar,
    MatSnackBarRef,
    SimpleSnackBar,
    MatSnackBarConfig,
    MatSnackBarDismiss
} from "@angular/material";
import { take, filter } from "rxjs/operators";
import { BasicLoggerService } from "./basic-logger.service";

@Injectable()
export class LoggerService extends BasicLoggerService {
    private persistentActionConfig: MatSnackBarConfig;
    private persistedMessage: string;

    constructor(protected snackBar: MatSnackBar) {
        super(snackBar);

        this.persistentActionConfig = new MatSnackBarConfig();
        this.persistentActionConfig.horizontalPosition = "right";
        this.persistentActionConfig.panelClass = "no-margin-bottom";
    }

    info(message: string, action = "Parfait!"): MatSnackBarRef<SimpleSnackBar> {
        return this.keepPersistentAlive(super.info.bind(this), message, action);
        // return super.info(message);
    }

    error(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
        return this.keepPersistentAlive(super.error.bind(this), message, action);
    }

    /**
     * Displays a message to the user that will remain until the user
     * manually disposes it or that the ref is implicitly closed.
     * @param message The message to display.
     */
    persistentAction(message: string): MatSnackBarRef<SimpleSnackBar> {
        this.persistedMessage = message;
        const ref = this.snackBar.open(
            message,
            "Annuler",
            this.persistentActionConfig
        );

        ref.afterDismissed()
            .pipe(take(1))
            .subscribe(dismissStatus => {
                if (dismissStatus.dismissedByAction) {
                    this.persistedMessage = null;
                }
            });

        return ref;
    }

    private keepPersistentAlive(
        showOtherMessage: Function,
        ...args
    ): MatSnackBarRef<SimpleSnackBar> {
        const ref = showOtherMessage(...args);
        // When the message is closed, set the anotherMessageIsShowed flag to false.
        ref.afterDismissed()
            .pipe(take(1))
            .subscribe(() => {
                // Display
                if (this.persistedMessage) {
                    this.persistentAction(this.persistedMessage);
                }
            });

        return ref;
    }
}
