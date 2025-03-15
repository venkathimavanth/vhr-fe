import { Component, OnInit } from '@angular/core';
import { BillsService } from 'src/app/services/bills.service';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {


  billType: string = 'monthly_payments';
  bills: any[] = [];
  
  constructor(private billsService: BillsService) {}

  ngOnInit() {
    if (this.billType) {
      this.fetchBills();
    }
  }

  onTypeChange(newType: string) {
    this.billType = newType;
  }

  fetchBills() {
    this.billsService.getBills(this.billType).subscribe((data) => {
      this.bills = data;
    });
  }


}
