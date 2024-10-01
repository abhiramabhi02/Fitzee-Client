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
  
  constructor(private service:AdminService){}

  ngOnInit(): void {
    this.service.getPaymentData().subscribe({
      next:(res:serverResponse)=>{
        console.log(res);
        
      }
    })
  }
}
