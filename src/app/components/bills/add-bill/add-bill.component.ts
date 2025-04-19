import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BillsService } from 'src/app/services/bills.service';

@Component({
  selector: 'app-add-bill',
  templateUrl: './add-bill.component.html',
  styleUrls: ['./add-bill.component.css']
})
export class AddBillComponent {

  billType: string;
  bill = {
    title: '',
    type: '',
    startDate: null,
    endDate: null,
    nextPayment: null,
    amount: null,
    note: '',
  };
  edit: boolean = false;

  constructor(private dialogRef: MatDialogRef<AddBillComponent>, private billsService: BillsService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.billType = data.billType;
    if (data.bill) {
      this.edit = true;
      this.bill = {
        title: data.bill.title || '',
        type: data.bill.type || '',
        startDate: (data.bill.startDate ? data.bill.startDate.split("T")[0] : null),
        endDate: (data.bill.endDate ? data.bill.endDate.split("T")[0] : null),
        nextPayment: (data.bill.nextPayment ? data.bill.nextPayment.split("T")[0] : null),
        amount: data.bill.amount || null,
        note: data.bill.note || '',
      };
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSave() {
    if (this.edit) {
      return;
    }
    this.bill.type = this.billType;
    this.billsService.addBill(this.bill).subscribe(() => {
      this.dialogRef.close(this.bill);
    });
  }
}
