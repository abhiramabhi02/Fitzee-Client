import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { AdminService } from '../services/admin.service';
import { serverResponse } from 'src/app/shared/interfaces/response.interface';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
  isAdmin: Boolean = true;
  isLoggedIn: Boolean = true;
  headers: string[] = [];
  keynames: string[] = [];
  Data: any[] = [];
  user: Boolean = true
  item:string = 'user'
  itemCount: number = 0
  constructor(private service:AdminService){}

  ngOnInit(): void {
    this.service.getAllItems(this.item, 1).subscribe((res:any)=>{
      const result = this.service.usersSorting(res)
      this.keynames = result.keys
      this.headers = result.keys
      this.Data = result.items
      this.itemCount = res.itemCount
    })
  }

  updateVerification(data:any){
    console.log(data);
    data.item = 'user'
    this.service.editItems(data).subscribe({
      next:(res:serverResponse)=>{
        console.log(res);
      }
    })
  }

  fetchDataPageNo(pageNo:number){
    console.log(pageNo, 'pgno');
    this.service.getAllItems(this.item, pageNo).subscribe({
      next:(res:serverResponse)=>{
      const result = this.service.usersSorting(res)
      this.keynames = result.keys
      this.headers = result.keys
      this.Data = result.items
      this.itemCount = res.itemCount
      }
    })
  }
}
