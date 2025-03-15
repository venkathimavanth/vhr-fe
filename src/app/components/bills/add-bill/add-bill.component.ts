import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-bill',
  templateUrl: './add-bill.component.html',
  styleUrls: ['./add-bill.component.css']
})
export class AddBillComponent {
  bill = {
    title: '',
    type: 'monthly_payments',
    startDate: '',
    endDate: '',
    nextPayment: '',
    amount: null,
    note: '',
  };

  constructor(private dialogRef: MatDialogRef<AddBillComponent>) { }

  onCancel() {
    this.dialogRef.close();
  }

  onSave() {
    console.log('Bill Data:', this.bill);
    this.dialogRef.close(this.bill);
  }
}
