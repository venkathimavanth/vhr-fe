import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BillsService } from 'src/app/services/bills.service';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css']
})
export class AddTransactionComponent {

  billType: string;
  billTransaction = {
    amount: null,
    paymentDate: null,
    nextPayment: null,
    note: '',
  };
  bill: any;
  edit: boolean = false;

  constructor(private dialogRef: MatDialogRef<AddTransactionComponent>, private billsService: BillsService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.billType = data.billType;
    if (data.bill) {
      this.bill = data.bill;
      this.billTransaction = {
        paymentDate: (data.bill.nextPayment ? data.bill.nextPayment.split("T")[0] : null),
        nextPayment: null,
        amount: data.bill.amount || null,
        note: data.bill.note || '',
      };
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSave() {
    this.billsService.addTransaction({
      type: this.billType,
      billId: this.bill._id,
      ...this.billTransaction
    }).subscribe(() => {
      this.dialogRef.close(this.bill);
    });
  }
}
