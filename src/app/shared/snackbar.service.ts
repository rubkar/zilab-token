import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarRef,
  TextOnlySnackBar,
} from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class SnackbarService {
  constructor(private readonly snackbar: MatSnackBar) {}

  success(text: string, action: string): MatSnackBarRef<TextOnlySnackBar> {
    return this.snackbar.open(text, action, {
      panelClass: ['mat-toolbar', 'mat-primary'],
    });
  }

  warn(text: string, action: string): MatSnackBarRef<TextOnlySnackBar> {
    return this.snackbar.open(text, action, {
      panelClass: ['mat-toolbar', 'mat-accent'],
    });
  }

  error(text: string, action: string): MatSnackBarRef<TextOnlySnackBar> {
    return this.snackbar.open(text, action, {
      panelClass: ['mat-toolbar', 'mat-warn'],
    });
  }
}
