import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { serverResponse } from 'src/app/shared/interfaces/response.interface';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  isAdmin: Boolean = true;
  isLoggedIn: Boolean = true;
  headers: string[] = [];
  keynames: string[] = [];
  Data: any[] = [];
  user: Boolean = false;
  userReport:any[] = []
  TotalAmount:number = 0
  
  constructor(private service:AdminService){}

  ngOnInit(): void {
    this.service.getPaymentData().subscribe({
      next:(res:serverResponse)=>{
        // console.log(res);
        const result = this.service.reportSorting(res.items)
        this.headers = result.keys
        this.keynames = result.keys
        this.Data = result.items
        let totalAmount:number = 0
        this.Data.forEach((item) =>{
          totalAmount += item.Amount
          return totalAmount
        } )
        this.TotalAmount = totalAmount
        console.log(totalAmount, 'total');
        
      }
    })

    // this.service.getAllItems('user').subscribe({
    //   next:(res:serverResponse)=>{
    //     console.log(res);
    //     // const user = 'user'
    //     this.userReport = res.items
    //     this.service.reportSorting(res.items)
    //   }
    // })
  }


  filter(data:string){
    if(data === 'maleusers'){
      const maleUsers = this.userReport.filter(item => item.PersonalDetails && item.PersonalDetails.Gender === 'male')
      console.log(maleUsers, 'male');
    }else if(data === 'femaleusers'){
      const maleUsers = this.userReport.filter(item => item.PersonalDetails && item.PersonalDetails.Gender === 'female')
      console.log(maleUsers, 'female');
    }else if(data === 'weightGain'){
      const weightGain = this.userReport.filter(item => item.Package && item.Package.Packagename === 'Weight Gain')
      console.log(weightGain);
      
    }
  }
}
