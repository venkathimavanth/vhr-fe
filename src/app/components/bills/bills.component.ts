import { Component, OnInit } from '@angular/core';
import { BillsService } from 'src/app/services/bills.service';
import { AddBillComponent } from './add-bill/add-bill.component';
import { MatDialog } from '@angular/material/dialog';
import { AddTransactionComponent } from './add-transaction/add-transaction.component';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {

  billTypes: any[] = [
    { name: "Monthly Bills", type: "monthly_payments", active: true },
    { name: "All Payments", type: "all_payments", active: false }
  ];
  billType: string = "all_payments";
  bills: any[] = [];
  selectedBill: any;
  isLoading: boolean = false;
  loadingText: string = "Loading...";
  private loadingInterval: any;

  constructor(private billsService: BillsService, public dialog: MatDialog) { }

  ngOnInit() {
    if (this.billType) {
      this.fetchBills();
    }
  }

  fetchBills() {
    this.isLoading = true;
    this.animateLoadingText();
    this.billsService.getBills(this.billType).subscribe((data) => {
      clearInterval(this.loadingInterval);
      this.isLoading = false;
      this.bills = data;
    });
  }

  animateLoadingText() {
    let dots = 2;
    this.loadingInterval = setInterval(() => {
      if (!this.isLoading) {
        clearInterval(this.loadingInterval);
        return;
      }
      dots = (dots + 1) % 4;
      this.loadingText = "Loading" + ".".repeat(dots);
    }, 500);
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
      disableClose: false,
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

  onAddTransaction(bill: any) {
    const dialogRef = this.dialog.open(AddTransactionComponent, {
      disableClose: false,
      width: '600px',
      data: { billType: this.billType, bill: bill },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchBills();
      }
    });
  }
}
