import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { GraphserviceService } from './graphservice.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  projectName: any;
  description: any;
  users: any;
  newusers: any;
  
  

  constructor(private dataService: GraphserviceService,private route: ActivatedRoute, private router:Router) {
    // this.projectName = this.route.snapshot?.root?.firstChild?.snapshot?.data?.state?.projectName;
   }

  ngOnInit() {
    this.projectName = this.route.snapshot.paramMap.get('projectName');
      console.log("projectbname",this.projectName)
    this.dataService.getData(this.projectName).subscribe(data => {
      this.barChartLabels = data.labels;
      this.barChartData[0].data = data.values;
      this.description=data.project_description;
      console.log(this.barChartData[0].data)
      console.log(this.barChartLabels)
      
    });
    this.dataService.getUsers(this.projectName).subscribe(data=>{
        this.users = data.project_users;
        console.log(this.users);
    });
    this.dataService.getNewUsers(this.projectName).subscribe(data=>{
      this.newusers = data.new_project_users;
      console.log(this.newusers);
    });

    
  }
  // AddUser() {
  //   this.router.navigate(['/']);}

}
