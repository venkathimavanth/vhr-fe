import { Component, Input, OnChanges, ElementRef, ViewChild } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnChanges {

  @Input() monthlyAnalysisData: any = null;
  @ViewChild('pieChart') pieChartElement!: ElementRef;

  ngOnChanges() {
    if (this.monthlyAnalysisData?.typeWiseSpend?.length) {
      this.drawChart();
    }
  }

  drawChart() {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(() => {
      const rawData = this.monthlyAnalysisData.typeWiseSpend;

      const dataArray: any[][] = [
        ['Type', 'Total']
      ];

      rawData.forEach((item: any) => {
        dataArray.push([
          item.billType,
          item.total]);
      });

      const data = google.visualization.arrayToDataTable(dataArray);

      const options = {
        backgroundColor: '#121212',
        pieHole: 0.4,
        legend: {
          position: 'right',
          alignment: 'center',
          textStyle: { color: '#ffffff', fontSize: 14 }
        },
        tooltip: {
          isHtml: false,
          textStyle: { color: '#ffffff' }
        },
        chartArea: {
          left: '10%',
          top: '10%',
          width: '70%',
          height: '80%'
        }
      };

      const chart = new google.visualization.PieChart(this.pieChartElement.nativeElement);
      chart.draw(data, options);
    });
  }

}
