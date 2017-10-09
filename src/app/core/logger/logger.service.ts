import { Injectable } from '@angular/core';
import { MdSnackBar } from '@angular/material';

@Injectable()
export class LoggerService {
  infoDuration = 2000;
  errorDuration = 4000;

  constructor(private snackBar: MdSnackBar) {}

  info(message: string) {
    this.snackBar.open(message, 'Parfait!', {duration: this.infoDuration});
  }

  error(message: string, action: string) {
    this.snackBar.open(`Une erreur est survenue: ${message}`, action, {duration: this.errorDuration});
  }
}
