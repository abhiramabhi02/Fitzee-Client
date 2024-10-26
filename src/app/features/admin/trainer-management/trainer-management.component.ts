import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { serverResponse } from 'src/app/shared/interfaces/response.interface';

@Component({
  selector: 'app-trainer-management',
  templateUrl: './trainer-management.component.html',
  styleUrls: ['./trainer-management.component.scss'],
})
export class TrainerManagementComponent implements OnInit {
  isAdmin: Boolean = true;
  isLoggedIn: Boolean = true;
  headers: string[] = [];
  keynames: string[] = [];
  Data: any[] = [];
  user: Boolean = true;
  item:string = 'trainer';
  itemCount: number = 0

  constructor(private service: AdminService) {}

  ngOnInit(): void {
    this.service.getAllItems(this.item, 1).subscribe({
      next: (res: serverResponse) => {
        const result = this.service.trainerSorting(res.items);
        this.keynames = result.keys;
        this.headers = result.keys;
        this.Data = result.items;
        this.itemCount = res.itemCount
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  updateVerification(data:any){
    console.log(data);
    data.item = 'trainer'
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
        const result = this.service.trainerSorting(res.items);
        this.keynames = result.keys;
        this.headers = result.keys;
        this.Data = result.items;
        this.itemCount = res.itemCount
      }
    })
  }
}
