import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexDataLabels,
  ApexNonAxisChartSeries,
  ApexStroke,
  ApexTooltip,
  ApexXAxis,
  ChartComponent,
} from 'ng-apexcharts';
import { ApexAxisChartSeries, ApexResponsive, ApexChart } from 'ng-apexcharts';
import { AdminService } from '../services/admin.service';
import { serverResponse } from 'src/app/shared/interfaces/response.interface';
import { log } from 'console';

export type chartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

export type areaChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  isAdmin: Boolean = true;
  isLoggedIn: Boolean = true;
  dashboardData: any;
  @ViewChild('pieChart') pieChart!: ChartComponent;
  @ViewChild('areaChart') areaChart!: ChartComponent;

  public chartOptions!: Partial<chartOptions>;
  public areaChartOptions!: Partial<areaChartOptions>;

  dataCount: any = [];

  constructor(private service: AdminService) {
    this.chartOptions = {
      series: [12, 35, 24, 75, 23, 43],
      chart: {
        type: 'donut',
      },
      labels: [
        'Package',
        'User',
        'Subscribers',
        'Exercises',
        'Trainers',
        'News',
      ],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };

    this.areaChartOptions = {
      series: [
        {
          name: 'series1',
          data: [31, 40, 28, 51, 42, 109, 100],
        },
        {
          name: 'series2',
          data: [11, 32, 45, 32, 34, 52, 41],
        },
      ],
      chart: {
        height: 350,
        type: 'area',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        type: 'datetime',
        categories: [
          '2018-09-19T00:00:00.000Z',
          '2018-09-19T01:30:00.000Z',
          '2018-09-19T02:30:00.000Z',
          '2018-09-19T03:30:00.000Z',
          '2018-09-19T04:30:00.000Z',
          '2018-09-19T05:30:00.000Z',
          '2018-09-19T06:30:00.000Z',
        ],
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm',
        },
      },
    };
  }

  ngOnInit(): void {
    this.service.getDashboardData().subscribe({
      next: (res: serverResponse) => {
        this.dashboardData = res.items
        this.extractData(this.dashboardData)
      },
    });


  }

  extractData(data:any){
    for(let el in data){
      this.dataCount.push({
        name:el,
        count:data[el].length
      })
    }
    console.log(this.dataCount, 'data');
  }
}
