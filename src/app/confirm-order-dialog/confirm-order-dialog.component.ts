import { Component,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-order-dialog',
  templateUrl: './confirm-order-dialog.component.html',
  styleUrls: ['./confirm-order-dialog.component.css']
})
export class ConfirmOrderDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onConfirm(): void {
    this.dialogRef.close({ confirmed: true, address: this.data.address, contact: this.data.contact });
  }

  onCancel(): void {
    this.dialogRef.close({ confirmed: false });
  }
}
