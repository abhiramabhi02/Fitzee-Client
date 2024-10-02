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

  constructor(private service: AdminService) {}

  ngOnInit(): void {
    const item = 'trainer';
    this.service.getAllItems(item).subscribe({
      next: (res: serverResponse) => {
        const result = this.service.trainerSorting(res.items);
        this.keynames = result.keys;
        this.headers = result.keys;
        this.Data = result.items;
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
}
