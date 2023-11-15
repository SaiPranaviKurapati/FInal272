import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { GraphserviceService } from './graphservice.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [
    { data: [], label: 'Series A' },
  ];

  constructor(private dataService: GraphserviceService) { }

  ngOnInit() {
    this.dataService.getData().subscribe(data => {
      this.barChartLabels = data.labels;
      this.barChartData[0].data = data.values;
      console.log(this.barChartData[0].data)
      console.log(this.barChartLabels)
    });
  }
}
