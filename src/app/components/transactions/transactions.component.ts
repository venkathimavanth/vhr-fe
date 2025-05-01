import { Component, OnInit } from '@angular/core';
import { BillsService } from 'src/app/services/bills.service';
import { CommonService } from 'src/app/services/common.service';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  transactionTypes: any[] = [
    { name: "All Transactions", type: "all_transactions", active: true },
  ];
  transactionType: string = "all_transactions";
  transactions: any[] = [];
  selectedtransaction: any;
  isLoading: boolean = false;
  loadingText: string = "Loading...";
  private loadingInterval: any;

  constructor(private billsService: BillsService, private commonService: CommonService, public dialog: MatDialog) { }

  ngOnInit() {
    if (this.transactionType) {
      this.fetchtransactions();
    }
  }

  fetchtransactions() {
    this.isLoading = true;
    this.animateLoadingText();
    this.billsService.getTransactions(this.transactionType).subscribe((data) => {
      clearInterval(this.loadingInterval);
      this.isLoading = false;
      this.transactions = data;
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
    this.transactionType = newType;
    this.transactions = [];
    this.fetchtransactions();
  }

  openMenu(event: MouseEvent, transaction: any) {
    event.stopPropagation();
    this.selectedtransaction = transaction;
  }

  onEdittransaction(transaction: any) {
  }

  onViewtransaction(transaction: any) {
    alert(`Viewing transaction: ${transaction.title}`);
  }

}
