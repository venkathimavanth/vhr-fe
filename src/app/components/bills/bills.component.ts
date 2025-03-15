import { Component, OnInit } from '@angular/core';
import { BillsService } from 'src/app/services/bills.service';
import { AddBillComponent } from './add-bill/add-bill.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {


  billTypes: any[] = [
    { name: "Monthly Bills", type: "monthly_payments", active: true },
    { name: "All Payments", type: "all_payments", active: false },
    { name: "SIP Payments", type: "sip_payments", active: false },
  ];
  billType: string = "monthly_payments";
  bills: any[] = [];
  selectedBill: any;

  constructor(private billsService: BillsService, public dialog: MatDialog) { }

  ngOnInit() {
    if (this.billType) {
      this.fetchBills();
    }
  }

  fetchBills() {
    this.billsService.getBills(this.billType).subscribe((data) => {
      this.bills = data;
    });
  }

  onTypeChange(newType: string) {
    this.billType = newType;
    this.bills = [];
    this.fetchBills();
  }

  openMenu(event: MouseEvent, bill: any) {
    event.stopPropagation();
    this.selectedBill = bill;
  }

  onEditBill(bill: any) {
    this.dialog.open(AddBillComponent, {
      width: '600px',
      data: { billType: this.billType, bill: bill },
    });
  }

  onViewBill(bill: any) {
    alert(`Viewing Bill: ${bill.title}`);
  }

  onAddNewBill() {
    const dialogRef = this.dialog.open(AddBillComponent, {
      disableClose: false,
      width: '600px',
      data: { billType: this.billType },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchBills();
      }
    });
  }
}
