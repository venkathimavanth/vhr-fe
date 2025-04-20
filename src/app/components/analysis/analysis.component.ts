import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AnalysisService } from 'src/app/services/analysis.service';

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
  month: string = "";
  monthlyAnalysisData: any = null;


  constructor(public dialog: MatDialog, private analysisService: AnalysisService) { }

  ngOnInit() {
    if (this.analysisType) {
      // this.fetchAnalysis();
    }
  }

  fetchAnalysis() {
    if (this.analysisType && this.month?.length) {
      this.isLoading = true;
      this.animateLoadingText();
      this.analysisService.getAnalysisByMonth(this.month).subscribe((data) => {
        this.monthlyAnalysisData = data;
        clearInterval(this.loadingInterval);
        this.isLoading = false;
      });
    }
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

  onSelectedMonthChange(value: string) {
    this.month = value;
    this.fetchAnalysis();
  }

}
