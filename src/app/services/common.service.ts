import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private snackBar: MatSnackBar) { }


  showToast(text: string, type: string) {
    this.snackBar.open(text, 'Close', {
      duration: 2000,
      direction: 'ltr',
      panelClass: [type === 'error' ? 'snack-bar-error' : 'snack-bar-dark'],
    });
  }

  copyNote(text: string, checkNoteValue: boolean) {
    if (!text) return;
    const textToCopy = `${text}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      this.showToast(`Copied: ${text}`, 'info');
    }).catch(err => {
      this.showToast(`Failed to copy`, 'error');
    });
  }
}
