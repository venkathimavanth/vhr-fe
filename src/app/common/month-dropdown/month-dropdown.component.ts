import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-month-dropdown',
  templateUrl: './month-dropdown.component.html',
  styleUrls: ['./month-dropdown.component.css']
})
export class MonthDropdownComponent implements OnInit {

  @Output() selectedChange = new EventEmitter<string>();

  months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  years: number[] = [2024, 2025];
  selectedMonthYear: string = '';

  ngOnInit() {
    const currentDate = new Date();
    const currentMonth = this.months[currentDate.getMonth()];
    const currentYear = currentDate.getFullYear();
    this.selectedMonthYear = `${currentMonth} ${currentYear}`;
    this.selectedChange.emit(this.selectedMonthYear);
  }

  setMonthYear(month: string, year: number) {
    this.selectedMonthYear = `${month} ${year}`;
    this.selectedChange.emit(this.selectedMonthYear);
    this.showDropdown = false;

  }

  showDropdown = false;

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

}
