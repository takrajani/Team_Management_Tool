import { Injectable, NgZone } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarRef,
  SimpleSnackBar,
  MatSnackBarConfig,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(public snackbar: MatSnackBar, private zone: NgZone) {}

  error(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['background-red'];
    config.verticalPosition = 'top';
    config.horizontalPosition = 'right';
    config.duration = 5000;
    this.zone.run(() => {
      this.snackbar.open(message, 'x', config);
    });
  }

  success(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['background-green'];
    config.verticalPosition = 'top';
    config.horizontalPosition = 'right';
    config.duration = 1000;
    this.zone.run(() => {
      this.snackbar.open(message, 'x', config);
    });
  }
}
