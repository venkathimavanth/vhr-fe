import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit {

  analysisTypes: any[] = [
    { name: "Monthly Analysis", type: "monthly_analysis", active: true },
  ];
  analysisType: string = "monthly_analysis";
  isLoading: boolean = false;
  loadingText: string = "Loading...";
  private loadingInterval: any;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    if (this.analysisType) {
      this.fetchAnalysis();
    }
  }

  fetchAnalysis() {
    this.isLoading = true;
    this.animateLoadingText();
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
    this.analysisType = newType;
    this.fetchAnalysis();
  }

}
