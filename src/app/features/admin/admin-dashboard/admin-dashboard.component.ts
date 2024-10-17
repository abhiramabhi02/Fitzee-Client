import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexDataLabels,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexStroke,
  ApexTooltip,
  ApexXAxis,
  ChartComponent,
} from 'ng-apexcharts';
import { ApexAxisChartSeries, ApexResponsive, ApexChart } from 'ng-apexcharts';
import { AdminService } from '../services/admin.service';
import { serverResponse } from 'src/app/shared/interfaces/response.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

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
  subscriptionData: any[] = []
  userData: any[] = []

  dataCount: any = [];
  totalRevenue:number = 0

  public userGrowthSeries: ApexAxisChartSeries = [
    {
      name: "Users",
      data: this.userData
    }
  ];

  public userGrowthChartOptions: {
    chart: ApexChart;
    xaxis: ApexXAxis;
    stroke: ApexStroke;
  } = {
    chart: {
      type: 'line',
      height: 350
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    stroke: {
      curve: 'smooth'
    }
  };

  // Subscription Trends Chart Data (Bar chart)
  public subscriptionSeries: ApexAxisChartSeries = [
    {
      name: "Subscriptions",
      data: this.subscriptionData
    }
  ];

  public subscriptionChartOptions: {
    chart: ApexChart;
    xaxis: ApexXAxis;
    plotOptions: ApexPlotOptions;
  } = {
    chart: {
      type: 'bar',
      height: 350
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    plotOptions: {
      bar: {
        horizontal: false
      }
    }
  };

  constructor(private service: AdminService, private authService:AuthService, private router:Router) {}

  ngOnInit(): void {
    this.service.getDashboardData().subscribe({
      next: (res: serverResponse) => {
        this.dashboardData = res.items
        console.log(this.dashboardData, 'dash');
        
        this.extractData(this.dashboardData)
        this.getuserChartData()
        this.getSubscriptionChartData()
        this.getRevenue()
      },
    });
  }

  getuserChartData(){
    const monthlyUserCount = new Array(12).fill(0)

    this.dashboardData.user.forEach((user:any) =>{
      const date = new Date(user.JoinedDate)
      const month = date.getUTCMonth()

      monthlyUserCount[month]++
    })
    this.userData = monthlyUserCount
    this.userGrowthSeries = [
      {
        name: 'Users',
        data: this.userData
      }
    ];
  }

  getSubscriptionChartData(){
    const monthlyUserCount = new Array(12).fill(0)

    this.dashboardData.subscribers.forEach((user:any) =>{
      const date = new Date(user?.Payment?.Date)
      const month = date.getUTCMonth()

      monthlyUserCount[month]++
    })
    this.subscriptionData = monthlyUserCount
    this.subscriptionSeries = [
      {
        name: "Subscriptions",
        data: this.subscriptionData
      }
    ]
    console.log(this.subscriptionData);
    
  }

  getRevenue(){

    let revenue = 0
     this.dashboardData.subscribers.map((item:any)=>{
      revenue += item.Subscription.Price
      return revenue
    })
    this.totalRevenue = revenue
    console.log(revenue,'revenue');
    
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

  logOut(role:string){
    this.authService.removeToken(role)
    this.router.navigate(['/admin'])
  }
}
